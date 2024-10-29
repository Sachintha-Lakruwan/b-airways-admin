"use client";

import React, { useState } from "react";

const AgeClassification = () => {
    const [flightNumber, setFlightNumber] = useState("");

    return (
        <div className="p-8 max-w-4xl mx-auto">
            
            <div className="grid grid-cols-2 gap-6">
            
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Boeing 737</h4>
                  <p className="mt-1 text-2xl font-bold">$75000</p>
                </div>


                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Boeing 757</h4>
                  <p className="mt-1 text-2xl font-bold">$500000</p>
                  
                </div>
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Boeing 737</h4>
                  <p className="mt-1 text-2xl font-bold">$75000</p>
                </div>


                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Boeing 757</h4>
                  <p className="mt-1 text-2xl font-bold">$500000</p>
                  
                </div>
            </div>
        </div>
    );
};

export default AgeClassification;