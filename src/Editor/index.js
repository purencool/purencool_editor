import React, { useState } from "react";
import DynamicEditor from "../Components/DynamicEditor.js"
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


import { CodingSection, Controls, EditorContainer } from "./EditorElements";

function Editor() {
  const [code, setCode] = useState("");
  const [rand, setRand] = useState(0);
  const [ratio, setRatio] = useState(45);
  const [fontSize, setFontSize] = useState(14);
  const [darkMode, setDarkMode] = useState({
    dark: true,
  });
  const [theme, setTheme] = useState(
          `${!darkMode.dark ? "kuroir" : "solarized_dark"}`
          );

 

  const onChange = (newCode) => {
    console.log(newCode)
    setCode(newCode);
  };

  const updateSlider = (val) => {
    setRatio(val);
    console.log(val);
  };

  const handleDarkMode = (event) => {
    setDarkMode({...darkMode, [event.target.name]: event.target.checked});
    if (darkMode.dark) {
      setTheme("kuroir");
    } else {
      setTheme("solarized_dark");
    }
  };

  return (
          <EditorContainer className={`${darkMode.dark ? "dark" : ""}`}>
              <CodingSection>
                  <DynamicEditor/>
                  <iframe
                      className="frame"
                      key={rand}
                      style={{
                                  width: `${100 - ratio}%`,
                                  height: "85vh",
                                  background: "white",
                                }}
                      src=""
                      ></iframe>
              </CodingSection>
              <Slider className="slider" onChange={updateSlider} defaultValue={45} />
          </EditorContainer>
          );
}

export default Editor;
