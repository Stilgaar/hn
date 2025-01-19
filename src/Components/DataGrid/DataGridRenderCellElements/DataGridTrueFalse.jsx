function DataGridTrueFalse({
    boolean,
}) {

    ////////////////
    // JSX
    return (

        <div className={`w-full m-auto`}>

            {!boolean ?

                <div className={`w-[15px] h-[15px] bg-error-500 rounded-lg mr-5`} />
                :
                <div className={`w-[15px] h-[15px] bg-green-500 rounded-lg mr-5`} />
            }

        </div>


    );
}

export default DataGridTrueFalse;