import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import { CalendarIcon } from "../assets/constant-svg";
import { format } from "date-fns";
import CalendarCalc from "../components/CalendarCalc";

const SingleBooking = () => {
    const { id } = useParams();
    const [singleBooking, setSingleBooking] = useState();

    console.log(singleBooking);

    useEffect(() => {
        id && axios.get('/bookings').then(resp => {
            const matchedBooking = resp.data.find(({ _id }) => _id === id);
            matchedBooking && setSingleBooking(matchedBooking);
        })
    }, [id]);

    if (!singleBooking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{singleBooking.place.title}</h1>
            <AddressLink place={singleBooking.place} />
            <PlaceGallery place={singleBooking.place} />
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-xl">Your booking information</h2>
                <CalendarCalc booking={singleBooking} />
            </div>
        </div>
    );
}

export default SingleBooking;