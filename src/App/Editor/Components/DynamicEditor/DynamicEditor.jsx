import React, {useEffect} from "react";
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-min-noconflict/mode-html";
import $ from "jquery";
import axios from "axios";
import store from "../../Components/Util/store";


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
  console.log(inputList)
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
    if (globalVars.open_api_url !== "undefined") {
      axios.post(globalVars.open_api_url, {"open": file}, {})
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
    console.log("handle code input change");
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 186) {
       // console.log("I have made 186");
      //  console.log(code);
      //  console.log(index);
        window.purencool_editor_config["globalKeyPress"] = "1";
      }
    });
    console.log("code");
    console.log(code);
    const list = [...inputList];
    console.log("list");
    console.log(list);
    let addtolist = JSON.stringify(list);
    console.log("addToList");
   console.log(addtolist);
   let parselist = JSON.parse(addtolist);
   console.log("parseList");
  console.log(parselist);

   parselist[index]['code'] = code;
  console.log("parseListAddedCode");
 console.log(parselist);

    setInputList(parselist);
    //buildScssObject(parselist, globalVars);
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
    $(".editor-" + i).slideToggle("fast");
  };

  return (
          <div className="pnc-editors">
            {inputList.map((x, i) => {
                        return (
                                <div key={i} className="pnc-editor-component">
                                  <input 
                                    type="text" 
                                    name={"code-editor-title-" + i}
                                    className="pnc-title"
                                    placeholder="SCSS File Title"
                                    value={x.title}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                  <div className={"editor editor-" + i}>
                                    <AceEditor 
                                     // ref={
                                     //   this.aceEditor.on("change", (e) => {
                                      //    const code =  this.aceEditor.getValue();
                                      //    console.log(code);
                                      //})
                                      //;
                                      //  instance => {
                                      // this.aceEditor = instance;
                                      //}
                                    //}

                                      name={"code-editor-" + i}
                                      mode="css" 
                                      placeholder={"CSS or SCSS"}
                                      setValue="testing to see"
                                      onChange={value => handleCodeInputChange(value, i)}
                                      value={x.code}
                                      setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true
                                      }} />


                                  </div>
                                  <div>
                                     {globalVars.connect_api_url !== 'undefined' ? <ApiCall elementKey={i} /> : ""}  
                                     {inputList.length !== 1 && <button onClick={() => handleDeleteClick(i)} className="delete-editor">Delete</button>}
                                     {inputList.length - 1 === i && <button onClick={handleAddClick} className="add-editor">Add</button>}                                   
                                     <button onClick={()=> handleEditorDisplay(i)} className="display-editor-btn">Close/Open</button>
                                  </div>           
                                </div>
                              );
                    })
            }
          </div>
          );
};

export default DynamicEditor;