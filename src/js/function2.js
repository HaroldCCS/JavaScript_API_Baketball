const gamesSection = document.getElementById('games');
var api = 'https://www.balldontlie.io/api/v1/games';
const criterio = document.getElementById('criterio');
var filtro = document.getElementById('filtro').value;
const msg = document.getElementById('msg')

function fetchApi(api, callback) {
    return fetch(api)
    .then(response => response.json())
    .then((json) => {
        callback(json);
    })
    .catch((error) => {
        console.log("pailaasdasdas")
    });
} 

function fillGamesSection(api) {
    fetchApi(api, function (json) {
        console.log(json)
        json.data.forEach(function (i) {
            var bg1 = i.home_team_score > i.visitor_team_score ? 'bg-success' : 'bg-danger';
            var bg2 = i.home_team_score < i.visitor_team_score ? 'bg-success' : 'bg-danger';
            var i1 = i.home_team_score > i.visitor_team_score ? '<i class="fas fa-thumbs-up"></i>' : '<i class="fas fa-thumbs-down"></i>';
            var i2 = i.home_team_score < i.visitor_team_score? '<i class="fas fa-thumbs-up"></i>':'<i class="fas fa-thumbs-down"></i>';
            gamesSection.innerHTML += `
            <div class="card border-success mb-3 mx-2" style="width: 25%">
                <div class="card-header text-center"><h4 class="mb-0">ID del partido `+i.id+`</h4></div>
                <div class="card-body">
                    <div class="d-flex flex-wrap flex-column">
                        <div class="card text-white `+bg1+` mb-3">
                            <div class="card-header d-flex justify-content-between"><span><b>`+i.home_team.abbreviation+`</b> - `+i.home_team.full_name+`</span>`+i1+`</div>
                                <div class="card-body row align-items-center justify-content-between">
                                    <div class="col-8 border-right border-white">
                                        <h6><u>Ciudad:</u> `+ i.home_team.city +` </h6>
                                        <h6><u>Divison:</u> `+ i.home_team.division +` </h6>
                                        <h6><u>Congreso:</u> `+i.home_team.conference+` </h6>
                                    </div>
                                    <div class="col-3 text-center">
                                        <h4 class="mb-0 mx-auto">`+i.home_team_score+`</h4>
                                    </div>
                                </div>
                        </div>
                        <h1 class="text-center text-warning font-weight-bold">VS</h1>
                        <div class="card text-white `+bg2+` mb-3">
                            <div class="card-header d-flex justify-content-between"><span><b>`+i.visitor_team.abbreviation+`</b> - `+i.visitor_team.full_name+`</span>`+i2+`</div>
                            <div class="card-body row align-items-center justify-content-between">
                                <div class="col-3 border-right border-white text-center">
                                    <h4 class="mb-0 mx-auto">`+i.visitor_team_score+`</h4>
                                </div>
                                <div class="col-8">
                                    <h6><u>Ciudad:</u> `+ i.visitor_team.city +` </h6>
                                    <h6><u>Divison:</u> `+ i.visitor_team.division +` </h6>
                                    <h6><u>Congreso:</u> `+i.visitor_team.conference+` </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        })
    })
}

fillGamesSection(api);

criterio.addEventListener('keyup', function () {
    var filtro = document.getElementById('filtro').value;
    if (!filtro) {
        msg.innerText = "Debe seleccionar un filtro primero"
    } else {
        msg.innerText = ""
        if (criterio.value == null) {
            fillGamesSection(api);
        } else {
            
            gamesSection.innerHTML = "";
            api = 'https://www.balldontlie.io/api/v1/games?' + filtro + '=' + criterio.value;
            console.log(criterio.value);
            fillGamesSection(api);
        }
        
    }
})





