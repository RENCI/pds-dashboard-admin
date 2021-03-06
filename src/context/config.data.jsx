const SAMPLE_PLUGINS = [
  // *** GUIDANCE *** \\
  // *** AMINOGLYCOSIDE ANTIBIOTICS *** \\
  {
    "enabled": true,
    "piid": "pdspi-guidance-aminoglycoside-example-1",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-aminoglycoside-example:1",
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
          "value": "Urban-Craig"
        },
        "title": "Extended interval nomogram"
      }
    ],
    "pluginSelectors": [
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Pseudomonas (aeruginosa)",
          "value": "ICD-10CM:B96.5"
        },
        "title": "Indication"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Gentamicin",
          "value": "rxCUI:1596450"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Tobramycin",
          "value": "rxCUI:220329"
        },
        "title": "Drug"
      },
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
    "piid": "pdspi-guidance-aminoglycoside-example-2",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-aminoglycoside-example:2",
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
          "value": "Conventional A"
        },
        "title": "Extended interval nomogram"
      }
    ],
    "pluginSelectors": [
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Acute and subacute infective endocarditis",
          "value": "ICD-10CM:I33.0"
        },
        "title": "Indication"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Gentamicin",
          "value": "rxCUI:1596450"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Tobramycin",
          "value": "rxCUI:220329"
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
    "enabled": false,
    "piid": "pdspi-guidance-aminoglycoside-example-3",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-aminoglycoside-example:3",
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
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Pseudomonas (aeruginosa)",
          "value": "ICD-10CM:B96.5"
        },
        "title": "Indication"
      },
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Acute and subacute infective endocarditis",
          "value": "ICD-10CM:I33.0"
        },
        "title": "Indication"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Gentamicin",
          "value": "rxCUI:1596450"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Tobramycin",
          "value": "rxCUI:220329"
        },
        "title": "Drug"
      }
    ],
    "pluginType": "g",
    "requiredPatientVariables": [
      {
        "id": "LOINC:12345-0",
        "legalValues": {
          "minimum": "0",
          "type": "number"
        },
        "title": "Age",
        "why": "Age is used to calculate the creatinine clearance. Dosing is lower for geriatric patient and contraindicated for pediatric patients"
      },
      {
        "id": "LOINC:12345-5",
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
  // *** DOAC *** \\
  {
    "enabled": true,
    "piid": "pdspi-guidance-doac-example-1",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-doac-example:1",
        "legalValues": {
          "enum": [
            "Nonvalvular AF - stroke prophylaxis",
            "VTE treatment",
            "VTE primary prophylaxis"
          ],
          "type": "string"
        },
        "parameterDescription": "This calculator provides clinical decision support for treatment venous thromboembolism (VTE including deep vein thrombosis and pulmonary embolism), prophylaxis is the setting of non valvular atrial fibrillation.",
        "parameterValue": {
          "value": "Nonvalvular AF - stroke prophylaxis"
        },
        "title": "Standard dosing of direct oral anticoagulants"
      }
    ],
    "pluginSelectors": [
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Unspecified atrial fibrillation",
          "value": "ICD-10CM:I48.91"
        },
        "title": "Indication"
      },
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Chronic atrial fibrillation",
          "value": "ICD-10CM:I48.2"
        },
        "title": "Indication"
      },
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Acute embolism and thrombosis of deep veins of lower extremity",
          "value": "ICD-10CM:I82.4"
        },
        "title": "Indication"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Dabigatran",
          "value": "rxCUI:1596450"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Apixaban",
          "value": "rxCUI:1364430"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Rivaroxaban",
          "value": "rxCUI:1232088"
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
    "title": "DOAC dosing guidance"
  },
  // *** Calcium Channel Blocker *** \\
  {
    "enabled": true,
    "piid": "pdspi-guidance-calciumChannelBlocker-example-1",
    "pluginParameterDefaults": [
      {
        "id": "pdspi-guidance-calciumChannelBlocker-example:1",
        "legalValues": {
          "enum": [
            "Nonvalvular AF - stroke prophylaxis",
            "VTE treatment",
            "VTE primary prophylaxis"
          ],
          "type": "string"
        },
        "parameterDescription": "This calculator provides clinical decision support for treatment venous thromboembolism (VTE including deep vein thrombosis and pulmonary embolism), prophylaxis is the setting of non valvular atrial fibrillation.",
        "parameterValue": {
          "value": "Nonvalvular AF - stroke prophylaxis"
        },
        "title": "Standard dosing of direct oral anticoagulants"
      }
    ],
    "pluginSelectors": [
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Unspecified atrial fibrillation",
          "value": "ICD-10CM:I48.91"
        },
        "title": "Indication"
      },
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Persistent atrial fibrillation",
          "value": "ICD-10CM:I48.1"
        },
        "title": "Indication"
      },
      {
        "id": "ICD-10CM",
        "selectorValue": {
          "title": "Chronic atrial fibrillation",
          "value": "ICD-10CM:I48.2"
        },
        "title": "Indication"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Cardizem",
          "value": "rxCUI:203494"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Digoxin",
          "value": "rxCUI:208707"
        },
        "title": "Drug"
      },
      {
        "id": "dosing.rxCUI",
        "selectorValue": {
          "title": "Metoprolol",
          "value": "rxCUI:1012996"
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
    "title": "Calcium channel blocker dosing guidance"
  },
  // *** MAPPING *** \\
  {
    "enabled": true,
    "piid": "pdspi-mapper-example-1",
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
    "enabled": false,
    "piid": "pdspi-mapper-example-2",
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
    "title": "Aminoglycoside variable mapper"
  },
  {
    "enabled": true,
    "piid": "pdspi-mapper-example-3",
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
    "title": "ICD-9cm to ICD-10cm variable mapper"
  },
  // *** FIHR *** \\
  {
    "enabled": true,
    "piid": "pdspi-fhir-example",
    "pluginSelectors": [],
    "pluginType": "f",
    "pluginTypeTitle": "FHIR",
    "title": "FHIR data provider"
  }
];
export default SAMPLE_PLUGINS;