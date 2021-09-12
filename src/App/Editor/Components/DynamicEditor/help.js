import React from "react";

/**
 * Returns compiled Help information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const Help = (props) => {
  return (
      <div>
          <div id="pnc-pop-up-wrapper-id"  className="pnc-pop-up-wrapper display-none">
              <div className="pnc-pop-up-box">
                <div>
                  <h2>Help</h2>
                  <p></p>
                  <h3>Compile</h3>
                  <p></p>
                  <h3>Live View</h3>
                  <p></p>
                </div>
                <div>
                  <h3>Live Data</h3>
                   {JSON.stringify(props.inputList)}
                </div>
              </div>
            </div>
      </div>
    );
};

export default Help;


