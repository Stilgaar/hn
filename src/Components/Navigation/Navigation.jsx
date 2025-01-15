import NavigationBarLeft from "./NavigationElements/NavigationBarLeft";

function Navigation({ navigation }) {

    return (

        <nav>
            <NavigationBarLeft navigation={navigation} />
        </nav>
    );
}

export default Navigation;