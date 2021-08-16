import React from "react";
import DynamicEditor from "../Components/DynamicEditor.js"
import 'bootstrap/dist/css/bootstrap.css';
import '../Editor/index.css';
import {store} from 'state-pool';

store.setState("count", 0);

function Editor() {
  return (
    <div className="pnc-editor-container">
      <div className="pnc-editor-panel">
         <DynamicEditor/>
      </div>  
      <div className="pnc-editor-website-frame">
         <iframe className="frame"title="website view" src="" />
      </div>
    </div>
  );
}

export default Editor;
