import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: '', errorInfo: '' };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service.
        this.setState({ error: error.toString(), errorInfo: errorInfo.toString() });
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI.
            return <div>{this.state.error}</div>;
        }
        return this.props.children;
    }
}

// Define the logErrorToMyService function
function logErrorToMyService(error, errorInfo) {
    // Implement error logging logic here
    // For example, logging to the console:
    console.error("Error logged to my service:", error, errorInfo);
}

export default ErrorBoundary