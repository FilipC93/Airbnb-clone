import React, { useState } from "react";
import { CloseIcon, PhotosButtonIcon } from "../assets/constant-svg";

const PlaceGallery = ({ place }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
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
        );
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                className="aspect-square object-cover cursor-pointer"
                                alt="first img"
                            />
                        </div>
                    )}
                </div>
                <div className="grid gap-2">
                    {place.photos?.[1] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            src={`http://localhost:4000/uploads/${place.photos[1]}`}
                            className="aspect-square object-cover cursor-pointer"
                            alt="second img"
                        />
                    )}
                    <div className="border overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                                className="aspect-square object-cover relative top-2 cursor-pointer"
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
    );
}

export default PlaceGallery;