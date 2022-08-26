const APIURL = `https://api.github.com/users/`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  console.log("user", user);
  main.innerHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" class="avatar" alt="${user.name}"/>
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Following</strong></li>
            </ul>

            <h4>Repos:</h4>
            <div id="repos"></div>
        </div>
    </div>
    `;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach((repo) => {
      const repoEl = document.createElement("span");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
