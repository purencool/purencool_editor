import React from "react";
import store from "../../../Components/Util/store";

/**
 * Returns CssFiles information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const CssFiles = () => {
  
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
                <div>
                  <h3>Global Array</h3>
                  <pre>{JSON.stringify(globalVars[0].css_files , undefined, 2)}</pre>
                </div>
            </div>
      </div>
    );
}

export default CssFiles;