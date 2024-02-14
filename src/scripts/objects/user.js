const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    repositories: [],
    followersCount: 0,
    followingCount: 0,
    events:[],
    languageRepositories: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followersCount = gitHubUser.followers
        this.followingCount = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories
    },
    setEvents(events){
        events.filter(function (events) {
            events.type === "CreateEvent" || events.type === "PushEvent"
        })
        this.events = events
    }
}

export {user}