import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SelectorDisplay from "../selector-display/selector-display.component";

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
          <Fragment key={ i }>
            { selector.id === "pluginType" ? 
              pluginTypeDisplay(selector) : 
              <SelectorDisplay selector={ selector } /> }
            { i !== a.length - 1 ? 
              <Box ml={ 1 } display="flex" alignContent="center"><Add /></Box> 
            : null }
          </Fragment>
        ))}
    </>
  )
};

export default SelectorTableSelectors;