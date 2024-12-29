import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
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
   * @type {{current: ({}|null)}}
   */
  const editorRefs = useRef({});

  /**
   * Create a list of editors.
   */
  const [aceLoaded, setAceLoaded] = useState(false);

  /**
   * React hook used for when the UI is initalising.
   */
  useEffect(() => {

    /**
     * On load open storage.
     */
    (async () => {
      openStorage('default');
    })();

    /**
     * Check if Ace cdn is loading editor
     */
    const checkAceLoaded = () => {
      if (window.ace) {
        console.log('Ace Editor is loaded.'); // Confirm that Ace is loaded
        setAceLoaded(true);
      } else {
        // If not loaded, check again after a delay
        setTimeout(checkAceLoaded, 300);
      }
    };
    checkAceLoaded();

    /**
     * If it loaded then continue
     */
    if (aceLoaded) {

      /**
       * Ace Editor is loaded, initialize the editors
       */
      inputList.forEach((_, i) => {
        const editorId = `ace-editor-${i}`;
        const editorEl = document.getElementById(editorId);
        if (editorEl && !editorRefs.current[editorId]) {
          const editor = window.ace.edit(editorId);
          editor.session.setMode('ace/mode/css');
          editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            minLines: 9,
            maxLines: 30,
            wrap: true
          });
          editor.setAutoScrollEditorIntoView(true);

          /**
           * Check if the inputList item is defined before setting the editor value
           */
          if (inputList[i] && typeof inputList[i].code === 'string') {
            editor.setValue(inputList[i].code);
          } else {
            console.error(`Code for editor at index ${index} is undefined.`);
          }

          /**
           * Add keypress and if enter is added then save code.
           * @param event
           */
          const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
              window.purencool_editor_config["globalKeyPress"] = "0";
              handleCodeInputChange(editor.getValue(), i);
            }
          };
          window.addEventListener('keydown', handleEnterKeyPress);

          editorRefs.current[editorId] = editor;

        }
      });
    }

    /**
     * Mount editors
     */
    return () => {
      Object.values(editorRefs.current).forEach((editor) => {});
    };
  }, [aceLoaded, inputList]); // Re-run when aceLoaded changes or inputList changes

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
    window.purencool_editor_config["globalKeyPress"] = "1";
    console.log(code)
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
    setInputList([...inputList, {title: "", code: "", configuration: {}}]);
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
        const editorId = `ace-editor-${i}`;
        return (
          <div key={i} className="pnc-editor-component">
            <input type="text" name={"code-editor-title-" + i} className="pnc-title"
                   placeholder="SCSS File Title" value={x.title} onChange={e => handleTitleChange(e, i)}/>
            <button onClick={() => handleEditorDisplay(i)} className="display-editor-btn">+/-</button>
            <div className={"editor editor-" + i}>
              <div id={editorId}/>
              {globalVars[0].css_files == undefined ? "" : <CssFiles ideNumber={i}/>}
              {inputList.length !== 1 &&
                <button onClick={() => handleDeleteClick(i)} className="delete-editor float-right">Del</button>}
            </div>
            {inputList.length - 1 === i &&
              <button onClick={handleAddClick} className="add-editor  clear-both float-right">Add</button>}
          </div>
        );
      })}

    </div>
  );
}
export default DynamicEditor;
