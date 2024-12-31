import React from "react";

import liveScss from "../../../Components/Util/liveScss";
import store from "../../../Components/Util/store";

/**
 * Returns live Scss information.
 *
 * @returns object Help
 *   Response object before rendering.
 */
const LiveScss = () => {

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
  const handleLiveClick = () => {
    const compileApiUrl = globalVars[0]?.scss_api_url;
    if (compileApiUrl) {
      liveScss(inputList, compileApiUrl);
    } else {
      console.error("Compile API URL is not defined.");
    }
  };


  return (
      <button onClick={handleLiveClick} className="live-btn">Preview</button>
  );
};

export default LiveScss;


