export const lazyRetry = function (componentImport, name) {

    return new Promise((resolve, reject) => {

        // check if the window has already been refreshed

        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-lazy-${name}-refreshed`) || 'false'
        );

        // try to import the component
        componentImport().then((component) => {
            window.sessionStorage.setItem(`retry-lazy-${name}-refreshed`, 'false'); // success so reset the refresh
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) { // not been refreshed yet
                window.sessionStorage.setItem(`retry-lazy-${name}-refreshed`, 'true'); // we are now going to refresh
                return window.location.reload(); // refresh the page
            }
            reject(error); // Default error behaviour as already tried refresh
        });
    });
};