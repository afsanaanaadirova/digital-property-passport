import { ReactElement } from "react";
import { SelectDataType } from "./select.type";
import { SelectOptionVariantEnum } from "./select.enum";
import SelectOptionBase from "./SelectOptionBase";
import SelectOptionWithIcon from "./SelectOptionWithIcon";

type SelectOptionFactoryType = <T extends SelectDataType>({
  data,
  variant,
}: {
  data: T;
  variant: SelectOptionVariantEnum;
}) => ReactElement;

const SelectOptionFactory: SelectOptionFactoryType = ({ data, variant }) => {
  switch (variant) {
    case SelectOptionVariantEnum.BASE:
      return <SelectOptionBase data={data} />;
    case SelectOptionVariantEnum.WITH_ICON:
      return <SelectOptionWithIcon data={data} />;
    default:
      throw new Error("Invalid option variant");
  }
};

export default SelectOptionFactory;
