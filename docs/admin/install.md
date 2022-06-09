# Installation
This was done on a clean Ubuntu 20.4 server.

## Node JS LTS
```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g npm
```
## Redis
**This must be secured or people will be able to do bad things.**
```bash
sudo apt install redis
```
## Tomcat
```bash
sudo apt install tomcat9
```
## PostgreSQL
**This must be secured or people will be able to do bad things.**
```bash
sudo apt install postgresql
```
## HAPI FHIR
**This must be secured or people will be able to do bad things.**
### Create Database and User
```bash
sudo -u postgres psql
create database hapi;
create user hapi with encrypted password 'PASS';
grant all privileges on database hapi to hapi;
\q
```
### Install Maven
```bash
sudo apt install maven
```
### Compile HAPI
```bash
git clone https://github.com/hapifhir/hapi-fhir-jpaserver-starter.git
cd hapi-fhir-jpaserver-starter
```
Edit ```pom.xml``` and change the following line from hapi-fhir-jpaserver or ROOT (starting with version 5.1.0):
```xml
    <finalName>hapi</finalName>
```

#### For versions starting with 5.2.0 to the latest
Things were streamlined a bit so the values to edit are simpler.
Edit ```src/main/resources/application.yaml``` and update the following values:

```
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/hapi'
    username: hapi
    password: PASS
    driveClassName: org.postgresql.Driver
  jpa:
    properties:
        hibernate.search.enabled: true

hapi:
  fhir:
    fhir_version: R4
    enable_index_missing_fields: true
    tester:
       home:
        name: iHRIS
        server_address: http://localhost:8080/hapi/fhir/
        refuse_to_fetch_third_party_urls: false
        fhir_version: R4
```

#### For versions starting with 5.1.0 
Edit ```src/main/resources/application.yaml``` and update the following values:

```
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/hapi'
    username: hapi
    password: PASS
    driveClassName: org.postgresql.Driver
  jpa:
    properties:
      hibernate.dialect: org.hibernate.dialect.PostgreSQL95Dialect
      hibernate.search.default.indexBase=/var/lib/tomcat9/target/lucenefiles
hapi:
  fhir:
    tester:
      id: home
      name: iHRIS
      server_address: http://localhost:8080/hapi/fhir/
      refuse_to_fetch_third_party_urls: false
      fhir_version: R4
```

#### Create war file

```bash
sudo apt install default-jdk
mvn clean install -DskipTests
sudo mkdir -p /var/lib/tomcat9/target/lucenefiles
sudo chown -R tomcat:tomcat /var/lib/tomcat9/target
sudo cp target/hapi.war /var/lib/tomcat9/webapps
```

#### Set paths in startup file
Edit ```/etc/systemd/system/multi-user.target.wants/tomcat9.service```

In the security section add the following directory with a ReadWritePath

```
ReadWritePaths=/var/lib/tomcat9/target/
```
#### Access Hapi-fhir server
Test the [hapi-fhir server](http://localhost:8080/hapi) to make sure it's running
```
http://localhost:8080/hapi
```

#### Load basic definitions
Download and install hapi-fhir-cli:
https://hapifhir.io/hapi-fhir/docs/tools/hapi_fhir_cli.html
```bash
wget https://github.com/hapifhir/hapi-fhir/releases/download/v5.7.0/hapi-fhir-5.7.0-cli.tar.bz2
```
**Note**: Be sure to download the hapi fhir cli for the version on hapi you have installed. You can check the version in the pom.xml file.
Then load the basic definitions
```bash
./hapi-fhir-cli upload-definitions -v r4 -t http://localhost:8080/hapi/fhir/
```

## SUSHI
```bash
sudo npm install -g fsh-sushi
```

You can make customizations for your own configurations in the ig/ 
directory.  To get the default data, you can compile the FSH files with:
```bash
cd ig/
sushi -s .
```

Any time you make changes to the FSH files you should rebuild them 
this way.  The FSH files are in ig/input/fsh/.

## Loading Resources

There is a script in the tools/ directory to load some sample configuration
files as well as the FHIR resources created by SUSHI.  The first time
you will need to run npm install:

```bash
cd tools/
npm install
```

**All the following commands should be run from the tools/ directory, 
replacing the server with the correct location for your installation.**

After that, you can use the load.js script to load FHIR resources into
your FHIR server with:
```bash
node load.js --server http://localhost:8080/hapi/fhir PATH/TO/FHIR.json
```

After building the FSH files, you can import them with the following:
```bash
node load.js --server http://localhost:8080/hapi/fhir ../ig/fsh-generated/resources/*.json
```

Then to load the starter resources run the command bellow
```bash
node load.js --server http://localhost:8080/hapi/fhir ../resources/*.json
```

## ElasticSearch

Ubuntu install instructions:
https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html

Make sure to install ElasticSearch and Kibana:
```bash
sudo apt install elasticsearch kibana
```

After installing, edit /etc/kibana/kibana.yml and set server.basePath
```yaml
server.basePath: "/kibana"
```

# Back end server

## Before starting

You'll need to run npm install when additional node modules are installed or updated
and also before starting the first time.

```bash
cd ihris-backend/
npm install
```

## Development mode
Run the following to start the server in development mode.
```bash
cd ihris-backend/
npm run dev
```
## Production mode
Run the following to start the server in production mode.
```bash
cd ihris-backend/
npm run start
```
TODO: Convert this to a systemd script for startup and shutdown

# Front end Development

Built with vue cli 4.4.1
```bash
sudo npm install -g @vue/cli
```

## To run in development mode

You may need to edit the proxy settings in ihris-frontend/vue.config.js
depending on where you started the backend.


```bash
cd ihris-frontend/
npm run serve
```

The output will give you a URL to access the frontend.

## Production

The frontend will be built and saved to the backend server public 
files (ihris-backend/public/) to be served or you can run them from any 
static web server.

```bash
cd ihris-frontend/
npm run build
```

The files in ihris-frontend/dist/ can be served statically from your
web server.  Releases will be compiled to the ihris-backend/public/
directory so you will only need to do this if you want to make changes
to the frontend software.
