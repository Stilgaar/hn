import { createBrowserRouter } from "react-router-dom";

import { globalNavigation } from "../../../JSONS/FR/NavigationArray";
import { useMemo } from "react";

const useMakeNavigation = () => {

    const router = useMemo(() => {

        return createBrowserRouter(globalNavigation)

    })

    return { router }

}

export default useMakeNavigation