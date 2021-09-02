import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./Components/Editor";
import {store} from 'state-pool';


/**
 * 
 */
if (typeof window.purencool_editor_config !== "undefined") {
     if (typeof window.purencool_editor_config.global_api_url !== "undefined" ){   
        store.setState(
         "global_vars",
          {
            "scss_api_url": window.purencool_editor_config.global_api_url,
            "compile_api_url": window.purencool_editor_config.global_api_url,
            "open_api_url": window.purencool_editor_config.global_api_url
          }  
        );
     } else {
       store.setState("global_vars", window.purencool_editor_config);
     }
   } else {
     store.setState(
       "global_vars",
       {
          "scss_api_url": "undefined",
          "compile_api_url": "undefined",
          "open_api_url": "undefined"
       }  
  );
}

window.purencool_editor_config["globalKeyPress"] = "1";
window.purencool_editor_config["editors_container_width"] = 40;
console.log(window.purencool_editor_config);

/**
 * 
 */
ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById("root")
);

