import Radio from "@/ui/shared/Radio";
import { Controller } from "react-hook-form";
import Form from "@/ui/shared/Form";
import MapComponent from "@/ui/shared/Map/map";
import { CreatePassportVM } from "./create_passport.vm";
import Input from "@/ui/shared/Input";
import Select from "@/ui/shared/Select";
import FileInput from "@/ui/shared/NewFileInput";
import Textarea from "@/ui/shared/Textarea";
import Button from "@/ui/shared/Button";

import Plus from "@svg/addFilePlus.svg?react";
import Remove from "@svg/deleteIcon.svg?react";
import İnfoCircle from "@svg/info-circle.svg?react";
import BookMark from "@svg/bookmark.svg?react";
import Check from "@svg/check.svg?react";
import Datepicker from "@/ui/shared/Datepicker";
import Loading from "@/ui/shared/Loading";

const CreatePassport = () => {
  const {
    onSubmit,
    methods,
    destinations,
    culturalMonumentsRadio,
    areas,
    saleTransactionTypes,
    ownerTypes,
    buildingPropertyTypes,
    buildingOwnershipTypes,
    landPropertyshipTypes,
    landOwnershipTypes,
    passportLoading,
    ownerTypesLoading,
    buildingPropertyTypesLoading,
    buildingOwnershipTypesLoading,
    landPropertyshipTypesLoading,
    landOwnershipTypesLoading,
    ownerType,
    cultural,
    setCultural,
    setOwnerType,
    culturalMonuments,
    passportFiles,
    passportFileTypesLoading,
    uploadSuccess,
    setDeleteIds,
    updatePassport,
    setFormStatus,
    isDirty,
    params,
    isFixed,
    existingFileNames,
    updateFileNames,
    personTypes,
    removeInput,
    appendInput,
    objectArea,
    passportByid,
    setOwnerDeleteIds,
    uploadLoading,
    setUploadLoading,
    culturalMonumentsLoading
  } = CreatePassportVM();

  return (
    <>
      {passportLoading ||
        (ownerTypesLoading &&
          buildingPropertyTypesLoading &&
          buildingOwnershipTypesLoading &&
          landPropertyshipTypesLoading &&
          landOwnershipTypesLoading &&
          passportFileTypesLoading &&
          culturalMonumentsLoading) ? (
        <Loading />
      ) : (
        <div className="flex gap-x-4 p-8 justify-between relative">
          <div className=" w-full">
            <h5 className="text-30px700 text-gray-800 pb-6">
              {params.id ? "Pasportun redaktə edilməsi" : "Create New Passport"}
            </h5>
            <Form
              className="flex gap-y-6 flex-col md:w-1/2 w-full pb-6 md:pt-8 bg-white rounded-2xl px-8"
              methods={methods}
              onSubmit={onSubmit}
            >
              <div>
                <h6 className="text-16px500 pb-3">Pasport nömrəsi</h6>
                <Input
                  name="passportNumber"
                  label="Nömrə"
                  inputLabelclassName="h-14"
                />
              </div>
              <div>
                <h6 className="text-16px500 pb-3">
                  Obyektin məkan məlumatları
                </h6>
                <div className="flex flex-col gap-y-3 mb-5">
                  <div className="flex gap-x-3 justify-between" >
                    <Input
                      name="objectLocation"
                      label="Obyektin ünvanı"
                      inputLabelclassName="h-14"
                    />
                    <Select
                      name="objectArea"
                      data={areas || []}
                      label="Ərazi"
                      className="w-52"
                      classNameSelect="h-14"
                    />
                  </div>
                  {!objectArea && objectArea !== null && objectArea !== undefined ? <p className="relative flex items-center gap-x-4 px-4 border focus-within:border-[#D2AB67] border-solid rounded-lg bg-[#F5F5F5] border-gray-200 h-14">{passportByid?.objectDec}</p> :
                    areas?.map((x) =>
                      <div key={x.id}>
                        {objectArea === x.id && <p key={x.id}
                          className="relative flex items-center gap-x-4 px-4 border focus-within:border-[#D2AB67] border-solid rounded-lg bg-[#F5F5F5] border-gray-200 h-14">{x.description}</p>
                        }
                      </div>
                    )}
                </div>
                <Controller
                  control={methods.control}
                  name="location"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <MapComponent
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <h6 className="text-16px500">Obyektin təyinatı</h6>
                <Controller
                  control={methods.control}
                  name="objectDesignation"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Radio
                        dataError="objectDesignation"
                        data={destinations || []}
                        value={+value}
                        error={methods.formState.errors.objectDesignation}
                        option={(val) => (
                          <Radio.Option
                            Icon={null}
                            data={val}
                            radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67]`}
                          />
                        )}
                        onChange={(obj) => {
                          onChange(obj.id);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <h6 className="text-16px500">Mədəniyyət abidəsi</h6>
                <Controller
                  control={methods.control}
                  name="dismantlingPossible"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Radio
                        dataError="dismantlingPossible"
                        data={culturalMonumentsRadio.culturalMonuments || []}
                        value={+value}
                        option={(val) => (
                          <Radio.Option
                            Icon={null}
                            data={val}
                            radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67]`}
                          />
                        )}
                        onChange={(obj) => {
                          setCultural(obj.id)
                          onChange(Boolean(obj.id));
                          methods.setValue("culturalMonument", null);
                        }}
                      />
                    );
                  }}
                />
              </div>
              {
                cultural == 1 || Number(methods.getValues("dismantlingPossible")) ? <div className="flex gap-x-4"><Select
                  name="culturalMonument"
                  data={culturalMonuments || []}
                  label="Mədəniyyət abidəsi"
                  classNameSelect="h-14"
                />
                </div> : ""
              }
              <div>
                <h6 className="text-16px500 pb-3">Obyektin mülkiyyət növü</h6>
                <div className="flex gap-x-4">
                  <Select
                    name="landProperty"
                    data={landPropertyshipTypes || []}
                    label="Torpaq üzrə"
                    classNameSelect="h-14"
                  />
                  <Select
                    name="buildingProperty"
                    data={buildingPropertyTypes || []}
                    label="Tikili üzrə"
                    classNameSelect="h-14"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">
                  Obyekt üzərində hüququn növü
                </h6>
                <div className="flex gap-x-4">
                  <Select
                    name="landPropertyOfLawType"
                    data={landOwnershipTypes || []}
                    label="Torpaq üzrə"
                    classNameSelect="h-14"
                  />
                  <Select
                    name="buildingPropertyOfLawType"
                    data={buildingOwnershipTypes || []}
                    label="Tikili üzrə"
                    classNameSelect="h-14"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500">Obyekt sahibi məlumatları</h6>
                <div className="flex gap-y-4 flex-col">
                  {personTypes &&
                    personTypes.map((person, index) => (
                      <div
                        id={String(person.id)}
                        key={person.id ?? index}
                        className="flex flex-col gap-y-3"
                      >
                        <div className="flex items-end">
                          <Controller
                            control={methods.control}
                            name={`personTypes.${index}.ownerTypeId` as any}
                            defaultValue={person.value || 1}
                            render={({ field: { value, onChange } }) => (
                              <Radio
                                dataError={`personTypes.${index}.ownerTypeId`}
                                error={
                                  (methods.formState.errors?.personTypes as any)?.[index]?.personType
                                }
                                data={ownerTypes || []}
                                value={+value}
                                defaultValue={1}
                                option={(val) => (
                                  <Radio.Option
                                    Icon={null}
                                    data={val}
                                    radioOptionClasses="md:w-1/2 w-full focus-within:border-[#D2AB67]"
                                  />
                                )}
                                onChange={(obj) => {
                                  const selectedId = obj.id;

                                  setOwnerType((prev) => ({
                                    ...prev,
                                    [index]: selectedId,
                                  }));

                                  // setSchemaByPersonType(selectedId);

                                  methods.setValue(
                                    `personTypes.${index}.tin`,
                                    ""
                                  );
                                  methods.setValue(
                                    `personTypes.${index}.companyName`,
                                    ""
                                  );
                                  methods.setValue(
                                    `personTypes.${index}.pin`,
                                    ""
                                  );
                                  methods.setValue(
                                    `personTypes.${index}.fullname`,
                                    ""
                                  );
                                  methods.setValue(
                                    `personTypes.${index}.contactNumber`,
                                    ""
                                  );
                                  onChange(selectedId);
                                }}
                              />
                            )}
                          />
                          {
                            personTypes.length >= 2 && index >= 1 && params.id ? <div className="flex">
                              <button
                                type="button"
                                className={`p-4 border-red-600 ${index === personTypes.length - 1
                                  ? `border-gray-800`
                                  : `border-red-600`
                                  } border rounded-[10px] w-14 h-14 ml-3`}
                                onClick={() => {
                                  removeInput(index);
                                  setOwnerDeleteIds((prev: any) => [...prev, person.id]);
                                }}
                              >
                                {

                                  <Remove />
                                }
                              </button>
                              <button
                                type="button"
                                className={`p-4 border-gray-800 ${index === personTypes.length - 1
                                  ? `border-gray-800`
                                  : `border-red-600`
                                  } border rounded-[10px] w-14 h-14 ml-3`}
                                onClick={() => {
                                  appendInput({ ownerTypeId: 1 });
                                }}
                              >
                                {

                                  <Plus />
                                }
                              </button>
                            </div> :
                              <button
                                type="button"
                                className={`p-4 border-gray-800 ${index === personTypes.length - 1
                                  ? `border-gray-800`
                                  : `border-red-600`
                                  } border rounded-[10px] w-14 h-14 ml-3`}
                                onClick={() => {
                                  if (index === personTypes.length - 1) {
                                    appendInput({ ownerTypeId: 1 });
                                  } else {
                                    removeInput(index);
                                    setOwnerDeleteIds((prev: any) => [...prev, person.id]);
                                  }
                                }}
                              >
                                {
                                  index === personTypes.length - 1 ? (
                                    <>
                                      <Plus />
                                    </>
                                  ) : (
                                    <Remove />
                                  )
                                }
                              </button>
                          }

                        </div>

                        {
                          ownerType[index] == 2 ||
                            personTypes[index].ownerTypeId === 2 ? (
                            <>
                              <Input
                                name={`personTypes.${index}.tin`}
                                label="VÖEN"
                                inputLabelclassName="h-14"
                              />
                              <Input
                                name={`personTypes.${index}.companyName`}
                                label="Şirkətin adı"
                                inputLabelclassName="h-14"
                              />
                            </>
                          ) : (
                            <>
                              <Input
                                name={`personTypes.${index}.pin`}
                                label="FİN"
                                inputLabelclassName="h-14"
                              />
                              <Input
                                name={`personTypes.${index}.fullname`}
                                label="Ad, Soyad, Ata adı"
                                inputLabelclassName="h-14"
                              />
                            </>
                          )
                        }

                        <Input
                          inputLabelclassName="gap-x-2 h-14"
                          labelClassName="top-2.5 peer-focus:top-2.5 peer-focus:scale-75"
                          inputClassName="pt-0"
                          name={`personTypes.${index}.contactNumber`}
                          label="Əlaqə nömrəsi"
                          leading="+994"
                          maxLength={9}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">Digər məlumatlar</h6>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="objectCode"
                    label="Obyektin kodu"
                    min="0"
                    step="any"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="numberOfFloors"
                    label="Mərtəbə sayı"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="totalLandArea"
                    min="0"
                    step="any"
                    label="Ümumi torpaq sahəsi (kv. m)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="totalLandAreaForDocument"
                    min="0"
                    step="any"
                    label="O cümlədən sənəd üzrə (kv. m)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="totalBuildingArea"
                    min="0"
                    step="any"
                    label="Tikilinin ümumi sahəsi (kv. m)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="totalBuildingAreaForDocument"
                    min="0"
                    step="any"
                    label="O cümlədən sənəd üzrə (kv. m)"
                    inputLabelclassName="h-14"
                  />
                </div>
                <div className="flex gap-x-2 pt-3">
                  <Input
                    type="number"
                    name="residentialArea"
                    min="0"
                    step="any"
                    label="Yaşayış sahəsi (kv. m)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="nonRresidentialArea"
                    min="0"
                    step="any"
                    label="Qeyri-yaşayış sahəsi (kv. m)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="numberOfRooms"
                    label="Otaq sayı"
                    inputLabelclassName="h-14"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">
                  Torpaq sahəsinin ehtimal olunan satış qiyməti{" "}
                </h6>
                <div className="flex gap-x-3">
                  <Input
                    type="number"
                    name="sellingPriceOfLand1KVM"
                    min="0"
                    step="any"
                    label="1 kv. m (AZN)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="sellingTotalPriceOfLand"
                    min="0"
                    step="any"
                    label="Ümumi (AZN)"
                    inputLabelclassName="h-14"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">
                  Tikinti sahəsinin ehtimal olunan satış qiyməti
                </h6>
                <div className="flex gap-x-3">
                  <Input
                    type="number"
                    name="sellingPriceOfBuilding1KVM"
                    min="0"
                    step="any"
                    label="1 kv. m (AZN)"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="sellingTotalPriceOfBuilding"
                    min="0"
                    step="any"
                    label="Ümumi (AZN)"
                    inputLabelclassName="h-14"
                  />
                </div>
                <Input
                  type="number"
                  name="sellingTotalPriceOfObject"
                  min="0"
                  step="any"
                  label=" Obyektin ehtimal olunan ümumi satış qiyməti (AZN)"
                  inputLabelclassName="h-14"
                  className="py-3"
                />
                <div className="flex gap-x-3">
                  <Input
                    type="number"
                    name="numberOfResidentsInTheResidentialFacility"
                    label="Yaşayış obyektində sakinlərin sayı"
                    inputLabelclassName="h-14"
                  />
                  <Input
                    type="number"
                    name="numberOfActualRegisteredResidents"
                    label=" Faktiki qeydiyyatda olan sakinlərin sayı"
                    inputLabelclassName="h-14"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-16px500">Alqı-satqı protokolu</h6>
                <Controller
                  control={methods.control}
                  name="PurchaseAndSaleProtocol"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Radio
                        dataError="PurchaseAndSaleProtocol"
                        data={saleTransactionTypes || []}
                        error={methods.formState.errors.PurchaseAndSaleProtocol}
                        value={value}
                        option={(val) => (
                          <Radio.Option
                            Icon={null}
                            data={val}
                            radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67]`}
                          />
                        )}
                        onChange={(obj) => {
                          onChange(obj.id);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <h5 className="text-18px700 text-gray-800">Qoşmalar</h5>
                <div>
                  {passportFiles.length > 0 && passportFiles?.map((file, index) => {
                    return (
                      <div key={file.id}>
                        <h6 className="text-16px500 pb-3 pt-5">{file.name}</h6>
                        <FileInput
                          id={file.id}
                          test={file.fileAccept}
                          setUploadLoading={setUploadLoading}
                          setDeleteIds={setDeleteIds}
                          submitRequest={uploadSuccess}
                          name={`passportFiles.${index}.files`}
                          label={file.name}
                          deleteFile={() => {
                            updateFileNames(file.name, true);
                          }}
                          onchangeFile={() => {
                            if (!existingFileNames.includes(file.name)) {
                              updateFileNames(file.name, false);
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h6 className="text-16px500 pb-3">Əlavə Qeyd</h6>
                <Controller
                  control={methods.control}
                  name="note"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Textarea
                        placeholder="Qeyd əlavə et"
                        className="h-[120px] pt-2 w-full"
                        value={value}
                        error={methods.formState.errors.note}
                        onChange={(val) => (
                          onChange(val)
                        )}
                        name="note"
                      />
                    );
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <h5 className="text-18px700 text-gray-800">
                  İmzalayan şəxslər
                </h5>
                <Input
                  name="signatureOfPropertyAffairsStateService"
                  label="Əmlak Məsələləri Dövlət Xidməti nümayəndəsi"
                  inputLabelclassName="h-14"
                />
                <Input
                  name="representativeOfDSHAK"
                  label="DŞAK nümayəndəsi"
                  inputLabelclassName="h-14"
                />
                <Input
                  name="representativeOfTheLocalExecutiveAuthority"
                  label="Yerli İcra Hakimiyyəti orqanı nümayəndəsi"
                  inputLabelclassName="h-14"
                />
                <Input
                  name="ministryOfCultureRepresentative"
                  label="Mədəniyyət Nazirliyinin nümayəndəsi"
                  inputLabelclassName="h-14"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <h5 className="text-18px700 text-gray-800">
                  Pasportun tərtib edilmə tarixi
                </h5>
                <Controller
                  control={methods.control}
                  name="passportIssueDate"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Datepicker
                        disablePast
                        value={value ?? null}
                        error={methods.formState.errors.passportIssueDate}
                        onChange={(val) => {
                          if (val) {
                            onChange(new Date(val));
                          } else {
                            onChange(null);
                          }
                        }}
                        title="Başlama tarixi"
                      />
                    )
                  }}
                />
              </div>
              {/* 
              <div className="flex gap-x-2">
                {formStatus === "draft" || isDirty ? (
                  <Button
                    onChange={() => setFormStatus("draft")}
                    className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
                  >
                    Qaralama kimi saxla
                    <BookMark />
                  </Button>
                ) : (
                  <Button
                    onChange={() => setFormStatus("approve")}
                    className="rounded-[10px] bg-gray-800 text-white w-full"
                  >
                    Təsdiqlə
                    <Check />
                  </Button>
                )}
              </div> */}
              {params.id ? (
                <div className="flex gap-x-3">
                  <Button
                    disabled={uploadLoading}
                    isLoading={updatePassport.isPending}
                    onClick={() => setFormStatus("draft")}
                    className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
                  >
                    Qaralama kimi saxla
                    <BookMark />
                  </Button>
                  <Button
                    disabled={isDirty}
                    onClick={() => setFormStatus("approve")}
                    className="rounded-[10px] bg-gray-800 text-white w-full"
                  >
                    Təsdiqlə
                    <Check />
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={uploadLoading}
                  onClick={() => setFormStatus("draft")}
                  className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
                >
                  Qaralama kimi saxla
                  <BookMark />
                </Button>
              )}
            </Form>
          </div>
          <div
            className={`fixed transition-all duration-700 ease-in-out ${isFixed ? "right-[4%] top-1" : "top-[25%] right-[4%]"
              }`}
          >
            {/* Info Box */}
            <div
              className={`bg-white p-6 rounded-lg shadow-lg w-80 h-fit flex flex-col gap-y-7`}
            >
              <div>
                <h6 className="flex gap-x-2">
                  <İnfoCircle />
                  Information
                </h6>
                <div className="flex flex-col gap-y-1 pt-2">
                  {areas?.map((item,index) => (
                    <p
                       key={item.id ?? index}
                      className="text-14px400"
                    >{`${item.name} - ${item.description}`}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePassport;
