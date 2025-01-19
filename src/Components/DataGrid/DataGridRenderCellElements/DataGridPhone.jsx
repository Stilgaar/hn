import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridPhone({
    phone,
    pos = 'items-center'
}) {

    if (!phone) return <div className={`${pos}`}>-</div>

    ////////////////
    // JSX
    return (

        <span className={`td-span cursor-pointer !hover:text-primary-color-1 row ${pos}`}>

            <>

                <span className={`pr-1`}>
                    <dataRefs.phoneIcon size={20} />
                </span>

                <a href={`tel:${phone}`}>
                    {phone}
                </a>

            </>

        </span>

    );
}

export default DataGridPhone;