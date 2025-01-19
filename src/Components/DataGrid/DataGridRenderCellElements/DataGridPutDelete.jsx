import { useState, useEffect } from "react";

import ModalGeneric from "@layoutElems/Modals/ModalGeneric";

import useSubmit from "@commonHooks/useSubmit"

import DataGridModalDel from "./DataGridModalDel";
import DataGridModalPut from "./DataGridModalPut";

import { inclusionListModifyDataGrid } from "../../../../JSON/GeneralArray";
import { formatDateToYYYYMMDD } from "@functions/formatingData";

import { dataRefs } from "@dataRefs/GlobalTextArray";
import { notifyError, notifySuccess } from "@functions/notifications";

function DataGridPutDelete({
    guid,
    endPoint = "",
    delPoint = "",
    row,
    delDisplay,
    putDisplay,
    addInputTitle,
    refresh,
    modifyRight,
    deleteRight,
}) {

    ////////////////
    // Setters for the modals
    const [putModal, setPutModal] = useState(false)
    const [delModal, setDelModal] = useState(false)

    ////////////////
    // Setters for the data we modify
    const [modifyData, setModifyData] = useState([])

    ////////////////
    // Create a new object that only includes keys that exist in putDisplay
    useEffect(() => {

        let newModifyData = {};

        if (putDisplay) {

            putDisplay.forEach((item) => {

                if (row.hasOwnProperty(item.name) && item.type !== "customSelector") {
                    if (item.name.toLowerCase().includes("date")) {
                        newModifyData[item.name] = formatDateToYYYYMMDD(new Date(row[item.name]))
                    } else {
                        newModifyData[item.name] = row[item.name];
                    }

                } else if (row.hasOwnProperty(item.GUID) && (item.type === "customSelector" || item.type === "dataGrid")) {
                    newModifyData[item.GUID] = row[item.GUID];
                }

            });

            inclusionListModifyDataGrid.forEach((key) => {

                if (row.hasOwnProperty(key)) {
                    newModifyData[key] = row[key];
                }

            });
        }

        // Update modifyData
        setModifyData(newModifyData);
        // eslint-disable-next-line
    }, [row, putDisplay]);

    const putGuid = putDisplay.find((item) => item.putGUID).putGUID

    ////////////////
    // General Submit : for DELETE and PUT
    const {
        handleSubmit,
        resMsg
    } = useSubmit()

    const {
        handleSubmit: delSubmit,
        resMsg: delresMsg,
        error: errorDelResMsg,
        setError: setErrordelMessage
    } = useSubmit()

    const handlePutModal = e => {

        // Everybody get this !
        const commonFields = {
            e,
            url: `${import.meta.env.VITE_APP_API}/api/${endPoint}`,
            method: "PUT"
        };

        let makeBody = {}
        if (endPoint === dataRefs.entity_ROUTE) {
            makeBody = {
                [putGuid]: guid,
                ...modifyData,
                ordre_affichage: 99
            }
        } else {
            makeBody = {
                [putGuid]: guid,
                ...modifyData
            }
        }

        // The real handleSubmit please stand up
        handleSubmit({
            ...commonFields,
            body: makeBody,
            userNeeded: false,
        });
    };

    const handeDelModal = e => {
        delSubmit({
            e,
            url: `${import.meta.env.VITE_APP_API}/api/${endPoint}?${delPoint}=${guid}`,
            method: "DELETE",
            userNeeded: false,
        })
    }

    useEffect(() => {
        if (errorDelResMsg) notifyError(dataRefs.modificationImpossible)

        const timeoutId = setTimeout(() => setErrordelMessage(""), 1500)
        return () => {
            clearTimeout(timeoutId)
        }
        // eslint-disable-next-line
    }, [errorDelResMsg])


    //http://localhost:8000/api/Clients_Adresses_Types?adresseTypeGuid=22531e61-047d-4531-bbd4-1c4f72efd082

    useEffect(() => {

        if (resMsg && resMsg.ok) {
            notifySuccess(dataRefs.putSuccess)
            refresh()
        }
        // eslint-disable-next-line
    }, [resMsg])

    useEffect(() => {
        if (delresMsg && delresMsg.ok) {
            notifySuccess(dataRefs.delSuccess)
            refresh()
        }
        // eslint-disable-next-line
    }, [delresMsg])

    ////////////////
    // JSX
    return (
        <>

            <div className={`row place-content-center centered w-full`}>

                {putDisplay &&

                    <dataRefs.editIcon
                        className={`text-grey-500 datagrid-icons pr-1 ${modifyRight ? "cursor-pointer" : "cursor-not-allowed text-error"}`}
                        onClick={e => {
                            e.stopPropagation()
                            modifyRight && setPutModal(c => !c)
                        }} />
                }

                {delDisplay &&

                    <dataRefs.closeIcon
                        className={`text-error-500 datagrid-icons ${deleteRight ? "cursor-pointer" : "cursor-not-allowed text-error "}`}
                        onClick={e => {
                            e.stopPropagation()
                            deleteRight && setDelModal(c => !c)
                        }} />
                }

            </div>


            <ModalGeneric
                isOpen={putModal}
                width={"min-w-[25%] max-w-[25%]"}
                title={`${dataRefs.modify} ${addInputTitle}`}
                handleClose={() => setPutModal(c => !c)}>

                {modifyData &&

                    <DataGridModalPut
                        handlePutModal={handlePutModal}
                        handleCancel={() => setPutModal(c => !c)}
                        setModifyData={setModifyData}
                        modifyData={modifyData}
                        putDisplay={putDisplay} />
                }

            </ModalGeneric>

            <ModalGeneric
                isOpen={delModal}
                width={"min-w-[20%] max-w-[20%]"}
                title={`${dataRefs.del} ${addInputTitle}`}
                handleClose={() => setDelModal(c => !c)}>

                <DataGridModalDel
                    handeDelModal={handeDelModal}
                    handleCancel={() => setDelModal(c => !c)}
                    data={row}
                    delDisplay={delDisplay} />

            </ModalGeneric>

        </>

    );

}

export default DataGridPutDelete;