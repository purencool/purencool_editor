import axios from "axios";
import $ from "jquery";

/**
 *
 * @param inputList
 * @param compileApiUrl
 */
export const liveScss = (inputList, compileApiUrl) => {
  console.log(inputList)

  /**
   *
   * @param scssUpdate
   * @returns {boolean}
   */
  const compileLiveAccessFunc = (scssUpdate) => {
    let openingBraces = (scssUpdate.match(/\{/g) || []).length;
    let closingBraces = (scssUpdate.match(/\}/g) || []).length;
    return openingBraces === closingBraces;
  };

  /**
   *
   * @returns {Promise<void>}
   */
  const buildScssFunc = async () => {
    const updatedInputList = inputList.map((item, index) => {
      const editorId = `ace-editor-${index}`;
      const editor = window.ace && window.ace.edit(editorId);
      if (editor) {
        const editorCode = editor.getValue();
        return { ...item, code: editorCode };
      } else {
        console.error(`Editor with ID ${editorId} not found.`);
        return { ...item, code: '' };
      }
    });

    /**
     *
     */
    let scssUpdate = updatedInputList.map(item => item.code || '').join('');
    if (compileLiveAccessFunc(scssUpdate)) {
      try {
        console.log(scssUpdate);
        const res = await axios.post(compileApiUrl, { "live": scssUpdate });
        console.log("buildScss compiling ==>", res.data);
        if (res.data.live_response !== undefined) {
          $(document).ready(function () {
            let iFrame = $("iframe#pnc-iframe").contents();
            iFrame.find("#live-purencool-editor")
              .empty()
              .append(res.data.live_response);
          });
        }
      } catch (err) {
        console.error("Error compiling SCSS:", err);
      }
    }
  };

  buildScssFunc();
};

export default liveScss;
