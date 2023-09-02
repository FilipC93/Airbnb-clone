import React, { useState } from "react";
import { FilledStarIcon, StarIcon, TrashcanIcon, UploadSvg } from "../assets/constant-svg";
import axios from "axios";

const PhotosUploader = ({ addedPhotos, onChange }) => {
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async e => {
        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => [...prev, filename]);
        setPhotoLink('');
    }

    const uploadPhoto = async e => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        const { data: filenames } = await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        onChange(prev => [...prev, ...filenames]);
    }

    const selectAsMainPhoto = (e, filename) => {
        e.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }

    const removePhoto = (e, filename) => {
        e.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <>
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
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div key={link} className="relative h-32 flex w-full object-cover gap-2">
                        <img className="rounded-2xl" src={`http://localhost:4000/uploads/${link}`} alt="Place Image" />
                        <button onClick={e => removePhoto(e, link)} className="cursor-pointer absolute bottom-1 right-7 text-white bg-black p-2 bg-opacity-60 rounded-2xl">
                            <TrashcanIcon />
                        </button>
                        <button onClick={e => selectAsMainPhoto(e, link)} className="cursor-pointer absolute top-1 left-1 text-white bg-black p-2 bg-opacity-60 rounded-2xl">
                            {link === addedPhotos[0] ? <FilledStarIcon /> : <StarIcon />}
                        </button>
                    </div>
                ))}
                <label className="h-32 flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <UploadSvg />Upload
                </label>
            </div>
        </>
    );
}

export default PhotosUploader;