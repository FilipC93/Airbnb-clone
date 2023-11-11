import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays, format } from 'date-fns';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { BankNotesIcon, CalendarIcon, MoonIcon } from '../assets/constant-svg';
import { Link } from 'react-router-dom';

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
                        <div className='py-3 pr-3 grow mt-2'>
                            <h2 className='text-xl'>{booking?.place?.title}</h2>
                            <div className='flex gap-2 border-t border-gray-300 text-sm mt-4 mb-2'>
                                <CalendarIcon />
                                {format(new Date(booking?.checkIn), 'dd-MM-yyyy')}
                                {' '}
                                &rarr;
                                <CalendarIcon />
                                {format(new Date(booking?.checkOut), 'dd-MM-yyyy')}
                            </div>
                            <div className='text-xl'>
                                <div className='flex gap-1 my-1'>
                                    <MoonIcon />
                                    {differenceInCalendarDays(new Date(booking?.checkOut), new Date(booking?.checkIn))} nights
                                </div>
                                <div className='flex gap-1 my-1'>
                                    <BankNotesIcon />
                                    Total: ${booking?.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Bookings;