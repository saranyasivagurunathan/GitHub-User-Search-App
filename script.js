
function git() {
    var originalName = document.getElementById("text").value.trim();
    if (!originalName) {
        alert('Please enter a GitHub username.');
        return;
    }

    fetch(`https://api.github.com/users/${originalName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("result").innerHTML = `
                <img src="${data.avatar_url}" alt="user_avatar">
                <h2>${data.login}</h2>
            `;
            return fetch(`https://api.github.com/users/${originalName}/repos`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch repositories');
            }
            return response.json();
        })
        .then(repos => {
            const repoList = repos.map(repo => 
                `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
            ).join('');
            document.getElementById("repo-list").innerHTML = `
                <h3>Repositories:</h3>
                <ul>${repoList}</ul>
            `;
            document.getElementById("repo-container").style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById("result").innerHTML = "User not found.";
            document.getElementById("repo-list").innerHTML = "";
            document.getElementById("repo-container").style.display = 'none';
        });
}
      
