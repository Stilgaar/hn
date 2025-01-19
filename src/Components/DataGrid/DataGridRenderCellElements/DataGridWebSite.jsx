import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridWebSite({
    link,
    pos = "items-center"
}) {

    if (!link) return <>-</>

    const makeLink = link.startsWith('http') ? link : `https://${link}`

    const displayLink = link.startsWith('https://') || link.startsWith('http://')
        ? link.replace(/^(https?:\/\/)/, '')
        : link;

    return (

        <span className={`td-span cursor-pointer text-hover-primary-color-1 row ${pos}`}>

            <>
                <span className={`pr-1`}>

                    <dataRefs.www size={20} />

                </span>

                <a href={makeLink}
                    target="_blank"
                    className={`pb-025`}
                    rel="noopener noreferrer">

                    {displayLink}

                </a>
            </>

        </span>

    );
}

export default DataGridWebSite;