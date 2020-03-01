const CONFIG_DEFAULT = [
  {
    "enabled": true,
    "piid": "pdspi-guidance-example",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-example:1",
        "legalValues": {
          "enum": [
            "Hartford",
            "Urban-Craig",
            "Conventional A",
            "Conventional B"
          ],
          "type": "string"
        },
        "parameterDescription": "This calculator uses one of four extended-interval nomograms. Please choose one nomogram.",
        "parameterValue": {
          "value": "Hartford"
        },
        "title": "Extended interval nomogram"
      }
    ],
    "pluginSelectors": [
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Gentamicin",
          "value": "rxCUI:1596450"
        },
        "title": "Drug"
      }
    ],
    "pluginType": "g",
    "requiredPatientVariables": [
      {
        "id": "LOINC:30525-0",
        "legalValues": {
          "minimum": "0",
          "type": "number"
        },
        "title": "Age",
        "why": "Age is used to calculate the creatinine clearance. Dosing is lower for geriatric patient and contraindicated for pediatric patients"
      },
      {
        "id": "LOINC:39156-5",
        "legalValues": {
          "minimum": "0",
          "type": "number"
        },
        "title": "BMI",
        "why": "BMI is used to calculate the creatinine clearance. Dosing is higher for patients with higher BMI"
      }
    ],
    "title": "Aminoglycoside dosing guidance"
  },
  {
    "enabled": true,
    "piid": "pdspi-mapper-example",
    "pluginSelectors": [],
    "pluginType": "m",
    "pluginTypeTitle": "Mapping",
    "supportedPatientVariables": [
      {
        "id": "LOINC:2160-0",
        "legalValues": {
          "type": "number"
        },
        "title": "Serum creatinine"
      },
      {
        "id": "LOINC:82810-3",
        "legalValues": {
          "type": "boolean"
        },
        "title": "Pregnancy"
      },
      {
        "id": "HP:0001892",
        "legalValues": {
          "type": "boolean"
        },
        "title": "Bleeding"
      },
      {
        "id": "HP:0000077",
        "legalValues": {
          "type": "boolean"
        },
        "title": "Kidney dysfunction"
      },
      {
        "id": "LOINC:30525-0",
        "legalValues": {
          "type": "integer"
        },
        "title": "Age"
      },
      {
        "id": "LOINC:54134-2",
        "legalValues": {
          "type": "string"
        },
        "title": "Race"
      },
      {
        "id": "LOINC:54120-1",
        "legalValues": {
          "type": "string"
        },
        "title": "Ethnicity"
      },
      {
        "id": "LOINC:21840-4",
        "legalValues": {
          "type": "string"
        },
        "title": "Sex"
      },
      {
        "id": "LOINC:8302-2",
        "legalValues": {
          "type": "number"
        },
        "title": "Height"
      },
      {
        "id": "LOINC:29463-7",
        "legalValues": {
          "type": "number"
        },
        "title": "Weight"
      },
      {
        "id": "LOINC:39156-5",
        "legalValues": {
          "type": "number"
        },
        "title": "BMI"
      }
    ],
    "title": "DOAC variable mapper"
  },
  {
    "enabled": true,
    "piid": "pdspi-fhir-example",
    "pluginSelectors": [],
    "pluginType": "f",
    "pluginTypeTitle": "FHIR",
    "title": "FHIR data provider"
  }
];
 export default CONFIG_DEFAULT;