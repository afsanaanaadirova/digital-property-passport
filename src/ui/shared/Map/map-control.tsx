import { ControlPosition } from "@vis.gl/react-google-maps";

import { PlaceAutocompleteClassic } from "./autocomplete";

import type { AutocompleteMode } from "./map";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  address: string; 
  value:string 
};

export const CustomMapControl = ({
  onPlaceSelect,
  address, 
  value
}: CustomAutocompleteControlProps) => {
  return (
    <div className="autocomplete-control">
      <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} address={address} value={value} />
    </div>
  );
};
