import { useState } from 'react'
import './App.css'

import Editor from "./App/Editor";
import {store} from 'state-pool';
import { createState } from 'state-pool';


/**
 * Sets up global variables being used by the application so that editor doesn't
 * throw an error on load if object doesn't exist.
 */
if (typeof window.purencool_editor_config === "undefined") {
    window.purencool_editor_config = {
        "scss_api_url": "undefined",
        "compile_api_url": "undefined",
        "open_api_url": "undefined",
        'connect_api_url' : "undefined",
        "connect_api_key": "undefined",
        "connect_api_domain": "undefined"
    };
}


/**
 * Sets global api url for single connection variables.
 */
if (typeof window.purencool_editor_config.global_api_url !== undefined) {
    window.purencool_editor_config["scss_api_url"] = window.purencool_editor_config.global_api_url;
    window.purencool_editor_config["compile_api_url"] = window.purencool_editor_config.global_api_url;
    window.purencool_editor_config["open_api_url"] = window.purencool_editor_config.global_api_url;
}


/**
 * Sets global state for api.
 */
if (typeof window.purencool_editor_config.connect_api_url !== undefined) {
    window.purencool_editor_config["connect_api_url"] = window.purencool_editor_config.connect_api_url;
    window.purencool_editor_config["connect_api_key"] = window.purencool_editor_config.connect_api_key;
    window.purencool_editor_config["connect_api_domain"] = window.purencool_editor_config.connect_api_domain;
}


/**
 * @type object global scripted elements.
 */
let scriptedElements = [
    {'element_type':'span', 'label':''}
];
if (typeof window.purencool_editor_config.scripted_array !== undefined) {
    scriptedElements = window.purencool_editor_config.scripted_array;
}
window.purencool_editor_config['scripted_elements'] = scriptedElements;


/**
 * @type object default global message.
 */
let defaultMessage = {"title": "Update check","message": "Purencool api editor check...","hash": 1111};
window.purencool_editor_config['message'] = defaultMessage;


/**
 *  @todo These varibles need to used by global_vars and not directly in the
 *  app.
 */
window.purencool_editor_config["globalKeyPress"] = "1";
window.purencool_editor_config["editors_container_width"] = 40;



/**
 * Add Window Variables to Global Variable Store.
 */
store.setState("global_vars", window.purencool_editor_config);



/**
 * GlobalEditorArray saves all the data collected in the Editors.
 */
store.setState("global_editor_array", [{title: "", code: ""}]);


console.log(window.purencool_editor_config);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

