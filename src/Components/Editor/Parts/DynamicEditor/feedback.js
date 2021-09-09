import React, { useState, useEffect } from "react";
import $ from "jquery";

/**
 * Returns compiled Feedback action information.
 * 
 * @param object props 
 *   Props object with parameters "title" and "message" 
 * @returns object Feedback 
 *   Response object before rendering.
 */
const Feedback = (props) => {
  
  /**
   * Close feedback box with className="close-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handleClose = () => {
    $(".pnc-feedback-wrapper").slideToggle( "slow" );
  };
  

  return (
       <div id="pnc-feedback-id"  className="pnc-feedback-wrapper display1-none">
          <div>
            <button onClick={handleClose} className="close-btn">Close</button>
            <h4>{props.title}</h4>
            <p>{props.message}</p>
          </div>
       </div>
    );
};

export default Feedback;
