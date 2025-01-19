// React inbuild hooks
import { useState, useMemo, useEffect } from "react";

// Global user personal hook
import { useUsersContext } from "@/Context/UserContext/UserContext"

// personal fetch hook
import useFetch from "@commonHooks/useFetch";

// // Error Layout
import ErrorLayout from "@layoutElems/ErrorLayout";

// ModalLayout
import ModalGeneric from "@layoutElems/Modals/ModalGeneric";

// Component to show the element
import DataGridDisplayDocumentsPics from "./DataGridDisplayDocumentsPics";

// Icon to open the file
import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridSeeFilesWithCall({
    addCss = "",
    documentKey,
    mime,
    endPoint,
    title,
    GUID,
    num = 1,
    array,
    oldData,
}) {


    ////////////////
    // Modal open or closed
    const [modal, setModal] = useState(false)
    const [dl, setDl] = useState(false)

    ////////////////
    // Check if in dev or prod
    const { usersState } = useUsersContext()
    const { userGuid } = usersState

    ////////////////
    // GETS documents from API
    const apiUrlFetchDocument = useMemo(() => {

        if (Array.isArray(array)) {
            return dataRefs.useLocal
                ? `${import.meta.env.VITE_APP_FAKE_DATA}/FakeDocument.json`
                : array.map(element => `${import.meta.env.VITE_APP_API}${endPoint}/${element[GUID]}`
                );
        } else {
            return dataRefs.useLocal
                ? `${import.meta.env.VITE_APP_FAKE_DATA}/FakeDocument.json`
                : `${import.meta.env.VITE_APP_API}${endPoint}/${GUID}`;
        }

    }, [array, dataRefs.useLocal, endPoint, GUID]);

    ////////////////
    // Fetching single file
    const {
        data: fileFetchDoc,
        pending: pendingFetchDoc,
        error: errorFetchDoc,
        setError: setErrorFetchDoc
    } = useFetch(apiUrlFetchDocument, modal)

    ////////////////
    // Fetching for download
    const { data: fileFetchDocDl } = useFetch(apiUrlFetchDocument, dl)

    useEffect(() => {

        if (fileFetchDocDl) {

            const mimeType = fileFetchDocDl[`${mime}`];
            const documentType = fileFetchDocDl[`${documentKey}`]; // Updated
            const filename = fileFetchDocDl[`${title}`] || 'downloaded_file';
            const file = `data:${mimeType};base64,${documentType}`;

            let a = document.createElement('a'); // Now 'document' refers to the global object
            a.href = file;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

    }, [fileFetchDocDl])

    ////////////////
    // Loading 
    if (pendingFetchDoc && !!fileFetchDoc) return <>...</>

    ////////////////
    // Error Handling
    if (errorFetchDoc)

        return (

            <ErrorLayout
                error={errorFetchDoc}
                setError={() => {
                    setModal(false)
                    setErrorFetchDoc()
                }} />

        )

    ////////////////
    // JSX
    return (

        <>

            {oldData?.[dataRefs.estimateRestrictedDistribution_Key]
                && oldData?.[dataRefs.estimateRestrictedDistributionUserList_Key].length > 0
                && !oldData?.[dataRefs.estimateRestrictedDistributionUserList_Key]?.some(item => item.utilisateur_guid === userGuid)

                ?

                <dataRefs.cancelIcon className={`cursor-not-allowed text-error-500`} />

                :

                <div className={`row ${addCss}`}>
                    <div className={`flex items-center ${!num ? '' : 'cursor-pointer'}`}
                        onClick={e => {
                            e.stopPropagation()
                            if (!num) return
                            setModal(c => !c)
                        }} >

                        <dataRefs.filePresentIcon />

                    </div>

                    {/* New onClick for direct download */}
                    <div className={`flex items-center ${!num ? "" : "cursor-pointer"}`}
                        onClick={e => {
                            e.stopPropagation()
                            if (!num) return
                            setDl(c => !c)
                        }}>

                        <dataRefs.downloadIcon />

                    </div>

                </div>
            }


            <ModalGeneric
                width={`w-max-[80vw] h-[80vh]`}
                title={"Document"}
                isOpen={modal && fileFetchDoc}
                handleClose={() => setModal(c => !c)}>

                {Array.isArray(apiUrlFetchDocument) ?

                    <>
                        {fileFetchDoc && fileFetchDoc.length > 0 &&

                            <>
                                {fileFetchDoc.map((element, index) => (

                                    <DataGridDisplayDocumentsPics
                                        key={index}
                                        title={element[`${title}`]}
                                        document={element[`${documentKey}`]}
                                        mime={element[`${mime}`]} />

                                ))}
                            </>

                        }


                    </>

                    :

                    <>
                        {fileFetchDoc &&

                            <DataGridDisplayDocumentsPics
                                title={fileFetchDoc[`${title}`]}
                                document={fileFetchDoc[`${documentKey}`]}
                                mime={fileFetchDoc[`${mime}`]} />

                        }

                    </>

                }

            </ModalGeneric>

        </>

    );
}

export default DataGridSeeFilesWithCall;