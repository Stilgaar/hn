
function NavLinksLeftWrapper({ children, here }) {

    return (

        <div className={`flex pl-3 justify-between items-center leading-[0.6em] text-white transition-[padding-left,transform] transition-all duration-200 ease-in-out w-full`}>

            <div className={`${here ? `rounded-l-lg bg-bg-1-500 border-l-2 border-blue-1-500 text-blue-1-500 w-[185px] transition-all` : "bg-white"} py-3 flex `}>

                {children}

            </div>

        </div>

    );
}

export default NavLinksLeftWrapper;