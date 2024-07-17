import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import ProfileMenu from './components/ProfileMenu';
import Settings from './components/Settings'; 
import Channel from './components/Channel';
import History from './components/History';
import { AuthProvider } from './AuthContext';
import VideoDetail from './components/VideoDetail';
import './css/App.css';



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
                <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
                    <Navbar />
                    <div className="main-content">
                        <Sidebar toggleDarkMode={toggleDarkMode} />
                        <div className="page-content">
                            <Switch>
                                <Route path="/Watch/:id" component={VideoDetail} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route path="/profile" component={UserProfile} />
                                <Route path="/profile-menu" component={ProfileMenu} />
                                <Route path="/settings" component={Settings} />
                                <Route path="/channel" component={Channel} />
                                <Route path="/history" component={History} />
                                <Route path="/home" component={Home} />
                                <Route exact path="/" component={Home} />
                                <Route path="*" render={() => <h1>404: Page not found</h1>} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
