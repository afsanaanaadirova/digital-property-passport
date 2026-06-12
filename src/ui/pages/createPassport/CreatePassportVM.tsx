import { useFieldArray, useForm } from "react-hook-form";
import {
  useAreas,
  useBuildingOwnershipTypes,
  useBuildingPropertyTypes,
  useCulturalMonuments,
  useDestinations,
  useLandOwnershipTypes,
  useLandPropertyshipTypes,
  useOwnerTypes,
  useSaleTransactionTypes,
} from "@/app/api/dropdowns.api";
import {
  useConfirmPassport,
  useCreatePassport,
  useGetPassportById,
  usePassportFileTypes,
  useUpdatePassport,
} from "@/app/api/passport.api";
import { PassportModel } from "@/data/model/passport.model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { passportSchema } from "@/data/schemas/formValidations/passport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const CreatePassportVM = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [ownerType, setOwnerType] = useState<number>();
  const [formStatus, setFormStatus] = useState<"draft" | "approve">("draft");
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [ownerDeleteIds, setOwnerDeleteIds] = useState<string[]>([]);
  const [objectArea, setObjectArea] = useState<number>();
  const [uploadLoading, setUploadLoading] = useState(false);

  const { data: destinations, isLoading: destinationsLoading } = useDestinations();
  const { data: saleTransactionTypes, isLoading: saleTransactionTypesLoading } = useSaleTransactionTypes();
  const { data: areas, isLoading: areasLoading } = useAreas();
  const { data: ownerTypes, isLoading: ownerTypesLoading } = useOwnerTypes();
  const { data: buildingPropertyTypes, isLoading: buildingPropertyTypesLoading } = useBuildingPropertyTypes();
  const { data: buildingOwnershipTypes, isLoading: buildingOwnershipTypesLoading } = useBuildingOwnershipTypes();
  const { data: landPropertyshipTypes, isLoading: landPropertyshipTypesLoading } = useLandPropertyshipTypes();
  const { data: landOwnershipTypes, isLoading: landOwnershipTypesLoading } = useLandOwnershipTypes();
  const { data: culturalMonuments, isLoading: culturalMonumentsLoading } = useCulturalMonuments();
  const [confirmPassportId, setConfirmPassportId] = useState<number | null | undefined>(null);
  const { data: passportFileTypes, isLoading: passportFileTypesLoading } = usePassportFileTypes();
  const { data: passportByid, isLoading: passportLoading } = useGetPassportById(Number(params.id));
  const createPassport = useCreatePassport();
  const updatePassport = useUpdatePassport();
  const confirmPassport = useConfirmPassport();
  const [cultural, setCultural] = useState<number>();

  const locationObj = {
    lat: 50.222,
    lng: 50.222,
  };
  const culturalMonumentsRadio = {
    "culturalMonuments": [
      {
        "id": 1,
        "name": "Bəli"
      },
      {
        "id": 0,
        "name": "Xeyr"
      }
    ]
  }
  const initialPersonTypes = [
    {
      id: 1,
      ownerTypeId: 1,
      contactNumber: "",
      tin: "",
      companyName: "",
      pin: "",
      fullname: "",
    },
  ];

  const methods = useForm<PassportModel>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      personTypes: passportByid?.personTypes || initialPersonTypes,
    },
    //@ts-ignore
    values: params.id
      ? {
        ...passportByid,
        passportFiles: passportFileTypes?.map((type: any) => {
          const existingData = passportByid?.passportFiles?.find(
            (p) => p.id === type.id
          );
          return existingData && existingData.files?.length
            ? existingData
            : { ...type, files: [] };
        }),
      }
      : {
        passportFiles: passportFileTypes,
      },
  });


  const { fields: passportFiles, replace: replace } = useFieldArray({
    name: "passportFiles",
    control: methods.control,
  });

  useEffect(() => {
    if (!passportFileTypesLoading && passportFileTypes) {
      const updatedPassportFiles = params.id
        ? passportFileTypes.map((type: any) => {
          const existingData = passportByid?.passportFiles?.find(
            (p) => p.id === type.id
          );
          return existingData && existingData.files?.length
            ? existingData
            : { ...type, files: [] };
        })
        : passportFileTypes;

      replace(updatedPassportFiles);
    }
  }, [replace]);

  const {
    fields: personTypes,
    append: appendInput,
    remove: removeInput,
  } = useFieldArray({
    name: "personTypes",
    control: methods.control,
    keyName: "_id",
  });

  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    params?.id && setFormStatus("draft");
  }, []);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const onSubmit = methods.handleSubmit(
    (data: PassportModel) => {
      if (formStatus === "draft" || isDirty) {
        if (params?.id) {
          const payload = {
            ...data,
            deleteIds: deleteIds,
            ownerDeleteIds: ownerDeleteIds,
            id: Number(params.id),
            existingTokens: passportByid?.passportFiles,
          };
          updatePassport.mutate(payload, {
            onSuccess() {
              setFormStatus("approve");
              setIsDirty(false);
              setDeleteIds([])
            },
            onError(error: any) {
              if (error.response.status === 400) {
                snackbar(SnackbarStatusEnum.ERROR, error.response.data.Detail);
              }
            },
          });
          setUploadSuccess(true);
        } else {
          createPassport.mutate(data, {
            onSuccess: (data: any) => {
              setConfirmPassportId(data?.id);
              setFormStatus("approve");
              setIsDirty(false);
              navigate(`/passports/${data?.id}/update`);
            },
            onError(error: any) {
              setIsDirty(true);
              if (error.response.status === 400) {
                snackbar(SnackbarStatusEnum.ERROR, error.response.data.Detail);
              }
            },
          });
        }
      } else {
        const payload = {
          passpostId: params.id ? Number(params.id) : confirmPassportId,
        };
        //@ts-ignore
        confirmPassport.mutate(payload, {
          onSuccess() {
            navigate("/passports");
          },
          onError(error: any) {
            if (error.response.status === 400) {
              snackbar(SnackbarStatusEnum.ERROR, error.response.data.Detail);
            }
          },
        });
      }
    },
    (error) => {
      console.log("error", error);
      setIsDirty(true);
    }
  );
  const [stepperValidation, setStepperValidation] = useState({
    buildingLocationInfo: {
      passportNumber: null,
      objectLocation: null,
      objectArea: null,
      objectDesignation: null,
      landProperty: null,
      buildingProperty: null,
      landPropertyOfLawType: null,
      buildingPropertyOfLawType: null,
    },
    buildingOwnerInfo: {
      personTypes: null,
    },
    otherInfo: {
      // objectCode: null,
      numberOfFloors: null,
      totalLandArea: null,
      totalLandAreaForDocument: null,
      totalBuildingArea: null,
      totalBuildingAreaForDocument: null,
      residentialArea: null,
      // nonRresidentialArea: null,
      // numberOfRooms: null,
      sellingPriceOfLand1KVM: null,
      sellingTotalPriceOfLand: null,
      sellingPriceOfBuilding1KVM: null,
      sellingTotalPriceOfBuilding: null,
      sellingTotalPriceOfObject: null,
      numberOfResidentsInTheResidentialFacility: null,
      numberOfActualRegisteredResidents: null,
      PurchaseAndSaleProtocol: null,
    },
    attachments: {
      location: null,
    },
    approveInfo: {
      signatureOfPropertyAffairsStateService: null,
      representativeOfDSHAK: null,
      representativeOfTheLocalExecutiveAuthority: null,
      passportIssueDate: null,
    },
  });

  const stepper = [
    {
      id: 1,
      title: "Obyektin məkan məlumatları",
      completed: Object.values(stepperValidation.buildingLocationInfo).every(
        (d) => d
      ),
    },
    {
      id: 2,
      title: "Obyekt sahibi məlumatları",
      completed: Object.values(stepperValidation.buildingOwnerInfo).every(
        (d) => d
      ),
    },
    {
      id: 3,
      title: "Digər məlumatlar",
      completed: Object.values(stepperValidation.otherInfo).every((d) => d),
    },
    {
      id: 4,
      title: "Qoşmalar",
      completed: Object.values(stepperValidation.buildingOwnerInfo).some((d) => d),
    },
    {
      id: 5,
      title: "Məlumatların təsdiqi",
      completed: Object.values(stepperValidation.approveInfo).every((d) => d),
    },
  ];

  const handleValidationErrors = (errors: string[]) => {
    setStepperValidation((prevState) => {
      const updatedValidation: any = { ...prevState };

      const setNullForKey = (obj: any, key: any) => {
        if (obj.hasOwnProperty(key)) {
          obj[key] = null;
        }
      };

      errors.forEach((errorKey) => {
        Object.keys(updatedValidation).forEach((sectionKey) => {
          setNullForKey(updatedValidation[sectionKey], errorKey);
        });
      });

      return updatedValidation;
    });
  };

  const handleChangeField = async (
    v: any,
    name: string,
    stepperKey: string
  ) => {
    setIsDirty(true);
    if (methods.formState.submitCount > 0) {
      await methods.trigger(name as any);
    }

    setStepperValidation((prevState) => {
      return {
        ...prevState,
        [stepperKey]: !name.includes("personTypes")
          ? {
            ...prevState[stepperKey as keyof typeof prevState],
            [name]: handleError(name) ? null : v,
          }
          : {
            ...prevState[stepperKey as keyof typeof prevState],
            personTypes: (prevState.buildingOwnerInfo.personTypes || []).map((person, index) => {
              if (index === 0) {
                return {
                  [name]: handleError(name) ? null : person,
                };
              } else {
                return {
                  [name]: handleError(name) ? null : v,
                };
              }
            }),
          },
      };
    });

  };


  const handleError = (name: string) => {
    return Object.keys(methods.formState.errors).includes(name);
  };

  useEffect(() => {
    if (Object.keys(methods.formState.errors).length) {
      handleValidationErrors(Object.keys(methods.formState.errors));
    }
  }, [Object.keys(methods.formState.errors).length]);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [existingFileNames, setExistingFileNames] = useState([]);
  const updateFileNames = (newFileName: string, isDeleting: boolean) => {
    setExistingFileNames((prevFileNames: any) => {
      const updatedFileNames = isDeleting
        ? prevFileNames.filter((name: any) => name !== newFileName)
        : prevFileNames.includes(newFileName)
          ? prevFileNames
          : [...prevFileNames, newFileName];

      return updatedFileNames;
    });
  };

  return {
    onSubmit,
    methods,
    destinations,
    areas,
    saleTransactionTypes,
    ownerTypes,
    buildingPropertyTypes,
    buildingOwnershipTypes,
    landPropertyshipTypes,
    landOwnershipTypes,
    passportLoading,
    destinationsLoading,
    saleTransactionTypesLoading,
    areasLoading,
    ownerTypesLoading,
    buildingPropertyTypesLoading,
    buildingOwnershipTypesLoading,
    landPropertyshipTypesLoading,
    landOwnershipTypesLoading,
    navigate,
    confirmPassport,
    updatePassport,
    createPassport,
    culturalMonuments,
    stepper,
    ownerType,
    setOwnerType,
    passportFiles,
    locationObj,
    passportFileTypesLoading,
    passportFileTypes,
    uploadSuccess,
    setDeleteIds,
    cultural,
    setCultural,
    formStatus,
    setFormStatus,
    handleChangeField,
    isDirty,
    params,
    personTypes,
    removeInput,
    appendInput,
    objectArea,
    setObjectArea,
    // setSchemaByPersonType,
    isFixed,
    existingFileNames,
    updateFileNames,
    setOwnerDeleteIds,
    passportByid,
    uploadLoading,
    setUploadLoading,
    culturalMonumentsLoading,
    culturalMonumentsRadio
  };
};
