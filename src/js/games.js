const getData = (api) => {

    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((error) => {
            console.log("Error: " , error)
        });
};

getData('https://www.balldontlie.io/api/v1/games');