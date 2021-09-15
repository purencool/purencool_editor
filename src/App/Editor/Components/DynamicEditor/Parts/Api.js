import React, {useEffect, useState} from "react";
import axios from "axios";
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
   * React hook used for when the UI is initalising
   */
  useEffect(() => {
     axios.post(global_vars.api_url, {"data": 'editor'}, {})
            .then(response => {
              setInputList([...inputList, response.data]);  
            })
            .catch((err) => console.log("Error", err));
  }, []);
  
 
  return (
          <div className="pnc-api-container">
            <select className={props.elementKey}>
              <option value="none" > 
                Select required SCSS
              </option> 
              {inputList[0] === undefined?
                 "loading...."
               : 
                 inputList[0].map((x, i) => {
                   return (
                    <option key={i} value={x.id} > 
                     {x.label}
                    </option> 
                  );
                })
              }
            </select> 
          </div>
    );
};

export default api;


