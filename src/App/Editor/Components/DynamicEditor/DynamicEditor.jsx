import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import $ from 'jquery';

import compileScss from "../../Components/Util/compileScss";
import liveScss from "../../Components/Util/liveScss";
import store from "../../Components/Util/store";
import CssFiles from "./Parts/CssFiles";
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
   * @type {{current: ({}|null)}}
   */
  const editorRefs = useRef({});

  /**
   * Create a list of editors.
   */
  const [aceLoaded, setAceLoaded] = useState(false);


  /**
   * Loads editors
   */
  useEffect(() => {
    const checkAceLoaded = () => {
      if (window.ace) {
        console.log('Ace Editor is loaded.');
        setAceLoaded(true);
      } else {
        setTimeout(checkAceLoaded, 300);
      }
    };
    checkAceLoaded();
  }, []);

  /**
   * Used when there is a change to an editor or one s altered.
   */
  useEffect(() => {
    if (aceLoaded) {
      inputList.forEach((x, index) => {
        const editorId = `ace-editor-${index}`;
        const editorEl = document.getElementById(editorId);
        if (editorEl && !editorRefs.current[editorId]) {
          // Initialize the Ace Editor
          /**
           *
           */
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

          editor.setValue(x.code || '', -1);
          editorRefs.current[editorId] = editor;

          /**
           * Allows you use key bindings.
           *  2. 'Ctrl S' saves and compiles
           */
          editor.commands.addCommand({
            name: 'saveOnCtrlEnter',
            bindKey: {win: 'Ctrl-S', mac: 'Cmd-S'},
            exec: function (editor) {
              compileScss(inputList, setInputList, globalVars[0]?.compile_api_url);
            }
          });

          /**
           * Allows you use key bindings.
           *  1. 'Ctrl L' updates live view.
           */
          editor.commands.addCommand({
            name: 'updateLiveView',
            bindKey: { win: 'Ctrl-L', mac: 'Cmd-L' },
            exec: function (editor) {
              liveScss(inputList, globalVars[0]?.scss_api_url);
            }
          });
        } else if (editorEl && editorRefs.current[editorId]) {
          // If the editor is already initialized, update the form value
          const editor = editorRefs.current[editorId];
          editor.setValue(x.code || '', -1);
        }
      });
    }
  }, [aceLoaded, inputList]);

  /**
   * Request the system opens storage and gets compiled Json object.
   *
   * Asks API to open storage object with a certian name and receives a
   * compiled object that contains data that can populate the list of text
   * editors in the left hand panel.
   *
   * @param string data
   *   Storages name be opened.
   * @returns void
   *   Has no return value.
   */
  const openStorage = async (data) => {
    if (!globalVars || !globalVars[0] || typeof globalVars[0].open_api_url === 'undefined') {
      console.error('The open_api_url is not defined in globalVars.');
      return;
    }

    try {
      const response = await axios.post(globalVars[0].open_api_url, {"open": data});
      if (response.data.compiled !== undefined && typeof setInputList === 'function') {
        setInputList(response.data.compiled);
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  /**
   *
   */
  useEffect(() => {
    const openDefaultStorage = async () => {
      try {
        await openStorage('default');
      } catch (error) {
        console.error('An error occurred while opening storage:', error);
      }
    };
    openDefaultStorage();
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
    const newList = inputList.map((item, i) => {
      if (i === index) {
        return {...item, code};
      }
      return item;
    });
    setInputList(newList);
    console.log('inputList has been updated in handleCodeInputChange:', newList);
    buildScssObject(newList, globalVars);
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
  const handleTitleChange = (event, index) => {
    const newTitle = event.target.value;
    const updatedInputList = inputList.map((item, i) => {
      if (i === index) {
        return {...item, title: newTitle};
      }
      return item;
    });
    setInputList(updatedInputList);
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
