import React from "react";

/**
 * Returns compiled Help information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const editorSettings = () => {
  
  /**
   * Button to show help called className="live-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handleEditorSettings = () => {
    const div = document.querySelector('#editor-settings-wrapper-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
  };

  return (
      <button onClick={handleEditorSettings} className="editor-settings-btn">Settings</button> 
    );
};

export default editorSettings;


