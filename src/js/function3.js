const APIs = {
  ApiTeams: "https://www.balldontlie.io/api/v1/teams",
  ApiPlayers: "https://www.balldontlie.io/api/v1/players?page=",
};
let allData = { next: null, prev: null };

const fetchData = (api_rest, callback) => {
  fetch(api_rest)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(`Error: ${error}`));
};

const html = {
  content: document.getElementById("content"),
  list: document.getElementById("list"),
};

const openApi = (API) => {
  html.content.innerHTML = "";
  fetchData(API, function (data) {
    data.data.forEach((item) => {
      html.list.innerHTML += `
      <li><a onclick="show.pokemonAlone('')">${item.full_name}</a></li>
      `;
      html.content.innerHTML += `
      <div class="cards">
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

const openTeam = (nameTeam) => {
  html.content.innerHTML = "";
  let contador = 1;
  fetchData(APIs.ApiPlayers + contador, function (data) {
    console.log(data.data);
    data.data.forEach((item) => {
      if (item.team.abbreviation == nameTeam) {
        html.content.innerHTML += `
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
        </div>`
        ;
      }
    });
  });
};

const searchPlayers = {

}
openApi(APIs.ApiTeams);
//openTeam("OKC");
/*
allData = { next: data.meta.next_page, prev: data.meta.previous_page };
show.yugi(data.data);
}
eliminarBoton();
});
};

const list = {
api: (selected = APIselected) => {
if (selected == "pokemon" && listConfirm.pokemon == false) {
listConfirm.pokemon = true;
list.continue(APIs.Pokemon);
} else if (selected == "rick" && listConfirm.rick == false) {
listConfirm.rick = true;
list.continue(APIs.Rick);
} else if (selected == "yugi" && listConfirm.yugi == false) {
listConfirm.yugi = true;
list.continue(APIs.yugi);
}
},

continue: (APIChoose) => {
fetchData(APIChoose, (data) => {
show.list(data);
try {
  if (data.next != null && data.next.indexOf("200") == -1)
    list.continue(data.next);
} catch (e) {}
try {
  if (data.info.next != null && data.info.next.indexOf("10") == -1)
    list.continue(data.info.next);
} catch (e) {}
try {
  if (data.meta.next_page != null) list.continue(data.meta.next_page);
} catch (e) {}
});
},
};

--------------------------------------------------------------------------------
let listConfirm = { pokemon: false, rick: false, yugi: false };
let APIselected = "pokemon";



const list = {
  api: (selected = APIselected) => {
    if (selected == "pokemon" && listConfirm.pokemon == false) {
      listConfirm.pokemon = true;
      list.continue(APIs.Pokemon);
    } else if (selected == "rick" && listConfirm.rick == false) {
      listConfirm.rick = true;
      list.continue(APIs.Rick);
    } else if (selected == "yugi" && listConfirm.yugi == false) {
      listConfirm.yugi = true;
      list.continue(APIs.yugi);
    }
  },

  continue: (APIChoose) => {
    fetchData(APIChoose, (data) => {
      show.list(data);
      try {
        if (data.next != null && data.next.indexOf("200") == -1)
          list.continue(data.next);
      } catch (e) {}
      try {
        if (data.info.next != null && data.info.next.indexOf("10") == -1)
          list.continue(data.info.next);
      } catch (e) {}
      try {
        if (data.meta.next_page != null) list.continue(data.meta.next_page);
      } catch (e) {}
    });
  },
};
const show = {
  rick: (data) => {
    data.forEach((item) => {
      html.content.innerHTML += `
      <div class="cards" onclick="show.rickAlone('${item.url}')">
        <div>
        <img class="imagen" src="${item.image}">
        </div>
        <div class="contenedorTextos">
        <small class="txtLabel">Nombre</small>
        <p class="txtTitulo">${item.name}</p>
        <small class="txtLabel">Especie</small>
        <p class="txtTitulo">${item.species}</p>
        </div>
        </div>`;
    });
  },
  pokemon: (data) => {
    
  },
  yugi: (data) => {
    data.forEach((item) => {
      html.content.innerHTML += `
      <div class="cards" onclick="show.yugiAlone('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${item.id}')">
        <div>
        <img class="imagen" src="${item.card_images[0].image_url}">
        </div>
        <div class="contenedorTextos">
        <small class="txtLabel">Nombre</small>
        <p class="txtTitulo">${item.name}</p>
        <small class="txtLabel">Especie</small>
        <p class="txtTitulo">${item.type}</p>
        </div>
        </div>`;
    });
  },
  rickAlone: (API) => {
    fetchData(API, function (item) {
      html.content.innerHTML = `<div class="cardsBig">
        <div>
        <img class="imagen" src="${item.image}">
        </div>
        <div class="contenedorTextos">
        <small class="txtLabel">Name</small>
        <p class="txtTitulo">${item.name}</p>
        <small class="txtLabel">Species</small>
        <p class="txtTitulo">${item.species}</p>
        <small class="txtLabel">Gender</small>
        <p class="txtTitulo">${item.gender}</p>
        <small class="txtLabel">Dimension / origin</small>
        <p class="txtTitulo">${item.origin.name}</p>
        <small class="txtLabel">Location</small>
        <p class="txtTitulo">${item.location.name}</p>
        </div>
        </div>`;
    });
  },
  yugiAlone: (API) => {
    fetchData(API, function (item) {
      html.content.innerHTML = `<div class="cardsBig">
        <div>
        <img class="imagen" src="${item.data[0].card_images[0].image_url}">
        </div>
        <div class="contenedorTextos">
        <small class="txtLabel">Name</small>
        <p class="txtTitulo">${item.data[0].name}</p>
        <small class="txtLabel">Especie</small>
        <p class="txtTitulo">${item.data[0].type}</p>
        <small class="txtLabel">Attribute</small>
        <p class="txtTitulo">${item.data[0].attribute}</p>
        <small class="txtLabel">Race</small>
        <p class="txtTitulo">${item.data[0].race}</p>
        <small class="txtLabel">Attack</small>
        <p class="txtTitulo">${item.data[0].atk}</p>
        <small class="txtLabel">Defense</small>
        <p class="txtTitulo">${item.data[0].def}</p>
        <small class="txtLabel">Level</small>
        <p class="txtTitulo">${item.data[0].level}</p>
        </div>
        </div>`;
    });
  },
  pokemonAlone: (API) => {
    fetchData(API, function (data2) {
      html.content.innerHTML = `<div class="cardsBig" >
      <div>
      <img class="imagen" src="${data2.sprites.other.dream_world.front_default}">
      </div>
      <div class="contenedorTextos">
      <small class="txtLabel">Name</small>
      <p class="txtTitulo">${data2.name}</p>
      <small class="txtLabel">Type</small>
      <p class="txtTitulo">${data2.types[0].type.name}</p>
      <small class="txtLabel">abilities</small>
      <p class="txtTitulo">${data2.abilities[0].ability.name}</p>
      <p class="txtTitulo">${data2.abilities[1].ability.name}</p>
      </div>
      </div>`;
    });
  },
  list: (data) => {
    if (APIselected == "pokemon") {
      data.results.forEach((item) => {
        html.listPokemon.innerHTML += `
        <li><a onclick="show.pokemonAlone('${item.url}')">${item.name}</a></li>
        `;
      });
    } else if (APIselected == "rick") {
      data.results.forEach((item) => {
        html.listRick.innerHTML += `
        <li><a onclick="show.rickAlone('${item.url}')">${item.name}</a></li>
        `;
      });
    } else {
      data.data.forEach((item) => {
        html.listYugi.innerHTML += `
        <li><a onclick="show.yugiAlone('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${item.id}')">${item.name}</a></li>
        `;
      });
    }
  },
};

html.btnRight.addEventListener("click", () => {
  changeAPI(allData.next);
});

html.btnLeft.addEventListener("click", () => {
  changeAPI(allData.prev);
});

eliminarBoton = () => {
  if (allData.prev == null) {
    html.btnLeft.style.display = "none";
  } else {
    html.btnLeft.style.display = "";
  }
  if (allData.next == null) {
    html.btnRight.style.display = "none";
  } else {
    html.btnRight.style.display = "";
  }
};

html.listRick.style.display = "none";
html.listYugi.style.display = "none";

changeAPI(APIs.Pokemon);
list.api();
*/
