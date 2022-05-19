document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('github-form')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('search').value

        fetch(`https://api.github.com/search/users?q=${name}`)
        .then(resp => resp.json())
        .then(data => {userInfoCard(data)})
    })
})

function userInfoCard (data) {
    const newCard = document.createElement("li");
    newCard.setAttribute("id", data.items[0].login);
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card");
    const newH3 = document.createElement("h3");
    newH3.textContent = data.items[0].login;
    const pic = document.createElement("img");
    pic.setAttribute("src", data.items[0].avatar_url);
    const newLink = document.createElement("a");
    newLink.setAttribute('href', data.items[0].html_url)
    newLink.textContent = data.items[0].html_url;
    newDiv.append(newH3, pic, newLink);
    newCard.appendChild(newDiv);
    newCard.addEventListener('click', () => {getRepoInfo(data.items[0].login)})
    document.getElementById('user-list').append(newCard);
}

function getRepoInfo (userName) {
    function repoData (userData){
        const newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'repoData')
        const newP = document.createElement('p')
        newP.textContent = userData.name
        const link = document.createElement('a')
        link.setAttribute('href', userData.html_url)
        link.textContent = userData.full_name
        const discrip = document.createElement('p')
        discrip.textContent = userData.description
        newDiv.append(newP, link, discrip)
        document.getElementById('repos-list').append(newDiv)
    }
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(data => repoData(data))
        const hr = document.createElement('hr')
        document.getElementById('repos-list').append(hr)
    })
}