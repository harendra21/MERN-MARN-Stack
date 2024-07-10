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
                        <li><a href='https://github.com/harendra21/MERN-MARN-Stack' target='_blank' className="text-white hover:text-gray-200">Github</a></li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;