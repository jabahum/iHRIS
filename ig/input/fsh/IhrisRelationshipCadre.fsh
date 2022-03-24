Instance:       ihris-es-report-staff
InstanceOf:     IhrisRelationship
Title:          "NHWR Relationship"
Usage:          #example

* code.text = "iHRISRelationship"
* code.coding = #iHRISRelationship
* subject.reference = "StructureDefinition/ihris-practitioner"
* extension[reportdetails].extension[name].valueString = "practitioner"
* extension[reportdetails].extension[label].valueString = "NHWR Report"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[query].valueString = "active=true"
* extension[reportdetails].extension[displayCheckbox].valueBoolean = true
* extension[reportdetails].extension[locationBasedConstraint].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[label].valueString = "nationalId"
* extension[reportdetails].extension[reportelement][0].extension[name].valueString = "identifier.where(type.coding.where(code='nin')).value"
* extension[reportdetails].extension[reportelement][0].extension[display].valueString = "National Id"
* extension[reportdetails].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][1].extension[label].valueString = "family"
* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "name.where(use='official').family"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Family name"
* extension[reportdetails].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][2].extension[label].valueString = "given"
* extension[reportdetails].extension[reportelement][2].extension[name].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][2].extension[display].valueString = "Given name"
* extension[reportdetails].extension[reportelement][2].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][3].extension[label].valueString = "gender"
* extension[reportdetails].extension[reportelement][3].extension[name].valueString = "gender"
* extension[reportdetails].extension[reportelement][3].extension[display].valueString = "Gender"
* extension[reportdetails].extension[reportelement][3].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][3].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][4].extension[label].valueString = "phone"
* extension[reportdetails].extension[reportelement][4].extension[name].valueString = "telecom.where(system='phone').value"
* extension[reportdetails].extension[reportelement][4].extension[display].valueString = "Phone"

* extension[reportdetails].extension[reportelement][5].extension[label].valueString = "email"
* extension[reportdetails].extension[reportelement][5].extension[name].valueString = "telecom.where(system='email').value"
* extension[reportdetails].extension[reportelement][5].extension[display].valueString = "Email"

* extension[reportdetails].extension[reportelement][6].extension[label].valueString = "address"
* extension[reportdetails].extension[reportelement][6].extension[name].valueString = "address.where(use='work').text"
* extension[reportdetails].extension[reportelement][6].extension[display].valueString = "Address"

* extension[reportlink][0].extension[name].valueString = "role"
* extension[reportlink][0].extension[resource].valueString = "PractitionerRole"
* extension[reportlink][0].extension[linkElement].valueString = "PractitionerRole.practitioner.reference"
* extension[reportlink][0].extension[linkTo].valueString = "practitioner"
* extension[reportlink][0].extension[linkElementSearchParameter].valueString = "practitioner"
* extension[reportlink][0].extension[multiple].valueBoolean = false
* extension[reportlink][0].extension[reportelement][0].extension[label].valueString = "job"
* extension[reportlink][0].extension[reportelement][0].extension[name].valueString = "code.coding.where(system='http://ihris.org/fhir/CodeSystem/ihris-job').display"
* extension[reportlink][0].extension[reportelement][0].extension[display].valueString = "Job Title"
* extension[reportlink][0].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true

* extension[reportlink][0].extension[reportelement][1].extension[label].valueString = "startDate"
* extension[reportlink][0].extension[reportelement][1].extension[name].valueString = "period.start"
* extension[reportlink][0].extension[reportelement][1].extension[display].valueString = "Start Date"
* extension[reportlink][0].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

* extension[reportlink][0].extension[reportelement][2].extension[label].valueString = "endDate"
* extension[reportlink][0].extension[reportelement][2].extension[name].valueString = "period.end"
* extension[reportlink][0].extension[reportelement][2].extension[display].valueString = "End Date"
* extension[reportlink][0].extension[reportelement][2].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false


// * extension[reportlink][0].extension[reportelement][5].extension[label].valueString = "fyear"
// * extension[reportlink][0].extension[reportelement][5].extension[name].valueString = "year(period.start)"
// * extension[reportlink][0].extension[reportelement][5].extension[display].valueString = "Year Started"
// * extension[reportlink][0].extension[reportelement][5].extension[filter].valueBoolean = false
// * extension[reportlink][0].extension[reportelement][5].extension[dropDownFilter].valueBoolean = true

* extension[reportlink][1].extension[name].valueString = "facility"
* extension[reportlink][1].extension[resource].valueString = "Location"
* extension[reportlink][1].extension[linkElement].valueString = "Location.id"
* extension[reportlink][1].extension[linkTo].valueString = "role.location.reference"
* extension[reportlink][1].extension[multiple].valueBoolean = false
* extension[reportlink][1].extension[reportelement][0].extension[label].valueString = "dutyPost"
* extension[reportlink][1].extension[reportelement][0].extension[name].valueString = "name"
* extension[reportlink][1].extension[reportelement][0].extension[display].valueString = "Facility/Place of work"
* extension[reportlink][1].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][1].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true