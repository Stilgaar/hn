/**
 * `DataGridSeeFiles` - A component for viewing and downloading files in a data grid.
 * This component provides functionality to view different types of files (like images, PDFs, and documents)
 * associated with a particular row in the data grid. It uses a modal layout to display the content of the file.
 * The component also includes functionality to download document-type files.
 *
 * @component
 * 
 * @param {Object} row - The data corresponding to a specific row in the data grid.
 *                       This data includes the `documentFormFile` object, which contains the file to be viewed or downloaded.
 * 
 * @returns {React.Element} - A set of icons corresponding to the file type (image, PDF, document) in the given row.
 *                            Clicking on an icon either sets the file to be viewed in a modal (for images and PDFs)
 *                            or triggers the file download function (for documents).
 *
 * @example
 * <DataGridSeeFiles
 *   row={row}
 * />
 */

// React in build hooks
import { useState, useEffect } from "react";

import { dataRefs } from "@dataRefs/GlobalTextArray";

import { handleDownloadFile } from "@functions/handleDownloadFile";

// Modal to see the files
import ModalGeneric from "@layoutElems/Modals/ModalGeneric";

// Fucnction to get the files types.
import { getFileType } from "@functions/getFileType";
import Btn from "@basicElems/Btn";

function DataGridSeeFiles({
    row
}) {

    const { type } = row.documentFormFile

    const fileType = getFileType(type);

    const [selectedFile, setSelectedFile] = useState()
    const [fileDataURL, setFileDataURL] = useState()

    useEffect(() => {

        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            setFileDataURL(event.target.result);
        };

        if (selectedFile && selectedFile.documentFormFile) {
            fileReader.readAsDataURL(selectedFile.documentFormFile);
        }

    }, [selectedFile])


    ////////////////
    // JSX
    return (

        <>

            {fileType === "Image" ?

                <dataRefs.insertPhotoIcon
                    className="cursor-pointer"
                    onClick={e => {
                        e.stopPropagation()
                        setSelectedFile(row)
                    }} />

                : fileType === "PDF" ?

                    <dataRefs.picturesAsPdfIcon
                        className="cursor-pointer"
                        onClick={e => {
                            e.stopPropagation()
                            setSelectedFile(row)
                        }} />

                    :

                    <dataRefs.filePresentIcon
                        className="cursor-pointer"
                        onClick={() => handleDownloadFile(row.documentFormFile)} />
            }


            <ModalGeneric
                width={`w-90 h-90`}
                title={dataRefs.displayName}
                isOpen={selectedFile}
                handleClose={() => setSelectedFile()}
            >

                <div className={`row`}>

                    {fileDataURL?.includes("image") &&

                        <div>
                            <img src={fileDataURL} alt="Selected" />
                        </div>

                    }

                    {fileDataURL?.includes("data:application/pdf") &&

                        <div>
                            <iframe src={fileDataURL} title={`document reader pdf`} className={`h-[80vh] w-[60vw]`} />
                        </div>

                    }

                    <Btn cssDiv={`flex ai-start justify-end`}
                        handleClick={() => setSelectedFile()}>
                        {dataRefs.close}
                    </Btn>


                </div>

            </ModalGeneric>
        </>



    );
}

export default DataGridSeeFiles;