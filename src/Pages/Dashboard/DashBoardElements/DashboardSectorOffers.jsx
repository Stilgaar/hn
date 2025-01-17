// all the texts icons etc
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

// wrapper for the dashboard elements so they're all the same
import DashboardElementsWrapper from "../DashboardSharedElements/DashboardElementsWrapper";

function DashboardSectorOffers() {

    ////////////////
    // JSX
    return (

        <DashboardElementsWrapper title={dataRefs.dashboarSectorOfferTitle} width={`w-3/12`}>

        </DashboardElementsWrapper>

    );
}

export default DashboardSectorOffers;