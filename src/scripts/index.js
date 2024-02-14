import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

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
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)
    const repositoriesFiltered = repositoriesResponse.filter(repo => {
        const dataLimite = new Date('2023-03-01')
        return new Date(repo.created_at) >= dataLimite
    })

    const tenRepositories = repositoriesFiltered.slice(0, 10)
        
    user.setInfo(userResponse)
    user.setRepositories(tenRepositories)
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }
    user.setEvents(eventsResponse)
    screen.renderUser(user)
}