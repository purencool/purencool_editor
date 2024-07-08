import React, { useEffect } from "react";
import $ from "jquery";
import store from "../Components/Util/store";

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
   * Global Vars.
   * 
   * @type object global_vars.
   *   Returns global_vars set at the start of the application.
   */
  const globalVars = store.useState("global_vars");
  
  /**
   *  toggleMessage function.
   * 
   * @returns void
   *   Has no return value.
   */
  const toggleMessage = () => {      
    $(".pnc-feedback-wrapper").slideToggle( "slow" );
  };
  
  /**
   * Opens feeback when the prop changes. 
   * 
   * @returns void
   *   Has no return value.
   */
  useEffect(() => {
   if(globalVars[0].message.hash !== props.message.hash) {
    toggleMessage();
    setTimeout( function ( ) { toggleMessage(); }, 5000 );
   }
   if(props.message.title === 'Update check'){ 
     props.message.title = 'Welcome';
     props.message.message = "The version number is displayed under help";
     setTimeout( function ( ) { toggleMessage(); }, 4000 );
   }
  });
  
  return (
       <div id="pnc-feedback-id"  className="pnc-feedback-wrapper">
          <div>
            <div id="pnc-feedback-title">
               <p>{props.message.title}</p>
            </div> 
            <p>{props.message.message}</p>
          </div>
       </div>
    );
};

export default Feedback;
