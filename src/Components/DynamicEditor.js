import React, {useState} from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { Button } from "@material-ui/core";

import {useGlobalState} from 'state-pool';

const DynamicEditor = () => {

  const [count, setCount] = useGlobalState("count");

  let incrementCount = (e) => {
    setCount(count + 1)
  }


  const compile = async () => {
    console.log(inputList);


   await axios
           .post("http://localhost:8000", inputList, {})
           .then((res) => console.log(res.statusText))
           .catch((err) => console.log("Error", err));
  };


  /**
   * 
   * @type type
   */
  const [inputList, setInputList] = useState([{title: "", code: ""}]);

  /**
   * 
   * @param {type} e
   * @param {type} index
   * @returns {undefined}
   */
  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

/**
 * 
 * @param {type} code
 * @param {type} index
 * @returns {undefined}
 */
  const handleCodeInputChange = (code, index) => {
    const list = [...inputList];
    list[index]['code'] = code;
    setInputList(list);
  };

  /**
   * 
   * @param {type} index
   * @returns {undefined}
   */
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  /**
   * 
   * @returns {undefined}
   */
  const handleAddClick = () => {
    setInputList([...inputList, {title: "", code: ""}]);
  };


  return (
          <div>
              <div>
                  <Button onClick={compile}> Build</Button>
                   <div>
                     <a href="#" className="pnc-open">Data</a> 
                   </div>
              </div>
              <div>
                  Count: {count}
                  <br/>
                  <button onClick={incrementCount}>Click</button>
              </div>
              {inputList.map(
                (x, i) => {
                  return (
                    <div key={i} className="pnc-editor-component">
                      <input 
                        type="text" 
                        name="title"
                        className="pnc-title"
                        placeholder="SCSS Title"
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
                      <div>
                        {inputList.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                        {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                      </div>           
                    </div>
                  );
                 })
              }
              <div className="pnc-pop-up-wrapper display-none">
                 <a href="#" className="pnc-close">Close</a> 
                 <div className="pnc-pop-up-box">
                     {JSON.stringify(inputList)}
                 </div>
              </div>
          </div>
          );
};

export default DynamicEditor;