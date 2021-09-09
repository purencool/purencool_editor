import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-min-noconflict/mode-html";
import $ from "jquery";
import axios from "axios";
import {useGlobalState} from 'state-pool';

import Help from './Parts/DynamicEditor/help';
import Feedback from './Parts/DynamicEditor/feedback';

/**
 * Returns compiled DynamicEditor and all Objects attached to it.
 * 
 * @returns object DynamicEditor
 *    Response object before rendering.
 */
const DynamicEditor = () => {

  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [globalVars] = useGlobalState("global_vars");

  /**
   * InputList saves all the data collected in the Editors.
   *  
   * The inputList function contains an array of objects that is changed by 
   * setRatio and updates useState. 
   * 
   * @type array 
   *   Returns array of Json objects.
   */
  const [inputList, setInputList] = useState([{title: "", code: ""}]);

  /**
   * Receives data from the className="pnc-title" text input.
   * 
   * This function collates the data from the className="pnc-title" text input
   * and adds it to the inputList to be used later on in different contexts.
   *  
   * @param object e
   *   Data object from text input.
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  /**
   * Request the system opens storage and gets compiled Json object.
   * 
   * Asks API to open storage object with a certian name and receives a 
   * compiled object that contains data that can populate the list of text
   * editors in the left hand panel.
   * 
   * @param string file
   *   Storages name be opened. 
   * @returns void
   *   Has no return value.
   */
  const openStorage = (file) => {
    axios
            .post(globalVars.open_api_url, {"open": file}, {})
            .then(response => {
              console.log("JSON data from API ==>", response.data.compiled);
              if (response.data.compiled === undefined) {
                setInputList([{title: "", code: ""}]);
              } else {
                setInputList(response.data.compiled);
              }
            })
            .catch((err) => console.log("Error", err));

  };

  /**
   * React hook used for when the UI is initalising
   */
  useEffect(() => {
    (async () => {
      openStorage('default');
    })();
  }, []);

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
   *  SCSS to button called className="live-btn" to compile CSS.
   * 
   * @returns void
   *   Has no return value.
   */
  const live = async () => {
    window.purencool_editor_config["globalKeyPress"] = "1";
    buildScss();
  };

  /**
   * Allows developer to use the keypress ";" to compile SCSS.
   * 
   * This function collates the data from the className="editor"  textarea
   * to compile SCSS.
   * 
   * @param string code
   *   Data string from text input.
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
  const handleCodeInputChange = async (code, index) => {

    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 186) {
        window.purencool_editor_config["globalKeyPress"] = "1";
      }
    });

    const list = [...inputList];
    list[index]['code'] = code;
    setInputList(list);

    buildScss();
  };

  /**
   * Sends requests to API for SCSS to be compiled and saved.
   * 
   * @returns void
   *   Has no return value.
   */
  const compile = async () => {
    console.log(inputList);
    if (globalVars.compile_api_url !== "undefined") {
      const res = await axios
              .post(globalVars.compile_api_url, {"compiled": inputList}, {})
              //.then(response => {
              //console.log(response.data.live_response);
              // }) 
              .catch((err) => console.log("Error", err));
    }
  };

  /**
   * Button to show help called className="live-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const showHelp = () => {
    const div = document.querySelector('#pnc-pop-up-wrapper-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
  };

  /**
   * Removes editor with a certian index className="delete-editor".
   * 
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
  const handleDeleteClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };


  /**
   * Adds editor with a certian index className="add-editor".
   * 
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
  const handleAddClick = () => {
    setInputList([...inputList, {title: "", code: ""}]);
  };
  

  /**
   * Closes editor with a certian index className="display-editor-btn".
   * 
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
  const handleEditorDisplay = (i) => {
    $(".editor-"+i).slideToggle( "fast" );
  };
  
 
  /**
   * Closes all editors with className="hide-all-editors-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handlEditorsDisplays = () => {
    $(".editor").slideToggle( "fast" );
  };
  
  
  return (
          <div>
            <div className="pnc-panel-navigation-wrapper">
              <div className="pnc-panel-navigation">
                <div className="pnc-panel-container">
                  <button onClick={compile} className="compile-btn">Compile</button>
                  <button onClick={live} className="live-btn">Live view</button>
                  <button onClick={showHelp} className="help-btn">Help</button> 
                  <button onClick={handlEditorsDisplays} className="editors-displays-btn">Close/Open Editors</button> 
                </div>
              </div>
              <div className="pnc-panel-spacing"></div>
            </div>
            {inputList.map((x, i) => {
                        return (
                                <div key={i} className="pnc-editor-component">
                                  <input 
                                    type="text" 
                                    name="title"
                                    className="pnc-title"
                                    placeholder="SCSS Title"
                                    value={x.title}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <div className={"editor editor-"+i}>
                                  <AceEditor 
                                    name="code"
                                    mode="css" placeholder={"CSS or SCSS"}
                                    onChange={value => handleCodeInputChange(value, i)}
                                    value={x.code}
                                    setOptions={{
                                          enableBasicAutocompletion: true,
                                          enableLiveAutocompletion: true,
                                          enableSnippets: true,
                                          minLines: 6,
                                          maxLines: 30,
                                          wrap: true,
                                          autoScrollEditorIntoView: true
                                        }}
                                    />
                                    </div>
                                  <div>
                                    {inputList.length !== 1 && <button onClick={() => handleDeleteClick(i)} className="delete-editor">Delete</button>}
                                    {inputList.length - 1 === i && <button onClick={handleAddClick} className="add-editor">Add</button>}
                                    <button onClick={e => handleEditorDisplay(i)} className="display-editor-btn">Close/Open</button>
                                  </div>           
                                </div>
                                );
                      })
            }
            <Feedback title="" message=""/>
            <div id="pnc-pop-up-wrapper-id"  className="pnc-pop-up-wrapper display-none">
              <div className="pnc-pop-up-box">
                <div>
                  <h2>Help</h2>
                  <p></p>
                  <h3>Compile</h3>
                  <p></p>
                  <h3>Live View</h3>
                  <p></p>
                </div>
                <div>
                  <h3>Live Data</h3>
                  {JSON.stringify(inputList)}
                </div>
              </div>
            </div>
          </div>
          );
};

export default DynamicEditor;