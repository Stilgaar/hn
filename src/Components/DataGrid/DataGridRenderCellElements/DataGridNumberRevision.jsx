import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridNumberRevision({ row }) {

    ////////////////
    // JSX
    return (
        <>

            <span className={`fb-b`}>
                {row[dataRefs.estimateNumber_Key]}
            </span>

        </>

    );
}

export default DataGridNumberRevision;