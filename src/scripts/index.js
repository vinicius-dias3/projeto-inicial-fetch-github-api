import { user } from "/src/scripts/services/user.js"
import { repositories } from "/src/scripts/services/repositories.js"

document.querySelector('#btn-search').addEventListener('click', ()=> {
    const userName = document.querySelector('#input-search').value
    getUserProfile(userName)
})

document.querySelector('#input-search').addEventListener('keyup', (e)=> {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterPressed = key === 13
    
    if(isEnterPressed){
        // console.log(isEnterPressed)
        getUserProfile(userName)
    }
})


function getUserProfile(userName){
    user(userName).then((userData)=> {
        let userInfo = `
        <div class="info">
            <img src="${userData.avatar_url}" alt="" />
            <div class="data">
                <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                <p>${userData.bio ?? 'Não possui Bio cadastrada 😢'}</p>
            </div>
        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
    })
}

function getUserRepositories(userName){
    repositories(userName).then((reposData)=> {
        console.log(reposData)
        let repositoriesItens = ''
        reposData.forEach(repo => {
            repositoriesItens += `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`
        })
        // console.log(repositoriesItens)

        document.querySelector('.profile-data').innerHTML += `
        <div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItens}</ul>
        </div>`
        
    })    
}