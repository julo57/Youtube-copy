import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './AuthContext';
import './css/App.css';
import './css/Login.css'; // Importujemy CSS dla loginu

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <div className="main-content">
                        <Sidebar toggleDarkMode={toggleDarkMode} />
                        <div className="page-content">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route path="/profile" component={UserProfile} />
                                <Route path="/" component={Home} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
