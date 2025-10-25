import { Settings } from "lucide-react";
import React, { useState } from "react";
import DashboardHome from "../components/DashboardHome";
import SaveNewPassword from "./SaveNewPassword";
import SavedPasswords from "./SavedPasswords";

export default function DashboardPage({ setActivePage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    const renderPage = () => {
        switch (currentView) {
            case 'home':
                return <DashboardHome setCurrentView={setCurrentView} />
            case 'save':
                return <SaveNewPassword setCurrentView={setCurrentView} />
            case 'saved':
                return <SavedPasswords setCurrentView={setCurrentView} />

            default:
                break;
        }
    }

    return (
        <>
            <div className="relative rounded-lg bg-[#fff] shadow-md w-full h-[100%] flex flex-col flex-1 shadow-md">
                <header className="relative w-full flex px-2 py-2 bg-gray-900 text-white shadow-md rounded-tl-lg rounded-tr-lg">
                    <div className="flex flex-1 flex-row justify-between items-center">
                        <h1 className="text-xl font-bold tracking-wide">
                            North<span className="text-[#696FC7]">Vault</span>
                        </h1>
                        <button
                            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>

                    {isOpen && (
                        <div className="absolute flex flex-col top-12 right-3 w-48 shadow-lg bg-white text-gray-800 gap-3 rounded-xl px-4 py-3 animate-fadeIn z-1">
                            <h1 className="text-lg font-bold mb-3 text-[#696FC7] ">Settings</h1>

                            <div className="flex flex-row justify-between items-center mb-2">
                                <label
                                    htmlFor="darkTheme"
                                    className="text-gray-900 font-bold text-sm"
                                >
                                    Dark Theme
                                </label>
                                <input
                                    type="checkbox"
                                    id="darkTheme"
                                    className="w-4 h-4 accent-gray-900 cursor-pointer"
                                />
                            </div>

                            <button
                                className="gray-900 w-full flex font-bold text-xs hover:underline"
                                onClick={() => setActivePage("changePassword")}
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
