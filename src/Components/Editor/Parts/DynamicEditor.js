import React, {useState} from "react";
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-min-noconflict/mode-html";

import axios from "axios";

import {useGlobalState} from 'state-pool';

import jQuery from "jquery";

/**
 * 
 * @returns {String}
 */
const DynamicEditor = () => {

  const [globalVars] = useGlobalState("global_vars");
  
  /**
   * 
   * @returns {undefined}
   */
  const compile = async () => {
    console.log(inputList);
    console.log(globalVars.api_url);
    if (globalVars.api_url !== "undefined") {
      await axios
              .post(globalVars.api_url, inputList, {})
              .then((res) => console.log(res.statusText))
              .catch((err) => console.log("Error", err));
    }
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
  const handleCodeInputChange = async (code, index) => {
    
    document.addEventListener("keydown", function(e){
       if(e.keyCode === 186){  
         window.purencool_editor_config["globalKeyPress"] = "1";
       }
    });
     


 
    
    const list = [...inputList];
    list[index]['code'] = code;
    setInputList(list);

    let scssUpdate = '';
    for (let i = 0; i < inputList.length; i++) {
      scssUpdate = scssUpdate + inputList[i].code;
    }

    function complileLiveAccess(scssUpdate) {
      let results = false;

      if (globalVars.api_url !== "undefined") {
        let braces = (scssUpdate.split("{").length - 1) + (scssUpdate.split("}").length - 1);
        let colons = (scssUpdate.split(":").length - 1) + (scssUpdate.split(";").length - 1);
       
         
        
        if (braces%2 === 0 & colons%2 === 0 & (braces+colons) !== 0){
         if(window.purencool_editor_config.globalKeyPress === "1") {
            window.purencool_editor_config["globalKeyPress"] = "0";
            console.log('Numbers is so going to the compiler'); 
	        results = true;
          }
        } 

      }

      return results;
    }



    if (complileLiveAccess(scssUpdate) === true) {
      try {
   
        const res = await axios
                .post(globalVars.api_url, {"live": scssUpdate}, {})
                //.then(response => {
                //console.log(response.data.live_response);
                // }) 
                .catch((err) => console.log("Error", err));


        console.log("JSON data from API ==>", res.data.live_response);
        if (res.data.live_response !== undefined) {
          jQuery(document).ready(function () {
            let iFrame = jQuery("iframe#pnc-iframe").contents();
            iFrame.find("#live-purencool-editor")
                    .empty()
                    .append(res.data.live_response);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }




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
  const showData = () => {
    const div = document.querySelector('#pnc-pop-up-wrapper-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
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
              <div className="pnc-panel-navigation-wrapper">
                  <div className="pnc-panel-navigation">
                      <button onClick={compile}> Build</button>
                      <button onClick={showData}>Settings</button> 
                  </div>
                  <div className="pnc-panel-spacing">
          
                  </div>
              </div>
              {inputList.map((x, i) => {
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
              <div id="pnc-pop-up-wrapper-id"  className="pnc-pop-up-wrapper display-none">
                  <div className="pnc-pop-up-box">
                      <div>
                          <h3>Data</h3>
                          {JSON.stringify(inputList)}
                      </div>
                  </div>
              </div>
          </div>
          );
};

export default DynamicEditor;