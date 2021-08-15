import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";


/*
    
 * @type type            <AceEditor
          className="editor"
          fontSize={fontSize}
          style={{ width: `${ratio}%`, height: "85vh" }}
          mode="html"
          theme={theme}
          onChange={onChange}
          width="auto"
          placeholder={"Start coding"}
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
 
 */

class DynamicEditor extends React.Component{

  render() {
    return (
      <div>
        <div>
          <div>
 <AceEditor
          className="editor"
          mode="html"

        />
   

          </div>
        </div>
      </div>
    );
  }
};

export default DynamicEditor;