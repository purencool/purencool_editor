import React, {useState} from "react";
import AceEditor from "react-ace";
//import axios from "axios";
import { Button } from "@material-ui/core";

import {useGlobalState} from 'state-pool';

const DynamicEditor = () => {

  const [count, setCount] = useGlobalState("count");

  let incrementCount = (e) => {
    setCount(count + 1)
  }



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
              </div>
              <div>
                  Count: {count}
                  <br/>
                  <button onClick={incrementCount}>Click</button>
              </div>
              {inputList.map(
                      (x, i) => {
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
                                                // enableBasicAutocompletion: true,
                                                // enableLiveAutocompletion: true,
                                                // enableSnippets: true,
                                                minLines: 6,
                                                maxLines: 30,
                                                wrap: true,
                                                autoScrollEditorIntoView: true
                                              }}
                                        />
                                    <div className="btn-box">
                                        {inputList.length !== 1 && <button
                                            className="mr10"
                                            onClick={() => handleRemoveClick(i)}>
                                            Remove
                                            </button>
                                            }
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