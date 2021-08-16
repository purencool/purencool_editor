import React, {useState} from "react";
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

const DynamicEditor = () => {


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


  const [inputList, setInputList] = useState([{title: "", code: ""}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleCodeInputChange = (code, index) => {
    const list = [...inputList];
    list[index]['code'] = code;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {title: "", code: ""}]);
  };


  return (
          <div>
              <div>
                  <Button onClick={compile}> Build</Button>
              </div>
              {inputList.map((x, i) => {
                          return (
                                <div key={i}>
                            
                                    <input 
                                        type="text" 
                                        name="title"
                                        placeholder="SCSS File Title"
                                        value={x.title}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                    <AceEditor 
                                        className="editor" 
                                        name="code"
                                        mode="css" placeholder={"CSS or SCSS"}
                                        onChange={value => handleCodeInputChange(value, i)}
                                        value={x.code}
                                        setOptions={{
                                                enableBasicAutocompletion: true,
                                                enableLiveAutocompletion: true,
                                                enableSnippets: true,
                                                minLines: 6,
                                                maxLines: 30,
                                                wrap: true,
                                                autoScrollEditorIntoView: true
                                              }}
                                        />
                            
                            
                            
                                    <div className="btn-box">
                                        {inputList.length !== 1 && <button
                                            className="mr10"
                                            onClick={() => handleRemoveClick(i)}>Remove</button>}
                                        {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                    </div>           
                                </div>
                                  )
                        })
              }
              <div>{JSON.stringify(inputList)}</div>
          </div>
          );
};

export default DynamicEditor;