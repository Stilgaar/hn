export const checkedReducer = (prevState, action) => {

    console.log("CHECKEDREDUCER.JS : ", action.type)

    switch (action.type) {

        case 'TOGGLE_CHECKED': {

            const { dispatchType, key, option } = action.payload;
            const currentSet = prevState[dispatchType]?.[key] || new Set();
            const newSet = new Set(currentSet);

            if (newSet.has(option)) {
                newSet.delete(option);
            } else {
                newSet.add(option);
            }

            return {
                ...prevState,
                [dispatchType]: {
                    ...prevState[dispatchType],
                    [key]: newSet
                }
            };
        }

        case 'SET_ALL_CHECKED': {
            const { dispatchType, key, newCheckedSet } = action.payload;

            return {
                ...prevState,
                [dispatchType]: {
                    ...prevState[dispatchType],
                    [key]: new Set(newCheckedSet)
                }
            };
        }

        case 'RESET_CHECKED': {

            const { dispatchType, key } = action.payload;

            return {
                ...prevState,
                [dispatchType]: {
                    ...prevState[dispatchType],
                    [key]: new Set()
                }
            };
        }

        case "RESET_ALL_CHEKED": {
            return {}
        }

        default:
            console.warn(`Hi, Jeff, Vsauc\n You Should not have a warning here \n You either wrote a dispatch without writing it in the switch case from 'checkedReducer.js' or you did a (nasty) spelling mistake.`)
            return prevState
    }
};