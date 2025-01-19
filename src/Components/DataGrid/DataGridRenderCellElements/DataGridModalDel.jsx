import CardLayout from "../../Layout/CardLayout";
import Btn from "@basicElems/Btn";
import Text from "@basicElems/Text";
import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridModalDel({
    handeDelModal,
    handleCancel,
    data,
    delDisplay,
}) {

    ////////////////
    // JSX
    return (

        <CardLayout css={`w-full col items-center`} bg={`bg-primary-bg`}>

            {delDisplay ?

                <>
                    <div className={`h-[10vh]`}>

                        <Text css={`mt-3 place-content-center`}>

                            {delDisplay.map((element, index) => (

                                <span key={index}><>{" "}</>

                                    {data?.[element.key] && <>{" "}</>}

                                    <span>{element.name}</span>

                                    {data?.[element.key] && <>{" "}</>}
                                    {element.name && <>{" "}</>}

                                    <span className={`font-bold`}>{data?.[element.key]}</span>

                                    {data?.[element.key] && <>{" "}</>}

                                </span>

                            ))}

                        </Text>

                    </div>

                    <div className={`row items-center mt-2 justify-between w-6/12`}>

                        <Btn handleClick={handleCancel}>
                            {dataRefs.abord}
                        </Btn>

                        <Btn handleClick={handeDelModal}
                            btnType={`red-color`}>
                            {dataRefs.del}
                        </Btn>

                    </div>
                </>

                :

                <>WIP</>

            }

        </CardLayout>

    );
}

export default DataGridModalDel;