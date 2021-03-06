console.log(new Date().toString() + " SCRIPT START");

///++++ MEDIA QUERY ++++
let bp1 = window.matchMedia("(max-width: 852px)");

//++++++++++++++++++++++++++++++++++FUNCTIONS+++++++++++++++++++++++++++++++++++++++++++++
let setFavoriteFunction=0; 
let downloadFunction=0; 
let trashFunction=0;

let trendingGalleryDesktopItems; 
let trendingGalleryDesktopIndex=0; 


//API Key for GIPHY
//let api_key = "TWYJkQI33iJE8p0rxE9ckezdCATJKI40";
let api_key = "12xR8EXZYIjZ3NLdqajJlmVoKMgAT2Y7";

//++++ GLOBAL TAGS ++++

let header = document.getElementsByTagName('header');
let logo = document.getElementById('logo-mobile');
logo.addEventListener('click',initialize);
let logoDark = document.getElementById('logo-mobile-dark');
logoDark.addEventListener('click',initialize);
let addGifo = document.getElementById('add-gifo');
let addGifoButton = document.getElementById('add-gifo-button');
addGifo.addEventListener('click', showCreateGifos);
addGifo.addEventListener('mouseover', addGifoButtonStyle);
addGifo.addEventListener('mouseout', removeGifoButtonStyle);
let sandwich = document.getElementById('sandwich');
sandwich.addEventListener('click', changeBurgerIcon);
sandwich.checked= false;
let sandwichIcon = document.getElementById('sandwich-icon');
sandwichIcon.src = "images/burger.svg";
let menuUl = document.getElementById('menu-ul');
let lightModeLink = document.getElementById('light-mode-link');
lightModeLink.addEventListener('click', changeLightMode);
let nextLightMode = document.getElementById('next-light-mode');
let favoritesLink = document.getElementById('favorites-link');
favoritesLink.addEventListener('click', showFavorites);
let favoritesFlag=false;
let favoritesPagination=0;
let myGifosLink = document.getElementById('my-gifos-link');
myGifosLink.addEventListener('click', showMyGifos);
let myGifosFlag=false;
let myGifosPagination=0;
let createGifosLink = document.getElementById('create-gifos-link');
createGifosLink.addEventListener('click', showCreateGifos);

let trendingFlag=false;

// banner area tags
let banner = document.getElementById('banner');
let presentationTitle = document.getElementById('presentation-title');
let presentationTitleSpan = document.getElementById('presentation-title-span');
let trendingTerms = document.getElementById('trending-terms');
let searchBar = document.getElementById('search-bar');
let searchPhrase= document.getElementById('search-phrase');
let searchInput= document.getElementById('search-phrase-input');
//searchInput.addEventListener('keyup', getSuggestions);
searchInput.addEventListener("keyup", event => {
    //Objeto de evento
    if (event.which === 13 || event.keyCode == 13) {
        //Al presionar enter
        gifSearch(searchInput.value);
    } else {
        //Acción para el resto de las teclas
        getSuggestions(searchInput.value);
    }
});
let searchResultsSeparator= document.getElementById("search-results-separator");
let searchResults = document.getElementById("search-results");
searchResults.style.display='none';
let searchResultsTitle= document.getElementById("search-results-title");
let results = document.getElementById('results');
let searchPhraseMG = document.getElementById('search-phrase-mg');
let searchBarInput = document.getElementById('search-phrase-input');
searchBarInput.value="";
searchPhraseMG.addEventListener('click', function() { gifSearch(searchBarInput.value); } );
let searchPhraseClear = document.getElementById('search-phrase-clear');
searchPhraseClear.addEventListener('click', clearSearchPhrase);


// trending-terms area tags
let trendingTermsTitle = document.getElementById('trending-terms-title');
let trendingTermsResult = document.getElementById('trending-terms-results');

// search-results area tags
let moreResultsButton = document.getElementById('more-results');
moreResultsButton.addEventListener('click', drawMoreResults);

// maximized area tags
let maximizedCloseButton = document.getElementById('maximized-close-button');
maximizedCloseButton.addEventListener('click', function() { hideContentForMaximizingReverse(favoritesFlag,myGifosFlag,trendingFlag); } );
let maximizedResultImg = document.getElementById('maximized-result-img');
let maximizedResultUser = document.getElementById('maximized-result-user');
let maximizedResultTitle = document.getElementById('maximized-result-title');
let maximizedDownloadBorder = document.getElementById('maximized-download-border');
let maximizedLikeBorder = document.getElementById('maximized-like-border');
let maximizedLikeButton = document.getElementById('maximized-like-button');
let maximizedTrashBorder = document.getElementById('maximized-trash-border');
let maximizedTrashButton = document.getElementById('maximized-trash-button');

// trending-gifos area tags
let trendingGifos = document.getElementById('trending-gifos');
let trendingGifosTitle = document.getElementById('trending-gifos-title');
let trendingGifosText = document.getElementById('trending-gifos-text');
let trendingGallery = document.getElementById('trending-gallery');


// trending-gifos-desktop area tags
let trendingGalleryDesktop = document.getElementById('trending-gallery-desktop');
let carousel = document.getElementById('carousel');
let arrowRightBorder = document.getElementById('arrow-right-border');
let arrowLeftBorder = document.getElementById('arrow-left-border');
let arrowRightButton = document.getElementById('arrow-right-button');
let arrowLeftButton = document.getElementById('arrow-left-button');
arrowLeftBorder.addEventListener('mouseover', addArrowLeftButtonStyle);
arrowLeftBorder.addEventListener('mouseout', removeArrowLeftButtonStyle);
arrowRightBorder.addEventListener('mouseover', addArrowRightButtonStyle);
arrowRightBorder.addEventListener('mouseout', removeArrowRightButtonStyle);


//trendingGalleryDesktop.style.display = 'none';

// favorites area tags
favorites.style.display='none';  // To not show favorites area in the beginning.
let favoritesResults = document.getElementById('favorites-results');
let moreFavoritesButton =document.getElementById('more-favorites');
moreFavoritesButton.addEventListener('click', drawMoreFavorites);

let favoritesArray= new Array();

// my-gifos area tags
let myGifos = document.getElementById('my-gifos');
myGifos.style.display='none'; 
let myGifosIcon = document.getElementById('my-gifos-icon');
let myGifosTitle = document.getElementById('my-gifos-title');
let noGifosIcon = document.getElementById('no-gifos-icon');
let noGifosText = document.getElementById('no-gifos-text');
let myGifosResults = document.getElementById('my-gifos-results');
let moreMyGifosButton = document.getElementById('more-my-gifos');
moreMyGifosButton.addEventListener('click', drawMoreMyGifos);
let myGifosArray = new Array();

// create-gifos area tags
let createGifos = document.getElementById('create-gifos');
createGifos.style.display='none'; 
let createGifosFrame = document.getElementById('create-gifos-frame');
let createGifosSubframe = document.getElementById('create-gifos-subframe');
let cameraAccessTitle = document.getElementById('camera-access-title');
let cameraAccessComment = document.getElementById('camera-access-comment');
const videoPort = document.getElementById('camera');
let gifoPreviewContainer = document.getElementById('gifo-preview-container');
let gifoPreview = document.getElementById('gifo-preview');
let uploadGifoPreviewContainer = document.getElementById('upload-gifo-preview-container');
let uploadGifoPreview = document.getElementById('upload-gifo-preview');
let uploadedGifoOptions = document.getElementById('upload-gifo-options');
let cgDownloadBorder = document.getElementById('cg-download-border');
cgDownloadBorder.style.display = 'none';
let cgLink = document.getElementById('cg-link');
let step1Icon = document.getElementById('step-1-icon');
let step2Icon = document.getElementById('step-2-icon');
let step3Icon = document.getElementById('step-3-icon');
h = 0;
m = 0;
s = 0;
document.getElementById("hms").innerHTML="00:00:00";
let controlPanelSeparator = document.getElementById('control-panel-separator');
let repeatCaptureButton = document.getElementById('repeat-capture');
repeatCaptureButton.addEventListener('click', repeatCapture);
let uploadStatusIcon = document.getElementById('upload-status-icon');
let uploadStatusComment = document.getElementById('upload-status-comment');
let initialButton = document.getElementById('initial-button');
initialButton.addEventListener('click', goToStep1);
let recordStartButton = document.getElementById('record-start-button');
recordStartButton.addEventListener('click', startRecording);
let recordStopButton = document.getElementById('record-stop-button');
//recordStopButton.addEventListener('click', stopRecording);
let uploadGifoButton = document.getElementById('upload-gifo-button');
//uploadGifoButton.addEventListener('click', uploadGifo);

//footer area tags
let footer = document.getElementsByTagName('footer');
let socialNetworksText = document.getElementById('social-networks-text');
let rightsReservedText = document.getElementById('rights-reserved-text');

// initial functions execution

getTrendingTerms();
showTrending();
arrowRightBorder.addEventListener('click', nextGifo );
arrowLeftBorder.addEventListener('click', previousGifo );

// mobile carousel functions
const gra = function(min, max) {
    return Math.random() * (max - min) + min;
}

const gri = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const init = function(){
    let galleryItems = document.querySelectorAll('.gallery li');
    for (let i = 0; i < galleryItems.length; i++){
        galleryItems[i].style.minWidth = gra(30,60) + 'vw';
        galleryItems[i].style.background = randomColor({luminosity: 'light'});
    }
    cssScrollSnapPolyfill();
}


//++++++++++++++++++++++++++++++++++FUNCTIONS+++++++++++++++++++++++++++++++++++++++++++++

/*++++ HOVER STYLE FUNCTIONS ++++

function addHoverStyle (sectionA) {
    sectionA.style.textDecoration ='underline #00F3BB';
}

function removeHoverStyle (sectionA) {
    sectionA.classList.remove('underline-deco');
}*/

//++++ GIFO BUTTON STYLE FUNCTIONS ++++

// addGifoButtonStyle
function addGifoButtonStyle() {
    console.log ("##f()## addGifoButtonStyle function execution"); 
    if(queryDarkMode()){ // If media query matches        
        document.getElementById('add-gifo').style.border = '1px solid 37383C';
        document.getElementById('add-gifo').style.background = '#FFFFFF';
        document.getElementById('add-gifo-button').src = "images/button-crear-gifo-modo-noc-hover.svg";
    } else {
        document.getElementById('add-gifo').style.border = '1px solid #FFFFFF';
        document.getElementById('add-gifo').style.background = '#572EE5';
        document.getElementById('add-gifo-button').src = "images/button-crear-gifo-hover.svg";

    }    
}

// removeGifoButtonStyle
function removeGifoButtonStyle() {   
    console.log ("##f()## removeGifoButtonStyle function execution"); 
    if(queryDarkMode()){ // If media query matches        
        document.getElementById('add-gifo').style.border = '1px solid #FFFFFF';
        document.getElementById('add-gifo').style.background = '#37383C';
        document.getElementById('add-gifo-button').src = "images/button-crear-gifo-hover.svg";
    } else {
        document.getElementById('add-gifo').style.border = '1px solid #572EE5';
        document.getElementById('add-gifo').style.background = '#FFFFFF';
        document.getElementById('add-gifo-button').src = "images/button-crear-gifo.svg";
    }    
}


//++++ BURGER MENU FUNCTIONS ++++ 

//changeBurgerIcon
function changeBurgerIcon () {
    console.log ("##f()## changeBurgerIcon function execution"); 
    console.log ("Sandwich status: "+sandwich.checked)
    if(sandwich.checked==true) {
        if(!queryDarkMode()) {
            sandwichIcon.src = "images/close.svg";
        }
        else {
            sandwichIcon.src = "images/close-modo-noc.svg";
        }
    } else {
        if(!queryDarkMode()) {
            sandwichIcon.src = "images/burger.svg";
        }
        else {
            sandwichIcon.src = "images/burger-modo-noc.svg";
        }
    }
}


//++++ INITIALIZE FUNCTION ++++ 

// initialize
function initialize() {
    console.log ("##f()## initizalize function execution");    
    header[0].classList.remove('hide');
    sandwich.checked= false;
    if(!queryDarkMode()) {
        sandwichIcon.src = "images/burger.svg";
        document.getElementById('add-gifo').style.background = '#FFFFFF';
        document.getElementById('add-gifo-button').src = 'images/button-crear-gifo.svg';
        document.getElementById('add-gifo').style.border = '1px solid #572EE5';
        document.getElementById('add-gifo').removeEventListener('mouseover', addGifoButtonStyle);
        document.getElementById('add-gifo').removeEventListener('mouseout', removeGifoButtonStyle);
        document.getElementById('add-gifo').addEventListener('mouseover', addGifoButtonStyle);
        document.getElementById('add-gifo').addEventListener('mouseout', removeGifoButtonStyle);
        document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#572EE5';
        document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#572EE5';
    } else {
        sandwichIcon.src = "images/burger-modo-noc.svg";
        document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
        document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
    }
    banner.style.display ='flex';
    clearSearchPhrase();
    clearSuggestions();
    changeSearchPhraseStyleReverse();
    trendingTerms.classList.remove('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.style.display = 'none';
    maximized.classList.add('hide');
    trendingGifos.classList.remove('hide');
    favorites.style.display='none';
    favoritesFlag = false;
    favoritesPagination=0;
    myGifosFlag = false;
    myGifos.style.display='none';
    myGifosPagination=0;
    createGifos.style.display='none';
}


//++++ LIGHT MODE FUNCTIONS ++++ 

// queryDarkMode
function queryDarkMode () {
    console.log ("##f()## queryDarkMode function execution");   
    console.log("nextLightMode.textContent: "+nextLightMode.textContent);
    if (nextLightMode.textContent=="Modo Nocturno") {
        console.log("Ingreso en: nextLightMode.textContent==Modo Nocturno");
        console.log("qDM: false");
        return false;
    }
    else if (nextLightMode.textContent=="Modo Diurno") {
        console.log("Ingreso en: nextLightMode.textContent==Modo Diurno");
        console.log("qDM: true");
        return true;
    }   

}

// changeLightMode
function changeLightMode () {
    console.log ("##f()## changeLightMode function execution");    
    console.log("nextLightMode.textContent: "+nextLightMode.textContent);
    if (!queryDarkMode()) {
        console.log("Ingreso en: !queryDarkMode()=true");
        nextLightMode.textContent="Modo Diurno";
        header[0].style.background = '#37383C';
        document.getElementsByTagName('body')[0].style.background = '#37383C';
        footer[0].style.background = '#37383C';
        header[0].style.borderTop = '5px solid #000000';
        logo.classList.add('hide');
        logoDark.classList.remove('hide');
        sandwichIcon.src = 'images/close-modo-noc.svg';
        if(bp1.matches) {
            menuUl.style.background = ' #000000';
        } else {
            menuUl.style.background = 'unset';            
            document.getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
            if(!favoritesFlag) {
                document.getElementsByClassName('section-a')[1].style.color = '#FFFFFF';
            }
            if (!myGifosFlag) {
                document.getElementsByClassName('section-a')[2].style.color = '#FFFFFF';
            }
            addGifo.style.border = '1px solid #FFFFFF';
            addGifo.style.background = '#37383C';
            addGifoButton.src = "images/button-crear-gifo-hover.svg";
        }    
        presentationTitle.style.color = '#FFFFFF';
        searchBar.style.border = '1px solid #FFFFFF';
        searchBar.style.background = '#37383C';
        searchBarInput.style.background = '#37383C';
        searchBarInput.style.color = '#6B7989';
        searchPhraseMG.src = 'images/icon-search-modo-noc.svg';
        searchPhraseClear.src = 'images/button-close-modo-noc.svg';
        console.log("Total sugerencias: "+document.getElementsByClassName('search-suggestion').length);
        if (document.getElementsByClassName('search-suggestion')!=null) {
            for(let i=0; i < document.getElementsByClassName('search-suggestion').length; i++) {
                document.getElementsByClassName('search-suggestion')[i].getElementsByTagName('img')[0].src = 'images/icon-search-modo-noc.svg';
            }
        }
        console.log("Total section-title: "+document.getElementsByClassName('section-title').length);
        for (let i=0;  i < document.getElementsByClassName('section-title').length; i++){
            document.getElementsByClassName('section-title')[i].style.color = '#FFFFFF';
        }     
        console.log("Total términos trending: "+document.getElementsByClassName('trending-term').length);
        console.log("Total términos trending: "+document.getElementsByClassName('trending-term').length);
        for (let i=0;  i < document.getElementsByClassName('trending-term').length; i++){
            document.getElementsByClassName('trending-term')[i].style.color = '#FFFFFF';
        }        
        console.log("Total botones VER MÁS: "+document.getElementsByClassName('general-more').length);
        for (let i=0;  i < document.getElementsByClassName('general-more').length; i++){
            document.getElementsByClassName('general-more')[i].classList.add('dark-general-more');
        }   
        for (let i=0;  i < document.getElementsByClassName('dark-general-more').length; i++){
            document.getElementsByClassName('dark-general-more')[i].classList.remove('general-more');
        }   
        maximizedCloseButton.src = 'images/button-close-modo-noc.svg';   
        trendingGifos.style.background = '#222326';
        console.log("Total textos general-text: "+document.getElementsByClassName('general-text').length);
        for (let i=0;  i < document.getElementsByClassName('general-text').length; i++){
            document.getElementsByClassName('general-text')[i].style.color = '#FFFFFF';
        }   
        document.getElementById('camera-decoration').src = 'images/camara-modo-noc.svg';
        document.getElementById('tape-decoration').src = 'images/pelicula-modo-noc.svg';
        createGifosFrame.style.border = '1px solid #FFFFFF';
        cameraAccessComment.style.color = '#FFFFFF';
        /*var estilos = window.getComputedStyle(document.querySelector('.upload-gifo-preview-container', '::after'));
        console.log("Estilo pseudoelemento: "+estilos.backgroundColor);
        estilos.backgroundColor = */
        console.log("Total íconos step-icon: "+document.getElementsByClassName('step-icon').length);
        for (let i=0;  i < document.getElementsByClassName('step-icon').length; i++){
            document.getElementsByClassName('step-icon')[i].style.color = '#FFFFFF';
            document.getElementsByClassName('step-icon')[i].style.border = '1px solid #FFFFFF';            
        }
        hms.style.color = '#FFFFFF';
        repeatCaptureButton.style.color = '#FFFFFF';
        controlPanelSeparator.style.background = '#FFFFFF';
        console.log("Total botones control-panel-button: "+document.getElementsByClassName('control-panel-button').length);
        for (let i=0;  i < document.getElementsByClassName('control-panel-button').length; i++){
            document.getElementsByClassName('control-panel-button')[i].style.color = '#FFFFFF';
            document.getElementsByClassName('control-panel-button')[i].style.border = '1px solid #FFFFFF';            
        }   
        arrowLeftBorder.classList.add('dark');
        arrowLeftButton.src = 'images/button-left-hover.svg';
        arrowRightBorder.classList.add('dark');
        arrowRightButton.src = 'images/button-right-hover.svg';
        footer[0].style.borderBottom = '5px solid #000000';        
        socialNetworksText.style.color = '#FFFFFF';
        for (let i=0;  i < document.getElementsByClassName('fab').length; i++){
            document.getElementsByClassName('fab')[i].classList.add('dark-i');
        }
        rightsReservedText.style.color = '#FFFFFF';

    }
    else {
        console.log("Ingreso en: !queryDarkMode()=false");
        nextLightMode.textContent="Modo Nocturno";
        header[0].style.background = '#ffffff';
        document.getElementsByTagName('body')[0].style.background = '#ffffff';
        footer[0].style.background = '#ffffff';
        header[0].style.borderTop = '5px solid #572EE5';
        logo.classList.remove('hide');
        logoDark.classList.add('hide');
        sandwichIcon.src = 'images/close.svg';
        if(bp1.matches) {
            menuUl.style.background = 'rgba(87,46,229,0.90)';
        } else {
            menuUl.style.background = 'unset';
            document.getElementsByClassName('section-a')[0].style.color = '#572EE5';
            if(!favoritesFlag) {
                document.getElementsByClassName('section-a')[1].style.color = '#572EE5';
            }
            if(!myGifosFlag) {
                document.getElementsByClassName('section-a')[2].style.color = '#572EE5';
            }
            addGifo.style.border = '1px solid #572EE5';
            addGifo.style.background = 'unset';
            addGifoButton.src = "images/button-crear-gifo.svg";
        }    
        presentationTitle.style.color = '#572EE5';
        searchBar.style.border = '1px solid #572EE5';
        searchBar.style.background = '#ffffff';
        searchBarInput.style.background = '#ffffff';
        searchBarInput.style.color = '#000000';
        searchPhraseMG.src = 'images/icon-search.svg';
        searchPhraseClear.src = 'images/button-close.svg';
        console.log("Total sugerencias: "+document.getElementsByClassName('search-suggestion').length);
        if (document.getElementsByClassName('search-suggestion')!=null) {
            for(let i=0; i < document.getElementsByClassName('search-suggestion').length; i++) {
                document.getElementsByClassName('search-suggestion')[i].getElementsByTagName('img')[0].src = 'images/icon-search.svg';
            }
        }
        console.log("Total section-title: "+document.getElementsByClassName('section-title').length);
        for (let i=0;  i < document.getElementsByClassName('section-title').length; i++){
            document.getElementsByClassName('section-title')[i].style.color = '#572EE5';
        }     
        console.log("Total términos trending: "+document.getElementsByClassName('trending-term').length);
        console.log("Total términos trending: "+document.getElementsByClassName('trending-term').length);
        for (let i=0;  i < document.getElementsByClassName('trending-term').length; i++){
            document.getElementsByClassName('trending-term')[i].style.color = '#572EE5';
        }        
        console.log("Total botones VER MÁS: "+document.getElementsByClassName('dark-general-more').length);
        for (let i=0;  i < document.getElementsByClassName('dark-general-more').length; i++){
            document.getElementsByClassName('dark-general-more')[i].classList.add('general-more');
        }
        for (let i=0;  i < document.getElementsByClassName('general-more').length; i++){
            document.getElementsByClassName('general-more')[i].classList.remove('dark-general-more');
        }
        maximizedCloseButton.src = 'images/button-close.svg';   
        trendingGifos.style.background = '#F3F5F8 100%';
        console.log("Total textos general-text: "+document.getElementsByClassName('general-text').length);
        for (let i=0;  i < document.getElementsByClassName('general-text').length; i++){
            document.getElementsByClassName('general-text')[i].style.color = '#000000';
        }   
        document.getElementById('camera-decoration').src = 'images/camara.svg';
        document.getElementById('tape-decoration').src = 'images/pelicula.svg';
        createGifosFrame.style.border = '1px solid #572EE5';
        cameraAccessComment.style.color = '#000000';
        /*var estilos = window.getComputedStyle(document.querySelector('.upload-gifo-preview-container', '::after'));
        console.log("Estilo pseudoelemento: "+estilos.backgroundColor);
        estilos.backgroundColor = */
        console.log("Total íconos step-icon: "+document.getElementsByClassName('step-icon').length);
        for (let i=0;  i < document.getElementsByClassName('step-icon').length; i++){
            document.getElementsByClassName('step-icon')[i].style.color = '#572EE5';
            document.getElementsByClassName('step-icon')[i].style.border = '1px solid #572EE5';            
        }
        hms.style.color = '#572EE5';
        repeatCaptureButton.style.color = '#572EE5';
        controlPanelSeparator.style.background = '#572EE5';
        console.log("Total botones control-panel-button: "+document.getElementsByClassName('control-panel-button').length);
        for (let i=0;  i < document.getElementsByClassName('control-panel-button').length; i++){
            document.getElementsByClassName('control-panel-button')[i].style.color = '#572EE5';
            document.getElementsByClassName('control-panel-button')[i].style.border = '1px solid #572EE5';            
        }   
        arrowLeftBorder.classList.remove('dark');
        arrowLeftButton.src = 'images/button-left.svg';
        arrowRightBorder.classList.remove('dark');
        arrowRightButton.src = 'images/button-right.svg';
        footer[0].style.borderBottom = '5px solid #572EE5';   
        for (let i=0;  i < document.getElementsByClassName('fab').length; i++){
            document.getElementsByClassName('fab')[i].classList.remove('dark-i');
        }     
    }   

}


//++++ GIPHY API FETCH FUNCTIONS ++++

// giphyConnection 
async function giphyConnection (url) {
    console.log ("##f()## giphyConnection function execution");
    try {
        const resp = await fetch(url);
        const info = await resp.json();
        //console.log (await response.text());
        return info;
        //console.log (await response.text());
    } catch (err) {
        console.log('fetch failed', err);
    }
}

/*async function giphyConnectionWithTimeOut (url, timeout = 300) {
    console.log ("##f()## giphyConnectionWithTimeOut function execution");
    try {
        let answer = await Promise.race([fetch(url), new Promise((_,reject) => setTimeout( () => reject(new Error('timeout')), timeout))]);
        let info = await answer.json();    
        return info;    
    } catch (err) {
        console.log('fetch failed', err);
    }
}

async function objectize (response) {
    console.log ("##f()## objectize function execution");
    try {
        const info = await response.json();
        //console.log (await response.text());
        return info;
        //console.log (await response.text());
    } catch (err) {
        console.log('fetch failed', err);
    }
}*/

// giphyConnectionPost
async function giphyConnectionPost (url,form) {
    console.log ("##f()## giphyConnectionPost function execution");
    try {
         const resp = await fetch(url, {
        method: 'POST',
        body: form,
        headers: {'Access-Control-Allow-Origin': '*'}});
        const info = await resp.json();
        return info;
     }
    catch (err) {
        console.log('fetch failed', err);
    }
}


//++++ SEARCH-RESULTS FUNCTIONS ++++

// getSuggestions
function getSuggestions() {
    //searchPhraseActiveStyleActivation();
    console.log (new Date().toString()+" ##f()## getSuggestions function execution");
    if (searchInput.value) {         
        console.log("URL solicitada: "+`https://api.giphy.com/v1/gifs/search/tags?q=${searchInput.value}&api_key=${api_key}`);
        let gifAutocomplete = giphyConnection (`https://api.giphy.com/v1/gifs/search/tags?q=${searchInput.value}&api_key=${api_key}`);
        //let gifAutocomplete = giphyConnectionWithTimeOut (`https://api.giphy.com/v1/gifs/search/tags?q=${searchInput.value}&api_key=${api_key}`, 400);        
        gifAutocomplete.then (response => {
            console.log (response.data[0]);
            clearSuggestions();
            console.log ("Object array length: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("Name: "+response.data[i].name);
            }
            console.log("Length data type: "+typeof(response.data.length));
            if (response.data.length==0) {
                searchBarLineDeletion();
            } else {
                changeSearchPhraseStyle();
                drawSuggestions(response);  
            }
        }).catch(error => {
            console.log(error);
        });

        /*let gifSuggestions = giphyConnection (`http://api.giphy.com/v1/tags/related/${searchInput.value}?api_key=${api_key}`);
        //let gifSearchSuggestions = giphyConnection (`http://api.giphy.com/v1/tags/related/?term=${searchInput.value}&api_key=${api_key}`);
        gifSuggestions.then (response => {
            console.log (response.data[0]);
            console.log ("Longitud Array Objetos: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("Name: "+response.data[i].name);
            }
            //drawSuggestions(response);
        }).catch(error => {
            console.log(error);
        });*/
    } else {
        clearSuggestions();
        searchBarLineDeletion();
        changeSearchPhraseStyleReverse();
    }    
}

// searchBarLineDeletion deletes search bar line when number of suggestions is 0.
function searchBarLineCreation() {
    console.log ("##f()## searchBarLineCreation function execution");
    try{
        let horizontalBarPrevious = document.getElementById('horizontal-bar');
        if (!horizontalBarPrevious) {
            let horizontalBar = document.createElement('hr');
            horizontalBar.id = 'horizontal-bar';
            horizontalBar.classList.add('horizontal-bar');
            let searchPhrase = document.getElementById('search-phrase');
            searchPhrase.after(horizontalBar);
        }
        console.log ("Number of previous horizontal bars: "+horizontalBarPrevious);
    } catch (error) {
            console.log("Previous horizontal bars don´t exist");
    }
}

// searchBarLineDeletion deletes search bar line when number of suggestions is 0.
function searchBarLineDeletion() {
    console.log ("##f()## searchBarLineDeletion function execution");
    try {
        let searchBarLine = document.getElementById('horizontal-bar');
        searchBarLine.remove();
    } catch (err) {
        console.log('There is no search-bar line to delete');
    }
}
// changeSearchPhraseStyle adjusts search-phrase tag's style similarly to search-suggestion tags (MG on the left) and include image of 'X' symbol.
function changeSearchPhraseStyle() {
    console.log ("##f()## changeSearchInputStyle function execution");
    let searchBarInput = document.getElementById('search-phrase-input');
    searchBarInput.style.marginBottom = '10px';
    searchBarInput.style.order= '1';
    searchBarInput.style.marginLeft = '0px';
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.display = 'unset';
    searchPhraseMG.style.marginRight = '13px';
    searchPhraseMG.style.marginBottom = '12px';
    searchPhraseMG.style.order= '0';    
    let searchPhraseClear = document.getElementById('search-phrase-clear');
    searchPhraseClear.style.display = 'unset';
    let searchPhrase = document.getElementById('search-phrase');
    searchPhrase.style.justifyContent = 'flex-start';
    searchBarLineCreation();    
}

// changeSearchPhraseStyleReverse restore initial style of search-phrase tag.
function changeSearchPhraseStyleReverse() {
    console.log ("##f()## changeSearchPhraseStyleReverse function execution");
    let searchBarInput = document.getElementById('search-phrase-input');
    searchBarInput.style.marginBottom = '13px';
    searchBarInput.style.order= '0';
    searchBarInput.style.marginLeft = '55px';
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.marginBottom = '15px';
    searchPhraseMG.style.marginRight = '20px';
    searchPhraseMG.style.order= '1';
    let searchPhraseClear = document.getElementById('search-phrase-clear');
    searchPhraseClear.style.display = 'none';
    searchPhraseClear.style.order = '2';
    let searchPhrase = document.getElementById('search-phrase');
    searchPhrase.style.justifyContent = 'space-between';
    searchBarLineDeletion();
}

// clearSuggestions erases suggestions obtained previously when a new letter is typed.
function clearSuggestions(){
    console.log ("##f()## clearSuggestions function execution");
    let searchSuggestions = document.getElementsByClassName('search-suggestion');
    console.log("Number of previous suggestions to be cleared:"+searchSuggestions.length);
    console.log("Parent node which suggestions will be cleared from: ");
    if (searchSuggestions.length>0) {
        for (let i=0; i<searchSuggestions.length; i++) {
            console.log(searchSuggestions[i].parentNode);
            let suggestionParentNode= searchSuggestions[i].parentNode;
            suggestionParentNode.removeChild(searchSuggestions[i]);
            i--;
        }
    }
}

// drawSuggestions modifies DOM to include suggestions in searching area based on search-suggestion tag model.
function drawSuggestions (suggestions) {
    console.log ("##f()## drawSuggestions function execution");
    let suggestionModel= document.createElement('div');
    suggestionModel.classList.add('search-suggestion');
    let suggestionModelImg= document.createElement('img');
    if(!queryDarkMode()) {
        suggestionModelImg.src="images/icon-search.svg";
    } else {
        suggestionModelImg.src="images/icon-search-modo-noc.svg";
    }
    let suggestionModelP = document.createElement('p');
    suggestionModelP.text="Sugerencia";
    suggestionModel.appendChild(suggestionModelImg);
    suggestionModel.appendChild(suggestionModelP);
    console.log(suggestionModel[0]);
    console.log ("Start iteration for drawing suggestions");
    for (let i=0; i<suggestions.data.length; i++) {
        console.log("Name: "+suggestions.data[i].name);  
        let suggestion = suggestionModel.cloneNode(true);
        console.log("suggestion "+i);  
        console.log(suggestion);  
        let parrafo = suggestion.getElementsByTagName('p');
        console.log(parrafo[0].textContent);
        parrafo[0].innerHTML=suggestions.data[i].name;
        console.log(parrafo[0].textContent);
        suggestion.classList.remove('hide');
        suggestion.classList.add('active-suggestion');
        suggestion.addEventListener('click', function() { gifSearch(parrafo[0].textContent); });
        let searchBar =  document.getElementsByClassName('search-bar');
        searchBar[0].appendChild(suggestion);
    }
}

// gifSearch
function gifSearch(searchPhrase) {
    console.log ("##f()## gifSearch function execution");
    location.hash = "#" + "trending-terms";
    displaySuggestionAsSearchPhrase(searchPhrase);
    displaySearchResultsArea();
    let q = searchPhrase;
    let limit = 12;
    let offset = 0;
    console.log(`https://api.giphy.com/v1/gifs/search?q=${q}&limit=${limit}&offset=${offset}&api_key=${api_key}`);
    let gifSearch = giphyConnection (`https://api.giphy.com/v1/gifs/search?q=${q}&limit=${limit}&offset=${offset}&api_key=${api_key}`);
    gifSearch.then (response => {
            console.log (response.data[0]);
            console.log ("Longitud Array Objetos: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("ID: "+response.data[i].id);
            }
            console.log (response);
            clearPreviousResults();
            drawSearchResultsAreaTitle();
            if (response.data.length>0) {
                clearNoResultsAlert();
                drawSearchResults(response);
            } else {
                drawNoResultsAlert();
            }
            drawMoreResultsButton(response.pagination);
    }).catch(error => {
        console.log(error);
    })
}

// gifSearchOffset
function gifSearchOffset(offsetRequested) {
    console.log ("##f()## gifSearchOffset function execution");
    let searchBarInput = document.getElementById('search-phrase-input');
    let q = searchBarInput.value;
    let limit = 12;
    let offset = offsetRequested;
    console.log(`https://api.giphy.com/v1/gifs/search?q=${q}&limit=${limit}&offset=${offset}&api_key=${api_key}`);
    let gifSearch = giphyConnection (`https://api.giphy.com/v1/gifs/search?q=${q}&limit=${limit}&offset=${offset}&api_key=${api_key}`);
    gifSearch.then (response => {
            console.log (response.data[0]);
            console.log ("Longitud Array Objetos: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("ID: "+response.data[i].id);
            }
            console.log (response);
            //If offsetRequested is given, drawMoreResults function  is used instead of drawSearchResults.
            drawSearchResults(response);
            drawMoreResultsButton(response.pagination);
    }).catch(error => {
        console.log(error);
    })
}

// displaySearchResultsArea
function displaySearchResultsArea() {
    console.log ("##f()## displaySearchResultsArea function execution");
    searchResultsSeparator.classList.remove('hide');
    searchResults.style.display = 'flex';
}

// clearNoResultsAlert helps to hide a No Results Alert when a new GIf search finally shows results.
function clearNoResultsAlert() {
    console.log ("##f()## clearNoResultsAlert function execution");
    try {
        let noResultsIcon= document.getElementById('no-results-icon');
        let noResultsText= document.getElementById('no-results-text');
        let noResultsIconClasses = noResultsIcon.classList;
        console.log("Clases del ícono de No Results: "+noResultsIconClasses);
        console.log(noResultsIconClasses.length);
        if(noResultsIconClasses.length==1){
            noResultsIcon.classList.add('hide');
            noResultsText.classList.add('hide');
        }
    } catch (err) {
        console.log("There is no No Results Alert to delete"+err);
    }
}

// clearPreviousResults
function clearPreviousResults() {
    console.log ("##f()## clearPreviousResults function execution");   
    if ( results.hasChildNodes() ) {
        while (results.childNodes.length>=1) {
            results.removeChild(results.firstChild);
        }
    }
}

// drawSearchResultsAreaTitle
function drawSearchResultsAreaTitle (searchResults) {
    console.log ("##f()## drawSearchResultsAreaTitle function execution");
    searchResultsTitle.textContent=searchInput.value;
}

// normalizeResponse
function normalizeResponse (response){
    let normalizeResponse;
    let reponseObject;
    for (let i=0; i<response.data.length; i++) {
        reponseObject = {
            "Id": searchResults.data[i].id,
            "user": searchResults.data[i].username,
            "title": searchResults.data[i].title,
            "url": searchResults.data[i].images.fixed_height.url,
            "originalUrl": searchResults.data[i].images.original.url,
        }
        if(i==0) {
            normalizeResponse = [ responseObject ];
        } else {
            normalizeResponse.push(responseObject);
        }
    }   
    return normalizedResponse;
}


// drawSuggestions modifies DOM to include GIFs in results area.
function drawSearchResults (searchResults) {
    console.log ("##f()## drawSearchResults function execution");
    let results = document.getElementById('results');
    results.classList.remove('hide');
    console.log ("Start iteration for drawing results");
    for (let i=0; i<searchResults.data.length; i++) {
        results.appendChild(createGifoCard(1+searchResults.pagination.offset+i, searchResults.data[i].id, searchResults.data[i].username, searchResults.data[i].title, searchResults.data[i].images.fixed_height.url, searchResults.data[i].images.original.url, "results"));
        queryFavorite(searchResults.data[i].id, "results");       
    }
}

// drawNoResultsAlert
function drawNoResultsAlert () {
    console.log ("##f()## drawNoResultsMessage function execution");
    let noResultsIcon = document.getElementById('no-results-icon');
    noResultsIcon.classList.remove('hide');
    let noResultsText = document.getElementById('no-results-text');
    noResultsText.classList.remove('hide');
}

// drawMoreResultsButton
function drawMoreResultsButton (paginationObject) {
    console.log ("##f()## drawMoreResultsButton function execution");
    if (paginationObject.offset==0) {
        moreResultsButton.setAttribute('offset', 0);
    }
    let remainingResults = paginationObject.total_count-(paginationObject.offset+paginationObject.count);
    console.log("Resultados restantes: "+remainingResults);
    if (remainingResults>0) {
        let moreResultsButton = document.getElementById('more-results');
        moreResultsButton.classList.remove('hide');
    } else {
        moreResultsButton.classList.add('hide');
    }
}

//displaySuggestionAsSearchPhrase shows suggestion clicked as search phrase.
function displaySuggestionAsSearchPhrase(suggestion) {
    console.log ("##f()## displaySuggestionAsSearchPhrase function execution");
    let searchBarInput = document.getElementById('search-phrase-input');
    searchBarInput.value=suggestion;
    //searchBarInput.readOnly= true;
    clearSuggestions();
    changeSearchPhraseStyleReverse();
    replaceMgByClear();
    return suggestion;
}

// replaceMgByClear
function replaceMgByClear() {
    console.log ("##f()## replaceMgByClear function execution");
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.display = 'none';
    let searchPhraseClear = document.getElementById('search-phrase-clear');
    searchPhraseClear.style.display = 'unset';
}

// replaceMgByClearReverse
function replaceMgByClearReverse() {
    console.log ("##f()## replaceMgByClearReverse function execution");
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.display = 'unset';
    let searchPhraseClear = document.getElementById('search-phrase-clear');
    searchPhraseClear.style.display = 'none';
}

// clearSearchPhrase
function clearSearchPhrase() {
    console.log ("##f()## clearSearchPhrase function execution");
    let searchBarInput = document.getElementById('search-phrase-input');
    searchBarInput.readOnly= false;
    searchBarInput.value= "";
    clearSuggestions();
    changeSearchPhraseStyleReverse();
    replaceMgByClearReverse();
}

// drawMoreResults
function drawMoreResults() {
    console.log ("##f()## drawMoreResults function execution");
    let moreResultsButton = document.getElementById('more-results');
    console.log("Offset al solicitar más resultados: "+moreResultsButton.getAttribute('offset'));
    let newOffset = parseInt(moreResultsButton.getAttribute('offset'))+12;
    gifSearchOffset(newOffset);
    moreResultsButton.setAttribute('offset', newOffset);
}


//++++ MAXIMIZED FUNCTIONS ++++

// maximizeSearchResult
function maximizeSearchResult(resultId, resultUser, resultName, resultUrl, resultOriginalUrl, trendingFlagArg) {
    console.log ("##f()## maximizeSearchResult function execution");
    maximizedResultImg.src="";
    maximizedLikeButton.src="images/icon-fav-hover.svg";  
    hideContentForMaximizing();
    maximizedResultImg.src=resultOriginalUrl;
    console.log(resultUser);
    console.log(resultName);
    if(resultUser) {
        maximizedResultUser.textContent=resultUser;
    } else {
        maximizedResultUser.textContent="Autor no registrado";
    }
    if(resultName) {
        maximizedResultTitle.textContent=resultName;
    } else {
        maximizedResultTitle.textContent="Título no registrado.";
    }
    downloadFunction = function (e) { 
        var x=new XMLHttpRequest();
        x.open("GET", resultOriginalUrl, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, "GIFOS_"+resultId+".gif", "image/gif" ); }
        x.send(); 
    }
    maximizedDownloadBorder.addEventListener("click", downloadFunction, true);
    setFavoriteFunction = function (e) { 
        setFavorite(resultId, resultUser, resultName, resultUrl, resultOriginalUrl, "maximized"); 
    }
    trashFunction = function (e) { 
        trash (resultId);
        maximizedTrashButton.removeEventListener('click', trashFunction, true); 
    }
    queryFavorite(resultId,"maximized");
    maximizedLikeBorder.addEventListener('click', setFavoriteFunction, true);
    maximizedTrashBorder.addEventListener('click', trashFunction, true);


    if(trendingFlagArg==true) {
        trendingFlag=true;
        console.log ("trendingFlag: "+trendingFlag);
        maximizedTrashBorder.style.display = 'none';
        maximizedLikeBorder.style.display = 'flex';
    } else if(myGifosFlag==true) {
            maximizedLikeBorder.style.display = 'none';
            maximizedTrashBorder.style.display = 'flex';
    } else if (favoritesFlag==true) {
            maximizedTrashBorder.style.display = 'none';
            maximizedLikeBorder.style.display = 'flex';
    } else {
        maximizedTrashBorder.style.display = 'none';
        maximizedLikeBorder.style.display = 'flex';
    }
    maximized.classList.remove('hide');
    favoritesPagination=0;
    myGifosPagination=0;
    if(trendingFlagArg==true) {
        trendingFlag=true;
    }
    console.log ("myGifosFlag: "+myGifosFlag);
    console.log ("favoritesFlag: "+favoritesFlag);
    console.log ("trendingFlag: "+trendingFlag);
}

// hideContentForMaximizing
function hideContentForMaximizing () {
    console.log ("##f()## hideContentForMaximizing function execution");
    header[0].classList.add('hide');
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.style.display = 'none';
    trendingGifos.classList.add('hide');
    favorites.style.display='none';
    myGifos.style.display='none';
    footer[0].classList.add('hide');
}

// hideContentForMaximizingReverse
function hideContentForMaximizingReverse (favoritesFlag,myGifosFlag) {
    console.log ("##f()## hideContentForMaximizingReverse function execution");
    maximized.classList.add('hide');
    header[0].classList.remove('hide');
    banner.style.display='flex';
    trendingTerms.classList.remove('hide');
    trendingGifos.classList.remove('hide');
    footer[0].classList.remove('hide');
    maximizedDownloadBorder.removeEventListener("click", downloadFunction, true);
    maximizedLikeBorder.removeEventListener('click', setFavoriteFunction, true);
    console.log("Flag favorites: "+favoritesFlag);
    console.log ("Flag myGifos: "+myGifosFlag);
    console.log ("Flag trending: "+trendingFlag);
    if (favoritesFlag) {
        console.log("Permanezco en Favoritos");
        showFavorites();
    } else if (myGifosFlag) {
        console.log("Permanezco en Mis Gifos");
        showMyGifos();
    } else if (trendingFlag) {
        console.log("Permanezco en Trending");
        console.log(document.getElementById('results').childNodes);
        if(document.getElementById('results').childNodes.length!=0) {
            searchResultsSeparator.classList.remove('hide');
            searchResults.style.display = 'flex';
        }
    } else {
        if(document.getElementById('results').childNodes.length!=0) {
            searchResultsSeparator.classList.remove('hide');
            searchResults.style.display = 'flex';
        }
    }
    trendingFlag=false;
}

// queryFavorite
function queryFavorite (resultId, context) {
    console.log ("##f()## queryFavorite function execution");
    let savedFavoritesObject = JSON.parse(localStorage.getItem('favorites'));
    /*try {
        if(JSON.parse(localStorage.getItem('favorites')).length == undefined) {
            savedFavoritesObject= new Array (JSON.parse(localStorage.getItem('favorites')));
        } else {
            savedFavoritesObject= JSON.parse(localStorage.getItem('favorites'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('favorites')).length failed", err);
        savedFavoritesObject= JSON.parse(localStorage.getItem('favorites'));
    }*/
    maximizedLikeBorder.classList.add('maximized-like-border');
    maximizedLikeBorder.classList.remove('maximized-like-border-no-hover');
    if (savedFavoritesObject!=null) { 
        if((savedFavoritesObject.findIndex(element => element.Id==resultId))!==-1) {
            console.log("queryFavorite: context=> "+context);
            switch(context) {
                case "results":
                    if(results.getElementsByClassName("r_"+resultId).length!=0) {
                        results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                        results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
                    }
                    break;
                case "maximized":
                    maximizedLikeButton.src="images/icon-fav-active.svg";
                    maximizedLikeBorder.classList.add('maximized-like-border-no-hover');
                    maximizedLikeBorder.classList.remove('maximized-like-border');
                    break;
                case "favorites":
                    if(favoritesResults.getElementsByClassName("f_"+resultId).length!=0) {
                        favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                        favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
                    }
                    break;
                case "trending":
                    if(carousel.getElementsByClassName("t_"+resultId).length!=0) {
                        carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                        carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
                    }
                    break;
                default:
                    break;            
            }
        }
    }
}

// setFavorite
function setFavorite (resultId, resultUser, resultName, resultUrl, resultOriginalUrl, context) {
    console.log ("##f()## setFavorite function execution");
    let savedFavoritesObject = new Array();
    savedFavoritesObject = JSON.parse(localStorage.getItem('favorites'));      
    /*try {
        if(JSON.parse(localStorage.getItem('favorites')).length == undefined) {
            savedFavoritesObject= new Array (JSON.parse(localStorage.getItem('favorites')));
        } else {
            savedFavoritesObject= JSON.parse(localStorage.getItem('favorites'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('favorites')).length failed", err);
    }*/
    if (savedFavoritesObject!=null) {
        console.log ("Hay favoritos."); 
        //savedFavoritesObject = new Array (JSON.parse(localStorage.getItem('favorites')));
        //console.log (savedFavoritesObject[0]);
        //console.log("Cantidad de favoritos guardados previos: "+Object.keys(savedFavoritesObject).length);
        //console.log("Cantidad de favoritos guardados previos: "+savedFavoritesObject.length);
        /*savedFavoritesObject.forEach(element => {
            console.log("Saved ID: "+element.Id)
        });*/
        console.log("resultId: "+resultId);
        console.log("Índice del maximizado: "+savedFavoritesObject.findIndex(element => element.Id==resultId));
        if((savedFavoritesObject.findIndex(element => element.Id==resultId))==-1) {
            console.log ("No era favorito, ahora lo será."); 
            let newFavorite = {
                "Id": resultId,
                "user": resultUser,
                "title": resultName,
                "url": resultUrl,
                "originalUrl": resultOriginalUrl,
            }
            console.log("Objeto newFavorite: "+JSON.stringify(newFavorite));
            savedFavoritesObject.unshift(newFavorite);
            localStorage.removeItem('favorites');
            localStorage.setItem('favorites',JSON.stringify(savedFavoritesObject));
            console.log("Array Favorites: "+savedFavoritesObject);
            console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));
            maximizedLikeButton.src="images/icon-fav-active.svg";
            maximizedLikeBorder.classList.add('maximized-like-border-no-hover');
            maximizedLikeBorder.classList.remove('maximized-like-border'); 
            if(results.getElementsByClassName("r_"+resultId).length!=0) {
                results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
            } 
            if(favoritesResults.getElementsByClassName("f_"+resultId).length!=0) {
                favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
            }
            if(carousel.getElementsByClassName("t_"+resultId).length!=0) {
                carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
                carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
            }
        } else {
            console.log ("Era favorito, ahora ya no lo será."); 
            let newFavorite = {
                "Id": resultId,
                "user": resultUser,
                "title": resultName,
                "url": resultUrl,
                "originalUrl": resultOriginalUrl,
            }
            console.log("Objeto newFavorite: "+JSON.stringify(newFavorite));
            savedFavoritesObject.splice(savedFavoritesObject.findIndex(element => element.Id==resultId),1);
            localStorage.removeItem('favorites');
            localStorage.setItem('favorites',JSON.stringify(savedFavoritesObject));
            console.log("Array Favorites: "+savedFavoritesObject);
            console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));
            maximizedLikeButton.src="images/icon-fav-hover.svg";  
            maximizedLikeBorder.classList.add('maximized-like-border');
            maximizedLikeBorder.classList.remove('maximized-like-border-no-hover');  
            if(results.getElementsByClassName("r_"+resultId).length!=0) {
                results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-hover.svg";
                results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='0.7';
            }
            if(favoritesResults.getElementsByClassName("f_"+resultId).length!=0) {
                favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-hover.svg";
                favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='0.7';
            }
            if(carousel.getElementsByClassName("t_"+resultId).length!=0) {
                carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-hover.svg";
                carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='0.7';
            }
        }    
    } else {
        console.log ("No hay favoritos. Ahora habrá un favorito"); 
        let newFavorite = {
            "Id": resultId,
            "user": resultUser,
            "title": resultName,
            "url": resultUrl,
            "originalUrl": resultOriginalUrl,
        }
        savedFavoritesObject = [ newFavorite ];   
        localStorage.removeItem('favorites');
        localStorage.setItem('favorites',JSON.stringify(savedFavoritesObject));
        console.log("Array Favorites: "+savedFavoritesObject);
        console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));
        maximizedLikeButton.src="images/icon-fav-active.svg";
        maximizedLikeBorder.classList.add('maximized-like-border-no-hover');
        maximizedLikeBorder.classList.remove('maximized-like-border'); 
        if(results.getElementsByClassName("r_"+resultId).length!=0) {
            results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
            results.getElementsByClassName("r_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
        } 
        if(favoritesResults.getElementsByClassName("f_"+resultId).length!=0) {
            favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
            favoritesResults.getElementsByClassName("f_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
        }
        if(carousel.getElementsByClassName("t_"+resultId).length!=0) {
            carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('like-button')[0].src="images/icon-fav-active.svg";
            carousel.getElementsByClassName("t_"+resultId)[0].getElementsByClassName('gifo-like-border')[0].style.opacity='unset';
        }
    }
    if(context!="maximized") { 
        if(favoritesFlag==true) {
            showFavorites();                
        }
    }
}

// trash
function trash(resultId) {
    console.log ("##f()## trash function execution");
    console.log("resultId a eliminar: "+resultId);
    savedMyGifosObject = new Array();
    savedMyGifosObject = JSON.parse(localStorage.getItem('mygifos'));
    try {
        if(JSON.parse(localStorage.getItem('mygifos')).length == undefined) {
            savedMyGifosObject= new Array (JSON.parse(localStorage.getItem('mygifos')));
        } else {
            savedMyGifosObject= JSON.parse(localStorage.getItem('mygifos'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('mygifos')).length failed", err);
    }
    //let savedMyGifosString = localStorage.getItem('mygifos');
    //let savedMyGifosObject = JSON.parse(savedMyGifosString);
    console.log("Longitud Item mygifos previo al borrado: "+savedMyGifosObject.length);
    savedMyGifosObject.splice(savedMyGifosObject.findIndex(element => element.Id==resultId),1);   
    localStorage.setItem('mygifos',JSON.stringify(savedMyGifosObject));
    savedMyGifosString = localStorage.getItem('mygifos');
    savedMyGifosObject = JSON.parse(savedMyGifosString);
    console.log("Longitud Item mygifos posterior al borrado: "+savedMyGifosObject.length);
    showMyGifos();
}

// download
function download(data, strFileName, strMimeType) {
    console.log ("##f()## download function execution");
    var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        url = !strFileName && !strMimeType && payload,
        anchor = document.createElement("a"),
        toString = function(a){return String(a);},
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
    myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
    if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        payload=[payload, mimeType];
        mimeType=payload[0];
        payload=payload[1];
    }
    if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
        fileName = url.split("/").pop().split("?")[0];
        anchor.href = url; // assign href prop to temp anchor
          if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
            var ajax=new XMLHttpRequest();
            ajax.open( "GET", url, true);
            ajax.responseType = 'blob';
            ajax.onload= function(e){ 
              download(e.target.response, fileName, defaultMime);
            };
            setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
            return ajax;
        } // end if valid url?
    } // end if url?
    //go ahead and download dataURLs right away
    if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
        if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
            payload=dataUrlToBlob(payload);
            mimeType=payload.type || defaultMime;
        }else{			
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                saver(payload) ; // everyone else can save dataURLs un-processed
        }
    }//end if dataURL passed?
    blob = payload instanceof myBlob ?
        payload :
        new myBlob([payload], {type: mimeType}) ;
    function dataUrlToBlob(strUrl) {
        var parts= strUrl.split(/[:;,]/),
        type= parts[1],
        decoder= parts[2] == "base64" ? atob : decodeURIComponent,
        binData= decoder( parts.pop() ),
        mx= binData.length,
        i= 0,
        uiArr= new Uint8Array(mx);
        for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
        return new myBlob([uiArr], {type: type});
     }
    function saver(url, winMode){
        if ('download' in anchor) { //html5 A[download]
            anchor.href = url;
            anchor.setAttribute("download", fileName);
            anchor.className = "download-js-link";
            anchor.innerHTML = "downloading...";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            setTimeout(function() {
                anchor.click();
                document.body.removeChild(anchor);
                if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
            }, 66);
            return true;
        }
        // handle non-a[download] safari as best we can:
        if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
            url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            if(!window.open(url)){ // popup blocked, offer direct download:
                if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
            }
            return true;
        }
        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);
        if(!winMode){ // force a mime that will download:
            url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src=url;
        setTimeout(function(){ document.body.removeChild(f); }, 333);
    }//end saver
    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
    }
    if(self.URL){ // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
    }else{
        // handle non-Blob()+non-URL browsers:
        if(typeof blob === "string" || blob.constructor===toString ){
            try{
                return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
            }catch(y){
                return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
            }
        }
        // Blob but not URL support:
        reader=new FileReader();
        reader.onload=function(e){
            saver(this.result);
        };
        reader.readAsDataURL(blob);
    }
    return true;
}; /* end download() */


//++++ FAVORITES ++++

// showFavorites
function showFavorites() {
    console.log ("##f()## showFavorites function execution");
    sandwich.checked= false;
    if(!queryDarkMode()) {
        sandwichIcon.src = "images/burger.svg";
        if (!bp1.matches) { // If media query matches
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].style.color = '#572EE5';
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].classList.remove('underline-deco');
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#9CAFC3';
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#572EE5';
        }
    } else {
        sandwichIcon.src = "images/burger-modo-noc.svg";    
        if (!bp1.matches) { // If media query matches
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].classList.remove('underline-deco');
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#9CAFC3';
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
        }
    }
    hideContentForFavorites();
    favoritesFlag=true;
    myGifosFlag=false;
    favoritesPagination=0;
    clearNoFavoritesAlert();
    clearPreviousFavorites();
    hideContentForFavorites();
    //let favoritesObject= new Array();
    let favoritesObject = JSON.parse(localStorage.getItem('favorites'));
    console.log("Tipo de favoritesObject: "+typeof(favoritesObject));
    /*try {
        if(JSON.parse(localStorage.getItem('favorites')).length == undefined) {
            favoritesObject= new Array (JSON.parse(localStorage.getItem('favorites')));
        } else {
            favoritesObject= JSON.parse(localStorage.getItem('favorites'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('favorites')).length failed", err);
    }
    try {
        console.log("Longitud de favoritos: "+favoritesObject.length);
    } catch (err) {
        console.log('favoritesObject.length failed', err);
    }*/
    if(favoritesObject!=null && favoritesObject.length!=0) {
        /*favoritesObject.forEach(element => {
            console.log("Id: "+element.Id);            
        });*/
        drawGifos(favoritesObject,"favorites");
        drawMoreFavoritesButton(favoritesObject,favoritesPagination);
        
    } else {
        drawNoFavoritesAlert();
    }
}

// hideContentForFavorites
function hideContentForFavorites() {
    console.log ("##f()## hideContentForFavorites function execution");
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.style.display = 'none';
    maximized.classList.add('hide');
    favorites.style.display='flex';
    myGifos.style.display='none';
    createGifos.style.display='none';
}


//++++ TRENDING TERMS FUNCIONS ++++

// getTrendingSearchTerms
function getTrendingTerms() {
    console.log ("##f()## getTrendingTerms function execution");
    console.log(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
    let trendingText = "";
    let trendingTermsResult = document.getElementById('trending-terms-results');
    let trendTermModel = document.createElement('span');
    let gifTrendingSearchTerms = giphyConnection (`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
    gifTrendingSearchTerms.then (response => {
        console.log("Trending Search Terms: "+response.data);
        for (let i=0; i<response.data.length; i++) {
            let trendingTerm = document.createElement('span');
            if(i==(response.data.length-1)) {
                trendingTerm.textContent = response.data[i];
            } else {
                trendingTerm.textContent+=response.data[i]+", ";
            }
            trendingTerm.classList.add('trending-term');
            trendingTerm.addEventListener('click', function() { gifSearch(response.data[i]); });
            trendingTermsResult.appendChild(trendingTerm);
        }
        console.log("Trending Text: "+trendingText);
        console.log(trendingTermsResult.textContent);       
    }).catch(error => {
        console.log(error);
    });
}


//++++ TRENDING GIFOS FUNCTIONS ++++

//showTrending
function showTrending () {  
    console.log ("##f()## showTrending function execution");  
    if(bp1.matches) {
        console.log ("Create mobile trending");
        trendingGalleryDesktop.style.display = 'flex';
        trendingGalleryDesktop.style.display = 'none';
        let trendingItemModel= document.createElement('li');
        trendingItemModel.classList.add('trending-item');
        let trendingItemImgModel= document.createElement('img');
        trendingItemModel.appendChild(trendingItemImgModel);
        //let trendingGallery = document.getElementById('trending-gallery');
        let gifTrending = giphyConnection (`https://api.giphy.com/v1/gifs/trending?limit=25&api_key=${api_key}`);
        gifTrending.then (response => {
            console.log("GIF Trending");
            //console.log (response.data[0]);
            console.log ("Longitud Array Objetos Trending: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("ID: "+response.data[i].id);
            }
            console.log ("Start iteration for drawing trending");
            for (let i=0; i<response.data.length; i++) {
                console.log ("Entro al for de la iteration");
                let trendingItem = trendingItemModel.cloneNode(true);
                trendingItem.setAttribute("order",1+i);
                trendingItem.setAttribute("id",response.data[i].id);
                trendingItem.setAttribute("user",response.data[i].username);
                trendingItem.setAttribute("title",response.data[i].title);
                let trendingItemImg = trendingItem.getElementsByTagName('img');
                trendingItemImg[0].src = response.data[i].images.fixed_height.url;
                trendingItem.addEventListener('click', function() { maximizeSearchResult(response.data[i].id, response.data[i].username, response.data[i].title, response.data[i].images.fixed_height.url, response.data[i].images.original.url, true); });
                trendingGallery.appendChild(trendingItem);
            }        
        }).catch(error => {
        console.log(error);
        })
    } else {
        console.log ("Create deskptop trending");
        trendingGallery.style.display = 'none';
        trendingGalleryDesktop.classList.remove('hide');
        
        let gifTrending = giphyConnection (`https://api.giphy.com/v1/gifs/trending?limit=25&api_key=${api_key}`);
        gifTrending.then (response => {
            console.log("GIF Trending");
            //console.log (response.data[0]);
            console.log ("Longitud Array Objetos Trending: "+ response.data.length);
            for (let i=0; i<response.data.length; i++) {
                console.log("ID: "+response.data[i].id);
            }
            console.log ("Start iteration for drawing trending");
            for (let i=0; i<response.data.length; i++) {
                if(i==0){
                    trendingGalleryDesktopItems = [ createGifoCard(i+1,response.data[i].id, response.data[i].username, response.data[i].title, response.data[i].images.fixed_height.url, response.data[i].images.original.url,"trending") ];
                } else {
                    trendingGalleryDesktopItems.push(createGifoCard(i+1,response.data[i].id, response.data[i].username, response.data[i].title, response.data[i].images.fixed_height.url, response.data[i].images.original.url,"trending"));
                }
                if (i==0 || i==1 || i==2) {
                    carousel.appendChild(createGifoCard(i+1,response.data[i].id, response.data[i].username, response.data[i].title, response.data[i].images.fixed_height.url, response.data[i].images.original.url,"trending")); 
                    queryFavorite(response.data[i].id, "trending");
                }       
            }
            console.log("Longitud de trendingGalleryDesktopItems: "+trendingGalleryDesktopItems.length);   
        }).catch(error => {
        console.log(error);
        })
    }
}


function createGifoCard (gifoDataOrder, gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, context ) {
    console.log ("##f()## createGifoCard function execution");
    let gifoModel= document.createElement('div');
    gifoModel.classList.add('gifo');
    let gifoContainerModel= document.createElement('div');    
    gifoContainerModel.classList.add('gifo-container');
    let gifoContainerImgModel= document.createElement('img');
    gifoContainerImgModel.classList.add('gifo-container-img');
    let gifoContainerLayerModel= document.createElement('div');
    gifoContainerLayerModel.classList.add('gifo-container-layer');
    gifoContainerModel.appendChild(gifoContainerImgModel);
    gifoContainerModel.appendChild(gifoContainerLayerModel);

    let gifoOptions = document.createElement('div');
    gifoOptions.classList.add('gifo-options');

    let gifoMaximizeBorder = document.createElement('div');
    gifoMaximizeBorder.classList.add('gifo-maximize-border','gifo-border');
    let maximizeButton = document.createElement('img');
    maximizeButton.classList.add('maximize-button');
    maximizeButton.src = 'images/icon-max.svg';
    gifoMaximizeBorder.appendChild(maximizeButton);
    

    let gifoDownloadBorder = document.createElement('div');
    gifoDownloadBorder.classList.add('gifo-download-border', 'gifo-border');
    let downloadButton = document.createElement('img');
    downloadButton.classList.add('download-button', 'gifo-button');
    downloadButton.src = 'images/icon-download.svg';
    gifoDownloadBorder.appendChild(downloadButton);           

    let gifoUser = document.createElement('div');
    gifoUser.classList.add('gifo-user');
    let gifoTitle = document.createElement('div');
    gifoTitle.classList.add('gifo-title');
   
    gifoModel.appendChild(gifoContainerModel);
    gifoModel.appendChild(gifoOptions);
    gifoModel.appendChild(gifoUser);
    gifoModel.appendChild(gifoTitle);

    if (context!="mygifos" ) {
        let gifoLikeBorder = document.createElement('div');
        gifoLikeBorder.classList.add('gifo-like-border', 'gifo-border');
        let likeButton = document.createElement('img');
        likeButton.classList.add('like-button', 'gifo-button');
        likeButton.src = 'images/icon-fav-hover.svg';
        gifoLikeBorder.appendChild(likeButton);
        gifoOptions.appendChild(gifoLikeBorder);
    }
    if (context=="mygifos") {
        let gifoTrashBorder = document.createElement('div');
        gifoTrashBorder.classList.add('gifo-trash-border', 'gifo-border');
        let trashButton = document.createElement('img');
        trashButton.classList.add('trash-button', 'gifo-button');
        trashButton.src = 'images/icon_trash.svg';
        gifoTrashBorder.appendChild(trashButton);
        gifoOptions.appendChild(gifoTrashBorder);
    }
    gifoOptions.appendChild(gifoDownloadBorder);
    gifoOptions.appendChild(gifoMaximizeBorder);
    let gifo = gifoModel.cloneNode(true);
    gifo.setAttribute("order",gifoDataOrder);
    gifo.setAttribute("id",gifoDataId);
    gifo.setAttribute("user",gifoDataUser);
    gifo.setAttribute("title",gifoDataTitle);
    switch(context) {
        case "results":
            gifo.classList.add("r_"+gifoDataId);
        break;
        case "favorites":
            gifo.classList.add("f_"+gifoDataId);
        break;
        case "mygifos":
            gifo.classList.add("m_"+gifoDataId);
        break;
        case "trending":
            gifo.classList.add("t_"+gifoDataId);
        break;
    }
    console.log(gifo);  
    console.log("searchResultContainerModel: ");
    console.log(gifo.getElementsByTagName('div')[0]);
    console.log("searchResultContainerImgModel: ");
    console.log(gifo.getElementsByTagName('div')[0].getElementsByTagName('img')[0]);
    gifo.getElementsByTagName('div')[0].getElementsByTagName('img')[0].src = gifoDataUrl;
    if(gifoDataUser) {
        gifo.getElementsByClassName('gifo-user')[0].textContent = gifoDataUser;
    } else {
        gifo.getElementsByClassName('gifo-user')[0].textContent = "Usuario no registrado"
    }
    if(gifoDataTitle) {
        gifo.getElementsByClassName('gifo-title')[0].textContent = gifoDataTitle;
    } else {
        gifo.getElementsByClassName('gifo-title')[0].textContent = "Título no registrado"
    }        
    if(bp1.matches) { // If media query matches
        console.log("Genera vista móvil"); 
        gifo.addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, true); });
        /*if (context=="favorites") {
            favoritesResults.appendChild(gifo);
        } else if (context=="mygifos") {
            myGifosResults.appendChild(gifo);
        }*/
    } else {
        console.log("Genera vista escritorio"); 
        gifo.addEventListener('mouseover', function () { addGifoCardStyle (gifo) });
        gifo.addEventListener('mouseout', function () { removeGifoCardStyle (gifo) });
        //gifo.getElementsByClassName('gifo-maximize-border')[0].addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, true); });
        downloadFunction = function (e) { 
            console.log ("##f()##  downloadFunction var function execution");
            var x=new XMLHttpRequest();
            console.log ("URL de descarga: "+gifoDataOriginalUrl);
            x.open("GET", gifoDataOriginalUrl, true);
            x.responseType = 'blob';
            x.onload=function(e){download(x.response, "GIFOS_"+gifoDataId+".gif", "image/gif" ); }
            x.send(); 
        }
        gifo.getElementsByClassName('gifo-download-border')[0].addEventListener("click", downloadFunction, true);
        switch(context) {
            case "results":
                gifo.getElementsByClassName('gifo-maximize-border')[0].addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, false); });
                setFavoriteFunction = function (e) { 
                    setFavorite(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, "results"); 
                }
                gifo.getElementsByClassName('gifo-like-border')[0].addEventListener('click', setFavoriteFunction, true);
            break;
            case "favorites":
                gifo.getElementsByClassName('gifo-maximize-border')[0].addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, false); });
                setFavoriteFunction = function (e) { 
                    setFavorite(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, "favorites"); 
                }
                gifo.getElementsByClassName('gifo-like-border')[0].addEventListener('click', setFavoriteFunction, true);
            break;
            case "mygifos":
                gifo.getElementsByClassName('gifo-maximize-border')[0].addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, false); });
                trashFunction = function (e) { 
                    trash (gifoDataId);
                }
                gifo.getElementsByClassName('gifo-trash-border')[0].addEventListener('click', trashFunction, true); 
            break;
            case "trending":
                gifo.getElementsByClassName('gifo-maximize-border')[0].addEventListener('click', function() { maximizeSearchResult(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, true); });
                setFavoriteFunction = function (e) { 
                    setFavorite(gifoDataId, gifoDataUser, gifoDataTitle, gifoDataUrl, gifoDataOriginalUrl, "trending"); 
                }
                gifo.getElementsByClassName('gifo-like-border')[0].addEventListener('click', setFavoriteFunction, true);
            break;
        }
    }
    return gifo;
} 

function nextGifo() {
    console.log ("##f()## nextGifo function execution");
    while (carousel.childNodes.length>=1) {
        carousel.removeChild(carousel.firstChild);
    }
    console.log("Inicial");
    console.log("trendingGalleryDesktopIndex: "+(trendingGalleryDesktopIndex+1));
    console.log("trendingGalleryDesktopItems.length: "+trendingGalleryDesktopItems.length);
    if((trendingGalleryDesktopIndex+3)<(trendingGalleryDesktopItems.length)) {        
        trendingGalleryDesktopIndex++;
        for (let i=0; i<3; i++) {
            carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex+i]);
        }
    } else if ((trendingGalleryDesktopIndex+3)==trendingGalleryDesktopItems.length)  {
            trendingGalleryDesktopIndex++;
            carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex]);
            carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex+1]);
            carousel.appendChild(trendingGalleryDesktopItems[0]);
    } else if ((trendingGalleryDesktopIndex+3)==(trendingGalleryDesktopItems.length+1)) {
        trendingGalleryDesktopIndex++;
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex]);
        carousel.appendChild(trendingGalleryDesktopItems[0]);
        carousel.appendChild(trendingGalleryDesktopItems[1]);
        trendingGalleryDesktopIndex=0;
    } else if ((trendingGalleryDesktopIndex+3)==(trendingGalleryDesktopItems.length+2)) {
        trendingGalleryDesktopIndex++;
        carousel.appendChild(trendingGalleryDesktopItems[0]);
        carousel.appendChild(trendingGalleryDesktopItems[1]);
        carousel.appendChild(trendingGalleryDesktopItems[2]);
        trendingGalleryDesktopIndex=0;
    }
    console.log("Aplicar query para nuevos gifos en el carrusel");
    console.log("Elementos del carousel: "+carousel.getElementsByClassName('gifo').length);
    for (let i=0; i<carousel.getElementsByClassName('gifo').length; i++) {
        console.log("Id obtenido con getAttribute: "+carousel.getElementsByClassName('gifo')[i].getAttribute('id'));
        queryFavorite(carousel.getElementsByClassName('gifo')[i].getAttribute('id'),"trending");
    }
}

function previousGifo() {
    console.log ("##f()## previous function execution");
    while (carousel.childNodes.length>=1) {
        carousel.removeChild(carousel.firstChild);
    }
    console.log("Inicial");
    console.log("trendingGalleryDesktopIndex: "+(trendingGalleryDesktopIndex));
    console.log("trendingGalleryDesktopItems.length: "+trendingGalleryDesktopItems.length);
    if(trendingGalleryDesktopIndex==0) {        
        trendingGalleryDesktopIndex=trendingGalleryDesktopItems.length-1;
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex]);
        carousel.appendChild(trendingGalleryDesktopItems[0]);
        carousel.appendChild(trendingGalleryDesktopItems[1]);
    } else if (trendingGalleryDesktopIndex==trendingGalleryDesktopItems.length-1)  {
        trendingGalleryDesktopIndex--;
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex]);
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex+1]);
        carousel.appendChild(trendingGalleryDesktopItems[0]);
    } else if (trendingGalleryDesktopIndex<=trendingGalleryDesktopItems.length-2) {
        trendingGalleryDesktopIndex--;
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex]);
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex+1]);
        carousel.appendChild(trendingGalleryDesktopItems[trendingGalleryDesktopIndex+2]);
        //trendingGalleryDesktopIndex=0;
    } //else if ((trendingGalleryDesktopIndex+3)==(trendingGalleryDesktopItems.length+2)) {
        //trendingGalleryDesktopIndex++;
        //carousel.appendChild(trendingGalleryDesktopItems[0]);
        //carousel.appendChild(trendingGalleryDesktopItems[1]);
        //carousel.appendChild(trendingGalleryDesktopItems[2]);
        //trendingGalleryDesktopIndex=0;
    //}
    console.log("Aplicar query para nuevos gifos en el carrusel");
    console.log(carousel.getElementsByClassName('gifo').length);
    for (let i=0;  i<carousel.getElementsByClassName('gifo').length; i++) {
        console.log("Id obtenido con getAttribute: "+carousel.getElementsByClassName('gifo')[i].getAttribute('id'));
        queryFavorite(carousel.getElementsByClassName('gifo')[i].getAttribute('id'),"trending");
    }
}

// addArrowLeftButtonStyle
function addArrowLeftButtonStyle () {
    console.log ("##f()## addArrowLeftButtonStyle function execution");
    if(!queryDarkMode()) {
        //arrowLeftBorder.style.background = '#572EE5'
        arrowLeftButton.src = 'images/button-left-hover.svg';
    } else {
        //arrowLeftBorder.style.background = '#FFFFFF';    
        arrowLeftButton.src = 'images/button-left-modo-noc-hover.svg';
    }
}

// removeArrowLeftButtonStyle
function removeArrowLeftButtonStyle () {
    console.log ("##f()## removeArrowLeftButtonStyle function execution");
    if(!queryDarkMode()) {
        //arrowLeftBorder.style.background = 'unset';
        arrowLeftButton.src = 'images/button-left.svg';
    } else {
        //arrowLeftBorder.style.background = '#37383C';
        arrowLeftButton.src = 'images/button-left-hover.svg';
    }
}

// addArrowRightButtonStyle
function addArrowRightButtonStyle () {
    console.log ("##f()## addArrowRightButtonStyle function execution");
    if(!queryDarkMode()) {
        //arrowRightBorder.style.background = '#572EE5';    
        arrowRightButton.src = 'images/button-right-hover.svg';
    } else {
        //arrowRightBorder.style.background = '#FFFFFF';    
        arrowRightButton.src = 'images/button-right-modo-noc-hover.svg';
    }
}

// addArrowRightButtonStyle
function removeArrowRightButtonStyle () {
    console.log ("##f()## removeArrowRightButtonStyle function execution");
    if(!queryDarkMode()) {
        //arrowRightBorder.style.background = 'unset';
        arrowRightButton.src = 'images/button-right.svg';
    } else {
        //arrowRightBorder.style.background = '#37383C';
        arrowRightButton.src = 'images/button-right-hover.svg';
    }
}

//++++ FAVORITES FUNCTIONS ++++

// drawFavorites
function drawFavorites (favoritesObject) {
    console.log ("##f()## drawFavorites function execution");
    let favoriteModel= document.createElement('div');
    favoriteModel.classList.add('gif-card');
    let favoriteImgModel= document.createElement('img');
    favoriteModel.appendChild(favoriteImgModel);
    let favoritesResults = document.getElementById('favorites-results');
    favoritesResults.classList.remove('hide');
    console.log ("Start iteration for drawing favorites");
    for (let i=favoritesPagination; i<(favoritesPagination+12); i++) {
        console.log("i: "+i+".");
        console.log("favoritesPagination+12: "+parseInt(favoritesPagination+12));
        let favorite = favoriteModel.cloneNode(true);
        favorite.setAttribute("order",1+i);
        favorite.setAttribute("id",favoritesObject[i].Id);
        favorite.setAttribute("user",favoritesObject[i].user);
        favorite.setAttribute("title",favoritesObject[i].title);
        console.log(favorite);  
        let favoriteImg = favorite.getElementsByTagName('img');
        favoriteImg[0].src=favoritesObject[i].url;
        if (typeof favoritesObject!='undefined') {
            favorite.addEventListener('click', function() { maximizeSearchResult(favoritesObject[i].Id, favoritesObject[i].user, favoritesObject[i].title, favoritesObject[i].url, favoritesObject[i].originalUrl); });
        }
        favoritesResults.appendChild(favorite);
        console.log("favoritesObject.length: "+favoritesObject.length+". "+"i: "+i+".");
        if (i==(favoritesObject.length-1))
        {
            console.log("Stop iteration for drawing favorites");
            //i=favoritesPagination+12;  
            break;
            console.log("favoritesPagination+12 final: "+i);          
        }
    }
}

//drawGifos
function drawGifos(gifosObject,context) {
    console.log ("##f()## drawGifos function execution");
    let pagination = 0;
    if (context=="favorites") {
        pagination = favoritesPagination;
    } else if (context=="mygifos") {        
        pagination = myGifosPagination;
    }
    console.log ("Start iteration for drawing results");
    for (let i=pagination; i<pagination+12; i++) {
        createGifoCard(i+1, gifosObject[i].Id, gifosObject[i].user,gifosObject[i].title, gifosObject[i].url,  gifosObject[i].originalUrl, context);
        if (context=="favorites") {
            favoritesResults.appendChild(createGifoCard(i+1, gifosObject[i].Id, gifosObject[i].user,gifosObject[i].title, gifosObject[i].url,  gifosObject[i].originalUrl, context));
            queryFavorite(gifosObject[i].Id,"favorites");
        } else if (context=="mygifos") {
            myGifosResults.appendChild(createGifoCard(i+1, gifosObject[i].Id, gifosObject[i].user,gifosObject[i].title, gifosObject[i].url,  gifosObject[i].originalUrl, context));
        }
        console.log("gifosObject.length: "+gifosObject.length+". "+"i: "+i+".");
        if (i==(gifosObject.length-1))
        {
            console.log("Stop iteration for drawing gifos");
            //i=favoritesPagination+12;  
            break;
            console.log("favoritesPagination+12 final: "+i);          
        }
    }
}

// addDesktopStyle
function addGifoCardStyle (gifo) {
    console.log ("##f()## addGifoCardStyle function execution");
    gifo.getElementsByClassName('gifo-options')[0].style.display = 'flex';
    gifo.getElementsByClassName('gifo-user')[0].style.display = 'unset';
    gifo.getElementsByClassName('gifo-title')[0].style.display = 'unset';
    gifo.getElementsByClassName('gifo-container-layer')[0].style.background = '#572EE5';
    gifo.getElementsByClassName('gifo-container-layer')[0].style.opacity = '0.7';
}

// removeGifoCardStyle
function removeGifoCardStyle (gifo) {
    console.log ("##f()## removeGifoCardStyle function execution");
    gifo.getElementsByClassName('gifo-options')[0].style.display = 'none';
    gifo.getElementsByClassName('gifo-user')[0].style.display = 'none';
    gifo.getElementsByClassName('gifo-title')[0].style.display = 'none';
    gifo.getElementsByClassName('gifo-container-layer')[0].style.background = 'unset';
    gifo.getElementsByClassName('gifo-container-layer')[0].style.opacity = 'unset';
}

// addSearchResultGifoCardStyle
function addSearchResultGifoCardStyle (gifo) {
    console.log ("##f()## addGifoCardStyle function execution");
    gifo.getElementsByClassName('gifo-options')[0].style.display = 'flex';
    gifo.getElementsByClassName('gifo-user')[0].style.display = 'unset';
    gifo.getElementsByClassName('gifo-title')[0].style.display = 'unset';
    gifo.getElementsByClassName('search-result-container-layer')[0].style.background = '#572EE5';
    gifo.getElementsByClassName('search-result-container-layer')[0].style.opacity = '0.7';
}

// removeSearchResultGifoCardStyle 
function removeSearchResultGifoCardStyle (gifo) {
    console.log ("##f()## removeGifoCardStyle function execution");
    gifo.getElementsByClassName('gifo-options')[0].style.display = 'none';
    gifo.getElementsByClassName('gifo-user')[0].style.display = 'none';
    gifo.getElementsByClassName('gifo-title')[0].style.display = 'none';
    gifo.getElementsByClassName('search-result-container-layer')[0].style.background = 'unset';
    gifo.getElementsByClassName('search-result-container-layer')[0].style.opacity = 'unset';
}


// drawNoFavoritesAlert
function drawNoFavoritesAlert () {
    console.log ("##f()## drawNoFavoritesAlert function execution");
    let noFavoritesIcon = document.getElementById('no-favorites-icon');
    noFavoritesIcon.classList.remove('hide');
    let noFavoritesText = document.getElementById('no-favorites-text');
    noFavoritesText.classList.remove('hide');
}

// clearNoFavoritesAlert
function clearNoFavoritesAlert() {
    console.log ("##f()## clearNoFavoritesAlert function execution");
    try {
        let noFavoritesIcon= document.getElementById('no-favorites-icon');
        let noFavoritesText= document.getElementById('no-favorites-text');
        let noFavoritesIconClasses = noFavoritesIcon.classList;
        console.log("Clases del ícono de No Favorites: "+noFavoritesIconClasses);
        console.log(noFavoritesIconClasses.length);
        if(noFavoritesIconClasses.length==1){
            noFavoritesIcon.classList.add('hide');
            noFavoritesText.classList.add('hide');
        }
    } catch (err) {
        console.log("There is no No Favorites Alert to delete"+err);
    }
}

// drawMoreFavoritesButton
function drawMoreFavoritesButton (favoritesObject,favoritesPagination) {
    console.log ("##f()## drawMoreFavoritesButton function execution");
    if (favoritesPagination==0) {
        moreFavoritesButton.setAttribute('offset', 0);
    }
    //let remainingResults = paginationObject.total_count-(paginationObject.offset+paginationObject.count);
    let remainingResults =favoritesObject.length-(favoritesPagination+12);
    console.log("Resultados restantes: "+remainingResults);
    if (remainingResults>0) {
        moreFavoritesButton.classList.remove('hide');
    } else {
        moreFavoritesButton.classList.add('hide');
    }    
}

//  drawMoreFavorites
function drawMoreFavorites () {
    console.log ("##f()## drawMoreFavorites function execution");   
    let moreFavoritesButton = document.getElementById('more-favorites');
    console.log("Offset al solicitar más resultados: "+moreFavoritesButton.getAttribute('offset'));
    favoritesPagination = parseInt(moreFavoritesButton.getAttribute('offset'))+12;
    let favoritesObject= JSON.parse(localStorage.getItem('favorites'));
    drawGifos(favoritesObject,"favorites");
    drawMoreFavoritesButton(favoritesObject,favoritesPagination);
    moreFavoritesButton.setAttribute('offset', favoritesPagination);
    //favoritesPagination=+12;
    console.log("Offset después solicitar más resultados: "+moreFavoritesButton.getAttribute('offset'));
}

// clearPreviousFavorites
function clearPreviousFavorites () {
    console.log ("##f()## clearPreviousFavorites function execution");   
    if ( favoritesResults.hasChildNodes() ) {
        while (favoritesResults.childNodes.length>=1) {
            favoritesResults.removeChild(favoritesResults.firstChild);
        }
    }
}


//++++ CREATE GIFOS FUNCTIONS ++++

let uploadGifoFunction=0;
let stopRecordFunction=0;

// showCreateGifos
function showCreateGifos () {
    console.log ("##f()## showCreateGifos function execution");
    sandwich.checked= false;
    if(!queryDarkMode()) {
        sandwichIcon.src = "images/burger.svg";
    } else {
        sandwichIcon.src = "images/burger-modo-noc.svg";
    }
    document.getElementById('add-gifo').removeEventListener('mouseover', addGifoButtonStyle);
    document.getElementById('add-gifo').removeEventListener('mouseout', removeGifoButtonStyle);
    document.getElementById('add-gifo').style.background = '#9CAFC3';
    document.getElementById('add-gifo').style.border = '1px solid #9CAFC3';
    document.getElementById('add-gifo-button').src = 'images/button-crear-gifo-hover.svg';
    hideContentForCreateGifos();
    repeatCapture();
    remainingStyleReverse();  
}

// hideContentForCreateGifos
function hideContentForCreateGifos() {
    console.log ("##f()## hideContentForCreateGifos function execution");
    //header[0].classList.remove('hide');
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.style.display = 'none';
    maximized.classList.add('hide');
    trendingGifos.classList.add('hide');
    favorites.style.display='none';
    myGifos.style.display='none';
    createGifos.style.display='flex';
    if(bp1.matches) {
        for (let i=0; i<document.getElementsByClassName('decoration').length; i++) {
            document.getElementsByClassName('decoration')[i].classList.add('hide');
        }
    }
}

// goToStep1
function goToStep1() {
    console.log ("##f()## goToStep1 function execution");
    step1IconActivation();
    changeTitleAndComment();
    activateCamera();
    //repeatCapture();
    //remainingStyleReverse();    
}

// step1IconActivation
function step1IconActivation () {
    console.log ("##f()## step1IconActivation function execution");
    if (!queryDarkMode()) {
        step1Icon.style.background = '#572ee5';
        step1Icon.style.color = '#ffffff';
    } else {    
        step1Icon.style.background = '#FFFFFF';
        step1Icon.style.color = '#37383C';
    }
}

//changeTitleAndComment
function changeTitleAndComment () {
    console.log ("##f()## changeTitleAndComment function execution");
    cameraAccessTitle.textContent = '¿Nos das acceso a tu cámara?';
    cameraAccessComment.textContent = 'El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO.';
}

// activateCamera
function activateCamera() {
    console.log ("##f()## activateCamera function execution");
    initCamera();     
    //changeStyleForStep2();
}

// initCamera:  Acceso a la webcam
async function initCamera() {
    console.log ("##f()## initCamera function execution");
    const constraints = {
        audio: false,
        video: {
        width: 320, height: 240
        }
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        changeStyleForStep2();
    } catch (e) {
        alert(`navigator.getUserMedia error:${e.toString()}`);
    }
}
// Correcto!
function handleSuccess(stream) {
    window.stream = stream;
    videoPort.srcObject = stream;
    recordStopButton.addEventListener('click', function () {
        stopStream(stream);
    });
}

function stopStream(stream) {
    console.log('stop called');
    stream.getVideoTracks().forEach(function (track) {
        track.stop();
    });
}
// Load init

//changeStyleForStep2
function changeStyleForStep2() {
    console.log ("##f()## changeStyleForStep2 function execution");
    cameraAccessTitle.classList.add('hide');
    cameraAccessComment.classList.add('hide');
    videoPort.classList.remove('hide');
    if (!queryDarkMode()) {
        step1Icon.style.background = 'unset';
        step1Icon.style.color = '#572EE5';
        step2Icon.style.background = '#572ee5';
        step2Icon.style.color = '#ffffff';
    } else {    
        step1Icon.style.background = 'unset';
        step1Icon.style.color = '#ffffff';
        step2Icon.style.background = '#ffffff';
        step2Icon.style.color = '#37383C';
    }
    initialButton.classList.add('hide');
    recordStartButton.classList.remove('hide');
}

// startRecording
function startRecording () {
    console.log ("##f()## startRecording function execution");
    changeStyleForStep21();
    startRecord();
}

// changeStyleForStep21
function changeStyleForStep21() {
    console.log("##f()## changeStyleForStep21 function execution");
    recordStartButton.classList.add('hide');
    recordStopButton.classList.remove('hide');
    hms.classList.remove('hide');
}

// startRecord
function startRecord () { 
    console.log("##f()## startRecord function execution");
    navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        hidden: 240,
    });
    recorder.startRecording();
    cronometrar();
    stopRecordFunction = function () { recorder.stopRecording(function() {
        console.log("##f()## stopRecording function execution");
        parar();
        reiniciar();
        let blob = recorder.getBlob();
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
        gifoPreviewF(blob);
        //invokeSaveAsDialog(blob);
        let fileName= "RDJ472007_myGif.gif";
        changeStyleForStep22();
        uploadGifoFunction = function () {
            console.log("##f()## uploadGifoFunction function let execution");
            repeatCaptureButton.classList.add('hide'); 
            console.log (`https://upload.giphy.com/v1/gifs?file=${fileName}&api_key=${api_key}`);
            changeStyleForStep3();
            let uploadGif= giphyConnectionPost (`https://upload.giphy.com/v1/gifs?api_key=${api_key}`,form);
            uploadGif.then (response => {
                console.log (response);
                console.log (response.data.id);
                changeStyleForStep31();
                queryMyGifoAndSave(response.data.id);
                uploadGifoButton.removeEventListener('click', uploadGifoFunction);          
            }).catch(error => {
                console.log(error);
            })            
        }
        videoPort.pause();
        stopStream(stream);        
        uploadGifoButton.addEventListener('click', uploadGifoFunction);
        //uploadGifoButton.removeEventListener('click', uploadGifoFunction);
        showRepeatCaptureButton();
        recordStopButton.removeEventListener('click',stopRecordFunction);  
    });}
    recordStopButton.addEventListener('click',stopRecordFunction);    
});}

// changeStyleForStep22
function changeStyleForStep22() {
    console.log("##f()## changeStyleForStep22 function execution");
    hms.classList.add('hide');
    recordStopButton.classList.add('hide');
    uploadGifoButton.classList.remove('hide');
    
}

// gifoPreviewF
function gifoPreviewF (blob) {
    console.log("##f()## gifoPreviewF function execution");
    videoPort.classList.add('hide');
    gifoPreviewContainer.classList.remove('hide');
    gifoPreview.classList.remove('hide');
    //uploadGifoPreviewContainer.classList.remove('hide');
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
        console.log(reader.result);
        gifoPreview.src=reader.result;
        uploadGifoPreview.src=reader.result;
        //uploadGifoPreview.style.backgroundImage = "linear-gradient(rgba(25, 209, 231, 0.5), rgba(243, 17, 224, 0.5)), url('images/icon-favoritos.svg')"; 
    });
    reader.readAsDataURL(blob);

}

// changeStyleForStep3
function changeStyleForStep3() {
    console.log("##f()## changeStyleForStep3 function execution");
    if (!queryDarkMode()) {
        step2Icon.style.background = 'unset';
        step2Icon.style.color = '#572EE5';
        step3Icon.style.background = '#572ee5';
        step3Icon.style.color = '#ffffff';
    } else {    
        step2Icon.style.background = 'unset';
        step2Icon.style.color = '#ffffff';
        step3Icon.style.background = '#ffffff';
        step3Icon.style.color = '#37383C';
    }
    gifoPreview.classList.add('hide');
    uploadGifoPreviewContainer.classList.remove('hide');
    uploadGifoButton.classList.add('hide');
    uploadStatusIcon.src='images/loader.svg';
    uploadStatusIcon.classList.remove('hide');
    uploadStatusComment.textContent = 'Estamos subiendo tu GIFO';
    uploadStatusComment.classList.remove('hide');
    controlPanelSeparator.style.marginBottom = '96.1px';
} 

// changeStyleForStep31
function changeStyleForStep31() {   
    console.log("##f()## changeStyleForStep31 function execution"); 
    uploadStatusIcon.src='images/check.svg';
    uploadStatusComment.textContent = 'GIF subido con éxito';
    cgDownloadBorder.style.display = 'flex';
    cgLink.classList.remove('hide');
}

// queryMyGifoAndSave
function queryMyGifoAndSave (Id) {
    console.log ("##f()## queryMyGifo function execution");
    console.log (`https://api.giphy.com/v1/gifs/${Id}?api_key=${api_key}`);
    let gifSearchByID = giphyConnection (`https://api.giphy.com/v1/gifs/${Id}?api_key=${api_key}`);
    gifSearchByID.then (response => {
        console.log("searchId Endpoint Answer");
        console.log(response);
        console.log ("id: "+ response.data.id);
        console.log ("username: "+ response.data.username);
        console.log ("title: "+ response.data.title);
        console.log ("url: "+ response.data.images.fixed_height.url);
        console.log ("original url: "+ response.data.images.original.url);
        createdGifoDownload(response.data.id, response.data.images.original.url);   
        createGifoLink(response.data.images.original.url);  
        saveGifo(response.data.id, response.data.username, response.data.title, response.data.images.fixed_height.url, response.data.images.original.url);    
    }).catch(error => {
        console.log(error);
    })
}

let downloadFunctionForGC = 0;
// createdGifoDownload
function createdGifoDownload (createdGifoId, createdGifoUrl,) {
    console.log ("##f()## createdGifoDownload function execution");
    console.log ("createdGifoUrl: "+createdGifoUrl);
    console.log ("createdGifoId: "+createdGifoId);
    downloadFunctionForGC = function (e) {         
        console.log ("##f()## downloadFunctionForGC let function execution");
        var x=new XMLHttpRequest();
        x.open("GET", createdGifoUrl, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, "GIFOS_"+createdGifoId+".gif", "image/gif" ); }
        x.send(); 
    }
    cgDownloadBorder.addEventListener("click", downloadFunctionForGC, true);
}

// createGifoLink
function createGifoLink (createdGifoUrl) {
    console.log ("##f()## createGifoLink function execution");
    cgLink.href = createdGifoUrl;
}

// saveGifo
function saveGifo (resultId, resultUser, resultName, resultUrl, resultOriginalUrl) {
    console.log ("##f()## saveGifo function execution");
    //let savedMyGifosString = localStorage.getItem('mygifos');
    //let savedMyGifosObject = JSON.parse(savedMyGifosString);
    let savedMyGifosObject = new Array();
    savedMyGifosObject = JSON.parse(localStorage.getItem('mygifos'));
    /*try {
        if(JSON.parse(localStorage.getItem('mygifos')).length == undefined) {
            savedMyGifosObject = new Array (JSON.parse(localStorage.getItem('mygifos')));
        } else {
            savedMyGifosObject = JSON.parse(localStorage.getItem('mygifos'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('mygifos')).length failed", err);
        //savedFavoritesObject= JSON.parse(localStorage.getItem('favorites'));
    }*/
    let newMyGifo = {
        "Id": resultId,
        "user": resultUser,
        "title": resultName,
        "url": resultUrl,
        "originalUrl": resultOriginalUrl,
    }      
    console.log("Objeto newMyGifo: "+JSON.stringify(newMyGifo));
    if (savedMyGifosObject!=null) {
        console.log ("Hay Mis Gifos."); 
        console.log("Cantidad de mis gifos guardados previos: "+savedMyGifosObject.length);
        savedMyGifosObject.forEach(element => {
            console.log("Saved ID: "+element.Id)
        });
        savedMyGifosObject.unshift(newMyGifo);  
    }  else {        
        savedMyGifosObject = [ newMyGifo ];  
    }
    localStorage.removeItem('mygifos');
    localStorage.setItem('mygifos',JSON.stringify(savedMyGifosObject));
    console.log("Array myGifos: "+savedMyGifosObject);
    console.log("Item Listado de mis gifos: "+localStorage.getItem('mygifos'));   
    console.log("resultId: "+resultId);
}

// showRepeatCaptureButton
function showRepeatCaptureButton() {   
    console.log ("##f()## showRepeatCaptureButton function execution"); 
    repeatCaptureButton.classList.remove('hide');  
}

// repeatCapture
function repeatCapture () {
    console.log ("##f()## repeatCapture function execution");
    repeatCaptureButton.classList.add('hide'); 
    console.log("Tipo de uploadGifoFunction: "+typeof(stopRecordFunction));
    if(typeof(stopRecordFunction) == 'function') {
        recordStopButton.removeEventListener('click',stopRecordFunction);
    }
    console.log("Tipo de uploadGifoFunction: "+typeof(uploadGifoFunction));
    if(typeof(uploadGifoFunction) == 'function') {
        uploadGifoButton.removeEventListener('click', uploadGifoFunction);
    }
    step2Icon.style.background = 'unset';
    step3Icon.style.background = 'unset';
    if (!queryDarkMode()) {
        step2Icon.style.color = '#572EE5';        
        step3Icon.style.color = '#572EE5';
    } else {    
        step2Icon.style.color = '#FFFFFF';
        step3Icon.style.color = '#FFFFFF';
    }
    cameraAccessTitle.textContent='Aquí podrás crear tus propios ';
    let cameraAccessTitleSpan = document.createElement('span');
    cameraAccessTitleSpan.textContent = 'GIFOS';
    cameraAccessTitle.appendChild(cameraAccessTitleSpan);
    cameraAccessTitle.classList.remove('hide');
    cameraAccessComment.textContent = '¡Crea tu GIFO en sólo 3 pasos! (sólo necesitas una cámara para grabar un video)';
    cameraAccessComment.classList.remove('hide');  
    gifoPreviewContainer.classList.add('hide');
    gifoPreview.classList.add('hide'); 
    uploadGifoButton.classList.add('hide'); 
    initialButton.classList.remove('hide');
}

// remainingStyleReverse
function remainingStyleReverse () {
    console.log ("##f()## remainingStyleReverse function execution");
    camera.classList.add('hide');
    uploadGifoPreviewContainer.classList.add('hide');
    //step1Icon.style.background = 'unset';
    //step1Icon.style.color = '#572EE5';
    hms.classList.add('hide');
    repeatCaptureButton.classList.add('hide');
    recordStartButton.classList.add('hide');
    recordStopButton.classList.add('hide');
    uploadGifoButton.classList.add('hide');
    uploadStatusIcon.classList.add('hide');
    uploadStatusComment.classList.add('hide');
    cgDownloadBorder.style.display = 'none';
    cgLink.classList.add('hide');
}

//chronometer
let id=0;
function cronometrar(){
    console.log ("##f()## cronometrar function execution");
    escribir();
    id = setInterval(escribir,1000);
    //document.querySelector(".start").removeEventListener("click",cronometrar);
}

// escribir
function escribir(){
    console.log ("##f()## escribir function execution");
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}

// parar
function parar() {
    console.log ("##f()## parar function execution");
    clearInterval(id);
    //document.querySelector(".start").addEventListener("click",cronometrar);

}

// reiniciar
function reiniciar(){
    console.log ("##f()## reiniciar function execution");
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
    //document.querySelector(".start").addEventListener("click",cronometrar);
}


//++++ MY GIFOS FUNCTIONS ++++

// showMyGifos
function showMyGifos() {
    console.log ("##f()## showMyGifos function execution");
    sandwich.checked= false;
    if(!queryDarkMode()) {
        sandwichIcon.src = "images/burger.svg";
        if (!bp1.matches) { // If media query matches
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].classList.add('underline-deco');     
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].style.color = '#572EE5';
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#572EE5';
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].classList.remove('underline-deco');
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#9CAFC3';
        }
    } else {
        sandwichIcon.src = "images/burger-modo-noc.svg";
        if (!bp1.matches) { // If media query matches
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].classList.add('underline-deco');     
            document.getElementsByClassName('section-link')[0].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].classList.add('underline-deco');
            document.getElementsByClassName('section-link')[1].getElementsByClassName('section-a')[0].style.color = '#FFFFFF';
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].classList.remove('underline-deco');
            document.getElementsByClassName('section-link')[2].getElementsByClassName('section-a')[0].style.color = '#9CAFC3';
        }
    }
    favoritesFlag=false;
    myGifosFlag=true;
    myGifosPagination=0;
    clearNoGifosAlert();
    clearPreviousMyGifos();
    hideContentForMyGifos();
    let  myGifosObject= new Array();
    myGifosObject = JSON.parse(localStorage.getItem('mygifos'));
    /*try {
        if(JSON.parse(localStorage.getItem('mygifos')).length == undefined) {
            myGifosObject= new Array (JSON.parse(localStorage.getItem('mygifos')));
        } else {
            myGifosObject= JSON.parse(localStorage.getItem('mygifos'));
        }
    } catch (err) {
        console.log("JSON.parse(localStorage.getItem('mygifos')).length failed", err);
    }
    try {
        console.log("Longitud de mygifos: "+myGifosObject.length);
    } catch (err) {
        console.log('myGifosObject.length failed', err);
    }*/
    if(myGifosObject!=null && myGifosObject.length!=0) {
        myGifosObject.forEach(element => {
            console.log("Id: "+element.Id);            
        });
        drawGifos(myGifosObject,"mygifos");
        drawMoreMyGifosButton(myGifosObject,myGifosPagination);
    } else {
        drawNoGifosAlert();
    }
}

// hideContentForMyGifos
function hideContentForMyGifos() {
    console.log ("##f()## hideContentForMyGifos function execution");
    header[0].classList.remove('hide');
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.style.display = 'none';
    maximized.classList.add('hide');
    favorites.style.display='none';
    myGifos.style.display='flex';
    createGifos.style.display='none';
    trendingGifos.classList.remove('hide');
    footer[0].classList.remove('hide');
}

// clearNoGifosAlert
function clearNoGifosAlert() {
    console.log ("##f()## clearNoGifosAlert function execution");
    try {
        let noGifosIconClasses = noGifosIcon.classList;
        console.log("Clases del ícono de No Gifos: "+noGifosIconClasses);
        console.log(noGifosIconClasses.length);
        if(noGifosIconClasses.length==1){
            noGifosIcon.classList.add('hide');
            noGifosText.classList.add('hide');
        }
    } catch (err) {
        console.log("There is no No Gifos Alert to delete"+err);
    }
}

// drawNoGifosAlert
function drawNoGifosAlert () {
    console.log ("##f()## drawNoGifosAlert function execution");
    noGifosIcon.classList.remove('hide');
    noGifosText.classList.remove('hide');
}

// drawFavorites
function drawMyGifos (myGifosObject) {
    //favoritesObject= JSON.parse(localStorage.getItem('favorites'));
    console.log ("##f()## drawMyGifos function execution");
    let myGifoModel= document.createElement('div');
    myGifoModel.classList.add('gif-card');
    let myGifoImgModel= document.createElement('img');
    myGifoModel.appendChild(myGifoImgModel);
    myGifosResults.classList.remove('hide');
    console.log ("Start iteration for drawing my gifos");
    for (let i=myGifosPagination; i<(myGifosPagination+12); i++) {
        console.log("i: "+i+".");
        console.log("myGifosPagination+12: "+parseInt(myGifosPagination+12));
        let myGifo = myGifoModel.cloneNode(true);
        //favorite.setAttribute("order",1+searchResults.pagination.offset+i);
        myGifo.setAttribute("order",1+i);
        myGifo.setAttribute("id",myGifosObject[i].Id);
        myGifo.setAttribute("user",myGifosObject[i].user);
        myGifo.setAttribute("title",myGifosObject[i].title);
        console.log(myGifo);  
        let myGifoImg = myGifo.getElementsByTagName('img');
        myGifoImg[0].src=myGifosObject[i].url;
        console.log("Id: "+myGifosObject[i].Id);
        console.log("user: "+myGifosObject[i].user);
        console.log("title: "+myGifosObject[i].title);
        if (typeof myGifosObject!='undefined') {
            myGifo.addEventListener('click', function() { maximizeSearchResult(myGifosObject[i].Id, myGifosObject[i].user, myGifosObject[i].title, myGifosObject[i].url, myGifosObject[i].originalUrl); });
        }
        myGifosResults.appendChild(myGifo);
        console.log("myGifosObject.length: "+myGifosObject.length+". "+"i: "+i+".");
        if (i==(myGifosObject.length-1)) {
            console.log("Stop iteration for drawing my gifos");
            console.log("myGifosPagination+12 final: "+i);         
            //i=favoritesPagination+12;  
            break;
            //console.log("myGifosPagination+12 final: "+i);          
        }
    }
}

// drawMoreMyGifosButton 
function drawMoreMyGifosButton (myGifosObject,myGifosPagination) {
    console.log ("##f()## drawMoreMyGifosButton  function execution");
    if (myGifosPagination==0) {
        moreMyGifosButton.setAttribute('offset', 0);
    }
    //let remainingResults = paginationObject.total_count-(paginationObject.offset+paginationObject.count);
    let remainingResults = myGifosObject.length-(myGifosPagination+12);
    console.log("Resultados restantes: "+remainingResults);
    if (remainingResults>0) {
        moreMyGifosButton.classList.remove('hide');
    } else {
        moreMyGifosButton.classList.add('hide');
    }    
}

//  drawMoreMyGifos
function drawMoreMyGifos () {
    console.log ("##f()## drawMoreMyGifos function execution");   
    let moreMyGifosButton = document.getElementById('more-my-gifos');
    console.log("Offset al solicitar más resultados: "+moreMyGifosButton.getAttribute('offset'));
    myGifosPagination = parseInt(moreMyGifosButton.getAttribute('offset'))+12;
    let myGifosObject= JSON.parse(localStorage.getItem('mygifos'));
    drawGifos(myGifosObject,"mygifos");
    drawMoreMyGifosButton(myGifosObject,myGifosPagination);
    moreMyGifosButton.setAttribute('offset', myGifosPagination);
    myGifosPagination=+12;
    console.log("Offset después solicitar más resultados: "+moreMyGifosButton.getAttribute('offset'));
}

//
function clearPreviousMyGifos () {
    console.log ("##f()## clearPreviousMyGifos function execution");   
    if ( myGifosResults.hasChildNodes() ) {
        while (myGifosResults.childNodes.length>=1) {
            myGifosResults.removeChild(myGifosResults.firstChild);
        }
    }
}

