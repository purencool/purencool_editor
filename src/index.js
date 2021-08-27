import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./Components/Editor";
import {store} from 'state-pool';


if (typeof window.purencool_editor_config !== "undefined") {
   store.setState("global_vars", window.purencool_editor_config);
} else {
   store.setState(
     "global_vars",
     {
            "api_url": "undefined"
     }  
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
  document.getElementById("root")
);

