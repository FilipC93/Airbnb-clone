import React from "react";

const PricingSection = ({ place }) => {
    return (
        <div>
            <div className="bg-gray-300 shadow p-4 border rounded-2xl">
                <div className="text-2xl text-center mb-2">Price: ${place.price} / night.</div>
                <div className="flex justify-center">
                    <div className="py-3 px-4">
                        <label className="mr-2">Check in:</label>
                        <input type="date" />
                    </div>
                    <div className="py-2 px-4 border-l">
                        <label className="mr-2">Check out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label className="mr-2">Number of guests:</label>
                    <input type="number" value={1} />
                </div>
            </div>
            <button className="primary">Book now</button>
        </div>
    );
}

export default PricingSection;