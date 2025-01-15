
import NavLinksLeftSingle from "./NavLinksLeftSingle";

function NavigationBarLeft({ navigation }) {

    return (

        <nav className={`bg-white h-full fixed top-0 left-0 shadow transition-all overflow-hidden flex col z-[5000] w-[185px]`}>


            <div className={`mt-5 relative w-full`} style={{ flexGrow: 1 }}>
                {navigation.map(navItem => (

                    <NavLinksLeftSingle key={navItem.path} navItem={navItem} />

                ))}

            </div>

        </nav>
    );
}

export default NavigationBarLeft;