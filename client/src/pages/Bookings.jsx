import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays, format } from 'date-fns';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { BankNotesIcon, CalendarIcon, MoonIcon } from '../assets/constant-svg';
import { Link } from 'react-router-dom';
import CalendarCalc from '../components/CalendarCalc';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data);
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Bookings</title>
                <meta name="BookingPage" content="Bookings" />
            </Helmet>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map((booking, index) => (
                    <Link to={`/account/booking/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden' key={index}>
                        <div className='w-48'>
                            <PlaceImg place={booking?.place} />
                        </div>
                        <CalendarCalc booking={booking} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Bookings;