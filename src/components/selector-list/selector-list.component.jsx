import React, { useState } from "react";
import "./selector-list.styles.scss";

const SelectorList = ({ filterSelectorList, setFilterSelectedList }) => {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault()
    if (value === "") {
      return alert("add selector")
    }
    filterSelectorList.push(value);
    setValue("");
  }

  const handleRemove = (i) => {
    setFilterSelectedList(filterSelectorList.filter((_, index) => index !== i));
  }

  return (
    <div className="grid-item">
      <form onSubmit={handleSubmit}>
        <div className="form-label">Add Selectors</div>
        <input
          name="addSelector"
          type="text"
          placeholder="ie ICD-10CM:I48.91"
          className="selector-input"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <div onClick={handleSubmit} className="add-selector">+</div>
      </form>
      <div className="filter-panel">
        <span>Plugins are filtered with the following selectors</span>
        <span>Click on a selector to stop filtering</span>
        <div className="filter-list">
          {filterSelectorList.map((selector, i) => <div className="chip" key={selector} onClick={() => handleRemove(i)}><span>{selector}</span></div>)}
        </div>
      </div>
    </div>
  )
}

export default SelectorList;