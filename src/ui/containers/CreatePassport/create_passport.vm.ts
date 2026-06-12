import {
  useAreas,
  useBuildingOwnershipTypes,
  useBuildingPropertyTypes,
  useCulturalMonuments,
  useDestinations,
  useLandOwnershipTypes,
  useLandPropertyshipTypes,
  useOwnerTypes,
} from "@/app/api/dropdowns.api";

import { useCreatePassport, useGetPassportById, usePassportFileTypes, useUpdatePassport } from "@/app/api/passport.api";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";
import { PassportModel } from "@/data/model/passport.model";
import { passportSchema } from "@/data/schemas/formValidations/passport.schema";
import { snackbar } from "@/ui/shared/Snackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const CreatePassportVM = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: areas, isLoading: areasLoading } = useAreas();
  const { data: destinations, isLoading: destinationsLoading } = useDestinations();
  const { data: ownerTypes, isLoading: ownerTypesLoading } = useOwnerTypes();
  const { data: buildingPropertyTypes, isLoading: buildingPropertyTypesLoading } = useBuildingPropertyTypes();
  const { data: buildingOwnershipTypes, isLoading: buildingOwnershipTypesLoading } = useBuildingOwnershipTypes();
  const { data: landPropertyshipTypes, isLoading: landPropertyshipTypesLoading } = useLandPropertyshipTypes();
  const { data: landOwnershipTypes, isLoading: landOwnershipTypesLoading } = useLandOwnershipTypes();
  const { data: culturalMonuments, isLoading: culturalMonumentsLoading } = useCulturalMonuments();
  const [confirmPassportId, setConfirmPassportId] = useState<number | null | undefined>(null);
  const { data: passportFileTypes, isLoading: passportFileTypesLoading } = usePassportFileTypes();
  const { data: passportByid, isLoading: passportLoading } = useGetPassportById(Number(params.id));

  const updatePassport = useUpdatePassport();
  const createPassport = useCreatePassport();

  const [formStatus, setFormStatus] = useState<"draft" | "approve">("draft");
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [ownerDeleteIds, setOwnerDeleteIds] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

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

  //fixed div start
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
  // fixed div end

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
  const handleError = (name: string) => {
    return Object.keys(methods.formState.errors).includes(name);
  };
  const handleChangeField = async (
    v: string | number,
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
  return {
    ownerTypes,
    areas,
    destinations,
    buildingPropertyTypes,
    buildingOwnershipTypes,
    landOwnershipTypes,
    culturalMonuments,
    landPropertyshipTypes,
    passportByid,
    passportLoading,
    areasLoading,
    ownerTypesLoading,
    destinationsLoading,
    buildingPropertyTypesLoading,
    buildingOwnershipTypesLoading,
    landPropertyshipTypesLoading,
    landOwnershipTypesLoading,
    passportFileTypesLoading,
    culturalMonumentsLoading,
    params, methods, onSubmit,
    stepper,
    uploadLoading, updatePassport, isFixed,
    setFormStatus, isDirty, handleChangeField
  }
}

export default CreatePassportVM
