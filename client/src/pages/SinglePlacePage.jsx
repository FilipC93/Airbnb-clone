import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PhotosButtonIcon } from "../assets/constant-svg";

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
            <div className="absolute bg-white min-w-full min-h-screen">
                {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                    <div key={index}>
                        <img
                            src={`http://localhost:4000/uploads/${photo}`}
                            alt="shown photos"
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-gray-100 mt-4 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a href={`https://maps.google.com/?q=${place.address}`}
                target="_blank"
                className="block underline font-semibold my-4 w-20">
                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
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
        </div>
    );
}

export default SinglePlacePage;