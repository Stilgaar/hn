
import CardLayout from "@/Components/Layout/CardLayout";
import DashboardTopStats from "./DashBoardElements/DashboardTopStats";
import useTransformPromise from "@/Hooks/Common/useTransformPromise";
import { dataRefs } from "@/JSONS/Fr-Texts/GlobalTexts";

function Dashboard() {

    // const fetchUrl = `${import.meta.env.VITE_APP_FAKE_DATA}/Dashboard.json`
    const fetchUrl = 'https://fakestoreapi.com/products/3'

    const { data, refetch } = useTransformPromise(fetchUrl, dataRefs.dashboardDispatch);

    console.log(data)

    return (

        <CardLayout>

            {/* <DashboardTopStats data={data.topStats} /> */}

            <button onClick={refetch}>BTN</button>

        </CardLayout>
    );
}

export default Dashboard;   