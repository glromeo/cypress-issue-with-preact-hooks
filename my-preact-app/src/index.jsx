import {render} from "preact";

import preactLogo from "./assets/preact.svg";
import "./style.css";
import {useEffect, useRef, useState} from "react";

export function App() {
    return (
        <div id="preact_root">
            <a href="https://preactjs.com" target="_blank">
                <img src={preactLogo} alt="Preact logo" height="160" width="160"/>
            </a>
            <h1>Get Started building Vite-powered Preact Apps </h1>
            <h2>Plain Time is: <PlainClock/></h2>
            <h3>R.A.F. Time is: <RAFClock/></h3>
            <h4>Hooks Time is: <UseEffectClock/></h4>
            <section>
                <Resource
                    title="Learn Preact"
                    description="If you're new to Preact, try the interactive tutorial to learn important concepts"
                    href="https://preactjs.com/tutorial"
                />
                <Resource
                    title="Differences to React"
                    description="If you're coming from React, you may want to check out our docs to see where Preact differs"
                    href="https://preactjs.com/guide/v10/differences-to-react"
                />
                <Resource
                    title="Learn Vite"
                    description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
                    href="https://vitejs.dev"
                />
            </section>
        </div>
    );
}

function Resource(props) {
    return (
        <a href={props.href} target="_blank" class="resource">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </a>
    );
}

function PlainClock(props) {
    const [time, setTime] = useState(new Date());
    const interval = useRef();
    return <p id="local-time-plain" ref={p => {
        if (p) {
            interval.current = setInterval(() => {
                setTime(new Date());
            }, 1000);
            return () => {
                clearInterval(interval.current);
            };
        }
    }}>{time.toLocaleTimeString()}</p>;
}

function RAFClock(props) {
    const [time, setTime] = useState(new Date());
    const interval = useRef();
    return <p id="local-time-plain" ref={p => {
        if (p) requestAnimationFrame(() => {
            interval.current = setInterval(() => {
                setTime(new Date());
            }, 1000);
            return () => {
                clearInterval(interval.current);
            };
        });
    }}>{time.toLocaleTimeString()}</p>;
}

function UseEffectClock(props) {
    const [time, setTime] = useState(new Date());
    useEffect(() => {

        document.getElementById("local-time-hooks").setAttribute("use-effect", "invoked");

        const i = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);
    return <p id="local-time-hooks">{time.toLocaleTimeString()}</p>;
}

render(<App/>, document.getElementById("app"));
