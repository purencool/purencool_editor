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
  // {'element':[
  //   {'element_type':'iframe','create':'no', 'id':'', 'class':'', 'src':'' }
  //   {'element_type':'button', 'id':'', 'class':'', 'src':'' }
  // ]},
   return (
        <div>
            {
                globalVars.scripted_elements.map((el, index) => 
                    React.createElement(el.element_type, { key: index }, el.label))
            }
        </div>
    );
};

export default ScriptedElements;


