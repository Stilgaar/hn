import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridClientCodeFormatter({ code }) {
    return (

        <>{dataRefs.clientPrefix}{code}</>

    );
}

export default DataGridClientCodeFormatter;