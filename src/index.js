import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./App/Editor";
import {store} from 'state-pool';


/**
 * Sets up global variables being used by the application.
 */
if (typeof window.purencool_editor_config === "undefined") {
  window.purencool_editor_config = {
    "scss_api_url": "undefined",
    "compile_api_url": "undefined",
    "open_api_url": "undefined"
  };
} 


/**
 * Sets global state store
 */
if (typeof window.purencool_editor_config.global_api_url !== "undefined") {
  window.purencool_editor_config = {
    "scss_api_url": window.purencool_editor_config.global_api_url,
    "compile_api_url": window.purencool_editor_config.global_api_url,
    "open_api_url": window.purencool_editor_config.global_api_url
  };
}


/**
 * @type object global scripted elements
 */
let scriptedElements = [
  {'element_type':'span', 'label':''}
];
if (typeof window.purencool_editor_config.scripted_array !== "undefined") {
  scriptedElements = window.purencool_editor_config.scripted_array;
}
window.purencool_editor_config['scripted_elements'] = scriptedElements;


/**
 * @type object default global message
 */
let defaultMessage = {"title": "Welcome","message": "Version 1.0","hash": 1111};
window.purencool_editor_config['message'] = defaultMessage;


/**
 *  @todo These varibles need to used by global_vars and not directly in the
 *  app
 */
window.purencool_editor_config["globalKeyPress"] = "1";
window.purencool_editor_config["editors_container_width"] = 40;


/**
 * Add Window Variables to Global Variable Store
 */
store.setState("global_vars", window.purencool_editor_config);



/**
 * GlobalEditorArray saves all the data collected in the Editors.
 */
store.setState("global_editor_array", [{title: "", code: ""}]);


console.log(window.purencool_editor_config);

/**
 * Initializing application.
 */
ReactDOM.render(
        <React.StrictMode>
          <Editor />
        </React.StrictMode>,
        document.getElementById("root")
        );

