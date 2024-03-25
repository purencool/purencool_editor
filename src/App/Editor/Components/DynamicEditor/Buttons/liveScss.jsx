import React from "react";
import store from "../../../Components/Util/store"

import {buildScssObject} from '../../Util/buildScssObject';

/**
 * Returns live Scss information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const liveScss = () => {

  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [globalVars] = store.useState("global_vars");

  /**
   * InputList saves all the data collected in the Editors.
   *  
   * The inputList function contains an array of objects that is changed by 
   * setRatio and updates useState. 
   * 
   * @type array 
   *   Returns array of Json objects.
   */
  const [inputList] = store.useState("global_editor_array");

  /**
   *  SCSS to button called className="live-btn" to compile CSS.
   * 
   * @returns void
   *   Has no return value.
   */
  const handleLive = async () => {
    window.purencool_editor_config["globalKeyPress"] = "1";
    buildScssObject(inputList, globalVars);
  };

  return (
          <button onClick={handleLive} className="live-btn">Preview</button>
          );
};

export default liveScss;


