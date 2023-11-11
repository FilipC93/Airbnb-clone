import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import { Helmet } from "react-helmet";

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

    return (
        <div>
            <Helmet>
                <title>{user && user?.name && user?.name}</title>
                <meta name="ProfilePage" content="Page" />
            </Helmet>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name} ({user?.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && <PlacesPage />}
        </div>
    );
}

export default AccountPage