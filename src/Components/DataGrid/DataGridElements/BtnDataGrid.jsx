function BtnDataGrid({
    children,
    disabled,
    handleClick,
    left,
    right,
}) {

    return (

        <button disabled={disabled}
            onClick={handleClick}
            type={`button`}
            className={`row ${left ? "rounded-r-none" : ""} ${right ? "rounded-l-none" : ""}
                ${(left || right) ? "rounded-md" : "rounded-none"}  py-[4px] px-4 border-l border-r text-center text-sm text-white 
                transition-all shadow-md hover:shadow-lg focus:bg-grey-700 focus:shadow-none active:bg-grey-700 
                active:shadow-none disabled:pointer-events-none disabled:bg-error-500 disabled:border-error-500
                ${disabled !== undefined ? "bg-green-700 border-green-700 hover:bg-green-500" : "bg-grey-500 border-grey-500 hover:bg-grey-400 "}`}>

            {children}

        </button>

    );
}

export default BtnDataGrid;