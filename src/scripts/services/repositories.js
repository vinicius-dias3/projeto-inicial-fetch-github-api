import { baseUrl, repositoriesQuantity } from "/src/scripts/variables.js"

async function repositories(userName){
    const resposta = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await resposta.json()
}

export {repositories}