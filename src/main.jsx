import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/Editor/App.jsx'
import './assets/global.css'
import './assets/index.css'
import './assets/slider.css'



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
        "connect_api_domain": "undefined",
        "default_iframe_url": "undefined",
        "css_files": "undefined"
    };
}


/**
 * Sets global api url for single connection variables.
 */
if (typeof window.purencool_editor_config.global_api_url !== "undefined") {
    window.purencool_editor_config["scss_api_url"] = window.purencool_editor_config.global_api_url;
    window.purencool_editor_config["compile_api_url"] = window.purencool_editor_config.global_api_url;
    window.purencool_editor_config["open_api_url"] = window.purencool_editor_config.global_api_url;
    window.purencool_editor_config["default_iframe_url"] = window.purencool_editor_config.default_iframe_url;
    window.purencool_editor_config["css_files"] = window.purencool_editor_config.css_filles;
}


/**
 * Sets global state for external api.
 */
if (typeof window.purencool_editor_config.connect_api_url !== "undefined") {
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
if (typeof window.purencool_editor_config.scripted_array !== "undefined") {
    scriptedElements = window.purencool_editor_config.scripted_array;
}
window.purencool_editor_config['scripted_elements'] = scriptedElements;


/**
 * @type object default global message.
 */
let defaultMessage = {"title": "Update check","message": "Purencool api editor check...","hash": 1111};
window.purencool_editor_config['message'] = defaultMessage;


/**
 *  @todo These variables need to used by global_vars and not directly in the
 *  app.
 */
window.purencool_editor_config["globalKeyPress"] = "1";
window.purencool_editor_config["editors_container_width"] = 40;


/**
 * Initializing application.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
