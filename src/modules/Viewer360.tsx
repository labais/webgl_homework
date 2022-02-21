import React, {MutableRefObject, Suspense, useEffect, useRef, useState} from 'react'
import ReactDOM from "react-dom";
import {Canvas, useFrame, useLoader} from "react-three-fiber";
import {PerspectiveCamera} from '@react-three/drei'
import {TextureLoader} from "three";

import {Sphere} from "./Sphere";
import {clamp, SimpleVector2, SimpleVector3} from "../Utils";


export default function Viewer360() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePressed = useRef(false);
    const mousePos = useRef({} as SimpleVector2);
    const sphereAngleRef = useRef({x: 0, y: 0, z: 0} as SimpleVector3);
    const [state, setState] = useState(0);

    // const hotSpotTexture = useLoader(TextureLoader, hotSpotImg);

    useEffect(() => {
        console.log('daram!');
        canvasRef?.current?.addEventListener('mousedown', handleMouseDown);
        canvasRef?.current?.addEventListener('mouseup', handleMouseUp);
        canvasRef?.current?.addEventListener('mouseleave', handleMouseUp);
        canvasRef?.current?.addEventListener('mousemove', handleMouseMove);
    }, []);

    const handleMouseUp = (e: MouseEvent) => {
        mousePressed.current = false;
    }

    const handleMouseDown = (e: MouseEvent) => {
        mousePressed.current = true;
        const pos: SimpleVector2 = {x: e.clientX, y: e.clientY};
        mousePos.current = pos;
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (mousePressed.current) {
            const pos = {x: e.clientX, y: e.clientY};
            const delta = {x: pos.x - mousePos.current.x, y: pos.y - mousePos.current.y};
            mousePos.current = pos;
            setRotation(delta);
        }
    }

    const setRotation = (delta: SimpleVector2) => {
        const X_ROT_SPEED = 250.0;
        const Y_ROT_SPEED = 250.0;
        const X_ROT_MAX = 1.5;

        sphereAngleRef.current.y -= delta.x / Y_ROT_SPEED;
        sphereAngleRef.current.x = clamp(sphereAngleRef.current.x - delta.y / X_ROT_SPEED, -X_ROT_MAX, X_ROT_MAX);
        setState(new Date().getTime());
    }

    return (
        <Canvas id={'main-canvas'} ref={canvasRef}>
            <ambientLight intensity={0.5}/>
            <Sphere rotation={sphereAngleRef.current}/>
        </Canvas>
    );
}
