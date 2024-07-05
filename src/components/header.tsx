import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">
                    <Link to={"/"}>MERN + MARN Stack</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
                        {/* <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
                        <li><Link to="/services" className="text-white hover:text-gray-200">Services</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-gray-200">Contact</Link></li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;