import axios from "axios";

/**
 *
 *
 * @param inputList
 * @param setInputList
 * @param compileApiUrl
 * @returns {Promise<void>}
 */
const compileScss = async (inputList, setInputList, compileApiUrl) => {
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

  try {
    const res = await axios.post(compileApiUrl, { compiled: updatedInputList });
    console.log("compileScss ==>", res.data);
  } catch (err) {
    console.error("Error compiling SCSS:", err);
  }
};

export default compileScss;
