import React, {useRef, useState, Suspense} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import * as THREE from "three";
import {Box} from "@react-three/drei";
import {SimpleVector3} from "../Utils";
import {Vector3} from "three";

import {useLoader} from "react-three-fiber";


export function HotSpot(props: Props) {

    const {data: {position, localRotation, text: alertText}, map} = props;

    const ref = useRef<THREE.Mesh>();
    const [hovered, hover] = useState(false)

    useFrame((state, delta) => {

    });

    return (
        <Suspense fallback={<>Loading...2...</>}>
            <mesh
                position={[position.x, position.y, position.z]}
                rotation={[localRotation.x, localRotation.y, localRotation.z]}
                ref={ref}
                onClick={(event) => alert(alertText)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
            >
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial
                    attach="material"
                    color={hovered ? 'hotpink' : 'orange'}
                    transparent opacity={hovered ? 0.2 : 1}
                    map={map}

                />
            </mesh>
        </Suspense>
    )
}

interface Props {
    map: THREE.Texture;
    data: HotSpotData,
};


export interface HotSpotData {
    position: SimpleVector3;
    localRotation: SimpleVector3;
    text: string;
}