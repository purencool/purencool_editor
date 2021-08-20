import React, { useState } from "react";
import DynamicEditor from "./Parts/DynamicEditor.js"
import jQuery from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {store} from 'state-pool';

store.setState("count", 0);
store.setState("live_css_update", {css: "body{background: pink !important;}"});




  /**
   * 
   * @param {type} e
   * @returns {undefined}
   */
 const handleInputChangeUrl = (e) => {

  let pattern = /^((http|https):\/\/)/; 
  if(e.target.value.startsWith("/")) {
    document.getElementById("pnc-iframe").src=e.target.value;
  } 
  else if(!pattern.test(e.target.value)) {
    e.target.value = "https://" + e.target.value;
    document.getElementById("pnc-iframe").src=e.target.value;
  } else {
    document.getElementById("pnc-iframe").src=e.target.value;
  }
  
  jQuery('#pnc-iframe').on('load', function(){
      //const doc = document.getElementById('pnc-iframe').contentWindow.document.head;
      //doc.append('<style id="live-purencool-editor"></style>');
    const head = jQuery("#pnc-iframe").contents().find("head");
    jQuery(head).append('<style id="live-purencool-editor"></style>');
   });
 };

function Editor() {
  return (
    <div className="pnc-editor-container">
      <div className="pnc-editor-panel">
         <DynamicEditor/>
      </div>  
      <div className="pnc-editor-website-frame">
        <div className="pnc-url-form">
           <input 
             type="text" 
             name="url"
             className="pnc-url"
             placeholder="Add url and press enter"
             onKeyPress={e => e.key === 'Enter' &&  handleInputChangeUrl(e)}
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
  );
}

export default Editor;
