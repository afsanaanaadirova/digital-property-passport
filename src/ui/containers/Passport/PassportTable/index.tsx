import { TableContainer } from "@/ui/shared/Table/TableContainer"
import Modal from "@/ui/shared/Modal";
import Loading from "@/ui/shared/Loading";
import { PassportTableVM } from "./passport_table.vm"

export const PassportTable = () => {
  const {
    ordersTHead,
    passportTablaData,
    tableState,
    setCurrentPage,
    currentPage,
    modalContent,
    setModalVisible,
    modalVisible,
    loading
  } = PassportTableVM();
  return (
    <>
      {loading ? <Loading /> :
        <TableContainer
          tHeadData={ordersTHead}
          tableData={passportTablaData ? passportTablaData.datas : []}
          state={tableState}
          pagination={{
            totalCount:
              Math.ceil(passportTablaData?.total / passportTablaData?.size) ??
              0,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            size: 1,
          }}
        />
      }
      <Modal
        title={modalContent.title}
        visible={modalVisible}
        setVisible={setModalVisible}
        hasClose
        dialogClassName={modalContent.dialogClassName}
        dialogClassNameHeader="sticky top-[-32px] z-[999999] bg-white pt-2"
      >
        {modalContent.content}
      </Modal>
    </>
  )
}
