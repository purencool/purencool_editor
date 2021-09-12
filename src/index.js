import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./Components/Editor";
import {store} from 'state-pool';

let defaultMessage = {
  "title": "Welcome", 
  "message": "Version 1.0", 
  "hash": 1111
};
        

/**
 * Sets up global variables being used by the application.
 */
if (typeof window.purencool_editor_config === "undefined") {
  window.purencool_editor_config = {
    "scss_api_url": "undefined",
    "compile_api_url": "undefined",
    "open_api_url": "undefined",
    "message": defaultMessage
  };
} else {
  window.purencool_editor_config['message'] = defaultMessage;
}

/**
 * Sets global state store
 */
if (typeof window.purencool_editor_config.global_api_url !== "undefined") {
  store.setState(
          "global_vars",
          {
            "scss_api_url": window.purencool_editor_config.global_api_url,
            "compile_api_url": window.purencool_editor_config.global_api_url,
            "open_api_url": window.purencool_editor_config.global_api_url,
            "message": defaultMessage
          }
  );
} else {
  store.setState("global_vars", window.purencool_editor_config);
}


window.purencool_editor_config["globalKeyPress"] = "1";
window.purencool_editor_config["editors_container_width"] = 40;
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

