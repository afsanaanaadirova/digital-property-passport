import { Controller } from "react-hook-form";
import Textarea from "@/ui/shared/Textarea";
import Input from "@/ui/shared/Input";
import Datepicker from "@/ui/shared/Datepicker";
import { ObjectDataConfirmationFormProps } from "./object_data_confirmation_form.type";

const ObjectDataConfirmationForm = ({ methods, handleChangeField }: ObjectDataConfirmationFormProps) => {
    return (
        <div>
            <div>
                <h6 className="text-16px500 pb-3">Əlavə Qeyd</h6>
                <Controller
                    control={methods.control}
                    name="note"
                    render={({ field: { value, onChange } }) => {
                        return (
                            <Textarea
                                placeholder="Qeyd əlavə et"
                                className="h-[120px] pt-2 w-full"
                                value={value}
                                error={methods.formState.errors.note}
                                onChange={(val) => (
                                    onChange(val)
                                )}
                                name="note"
                            />
                        );
                    }}
                />
            </div>              <div className="flex flex-col gap-y-3">
                <h5 className="text-18px700 text-gray-800">
                    İmzalayan şəxslər
                </h5>
                <Input
                    name="signatureOfPropertyAffairsStateService"
                    label="Əmlak Məsələləri Dövlət Xidməti nümayəndəsi"
                    inputLabelclassName="h-14"
                    onChange={(v) =>
                        handleChangeField(
                            v,
                            "signatureOfPropertyAffairsStateService",
                            "approveInfo"
                        )
                    }
                />
                <Input
                    name="representativeOfDSHAK"
                    label="DŞAK nümayəndəsi"
                    inputLabelclassName="h-14"
                    onChange={(v) =>
                        handleChangeField(v, "representativeOfDSHAK", "approveInfo")
                    }
                />
                <Input
                    name="representativeOfTheLocalExecutiveAuthority"
                    label="Yerli İcra Hakimiyyəti orqanı nümayəndəsi"
                    inputLabelclassName="h-14"
                    onChange={(v) =>
                        handleChangeField(
                            v,
                            "representativeOfTheLocalExecutiveAuthority",
                            "approveInfo"
                        )
                    }
                />
                <Input
                    name="ministryOfCultureRepresentative"
                    label="Mədəniyyət Nazirliyinin nümayəndəsi"
                    inputLabelclassName="h-14"
                    onChange={(v) =>
                        handleChangeField(
                            v,
                            "ministryOfCultureRepresentative",
                            "approveInfo"
                        )
                    }
                />
            </div>
            <div className="flex flex-col gap-y-3">
                <h5 className="text-18px700 text-gray-800">
                    Pasportun tərtib edilmə tarixi
                </h5>
                <Controller
                    control={methods.control}
                    name="passportIssueDate"
                    render={({ field: { value, onChange } }) => {
                        return (
                            <Datepicker
                                disablePast
                                value={value ?? null}
                                error={methods.formState.errors.passportIssueDate}
                                onChange={(val) => {
                                    if (val) {
                                        handleChangeField(
                                            val,
                                            "passportIssueDate",
                                            "approveInfo"
                                        );
                                        onChange(new Date(val));
                                    } else {
                                        onChange(null);
                                    }
                                }}
                                title="Başlama tarixi"
                            />
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default ObjectDataConfirmationForm
