import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const HomePage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(resp => {
            setPlaces(resp.data);
        });
    }, []);

    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
            <Helmet>
                <title>Diakopares</title>
                <meta name="HomePage" content="Home" />
            </Helmet>
            {places.length > 0 && places.map((place, index) => (
                <Link to={`/place/${place._id}`} key={index}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {places.photos?.[0] && (
                            <img
                                alt="image"
                                className="rounded-2xl aspect-square object-cover"
                                src={`http://localhost:4000/uploads/${place.photos[0]}`} />
                        )}
                    </div>
                    <h2 className="text-sm leading-4">{place.title}</h2>
                    <h3 className="font-bold text-gray-500">{place.address}</h3>
                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per night.
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HomePage;