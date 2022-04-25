const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const user = require('../modules/user')
const logger = require('../winston')
const fhirAudit = require('../modules/fhirAudit')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const clientURL = process.env.CLIENT_URL;
// email 
const sendEmail = require('../modules/sendEmail')

const passport = require('passport')
const s = require('connect-redis')
const { object } = require('webidl-conversions')
const { request } = require('http')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const CustomStrategy = require('passport-custom').Strategy

const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"

passport.use(new GoogleStrategy(
  {
    clientID: nconf.get("auth:google:clientId") || "not set",
    clientSecret: nconf.get("auth:google:clientSecret") || "not set",
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {

    user.lookupByProvider('google', profile.id).then((userObj) => {
      if (userObj) {
        fhirAudit.login(userObj, req.ip, true)
        done(null, userObj)
      } else {
        logger.debug(profile.id + " not found in current users, checking by email.")
        let email = profile.emails.find(em => em.verified === true)
        if (email && email.value) {
          user.lookupByEmail(email.value).then((userObj) => {
            if (!userObj.resource.identifier) userObj.resource.identifier = []
            userObj.resource.identifier.push({ system: 'google', value: profile.id })
            fhirAudit.login(userObj, req.ip, true, email.value)
            userObj.update().then((response) => {
              done(null, userObj)
            }).catch((err) => {
              logger.info("Failed to update user with provider id for google.")
              logger.error(err.message)
              done(null, userObj)
            })
          }).catch((err) => {
            fhirAudit.login({}, req.ip, false, email.value)
            done(err)
          })
        } else {
          logger.info("Couldn't find verified email in profile.")
          fhirAudit.login({}, req.ip, false)
          done(null, false)
        }
      }
    }).catch((err) => {
      fhirAudit.login({}, req.ip, false)
      done(err)
    })
  }
))

passport.use('local', new LocalStrategy({ passReqToCallback: true },
  (req, email, password, done) => {
    user.lookupByEmail(email).then((userObj) => {
      if (!userObj) {
        fhirAudit.login(userObj, req.ip, false, email)
        done(null, false)
      } else {
        if (userObj.checkPassword(password)) {
          fhirAudit.login(userObj, req.ip, true, email)
          done(null, userObj)
        } else {
          fhirAudit.login(userObj, req.ip, false, email)
          done(null, false)
        }
      }
    }).catch((err) => {
      fhirAudit.login({}, req.ip, false, email)
      done(err)
    })
  }
))

passport.use('custom-loggedout', new CustomStrategy(
  (req, done) => {

    fhirAudit.logout(req.user, req.ip, true)
    user.find(defaultUser).then((userObj) => {
      if (!userObj) {
        done(null, false)
      } else {
        done(null, userObj)
      }
    }).catch((err) => {
      done(err)
    })
  }
))

passport.serializeUser((obj, callback) => {
  //callback(null, user.id)
  callback(null, obj)
})
passport.deserializeUser((obj, callback) => {
  let userObj = user.restoreUser(obj)
  callback(null, userObj)
})

router.use(passport.initialize())
router.use(passport.session())

router.passport = passport

router.get('/',
  (req, res, next) => {
    if (req.user) {
      res.status(200).json({ ok: true })
    } else {
      next()
    }
  },
  passport.authenticate('custom-loggedout', {}), (req, res) => {
    if (req.user) {
      res.status(200).json({ ok: true })
    } else {
      res.status(200).json({ ok: false })
    }
  }
)
router.get('/logout', passport.authenticate('custom-loggedout', {}), (req, res) => {
  if (req.user) {
    res.status(200).json({ ok: true })
  } else {
    res.status(200).json({ ok: false })
  }
})

router.get('/google', passport.authenticate('google', { scope: ['email'] }))
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' })
)


// login 
router.post("/login", passport.authenticate('local', {}), (req, res) => {
  let name = "Unknown"

  try {
    name = req.user.resource.name[0].text

    user.lookupByEmail(req.user.resource.telecom[0].value)
      .then((userObj) => {
        if (userObj) {

          const otp = user.generateOTP(8)

          let codeDetails = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-otp").extension.find(ext => ext.url === "code")

          if (codeDetails) {

            userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-otp").extension.find(ext => ext.url === "code").valueString = otp

            userObj.update().then((response) => {

              sendEmail(
                response.telecom[0].value,
                "OTP Verification",
                {
                  name: response.name[0].text,
                  otp: otp
                },
                "../views/email.handlebars");
              res.status(200).json({ ok: true, name: name, otp: otp, user: response })


            }).catch((err) => {
              logger.error(err.message)
              res.status(400).json({ ok: false, message: "failed to user object otp" })
            })
          }
        }

      })
      .catch((err) => {
        logger.error(err.message)
        res.status(400).json({ ok: false, message: err.message })

      })


  } catch (err) {
    fhirAudit.login({}, req.ip, false, name);
    return res.status(500).send();
  }
})


// verify otp
router.post("/verify-otp", (req, res) => {

  let otp = req.body.otp
  let email = req.body.email

  if (otp === undefined) {
    logger.error("No otp provided.")
    return res.status(400).send();
  }

  if (user.checkOtp(otp)) {
    // check if otp is valid  and if it is valid then update the user
    user.lookupByEmail(email).then((userObj) => {

      if (userObj.verifyOtp(otp)) {

        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-otp").extension.find(ext => ext.url === "code").valueString = ""

        userObj.update().then((response) => {
          fhirAudit.login(userObj, req.ip, true, email)
          console.log(JSON.stringify(response, null, 2))
          sendEmail(
            response.telecom[0].value,
            "Successful Login",
            {
              name: response.name[0].text,
            },
            "../views/welcome.handlebars");
          return res.status(200).json({
            "ok": true,
            "message": "OTP verified successfully",
            "user": response
          });
        }).catch((err) => {
          fhirAudit.login(userObj, req.ip, false, email)
          return res.status(400).json({
            "ok": false,
            "message": "Failed to update user object"
          });

        })

      } else {
        fhirAudit.login(userObj, req.ip, false, email)
        return res.status(400).send();
      }
    }).catch((err) => {
      logger.error(err.message)
      return res.status(500).send();

    })

  } else {
    return res.status(400).send();
  }

});


// send  password reset request
router.post("/password-reset-request", async (req, res) => {

  let resetEmail = req.body.email

  if (resetEmail === undefined) {
    logger.error("No email provided.")
    return res.status(400).send();
  }

  try {
    user.lookupByEmail(resetEmail.toString()).then((userObj) => {
      if (userObj) {

        //  generate a token
        let resetToken = crypto.randomBytes(64).toString('hex')
        let hash = crypto.pbkdf2Sync(userObj.resource.id, resetToken, 1000, 64, 'sha512').toString('hex')

        // update the password reset token and password reset expiry in the user object
        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString = hash

        userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString = new Date(Date.now() + (60 * 60 * 1000)).toDateString


        userObj.update().then((response) => {

          const link = `${clientURL}/reset-password?token=${resetToken}&userId=${userObj.resource.id}`;

          sendEmail(
            response.telecom[0].value,
            "Password Reset Request",
            {
              name: response.name[0].text,
              link: link
            },
            "../views/requestResetPassword.handlebars");

          return res.status(200).json({
            "ok": true,
            "message": "Password reset request sent successfully",
            "link": link
          });

        }).catch((err) => {
          logger.error(err.message)
          res.status(500).json({
            "ok": false,
            "message": "Failed to update user object"
          })
        })
      }
    }).catch((err) => {
      logger.error(err.message)
      res.status(500).json({
        "ok": false,
        "message": "Failed to lookup user object"
      })

    });
  } catch (err) {
    logger.error(err.message)
    return res.status(500).send();

  }


})

// reset your password
router.post("/reset-password", async (req, res) => {

  let token = req.query.token;
  let userId = req.query.userId
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;

  user.find(userId).then((userObj) => {

    let resetPasswordToken = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordToken").valueString

    let resetPasswordExpiry = userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "resetPasswordExpiry").valueString

    // check if user objct has a reset token
    if (!resetPasswordToken) {
      logger.error("Invalid or expired password reset token")
      return res.status(400).json({ ok: false, message: "Invalid or expired password reset token" })
    }

    // check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      logger.error("New password and confirm password do not match")
      return res.status(400).json({ ok: false, message: "New password and confirm password do not match" })
    }

  

    let hashedToken = crypto.pbkdf2Sync(userId, token, 1000, 64, 'sha512').toString('hex')

    if (hashedToken === resetPasswordToken) {
      // check if the token has expired
      if (new Date(resetPasswordExpiry) < new Date()) {
        logger.error("Invalid or expired password reset token")
        return res.status(400).json({
          "ok": false,
          "message": "Invalid or expired password reset token"
        });
      }
    }

    // hash the new password
    let newPasswordSalt = crypto.randomBytes(64).toString('hex')
    let newHashedPassword = crypto.pbkdf2Sync(newPasswordSalt, newPassword, 1000, 64, 'sha512').toString('hex')


    userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "password").valueString = newHashedPassword
    userObj.resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password").extension.find(ext => ext.url === "salt").valueString = newPasswordSalt

    userObj.update().then((resp) => {

      sendEmail(
        resp.telecom[0].value,
        "Password Reset Successfully",
        {
          name: resp.name[0].text,
        },
        "../views/resetPassword.handlebars"
      );

      return res.status(200).json({
        "ok": true,
        "message": "Password reset successfully"
      });



    }).catch((err) => {
      logger.error(err.message)
      return res.status(500).json({
        "ok": false,
        "message": "Failed to update user object" + err.message
      });

    })


  }).catch((err) => {
    logger.error(err.message)
    return res.status(500).json({
      "ok": false,
      "message": "Failed to lookup user object" + err.message
    });
  })



})


// generate token for use on the api 
router.post('/token', (req, res) => {
  // For API Access only
  logger.info('Generating token');
  const secret = nconf.get('auth:secret');
  const tokenDuration = nconf.get('auth:tokenDuration');
  const { email, password } = req.body;

  user.lookupByEmail(email).then((userObj) => {
    if (!userObj) {
      logger.error('User not found');
      fhirAudit.login(userObj, req.ip, false, email);
      return res.status(401).send();
    }
    if (userObj.checkPassword(password)) {
      fhirAudit.login(userObj, req.ip, true, email);
      const token = jwt.sign({ user: userObj }, secret, { expiresIn: tokenDuration });
      res.status(200).json({ access_token: token });
    } else {
      logger.error('Invalid password');
      fhirAudit.login(userObj, req.ip, false, email);
      return res.status(401).send();
    }
  }).catch((err) => {
    fhirAudit.login({}, req.ip, false, email);
    return res.status(500).send();
  });
});


router.get('/test',
  (req, res) => {
    if (!req.user.accesses) req.user.accesses = 0
    req.user.accesses++
    res.status(200).json({ user: req.user })
  }
)

module.exports = router
