import React from "react";
import DynamicEditor from "../Components/DynamicEditor.js"
import {store} from 'state-pool';

store.setState("count", 0);

function Editor() {
  return (
          <div>
              <DynamicEditor/>
              <iframe
                  className="frame"
                  title="website view"
                  src=""
                  ></iframe>
          </div>
  );
}

export default Editor;
