import React, { useState } from 'react'
import { useEffect } from 'react';

export const useWindowResize = (callback) => {
  
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const [isMdBreakpoint, setIsMdBreakpoint] = useState(window.innerWidth < 768);
    const [isSmBreakpoint, setIsSMBreakpoint] = useState(window.innerWidth < 576);

    const onResize = (e) => {
        setCurrentWidth(e.target.innerWidth);
        setIsMdBreakpoint(e.target.innerWidth < 768);
        setIsSMBreakpoint(e.target.innerWidth < 576)
        callback && callback(e.target.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", onResize)
    }, [])
    

    return {
        currentWidth,
        isMdBreakpoint,
        isSmBreakpoint
    }

}
