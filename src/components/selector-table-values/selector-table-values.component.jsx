import React from 'react';

const SelectorTableValues = ({ legalValues }) => {
  return (
    <>
      { legalValues.enum.map((value, i) => <div key={ i} >{ value.value } | { value.title}</div>) }
    </>
  )
};

export default SelectorTableValues;