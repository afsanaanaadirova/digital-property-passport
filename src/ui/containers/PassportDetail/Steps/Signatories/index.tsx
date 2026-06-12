import { getRequestState } from "@/app/helpers/getRequestState";
import { PassportModel } from "@/data/model/passport.model";
import Card from "@/ui/components/Card";
import { CardHeadDataType } from "@/ui/components/Card/card.type";
import { AppealDetailsTabType } from "./signatories.type";


const userInfoTitle: CardHeadDataType<PassportModel>[] = [
  {
    id: 1,
    name: "Əmlak Məsələləri Dövlət Xidməti nümayəndəsi",
    key: ["signatureOfPropertyAffairsStateService"],
  },
  {
    id: 2,
    name: "DŞAK nümayəndəsi",
    key: ["representativeOfDSHAK"],
  },
  {
    id: 3,
    name: "Yerli İcra Hakimiyyəti orqanı nümayəndəsi",
    key: ["representativeOfTheLocalExecutiveAuthority"],
  },
  {
    id: 4,
    name: "Mədəniyyət Nazirliyinin nümayəndəsi",
    key: ["ministryOfCultureRepresentative"],
  }
];
const Signatories = ({ passportByid, isLoading }: AppealDetailsTabType) => {
  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">İmzalayan şəxslər</h2>
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
    </div>
  );
};

export default Signatories;
