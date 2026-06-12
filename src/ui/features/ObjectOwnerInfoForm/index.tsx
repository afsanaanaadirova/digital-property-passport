import Radio from "@/ui/shared/Radio";
import { Controller } from "react-hook-form";
import Input from "@/ui/shared/Input";
import Plus from "@svg/addFilePlus.svg?react";
import Remove from "@svg/deleteIcon.svg?react";
import ObjectOwnerInfoFormVM from "./object_owner_info_form.vm";
import { ObjectOwnerInfoFormProps } from "./object_owner_info_form.type";


const ObjectOwnerInfoForm = ({ handleChangeField, methods,ownerTypes }: ObjectOwnerInfoFormProps) => {
    const {
        personTypes,
        ownerType,
        setOwnerType,
        setOwnerDeleteIds,
        removeInput,
        appendInput,
        params,
    } = ObjectOwnerInfoFormVM({ methods });

    return (
        <div>
            <h6 className="text-16px500">Obyekt sahibi məlumatları</h6>
            <div className="flex gap-y-4 flex-col">
                {personTypes &&
                    personTypes.map((person, index) => (
                        <div
                            id={person.id}
                            key={`${person.id}-${index}`}
                            className="flex flex-col gap-y-3"
                        >
                            <div className="flex items-end">
                                <Controller
                                    control={methods.control}
                                    name={`personTypes.${index}.ownerTypeId`}
                                    defaultValue={person.value || 1}
                                    render={({ field: { value, onChange } }) => (
                                        <Radio
                                            dataError={`personTypes.${index}.ownerTypeId`}
                                            error={
                                                methods.formState.errors?.personTypes?.[index]?.personType
                                            }
                                            data={ownerTypes || []}
                                            value={+value}
                                            defaultValue={1}
                                            option={(val) => (
                                                <Radio.Option
                                                    Icon={null}
                                                    data={val}
                                                    radioOptionClasses="md:w-1/2 w-full focus-within:border-[#D2AB67]"
                                                />
                                            )}
                                            onChange={(obj) => {
                                                const selectedId = obj.id;

                                                setOwnerType((prev) => ({
                                                    ...prev,
                                                    [index]: selectedId,
                                                }));

                                                methods.setValue(
                                                    `personTypes.${index}.tin`,
                                                    ""
                                                );
                                                methods.setValue(
                                                    `personTypes.${index}.companyName`,
                                                    ""
                                                );
                                                methods.setValue(
                                                    `personTypes.${index}.pin`,
                                                    ""
                                                );
                                                methods.setValue(
                                                    `personTypes.${index}.fullname`,
                                                    ""
                                                );
                                                methods.setValue(
                                                    `personTypes.${index}.contactNumber`,
                                                    ""
                                                );
                                                onChange(selectedId);
                                                handleChangeField(
                                                    selectedId,
                                                    `personTypes`,
                                                    "buildingOwnerInfo"
                                                );
                                            }}
                                        />
                                    )}
                                />
                                {
                                    personTypes.length >= 2 && index >= 1 && params.id ? <div className="flex">
                                        <button
                                            type="button"
                                            className={`p-4 border-red-600 ${index === personTypes.length - 1
                                                ? `border-gray-800`
                                                : `border-red-600`
                                                } border rounded-[10px] w-14 h-14 ml-3`}
                                            onClick={() => {
                                                removeInput(index);
                                                setOwnerDeleteIds((prev: any) => [...prev, person.id]);
                                            }}
                                        >
                                            {

                                                <Remove />
                                            }
                                        </button>
                                        <button
                                            type="button"
                                            className={`p-4 border-gray-800 ${index === personTypes.length - 1
                                                ? `border-gray-800`
                                                : `border-red-600`
                                                } border rounded-[10px] w-14 h-14 ml-3`}
                                            onClick={() => {
                                                appendInput({
                                                    id: 1, 
                                                    ownerTypeId: 1,
                                                    ownerTypeName: '',
                                                    contactNumber: '', 
                                                    tin: '', 
                                                    companyName: '', 
                                                    pin: '', 
                                                    fullname: '', 
                                                });
                                            }}
                                        >
                                            {

                                                <Plus />
                                            }
                                        </button>
                                    </div> :
                                        <button
                                            type="button"
                                            className={`p-4 border-gray-800 ${index === personTypes.length - 1
                                                ? `border-gray-800`
                                                : `border-red-600`
                                                } border rounded-[10px] w-14 h-14 ml-3`}
                                            onClick={() => {
                                                if (index === personTypes.length - 1) {
                                                    appendInput({
                                                        id: 1, 
                                                        ownerTypeId: 1,
                                                        ownerTypeName: '',
                                                        contactNumber: '', 
                                                        tin: '', 
                                                        companyName: '', 
                                                        pin: '', 
                                                        fullname: '', 
                                                    });
                                                } else {
                                                    removeInput(index);
                                                    setOwnerDeleteIds((prev: any) => [...prev, person.id]);
                                                }
                                            }}
                                        >
                                            {
                                                index === personTypes.length - 1 ? (
                                                    <>
                                                        <Plus />
                                                    </>
                                                ) : (
                                                    <Remove />
                                                )
                                            }
                                        </button>
                                }

                            </div>

                            {
                                ownerType?.[index] == 2 ||
                                    personTypes[index].ownerTypeId === 2 ? (
                                    <>
                                        <Input
                                            name={`personTypes.${index}.tin`}
                                            label="VÖEN"
                                            inputLabelclassName="h-14"
                                            onChange={(v) =>
                                                handleChangeField(
                                                    v,
                                                    `personTypes.${index}.tin`,
                                                    "buildingOwnerInfo"
                                                )
                                            }
                                        />
                                        <Input
                                            name={`personTypes.${index}.companyName`}
                                            label="Şirkətin adı"
                                            inputLabelclassName="h-14"
                                            onChange={(v) =>
                                                handleChangeField(
                                                    v,
                                                    `personTypes.${index}.companyName`,
                                                    "buildingOwnerInfo"
                                                )
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            name={`personTypes.${index}.pin`}
                                            label="FİN"
                                            inputLabelclassName="h-14"
                                            onChange={(v) =>
                                                handleChangeField(
                                                    v,
                                                    `personTypes.${index}.pin`,
                                                    "buildingOwnerInfo"
                                                )
                                            }
                                        />
                                        <Input
                                            name={`personTypes.${index}.fullname`}
                                            label="Ad, Soyad, Ata adı"
                                            inputLabelclassName="h-14"
                                            onChange={(v) =>
                                                handleChangeField(
                                                    v,
                                                    `personTypes.${index}.fullname`,
                                                    "buildingOwnerInfo"
                                                )
                                            }
                                        />
                                    </>
                                )
                            }

                            <Input
                                inputLabelclassName="gap-x-2 h-14"
                                labelClassName="top-2.5 peer-focus:top-2.5 peer-focus:scale-75"
                                inputClassName="pt-0"
                                name={`personTypes.${index}.contactNumber`}
                                label="Əlaqə nömrəsi"
                                leading="+994"
                                maxLength={9}
                                onChange={(v) =>
                                    handleChangeField(
                                        v,
                                        `personTypes.${index}.contactNumber`,
                                        "buildingOwnerInfo"
                                    )
                                }
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ObjectOwnerInfoForm
