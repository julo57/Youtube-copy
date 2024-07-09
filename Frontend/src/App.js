import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import './css/App.css'; // Zaktualizowana ścieżka do App.css
import './css/Navbar.css'; // Zaktualizowana ścieżka do Navbar.css
import './css/Sidebar.css'; // Zaktualizowana ścieżka do Sidebar.css

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="main-content">
                    <Sidebar />
                    <div className="page-content">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/profile" component={UserProfile} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
