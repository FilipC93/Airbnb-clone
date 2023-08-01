import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { HamburgerSvg, HeaderLogo, SearchSvg, UserDark, VerticalDivider } from "../assets/constant-svg";

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <header className='flex justify-between'>
                <Link to={'/'} className='flex items-center gap-1'>
                    <HeaderLogo />
                    <span className='font-bold text-xl'>Diakopares</span>
                </Link>
                <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                    <div>Anywhere</div>
                    <VerticalDivider />
                    <div>Any week</div>
                    <VerticalDivider />
                    <div>Add guests</div>
                    <button className='bg-primary text-white p-1 rounded-full'><SearchSvg /></button>
                </div>
                <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
                    <HamburgerSvg />
                    <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                        <UserDark />
                    </div>
                    {!!user && (
                        <div>{user.name}</div>
                    )}
                </Link>
            </header>
        </div>
    )
}

export default Header;