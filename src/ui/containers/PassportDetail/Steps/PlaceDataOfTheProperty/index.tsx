import { getRequestState } from "@/app/helpers/getRequestState";
import { PassportModel } from "@/data/model/passport.model";
import Card from "@/ui/components/Card";
import { CardHeadDataType } from "@/ui/components/Card/card.type";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { AppealDetailsTabType } from "./place_data_of_the_property.type";

const userInfoTitle: CardHeadDataType<PassportModel>[] = [
  {
    id: 1,
    name: "Obyektin ünvanı",
    key: ["objectLocation"],
  },
  {
    id: 2,
    name: "Ərazi",
    key: ["objectAreaName"],
  },
  {
    id: 3,
    name: "Mədəniyyət abidəsi",
    key: ["culturalMonumentName"],
  },
  {
    id: 4,
    name: "Obyektin təyinatı",
    key: ["objectDesignationName"],
  },
  {
    id: 5,
    name: "Obyektin mülkiyyət növü (torpaq üzrə)",
    key: ["landPropertyName"],
  },
  {
    id: 6,
    name: "Obyektin mülkiyyət növü (tikili üzrə)",
    key: ["buildingPropertyName"],
  },
  {
    id: 7,
    name: "Obyekt üzərində hüquq növü (torpaq üzrə)",
    key: ["landPropertyOfLawTypeName"],
  },
  {
    id: 8,
    name: "Obyekt üzərində hüquq növü (tikili üzrə)",
    key: ["buildingPropertyOfLawTypeName"],
  },
]
const API_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY as string;

const PlaceDataOfTheProperty = ({
  passportByid,
  isLoading,
}: AppealDetailsTabType) => {
  const loc = {
    lat: passportByid?.location.lat ?? 0,
    lng: passportByid?.location.lng ?? 0,
  };

  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">Obyektin məkan məlumatları</h2>
        </div>
        <Card
          state={getRequestState({
            data: passportByid,
            isLoading,
          })}
          headData={userInfoTitle}
          bodyData={passportByid}
        />
      </div>

      <div className={`flex justify-between py-4 border-b border-gray-200 ${passportByid?.location.lat ? "flex-col" : "flex"}`}>
        <h5 className="text-15px600 text-gray-800 mb-6">
          Obyektin məkan məlumatı
        </h5>
        {passportByid?.location.lat ?
          <APIProvider apiKey={API_KEY}>
            <Map
              defaultZoom={10}
              defaultCenter={loc}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              className="w-full h-60"
            >
              <Marker
                position={loc}
              />
            </Map>
          </APIProvider> : "Təyin olunmayıb"}
      </div>
    </div>
  );
};

export default PlaceDataOfTheProperty;
