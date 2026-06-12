import ObjectAttachmentsInfoForm from "@/ui/features/ObjectAttachmentsInfoForm";
import ObjectDataConfirmationForm from "@/ui/features/ObjectDataConfirmationForm";
import ObjectOtherInfoForm from "@/ui/features/ObjectOtherInfoForm";
import ObjectOwnerInfoForm from "@/ui/features/ObjectOwnerInfoForm";
import ObjectPlaceInfoForm from "@/ui/features/ObjectPlaceInfoForm";
import Button from "@/ui/shared/Button";
import Form from "@/ui/shared/Form";
import Loading from "@/ui/shared/Loading";
import BookMark from "@svg/bookmark.svg?react";
import Check from "@svg/check.svg?react";
import İnfoCircle from "@svg/info-circle.svg?react";
import CheckSVG from "@svg/check.svg?react";
import CreatePassportVM from "./create_passport.vm";

const CreatePassport = () => {
    const {
        ownerTypes,
        areas,
        destinations,
        passportLoading,
        buildingPropertyTypes,
        buildingOwnershipTypes,
        landOwnershipTypes,
        culturalMonuments,
        landPropertyshipTypes,
        passportByid,
        ownerTypesLoading,
        destinationsLoading,
        areasLoading,
        buildingPropertyTypesLoading,
        buildingOwnershipTypesLoading,
        landPropertyshipTypesLoading,
        landOwnershipTypesLoading,
        passportFileTypesLoading,
        culturalMonumentsLoading, params, methods,
        onSubmit, stepper, uploadLoading, updatePassport,
        setFormStatus, isDirty, isFixed, handleChangeField } = CreatePassportVM()
    return (
        <>
            {passportLoading ||
                (ownerTypesLoading && areasLoading &&
                    destinationsLoading &&
                    buildingPropertyTypesLoading &&
                    buildingOwnershipTypesLoading &&
                    landPropertyshipTypesLoading &&
                    landOwnershipTypesLoading &&
                    passportFileTypesLoading &&
                    culturalMonumentsLoading) ? (
                <Loading />
            ) : (
                <div className="flex gap-x-4 p-8 justify-between relative">
                    <div className=" w-full">
                        <h5 className="text-30px700 text-gray-800 pb-6">
                            {params.id ? "Pasportun redaktə edilməsi" : "Yeni pasportun yaradılması"}
                        </h5>
                        <Form
                            className="flex gap-y-6 flex-col md:w-1/2 w-full pb-6 md:pt-8 bg-white rounded-2xl px-8"
                            methods={methods}
                            onSubmit={onSubmit}
                        >
                            <ObjectPlaceInfoForm
                                areas={areas}
                                destinations={destinations}
                                buildingOwnershipTypes={buildingOwnershipTypes}
                                landOwnershipTypes={landOwnershipTypes}
                                landPropertyshipTypes={landPropertyshipTypes}
                                buildingPropertyTypes={buildingPropertyTypes}
                                culturalMonuments={culturalMonuments}
                                passportByid={passportByid}
                                handleChangeField={handleChangeField}
                                methods={methods} />
                            <ObjectOwnerInfoForm ownerTypes={ownerTypes} handleChangeField={handleChangeField} methods={methods} />
                            <ObjectOtherInfoForm handleChangeField={handleChangeField} methods={methods} />
                            <ObjectAttachmentsInfoForm handleChangeField={handleChangeField} methods={methods} />
                            <ObjectDataConfirmationForm handleChangeField={handleChangeField} methods={methods} />
                            {params.id ? (
                                <div className="flex gap-x-3">
                                    <Button
                                        disabled={uploadLoading}
                                        isLoading={updatePassport.isPending}
                                        onClick={() => setFormStatus("draft")}
                                        className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
                                    >
                                        Qaralama kimi saxla
                                        <BookMark />
                                    </Button>
                                    <Button
                                        disabled={isDirty}
                                        onClick={() => setFormStatus("approve")}
                                        className="rounded-[10px] bg-gray-800 text-white w-full"
                                    >
                                        Təsdiqlə
                                        <Check />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    disabled={uploadLoading}
                                    onClick={() => setFormStatus("draft")}
                                    className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
                                >
                                    Qaralama kimi saxla
                                    <BookMark />
                                </Button>
                            )}
                        </Form>
                    </div>
                    <div
                        className={`fixed transition-all duration-700 ease-in-out ${isFixed ? "right-[4%] top-1" : "top-[27%] right-[4%]"
                            }`}
                    >
                        {/* Stepper Container */}
                        <div
                            className={
                                "bg-white p-6 rounded-lg shadow-lg w-80 h-fit flex flex-col gap-y-7"
                            }
                        >
                            {stepper.map((item) => (
                                <div key={item.id} className="flex items-center relative">
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full relative after:top-[86%] after:right-[44%] after:content-[''] ${item.completed
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {item.completed ? <CheckSVG /> : <span>{item.id}</span>}
                                    </div>
                                    <span className="ml-3 text-gray-900">{item.title}</span>
                                    {item.id < stepper.length && (
                                        <div className="absolute border-l-2 border-gray-300 left-4 top-9 h-5"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Info Box */}
                        <div
                            className={`bg-white p-6 rounded-lg shadow-lg w-80 h-fit flex flex-col gap-y-7 mt-5`}
                        >
                            <div>
                                <h6 className="flex gap-x-2">
                                    <İnfoCircle />
                                    Məlumatlandırma
                                </h6>
                                <div className="flex flex-col gap-y-1 pt-2">
                                    {areas?.map((item) => (
                                        <p
                                            key={item.id}
                                            className="text-14px400"
                                        >{`${item.name} - ${item.description}`}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreatePassport
