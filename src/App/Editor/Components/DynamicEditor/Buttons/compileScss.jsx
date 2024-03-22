import React from "react";
import axios from "axios";
import store from "../../../Components/Util/store"

/**
 * Compiled Scss action.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const compileScss = () => {
  
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [globalVars, setMessage, messageUpdateF] = store.useState("global_vars");
  
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
   * Sends requests to API for SCSS to be compiled and saved.
   * 
   * @returns void
   *   Has no return value.
   */
  const handleCompile = async () => {
    if (globalVars.compile_api_url !== "undefined") {
      const res = await axios
              .post(globalVars.compile_api_url, {"compiled": inputList}, {})
              //.then(response => {
              //console.log(response.data.live_response);
              // }) 
              .catch((err) => console.log("Error", err));
 
      console.log("compileScss ==>", res.data);
      // Changes message box values to update user of progress  
      messageUpdateF(globalVars => {
        globalVars.message.title = 'Compiled';
        let message = 'SCSS has been compiled and deployed.';
        globalVars.message.message = message;
        globalVars.message.hash = Math.floor(1000 + Math.random() * 9000);
      });
    }  
  };

  return (
      <button onClick={handleCompile} className="compile-btn">Compile</button>
    );
};

export default compileScss;
