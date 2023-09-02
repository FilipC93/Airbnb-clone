import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusSvg } from "../assets/constant-svg";
import AccountNav from "../components/AccountNav";
import axios from "axios";


const PlacesPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <>
            <AccountNav />
            <div className="text-center mb-4">
                <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
                    <PlusSvg />Add a new place
                </Link>
            </div>
            <div>
                {places.length > 0 && places.map((place, index) => (
                    <Link key={index} to={`/account/places/${place._id}`} className="flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mt-1 mb-1">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            {place.photos.length > 0 && (
                                <img className="object-cover" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="photo" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default PlacesPage;