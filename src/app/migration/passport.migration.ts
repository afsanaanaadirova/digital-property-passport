import { PassportDSO } from "@/data/dso/passport.dso";
import { PassportByIdDTO, PassportGetAllDTO } from "@/data/dto/passport.dto";
import {
  PassportGetAllModel,
  PassportModel,
} from "@/data/model/passport.model";
import { PassportUpdateDSO } from "@/data/dso/passportUpdate.dso";


export const passportMigration = {
  async migrateToModel(dto: PassportByIdDTO): Promise<PassportModel> {
    const passport = dto.passport;
    const options: {} = { day: "2-digit", month: "2-digit", year: "numeric" };

    const createDateFormatted = new Date(
      passport.createDate
    ).toLocaleDateString("tr-TR", options);
    const issueDateFormatted = new Date(passport.issueDate).toLocaleDateString(
      "tr-TR",
      options
    );
    return {
      personTypes: passport.estate.owners.map((person) => {
        return {
          id: person.id,
          ownerTypeId: person.ownerType.id,
          ownerTypeName: person.ownerType.name,
          contactNumber: person.contactNumber.replace("+994", "").trim(),
          tin: person.ownerLegalDetail?.tin,
          companyName: person.ownerLegalDetail?.companyName,
          pin: person.ownerCitizenDetail?.pin,
          fullname: person.ownerCitizenDetail?.fullname,
        };
      }),
      passpostId: passport.id,
      createdBy: passport.createdBy,
      createDate: createDateFormatted,
      passportIssueDate: new Date(passport.issueDate),
      passportIssueInfo: issueDateFormatted,
      passportNumber: passport.number,
      objectLocation: passport.estate.address,
      objectArea: passport.estate.area.id,
      objectAreaName: passport.estate.area.name,
      objectDec: passport.estate.area.description,
      objectDesignation: passport.estate.destination.id,
      objectDesignationName: passport.estate.destination.name,
      landProperty: passport.estate.landPropertyType?.id,
      landPropertyName: passport.estate.landPropertyType?.name,
      buildingProperty: passport.estate.buildingPropertyType?.id,
      buildingPropertyName: passport.estate.buildingPropertyType?.name,
      landPropertyOfLawType: passport.estate.landOwnershipType?.id,
      landPropertyOfLawTypeName: passport.estate.landOwnershipType?.name,
      buildingPropertyOfLawType: passport.estate.buildingOwnershipType?.id,
      buildingPropertyOfLawTypeName:
        passport.estate.buildingOwnershipType?.name,
      objectCode: passport.estate.code,
      numberOfFloors: passport.estate.floorCount,
      totalLandArea: passport.estate.totalLandArea,
      totalLandAreaForDocument: passport.estate.legalTotalLandArea,
      totalBuildingArea: passport.estate.totalBuildingArea,
      totalBuildingAreaForDocument: passport.estate.legalTotalBuildingArea,
      residentialArea: passport.estate.residentialArea,
      nonRresidentialArea: passport.estate.nonResidentialArea,
      numberOfRooms: passport.estate.roomCount,
      sellingPriceOfLand1KVM:
        passport.estate.pricing?.estimatedLandSalePricePerSquareMeter,
      sellingTotalPriceOfLand: passport.estate.pricing?.estimatedLandSalePrice,
      sellingPriceOfBuilding1KVM:
        passport.estate.pricing?.estimatedBuildingSalePricePerSquareMeter,
      sellingTotalPriceOfBuilding:
        passport.estate.pricing?.estimatedBuildingSalePrice,
      sellingTotalPriceOfObject:
        passport.estate.pricing?.estimatedTotalSalePrice,
      numberOfResidentsInTheResidentialFacility: passport.estate.residentsCount,
      numberOfActualRegisteredResidents:
        passport.estate.registeredResidentsCount,
      PurchaseAndSaleProtocol: passport.estate.saleTransactionType?.id,
      PurchaseAndSaleProtocolName: passport.estate.saleTransactionType?.name,
      passportFiles: passport.passportFiles.map((fileType) => ({
        id: fileType.passportFileType.id,
        name: fileType.passportFileType.name,
        fileAccept: fileType.passportFileType.fileAccept,
        // title: fileType.title,
        files: fileType.files.map((file) => ({
          id: file.token,
          name: file.name,
          file: file.url
        }))
      })),
      dismantlingPossible: passport.estate.isDismantlingPossible,
      culturalMonument: passport.estate.culturalMonument?.id,
      culturalMonumentName: passport.estate.culturalMonument?.name,
      location: {
        name: passport.estate.location?.name,
        lat: passport.estate.location?.latitude,
        lng: passport.estate.location?.longitude,
      },
      note: passport.estate.location?.note,
      signatureOfPropertyAffairsStateService:
        passport.signatory?.propertyServiceRepresentative,
      representativeOfDSHAK:
        passport.signatory?.planningArchitectureCommitteeRepresentative,
      representativeOfTheLocalExecutiveAuthority:
        passport.signatory?.localExecutiveAuthorityRepresentative,
      ministryOfCultureRepresentative: passport.signatory?.ministryOfCultureRepresentative,
      statusName: passport.passportStatuses[0].status.name,
    };
  },
  migrateToDSO(model: PassportModel): PassportDSO {
    return {
      passport: {
        number: model.passportNumber,
        issueDate: model.passportIssueDate
          ? model.passportIssueDate.toISOString()
          : null,
        estate: {
          owners: model.personTypes.map((person) => {
            return {
              id: person.id,
              ownerTypeId: person.ownerTypeId,
              contactNumber: person.contactNumber ? `+994${person.contactNumber}` : null,
              ownerLegalDetail: person.tin
                ? {
                  tin: person.tin,
                  companyName: person.companyName,
                }
                : null,
              ownerCitizenDetail: person.fullname
                ? {
                  pin: person.pin ? person.pin : null,
                  fullname: person.fullname,
                }
                : null,
            };
          }),
          areaId: Number(model.objectArea),
          destinationId: Number(model.objectDesignation), //deyishecek fake
          landPropertyTypeId: model.landProperty,
          buildingPropertyTypeId: model.buildingProperty,
          landOwnershipTypeId: model.landPropertyOfLawType,
          buildingOwnershipTypeId: model.buildingPropertyOfLawType,
          address: model.objectLocation,
          code: model.objectCode,
          floorCount: Number(model.numberOfFloors)
            ? Number(model.numberOfFloors)
            : null,
          totalLandArea: model.totalLandArea,
          legalTotalLandArea: model.totalLandAreaForDocument || null,
          totalBuildingArea: model.totalBuildingArea,
          legalTotalBuildingArea: model.totalBuildingAreaForDocument,
          residentialArea: model.residentialArea,
          nonResidentialArea: model.nonRresidentialArea
            ? model.nonRresidentialArea
            : null,
          roomCount: model.numberOfRooms ? model.numberOfRooms : null,
          residentsCount: model.numberOfResidentsInTheResidentialFacility,
          registeredResidentsCount: model.numberOfActualRegisteredResidents,
          saleTransactionTypeId: model.PurchaseAndSaleProtocol,
          location: model.location
            ? {
              name: model.location.name,
              longitude: model.location.lng,
              latitude: model.location.lat,
              note: model.note ? model.note : null,
            }
            : null,
          pricing: {
            estimatedLandSalePricePerSquareMeter: model.sellingPriceOfLand1KVM,
            estimatedLandSalePrice: model.sellingTotalPriceOfLand,
            estimatedBuildingSalePricePerSquareMeter:
              model.sellingPriceOfBuilding1KVM,
            estimatedBuildingSalePrice: model.sellingTotalPriceOfBuilding,
            estimatedTotalSalePrice: model.sellingTotalPriceOfObject,
          },
          isDismantlingPossible: model.dismantlingPossible,
          culturalMonumentId: model.culturalMonument
        },
        passportFiles:
          model.passportFiles && model.passportFiles.length > 0
            ? model.passportFiles.map((el) => {
              return {
                passportFileTypeId: el.id,
                tokens:
                  el.files && el.files.length > 0
                    ? el.files.map((file) => file.id.toString())
                    : [],
              };
            })
            : [],
        signatory: {
          propertyServiceRepresentative:
            model.signatureOfPropertyAffairsStateService,
          planningArchitectureCommitteeRepresentative:
            model.representativeOfDSHAK,
          localExecutiveAuthorityRepresentative:
            model.representativeOfTheLocalExecutiveAuthority,
          ministryOfCultureRepresentative: model.ministryOfCultureRepresentative
        },
      },
    };
  },
};

export const passportConfirmMigration = {
  migrateToDSO(model: { passpostId: number }): { id: number } {
    return {
      id: model.passpostId,
    };
  },
};
export const updatePassportMigration = {
  migrateToDSO: (data: PassportModel): PassportUpdateDSO => {
    const existingFileIds = new Set(
      data.existingTokens.flatMap((token: any) =>
        token.files.map((file: any) => file.id)
      )
    );
    var filteredData = data.passportFiles
      .map((item) => ({
        ...item,
        files: item.files?.filter(
          (file) =>
            !data.deleteIds.includes(file.id.toString() as string) &&
            !file.name &&
            !existingFileIds.has(file.id)
        ),
      }))
      .filter((item) => item.files?.length > 0);

    return {
      id: data.id,
      number: data.passportNumber,
      issueDate: data.passportIssueDate
        ? data.passportIssueDate.toISOString()
        : null,
      estate: {
        ownerDeleteIds: data.ownerDeleteIds,
        owners: data.personTypes.map((person) => {
          return {
            id: person.id ? person.id : 0,
            ownerTypeId: person.ownerTypeId,
            contactNumber:`+994${person.contactNumber}`,
            ownerLegalDetail: person.tin
              ? {
                tin: person?.tin,
                companyName: person?.companyName,
              }
              : null,
            ownerCitizenDetail: person.fullname
              ? {
                pin: person?.pin ? person.pin : null,
                fullname: person?.fullname,
              }
              : null,
          };
        }),
        areaId: data.objectArea || null,
        destinationId: Number(data.objectDesignation),
        landPropertyTypeId: data.landProperty || null,
        buildingPropertyTypeId: data.buildingProperty || null,
        landOwnershipTypeId: data.landPropertyOfLawType || null,
        buildingOwnershipTypeId: data.buildingPropertyOfLawType || null,
        address: data.objectLocation || null,
        code: data.objectCode || null,
        floorCount: data.numberOfFloors || null,
        totalLandArea: data.totalLandArea || null,
        legalTotalLandArea: data.totalLandAreaForDocument || null,
        totalBuildingArea: data.totalBuildingArea || null,
        legalTotalBuildingArea: data.totalBuildingAreaForDocument
          ? data.totalBuildingAreaForDocument
          : null,
        residentialArea: data.residentialArea || null,
        nonResidentialArea: data.nonRresidentialArea || null,
        roomCount: data.numberOfRooms || null,
        residentsCount: data.numberOfResidentsInTheResidentialFacility || null,
        registeredResidentsCount:
          data.numberOfActualRegisteredResidents || null,
        saleTransactionTypeId: data.PurchaseAndSaleProtocol || null,
        location: data.location?.name
          ? {
            name: data.location.name,
            longitude: data.location.lng,
            latitude: data.location.lat,
            note: data.note,
          }
          : null,
        pricing:
          data.sellingPriceOfLand1KVM ||
            data.sellingTotalPriceOfLand ||
            data.sellingPriceOfBuilding1KVM ||
            data.sellingTotalPriceOfBuilding ||
            data.sellingTotalPriceOfObject
            ? {
              estimatedLandSalePricePerSquareMeter:
                data.sellingPriceOfLand1KVM,
              estimatedLandSalePrice: data.sellingTotalPriceOfLand,
              estimatedBuildingSalePricePerSquareMeter:
                data.sellingPriceOfBuilding1KVM,
              estimatedBuildingSalePrice: data.sellingTotalPriceOfBuilding,
              estimatedTotalSalePrice: data.sellingTotalPriceOfObject,
            }
            : null,
        isDismantlingPossible: data.dismantlingPossible,
        culturalMonumentId: data.culturalMonument ?data.culturalMonument : null
      },
      passportFiles: {
        deletedTokens: data.deleteIds,
        newPassportFiles: filteredData.map((el) => {
          return {
            passportFileTypeId: el.id,
            tokens: el.files.map((file) => file.id.toString()),
          };
        }),
      },
      signatory:
        data.signatureOfPropertyAffairsStateService ||
          data.representativeOfDSHAK ||
          data.representativeOfTheLocalExecutiveAuthority
          ? {
            propertyServiceRepresentative:
              data.signatureOfPropertyAffairsStateService,
            planningArchitectureCommitteeRepresentative:
              data.representativeOfDSHAK,
            localExecutiveAuthorityRepresentative:
              data.representativeOfTheLocalExecutiveAuthority,
            ministryOfCultureRepresentative: data.ministryOfCultureRepresentative
          }
          : null,
    };
  },
};
export const passportByAllMigration = {
  migrateToModel(dto: PassportGetAllDTO): PassportGetAllModel[] {
    const passports = dto.pageResponse;
    const datas = passports.datas.map((passport) => ({
      id: passport.id,
      actions: passport.actions,
      passportNumber: passport.passportNumber ? passport.passportNumber : "Təyin olunmayıb",
      ownerName: passport.ownerName ? passport.ownerName : null,
      finOrVoen: passport.finOrVoen ? passport.finOrVoen : "Təyin olunmayıb",
      address: passport.address,
      destination: passport.destination,
      propertyType:
        passport.propertyType === "/"
          ? "Təyin olunmayıb"
          : passport.propertyType,
      ownershipType:
        passport.ownershipType === "/"
          ? "Təyin olunmayıb"
          : passport.ownershipType,
      status: passport.status,
    }));

    return {
      datas: datas,
      size: passports.size,
      index: passports.index,
      total: passports.total,
      hasNext: passports.hasNext,
      hasPrev: passports.hasPrev,
      min: passports.min,
      max: passports.max,
    };
  },
};
