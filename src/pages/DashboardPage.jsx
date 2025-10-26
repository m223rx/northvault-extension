import { Settings } from "lucide-react";
import React, { useState } from "react";
import DashboardHome from "../components/DashboardHome";
import SaveNewPassword from "../components/SaveNewPassword";
import SavedPasswords from "../components/SavedPasswords";
import DeletePassword from "../components/DeletePassword";
import SettingsPage from "../components/SettingsPage";

export default function DashboardPage({ userConfig, getUserConfig, setIsLoading, userVault }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    const handleSettings = () => {
        setIsOpen(!isOpen);
        setCurrentView('settings');
    }

    const renderPage = () => {
        switch (currentView) {
            case 'home':
                return <DashboardHome setCurrentView={setCurrentView} userConfig={userConfig} />
            case 'save':
                return <SaveNewPassword setCurrentView={setCurrentView} userConfig={userConfig} getUserConfig={getUserConfig} setIsLoading={setIsLoading} />
            case 'saved':
                return <SavedPasswords setCurrentView={setCurrentView} userConfig={userConfig} getUserConfig={getUserConfig} setIsLoading={setIsLoading} />
            case 'delete':
                return <DeletePassword setCurrentView={setCurrentView} userConfig={userConfig} getUserConfig={getUserConfig} setIsLoading={setIsLoading} />
            case 'settings':
                return <SettingsPage setCurrentView={setCurrentView} userConfig={userConfig} getUserConfig={getUserConfig} setIsLoading={setIsLoading} />

            default:
                return <DashboardHome setCurrentView={setCurrentView} userConfig={userConfig} />
        }
    }

    return (
        <>
            <div className="relative bg-[#fff] shadow-md w-full h-[100%] flex flex-col flex-1 shadow-md">
                <header className="relative w-full flex px-2 py-2 bg-gray-900 text-white shadow-md">
                    <div className="flex flex-1 flex-row justify-between items-center">
                        <h1 className="text-xl font-bold tracking-wide">
                            North<span className="text-[#696FC7]">Vault</span>
                        </h1>
                        <button
                            className="p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>

                    {isOpen && (
                        <div className="absolute flex flex-col top-14 right-3 w-48 shadow-lg bg-white text-gray-800 gap-3 rounded-xl px-4 py-3 animate-fadeIn z-1">
                            <h1 className="text-lg font-bold mb-3 text-[#696FC7] ">Settings</h1>
                            <button
                                className="gray-900 w-full flex font-bold text-xs hover:underline cursor-pointer"
                                onClick={() => handleSettings()}
                            >
                                Change Master Password
                            </button>
                        </div>
                    )}
                </header>
                {renderPage()}
            </div>
        </>
    );
}
