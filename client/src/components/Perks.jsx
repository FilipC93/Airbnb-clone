import React from "react";
import {
    ArrowDownSvg,
    RadioSvg,
    SmileySvg,
    TelevisionSvg,
    TruckSvg,
    WifiSvg
} from "../assets/constant-svg";

const Perks = ({selected, onChange}) => {
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <WifiSvg />
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <TruckSvg />
                <span>Free parking on area.</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <SmileySvg />
                <span>Pets allowed</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <ArrowDownSvg />
                <span>Private Entrance</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <TelevisionSvg />
                <span>TV</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <RadioSvg />
                <span>Radio</span>
            </label>
        </>
    );
}

export default Perks;