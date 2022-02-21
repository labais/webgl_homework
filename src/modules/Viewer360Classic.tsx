import React, {useEffect, useRef} from "react";


export default function Viewer360Classic(props: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const {current} = containerRef;

    useEffect(main, [current]);

    function main() {
        // setTimeout(actualMain, 100);
        actualMain();
    }

    function actualMain() {
        console.log('do main()');
    }

    return (
        <div ref={containerRef}>
            <h1>360 classic</h1>
            <canvas id="glCanvas"></canvas>
        </div>
    )
}


interface Props {
    //pass
};