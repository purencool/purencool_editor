import React, { useEffect } from "react";
import $ from "jquery";

/**
 * Returns SecondIframe Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const SecondIframe = () => {
  
  /**
   * Adds url element to iframe.
   * 
   * @param object e
   *   Gets object from the className="pnc-second-url" text input.
   * @returns void
   *   Has no return value.
   *   
   */
  const handleSecondInputChangeUrl = (e) => {

    // Addeds URL to src in iframe so that it can fetch site.
    let pattern = /^((http|https):\/\/)/;
    if (e.target.value.startsWith("/")) {
      document.getElementById("pnc-second-iframe").src = e.target.value;
    } else if (!pattern.test(e.target.value)) {
      e.target.value = "https://" + e.target.value;
      document.getElementById("pnc-second-iframe").src = e.target.value;
    } else {
      document.getElementById("pnc-second-iframe").src = e.target.value;
    }
  };
  
  /**
   * Close second iframe  box with className="close-second-iframe-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handleCloseSecondIframe = () => {
    const div = document.querySelector('#pnc-second-frame-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
  };
  
  /**
   * React hook used for when the UI is initalising
   */
  useEffect(() => {
   $('#pnc-second-iframe').on('load', function(){
    $(this).contents().find('body').on('click', 'a', function(e){
        console.log(this.href);
        $('.pnc-second-url').val(this.href);
        
      });
   });

  }, []);
  
  
  return (
          <div id="pnc-second-frame-id" className="pnc-second-frame display-none">
            <div className="pnc-editor-iframe-container">
              <div className="pnc-url-form">
                
                <input 
                  type="text" 
                  name="second-url"
                  className="pnc-second-url"
                  placeholder="Add url and press enter"
                  onKeyPress={e => e.key === 'Enter' && handleSecondInputChangeUrl(e)}
                  />
                 <button onClick={handleCloseSecondIframe} className="close-second-iframe-btn">Close</button>  
                       
              </div>
              <div id="pnc-iframe-container">
                <iframe id="pnc-second-iframe" 
                        key="lllll"
                        className="pnc-second-iframe"
                        title="website view" 
                        />
              </div>
            </div>
          </div>
          );
};

export default SecondIframe;


