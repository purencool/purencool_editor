import React from "react";
import store from "../Components/Util/store";

/**
 * Returns compiled Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const Help = (props) => {
  
  /**
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const globalVars = store.useState("global_vars");

  return (
      <div>
          <div id="pnc-pop-up-wrapper-id"  className="pnc-pop-up-wrapper display-none">
              <div className="pnc-">
                <div>
                  <h2>Help</h2>
                  <p></p>
                  <h3>Version</h3>
                  <p>Purencool editor version is 1.6.0</p>
                  <h3>Compile</h3>
                  <p></p>
                  <h3>Live View</h3>
                  <p></p>
                </div>
                <div>
                  <h3>Global Array</h3>
                  <pre>{JSON.stringify(globalVars, undefined, 2)}</pre>
                </div>
                <div>
                  <h3>Live Data</h3>
                  <pre>{JSON.stringify(props.inputList, undefined, 2)}</pre>
                </div>
              </div>
            </div>
      </div>
    );
};

export default Help;


