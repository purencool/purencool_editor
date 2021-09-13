import React from "react";

/**
 * Returns splitScreen information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const splitScreen = () => {
  
  /**
   * Button to show help called className="split-screen-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handleSplitScreen = () => {
    const div = document.querySelector('#pnc-second-frame-id');
    if (div.classList.contains('display-none')) {
      div.classList.remove('display-none');
    } else {
      div.classList.add('display-none');
    }
  };

  return (
      <button onClick={handleSplitScreen} className="split-screen-btn">Split Screen</button> 
    );
};

export default splitScreen;


