import React from "react";
import $ from "jquery";

/**
 * Returns compiled Help information.
 * 
 * @returns object Help 
 *   Response object before rendering.
 */
const editorsDisplays = () => {
  
  /**
   * Closes all editors with className="hide-all-editors-btn".
   * 
   * @returns void
   *   Has no return value.
   */
  const handlEditorsDisplays = () => {
    $(".editor").slideToggle("fast");
  };

  return (
      <button onClick={handlEditorsDisplays} className="editors-displays-btn">Editors</button> 
    );
};

export default editorsDisplays;


