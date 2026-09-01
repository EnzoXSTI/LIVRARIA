import {salvarToken, salvarUsuario} from "./usuarioStorage";

export async function realizarLogin(email, senha) {
    var url = "https://apps-api-livros.ucxocw.easypanel.host/auth/login"
    var retorno = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha,
        })
    })

    retorno = await retorno.json()

    if (!retorno.token || retorno.token === "") {
        throw new Error("E-mail ou senha estão incorretos")
    }

    await salvarUsuario(retorno.usuario.id, retorno.usuario.nome, email, senha)
    await salvarToken(retorno.token)

    return retorno.token
}