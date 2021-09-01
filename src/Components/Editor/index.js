import React, { useState, useEffect } from "react";
import DynamicEditor from "./Parts/DynamicEditor.js";
import Slider from "rc-slider";
import $ from "jquery";

/**
 * 
 * @returns {Function|String}
 */
const Editor = () => {
    const [ratio, setRatio] = useState(50);
  
  /**
   * 
   * @param {type} e
   * @returns {undefined}
   */
  const handleInputChangeUrl = (e) => {

    let pattern = /^((http|https):\/\/)/;
    if (e.target.value.startsWith("/")) {
      document.getElementById("pnc-iframe").src = e.target.value;
    } else if (!pattern.test(e.target.value)) {
      e.target.value = "https://" + e.target.value;
      document.getElementById("pnc-iframe").src = e.target.value;
    } else {
      document.getElementById("pnc-iframe").src = e.target.value;
    }

    $('#pnc-iframe').on('load', function () {
      //const doc = document.getElementById('pnc-iframe').contentWindow.document.head;
      //doc.append('<style id="live-purencool-editor"></style>');
      const head = $("#pnc-iframe").contents().find("head");
      $(head).append('<style id="live-purencool-editor"></style>');
    });
  };


  const updateSlider = (val) => {
    setRatio(val);
  };

  return (
          <div className="pnc-editor-wrapper">
                <Slider className="slider" onChange={updateSlider} defaultValue={50} />
            <div className="pnc-editor-container" >
              <div className="pnc-editor-panel pnc-box" 
                   style={{ width: `${ratio}%`}}>
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
