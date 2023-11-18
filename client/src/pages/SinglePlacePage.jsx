import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PricingSection from "../components/PricingSection";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const SinglePlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(resp => setPlace(resp.data));
    }, [id]);

    if (!place) return;

    return (
        <div className="bg-gray-100 mt-4 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink place={place} />
            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">
                            Description
                        </h2>
                        {place.description}
                    </div>
                    <b>Check-in</b> at {place.checkIn}:00<br />
                    <b>Check-out</b> at {place.checkOut}:00<br />
                    <b>Max Guests: {place.maxGuests}</b>
                </div>
                <PricingSection place={place} />
            </div>
            <div className="bg-white -mx-8 border-t">
                <div>
                    <h2 className="mx-8 font-semibold text-2xl">Extra Info:</h2>
                </div>
                <div className="mx-8 mt-2 text-sm text-gray-800 leading-5">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    );
}

export default SinglePlacePage;