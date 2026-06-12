import { FileEnum } from "@/data/enum/files.enum";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgZoom from "lightgallery/plugins/zoom";
import Skeleton from "@/ui/shared/Skeleton";
import { AppealDetailsTabType } from "./attachments.type";


const Attachments = ({ passportByid, isLoading }: AppealDetailsTabType) => {
  return (
    <div className="border p-6 py-8 rounded-2xl bg-white">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 justify-between pb-6 border-b">
          <h2 className="text-18px700">Qoşmalar</h2>
        </div>
        <div className="gap-y-8 flex flex-col">
          {isLoading ?
            <>
              <Skeleton className="w-2/5 h-4" />
              <Skeleton className="w-1/5 h-4" />
            </> :
            <>
              {
                <>
                  {/* Mülkiyyətdə, icarədə və ya istifadədə olmasını təsdiq edən sənəd */}

                  <div className="flex justify-between border-b pb-4">
                    <div>Mülkiyyətdə, icarədə və ya istifadədə olmasını təsdiq edən sənəd</div>
                    {passportByid?.passportFiles.find((item) => item.id === FileEnum.documentOfOwnership) ? (
                      <div className="flex flex-col text-right">
                        {passportByid.passportFiles
                          .find((item) => item.id === FileEnum.documentOfOwnership)
                          ?.files.map((file) => (
                            <a href={file.file} target="_blank" className="text-blue-500 underline">{file.name}</a>
                          ))}
                      </div>
                    ) : "Təyin olunmayıb"}
                  </div>

                  {/* Plan quruluşu */}
                  <div className="flex justify-between border-b pb-4">
                    <div>Plan quruluşu</div>
                    {passportByid?.passportFiles.find((item) => item.id === FileEnum.planStructure) ? (
                      <div className="flex flex-col text-right">
                        {passportByid.passportFiles
                          .find((item) => item.id === FileEnum.planStructure)
                          ?.files.map((file) => (
                            <a href={file.file} target="_blank" className="text-blue-500 underline">{file.name}</a>
                          ))}
                      </div>
                    ) : "Təyin olunmayıb"}
                  </div>

                  {/* Obyektin video görüntüsü */}

                  <div className="flex justify-between border-b pb-4">
                    <div>Obyektin video görüntüsü</div>
                    {passportByid?.passportFiles.find((item) => item.id === FileEnum.videoImageOfTheObject) ? (
                      <div className="flex flex-col text-right">
                        {passportByid.passportFiles
                          .find((item) => item.id === FileEnum.videoImageOfTheObject)
                          ?.files.map((file) => (
                            <a href={file.file} target="_blank" className="text-blue-500 underline">{file.name}</a>
                          ))}
                      </div>
                    ) : "Təyin olunmayıb"}
                  </div>

                  {/* Fiziki pasport sənədi */}

                  <div className="flex justify-between border-b pb-4">
                    <div>Fiziki pasport sənədi</div>
                    {passportByid?.passportFiles.find((item) => item.id === FileEnum.physicalPassportDocument) ? (
                      <div className="flex flex-col text-right">
                        {passportByid.passportFiles
                          .find((item) => item.id === FileEnum.physicalPassportDocument)
                          ?.files.map((file) => (
                            <a href={file.file} target="_blank" className="text-blue-500 underline">{file.name}</a>
                          ))}
                      </div>
                    ) : "Təyin olunmayıb"}
                  </div>
                  <div className={`flex justify-between border-b pb-4 ${passportByid?.passportFiles.find((item) => item.id === FileEnum.picturesOfTheObjectFromFourSides)} ? 'flex-col' : 'flex'}`}>
                    <div>Dörd tərəfdən (ön, arxa və yanlardan) obyektin şəkilləri</div>
                    {passportByid?.passportFiles.find((item) => item.id === FileEnum.picturesOfTheObjectFromFourSides) ? (
                      <div className="flex flex-col text-right">
                        <LightGallery
                          speed={500}
                          plugins={[lgZoom]}
                          elementClassNames="flex gap-x-2 flex-col"
                        >
                          {passportByid.passportFiles
                            .find((item) => item.id === FileEnum.picturesOfTheObjectFromFourSides)
                            ?.files.map((file) => (
                              <a
                                href={file.file}
                                className="block rounded-lg overflow-hidden mb-2 text-blue-500 underline"
                                key={file.file}
                              >
                                {file.name}
                              </a>
                            ))}
                        </LightGallery>
                      </div>
                    ) : (
                      <div className="text-right">Təyin olunmayıb</div>
                    )}
                  </div>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Attachments;
