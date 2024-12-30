import React, { useRef } from "react";
import axios from "axios";
import store from "../../../Components/Util/store";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CompileScss = () => {

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
   *
   * @returns {Promise<void>}
   */
  const handleCompile = async () => {

    /**
     *
     */
    const updatedInputList = inputList.map((item, index) => {
      const editorId = `ace-editor-${index}`;
      const editor = window.ace.edit(editorId);
      if (editor) {
        const editorCode = editor.getValue();
        return { ...item, code: editorCode };
      } else {
        console.error(`Editor with ID ${editorId} not found.`);
        return item;
      }
    });
    setInputList(updatedInputList);

    /**
     *
     */
    if (globalVars.compile_api_url !== "undefined") {
      try {
        const res = await axios.post(globalVars.compile_api_url, { compiled: updatedInputList });
        console.log("compileScss ==>", res.data);
        setGlobalVars((prevGlobalVars) => ({
          ...prevGlobalVars,
          message: {
            title: 'Compiled',
            message: 'SCSS has been compiled and deployed.',
            hash: Math.floor(1000 + Math.random() * 9000)
          }
        }));
      } catch (err) {
        console.error("Error compiling SCSS:", err);
      }
    }
  };

  return (
    <button onClick={handleCompile} className="compile-btn">Save</button>
  );
};

export default CompileScss;
