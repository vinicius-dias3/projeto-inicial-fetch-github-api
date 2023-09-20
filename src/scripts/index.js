document.querySelector('#btn-search').addEventListener('click', ()=> {
    const userName = document.querySelector('#input-search').value
    getUserProfile(userName)
})

async function user(userName){
    const resposta = await fetch(`https://api.github.com/users/${userName}`)
    return await resposta.json()
}

function getUserProfile(userName){
    user(userName).then((userData)=> {
        let userInfo = `<img src="${userData.avatar_url}" alt="" />
                        <div class="data">
                        <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                        <p>${userData.bio ?? 'Não possui Bio cadastrada 😢'}</p>
                        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo
    })
}
