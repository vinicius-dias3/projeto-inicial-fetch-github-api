import { baseUrl } from "/src/scripts/variables.js"

async function user(userName){
    const resposta = await fetch(`${baseUrl}/${userName}`)
    return await resposta.json()
}

export {user}