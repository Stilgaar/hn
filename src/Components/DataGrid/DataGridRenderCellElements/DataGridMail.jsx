import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridMail({
    mail,
    pos = 'items-center'
}) {

    if (!mail) return <div className={`${pos}`}>-</div>

    const encodedSubject = encodeURIComponent(`Bonjour`);
    const encodedBody = encodeURIComponent("Bonjour,");
    const mailto = `mailto:${mail}?subject=${encodedSubject}&body=${encodedBody}`;

    ////////////////
    // JSX
    return (

        <span className={`td-span cursor-pointer text-hover-primary-color-1 row ${pos}`}>

            <>

                <span className={`pr-1`}>

                    <dataRefs.mailIcon size={20} />

                </span>

                <a href={mailto}>
                    {mail}
                </a>

            </>

        </span>

    );
}

export default DataGridMail;