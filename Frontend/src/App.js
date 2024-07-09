import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './AuthContext';
import './css/App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <div className="main-content">
                        <Sidebar />
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
