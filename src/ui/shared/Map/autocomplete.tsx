import { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import LocationMap from "@svg/location-map.svg?react";
import { twMerge } from "tailwind-merge";
// import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
// import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
// import { setAppealForm } from "@/app/store/location";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  address: string;
  value: string;
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

  const [inputVal, setInputVal] = useState(value);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = address;
    }
  }, [address]);

  useEffect(() => {
    if (value) {
      setInputVal(value?.name);
    } else {
      setInputVal("");
    }
  }, [value]);
  // const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  // const hasMethods = methods && methods.formState;
  return (
    <div className="autocomplete-container">
      <div className="relative">
        <input
          className={twMerge(
            `h-14 rounded-[10px] bg-[#F5F5F5] px-4 py-[18px] w-full border-gray-200"`,
            // [
            //   hasMethods && handleError("location", methods)
            //     ? "border border-red-500"
            //     : "border-gray-200",
            // ].join(" ")
          )}
          name="location"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          ref={inputRef}
        />
        <LocationMap className="absolute top-[27%] right-3" />
      </div>
      {/* {hasMethods && handleError("location", methods) ? (
          <span role="alert" className="text-red-500 text-14px400">
            Bu xana doldurulmalidir
          </span>
        ) : null} */}
    </div>
  );
};
