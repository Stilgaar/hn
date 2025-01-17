// Simple components
import Title from "@/Components/Basic/Title";

// Layout component
import CardLayout from "@/Components/Layout/CardLayout";

function DashboardElementsWrapper({ title, width, children }) {

    ////////////////
    // JSX
    return (

        <CardLayout css={width}>

            <CardLayout css={`w-full p-1 rounded-l-lg shadow`}>

                <Title text={title} El={`h4`} css={`uppercase font-bold text-sm`} />

                {children}

            </CardLayout>

        </CardLayout>
    );
}

export default DashboardElementsWrapper;