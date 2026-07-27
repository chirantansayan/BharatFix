"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's broken default icon paths in Next.js
function FixLeafletIcons() {
  const map = useMap();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, [map]);
  return null;
}

const COMPLAINT_CITIES = [
  { city: "Delhi", lat: 28.6139, lng: 77.209, complaints: 1284, resolved: 1102 },
  { city: "Mumbai", lat: 19.076, lng: 72.8777, complaints: 987, resolved: 834 },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639, complaints: 643, resolved: 521 },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, complaints: 721, resolved: 618 },
  { city: "Bengaluru", lat: 12.9716, lng: 77.5946, complaints: 893, resolved: 774 },
  { city: "Patna", lat: 25.5941, lng: 85.1376, complaints: 412, resolved: 318 },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, complaints: 534, resolved: 461 },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, complaints: 389, resolved: 302 },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867, complaints: 678, resolved: 589 },
  { city: "Pune", lat: 18.5204, lng: 73.8567, complaints: 512, resolved: 443 },
  { city: "Lucknow", lat: 26.8467, lng: 80.9462, complaints: 334, resolved: 271 },
  { city: "Bhopal", lat: 23.2599, lng: 77.4126, complaints: 278, resolved: 221 },
];

export function Globe({ className }) {
  return (
    <div className={`relative h-[500px] w-full overflow-hidden rounded-sm border border-white/10 ${className ?? ""}`}>
      <MapContainer
        center={[22.5, 82.5]}
        zoom={5}
        minZoom={4}
        maxZoom={8}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#14181C" }}
        zoomControl={false}
      >
        <FixLeafletIcons />

        {/* Dark tile layer — CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {COMPLAINT_CITIES.map((c) => (
          <Marker key={c.city} position={[c.lat, c.lng]}>
            <Popup className="bf-popup">
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, lineHeight: 1.6 }}>
                <p style={{ color: "#A0721F", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {c.city}
                </p>
                <p style={{ color: "#52626F" }}>Filed: <strong style={{ color: "#1C2B39" }}>{c.complaints}</strong></p>
                <p style={{ color: "#52626F" }}>Resolved: <strong style={{ color: "#2F6E51" }}>{c.resolved}</strong></p>
                <p style={{ color: "#52626F" }}>
                  Rate: <strong style={{ color: "#1C2B39" }}>
                    {Math.round((c.resolved / c.complaints) * 100)}%
                  </strong>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay label */}
      <p className="pointer-events-none absolute bottom-3 inset-x-0 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 z-[1000]">
        Every ward, one registry
      </p>
    </div>
  );
}