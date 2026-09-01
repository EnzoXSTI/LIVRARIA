import {Alert, Button, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {getToken} from "../services/usuario/usuarioStorage";
import {getBiometria} from "../services/usuario/biometria";
import {realizarLogin} from "../services/usuario/realizarLogin";

export default function Login({ navigation }) {
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    useEffect(() => {
        navigation.addListener("focus", async function () {
            var token = await getToken()

            if (token) {
                var bio = await getBiometria()

                if (bio) {
                    navigation.navigate("Home")
                }
            }

        })
    }, [navigation]);

    async function entrar() {
        try {
            await realizarLogin(email, senha)
            navigation.navigate("Home")
        } catch (e) {
            Alert.alert(e.message)
        }
    }

    return (
        <View>
            <TextInput value={email}
                       onChangeText={setEmail}
                       placeholder={"Digite seu e-mail"} />

            <TextInput secureTextEntry={true}
                       value={senha}
                       onChangeText={setSenha}
                       placeholder={"Digite sua senha"} />

            <Button title={"Entrar"} onPress={entrar} />
        </View>
    )
}
