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


import axios from "axios";
import { Button } from "@material-ui/core";

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

class DynamicEditor extends React.Component {

  render() {
    const onChange = (newCode) => {
      console.log(newCode);
    };
    
      const compile = async (val) => {
 
   // console.log(val);
    // local host : http://localhost:8001/
    // replace it on line 48, 53 and 182
   // await axios
    //        .post("http://localhost:8001/", val, {})
   //         .then((res) => console.log(res.statusText))
    //        .catch((err) => console.log("Error", err));

  //  setRand(rand + 1);
  //  await axios.get("http://localhost:8001/", {});
  };

    
    
    let items = ['Item 1'];


    return (
            <div>
                {items.map((item, index) => {
                            return (
                                    <div key={index}>
                                        <label >{item}</label>
                                        <input type="text" placeholder="SCSS File Title"/>
                                        <AceEditor 
                                            className="editor" 
                                            mode="css" placeholder={"CSS or SCSS"}
                                            onChange={onChange}
                                            setOptions={{
                                                            enableBasicAutocompletion: true,
                                                            enableLiveAutocompletion: true,
                                                            enableSnippets: true,
                                                          }}
                                            />
                                    </div>
                                    )
                          })
                }
                            
    
            
                <div>
                  <Button onClick={compile}> Build</Button>
                </div>
               <div>
                  <Button onClick={compile}> New</Button>
                </div>
             
            </div>
           
            );
  }
}
;

export default DynamicEditor;