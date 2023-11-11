import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const PricingSection = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guestNumber, setGuestNumber] = useState(1);
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext)

    let numOfStays = 0;

    if (checkIn && checkOut) {
        numOfStays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    useEffect(() => {
        user && setFullName(user.name);
    }, [user]);

    const confirmBooking = async () => {
        const bookingData = { checkIn, checkOut, guestNumber, fullName, mobile, place: place._id, price: numOfStays * place.price }
        const resp = await axios.post('/bookings', bookingData);
        const bookingId = resp.data._id;
        setRedirect(`/account/booking/${bookingId}`);
    }

    if (redirect) return <Navigate to={redirect} />

    return (
        <div>
            <div className="bg-gray-300 shadow p-4 border rounded-2xl">
                <div className="text-2xl text-center mb-2">Price: ${place.price} / night.</div>
                <div className="flex justify-center">
                    <div className="py-3 px-4">
                        <label className="mr-2">Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="py-2 px-4 border-l">
                        <label className="mr-2">Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label className="mr-2">Number of guests:</label>
                    <input
                        type="number"
                        value={guestNumber}
                        onChange={e => setGuestNumber(e.target.value)}
                    />
                </div>
                {numOfStays > 0 && (
                    <div className="py-3 px-4">
                        <label>Identification:</label>
                        <input
                            type="text"
                            placeholder="Enter your full name here"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                        <label>Mobile number:</label>
                        <input
                            type="tel"
                            placeholder="Enter your mobile phone number here"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button className="primary" onClick={confirmBooking}>
                Book now {' '}
                {numOfStays > 0 && (
                    <>
                        ${numOfStays * place.price}
                    </>
                )}
            </button>
        </div>
    );
}

export default PricingSection;