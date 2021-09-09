import React, { useState, useEffect } from "react";
import $ from "jquery";

/**
 * Returns compiled Feedback action information.
 * 
 * Example message object.
 * 
 * {
 *   "title": "Purencool Editor", // Displaying the title string 
 *   "message": "Version 1.0",    // Message string informing user of action
 *   "hash": ""                   // Hashs is used for forcing prop change
 * }
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
  
  
  /**
   * Opens feeback when the prop changes. 
   * 
   * @returns void
   *   Has no return value.
   */
  useEffect(() => {
    $(".pnc-feedback-wrapper").slideDown( "slow" );
  });
  
  
  return (
       <div id="pnc-feedback-id"  className="pnc-feedback-wrapper display1-none">
          <div>
            <button onClick={handleClose} className="close-btn">X</button>
            <h4>{props.message.title}</h4>
            <p>{props.message.message}</p>
          </div>
       </div>
    );
};

export default Feedback;
