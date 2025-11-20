import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// map
const position = [23.8041, 90.4152];
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
// import "../../../node_modules/leaflet/dist/leaflet.css";
const Covarage = () => {
  const locationData = useLoaderData();
  // console.log(locationData);
  return (
    <div>
      <h2 className=" mt-6 font-bold text-3xl text-pink-600">
        {" "}
        We are available in 64 Didtricts
      </h2>
      <div className="mt-6 mb-5 ">
        <label className="input rounded-2xl border-2 border-gray-500">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        {/* button search */}
        <button className="btn-primary btn text-black ml-2 rounded-3xl">
          Search
        </button>
      </div>
      <div className="text-gray-500 w-full border-1 mb-6 mt-6"></div>
      <div>
        {/* map */}
        <h2 className="text-3xl font-semibold mb-4 text-orange-500">
          We deliver almost all over Bangladesh
        </h2>
        <div className="border-1 w-full h-[900px]">
          <MapContainer
            center={position}
            zoom={7.5}
            scrollWheelZoom={false}
            className="h-[900px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locationData.map((location) => (
              <Marker
                key={location.city}
                position={[location.latitude, location.longitude]}
              >
                <Popup>Survice Area: {location.covered_area.join(", ")}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        ,
      </div>
    </div>
  );
};

export default Covarage;
