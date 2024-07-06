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
const CssFiles = () => {
  
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const globalVars = store.useState("global_vars");

  /**
   * Options creation.
   * 
   * @type object options.
   *   Returns options array creation.
   */ 
  const options = [];
  for (const [key, value] of Object.entries(globalVars[0].css_files)) {
    options.push(<option value={key} key={key}>{value}</option>);
  }

  return (
        <select name="code-editor-css-file-" >  
          { options }          
        </select>
    );
}

export default CssFiles;