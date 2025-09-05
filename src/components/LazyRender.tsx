import * as React from "react";
import { useState, useEffect, useRef, type FC } from "react";

type LazyRenderProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const LazyRender: FC<LazyRenderProps> = ({ children, style = {} }) => {
    const elementRef = useRef(null);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        const observerInstance = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isRendered) {
                    setIsRendered(true);
                }
            },
            { rootMargin: "200px" }
        );

        const currentElement = elementRef.current;
        if (currentElement) observerInstance.observe(currentElement);
        
        return () => observerInstance.disconnect();
    }, [isRendered]);

    return (
        <div ref={elementRef} className="h-max" style={style}>
            {isRendered ? children : null}
        </div>
    );
};