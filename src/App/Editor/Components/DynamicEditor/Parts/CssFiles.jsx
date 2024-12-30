import React, { useEffect } from "react";
import store from "../../../Components/Util/store";

const CssFiles = (props) => {
  let ideNumber = props.ideNumber;
  const [inputList, setInputList] = store.useState("global_editor_array");
  const globalVars = store.useState("global_vars");

  useEffect(() => {
    // Check if the css_files property is undefined and needs to be set to default
    if (inputList[ideNumber] && inputList[ideNumber].configuration && inputList[ideNumber].configuration['css_files'] === undefined) {
      handleCssFileChange('default', ideNumber);
    }
  }, [ideNumber, inputList]); // Depend on ideNumber and inputList to re-run the effect when they change

  const handleCssFileChange = (inputValue, index) => {
    if (index < 0 || index >= inputList.length) {
      return;
    }

    const newList = [...inputList];
    const newConfiguration = {
      ...newList[index].configuration,
      css_files: {
        'index': index,
        'value': inputValue
      }
    };

    newList[index] = { ...newList[index], configuration: newConfiguration };
    setInputList(newList);
  };

  const options = globalVars[0] && globalVars[0].css_files
    ? Object.entries(globalVars[0].css_files).map(([key, value]) => (
      <option value={key} key={key}>{value.name}</option>
    ))
    : [];

  return (
    <select
      name={`code-editor-css-file-${ideNumber}`}
      onChange={e => handleCssFileChange(e.target.value, ideNumber)}
      value={inputList[ideNumber]?.configuration?.css_files?.value || ''}
    >
      {options}
    </select>
  );
}

export default CssFiles;
