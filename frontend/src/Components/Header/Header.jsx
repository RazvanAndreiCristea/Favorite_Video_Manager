// import React from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import "./Header.css"

const Header = () => {
    return (
        <div id = "display">
            <Link to="/users">
                <button>Users</button>
            </Link>
            <Link to="/videos">
                <button>Videos</button>
            </Link>
        </div>
    );
};

export default Header;