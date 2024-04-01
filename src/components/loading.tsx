import { useEffect, useState } from "react";
import "./styles/loading.css";

import { Theme, colors } from "@/services/utils";

export default function Loading() {
    const [currentTheme, setCurrentTheme] = useState<Theme>("Light");

    useEffect(() => {
        const storageTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : "Light";
        setCurrentTheme(storageTheme);
        
        function handleNavbarThemeChange(event: CustomEventInit) {
            const storageTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : "Light";
            setCurrentTheme(storageTheme);
        }
        
        document.addEventListener('themeChange', handleNavbarThemeChange);

        return () => {
            document.removeEventListener('themeChange', handleNavbarThemeChange);
        }
    }, []);
    return (
        <div style = {{height: "100vh", width: "100vw"}}>
        <div className={`loadingBox ${colors[currentTheme][0]}`}>
            <div className={`loading ${colors[currentTheme][0]}`}></div>
        </div>
        </div>
    )
}