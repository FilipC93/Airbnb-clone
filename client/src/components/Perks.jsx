import React from "react";
import {
    ArrowDownSvg,
    RadioSvg,
    SmileySvg,
    TelevisionSvg,
    TruckSvg,
    WifiSvg
} from "../assets/constant-svg";

const Perks = ({ selected, onChange }) => {

    const handleCBClick = e => {
        const { checked, name } = e.target;
        checked ?
            onChange([...selected, name])
            :
            onChange([...selected.filter(sName => sName !== name)]);
    }

    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('wifi')} name="wifi" />
                <WifiSvg />
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('parking')} name="parking" />
                <TruckSvg />
                <span>Free parking on area.</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('pets')} name="pets" />
                <SmileySvg />
                <span>Pets allowed</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('entrance')} name="entrance" />
                <ArrowDownSvg />
                <span>Private Entrance</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('tv')} name="tv" />
                <TelevisionSvg />
                <span>TV</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input onChange={handleCBClick} type="checkbox" checked={selected.includes('radio')} name="radio" />
                <RadioSvg />
                <span>Radio</span>
            </label>
        </>
    );
}

export default Perks;