import React from "react";
import {useGlobalState} from 'state-pool';

/**
 * Returns compiled Help information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const ScriptedElements = () => {
  
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [globalVars] = useGlobalState("global_vars");
  
  console.log(globalVars);

   let elements = ["div", "span", "button"];
   return (
        <div>
            {
                elements.map((el, index) => 
                    React.createElement(el, { key: index }, "hello"))
            }
        </div>
    );
};

export default ScriptedElements;


