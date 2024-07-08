import React from "react";
import store from "../../../Components/Util/store";

/**
 * Returns CssFiles information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const CssFiles = (props) => {
  
  let ideNumber = props.ideNumber;


  /**
   * InputList saves all the data collected in the Editors.
   *  
   * The inputList function contains an array of objects that is changed by 
   * setRatio and updates useState. 
   * 
   * @type array 
   *   Returns array of Json objects.
   */
  const [inputList, setInputList] = store.useState("global_editor_array");

  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const globalVars = store.useState("global_vars");

  /**
   * Receives data from the select input.
   * 
   * This function collates the data from the select input
   * and adds it to the inputList to be used later on in different contexts.
   *  
   * @param object inputValue
   *   Data object from dropdown input.
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
    const  handleCssFileChange = (inputValue, index) => {
      const list = [...inputList];
      let addToList = JSON.stringify(list);
      let parseList = JSON.parse(addToList);
      parseList[index]['configuration'] = {
        'css_files': {
          'index': index,
          'value': inputValue
        }
      }
      setInputList(parseList);
    };
  

  /**
   * Options creation and store results.
   * 
   * @type object options.
   *   Returns options array creation.
   */ 
  const options = [];
    for (const [key, value] of Object.entries(globalVars[0].css_files)) {
      if(inputList[ideNumber]['configuration']['css_files'] == undefined){
        handleCssFileChange('default', ideNumber)
      }
      if(key == inputList[ideNumber]['configuration']['css_files']['value']){
        options.push(<option value={key} key={key} selected >{value.name}</option>);
      } else{
        options.push(<option value={key} key={key}>{value.name}</option>);
      }
    }

  return (
      <select name={`code-editor-css-file-${ideNumber}`} onChange={e => handleCssFileChange(e.target.value, ideNumber)} >  
        { options }          
      </select>
    );
}

export default CssFiles;