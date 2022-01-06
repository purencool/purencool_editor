import React from "react";
import {useGlobalState} from 'state-pool';

/**
 * Returns compiled Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const Settings = (props) => {
  
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const [global_vars] = useGlobalState("global_vars");

  return (
      <div>
          <div id="editor-settings-wrapper-id"  className="pnc-pop-up-wrapper display-none">
              <div className="pnc-">
                <div>
                  <h2>Settings</h2>
                  <p></p>
              </div>
            </div>
          </div>  
      </div>
    );
};

export default Settings;


