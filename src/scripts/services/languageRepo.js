async function getLanguages(userName, repo){
    const response = await fetch(`https://api.github.com/repos/${userName}/${repo}/languages`)
    return await response.json()
}

export {getLanguages}