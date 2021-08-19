import React, { useState } from "react";
import DynamicEditor from "../Components/DynamicEditor.js"
import 'bootstrap/dist/css/bootstrap.css';
import '../Editor/index.css';
import {store} from 'state-pool';

store.setState("count", 0);


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
           src="about:blank"
           >
           
           </iframe>
        </div>
      </div>
    </div>
  );
}

export default Editor;
