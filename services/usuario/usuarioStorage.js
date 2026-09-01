import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarUsuario(id, nome, email, senha) {
    await AsyncStorage.setItem("usuario", JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        id: id,
    }))
}

export async function salvarToken(token) {
    await AsyncStorage.setItem("token", token)
}

export async function getToken() {
    var token = await AsyncStorage.getItem("token");

    if (!token || !token.length) {
        return false;
    }

    return token;
}

export async function getUsuario() {
    var usuario = await AsyncStorage.getItem("usuario");

    if (!usuario || !usuario.length) {
        return false;
    }

    usuario = await JSON.parse(usuario);

    return usuario;
}

export async function limparDados() {
    await AsyncStorage.removeItem("usuario");
    await AsyncStorage.removeItem("token");
}