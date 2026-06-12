import { PassportModel } from "@/data/model/passport.model";
import { BaseType } from "@/data/types/base.type";
import { HandleChangeFieldType } from "@/ui/containers/CreatePassport/create_passport.type";
import { UseFormReturn } from "react-hook-form";

export type ObjectOwnerInfoFormProps = {
    handleChangeField: HandleChangeFieldType;
    methods: UseFormReturn<PassportModel>;
    ownerTypes: BaseType[] | undefined
};
