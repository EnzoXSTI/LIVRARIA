export async function buscarLivros(setLivros) {
    var url = "https://apps-api-livros.ucxocw.easypanel.host/livros"

    var retorno = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    retorno = await retorno.json()

    setLivros(retorno.livros)
}