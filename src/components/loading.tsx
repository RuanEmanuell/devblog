import { useEffect, useState } from "react";
import "./styles/loading.css";

import { Theme } from "@/services/utils";

const colors: Record<Theme, string[]> = {
    "Light": ["bg-blue-500", "bg-white", "text-black", "text-blue-500"],
    "Dark": ["bg-black", "bg-gray-700", "text-white", "text-white"]
}

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
        <div style={{ height: "100vh", width: "100vw" }}>
            <div className={`loadingBox ${colors[currentTheme][1]}`}>
                <div className={`loading ${colors[currentTheme][1]}`}></div>
            </div>
        </div>
    )
}