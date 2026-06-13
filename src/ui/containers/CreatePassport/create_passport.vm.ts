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
import { emptyPassportForm, PassportFormModel, UpdatePassportRequest } from "@/data/model/passport.model";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { passportSchema } from "@/data/schemas/formValidations/passport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const CreatePassportVM = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [ownerType, setOwnerType] = useState<Record<number, number>>({});
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

  const methods = useForm<PassportFormModel>({
    resolver: zodResolver(passportSchema),

    defaultValues: emptyPassportForm,

    values: params.id && passportByid
      ? {
        passpostId: passportByid.passpostId ?? 0,
        id: passportByid.id ?? 0,

        createdBy: passportByid.createdBy ?? "",
        createDate: passportByid.createDate ?? "",
        passportIssueInfo: passportByid.passportIssueInfo ?? "",

        passportIssueDate: passportByid.passportIssueDate ?? null,

        passportNumber: passportByid.passportNumber ?? "",
        objectLocation: passportByid.objectLocation ?? "",

        objectArea: (typeof passportByid.objectArea === "number" ? passportByid.objectArea : (passportByid.objectArea as any)?.id ?? 0),
        objectDesignation: passportByid.objectDesignation ?? 0,

        landProperty: passportByid.landProperty ?? null,
        buildingProperty: passportByid.buildingProperty ?? null,

        landPropertyOfLawType: passportByid.landPropertyOfLawType ?? null,
        buildingPropertyOfLawType: passportByid.buildingPropertyOfLawType ?? null,

        objectCode: passportByid.objectCode ?? "",

        numberOfFloors: passportByid.numberOfFloors ?? null,
        totalLandArea: passportByid.totalLandArea ?? null,
        totalBuildingArea: passportByid.totalBuildingArea ?? null,

        residentialArea: passportByid.residentialArea ?? null,
        nonRresidentialArea: passportByid.nonRresidentialArea ?? null,
        numberOfRooms: passportByid.numberOfRooms ?? null,

        sellingPriceOfLand1KVM: passportByid.sellingPriceOfLand1KVM ?? null,
        sellingTotalPriceOfLand: passportByid.sellingTotalPriceOfLand ?? null,
        sellingPriceOfBuilding1KVM: passportByid.sellingPriceOfBuilding1KVM ?? null,
        sellingTotalPriceOfBuilding: passportByid.sellingTotalPriceOfBuilding ?? null,
        sellingTotalPriceOfObject: passportByid.sellingTotalPriceOfObject ?? null,

        numberOfResidentsInTheResidentialFacility:
          passportByid.numberOfResidentsInTheResidentialFacility ?? null,

        numberOfActualRegisteredResidents:
          passportByid.numberOfActualRegisteredResidents ?? null,

        PurchaseAndSaleProtocol: passportByid.PurchaseAndSaleProtocol ?? null,

        dismantlingPossible: passportByid.dismantlingPossible ?? false,
        culturalMonument: passportByid.culturalMonument ?? null,

        existingTokens: passportByid.existingTokens ?? [],

        passportFiles:
          passportFileTypes?.map((type: any) => {
            const existing = passportByid.passportFiles?.find(
              (p) => p.id === type.id
            );

            return existing?.files?.length
              ? existing
              : { ...type, files: [] };
          }) ?? [],

        personTypes:
          passportByid.personTypes?.length
            ? passportByid.personTypes
            : initialPersonTypes,

        location: passportByid.location
          ? {
              name: passportByid.location.name ?? null,
              lat: passportByid.location.lat ?? null,
              lng: passportByid.location.lng ?? null,
            }
          : null,

        note: passportByid.note ?? "",
        signatureOfPropertyAffairsStateService:
          passportByid.signatureOfPropertyAffairsStateService ?? "",
        representativeOfDSHAK: passportByid.representativeOfDSHAK ?? "",
        representativeOfTheLocalExecutiveAuthority:
          passportByid.representativeOfTheLocalExecutiveAuthority ?? "",
        ministryOfCultureRepresentative:
          passportByid.ministryOfCultureRepresentative ?? "",
      }
      : emptyPassportForm,
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
    (data: PassportFormModel) => {
      if (formStatus === "draft" || isDirty) {
        if (params?.id) {
          const payload: UpdatePassportRequest = {
            ...data,
            id: Number(params.id),
            deleteIds,
            ownerDeleteIds,
            existingTokens: passportByid?.passportFiles ?? [],
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
          passpostId: params.id ? Number(params.id) : (confirmPassportId ?? 0),
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

  const [existingFileNames, setExistingFileNames] = useState<string[]>([]);
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
