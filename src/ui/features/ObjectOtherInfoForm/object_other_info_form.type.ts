import { PassportModel } from "@/data/model/passport.model";
import { HandleChangeFieldType } from "@/ui/containers/CreatePassport/create_passport.type";
import { UseFormReturn } from "react-hook-form";

export type ObjectOtherInfoFormProps = {
    handleChangeField: HandleChangeFieldType;
    methods: UseFormReturn<PassportModel>;
};
