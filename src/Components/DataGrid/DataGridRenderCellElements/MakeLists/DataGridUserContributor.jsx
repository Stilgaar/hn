import { dataRefs } from "@/JSON/Fr/GlobalTextArray";

function DataGridUserContributor({ userList }) {
    if (!userList?.length) return <>-</>

    return (

        <div className={`col`}>

            {userList.map((user, index) => (

                <p className={`td-span text-xs cursor-pointer`}
                    key={index}>

                    {user[dataRefs.userName_Key]}

                </p>

            ))}

        </div>

    );
}

export default DataGridUserContributor;