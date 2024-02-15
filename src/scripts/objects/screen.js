const screen = {
    userProfile: document.querySelector('.profile-data'),
    async renderUser(user){
        this.userProfile.innerHTML = `  <div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p>${user.bio ?? 'Não possui Bio cadastrada 😢'}</p>
                                                <p>👥 ${user.followersCount} followers ◾ ${user.followingCount} following</p>
                                            </div>
                                        </div>`

        let repositoriesItens = ''


        for(const repo of user.repositories){
                const languages = await fetch(repo.languages_url)
                const responseLanguages = await languages.json()
                let orderLanguages = Object.keys(responseLanguages)
                let getLanguage = orderLanguages[0] || 'sem linguagem'
                
                repositoriesItens += `
                <li class="each-repo">
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <ul>
                        <li><i class="fas fa-utensils"></i></i> <span>${repo.forks_count}</span></li>
                        <li><i class="fas fa-star-half-alt"></i> <span>${repo.stargazers_count}</span></li>
                        <li><i class="far fa-eye"></i> <span>${repo.watchers_count}</span></li>
                        <li><i class="fas fa-cogs"></i> <span>${getLanguage}</span></li>
                    </ul>
                </li>`
        }
        
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }else{
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <h3>Nenhum repositório encontrado</h3>
                                            </div>`
        }
        let eventsItens = '';
        user.events.forEach(event=> {
            const eventName = event.repo.name
            let commitMsg;
            if(event.payload.commits){
                commitMsg = event.payload.commits[0].message
            }else{
                commitMsg = 'nenhuma mensagem registrada'
            }
            eventsItens += `<li><span>${eventName}</span> - ${commitMsg}</li>`
        })
        if(user.events.length > 0){
            this.userProfile.innerHTML += ` <div class ="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }else{
            this.userProfile.innerHTML += ` <div class ="events section">
                                                <h2>Eventos</h2>
                                                <h3>Nenhum evento encontrado</h3>
                                            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    },
    
}

export {screen}