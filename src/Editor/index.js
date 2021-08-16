import React from "react";
import DynamicEditor from "../Components/DynamicEditor.js"
import 'bootstrap/dist/css/bootstrap.css';
import '../Editor/index.css';
import {store} from 'state-pool';

store.setState("count", 0);

function Editor() {
  return (
    <div>
      <div className="editor-panel">
        <DynamicEditor/>
      </div>   
      <iframe
          className="frame"
          title="website view"
          src="">
       </iframe>
    </div>
  );
}

export default Editor;
