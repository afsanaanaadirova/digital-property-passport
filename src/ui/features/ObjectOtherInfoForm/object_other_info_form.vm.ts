import { useSaleTransactionTypes } from "@/app/api/dropdowns.api";

const ObjectOtherInfoFormVM = () => {
  const { data: saleTransactionTypes, isLoading: saleTransactionTypesLoading } = useSaleTransactionTypes();

  return { saleTransactionTypes }
}

export default ObjectOtherInfoFormVM
