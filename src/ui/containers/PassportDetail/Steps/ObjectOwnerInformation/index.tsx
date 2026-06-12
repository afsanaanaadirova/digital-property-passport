import { AppealDetailsTabType } from "./object_owner_information.type";

const ObjectOwnerInformation = ({ passportByid }: AppealDetailsTabType) => {
  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">Obyekt sahibi məlumatları</h2>
        </div>
        {passportByid?.personTypes.map((person) => {
          return (
            <div>
              <ul className="divide-y">
                <li className="flex justify-between items-end py-4">
                  <span className="text-gray-500">Obyekt sahibinin növü</span>
                  <span>{person.ownerTypeName}</span>
                </li>
                <li className="flex justify-between items-end py-4">
                  <span className="text-gray-500 ">
                    {person.ownerTypeId === 1
                      ? "FIN"
                      : "Obyekt sahibinin VÖEN-i"}
                  </span>
                  <span>
                    {person.ownerTypeId === 1 ? person.pin ? person.pin : "Təyin olunmayıb" : person.tin}
                  </span>
                </li>
                <li className="flex justify-between items-center py-4">
                  <span className="text-gray-500">
                    {person.ownerTypeId === 1
                      ? "Ad, Soyad, Ata adı"
                      : "Şirkətin adı"}
                  </span>
                  <span>
                    {person.ownerTypeId === 1
                      ? person.fullname
                      : person.companyName}
                  </span>
                </li>
                <li className="flex justify-between items-center py-4">
                  <span className="text-gray-500">Əlaqə nömrəsi</span>
                  <span>{`+994${person.contactNumber}`}</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ObjectOwnerInformation;
