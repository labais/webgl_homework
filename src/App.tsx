import React, {Suspense, useCallback, useEffect, useReducer, useRef, useState} from 'react';
// import FullScreen from 'react-fullscreen-crossbrowser';
import screenfull from 'screenfull';

import './App.scss';
import Viewer360 from "./modules/Viewer360";
import AddressBox from "./modules/AddressBox";

function App() {


    const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false);

    useEffect(() => {

        if (screenfull.isEnabled) {
            window.matchMedia('(display-mode: fullscreen)').addEventListener('change', ({matches}) => {
                setIsFullscreenEnabled(matches);
                // if (matches) {
                //     console.log('window.isFullScreen=true');
                // } else {
                //     console.log('window.isFullScreen=false;');
                // }
            });
        }

    }, []);


    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }

    };

    return (

        <>
            <Suspense fallback={<div>Loading... </div>}>
                <Viewer360/>
            </Suspense>
            <AddressBox/>

            {screenfull.isEnabled &&
                (<button className={(isFullscreenEnabled ? 'isOn' : 'isOff') + ' fullscreen-controls'}
                         onClick={() => toggleFullscreen()}
                         title={isFullscreenEnabled ? 'Leave Fullscreen' : ' Enter Fullscreen'}
                    >
                    </button>
                )}
        </>

    );
}

export default App;
