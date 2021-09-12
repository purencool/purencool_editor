import React from "react";

/**
 * Returns compiled Help information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const showHelp = () => {
  
  /**
   * Button to show help called className="live-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handleShowHelp = () => {
    const div = document.querySelector('#pnc-pop-up-wrapper-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
  };

  return (
      <button onClick={handleShowHelp} className="help-btn">Help</button> 
    );
};

export default showHelp;


