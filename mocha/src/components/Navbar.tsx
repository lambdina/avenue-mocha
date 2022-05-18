import React, { useState } from 'react';

export const ResponsiveNavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="bg-white md:p-4 p-2.5">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {menuOpen &&
                <MobileMenu>
                    {navLinks}
                </MobileMenu>}
        </div>
    );
};

interface NavbarProps {
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC <NavbarProps> = ({ menuOpen, setMenuOpen }) => (
    <div className="flex items-center justify-around">
        {/* App header */}
        <div className="flex items-center space-x-2.5">
            <img src="https://www.apnavacancy.com/wp-content/uploads/2021/09/Starbucks-Jobs.png" className="h-12 w-12 object-cover" />
            <a href="#home" className="text-xl font-bold no-underline text-gray-800 hover:text-gray-600">Avenue Mocha</a>
        </div>
        {/* Links shown in a row on larger screens */}
        <nav className="hidden md:block space-x-6">
            {navLinks}
        </nav>
        {/* Button to toggle mobile menu shown on smaller screens */}
        <button type="button" aria-label="Toggle mobile menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
            <MenuAlt4Svg menuOpen={menuOpen} /></button>
    </div>
);

// Page names that can be shared between mobile menu and navbar
const pages = ['Login', 'Cart'];
const navLinks = pages.map(page => <a className="no-underline text-gray-800 font-semibold hover:text-gray-600" href={`#${page}`}>{page}</a>);

const MenuAlt4Svg: React.FC<{menuOpen: boolean}> = ({ menuOpen }) => (
    // Added a fun transition to the icon when clicked
    <svg xmlns="http://www.w3.org/2000/svg" className={`transition duration-100 ease h-8 w-8 ${menuOpen ? 'transform rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const MobileMenu: React.FC<{children: JSX.Element[]}> = ({ children }) => (
    // Important to include md:hidden to prevent persistent open on large screens
    <nav className="p-4 flex flex-col space-y-3 md:hidden">
        {children}
    </nav>
);