import React, {useEffect, useState} from "react";
import axios from "axios";
import store from "../../../Components/Util/store";

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
  const globalVars = store.useState("global_vars");


  /**
   * Response from the api Vars.
   * 
   * @type object useState array.
   *   Returns useState array set for local request.
   */
  const [inputList, setInputList]  = store.useState("global_editor_array");


  /**
   * Response from the api code.
   *
   * @type object useState array.
   *   Returns useState array set for local request.
   */
  const [codeList, setCodeList] = useState([]);


  /**
   * Sets display mode boolean.
   *
   * @type object useState array.
   *   Returns display mode boolean.
   */
  const [showApiDisplayResult, setshowApiDisplayResult] = useState(false);


  /**
   * React hook used for when the UI is initalising
   *  
   *  window.purencool_editor_config.connect_api_key;
   *  window.purencool_editor_config.connect_api_domain;
   */
  useEffect(() => {
    axios.post(globalVars.connect_api_url, {
              "data": "editor",
              "key": globalVars.connect_api_key ,
              "domain": globalVars.connect_api_domain 
            }, {})
            .then(response => {
              setInputList([...inputList, response.data]);
            })
            .catch((err) => console.log("Error", err));
    
  }, [showApiDisplayResult]);


  const handleApiCall = (e) => {
    axios.post(globalVars.connect_api_url, {"code": e}, {})
            .then(response => {
              setCodeList([...codeList, response.data]);
            })
            .catch((err) => console.log("Error", err));
    setshowApiDisplayResult(...showApiDisplayResult, true);
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(codeList[codeList.length - 1]);
    setshowApiDisplayResult(...showApiDisplayResult, false);
  };
  
  
  const handleClose = () => {
    setshowApiDisplayResult(...showApiDisplayResult, false);
  };


  return (
          <div className="pnc-api-container">
            <select className={props.elementKey} onChange={e => handleApiCall(e.target.value)}>
              <option value="none" > 
                Select SCSS partial
              </option> 
              {inputList.length === 0 ?
                        ""
                        :
                        inputList.map((x, i) => {
                        return  <option key={i} value={x.id} className={x.id} > 
                          {x.label}
                        </option>;
                })
              }
            </select> 
          
            {(() => {
                if (showApiDisplayResult === true) {
                  return <div className="pre-container" id={"wrapper-code-pre-" + props.elementKey}>
                    <div className="pre-container-menu">
                       <button onClick={() => handleCopy()}>Copy code to clipboard </button>or &nbsp;
                       <button onClick={() => handleClose()}> close and clear</button>.
                    </div>
                    <pre id={"code-pre-" + props.elementKey}> 
                      {codeList[codeList.length - 1]}
                    </pre>
                  </div>;
                }

                return "";
              })()}
          </div>
          );
};

export default api;
