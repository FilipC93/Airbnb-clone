import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBooking = () => {
    const { id } = useParams();
    const [singleBooking, setSingleBooking] = useState();

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
        <div>Single booking of id: {id}</div>
    );
}

export default SingleBooking;