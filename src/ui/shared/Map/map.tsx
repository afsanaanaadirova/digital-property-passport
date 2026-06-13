import { useEffect, useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";
import Close from "@svg/close.svg?react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY as string;

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: AutocompleteMode[] = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

type LatLng = {
  lat: number;
  lng: number;
  name?: string;
};

type LocationValue = {
  lat: number | null | undefined;
  lng: number | null | undefined;
  name?: string | null | undefined;
};

type Props = {
  value: LocationValue | null;
  onChange: (val: LatLng | null) => void;
  onAddressChange?: (val: LatLng | null) => void;
};

const defaultLocation: LatLng = {
  lat: 40.3898575,
  lng: 49.7781437,
};

const MapComponent = ({ value, onChange, onAddressChange }: Props) => {
  const [selectedAutocompleteMode] = useState(autocompleteModes[0]);

  const [mapCenter, setMapCenter] = useState<LatLng>(defaultLocation);

  const [selectedPlace, setSelectedPlace] = useState<LatLng | null>(null);

  const [address, setAddress] = useState("");
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");

  useEffect(() => {
    if (value && value.lat != null && value.lng != null) {
      const latLng: LatLng = { lat: value.lat, lng: value.lng, name: value.name ?? undefined };
      setSelectedPlace(latLng);
      setMapCenter(latLng);
      setAddress(value.name || "");
    }
  }, [value]);

  const handlePlaceSelect = (place: any) => {
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const name = place.formatted_address || "";

    const newValue: LatLng = { lat, lng, name };

    setSelectedPlace(newValue);
    setMapCenter(newValue);
    setAddress(name);

    onAddressChange?.(newValue);
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat == null || lng == null) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const name = results[0].formatted_address;

        const newValue: LatLng = { lat, lng, name };

        setAddress(name);
        setMapCenter(newValue);
        setSelectedPlace(newValue);

        onChange(newValue);
        onAddressChange?.(newValue);
      }
    });
  };

  const handleDelete = () => {
    setSelectedPlace(null);
    setAddress("");
    setMapCenter(defaultLocation);
    onAddressChange?.(null);
    onChange(null);
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="relative">
        <CustomMapControl
          value={address || ""}
          controlPosition={ControlPosition.TOP}
          selectedAutocompleteMode={selectedAutocompleteMode}
          onPlaceSelect={handlePlaceSelect}
          address={address}
        />

        {selectedPlace && (
          <div
            className="absolute right-12 top-4 border border-[#e3e8ef] bg-[#e3e8ef] p-2 rounded-full cursor-pointer"
            onClick={handleDelete}
          >
            <Close />
          </div>
        )}

        <div className="map-type-toggle flex justify-end gap-x-2 pb-3 pt-6">
          <button
            type="button"
            className={`border px-4 py-1 rounded-[10px] ${mapType === "roadmap" ? "bg-[#eef2f6]" : "bg-[#F5F5F5]"
              }`}
            onClick={() => setMapType("roadmap")}
          >
            Standart Xəritə
          </button>

          <button
            type="button"
            className={`border px-4 py-1 rounded-[10px] ${mapType === "satellite" ? "bg-[#eef2f6]" : "bg-[#F5F5F5]"
              }`}
            onClick={() => setMapType("satellite")}
          >
            Satellite
          </button>
        </div>

        <Map
          defaultZoom={10}
          center={mapCenter}
          gestureHandling="auto"
          keyboardShortcuts={false}
          disableDefaultUI={true}
          mapTypeId={mapType}
          className="w-full h-60"
        >
          {selectedPlace && (
            <Marker
              position={selectedPlace}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </Map>

        <MapHandler place={selectedPlace} />
      </div>
    </APIProvider>
  );
};

export default MapComponent;