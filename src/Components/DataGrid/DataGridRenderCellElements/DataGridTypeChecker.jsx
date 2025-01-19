import { getColors } from "@functions/getColors";

function DataGridTypeChecker({ type, userTypeGuid }) {

    const color = getColors(userTypeGuid)

    ////////////////
    // JSX
    return (

        <div className={`w-full`}>

            <div className={`h-[20px] mt-1 border-small`}>

                <p className={`flex w-full`}>

                    <span className={`pr-1 text-4xl leading-[unset] text-${color}-500`}>
                        &#8226;
                    </span>

                    <span>{type}</span>

                </p>

            </div>

        </div>
    );
}

export default DataGridTypeChecker

