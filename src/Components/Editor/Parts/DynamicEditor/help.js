import React, { useState, useEffect } from "react";

/**
 * Returns compiled Help information.
 * 
 * @returns object Help 
 *    Response object before rendering.
 */
const Help = () => {

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
                   this.props.inputLists
                </div>
              </div>
            </div>
      </div>
    );
};

export default Help;


