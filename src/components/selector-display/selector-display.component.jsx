import React from "react";
import { Box } from "@material-ui/core";

const SelectorDisplay = ({ selector }) => {
  return (
    <>
      <Box component="span">{ selector.id }—{ selector.title }</Box>
      : <Box component="span" fontWeight="fontWeightMedium">
        { selector.selectorValue.value }{ selector.selectorValue.title ? ("—" + selector.selectorValue.title) : null }
      </Box>
    </>
  );
};

export default SelectorDisplay;