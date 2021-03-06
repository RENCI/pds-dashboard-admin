import React from "react";
import { Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const typeMap = {
  g: "Guidance",
  c: "Convenience",
  m: "Mapper",
  f: "FHIR",
  mD: "Default Mapper",
  fD: "Default FHIR"
};

const SelectorTableSelectors = ({ selectors }) => {
  const filterPluginType = true;

  const selectorDisplay = selector => (
    <>
      <Box component="span">{ selector.id }—{ selector.title }</Box>
      : <Box component="span" fontWeight="fontWeightMedium">
        { selector.selectorValue.value }{ selector.selectorValue.title ? ("—" + selector.selectorValue.title) : null }
      </Box>
    </>
  );

  const pluginTypeDisplay = selector => (
    <>
      <Box component="span">{ selector.id }</Box>
      : <Box component="span" fontWeight="fontWeightMedium">{ typeMap[selector.selectorValue.value] }</Box>
    </>
  );

  return (
    <>
      { selectors
          .filter(selector => filterPluginType ? 
            !(selector.id === "pluginType" && selector.selectorValue.value === "g") : true
          ).map((selector, i, a) => (
            <div key={ i }>
              { selector.id === "pluginType" ? pluginTypeDisplay(selector) : selectorDisplay(selector) }
              { i !== a.length - 1 ? <Box ml={ 2 }><Add /></Box> 
              : null }
            </div>
          ))}
    </>
  )
};

export default SelectorTableSelectors;