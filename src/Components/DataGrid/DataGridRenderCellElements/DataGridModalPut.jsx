// Layout component
import CardLayout from "../../Layout/CardLayout";

// Simple component
import Btn from "@basicElems/Btn";

// All the texts and icons
import { dataRefs } from "@dataRefs/GlobalTextArray";

function DataGridModalPut({
    handlePutModal,
    handleCancel,
    setModifyData,
    modifyData,
    putDisplay,
}) {


    const [{ name, label }] = putDisplay

    ////////////////
    // JSX
    return (

        <CardLayout css={`w-full col items-center relative`} p={``} bg={`bg-primary-bg`}>

            <input
                id={`${name}-${label}`}
                className={dataRefs.inputTail}
                name={name}
                value={modifyData[name]}
                onChange={(e) => {
                    setModifyData(data => ({ ...data, [e.target.name]: e.target.value }))
                }}
                autoComplete={`off`}
                autoCorrect={`off`}
                spellCheck={`false`}
            />

            <label htmlFor={`${name}-${label}`} className={dataRefs.labelTail}>
                {label}
            </label>

            <div className={`row items-center mt-2 justify-between w-6/12`}>

                <Btn handleClick={handleCancel}
                    btnType={`reset-color`}>

                    {dataRefs.abord}

                </Btn>

                <Btn handleClick={() => handlePutModal()}
                    btnType={`ok-color`}>

                    {dataRefs.save}

                </Btn>

            </div>

        </CardLayout>

    );
}

export default DataGridModalPut;