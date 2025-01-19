import DataGridPhone from "../DataGridPhone";

function DataGridContactPhonesList({
    phoneList
}) {

    if (!phoneList?.length) return <>-</>

    ////////////////
    //  JSX
    return (

        <div className={`col`}>

            {phoneList.map((phone, index) => (

                <DataGridPhone key={index} phone={phone} />

            ))}

        </div>
    );
}

export default DataGridContactPhonesList;