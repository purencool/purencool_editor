import React from "react";
import {useGlobalState} from 'state-pool';

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
  const [global_vars] = useGlobalState("global_vars");
  
  
  /**
   * InputList saves all the data collected in the Editors.
   *  
   * The inputList function contains an array of objects that is changed by 
   * setRatio and updates useState. 
   * 
   * @type array 
   *   Returns array of Json objects.
   */
  const [inputList] = useGlobalState("global_editor_array");
  
  
 /**
   *  SCSS to button called className="live-btn" to compile CSS.
   * 
   * @returns void
   *   Has no return value.
   */
  const handleLive = async () => {
    window.purencool_editor_config["globalKeyPress"] = "1";
    buildScssObject(inputList,global_vars);
  };

  return (
       <button onClick={handleLive} className="live-btn">Live view</button>
    );
};

export default liveScss;


