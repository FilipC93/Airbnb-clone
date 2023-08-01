import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import { BookingListSvg, ModernHouseSvg, ProfileSvg } from "../assets/constant-svg";

const AccountPage = () => {
    const [redirect, setRedirect] = useState(null);
    const { user, ready, setUser } = useContext(UserContext);

    let { subpage } = useParams();

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (subpage === undefined) subpage = 'profile';
    if (!ready) return 'Loading...';
    if (!user && ready && !redirect) return <Navigate to={'/login'} />
    if (redirect) return <Navigate to={redirect} />

    const linkClasses = (type = null) => {
        let classes = 'inline-flex py-2 px-6 gap-1 rounded-full';
        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200';
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}><ProfileSvg />My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}><BookingListSvg />My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}><ModernHouseSvg />My Accomodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}

export default AccountPage