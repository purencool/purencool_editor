import React, {useEffect} from "react";
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-min-noconflict/mode-html";
import $ from "jquery";
import axios from "axios";
import store from "../../Components/Util/store";
import CssFiles from "./Parts/CssFiles";

import {buildScssObject} from '../Util/buildScssObject';

import ApiCall from './Parts/api';

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
    let url = globalVars[0].open_api_url;
    if (url !== "undefined") {
      axios.post(url, {"open": file}, {})
              .then(response => {
                console.log("openStorage ==>", response.data.compiled);
                if (response.data.compiled === undefined) {
                  setInputList([{title: "", code: ""}]);
                } else {
                  setInputList(response.data.compiled);
                }
              })
              .catch((err) => console.log("Error", err));
    }

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
    let addToList = JSON.stringify(list);
    let parseList = JSON.parse(addToList);
    parseList[index]['code'] = code;
    setInputList(parseList);
    buildScssObject(parseList, globalVars);
  };


  /**
   * Receives data from the className="pnc-title" text input.
   * 
   * This function collates the data from the className="pnc-title" text input
   * and adds it to the inputList to be used later on in different contexts.
   *  
   * @param object title
   *   Data object from text input.
   * @param int index
   *   Contains editors text input index number.
   * @returns void
   *   Has no return value.
   */
    const handleTitleChange = (title, index) => {
      const list = [...inputList];
      let addToList = JSON.stringify(list);
      let parseList = JSON.parse(addToList);
      parseList[index]['title'] = title.target.value;
      setInputList(parseList);
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
    setInputList([...inputList, {title: "", code: "",configuration: {}}]);
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
    $(".editor-" + i).slideToggle("fast");
  };

  return (
          <div className="pnc-editors">
            {inputList.map((x, i) => {
                return (
                    <div key={i} className="pnc-editor-component">
                        <input type="text" name={"code-editor-title-" + i} className="pnc-title"  
                          placeholder="SCSS File Title"  value={x.title} onChange={e => handleTitleChange(e, i)} />

                        <button onClick={()=> handleEditorDisplay(i)} className="display-editor-btn">+/-</button>
                        <div className={"editor editor-" + i}>
                              <AceEditor 
                               name={"code-editor-" + i}
                               mode="css" 
                               placeholder={"CSS or SCSS"}
                               setValue="testing to see"
                               onChange={value => handleCodeInputChange(value, i)}
                               value={x.code}
                               setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: true,
                                  minLines: 9,
                                  maxLines: 30,
                                  wrap: true,
                                  autoScrollEditorIntoView: true }} />
                              { globalVars[0].css_files == undefined ? "" : <CssFiles ideNumber={i} /> }
                              {
                                inputList.length !== 1 && <button onClick={() => handleDeleteClick(i)} className="delete-editor float-right">Del</button>
                              }
                              </div> 
                             <div>   
                          </div>
                          { inputList.length - 1 === i && <button onClick={handleAddClick} className="add-editor  clear-both float-right">Add</button> }    
                    </div>
                  );
                }
              )
            }
          </div>
          );
};

export default DynamicEditor;