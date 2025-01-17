
// General Layout Components
import CardLayout from "@/Components/Layout/CardLayout";

// Dashboard components
import DashboardTopStats from "./DashBoardElements/DashboardTopStats";
import DashboardCompanieEmployees from "./DashBoardElements/DashboardCompanieEmployees";
import DashboardLastOffers from "./DashBoardElements/DashboardLastOffers";
import DashboardSectorOffers from "./DashBoardElements/DashboardSectorOffers";

function Dashboard() {

    ////////////////
    // JSX
    return (

        <CardLayout css={`w-full flex-row flex flex-wrap`}>

            <DashboardTopStats />

            <DashboardCompanieEmployees />

            <DashboardLastOffers />

            <DashboardSectorOffers />

        </CardLayout>
    );
}

export default Dashboard;   