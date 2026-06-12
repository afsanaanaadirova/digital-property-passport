import RadioGroup from "@/ui/shared/RadioGroup";
import { useState } from "react";
import { PassportDetailStepsEnum } from "@/data/enum/detail_steps.enum";
import PlaceDataOfTheProperty from "./Steps/PlaceDataOfTheProperty";
import { useGetPassportById, useGetPassportDownloadAllFiles } from "@/app/api/passport.api";
import { useParams } from "react-router-dom";
import ObjectOwnerInformation from "./Steps/ObjectOwnerInformation";
import OtherInformation from "./Steps/OtherInformation";
import Attachments from "./Steps/Attachments";
import CompilationDate from "./Steps/CompilationDate";
import Signatories from "./Steps/Signatories";
import Button from "@/ui/shared/Button";
import DownloadSVG from "@svg/downloadFile.svg?react";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { snackbar } from "@/ui/shared/Snackbar";

const appealDetails = [
  {
    id: 1,
    title: "Obyektin məkan məlumatları",
  },
  {
    id: 2,
    title: "Obyekt sahibi məlumatları",
  },
  {
    id: 3,
    title: "Digər məlumatlar",
  },
  {
    id: 4,
    title: "Qoşmalar",
  },
  {
    id: 5,
    title: "Tərtib edilmə tarixi",
  },
  {
    id: 6,
    title: "İmzalayan şəxslər",
  },
] as const;

const data = appealDetails.map((action) => ({
  ...action,
  render: (
    <div className="flex items-center gap-x-4 p-4 rounded-xl group-data-[checked]:bg-[#FBF9F1] group-data-[checked]:border-l-4 border-[#BE9753]">
      <div className="">
        <p className="text-16px600">{action.title}</p>
      </div>
    </div>
  ),
}));

const PassportDetail = () => {

  const param = useParams();
  const passportDownloadAllFilesHandler = useGetPassportDownloadAllFiles();

  const getPassportDownloadAllFilesHandler = (id: number) => {
    passportDownloadAllFilesHandler.mutate(id!, {
      onSuccess: () => {
        snackbar(SnackbarStatusEnum.SUCCESS, "Uğurla yükləndi");
      },
      onError() {
        snackbar(SnackbarStatusEnum.ERROR, "Xeta baş verdi");
      },
    });
  };
  const { data: passportByid, isLoading: passportLoading } = useGetPassportById(
    Number(param.id)
  );

  const [activeTab, setActiveTab] = useState(
    PassportDetailStepsEnum.PLACE_DATA_OF_THE_PROPERTY
  );

  const tabs = {
    [PassportDetailStepsEnum.PLACE_DATA_OF_THE_PROPERTY]: (
      <PlaceDataOfTheProperty
        passportByid={passportByid}
        isLoading={passportLoading}
      />
    ),
    [PassportDetailStepsEnum.OBJECT_OWNER_INFORMATION]: (
      <ObjectOwnerInformation
        passportByid={passportByid}
        isLoading={passportLoading}
      />
    ),
    [PassportDetailStepsEnum.OTHER_INFORMATION]: (
      <OtherInformation
        passportByid={passportByid}
        isLoading={passportLoading}
      />
    ),
    [PassportDetailStepsEnum.ATTACHMENTS]: (
      <Attachments passportByid={passportByid} isLoading={passportLoading} />
    ),
    [PassportDetailStepsEnum.COMPILATION_DATE]: (
      <CompilationDate
        passportByid={passportByid}
        isLoading={passportLoading}
      />
    ),
    [PassportDetailStepsEnum.SIGNATORIES]: (
      <Signatories passportByid={passportByid} isLoading={passportLoading} />
    ),
  };
  const handlePrint = () => {
    const printContent = `
      <html>
      <head>
       <title>&nbsp</title> 
        <style>
         @media print {
          @page {
            margin: 0;
            padding:20px;
          }
          footer, header {
            display: none;
          }
        }
          body {
            font-family: Arial, sans-serif;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          li {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
          }
          div {
            display: flex;
            flex-direction: column;
          }
          .passport-file{
            display: flex;
             flex-direction: unset;
             justify-content: space-between;
          }
         .passport-file-item{
          justify-content: end;
          }
        </style>
      </head>
      <body>
        <h3><span>Pasport nömrəsi</span> ${passportByid?.passportNumber || "Təyin olunmayıb"}</h3>
        <h2>Obyektin məkan məlumatları</h2>
        <ul>
          <li><span>Obyektin ünvanı</span> ${passportByid?.objectLocation || "Təyin olunmayıb"}</li>
          <li><span>Ərazi</span> ${passportByid?.objectAreaName || "Təyin olunmayıb"}</li>
          <li><span>Obyektin təyinatı</span> ${passportByid?.objectDesignationName || "Təyin olunmayıb"}</li>
          <li><span>Mədəniyyət abidəsi</span> ${passportByid?.culturalMonumentName || "Təyin olunmayıb"}</li>
          <li><span>Obyektin mülkiyyət növü (torpaq üzrə)</span> ${passportByid?.landPropertyName || "Təyin olunmayıb"}</li>
          <li><span>Obyektin mülkiyyət növü (tikili üzrə)</span> ${passportByid?.buildingPropertyName || "Təyin olunmayıb"}</li>
        </ul>
  
        <h2>Obyekt sahibi məlumatları</h2>
        <div>
          <ul>
            ${passportByid?.personTypes
        ?.map(
          (item) => `
              <li>
                <span>Obyekt sahibinin növü</span> ${item.ownerTypeName || "Təyin olunmayıb"}
              </li>
              <li>
                <span>${item.ownerTypeId === 1 ? "FIN" : "Obyekt sahibinin VÖEN-i"}</span> ${item.ownerTypeId === 1 ? item.pin || "Təyin olunmayıb" : item.tin || "Təyin olunmayıb"
            }
              </li>
              <li>
                <span>${item.ownerTypeId === 1 ? "Ad, Soyad, Ata adı" : "Şirkətin adı"}</span> ${item.ownerTypeId === 1 ? item.fullname || "Təyin olunmayıb" : item.companyName || "Təyin olunmayıb"
            }
              </li>
              <li>
                <span>Əlaqə nömrəsi</span> ${item.contactNumber || "Təyin olunmayıb"}
              </li>
            `
        )
        .join("")}
          </ul>
        </div>
        <h2>Digər məlumatları</h2>
     <ul>
       <li><span className="text-gray-500">Obyektin kodu (əmlakın reyestr kodu)</span> ${passportByid?.objectCode || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Mərtəbə sayı</span> ${passportByid?.numberOfFloors || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Ümumi torpaq sahəsi (kv. m)</span> ${passportByid?.totalLandArea || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Tikilinin ümumi sahəsi (kv. m)</span> ${passportByid?.totalBuildingArea || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Yaşayış sahəsi (kv. m)</span> ${passportByid?.residentialArea || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Qeyri-yaşayış sahəsi (kv. m)</span> ${passportByid?.nonRresidentialArea || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Torpaq sahəsinin ehtimal olunan satış qiyməti (1 kv.m)</span> ${passportByid?.sellingPriceOfLand1KVM || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Tikinti sahəsinin ehtimal olunan satış qiyməti (1 kv.m)</span> ${passportByid?.sellingPriceOfBuilding1KVM || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Yaşayış obyektində sakinlərin sayı</span> ${passportByid?.numberOfResidentsInTheResidentialFacility || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Alqı-satqı protokolu</span> ${passportByid?.PurchaseAndSaleProtocolName || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Əlavə qeyd</span> ${passportByid?.note || "Təyin olunmayıb"}</li>
     </ul>
      <div>
      ${passportByid?.passportFiles && passportByid?.passportFiles.length > 0 ? '<h2>Qoşmalar</h2>' :""}
        ${passportByid?.passportFiles
          ?.map(
            (item) =>
              `<div class="passport-file">
                <span className="text-gray-500">${item.name.replace(/,$/, '')}</span>
                <ul>
                  ${item?.files
                    ?.map((f) => `<li class="passport-file-item">${f.name}</li>`)
                    .join('')}
                </ul>
              </div>`
          )
          .join('')}
      </div>
     <h2>İmzalayan şəxslər</h2>
     <ul>
       <li><span className="text-gray-500">Əmlak Məsələləri Dövlət Xidməti nümayəndəsi</span> ${passportByid?.signatureOfPropertyAffairsStateService || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">DŞAK nümayəndəsi</span> ${passportByid?.representativeOfDSHAK || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Yerli İcra Hakimiyyəti orqanı nümayəndəsi</span> ${passportByid?.representativeOfTheLocalExecutiveAuthority || "Təyin olunmayıb"}</li>
       <li><span className="text-gray-500">Mədəniyyət Nazirliyinin nümayəndəsi</span> ${passportByid?.ministryOfCultureRepresentative || "Təyin olunmayıb"}</li>
     </ul>
         </body>
         </html>
       `;
    const printDiv = document.createElement("div");
    printDiv.style.display = "none";
    printDiv.innerHTML = printContent;
    document.body.appendChild(printDiv);
  
    const printArea = window.open("", "_self");
    printArea?.document.write(printContent);
    printArea?.focus();
    printArea?.print();
    if (printArea) {
      if (!printArea.closed) {
        window.location.reload();
      }
    } 
    document.body.removeChild(printDiv);
  };
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center pb-6">
        <h4 className="text-24px700">
          Pasport nömrəsi: {passportByid?.passportNumber}
        </h4>
        <div className="flex gap-x-2">
          <Button
            onClick={handlePrint}
            className="py-[14px] px-6 rounded-[10px] bg-[#D2AB67] text-black h-12"
          >
            Çap Et
          </Button>
          <Button
            isLoading={passportDownloadAllFilesHandler.isPending}
            onClick={() => getPassportDownloadAllFilesHandler(Number(param.id))}
            className="py-[14px] min-w-[168px] px-6 rounded-[10px] bg-[#D2AB67] text-black h-12"
          >
            Qoşmaların hamısını yüklə
            <DownloadSVG className="ml-2" />
          </Button>
        </div>
      </div>
      <div className="flex gap-x-5">
        <div className="flex-[3]">
          <RadioGroup
            name={""}
            data={data}
            value={activeTab}
            className="flex flex-col gap-y-1 p-2 border border-gray-200 rounded-2xl bg-white"
            onChange={(val) => setActiveTab(val.id)}
          />
        </div>
        <div className="flex-[7]">{tabs[activeTab]}</div>
      </div>
    </div>
  );
};

export default PassportDetail;
