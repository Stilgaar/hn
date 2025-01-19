import { useContext } from "react";
import { BuisnessBARefreshContext } from "@/Components/Pages/Buisness/Buisness";

// All the texts, infos and stuff
import { dataRefs } from "@/JSON/Fr/GlobalTextArray";

// toggle context
import { useToggleContext } from "@/Context/ToggleContext/ToggleContext";
// open and close modals
import { openAndCloseModals } from "@/Hooks/StateManagement/toggleState/toggleDispatch";

// Modal Global Layout
import ModalGeneric from "../../Layout/Modals/ModalGeneric";

import { buisnessBAModalInput } from "@/JSON/Fr/BuisnessArray";
import PageModify from "../../Layout/PageInfoGenericPages/PageModify";

//This is a component to add users and services 
function DataGridBuisnessBAaddUsers({ row }) {

    const { toggleState, toggleDispatch } = useToggleContext()
    const { modalOpener } = toggleState

    const { buisnessBARefresh } = useContext(BuisnessBARefreshContext)

    const buisnessBANumber = row[dataRefs.buisnessBAEstimateNumber_Key]

    const tempDispatchType = `${dataRefs.buisnessBADispatchType}-${buisnessBANumber}`
    const inThisModal = modalOpener?.[`${tempDispatchType}_modify`]

    const handleOpenModal = () => toggleDispatch(openAndCloseModals(`${tempDispatchType}_modify`))

    const makePostArray = [{
        inputs: buisnessBAModalInput,
        inputSelectorCustomCss: "mt-9 h-[40vh] w-full",
    }]

    ////////////////
    // JSX
    return (

        <>

            <dataRefs.smartButtonIcon className={`cursor-pointer centered`} onClick={handleOpenModal} />

            <ModalGeneric
                isOpen={inThisModal}
                handleClose={handleOpenModal}>

                <PageModify
                    heightCard={`h-[25vh]`}
                    makePostArray={makePostArray}
                    dispatchType={tempDispatchType}
                    modify={true}
                    data={row}
                    olData={row}
                    route={dataRefs.buisnessBA_ROUTE}
                    refresh={buisnessBARefresh}
                />

            </ModalGeneric>

        </>

    );
}

export default DataGridBuisnessBAaddUsers;