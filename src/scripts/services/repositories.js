import { baseUrl, repositoriesQuantity } from "/src/scripts/variables.js"

async function getRepositories(userName){
    const resposta = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await resposta.json()
}

export {getRepositories}