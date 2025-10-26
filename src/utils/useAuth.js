import { useCallback, useEffect, useState } from "react";

export function useAuth() {
    const [userConfig, setUserConfig] = useState(null);
    const [userVault, setUserVault] = useState([]);
    const [redirectPath, setRedirectPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserConfig = useCallback(async () => {
        setIsLoading(true);
        try {
            const storedConfig = JSON.parse(localStorage.getItem("userConfig"));
            if (!storedConfig) {
                setRedirectPath("Signup");
                return;
            }
            if (!storedConfig.loggedIn) {
                setRedirectPath("Login");
            }
            setUserConfig(storedConfig);

            const storedVault = JSON.parse(localStorage.getItem("userVault")) || [];
            setUserVault(storedVault);
        } catch (error) {
            setRedirectPath("Signup");
            console.error("Error loading user data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "userVault") {
                const updatedVault = JSON.parse(event.newValue) || [];
                setUserVault(updatedVault);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        getUserConfig();
    }, [getUserConfig]);

    return {
        userConfig,
        userVault,
        redirectPath,
        isLoading,
        getUserConfig,
        setIsLoading,
        setUserVault,
    };
}
