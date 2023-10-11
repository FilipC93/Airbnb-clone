import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CloseIcon, PhotosButtonIcon, PinIcon } from "../assets/constant-svg";

const SinglePlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(resp => setPlace(resp.data));
    }, [id]);

    if (!place) return;

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-black"
                        >
                            <CloseIcon />Close photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                        <div key={index}>
                            <img
                                src={`http://localhost:4000/uploads/${photo}`}
                                alt="shown photos"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    console.log(place)
    return (
        <div className="bg-gray-100 mt-4 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a href={`https://maps.google.com/?q=${place.address}`}
                target="_blank"
                className="flex gap-1 underline font-semibold my-4">
                <PinIcon />{place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img
                                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                    className="aspect-square object-cover"
                                    alt="first img"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        {place.photos?.[1] && (
                            <img
                                src={`http://localhost:4000/uploads/${place.photos[1]}`}
                                className="aspect-square object-cover"
                                alt="second img"
                            />
                        )}
                        <div className="border overflow-hidden">
                            {place.photos?.[2] && (
                                <img
                                    src={`http://localhost:4000/uploads/${place.photos[2]}`}
                                    className="aspect-square object-cover relative top-2"
                                    alt="third img"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500"
                    onClick={() => setShowAllPhotos(true)}
                >
                    <PhotosButtonIcon /> Show more photos
                </button>
            </div>
            <div className="my-4">
                <h2 className="font-semibold text-2xl">
                    Description
                </h2>
                {place.description}
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <b>Check-in</b> at {place.checkIn}:00<br />
                    <b>Check-out</b> at {place.checkOut}:00<br />
                    <b>Max Guests: {place.maxGuests}</b>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default SinglePlacePage;