import { useState, useEffect } from "react";

// import { useUsersContext } from "@/Context/UserContext/UserContext";

// personnal hook to submit any text
function useSubmit() {

    const [pending, setPending] = useState(null)
    const [error, setError] = useState()
    const [resMsg, setResMsg] = useState(null)
    const [resBody, setResBody] = useState(null)

    // const { usersState } = useUsersContext();
    // const { userGuid, token } = usersState

    // clear the resmessage
    useEffect(() => {
        let timer;
        if (resMsg) {
            timer = setTimeout(() => {
                setResMsg(null);
            }, 450);
        }
        // cleanup function
        return () => clearTimeout(timer);
    }, [resMsg])


    // we'll send data as default set. But if we put it in the arguments it will send dataSent
    const handleSubmit = async ({
        e = "",
        url,
        method = "POST",
        body,
        headers = {
            'Content-Type': "application/json",
            // 'Authorization': `Bearer ${token}`,
        },
        // userNeeded = true,
    }) => {

        e && e.preventDefault()

        setPending(true)
        setError(null)

        const makeBody = () =>
            // userNeeded
            //     ?
            //     { ...body, utilisateur_guid: userGuid }
            //     :
            body;

        console.log("MAKEBODY USESUBMIT", makeBody())
        console.log("url", url)

        try {
            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(makeBody()),
            });

            const responseInfo = { ok: res.ok, status: res.status };
            const contentType = res.headers.get("Content-Type");

            let data = contentType && contentType.includes("application/json")
                ?
                await res.json()
                :
                await res.text();

            setResBody(data);

            if (!res.ok) {
                throw new Error(data);
            }

            setResMsg(responseInfo);
            setResBody(data);

        } catch (error) {

            const errString = JSON.stringify(error, Object.getOwnPropertyNames(error));
            const errObj = JSON.parse(errString);

            // Check if message is an object, log its properties if it is
            if (typeof errObj.message === 'object') {

                console.error("USESUBMIT => ERROR MESSAGE (as object)", errObj.message);

                // Attempt to serialize the message object for a detailed view
                try {
                    console.log("USESUBMIT => ERROR MESSAGE JSON", JSON.stringify(errObj.message, null, 2));
                } catch (err) {
                    console.error("Failed to stringify error message:", err);
                }

                // Manually inspect each key-value in the message object
                for (const key in errObj.message) {
                    if (errObj.message.hasOwnProperty(key)) {
                        console.log(`MESSAGE PROPERTY: ${key} =>`, errObj.message[key]);
                    }
                }
            } else {
                // Log it directly if it's a string
                console.error("USESUBMIT => ERROR MESSAGE (as string)", errObj.message);
            }

            // Log all other error object properties
            for (const prop in errObj) {
                if (errObj.hasOwnProperty(prop)) {
                    console.log(`ERROR PROPERTY: ${prop} =>`, errObj[prop]);
                }
            }

            setError(error);

        } finally {
            setPending(false);
        }
    };

    return { handleSubmit, pending, error, setError, resBody, resMsg }

}

export default useSubmit;