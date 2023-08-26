import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookingListSvg, ModernHouseSvg, ProfileSvg } from "../assets/constant-svg";

const AccountNav = () => {
    const { pathname } = useLocation();
    const linkClasses = (type = null) => {
        let subpage = pathname.split('/')?.[2];
        if(subpage === undefined) {
            subpage = 'profile';
        }
        let classes = 'inline-flex py-2 px-6 gap-1 rounded-full';
        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200';
        }
        return classes;
    }

    return (
        <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}><ProfileSvg />My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}><BookingListSvg />My Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}><ModernHouseSvg />My Accomodations</Link>
        </nav>
    );
}

export default AccountNav;