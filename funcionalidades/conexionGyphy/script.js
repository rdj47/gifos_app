//  Test function for Gyphy search verification
async function giphyConnection (url) {
    try {
        const resp = await fetch(url);
        const info = await resp.json();
        return info;
        // POST
        /*const resp = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',  
            headers: {'Access-Control-Allow-Origin': '*'}});
        const info = await resp.json();
        return info;*/
        console.log (await response.text());
    }
    catch (err) {
        console.log('fetch failed', err);
    }
}
//giphyConnection ('http://api.github.com/users/helloworld');
//API Key: TWYJkQI33iJE8p0rxE9ckezdCATJKI40
let api_key = "TWYJkQI33iJE8p0rxE9ckezdCATJKI40";

let q = "dog";

let gifSearch = giphyConnection (`http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}`);
gifSearch.then (response => {
        console.log (response.data[0]);
        console.log ("Longitud Array Objetos: "+ response.data.length);
        for (let i=0; i<response.data.length; i++) {
            console.log("ID: "+response.data[i].id);
        }
}).catch(error => {
    console.log(error);
})
//  Test function for Gyphy Trending verification
let gifTrending = giphyConnection (`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}`);
gifTrending.then (response => {
    console.log (response.data[0]);
    console.log ("Longitud Array Objetos: "+ response.data.length);
    for (let i=0; i<response.data.length; i++) {
        console.log("ID: "+response.data[i].id);
    }
}).catch(error => {
console.log(error);
})
//  Test function for Gyphy Autocomplete suggestions
let r = "do";
let gifAutocomplete = giphyConnection (`http://api.giphy.com/v1/gifs/search/tags?q=${r}&api_key=${api_key}`);
gifAutocomplete.then (response => {
    console.log (response.data[0]);
    console.log ("Longitud Array Objetos: "+ response.data.length);
    for (let i=0; i<response.data.length; i++) {
        console.log("Name: "+response.data[i].name);
    }
}).catch(error => {
console.log(error);
})
//  Test function for Gyphy Search by ID
let s = "DvyLQztQwmyAM";
console.log (`http://api.giphy.com/v1/gifs/${s}?api_key=${api_key}`);
let gifSearchByID = giphyConnection (`http://api.giphy.com/v1/gifs/${s}?api_key=${api_key}`);
gifSearchByID.then (response => {
    console.log (response.data[0]);
    console.log ("Longitud Array Objetos: "+ response.data.length);
    for (let i=0; i<response.data.length; i++) {
        console.log("GIF Requested: "+response.data[i]);
    }
}).catch(error => {
console.log(error);
})


//https://www.infotechnology.com/__export/1588774975743/sites/revistait/img/2020/05/06/06_04_20_pesos_argentinos.jpg_1484051676.jpg
/*let fileName= "myGif.gif";
let userName = "RDJ472007";
let source_image_url="https://www.infotechnology.com/__export/1588774975743/sites/revistait/img/2020/05/06/06_04_20_pesos_argentinos.jpg_1484051676.jpg";
console.log (`https://upload.giphy.com/v1/gifs?source_image_url=${source_image_url}&username=${userName}&api_key=${api_key}`);
let uploadGif= giphyConnection (`https://upload.giphy.com/v1/gifs?source_image_url=${source_image_url}&username=${userName}&api_key=${api_key}`);
uploadGif.then (response => {
    console.log ("Inicio Ejecución Promesa");
    console.log (response.data[0]);
    console.log ("Longitud Array Objetos: "+ response.data.length);
    for (let i=0; i<response.data.length; i++) {
    console.log("GIF Requested: "+response.data[i]);
}
}).catch(error => {
    console.log(error);
})*/