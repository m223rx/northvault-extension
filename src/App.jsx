import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import './App.css'
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './utils/useAuth';
import toast, { Toaster } from "react-hot-toast";

function App() {
  const {
    userConfig,
    userVault,
    redirectPath,
    isLoading,
    getUserConfig,
    setIsLoading,
  } = useAuth();
  const [theme, setTheme] = useState('light');
  const [activePage, setActivePage] = useState('Login');

  useEffect(() => {
    if (redirectPath) setActivePage(redirectPath);
  }, [redirectPath]);



  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <DashboardPage setActivePage={setActivePage} userConfig={userConfig} getUserConfig={getUserConfig} setIsLoading={setIsLoading} userVault={userVault} />
      case 'Login': return <LoginPage setActivePage={setActivePage} setIsLoading={setIsLoading} userConfig={userConfig} getUserConfig={getUserConfig} />
      case 'Signup': return <SignupPage setActivePage={setActivePage} setIsLoading={setIsLoading} />

      default:
        return <LoginPage setActivePage={setActivePage} />
    }
  }

  return (
    <>
      <div className="relative min-h-screen flex flex-col md:flex-row w-full">
        {isLoading && (
          <div className="absolute top-0 right-0 w-full h-120 bg-black/30 z-50 flex items-center justify-center">
            <MoonLoader color="#fff" size={60} />
          </div>
        )}
        <main className="w-full h-120">
          {renderPage()}
        </main>
      </div>
      <Toaster position="bottom-right" />
    </>
  )
}

export default App
