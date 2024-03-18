import { useEffect, useState } from "react";
import "./styles/loading.css";

type Theme = "Dark" | "Light";

export default function Loading() {
    const [currentTheme, setCurrentTheme] = useState<Theme>("Light");

    const theme: Record<Theme, string[]> = {
        "Light": ["bg-white"],
        "Dark": ["bg-gray-700"]
      }
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
        <div className={`loadingBox ${theme[currentTheme][0]}`}>
            <div className={`loading ${theme[currentTheme][0]}`}></div>
        </div>
        </div>
    )
}