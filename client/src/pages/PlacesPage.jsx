import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusSvg, UploadSvg } from "../assets/constant-svg";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const addPhotoByLink = async e => {
        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => [...prev, filename]);
        setPhotoLink('');
    }

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

    return (
        <>
            {action !== 'new' ? (
                <div className="text-center">
                    <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
                        <PlusSvg />Add a new place
                    </Link>
                </div>
            ) : (
                <div>
                    <form>
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
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add images using links"
                                value={photoLink}
                                onChange={e => setPhotoLink(e.target.value)}
                            />
                            <button className="bg-primary text-white p-4 rounded-2xl" onClick={addPhotoByLink}>
                                Add&nbsp;photo
                            </button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map((link, i) => (
                                <div key={i}>
                                    <img src={`http://localhost:4000/uploads/${link}`} alt="Place Image" />
                                </div>
                            ))}
                            <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <UploadSvg />Upload
                            </button>
                        </div>
                        {preInput('Description', 'A small description of the place.')}
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        {preInput('Perks', 'Select the features your accomodation provides.')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra information', 'House rules, etc.')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                        {preInput('Check in & out times', 'Add your own check in & check out time, reminder to have an additional time window.')}
                        <div className="grid gap-2 sm:grid-cols-3">
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
                        </div>
                        <button className="primary my-4">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default PlacesPage;