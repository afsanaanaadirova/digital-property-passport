import Button from "@/ui/shared/Button"
import PlusSvg from "@svg/plusSvg.svg?react";
import { PassportFilter } from "./PassportFilter"
import { PassportTable } from "./PassportTable"
import PassportContainerVm from "./passport.vm";

export const PassportContainer = () => {
    const { navigate } = PassportContainerVm()
    return (
        <div className="px-8">
            <div className="flex justify-between pb-6 pt-8">
                <h3 className="text-36px600 text-gray-800">Passports</h3>
                <Button
                    onClick={() => navigate("/passports/create")}
                    className="rounded-[10px] bg-[#D2AB67] py-[10px] text-black"
                >
                    New Passport <PlusSvg className="ml-2" />
                </Button>
            </div>
            <PassportFilter />
            <PassportTable />
        </div>
    )
}
