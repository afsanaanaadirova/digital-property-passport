import Radio from "@/ui/shared/Radio";
import { Controller } from "react-hook-form";
import MapComponent from "@/ui/shared/Map/map";
import Input from "@/ui/shared/Input";
import Select from "@/ui/shared/Select";
import ObjectPlaceInfoFormVM from "./object_place_info_form.vm";
import { ObjectPlaceInfoFormProps } from "./object_place_info_form.type";
import { radios } from "@/data/mocks";


const ObjectPlaceInfoForm = ({ handleChangeField,
  methods,
  areas,
  destinations,
  buildingOwnershipTypes,
  landOwnershipTypes,
  landPropertyshipTypes,
  buildingPropertyTypes,
  culturalMonuments,
  passportByid
}: ObjectPlaceInfoFormProps) => {
  const {
    setObjectArea,
    objectArea,
    setCultural,
    cultural
  } = ObjectPlaceInfoFormVM()
  return <div>
    <div>
      <h6 className="text-16px500 pb-3">
        Obyektin məkan məlumatları
      </h6>
      <div className="flex flex-col gap-y-3 mb-5">
        <div className="flex gap-x-3 justify-between">
          <Input
            name="objectLocation"
            label="Obyektin ünvanı"
            inputLabelclassName="h-14"
            onChange={(v) =>
              handleChangeField(v, "objectLocation", "buildingLocationInfo")
            }
          />
          <Select
            name="objectArea"
            data={areas || []}
            label="Ərazi"
            className="w-52"
            classNameSelect="h-14"
            onChange={(v) => (
              setObjectArea(v.id),
              handleChangeField(v.name, "objectArea", "buildingLocationInfo"),
              v.id
            )}
          />
        </div>
        {!objectArea && objectArea !== null && objectArea !== undefined ? (
          <p className="relative flex items-center gap-x-4 px-4 border focus-within:border-[#D2AB67] border-solid rounded-lg bg-[#F5F5F5] border-gray-200 h-14">
            {passportByid?.objectDec}
          </p>
        ) : (
          areas?.map((item) => (
            <>
              {objectArea === item.id && (
                <p
                  key={item.id}
                  className="relative flex items-center gap-x-4 px-4 border focus-within:border-[#D2AB67] border-solid rounded-lg bg-[#F5F5F5] border-gray-200 h-14"
                >
                  {item.description}
                </p>
              )}
            </>
          ))
        )}
      </div>
      <Controller
        control={methods.control}
        name="location"
        render={({ field: { value, onChange } }) => (
          <MapComponent
            value={value}
            onChange={onChange}
            onAddressChange={(val) => {
              onChange(val);
              handleChangeField(val?.name ?? "", "location", "attachments");
            }}
          />
        )}
      />
    </div>
    <div>
      <h6 className="text-16px500">Obyektin təyinatı</h6>
      <Controller
        control={methods.control}
        name="objectDesignation"
        render={({ field: { value, onChange } }) => (
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
              handleChangeField(
                obj.name,
                "objectDesignation",
                "buildingLocationInfo"
              );
            }}
          />
        )}
      />
    </div>
    <div>
      <h6 className="text-16px500">Mədəniyyət abidəsi</h6>
      <Controller
        control={methods.control}
        name="dismantlingPossible"
        render={({ field: { value, onChange } }) => (
          <Radio
            dataError="dismantlingPossible"
            data={radios.culturalMonuments || []}
            value={+value}
            option={(val) => (
              <Radio.Option
                Icon={null}
                data={val}
                radioOptionClasses={`md:w-1/2 w-full focus-within:border-[#D2AB67]`}
              />
            )}
            onChange={(obj) => {
              setCultural(obj.id);
              onChange(Boolean(obj.id));
              methods.setValue("culturalMonument", null);
            }}
          />
        )}
      />
    </div>
    {(cultural == 1 || Number(methods.getValues("dismantlingPossible"))) && (
      <div className="flex gap-x-4">
        <Select
          name="culturalMonument"
          data={culturalMonuments || []}
          label="Mədəniyyət abidəsi"
          classNameSelect="h-14"
          onChange={(v) =>
            handleChangeField(v.name, "landProperty", "buildingLocationInfo")
          }
        />
      </div>
    )}
    <div>
      <h6 className="text-16px500 pb-3">Obyektin mülkiyyət növü</h6>
      <div className="flex gap-x-4">
        <Select
          name="landProperty"
          data={landPropertyshipTypes || []}
          label="Torpaq üzrə"
          classNameSelect="h-14"
          onChange={(v) =>
            handleChangeField(v.name, "landProperty", "buildingLocationInfo")
          }
        />
        <Select
          name="buildingProperty"
          data={buildingPropertyTypes || []}
          label="Tikili üzrə"
          classNameSelect="h-14"
          onChange={(v) =>
            handleChangeField(v.name, "buildingProperty", "buildingLocationInfo")
          }
        />
      </div>
    </div>
    <div>
      <h6 className="text-16px500 pb-3">Obyekt üzərində hüququn növü</h6>
      <div className="flex gap-x-4">
        <Select
          name="landPropertyOfLawType"
          data={landOwnershipTypes || []}
          label="Torpaq üzrə"
          classNameSelect="h-14"
          onChange={(v) =>
            handleChangeField(v.name, "landPropertyOfLawType", "buildingLocationInfo")
          }
        />
        <Select
          name="buildingPropertyOfLawType"
          data={buildingOwnershipTypes || []}
          label="Tikili üzrə"
          classNameSelect="h-14"
          onChange={(v) =>
            handleChangeField(v.name, "buildingPropertyOfLawType", "buildingLocationInfo")
          }
        />
      </div>
    </div>
  </div>

};

export default ObjectPlaceInfoForm;
