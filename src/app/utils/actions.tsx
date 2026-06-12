import DetailedView from "@svg/detailed_view.svg?react";
import İnfoCircle from "@svg/info-circle.svg?react";
import Delete from "@svg/u_minus-circle.svg?react"

const privileges = [
  {
    id: 1,
    value: "Ətraflı baxış",
    name: "View",
    icon: <İnfoCircle />,
    border: "",
    bg: "",
    textColor: "",
  },
  {
    id: 2,
    name: "Edit",
    icon: <DetailedView />,
    value: "Düzəliş et",
    border: "border-blue-600",
    bg: "bg-blue-600",
    textColor: "text-white",
  },
  {
    id: 3,
    name: "",
    icon: <Delete />,
    value: "Sil",
    border: "border-gray-300",
    bg: "bg-white",
    textColor: "text-gray-800",
  }
];
export type TDefaultAction = {
  id: number;
  name: string;
};
export type TResultAction = {
  id: number;
  name: string;
  icon?: any;
  value?: string;
  border?: string;
  bg?: string;
  textColor?: string;
};
export const handlePrivigeles = (
  actions: TDefaultAction[],
) => {
  let newActions: TResultAction[] = [...actions];
  let commonElements = privileges.filter((privilege) => {
    return newActions.some((action) => action.id === privilege.id);
  });
  return commonElements;
};
