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

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

const MapComponent = ({
  value,
  onChange,
  onAddressChange,
}: {
  value: string,
  onChange: () => void,
  onAddressChange: any
}) => {
  type LatLng = {
    lat: number;
    lng: number;
  };
  type MapType = {
    name: string,
    lat: string,
    lng: string,
  }

  const [selectedAutocompleteMode] = useState<AutocompleteMode>(
    autocompleteModes[0]
  );
  const [mapCenter, setMapCenter] = useState<MapType>();
  const [selectedPlace, setSelectedPlace] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });


  const [address, setAddress] = useState<string>("");
  const [mapType, setMapType] = useState<string>("roadmap");

  useEffect(() => {
    if (value) {
      setSelectedPlace(value);
      setMapCenter({
        name: address,
        lat: value?.lat,
        lng: value?.lng,
      });
    }
  }, [value]);

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place.geometry.location);
    setAddress(place.formatted_address || "");
    const name = place.formatted_address || "";

    onAddressChange({
      name,
      lat: place.geometry.location?.lat(),
      lng: place.geometry.location?.lng(),
    });
    setMapCenter({ name, lat: location?.lat, lng: location?.lng });
  };
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() ? e.latLng?.lat() : null;
    const lng = e.latLng?.lng() ? e.latLng?.lng() : null

    if (lat !== null && lat !== undefined && lng !== undefined && lng !== null) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setAddress(results[0].formatted_address);
          setMapCenter({ name: results[0].formatted_address, lat, lng });
          onChange({ name: results[0].formatted_address, lat, lng });
        }
      });
    }
  };
  const defaultLocation = { lat: 40.3898575, lng: 49.7781437 };

  const handleDelete = () => {
    onAddressChange(null);
    setSelectedPlace({
      lat: 0,
      lng: 0,
    });
  };
  return (
    <APIProvider apiKey={API_KEY}>
      <div className="relative">
        <CustomMapControl
          value={value}
          controlPosition={ControlPosition.TOP}
          selectedAutocompleteMode={selectedAutocompleteMode}
          onPlaceSelect={handlePlaceSelect}
          address={address}
        />
        {value?.lat !== undefined && (
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
            className={`map-type-button border  bg-[#F5F5F5] text-black px-4 py-1 rounded-[10px] ${mapType === "roadmap" ? "active bg-[#eef2f6] " : ""
              }`}
            onClick={() => setMapType("roadmap")}
          >
            Standart Xəritə
          </button>
          <button
            type="button"
            className={`map-type-button border  bg-[#F5F5F5] text-black px-4 py-1 rounded-[10px] ${mapType === "satellite" ? "active bg-[#eef2f6]" : ""
              }`}
            onClick={() => setMapType("satellite")}
          >
            Satellite
          </button>
        </div>
        <Map
          defaultZoom={10}
          center={mapCenter?.lat !== undefined ? mapCenter : defaultLocation}
          gestureHandling="auto"
          keyboardShortcuts={false}
          disableDefaultUI={true}
          mapTypeId={mapType}
          className="w-full h-60"
        >

          {
            selectedPlace?.lat && selectedPlace?.lng && (
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
