import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import LocationMap from "@svg/location-map.svg?react";
import { twMerge } from "tailwind-merge";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  address: string;
  value?: string;
}

export const PlaceAutocompleteClassic = ({
  onPlaceSelect,
  address,
  value,
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const listener = placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      listener.remove();
    };
  }, [placeAutocomplete, onPlaceSelect]);

  useEffect(() => {
    if (address) {
      setInputVal(address);
    }
  }, [address]);

  useEffect(() => {
    if (value) {
      setInputVal(value);
    }
  }, [value]);

  return (
    <div className="autocomplete-container">
      <div className="relative">
        <input
          ref={inputRef}
          name="location"
          className={twMerge(
            "h-14 rounded-[10px] bg-[#F5F5F5] px-4 py-[18px] w-full border border-gray-200"
          )}
          value={inputVal ?? ""}
          onChange={(e) => setInputVal(e.target.value)}
        />

        <LocationMap className="absolute top-[27%] right-3" />
      </div>
    </div>
  );
};