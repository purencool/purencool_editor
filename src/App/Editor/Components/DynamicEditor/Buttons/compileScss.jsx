import React from "react";

import compileScss from "../../../Components/Util/compileScss";
import store from "../../../Components/Util/store";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CompileScss = () => {

  /**
   * Global Vars.
   *
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const globalVars = store.useState("global_vars");


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
   *
   */
  const handleCompileClick = () => {
    const compileApiUrl = globalVars[0]?.compile_api_url;
    if (compileApiUrl) {
      compileScss(inputList, setInputList, compileApiUrl);
    } else {
      console.error("Compile API URL is not defined.");
    }
  };

  return (
    <button onClick={handleCompileClick} className="compile-btn">Save</button>
  );
};

export default CompileScss;
