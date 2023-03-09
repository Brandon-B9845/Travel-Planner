import React from 'react';
import Image from 'next/image';

function NavBar(props: any) {


    return (
        <div className='nav-container'>
            <header className="main-header">
                <Image src='/Globe.png' alt="WorldGlobe or food" width={40} height={40}></Image>
                <h2 className="header-title">Our Travel-Planner</h2>
                <p>Home</p>
                <ul className="nav">
                    <div className='nav-list-container'>
                    <li >Login</li>
                    </div>
                    <div className='nav-list-container'>
                    <li>Sign-Up</li>
                    </div>
                </ul>
            </header>
        </div>
    );
}

export default NavBar;