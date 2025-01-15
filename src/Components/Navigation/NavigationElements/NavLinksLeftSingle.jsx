import { Link, useLocation } from "react-router-dom";

import NavLinksLeftWrapper from "./NavLinksLeftSingleWrapper";

import Text from "@/Components/Basic/Text";

function NavLinksLeftSingle({ navItem }) {

    ////////////////
    // used to know where we are in the URL
    const location = useLocation();
    const here = location.pathname.split("/")[1] === navItem.path.split("/")[1]

    return (

        <NavLinksLeftWrapper here={here}>

            <Link to={navItem.path} className={` flex items-center`}>

                <Text text={navItem.text} css={`${here ? "pl-2 font-bold w-full" : "pl-1"}`} />

            </Link>

        </NavLinksLeftWrapper>
    );
}

export default NavLinksLeftSingle;