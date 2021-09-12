import $ from "jquery";
import axios from "axios";
import {useGlobalState} from 'state-pool';


/**
 * Returns compiled Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
export const buildScssObject = (inputList) => {
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [globalVars] = useGlobalState("global_vars");
  
  
  /**
   * Tests to see if the string syntactically correct.
   * 
   * Function tests to see if the string syntactically correct and will be 
   * effectively able to be compiled.
   * 
   * @param String scssUpdate.
   *   String for syntactically correct.
   * @returns Boolean
   *   Returns boolean.
   */
  function compileLiveAccess(scssUpdate) {
    let results = false;

    if (globalVars.scss_api_url !== "undefined") {
      let braces = (scssUpdate.split("{").length - 1) + (scssUpdate.split("}").length - 1);
      let colons = (scssUpdate.split(":").length - 1) + (scssUpdate.split(";").length - 1);

      if (braces % 2 === 0 & colons % 2 === 0 & (braces + colons) !== 0) {
        if (window.purencool_editor_config.globalKeyPress === "1") {
          window.purencool_editor_config["globalKeyPress"] = "0";
          results = true;
        }
      }
    }

    return results;
  }
  
  

  /**
   * Builds SCSS by sending a request to the server.
   * 
   * 
   * @returns void
   *   Has no return value.
   */
  const buildScss = async () => {
    

    let scssUpdate = '';
    for (let i = 0; i < inputList.length; i++) {
      scssUpdate = scssUpdate + inputList[i].code;
    }

    if (compileLiveAccess(scssUpdate) === true) {
      try {
        const res = await axios
                .post(globalVars.scss_api_url, {"live": scssUpdate}, {})
                //.then(response => {
                //console.log(response.data.live_response);
                // }) 
                .catch((err) => console.log("Error", err));


        console.log("JSON data from API ==>", res.data.live_response);
        if (res.data.live_response !== undefined) {
          $(document).ready(function () {
            let iFrame = $("iframe#pnc-iframe").contents();
            iFrame.find("#live-purencool-editor")
                    .empty()
                    .append(res.data.live_response);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  /**
   * 
   */
  buildScss(inputList);

};


