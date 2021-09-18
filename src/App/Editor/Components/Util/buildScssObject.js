import axios from "axios";
import $ from "jquery";

/**
 * Updates live css in style html tag in iframe.
 *
 * @param object global_vars.
 *   Returns global_vars set at the start of the application.
 * @param inputList
 *   The inputList function contains an array of objects that is changed
 */
export const buildScssObject = (inputList,globalVars) => {
  
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
  const compileLiveAccessFunc = (scssUpdate) => {
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
  const buildScssFunc = async () => {

    let scssUpdate = '';
    for (let i = 0; i < inputList.length; i++) {
      scssUpdate = scssUpdate + inputList[i].code;
    }

    if (compileLiveAccessFunc(scssUpdate) === true) {
      try {
        const res = await axios
                .post(globalVars.scss_api_url, {"live": scssUpdate}, {})
                //.then(response => {
                //console.log(response.data.live_response);
                // }) 
                .catch((err) => console.log("Error", err));


        console.log("buildScss compiling ==>", res.data);
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

 


  buildScssFunc();
  //console.log(globalVars);
  //console.log(inputList);
};

