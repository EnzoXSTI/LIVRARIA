import {Button, Text, View} from "react-native";

export default function Home({ navigation  }) {
    return (
        <View>
            <Text>Página Inicial</Text>

            <Button title={"Login"} onPress={function () {
                navigation.navigate("Login");
            }} />

            <Button title={"Cadastrar Livro"} onPress={function () {
                navigation.navigate("CadastroDeLivro");
            }} />
        </View>
    )
}
