
import CardLayout from "@/Components/Layout/CardLayout";
import DashboardTopStats from "./DashBoardElements/DashboardTopStats";
import { fetchData } from "./DashboardFetchs/getDashboardData";
import useTransformPromise from "@/Hooks/Common/useTransformPromise";
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

function Dashboard() {

    const fetchUrl = `${import.meta.env.VITE_APP_FAKE_DATA}/Dashboard.json`

    const { data } = useTransformPromise(() => fetchData(fetchUrl), dataRefs.dashboardDispatch);

    return (

        <CardLayout>

            <DashboardTopStats data={data.topStats} />

        </CardLayout>
    );
}

export default Dashboard;   