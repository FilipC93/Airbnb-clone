import React, { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(20);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            axios.get(`/places/${id}`).then(response => {
                const { data } = response;
                const {
                    title, address, photos,
                    description, perks, extraInfo,
                    checkIn, checkOut, maxGuests,price
                } = data;
                setTitle(title);
                setAddress(address);
                setAddedPhotos(photos);
                setDescription(description);
                setPerks(perks);
                setExtraInfo(extraInfo);
                setCheckIn(checkIn);
                setCheckOut(checkOut);
                setMaxGuests(maxGuests);
                setPrice(price);
            });
        }
    }, [id])

    const inputHeader = label => {
        return <h2 className="text-2xl mt-4">{label}</h2>
    }

    const inputDescription = paragraph => {
        return <p className="text-gray-500 text-sm">{paragraph}</p>
    }

    const preInput = (header, description) => {
        return <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    }

    const savePlace = async e => {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,
            price
        };

        if (id) await axios.put('/user-places', { id, ...placeData });
        else await axios.post('/user-places', placeData);
        setRedirect(true);
    }

    if (redirect) return <Navigate to={'/account/places'} />

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'A title for your place, should be short and catchy')}
                <input
                    type="text"
                    placeholder="title, for example my lovely appartment"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {preInput('Address', 'Directions to your accomodation.')}
                <input
                    type="text"
                    placeholder="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                {preInput('Photos', 'The more the merrier.')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'A small description of the place.')}
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                {preInput('Perks', 'Select the features your accomodation provides.')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra information', 'House rules, etc.')}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                {preInput('Check in & out times', 'Add your own check in & check out time, reminder to have an additional time window.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in</h3>
                        <input
                            type="text"
                            placeholder="14:00"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out</h3>
                        <input
                            type="text"
                            placeholder="13:00"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max amount of guests</h3>
                        <input
                            type="number"
                            value={maxGuests}
                            onChange={e => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night:</h3>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button className="primary my-4">Submit</button>
            </form>
        </div>
    );
}

export default PlacesFormPage;