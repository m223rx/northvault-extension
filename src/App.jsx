import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import './App.css'
import DashboardPage from './pages/DashboardPage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [vault, setVault] = useState([]);
  const [masterPassword, setMasterPassword] = useState('');
  const [config, setConfig] = useState(null);
  const [theme, setTheme] = useState('light');

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user_email, setUserEmail] = useState('');

  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <DashboardPage setActivePage={setActivePage} />

      default:
        break;
    }
  }

  const createAccount = () => {
    const user_config = {
      "master_password": password,
      "username": username,
      "user_email": user_email,
      "theme": 'light',
      "app_version": '1.0.0',
    }

    localStorage.setItem('user_config', JSON.stringify(user_config))
  }

  // useEffect(() => {
  //   try {
  //     const user_config = JSON.parse(localStorage.getItem('user_config') || "[]")
  //     if (user_config) {
  //       setConfig(user_config);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        {isLoading && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <MoonLoader color="#fff" size={60} />
          </div>
        )}
        <main className="w-80 h-120 p-4">
          {renderPage()}
        </main>
      </div>

    </>
  )
}

export default App
