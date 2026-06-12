import Button from "@/ui/shared/Button";
import Form from "@/ui/shared/Form";
import Input from "@/ui/shared/Input";
import Popover from "@/ui/shared/Popover";
import Select from "@/ui/shared/Select";
import CleanUp from "@svg/clean_up.svg?react";
import { radios } from "@/data/mocks";
import Search from "@svg/search.svg?react";
import FilterIcon from "@svg/filter.svg?react";
import Close from "@svg/close.svg?react";
import Radio from "@/ui/shared/Radio";
import { Controller } from "react-hook-form";
import { PersonTypeEnum } from "@/data/enum/person_type.enum";
import { PassportFilterVm } from "./passport_filter.vm"

export const PassportFilter = () => {
  const {
    areas,
    ownerTypes,
    destinations,
    methods,
    onClearFilters,
    buildingOwnershipTypes,
    landPropertyshipTypes,
    buildingPropertyTypes,
    handleModalSubmitChange,
    landOwnershipTypes,
    saleTransactionTypes,
    modalFilter,
    personTypeInFilter,
    setPersonTypeInFilter,
    searchParams,
    filterParams,
    handleInputChange,
    handleSelectChange,
    handleModalChange,
  } = PassportFilterVm();
  return (
    <div className="px-5 py-6 bg-white rounded-xl mb-5">
      <h5 className="pb-5 text-20px600 text-gray-800">Axtarış filterləri </h5>
      <div className="flex justify-between gap-x-3">
        <Input
          name="SerachObjectOwner"
          labelClassName="peer-focus:top-2"
          defaultValue={searchParams.get("SerachObjectOwner") || ""}
          label="Obyekt sahibinin adı"
          trailing={<Search />}
          isDebounce
          onDebounce={(val) =>
            handleInputChange("SearchIndexer.NameIndexer-like", val)
          }
        />
        <Select
          name="Estate.Owners[OwnerTypeId]"
          data={ownerTypes || []}
          value={
            Number(filterParams.get("Estate.Owners[OwnerTypeId]-eq")) || null
          }
          label="Obyekt Sahibi növü"
          onChange={(val) =>
            handleSelectChange("Estate.Owners[OwnerTypeId]", val)
          }
        />
        <Select
          name="Estate.AreaId"
          data={areas || []}
          value={Number(filterParams.get("Estate.AreaId-eq")) || null}
          label="Ərazi"
          onChange={(val) => handleSelectChange("Estate.AreaId", val)}
        />
        <Select
          name="Estate.DestinationId"
          data={destinations || []}
          value={Number(filterParams.get("Estate.DestinationId-eq")) || null}
          label="Təyinatı"
          onChange={(val) => handleSelectChange("Estate.DestinationId", val)}
        />
        <Popover
          panelClassName="right-4 w-full "
          popoverButtonClassName={`bg-gray-100 relative flex px-8 py-2 rounded-lg items-center gap-x-2 ${modalFilter.length > 0 && "border border-[#BE9753] bg-[#FBF9F1]"}`}
          button={
            <>
              <FilterIcon className="text-center" /> <span>Filterlər</span>
              {modalFilter.length > 0 && <Close className="ml-5" />}
            </>
          }
        >
          <Form methods={methods}>
            <div className="modal bg-white right-[3%] top-[-4px] w-[504px] h-[68vh] overflow-scroll mt-3 z-20  absolute p-4  flex flex-col gap-y-3 rounded-[10px] border border-gray-200 after:absolute after:border-t-0 after:border-b-10 after:border-solid border-b-white after:top-[-6%] after:right-[11px] after:content-['']">
              <h6>Ümumi məlumatlara əsasən</h6>
              <Input
                name="number"
                label="Pasport nömrəsi"
                isDebounce
                inputLabelclassName="h-14"
                defaultValue={searchParams.get("number") || ""}
                onDebounce={(val) => handleModalChange("number", val)}
              />
              <Controller
                control={methods.control}
                name="Estate.Owners[OwnerTypeId]"
                render={({ field: { value, onChange } }) => {
                  return (
                    <Radio
                      dataError="Estate.Owners[OwnerTypeId]"
                      data={radios.typePerson}
                      value={+value}
                      option={(val) => (
                        <Radio.Option
                          Icon={null}
                          data={val}
                          radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67] ${
                            methods.formState.errors.child
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      )}
                      onChange={(obj) => {
                        setPersonTypeInFilter(obj.id),
                          onChange(obj.id),
                          handleModalChange(
                            "Estate.Owners[OwnerTypeId]",
                            obj.id.toString(),
                          );
                      }}
                    />
                  );
                }}
              />
              <Input
                name="SearchIndexer.IdentifierIndexer-like"
                label={
                  personTypeInFilter === PersonTypeEnum.all
                    ? "VÖEN və ya FİN"
                    : personTypeInFilter === PersonTypeEnum.ownerTypesIndividual
                      ? "FIN"
                      : personTypeInFilter ===
                          PersonTypeEnum.ownerTypesLegalEntity
                        ? "VOEN"
                        : "VÖEN və ya FİN"
                }
                isDebounce
                onDebounce={(val) =>
                  handleModalChange("SearchIndexer.IdentifierIndexer-like", val)
                }
                inputLabelclassName="h-14"
              />
              <div className="flex flex-col">
                <h5 className="w-[34%]">Alqı-satqı müqaviləsi:</h5>
                <Controller
                  control={methods.control}
                  name="Estate.SaleTransactionTypeId"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Radio
                        dataError="objectDesignation"
                        data={saleTransactionTypes || []}
                        value={+value}
                        option={(val) => (
                          <Radio.Option
                            Icon={null}
                            data={val}
                            radioOptionClasses={`md:w-1/2  focus-within:border-[#D2AB67] bg-white ${
                              methods.formState.errors.child
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        )}
                        onChange={(obj) => {
                          handleModalChange(
                            "Estate.SaleTransactionTypeId",
                            obj.id.toString(),
                          ),
                            onChange(obj.id);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <h6 className="text-16px500 pb-3">Obyektin mülkiyyət növü</h6>
                <div className="flex gap-x-4">
                  <Select
                    name="Estate.LandPropertyTypeId"
                    data={landPropertyshipTypes || []}
                    onChange={(val) =>
                      handleModalChange("Estate.LandPropertyTypeId", val)
                    }
                    label="Torpaq üzrə"
                  />
                  <Select
                    name="Estate.BuildingPropertyTypeId"
                    data={buildingPropertyTypes || []}
                    onChange={(val) =>
                      handleModalChange("Estate.BuildingPropertyTypeId", val)
                    }
                    label="Tikili üzrə"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">
                  Obyekt üzərində hüququn növü
                </h6>
                <div className="flex gap-x-4">
                  <Select
                    name="Estate.LandOwnershipTypeId"
                    data={landOwnershipTypes || []}
                    onChange={(val) =>
                      handleModalChange("Estate.LandOwnershipTypeId", val)
                    }
                    label="Torpaq üzrə"
                  />
                  <Select
                    name="Estate.BuildingOwnershipTypeIdq"
                    data={buildingOwnershipTypes || []}
                    onChange={(val) =>
                      handleModalChange("Estate.BuildingOwnershipTypeId", val)
                    }
                    label="Tikili üzrə"
                  />
                </div>
              </div>
              <div>
                <h5 className="pb-4">Obyekt məlumatlarına əsasən</h5>
                <div className="flex gap-x-3">
                  <Input
                    name="Estate.Code"
                    inputLabelclassName="h-14"
                    defaultValue={searchParams.get("SerachObjectOwner") || ""}
                    isDebounce
                    label="Obyektin kodu"
                    onDebounce={(val) => handleModalChange("Estate.Code", val)}
                  />
                  <Input
                    name="Estate.FloorCount"
                    inputLabelclassName="h-14"
                    isDebounce
                    defaultValue={searchParams.get("SerachObjectOwner") || ""}
                    label="Mərtəbə sayı"
                    onDebounce={(val) =>
                      handleModalChange("Estate.FloorCount", val)
                    }
                  />
                  <Input
                    name="Estate.RoomCount"
                    inputLabelclassName="h-14"
                    isDebounce
                    defaultValue={searchParams.get("SerachObjectOwner") || ""}
                    label="Otaq sayı"
                    onDebounce={(val) =>
                      handleModalChange("Estate.RoomCount", val)
                    }
                  />
                </div>
              </div>
              <div className="flex gap-x-3">
                <Input
                  name="Estate.TotalLandArea"
                  inputLabelclassName="h-14"
                  isDebounce
                  defaultValue={searchParams.get("SerachObjectOwner") || ""}
                  label="Ümumi torpaq sahəsi (kv. m)"
                  onDebounce={(val) =>
                    handleModalChange("Estate.TotalLandArea", val)
                  }
                />
                <Input
                  name="Estate.TotalBuildingArea"
                  inputLabelclassName="h-14"
                  isDebounce
                  defaultValue={searchParams.get("SerachObjectOwner") || ""}
                  label="Tikilinin ümumi sahəsi (kv. m)"
                  onDebounce={(val) =>
                    handleModalChange("Estate.TotalBuildingArea", val)
                  }
                />
              </div>
              <div className="flex gap-x-3">
                <Input
                  name="Estate.ResidentialArea"
                  inputLabelclassName="h-14"
                  isDebounce
                  defaultValue={searchParams.get("SerachObjectOwner") || ""}
                  label="Yaşayış sahəsi (kv. m)"
                  onDebounce={(val) =>
                    handleModalChange("Estate.ResidentialArea", val)
                  }
                />
                <Input
                  name="Estate.NonResidentialArea"
                  inputLabelclassName="h-14"
                  isDebounce
                  defaultValue={searchParams.get("SerachObjectOwner") || ""}
                  label="Qeyri-yaşayış sahəsi (kv. m)"
                  onDebounce={(val) =>
                    handleModalChange("Estate.NonResidentialArea", val)
                  }
                />
              </div>
              <div className="flex w-full justify-between gap-x-3">
                <Button
                  onClick={onClearFilters}
                  className="w-full bg-white border border-gray-400 text-black rounded-[10px]"
                >
                  Təmizlə
                  <CleanUp />
                </Button>
                <Button
                  type="button"
                  className="w-full bg-[#D2AB67] rounded-[10px]"
                  onClick={handleModalSubmitChange}
                >
                  Tətbiq et
                </Button>
              </div>
            </div>
          </Form>
        </Popover>
      </div>
    </div>
  );
};
