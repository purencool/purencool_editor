import React from "react";

/**
 * Returns compiled Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const Editors = (props) => {
  
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

    const list = [...props.inputList];
    list[index]['code'] = code;
    setInputList(list);
    buildScssObject(props.inputList,global_vars);
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
          {props.inputList.map((x, i) => {
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
                                  <div className={"editor editor-" + i}>
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
                                    {props.inputList.length !== 1 && <button onClick={() => handleDeleteClick(i)} className="delete-editor">Delete</button>}
                                    {props.inputList.length - 1 === i && <button onClick={handleAddClick} className="add-editor">Add</button>}
                                    <button onClick={e => handleEditorDisplay(i)} className="display-editor-btn">Close/Open</button>
                                  </div>           
                                </div>
                                );
                      })
            }
          
          </div>
    );
};

export default Editors;


