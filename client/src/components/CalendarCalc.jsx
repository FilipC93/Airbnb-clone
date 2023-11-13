import React from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { BankNotesIcon, CalendarIcon, MoonIcon } from "../assets/constant-svg";

const CalendarCalc = ({booking}) => {
    return (
        <div className='py-3 pr-3 grow mt-2'>
            <h2 className='text-xl'>{booking?.place?.title}</h2>
            <div className='flex gap-2 border-t border-gray-300 text-sm mt-4 mb-2'>
                <CalendarIcon />
                {format(new Date(booking?.checkIn), 'dd-MM-yyyy')}
                {' '}
                &rarr;
                <CalendarIcon />
                {format(new Date(booking?.checkOut), 'dd-MM-yyyy')}
            </div>
            <div className='text-xl'>
                <div className='flex gap-1 my-1'>
                    <MoonIcon />
                    {differenceInCalendarDays(new Date(booking?.checkOut), new Date(booking?.checkIn))} nights
                </div>
                <div className='flex gap-1 my-1'>
                    <BankNotesIcon />
                    Total: ${booking?.price}
                </div>
            </div>
        </div>
    );
}

export default CalendarCalc;