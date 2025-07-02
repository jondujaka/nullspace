import { useEffect, useState } from "react";

const useScrollPosition = (enabled = false) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if(!enabled){
            return;
        }
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, [enabled]);

    return scrollPosition;
};

export default useScrollPosition;