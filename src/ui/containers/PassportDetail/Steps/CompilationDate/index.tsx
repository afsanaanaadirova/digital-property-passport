import { getRequestState } from "@/app/helpers/getRequestState";
import { PassportModel } from "@/data/model/passport.model";
import Card from "@/ui/components/Card";
import { CardHeadDataType } from "@/ui/components/Card/card.type";
import { AppealDetailsTabType } from "./compilation_date.type";

const userInfoTitle: CardHeadDataType<PassportModel>[] = [
  {
    id: 1,
    name: "Sistemə əlavə edilmə tarixi",
    key: ["createDate"],
  },
  {
    id: 2,
    name: "Sənədi əlavə edən operator",
    key: ["createdBy"],
  },
  {
    id: 3,
    name: "Parportun tərtib edilmə tarixi",
    key: ["passportIssueInfo"],
  },
]

const CompilationDate = ({ passportByid, isLoading }: AppealDetailsTabType) => {
  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">Tərtib edilmə tarixi</h2>
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

export default CompilationDate;
