import Input from "@/ui/shared/Input";
import ObjectOtherInfoFormVM from "./object_other_info_form.vm";
import { Controller } from "react-hook-form";
import Radio from "@/ui/shared/Radio";
import { ObjectOtherInfoFormProps } from "./object_other_info_form.type";

const ObjectOtherInfoForm = ({ handleChangeField, methods }: ObjectOtherInfoFormProps) => {
    const { saleTransactionTypes } = ObjectOtherInfoFormVM()
    return (
        <>
            <div>
                <h6 className="text-16px500 pb-3">Digər məlumatlar</h6>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        name="objectCode"
                        label="Obyektin kodu"
                        min="0"
                        step="any"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "objectCode", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="numberOfFloors"
                        label="Mərtəbə sayı"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "numberOfFloors", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="totalLandArea"
                        min="0"
                        step="any"
                        label="Ümumi torpaq sahəsi (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "totalLandArea", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="totalLandAreaForDocument"
                        min="0"
                        step="any"
                        label="O cümlədən sənəd üzrə (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "totalLandAreaForDocument",
                                "otherInfo"
                            )
                        }
                    />
                    <Input
                        type="number"
                        name="totalBuildingArea"
                        min="0"
                        step="any"
                        label="Tikilinin ümumi sahəsi (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "totalBuildingArea", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="totalBuildingAreaForDocument"
                        min="0"
                        step="any"
                        label="O cümlədən sənəd üzrə (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "totalBuildingAreaForDocument",
                                "otherInfo"
                            )
                        }
                    />
                </div>
                <div className="flex gap-x-2 pt-3">
                    <Input
                        type="number"
                        name="residentialArea"
                        min="0"
                        step="any"
                        label="Yaşayış sahəsi (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "residentialArea", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="nonRresidentialArea"
                        min="0"
                        step="any"
                        label="Qeyri-yaşayış sahəsi (kv. m)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "nonRresidentialArea", "otherInfo")
                        }
                    />
                    <Input
                        type="number"
                        name="numberOfRooms"
                        label="Otaq sayı"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(v, "numberOfRooms", "otherInfo")
                        }
                    />
                </div>
            </div>
            <div>
                <h6 className="text-16px500 pb-3">
                    Torpaq sahəsinin ehtimal olunan satış qiyməti{" "}
                </h6>
                <div className="flex gap-x-3">
                    <Input
                        type="number"
                        name="sellingPriceOfLand1KVM"
                        min="0"
                        step="any"
                        label="1 kv. m (AZN)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "sellingPriceOfLand1KVM",
                                "otherInfo"
                            )
                        }
                    />
                    <Input
                        type="number"
                        name="sellingTotalPriceOfLand"
                        min="0"
                        step="any"
                        label="Ümumi (AZN)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "sellingTotalPriceOfLand",
                                "otherInfo"
                            )
                        }
                    />
                </div>
            </div>
            <div>
                <h6 className="text-16px500 pb-3">
                    Tikinti sahəsinin ehtimal olunan satış qiyməti
                </h6>
                <div className="flex gap-x-3">
                    <Input
                        type="number"
                        name="sellingPriceOfBuilding1KVM"
                        min="0"
                        step="any"
                        label="1 kv. m (AZN)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "sellingPriceOfBuilding1KVM",
                                "otherInfo"
                            )
                        }
                    />
                    <Input
                        type="number"
                        name="sellingTotalPriceOfBuilding"
                        min="0"
                        step="any"
                        label="Ümumi (AZN)"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "sellingTotalPriceOfBuilding",
                                "otherInfo"
                            )
                        }
                    />
                </div>
                <Input
                    type="number"
                    name="sellingTotalPriceOfObject"
                    min="0"
                    step="any"
                    label=" Obyektin ehtimal olunan ümumi satış qiyməti (AZN)"
                    inputLabelclassName="h-14"
                    className="py-3"
                    onChange={(v) =>
                        handleChangeField(
                            v,
                            "sellingTotalPriceOfObject",
                            "otherInfo"
                        )
                    }
                />
                <div className="flex gap-x-3">
                    <Input
                        type="number"
                        name="numberOfResidentsInTheResidentialFacility"
                        label="Yaşayış obyektində sakinlərin sayı"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "numberOfResidentsInTheResidentialFacility",
                                "otherInfo"
                            )
                        }
                    />
                    <Input
                        type="number"
                        name="numberOfActualRegisteredResidents"
                        label=" Faktiki qeydiyyatda olan sakinlərin sayı"
                        inputLabelclassName="h-14"
                        onChange={(v) =>
                            handleChangeField(
                                v,
                                "numberOfActualRegisteredResidents",
                                "otherInfo"
                            )
                        }
                    />
                </div>
            </div>
            <div>
                <h6 className="text-16px500">Alqı-satqı protokolu</h6>
                <Controller
                    control={methods.control}
                    name="PurchaseAndSaleProtocol"
                    render={({ field: { value, onChange } }) => {
                        return (
                            <Radio
                                dataError="PurchaseAndSaleProtocol"
                                data={saleTransactionTypes || []}
                                error={methods.formState.errors.PurchaseAndSaleProtocol}
                                value={value}
                                option={(val) => (
                                    <Radio.Option
                                        Icon={null}
                                        data={val}
                                        radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67]`}
                                    />
                                )}
                                onChange={(obj) => {
                                    onChange(obj.id);
                                    handleChangeField(
                                        obj.id as unknown as string,
                                        "PurchaseAndSaleProtocol",
                                        "otherInfo"
                                    );
                                }}
                            />
                        );
                    }}
                />
            </div>
        </>
    )
}

export default ObjectOtherInfoForm
