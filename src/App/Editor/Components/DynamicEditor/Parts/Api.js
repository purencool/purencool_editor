import React, {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {useGlobalState} from 'state-pool';

/**
 * Returns api information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const api = (props) => {

  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [global_vars] = useGlobalState("global_vars");


  /**
   * Response from the api Vars.
   * 
   * @type object useState array.
   *   Returns useState array set for local request.
   */
  const [inputList, setInputList] = useState([]);


  /**
   * Response from the api code.
   * 
   * @type object useState array.
   *   Returns useState array set for local request.
   */
  const [codeList, setCodeList] = useState([]);


  /**
   * React hook used for when the UI is initalising
   */
  useEffect(() => {

    axios.post(global_vars.api_url, {"data": 'editor'}, {})
            .then(response => {
              setInputList([...inputList, response.data]);
            })
            .catch((err) => console.log("Error", err));
  }, []);


  const handleApiCall = (e) => {
    axios.post(global_vars.api_url, {"code": e}, {})
            .then(response => {
              setCodeList([...codeList, response.data]);
            })
            .catch((err) => console.log("Error", err));
  };


  const handleCopy = (i) => {
    navigator.clipboard.writeText(codeList[codeList.length - 1]);
    $("#wrapper-code-pre-"+i).slideUp('fast');
    $("#code-pre-"+i).empty();
  };



  return (
          <div className="pnc-api-container"  onChange={e => handleApiCall(e.target.value)}>
            <select className={props.elementKey}>
              <option value="none" > 
                Select required SCSS
              </option> 
              {inputList.length === 0 ?
                ""
                :
                inputList[0].map((x, i) => {
                  return  <option key={i} value={x.id} className={x.id} > 
                      {x.label}
                    </option>;
                  
                })
              }
            </select> 
          
            {(() => {
                if (codeList[0] !== undefined) {
                  return <div id={"wrapper-code-pre-" + props.elementKey}>
                    <pre id={"code-pre-" + props.elementKey}> {codeList[codeList.length - 1]}</pre>
                    <button onClick={() => handleCopy(props.elementKey)}>Copy to clipboard and clear</button>
                    <p></p>
                  </div>;
                }

                return "";
              })()}
          </div>
          );
};

export default api;


