import React, {useState} from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getStoredCommands} from "../helpers/Product.helpers";
import {dumpUser, IUserData} from "../services/user.services";

export const ResponsiveNavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = dumpUser();

    console.log("in Navbar, user is...", user);

    return (
        <div className="bg-white md:p-4 p-2.5">
            <Navbar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            {menuOpen &&
                <MobileMenu user={user} />}
        </div>
    );
};

interface NavbarProps {
    user?: IUserData,
    menuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC <NavbarProps> = (props) => (
    <div className="flex items-center justify-around">
        <div className="flex items-center space-x-2.5">
            <img src="https://www.apnavacancy.com/wp-content/uploads/2021/09/Starbucks-Jobs.png" className="h-12 w-12 object-cover" />
            <a href="/" className="text-xl font-bold no-underline text-gray-800 hover:text-gray-600">Mocha</a>
        </div>
        <nav className="hidden md:block">
            <ul className="flex space-x-6 list-none">
                <NavLinks user={props.user} />
            </ul>
        </nav>
        <button type="button" aria-label="Toggle mobile menu" onClick={() => props.setMenuOpen(!props.menuOpen)}
                className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50">
            <MenuAlt4Svg menuOpen={props.menuOpen} /></button>
    </div>
);

const NavLinks: React.FC<{user: IUserData | undefined}> = ({user}) => {

    return (
        <>
            <li className={"list-none"}>
                {!user &&
                    <a className="no-underlinetext-gray-800 font-semibold hover:text-gray-600" href="/login">Login</a>
                }
                {user &&
                    <a className="flex no-underlinetext-gray-800 font-semibold hover:text-gray-600 space-x-4" href="/profile">
                        <img className="w-9 h-9 object-cover rounded-full"
                            src={user.avatar_path} />
                        <span className="pt-2">Profile</span>
                    </a>
                }
            </li>
            <li className="list-none pt-2">
                <a className="flex no-underline text-gray-800 font-semibold hover:text-gray-600" href="/checkout/">
                    <ShoppingCartIcon/>
                    {getStoredCommands().length > 0 &&
                        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-800"></span>
        </span>
                    }
                </a>
            </li>
        </>
    )
}

const MenuAlt4Svg: React.FC<{menuOpen: boolean}> = ({ menuOpen }) => (
    // Added a fun transition to the icon when clicked
    <svg xmlns="http://www.w3.org/2000/svg" className={`transition duration-100 ease h-8 w-8 ${menuOpen ? 'transform rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const MobileMenu: React.FC<{user:IUserData | undefined}> = ({ user }) => (
    // Important to include md:hidden to prevent persistent open on large screens
    <nav className="p-4 flex flex-col space-y-3 md:hidden">
        <NavLinks user={user}/>
    </nav>
);