import React from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar page="home" />
            <div className="home-content">
                <h2 className="heading">Welcome to Image Search Application</h2>
                <p>This application allows you to search and generate images.</p>
                <h3 className="sub-heading">Features:</h3>
                <ul>
                    <li>Search and generate images</li>
                    <li>View search history</li>
                    <li>...</li> {/* Add more features */}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
