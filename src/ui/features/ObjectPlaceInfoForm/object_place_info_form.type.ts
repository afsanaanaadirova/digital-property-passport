import { AreaModel } from "@/data/model/area.model";
import { PassportModel } from "@/data/model/passport.model";
import { BaseType } from "@/data/types/base.type";
import { HandleChangeFieldType } from "@/ui/containers/CreatePassport/create_passport.type";
import { UseFormReturn } from "react-hook-form";

export type ObjectPlaceInfoFormProps = {
    handleChangeField: HandleChangeFieldType;
    methods: UseFormReturn<PassportModel>;
    areas: AreaModel[] | undefined
    destinations: BaseType[] | undefined
    buildingOwnershipTypes: BaseType[] | undefined
    landOwnershipTypes: BaseType[] | undefined
    landPropertyshipTypes: BaseType[] | undefined
    buildingPropertyTypes: BaseType[] | undefined
    culturalMonuments: BaseType[] | undefined
    passportByid: PassportModel | undefined
};
