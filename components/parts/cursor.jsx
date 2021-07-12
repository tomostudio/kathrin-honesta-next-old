import React, { useEffect, useRef } from "react";

import { useAppContext } from "@/context/store";

const CustomCursor = () => {
    const context = useAppContext();
    const cursorRef = useRef();
    const ringRef = useRef();
    let active;

    const mouseMoveHandler = (event) => {
        const { clientX, clientY } = event;
        if (cursorRef.current && ringRef.current) {
            cursorRef.current.style.transform = `translate(-50%, -50%) translate(${clientX}px, ${clientY}px)`;
            ringRef.current.style.transform = `translate(-50%, -50%) translate(${clientX}px, ${clientY}px)`;
        }

        if (active !== null) clearTimeout(active)
        active = setTimeout(() => {
            document.querySelectorAll(".custom_cursor")[0].classList.add("active");
        }, 20);
    };

    const mouseDownHandler = (e) => {
        if (e.which === 1) {
            cursorRef.current.classList.add("click");
            ringRef.current.classList.add("click");
        }
    };

    const mouseUpHandler = () => {
        cursorRef.current.classList.remove("click");
        ringRef.current.classList.remove("click");
    };

    useEffect(() => {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        return () => {
            clearTimeout(active);
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mousedown", mouseDownHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        };
    }, []);

    return (
        <div className="custom_cursor">
            <div className={`cursor ${context && context.cursorType}`} ref={cursorRef}>
                <svg width="8" height="8" viewBox="0 0 8 8">
                    <path
                        d="M4.424 0.856003C4.088 0.856003 3.944 1.09601 3.56 1.72001C2.84 2.96801 2.744 3.064 1.496 3.448C1.16 3.592 0.728 3.928 0.728 4.168C0.728 4.312 0.968 4.552 1.304 4.744C2.024 5.128 2.456 5.41601 2.84 6.08801C3.464 7.19201 3.8 7.81601 4.28 7.81601C4.472 7.81601 4.568 7.672 4.664 7.432C5.576 5.464 5.576 5.416 7.064 4.792C7.304 4.648 7.352 4.69601 7.352 4.45601C7.352 4.16801 7.16 4.072 6.68 3.736C5.624 3.064 5.384 2.728 4.952 1.48C4.712 1.048 4.52 0.856003 4.424 0.856003Z"
                        fill="black"
                    />
                </svg>
            </div>
            <div
                className={`circle ${context && context.cursorType}`}
                ref={ringRef}
            ></div>
        </div>
    );
};

export default CustomCursor;
