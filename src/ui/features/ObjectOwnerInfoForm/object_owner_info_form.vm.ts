import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ObjectOwnerInfoFormProps } from "./object_owner_info_form.type";

const ObjectOwnerInfoFormVM = ({ methods }: Pick<ObjectOwnerInfoFormProps, "methods">) => {
  const params = useParams();
  const [ownerDeleteIds, setOwnerDeleteIds] = useState<string[]>([]);
  const [ownerType, setOwnerType] = useState<number[]>([]);

  const {
    fields: personTypes,
    append: appendInput,
    remove: removeInput,
  } = useFieldArray({
    name: "personTypes",
    control: methods.control,
  });

  return {
    personTypes,
    ownerType,
    setOwnerType,
    setOwnerDeleteIds,
    ownerDeleteIds,
    removeInput,
    appendInput,
    params
  };

}

export default ObjectOwnerInfoFormVM
