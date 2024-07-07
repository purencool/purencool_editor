import React, {useState, useEffect} from "react";
import Slider from "rc-slider";
import $ from "jquery";
import store from "./Components/Util/store";
import MainNavigation from "./Parts/mainNavigation";
import DynamicEditor from "./Components/DynamicEditor/DynamicEditor";
import SecondIframe from "./Parts/secondIframe";

import Help from './Parts/help';
import Feedback from './Parts/feedback';
import Settings from "./Parts/settings";
import ScriptedElements from './Components/ScriptedElements/ScriptedElements';

/**
 * Add Window Variables to Global Variable Store.
 */
store.setState("global_vars", window.purencool_editor_config);

/**
 * GlobalEditorArray saves all the data collected in the Editors.
 */
store.setState("global_editor_array", [{title: "", code: "",configuration: {}}]);

/**
 * Returns compiled Editor and all Objects attached to it.
 *
 * @returns object Editor
 *    Response object before rendering.
 */
const Editor = () => {

    /**
     * Global Vars.
     *
     * @type object global_vars.
     *   Returns global_vars set at the start of the application.
     */
    const globalVars = store.useState("global_vars");
    /**
     * InputList saves all the data collected in the Editors.
     *
     * The inputList function contains an array of objects that is changed by
     * setRatio and updates useState.
     *
     * @type array
     *   Returns array of Json objects.
     */
    const inputList = store.useState("global_editor_array");
  
    /**
     * Ratio function that updates useState.
     *
     * The ratio function updates an int value that is changed by
     * setRatio and updates useSate.
     *
     * @type int
     *   Returns from useState.
     */
    const [ratio, setRatio] = useState(50);

    /**
     * Adds style live style element to iframe.
     *
     * @param object e
     *   Gets object from the className="pnc-url" text input.
     * @returns void
     *   Has no return value.
     *
     */
    const handleInputChangeUrl = (e) => {

        // Added URL to src in iframe so that it can fetch site to be styled.
        let pattern = /^((http|https):\/\/)/;
        if (e.target.value.startsWith("/")) {
            document.getElementById("pnc-iframe").src = e.target.value;
        } else if (!pattern.test(e.target.value)) {
            e.target.value = "https://" + e.target.value;
            document.getElementById("pnc-iframe").src = e.target.value;
        } else {
            document.getElementById("pnc-iframe").src = e.target.value;
        }

        // Adds inline style tag to iframed header when URL is initalised.
        $('#pnc-iframe').on('load', function () {
            const head = $("#pnc-iframe").contents().find("head");
            $(head).append('<style id="live-purencool-editor"></style>');
        });
    };


    /**
     * Updates slider value so it can set the ratio in the editor.
     *
     * The editor has two main divs that need to be resize from left to right as
     * this sets setRatio function that then intern changes the inlite styles of
     * className="pnc-editor-panel and className="pnc-editor-website-frame".
     *
     * @param int val
     *   Gets int value from the className="slider" Slider module.
     * @returns Null
     *   Arrow function does not return any value.
     */
    const updateSlider = (val) => {
        setRatio(val);
    };


    /**
     * Controls default url's for the iframe input box. 
     *
     * @returns String
     *   Returns url string for Iframe if it's set by default.
     */
    const updateIframeUrl = () => {
        if(globalVars[0].default_iframe_url == 'undefined'){
            return '';
        }
        return globalVars[0].default_iframe_url;
    };


    /**
     * React hook used for when the UI is initalising
     */
    useEffect(() => {
        $('#pnc-iframe').on('load', function () {
            $(this).contents().find('body').on('click', 'a', function (e) {
                console.log(this.href);
                $('.pnc-url').val(this.href);
            });
        });

    }, []);

    return (
        <div className="pnc-editor-wrapper">
            <Slider className="slider" onChange={updateSlider} defaultValue={50}/>
            <div className="pnc-editor-container">
                <div className="pnc-left-panel pnc-editor-panel pnc-box"
                     style={{width: `${ratio}%`}}>
                    <div className="pnc-left-systems">
                        <div className="pnc-left-menu position-relative float-left">
                        <MainNavigation />
                        </div>
                        <div className="pnc-left-inputs position-relative float-right">
                            <DynamicEditor/>
                            <SecondIframe />
                        </div>
                    </div>
                </div>
                <div className="pnc-right-panel pnc-editor-website-frame pnc-box"
                     style={{width: `${100 - ratio}%`}}>
                    <div className="pnc-editor-iframe-container">
                        <div className="pnc-url-form">
                            <input
                                type="text"
                                name="url"
                                className="pnc-url"
                                placeholder="Add url and press enter"
                                defaultValue={updateIframeUrl()}
                                onKeyUp={e => e.key === 'Enter' && handleInputChangeUrl(e)}
                            />
                        </div>
                        <div id="pnc-iframe-container">
                            <iframe id="pnc-iframe"
                                    key="lllll"
                                    className="pnc-iframe"
                                    title="website view"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Feedback message={globalVars[0].message} />
            <Help inputList={inputList} />
           <Settings />
        </div>
    );
};

export default Editor;
