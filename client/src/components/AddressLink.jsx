import React from "react";
import { PinIcon } from "../assets/constant-svg";

const AddressLink = ({ place, className }) => {

    if (!className) {
        className = 'flex gap-1 underline font-semibold my-4';
    }

    return (
        <a href={`https://maps.google.com/?q=${place.address}`}
            target="_blank"
            className={className}>
            <PinIcon />{place.address}
        </a>
    );
}

export default AddressLink;