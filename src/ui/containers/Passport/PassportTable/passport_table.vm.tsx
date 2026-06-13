import { ETable } from "@/ui/shared/Table/e_table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Popover from "@/ui/shared/Popover";
import ThreeeDotsIcon from "@svg/fi_more-horizontal.svg?react";
import { useDeletePassport, useGetAllPassport } from "@/app/api/passport.api";
import Button from "@/ui/shared/Button";
import { handlePrivigeles } from "@/app/utils/actions";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const PassportTableVM = () => {
  const navigate = useNavigate();
  const [popOverOpen, setPopOverOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("index")) || 1
  );
  const [pageSize] = useState<number>(
    Number(searchParams.get("size")) || 5
  );

  useEffect(() => {
    searchParams.set("index", currentPage.toString());
    searchParams.set("size", pageSize.toString());
    setSearchParams(searchParams);
  }, [currentPage]);

  const { data: passportTablaData, isLoading: loading } = useGetAllPassport(
    "?" + new URLSearchParams(searchParams).toString()
  );

  const deletePassport = useDeletePassport();
  const itemsLength = passportTablaData?.datas?.length || 0;
  const tableState = itemsLength === 0 ? ETable.NODATA : ETable.READY;
  const initialModalContent = {
    title: "",
    content: null as JSX.Element | null,
    dialogClassName: "",
  };
  const [modalContent, setModalContent] = useState(initialModalContent);
  const deleteHandler = (id: number) => {
    deletePassport.mutate(id!, {
      onSuccess: () => {
        setModalVisible(false);
        snackbar(SnackbarStatusEnum.SUCCESS, "Uğurla silindi");
      },
      onError(error: any) {
        if (error.response.status === 400) {
          snackbar(SnackbarStatusEnum.ERROR, error.response.data.Detail);
        }
      }
    });
  };

  const handleClickPrivilege = (id: number, passportId: number) => {
    let title = "";
    let content = null;
    let dialogClassName = "";
    let type = id;
    switch (type) {
      case 1:
        navigate(`/passports/${passportId}/view`);
        break;
      case 2:
        navigate(`/passports/${passportId}/update`);
        break;
      case 3:
        title = "Pasportu sil";
        dialogClassName = "w-full md:w-[736px]  overflow-y-auto pt-2";
        content = (
          <>
            <p className="pt-4">
              Şablonu silmək istədiyinizə əminsiniz? Silindikdən sonra bərpa
              etmək mümkün olmayacaq
            </p>
            <div className="flex justify-between gap-x-4 pt-6">
              <Button
                onClick={() => setModalVisible(false)}
                className="rounded-[10px] bg-white text-gray-800 border border-gray-800 w-full"
              >
                İmtina
              </Button>{" "}
              <Button
                isLoading={deletePassport.isPending}
                className="rounded-[10px] bg-gray-800 text-white w-full"
                onClick={() => deleteHandler(passportId)}
              >
                Təsdiqlə
              </Button>
            </div>
          </>
        );
        setModalVisible(true);
        break;
      default:
        break;
    }
    setModalContent({ title, content, dialogClassName });
  };
  const ordersTHead = [
    {
      id: 1,
      width: "5px",
      name: "",
      key: [""],
      className: "w-[5px]",
      render: (rowData: any) =>
        rowData.status === true ? (
          <span className="absolute bg-[#BE9753] w-[3px] h-[40px] rounded-[2px] top-[10px] left-0" />
        ) : null,
    },
    {
      id: 2,
      width: "1px",
      name: "Pasport nömrəsi",
      key: ["passportNumber"],
      className: "w-[122px]",
    },
    {
      id: 3,
      width: "80px",
      name: "Obyekt sahibi",
      key: ["ownerName"],
      className: "w-[192px]",
    },
    {
      id: 4,
      width: "260px",
      name: "FİN / VÖEN",
      key: ["finOrVoen"],
      className: "w-[122px]",
    },
    {
      id: 5,
      width: "180px",
      name: "Ünvan",
      key: ["address"],
      className: "w-[256px]",
    },
    {
      id: 6,
      width: "180px",
      name: "Təyinatı",
      key: ["destination"],
      className: "w-[120px]",
    },
    {
      id: 7,
      width: "30px",
      name: "Mülkiyyət növü (torpaq üzrə / tikili üzrə)",
      key: ["ownershipType"],
      className: "w-[150px]",
    },
    {
      id: 8,
      width: "200px",
      name: "Hüquq növü (torpaq üzrə / tikili üzrə)",
      key: ["propertyType"],
      className: "w-[150px]",
    },
    {
      id: 9,
      width: "",
      name: "",
      key: [""],
      className: "w-[60px]",
      render: (rowData: any) => {
        return (
          <Popover
            setPopOverOpen={setPopOverOpen}
            popOverOpen={popOverOpen}
            popoverClassName="static"
            panelClassName="right-4 w-full "
            popoverButtonClassName="w-7 h-7 bg-gray-300 rounded-full relative "
            button={
              <ThreeeDotsIcon className="text-center absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2" />
            }
          >
            <div
              className="modal bg-white right-[1%] top-[-4px] mt-3 z-20  absolute p-4 rounded-[10px] border border-gray-200 after:absolute after:border-t-0 after:border-b-10 after:border-solid border-b-white after:top-[-6%] after:right-[11px] after:content-['']
                  after:w-0  after:h-0 
          after:border-l-[8px] after:border-l-transparent
          after:border-b-[8px] after:border-white
          after:border-r-[8px] after:border-r-transparent shadow-[0px_6px_24px_0px_#44444414]"
            >
              <ul className="flex flex-col gap-y-3 cursor-pointer">
                {handlePrivigeles(rowData?.actions).map(
                  (action: any) => (
                    <li
                      key={action.id}
                      className="flex gap-x-3"
                      onClick={() => {
                        handleClickPrivilege(action.id, rowData.id);
                      }}
                    >
                      {action.icon}
                      <>
                        {action.value}
                      </>
                    </li>
                  )
                )}
              </ul>
            </div>
          </Popover>
        );
      },
    },
  ];
  return {
    ordersTHead,
    passportTablaData,
    tableState,
    setCurrentPage,
    currentPage,
    modalContent,
    setModalVisible,
    modalVisible,
    loading
  }
}
