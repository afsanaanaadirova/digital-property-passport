import FileInput from "@/ui/shared/NewFileInput";
import ObjectAttachmentsInfoFormVM from "./object_attachments_info_form.vm";
import { ObjectAttachmentsInfoFormProps } from "./object_attachments_info_form.type";


const ObjectAttachmentsInfoForm = ({ handleChangeField, methods }: ObjectAttachmentsInfoFormProps) => {
    const { updateFileNames,
        existingFileNames,
        passportFiles,
        setUploadLoading,
        setDeleteIds,
        uploadSuccess } = ObjectAttachmentsInfoFormVM({ methods })
    return (
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
                                    const test =
                                        existingFileNames.length === 4 ? true : null;
                                    handleChangeField(
                                        test as unknown as string,
                                        "passportFiles",
                                        "attachments"
                                    );
                                }}
                                onchangeFile={() => {
                                    if (!existingFileNames.includes(file.name)) {
                                        updateFileNames(file.name, false);
                                    }
                                    const test =
                                        existingFileNames.length === 4 ? true : null;
                                    handleChangeField(
                                        test as unknown as string,
                                        "passportFiles",
                                        "attachments"
                                    );
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ObjectAttachmentsInfoForm
