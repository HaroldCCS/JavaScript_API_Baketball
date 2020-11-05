// Aquí se obtiene el ID del botón select-player
let selectplayer = document.getElementById("select-player");

//Evento clic para ejecutar el evento a continuación 
selectplayer.addEventListener("click", (event) => {
  event.preventDefault();

  //Obtenemos el valor del input (Como el nombre del jugador)
  var playerName = document.querySelector(".input").value;

  //Función ASYNC para el consumo de la API
  let ObtenerEljugador = async () => {

    // Depediendo del nombre se trae el jugador
    let res = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${playerName}`
    );

    let data = await res.json();
    const len = data.data.length;
    //Validación del nombre
    if (len === 0) {
      alert("No hay jugadores de la NBA con ese nombre (1979-presente)");
    }
    return data.data;
  };

  //Para obtener el id individual del JUGADOR
  let ObtenerElId = async () => {
    let res = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${playerName}`
    );
    let data = await res.json();
    return data.data.length ? data.data[0].id : [];
  };

  let estadisticas = async (id) => {
    let res = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${id}`
    );

    let data = await res.json();

    return data.data;
  };

  (async () => {
    let JUGADOR = await ObtenerEljugador();
    const Nameplayer = document.querySelector(".card-title");
    Nameplayer.innerHTML = `
            <p>2019-2020 Promedios de temporada: ${JUGADOR[0].first_name} ${JUGADOR[0].last_name}</p>
        `;

    const Vitalsplayer = document.querySelector(".player-vitals");
    //Posicion de juego y equipo
    Vitalsplayer.innerHTML = `
            <p>Posición del jugador:  ${JUGADOR[0].position}</p> <br>
            <p>Equipo:  ${JUGADOR[0].team.full_name} (${JUGADOR[0].team.abbreviation})</p>
        `;

    let ID = await ObtenerElId();

    let ESTADI = await estadisticas(ID);

    var res = ESTADI[0];

    const statistics = document.querySelector(".stats-box");

    var playerFull = document.querySelector(".input").value;

    axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        type: "video",
        key: "AIzaSyD7jZxnhSSSz8MouLuy206_AqN7sl5lg_w",
        q: playerFull + " nba basketball highlights",
      },
    })
    .then(function (response) {
      const vidID = response.data.items[0].id.videoId;
      const https = "https://";
      const videoSrc = "www.youtube.com/embed/" + vidID + "?showinfo=0&enablejsapi=1&origin=http://localhost:8080/function1.html";
      document.querySelector("iframe").setAttribute("src", https + videoSrc);
    });

    //Estadisticas del jugador
    statistics.innerHTML = `
        <div class="indy-stat">
                <h6>GP</h6>
                <h6 id="GP" style="color: #fff;">${res.games_played}</h6>
              </div>
              <div class="indy-stat">
                <h6>MIN</h6>
                <h6 id="MIN" style="color: #fff;">${res.min}</h6>
              </div>
              <div class="indy-stat">
                <h6>FGM</h6>
                <h6 id="fgm" style="color: #fff;">${res.fgm}</h6>
              </div>
              <div class="indy-stat">
                <h6>FGA</h6>
                <h6 id="fga" style="color: #fff;">${res.fga}</h6>
              </div>
              <div class="indy-stat">
                <h6>FG%</h6>
                <h6 id="fg" style="color: #fff;">${res.fg_pct}</h6>
              </div>
              <div class="indy-stat">
                <h6>3PM</h6>
                <h6 id="fg3m" style="color: #fff;">${res.fg3m}</h6>
              </div>
              <div class="indy-stat">
                <h6>3PA</h6>
                <h6 id="fg3a" style="color: #fff;">${res.fg3a}</h6>
              </div>
              <div class="indy-stat">
                <h6>3P%</h6>
                <h6 id="fg3pct" style="color: #fff;">${res.fg3_pct}</h6>
              </div>
              <div class="indy-stat">
                <h6>FTM</h6>
                <h6 id="ftm" style="color: #fff;">${res.ftm}</h6>
              </div>
              <div class="indy-stat">
                <h6>FTA</h6>
                <h6 id="fta" style="color: #fff;">${res.fta}</h6>
              </div>
              <div class="indy-stat">
                <h6>FT%</h6>
                <h6 id="ftpct" style="color: #fff;">${res.ft_pct}</h6>
              </div>
              <div class="indy-stat">
                <h6>OREB</h6>
                <h6 id="oreb" style="color: #fff;">${res.oreb}</h6>
              </div>
              <div class="indy-stat">
                <h6>DREB</h6>
                <h6 id="dreb" style="color: #fff;">${res.dreb}</h6>
              </div>
              <div class="indy-stat">
                <h6>REB</h6>
                <h6 id="reb" style="color: #fff;">${res.reb}</h6>
              </div>
              <div class="indy-stat">
                <h6>AST</h6>
                <h6 id="ast" style="color: #fff;">${res.ast}</h6>
              </div>
              <div class="indy-stat">
                <h6>STL</h6>
                <h6 id="stl" style="color: #fff;">${res.stl}</h6>
              </div>
              <div class="indy-stat">
                <h6>BLK</h6>
                <h6 id="blk" style="color: #fff;">${res.blk}</h6>
              </div>
              <div class="indy-stat">
                <h6>TO</h6>
                <h6 id="turnover" style="color: #fff;">${res.turnover}</h6>
              </div>
              <div class="indy-stat">
                <h6>PF</h6>
                <h6 id="pf" style="color: #fff;">${res.pf}</h6>
              </div>
              <div class="indy-stat">
                <h6>PTS</h6>
                <h6 id="pts" style="color: #fff;">${res.pts}</h6>
              </div>
        `;
  })();

});

// Se establece un temporizador para ejecutar la función
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

//Obtenemos el jugador, pera con unos parámetros para buscar conciencias 
const fetchData = async (searchTerm) => {
  var playerName = $(".input").val();
  const response = await axios.get(
    "https://cors-anywhere.herokuapp.com/https://balldontlie.io/api/v1/players?per_page=100&search=" +
      playerName,
    {
      params: {
        playerName: searchTerm,
      },
    }
  );

  if (response.data.Error) {
    return [];
  }
  return response.data.data;
};

//El input de buscar 
const root = document.querySelector(".autocomplete");
root.innerHTML = `
        <input class="input" placeholder="BUSCAR un jugador, p. Ej. Lebron James" type="text"/>
        <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
        </div>
        `;

//El dropdowwn
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");
const dropdownItem = document.querySelector(".dropdown-item");

//Funcion para buscar conciencias  y mostrar
const onInput = async (event) => {
  var playerName = $(".input").val();
  event.preventDefault();
  const players = await fetchData(event.target.value);

  resultsWrapper.innerHTML = "";
  if (playerName.length >= 3 && players.length !== 0) {
    dropdown.classList.add("is-active");
    for (let player of players) {
      const option = document.createElement("a");
      if (player.id <= 493 || player.id >= 666604) {
        option.classList.add("dropdown-item");
        option.innerHTML = `${player.first_name} ${player.last_name} - ${player.team.abbreviation}`;
        option.addEventListener("click", () => {
          dropdown.classList.remove("is-active");
          input.value = player.first_name + " " + player.last_name;
        });

        resultsWrapper.appendChild(option);
      }
    }
  }
  if (players.length === 0 || playerName.length < 3) {
    dropdown.classList.remove("is-active");
  }
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
