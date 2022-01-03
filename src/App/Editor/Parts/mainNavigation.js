import React from "react";

import SplitScreen from '../Components/DynamicEditor/Buttons/splitScreen';
import ShowHelp from '../Components/DynamicEditor/Buttons/showHelp';
import EditorsDisplays from '../Components/DynamicEditor/Buttons/editorsDisplays';
import CompileScss from '../Components/DynamicEditor/Buttons/compileScss';
import LiveScss from '../Components/DynamicEditor/Buttons/liveScss';

/**
 * Returns mainNavigation information.
 * 
 * @param props
 *   Object props.
 * @returns object Help 
 *   Response object before rendering.
 */
const MainNavigation = () => {
    return (
            <div className="pnc-navigation">
                <CompileScss/>
                <LiveScss/>
                <ShowHelp />
                <EditorsDisplays />
                <SplitScreen />
            </div>
            );
};

export default MainNavigation;
