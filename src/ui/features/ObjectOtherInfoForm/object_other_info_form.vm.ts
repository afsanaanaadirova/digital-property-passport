import { useSaleTransactionTypes } from "@/app/api/dropdowns.api";

const ObjectOtherInfoFormVM = () => {
  const { data: saleTransactionTypes } = useSaleTransactionTypes();

  return { saleTransactionTypes }
}

export default ObjectOtherInfoFormVM
