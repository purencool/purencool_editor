import React, { useState } from "react";
import Slider from "rc-slider";
import $ from "jquery";

import DynamicEditor from "./Components/DynamicEditor/DynamicEditor.js";
import ShowHelp from './Components/DynamicEditor/Buttons/showHelp';
import EditorsDisplays from './Components/DynamicEditor/Buttons/editorsDisplays';
import CompileScss from './Components/DynamicEditor/Buttons/compileScss';
import LiveScss from './Components/DynamicEditor/Buttons/liveScss';

import ScriptedElements from './Components/ScriptedElements/ScriptedElements';

/**
 * Returns compiled Editor and all Objects attached to it.
 * 
 * @returns object Editor 
 *    Response object before rendering.
 */
const Editor = () => {

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

    // Addeds URL to src in iframe so that it can fetch site to be styled.
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
    if (val === 20) {
      console.log(val);
    }
  };

  return (
          <div className="pnc-editor-wrapper">
            <Slider className="slider" onChange={updateSlider} defaultValue={50} />
            <div className="pnc-editor-container" >
              <div className="pnc-editor-panel pnc-box" 
                   style={{width: `${ratio}%`}}>
                <div className="pnc-panel-navigation-wrapper">
                  <div className="pnc-panel-navigation">
                    <div className="pnc-panel-container">
                      <CompileScss/>
                      <LiveScss/>
                      <ShowHelp />
                      <EditorsDisplays />
                    </div>
                  </div>
                  <div className="pnc-panel-spacing"></div>
                </div>
                <div>
                  <ScriptedElements />
                </div>   
                <DynamicEditor/>
              </div>
              <div className="pnc-editor-website-frame pnc-box"           
                   style={{width: `${100 - ratio}%`}}>
                <div className="pnc-editor-iframe-container">
                  <div className="pnc-url-form">
                    <input 
                      type="text" 
                      name="url"
                      className="pnc-url"
                      placeholder="Add url and press enter"
                      onKeyPress={e => e.key === 'Enter' && handleInputChangeUrl(e)}
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
          
          </div>
          );
}

export default Editor;
