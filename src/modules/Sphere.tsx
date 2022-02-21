import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, {Suspense, useRef, useState} from 'react'
import {Canvas, useFrame, useLoader} from 'react-three-fiber'

import {SimpleVector3} from "../Utils";
import {HotSpot, HotSpotData} from "./HotSpot";

import panoramaImg from './../media/panorama.jpg'
import hotSpotImg from './../media/outline_login_black_24dp.png'


export function Sphere(props: Props) {

    const {rotation} = props;
    const panoramaTexture = useLoader(THREE.TextureLoader, panoramaImg);
    const hotSpotTexture = useLoader(THREE.TextureLoader, hotSpotImg);


    const angle = useRef(0);
    // const [pos, setPos] = useState({x:0,y:0,z:0} as SimpleVector3)
    // const [localRot, setLocalRot] = useState({x:0,y:0,z:0} as SimpleVector3)

    const ref = useRef<THREE.Mesh>()
    useFrame((state, delta) => {
        // ref.current.rotation.y += 0.0005;
        // ref.current.position.z -= 0.011;
        // const newRotation =  ref?.current?.rotation?.y
        if (ref.current) {
            ref.current.rotation.x = rotation.x;
            ref.current.rotation.y = rotation.y;
        }
    })

    const hotSpots2: Array<HotSpotData> = [
        [-.04, 0.1, 'exit'],
        [3.94, -0.55, 'radiator'],
        [2.33, -0.6, 'bed'],
    ].map((d) => {
        const basePosition = {x: 0, y: 0, z: -6}; // pushed away from center to almost touch the sphere
        let r = {x: d[0] as number, y: d[1] as number, z: 0}; // angular position inside the sphere
        let localR = {x:0, y: r.x, z: 0}; // counter rotation so the hotspot is facing the center (only on 1 axis :D)
        let p = rotate(r, basePosition);
        return {
            localRotation: localR,
            position: p,
            text:  d[2] as string
        };
    });

    return (
        <Suspense fallback={<>Loading...2...</>}>

            <mesh
                ref={ref}
                visible userData={{test: "hello"}}
                position={[0, 0, 0]}>

                <sphereGeometry attach="geometry" args={[6, 16, 16]}/>
                <meshStandardMaterial
                    attach="material"
                    color="white"
                    transparent
                    roughness={0.1}
                    metalness={0.1}
                    map={panoramaTexture}
                    side={THREE.BackSide}
                />

                {hotSpots2.map((d, i) => (
                    <HotSpot key={i} map={hotSpotTexture} data={d}/>
                ))}
            </mesh>

        </Suspense>
    );
}

interface Props {
    rotation: SimpleVector3;
};


function rotate(angle: SimpleVector3, p: SimpleVector3): SimpleVector3 {
    var cosa = Math.cos(angle.z);
    var sina = Math.sin(angle.z);

    var cosb = Math.cos(angle.x);
    var sinb = Math.sin(angle.x);

    var cosc = Math.cos(angle.y);
    var sinc = Math.sin(angle.y);

    var Axx = cosa * cosb;
    var Axy = cosa * sinb * sinc - sina * cosc;
    var Axz = cosa * sinb * cosc + sina * sinc;

    var Ayx = sina * cosb;
    var Ayy = sina * sinb * sinc + cosa * cosc;
    var Ayz = sina * sinb * cosc - cosa * sinc;

    var Azx = -sinb;
    var Azy = cosb * sinc;
    var Azz = cosb * cosc;

    // for (var i = 0; i < points.length; i++) {
    var px = p.x;
    var py = p.y;
    var pz = p.z;

    p.x = Axx * px + Axy * py + Axz * pz;
    p.y = Ayx * px + Ayy * py + Ayz * pz;
    p.z = Azx * px + Azy * py + Azz * pz;
    // }
    return p;
}