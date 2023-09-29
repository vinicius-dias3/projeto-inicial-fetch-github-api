import { getUser } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"
import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"

document.querySelector('#btn-search').addEventListener('click', ()=> {
    const userName = document.querySelector('#input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do Github')
        return true
    }
}

document.querySelector('#input-search').addEventListener('keyup', (e)=> {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterPressed = key === 13
    
    if(isEnterPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})


async function getUserData(userName){
    const userResponse = await getUser(userName)
    console.log(userResponse)
    
    const repositoriesResponse = await getRepositories(userName)
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }
    screen.renderUser(user)
}