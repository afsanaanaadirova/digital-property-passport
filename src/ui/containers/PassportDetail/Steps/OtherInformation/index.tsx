import { getRequestState } from "@/app/helpers/getRequestState";
import { PassportModel } from "@/data/model/passport.model";
import Card from "@/ui/components/Card";
import { CardHeadDataType } from "@/ui/components/Card/card.type";
import { AppealDetailsTabType } from "./other_information.type";

const userInfoTitle: CardHeadDataType<PassportModel>[] = [
  {
    id: 1,
    name: "Obyektin kodu (əmlakın reyestr kodu)",
    key: ["objectCode"],
  },
  {
    id: 2,
    name: "Mərtəbə sayı",
    key: ["numberOfFloors"],
  },
  {
    id: 3,
    name: "Ümumi torpaq sahəsi (kv. m)",
    key: ["totalLandArea"],
  },
  {
    id: 4,
    name: "O cümlədən sənəd üzrə (kv. m)",
    key: ["totalLandAreaForDocument"],
  },
  {
    id: 5,
    name: "Tikilinin ümumi sahəsi (kv. m)",
    key: ["totalBuildingArea"],
  },
  {
    id: 6,
    name: "O cümlədən sənəd üzrə (kv. m)",
    key: ["totalBuildingAreaForDocument"],
  },
  {
    id: 7,
    name: "Obyekt üzərində hüquq növü (tikili üzrə)",
    key: ["buildingPropertyOfLawTypeName"],
  },
  {
    id: 8,
    name: "Yaşayış sahəsi (kv. m)",
    key: ["residentialArea"],
  },
  {
    id: 9,
    name: "Qeyri-yaşayış sahəsi (kv. m)",
    key: ["nonRresidentialArea"],
  },
  {
    id: 10,
    name: "Otaq sayı",
    key: ["numberOfRooms"],
  },
  {
    id: 11,
    name: "Torpaq sahəsinin ehtimal olunan satış qiyməti (1 kv.m)",
    key: ["sellingPriceOfLand1KVM"],
    suffix: "AZN",
  },
  {
    id: 12,
    name: "Torpaq sahəsinin ehtimal olunan satış qiyməti (ümumi)",
    key: ["sellingTotalPriceOfLand"],
    suffix: "AZN",
  },
  {
    id: 13,
    name: "Tikinti sahəsinin ehtimal olunan satış qiyməti  (1 kv.m)",
    key: ["sellingPriceOfBuilding1KVM"],
    suffix: "AZN",
  },
  {
    id: 14,
    name: "Tikinti sahəsinin ehtimal olunan satış qiyməti  (ümumi)",
    key: ["sellingTotalPriceOfBuilding"],
    suffix: "AZN",
  },
  {
    id: 15,
    name: "Obyektin ehtimal olunan ümumi satış qiyməti",
    key: ["sellingTotalPriceOfObject"],
    suffix: "AZN",
  },
  {
    id: 16,
    name: "Yaşayış obyektində sakinlərin sayı",
    key: ["numberOfResidentsInTheResidentialFacility"],
  },
  {
    id: 17,
    name: "Faktiki qeydiyyatda olan sakinlərin sayı",
    key: ["numberOfActualRegisteredResidents"],
  },
  {
    id: 18,
    name: "Alqı-satqı protokolu",
    key: ["PurchaseAndSaleProtocolName"],
  },
]

const OtherInformation = ({
  passportByid,
  isLoading,
}: AppealDetailsTabType) => {
  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">Digər məlumatları</h2>
        </div>
        <Card
          state={getRequestState({
            data: passportByid,
            isLoading,
          })}
          headData={userInfoTitle}
          bodyData={passportByid}
        />
        <div className="flex justify-between pt-4">
          <div>Əlavə qeyd</div>
          <div>{passportByid?.note ?passportByid?.note :"Yoxdur"}</div>
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
