import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import CadastroDeLivro from "./screens/CadastroDeLivro";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"CadastroDeLivro"} component={CadastroDeLivro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}