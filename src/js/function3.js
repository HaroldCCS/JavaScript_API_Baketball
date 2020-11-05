const APIs = {
  ApiTeams: "https://www.balldontlie.io/api/v1/teams",
  ApiPlayers: "https://www.balldontlie.io/api/v1/players?per_page=100&page=",
};


const html = {
  content: document.getElementById("content"),
  contentPlayers: document.getElementById("contentPlayers"),
  list: document.getElementById("list"),
};


const fetchData = (api_rest, callback) => {
  fetch(api_rest)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(`Error: ${error}`));
};


const openApi = (API) => {
  html.content.innerHTML = "";
  fetchData(API, function (data) {
    data.data.forEach((item) => {
      html.list.innerHTML += `
      <li><a onclick="clearPlayers('${APIs.ApiPlayers + 0}' ,'${
        item.abbreviation
      }');">${
        item.full_name
      }</a></li>
      `;
      html.content.innerHTML += `
      <div class="cards" onclick="clearPlayers('${APIs.ApiPlayers + 0}' ,'${
        item.abbreviation
      }'); ">
        <div class="contenedorTextos">
            <h1>${item.abbreviation}</h1>
            <small class="txtLabel">city</small>
            <p class="txtTitulo">${item.city}</p>

            <small class="txtLabel">conference</small>
            <p class="txtTitulo">${item.conference}</p>

            <small class="txtLabel">division</small>
            <p class="txtTitulo">${item.division}</p>

            <small class="txtLabel">full_name</small>
            <p class="txtTitulo">${item.full_name}</p>

            <small class="txtLabel">name</small>
            <p class="txtTitulo">${item.name}</p>
        </div>
      </div>`;
    });
  });
};


const clearPlayers = (API, nameTeam) =>{
  html.content.style.display = 'none';
  html.contentPlayers.style.display = '';
  html.contentPlayers.innerHTML = '';
  searchPlayers(API, nameTeam);
}


const searchPlayers = (API, nameTeam) => {
  setTimeout(() => {
  fetchData(API, function (data) {
    data.data.forEach((item) => {
      if (item.team.abbreviation == nameTeam) {
        html.contentPlayers.innerHTML += `
        <div class="cards">
          <div class="contenedorTextos">
              <h1>${item.first_name} last_name</h1>
              <small class="txtLabel">height_feet</small>
              <p class="txtTitulo">${item.height_feet}</p>

              <small class="txtLabel">height_inches</small>
              <p class="txtTitulo">${item.height_inches}</p>
              <small class="txtLabel">position</small>
              <p class="txtTitulo">${item.position}</p>

              <small class="txtLabel">team</small>
              <p class="txtTitulo">${item.team.abbreviation}</p>
          </div>
        </div>`;
      }
    });
    let next_page = data.meta.next_page;
    if (next_page != null) searchPlayers(APIs.ApiPlayers + next_page, nameTeam);
  });
  }, 500);

};

const function3 = () =>{
  html.content.style.display = '';
  html.contentPlayers.style.display = 'none';
  html.contentPlayers.innerHTML = '';
}

openApi(APIs.ApiTeams);
