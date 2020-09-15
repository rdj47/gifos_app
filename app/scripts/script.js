console.log(new Date().toString() + " SCRIPT START");
localStorage.removeItem('favorites');
//API Key for GIPHY
let api_key = "TWYJkQI33iJE8p0rxE9ckezdCATJKI40";

//++++ GLOBAL TAGS ++++

let header = document.getElementsByTagName('header');
let logo = document.getElementById('logo');
logo.addEventListener('click',initialize);
let sandwich = document.getElementById('sandwich');
let favoritesLink = document.getElementById('favorites-link');
favoritesLink.addEventListener('click', showFavorites);
let favoritesFlag=false;
let favoritesPagination=0;

function showFavorites() {
    console.log ("##f()## showFavorites function execution");
    sandwich.checked= false;
    favoritesFlag=true;
    clearNoFavoritesAlert();
    clearPreviousFavorites();
    hideContentForFavorites();
    let favoritesObject= JSON.parse(localStorage.getItem('favorites'));
    try {
        console.log("Longitud de favoritos: "+favoritesObject.length);
    } catch (err) {
        console.log('favoritesObject.length failed', err);
    }
    if(favoritesObject!=null && favoritesObject.length!=0) {
        favoritesObject.forEach(element => {
            console.log("Id: "+element.Id);            
        });
        drawFavorites(favoritesObject);
        drawMoreFavoritesButton(favoritesObject,favoritesPagination);
    } else {
        drawNoFavoritesAlert();
    }
}

// hideContentForFavorites
function hideContentForFavorites() {
    console.log ("##f()## hideContentForFavorites function execution");
    //header[0].classList.remove('hide');
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.classList.add('hide');
    maximized.classList.add('hide');
    trendingGifos.classList.add('hide');
    favorites.style.display='flex';
}

let banner = document.getElementById('banner');
let trendingTerms = document.getElementById('trending-terms');

let searchInput= document.getElementById("search-phrase-input");
//console.log("Hola: "+searchInput.value)
let searchResultsSeparator= document.getElementById("search-results-separator");
let searchResults= document.getElementById("search-results");
let searchResultsTitle= document.getElementById("search-results-title");
let results = document.getElementById('results');
let searchPhraseMG = document.getElementById('search-phrase-mg');
let searchBarInput = document.getElementById('search-phrase-input');
searchPhraseMG.addEventListener('click', function() { gifSearch(searchBarInput.value); } );
let searchPhraseClear = document.getElementById('search-phrase-clear');
searchPhraseClear.addEventListener('click', clearSearchPhrase);

// trending-terms area tags
let trendingTermsResult = document.getElementById('trending-terms-results');

// search-results area tags
let moreResultsButton = document.getElementById('more-results');
moreResultsButton.addEventListener('click', drawMoreResults);

// maximized area tags
let maximizedCloseButton = document.getElementById('maximized-close-button');
maximizedCloseButton.addEventListener('click', function() { hideContentForMaximizingReverse(favoritesFlag); } );
let maximizedResultImg = document.getElementById('maximized-result-img');
let maximizedResultUser = document.getElementById('maximized-result-user');
let maximizedResultTitle = document.getElementById('maximized-result-title');
let maximizedDownloadBorder = document.getElementById('maximized-download-border');
let maximizedLikeButton = document.getElementById('maximized-like-button');

// trending-gifos area tags
let trendingGifos = document.getElementById('trending-gifos');

//favorites area tags
favorites.style.display='none';  // To not show favorites area in the beginning.
let favoritesResults = document.getElementById('favorites-results');
let moreFavoritesButton =document.getElementById('more-favorites');
moreFavoritesButton.addEventListener('click', drawMoreFavorites);
//favorites global array
let favoritesArray= new Array();

let footer = document.getElementsByTagName('footer');

searchInput.addEventListener('keyup', function getSuggestions() {
    //searchPhraseActiveStyleActivation();
    console.log (new Date().toString()+" ##f()## getSuggestions function execution");
    clearSuggestions();
    if (searchInput.value) {
        console.log("URL solicitada: "+`https://api.giphy.com/v1/gifs/search/tags?q=${searchInput.value}&api_key=${api_key}`);
        let gifAutocomplete = giphyConnection (`https://api.giphy.com/v1/gifs/search/tags?q=${searchInput.value}&api_key=${api_key}`);
        gifAutocomplete.then (response => {
            console.log (response.data[0]);
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
        searchBarLineDeletion();
        changeSearchPhraseStyleReverse();
    }    
});

getTrendingTerms();

//++++++++++++++++++++++++++++++++++FUNCIONES+++++++++++++++++++++++++++++++++++++++++++++

function initialize() {
    console.log ("##f()## initizalize function execution");    
    header[0].classList.remove('hide');
    banner.style.display='flex';
    trendingTerms.classList.remove('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.classList.add('hide');
    maximized.classList.add('hide');
    trendingGifos.classList.remove('hide');
    favorites.style.display='none';
    favoritesFlag=false;
    favoritesPagination=0;
}


/*function hideContentForMaximizingReverse (favoritesFlag) {
    console.log ("##f()## hideContentForMaximizingReverse function execution");
    maximized.classList.add('hide');
    header[0].classList.remove('hide');
    banner.style.display='flex';
    trendingTerms.classList.remove('hide');
    searchResultsSeparator.classList.remove('hide');
    searchResults.classList.remove('hide');
    trendingGifos.classList.remove('hide');
    //let setFavoriteFunction = function (e) { setFavorite(resultId, resultUser, resultName, resultUrl, resultOriginalUrl); }
    maximizedDownloadBorder.removeEventListener("click", downloadFunction, true);
    maximizedLikeButton.removeEventListener('click', setFavoriteFunction, true);
    console.log("Flag favorites: "+favoritesFlag);
    if (favoritesFlag==true) {
        console.log("Permanezco en Favoritos");
        hideContentForFavorites();
        showFavorites();
    }
}*/

//++++ GIPHY API FETCH FUNCTION ++++
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

//++++ SEARCH RESULTS FUNCTIONS ++++

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
    //searchBarInput.style.justifySelf = 'flex-start';
    searchBarInput.style.marginLeft = '0px';
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.marginRight = '13px';
    searchPhraseMG.style.marginBottom = '12px';
    searchPhraseMG.style.order= '0';    
    //console.log("Cantidad de lupas en la frase de búsqueda: "+searchPhraseMG.length);
    //searchPhraseMG.removeEventListener('click', function() { gifSearch(searchBarInput.value); } );
    //searchPhraseMG.addEventListener('click', function() { gifSearch(searchBarInput.value); } );
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
    searchBarInput.style.order= 'unset';
    searchBarInput.style.marginLeft = '55px';
    let searchPhraseMG = document.getElementById('search-phrase-mg');
    searchPhraseMG.style.marginBottom = '15px';
    searchPhraseMG.style.marginRight = '20px';
    searchPhraseMG.style.order= 'unset';
    let searchPhraseClear = document.getElementById('search-phrase-clear');
    searchPhraseClear.style.display = 'none';
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
    suggestionModelImg.src="images/icon-search.svg";
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
        //parrafo[0].innerHTML=i+"-"+suggestions.data[i].name;
        parrafo[0].innerHTML=suggestions.data[i].name;
        console.log(parrafo[0].textContent);
        suggestion.classList.remove('hide');
        suggestion.classList.add('active-suggestion');
        //suggestion.secondChild.text="suggestion "+i;
        suggestion.addEventListener('click', function() { gifSearch(parrafo[0].textContent); });
        let searchBar =  document.getElementsByClassName('search-bar');
        searchBar[0].appendChild(suggestion);
    }
}

// gifSearch
function gifSearch(searchPhrase) {
    console.log ("##f()## gifSearch function execution");
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
            drawSearchResultsAreaTitle();
            if (response.data.length>0) {
                clearNoResultsAlert();
                clearPreviousResults();
                //drawSearchResultsAreaTitle();
                drawSearchResults(response);
                drawMoreResultsButton(response.pagination);
            } else {
                //clearSearchResultAreaTitle();
                drawNoResultsAlert();
            }
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
    searchResults.classList.remove('hide');
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

// drawSuggestions modifies DOM to include GIFs in results area.
function drawSearchResults (searchResults) {
    console.log ("##f()## drawSearchResults function execution");
    //function based on tags modification
    /*let searchResultsTag = document.getElementById('results');
    searchResultsTag.style.display= 'grid';
    searchResults.data.forEach(element => {
        console.log("ID: "+element.id+", URL: "+element.images.fixed_height.url);
    });
    let searchResultsGifCards = document.getElementsByClassName('git-card');
    console.log("Cantidad de etiquetas gitcard (deben ser 12): "+searchResultsGifCards.length);
    let imagentest = searchResultsGifCards[0].getElementsByTagName('img');
    console.log(imagentest[0]);
    for (let i=0; i<searchResults.data.length; i++) {
        console.log("##f()## drawSearchResults function: draw result "+i);
        let searchResultImg = searchResultsGifCards[i].getElementsByTagName('img');
        searchResultImg[0].src=searchResults.data[i].images.fixed_height.url;
        searchResultsGifCards[i].classList.remove('hide');
        if (i==11) {
            i=searchResults.data.length;
        }
    }*/
    //function based on tags creation
    let searchResultModel= document.createElement('div');
    searchResultModel.classList.add('gif-card');
    let searchResultImgModel= document.createElement('img');
    searchResultModel.appendChild(searchResultImgModel);
    let results = document.getElementById('results');
    results.classList.remove('hide');
    console.log ("Start iteration for drawing results");
    for (let i=0; i<searchResults.data.length; i++) {
        let searchResult = searchResultModel.cloneNode(true);
        searchResult.setAttribute("order",1+searchResults.pagination.offset+i);
        searchResult.setAttribute("id",searchResults.data[i].id);
        searchResult.setAttribute("user",searchResults.data[i].username);
        searchResult.setAttribute("title",searchResults.data[i].title);
        console.log(searchResult);  
        let searchResultImg = searchResult.getElementsByTagName('img');
        searchResultImg[0].src=searchResults.data[i].images.fixed_height.url;
        searchResult.addEventListener('click', function() { maximizeSearchResult(searchResults.data[i].id, searchResults.data[i].username, searchResults.data[i].title, searchResults.data[i].images.fixed_height.url, searchResults.data[i].images.original.url); });
        results.appendChild(searchResult);
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
    searchBarInput.readOnly= true;
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
let setFavoriteFunction=0; //
let downloadFunction=0; //
// maximizeSearchResult
function maximizeSearchResult(resultId, resultUser, resultName, resultUrl,resultOriginalUrl) {
    console.log ("##f()## maximizeSearchResult function execution");
    maximizedResultImg.src="";
    maximizedLikeButton.src="images/icon-fav-hover.svg";  
    hideContentForMaximizing();
    maximizedResultImg.src=resultOriginalUrl;
    console.log(resultUser);
    if(resultUser) {
        maximizedResultUser.textContent=resultUser;
    } else {
        maximizedResultUser.textContent="Autor no registrado";
    }
    console.log(resultName);
    maximizedResultTitle.textContent=resultName;
    downloadFunction = function (e) { 
        var x=new XMLHttpRequest();
        x.open("GET", resultOriginalUrl, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, "GIFOS_"+resultId+".gif", "image/gif" ); }
        x.send(); 
    }
    maximizedDownloadBorder.addEventListener("click", downloadFunction, true);
    setFavoriteFunction = function (e) { setFavorite(resultId, resultUser, resultName, resultUrl, resultOriginalUrl); }
    queryFavorite(resultId);
    maximizedLikeButton.addEventListener('click', setFavoriteFunction, true);
    maximized.classList.remove('hide');
    favoritesPagination=0;
}

// hideContentForMaximizing
function hideContentForMaximizing () {
    console.log ("##f()## hideContentForMaximizing function execution");
    header[0].classList.add('hide');
    banner.style.display='none';
    trendingTerms.classList.add('hide');
    searchResultsSeparator.classList.add('hide');
    searchResults.classList.add('hide');
    trendingGifos.classList.add('hide');
    favorites.style.display='none';
}

// hideContentForMaximizingReverse
function hideContentForMaximizingReverse (favoritesFlag) {
    console.log ("##f()## hideContentForMaximizingReverse function execution");
    maximized.classList.add('hide');
    header[0].classList.remove('hide');
    banner.style.display='flex';
    trendingTerms.classList.remove('hide');
    searchResultsSeparator.classList.remove('hide');
    searchResults.classList.remove('hide');
    trendingGifos.classList.remove('hide');
    //let setFavoriteFunction = function (e) { setFavorite(resultId, resultUser, resultName, resultUrl, resultOriginalUrl); }
    maximizedDownloadBorder.removeEventListener("click", downloadFunction, true);
    maximizedLikeButton.removeEventListener('click', setFavoriteFunction, true);
    console.log("Flag favorites: "+favoritesFlag);
    if (favoritesFlag==true) {
        console.log("Permanezco en Favoritos");
        hideContentForFavorites();
        showFavorites();
    }
}

// queryFavorite
function queryFavorite (resultId) {
    console.log ("##f()## queryFavorite function execution");
    let savedFavoritesString = localStorage.getItem('favorites')
    let savedFavoritesObject = JSON.parse(savedFavoritesString);
    if (savedFavoritesObject!=null) { 
        if((savedFavoritesObject.findIndex(element => element.Id==resultId))!==-1) {
            maximizedLikeButton.src="images/icon-fav-active.svg";
        }
    }
}

// setFavorite
function setFavorite (resultId, resultUser, resultName, resultUrl, resultOriginalUrl) {
    console.log ("##f()## setFavorite function execution");
    let savedFavoritesString = localStorage.getItem('favorites')
    let savedFavoritesObject = JSON.parse(savedFavoritesString);
    if (savedFavoritesObject!=null) {
        console.log ("Hay favoritos."); 
        console.log("Cantidad de favoritos guardados previos: "+savedFavoritesObject.length);
        savedFavoritesObject.forEach(element => {
            console.log("Saved ID: "+element.Id)
        });
        console.log("resultId: "+resultId);
        console.log("Índice del maximizado: "+savedFavoritesObject.findIndex(element => element.Id==resultId));
        if((savedFavoritesObject.findIndex(element => element.Id==resultId))==-1) {
            console.log ("No era favorito, ahora lo es."); 
            maximizedLikeButton.src="images/icon-fav-active.svg";   
            let newFavorite = {
                "Id": resultId,
                "user": resultUser,
                "title": resultName,
                "url": resultUrl,
                "originalUrl": resultOriginalUrl,
            }
            console.log("Objeto newFavorite: "+JSON.stringify(newFavorite));
            favoritesArray.push(newFavorite);
            localStorage.removeItem('favorites');
            localStorage.setItem('favorites',JSON.stringify(favoritesArray));
            console.log("Array Favorites: "+favoritesArray);
            console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));
        } else {
            console.log ("Era favorito, ahora ya no lo es."); 
            maximizedLikeButton.src="images/icon-fav-hover.svg";   
            let newFavorite = {
                "Id": resultId,
                "user": resultUser,
                "title": resultName,
                "url": resultUrl,
                "originalUrl": resultOriginalUrl,
            }
            console.log("Objeto newFavorite: "+JSON.stringify(newFavorite));
            favoritesArray.splice(savedFavoritesObject.findIndex(element => element.Id==resultId),1);
            localStorage.removeItem('favorites');
            localStorage.setItem('favorites',JSON.stringify(favoritesArray));
            console.log("Array Favorites: "+favoritesArray);
            console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));
        }    
    } else {
        console.log ("No hay favoritos. Ahora es favorito"); 
        maximizedLikeButton.src="images/icon-fav-active.svg";
        let newFavorite = {
            "Id": resultId,
            "user": resultUser,
            "title": resultName,
            "url": resultUrl,
            "originalUrl": resultOriginalUrl,
        }
        console.log("Objeto newFavorite: "+JSON.stringify(newFavorite));
        favoritesArray.push(newFavorite);
        localStorage.removeItem('favorites');
        localStorage.setItem('favorites',JSON.stringify(favoritesArray));
        console.log("Array Favorites: "+favoritesArray);
        console.log("Item Listado de favoritos: "+localStorage.getItem('favorites'));   
    }
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

//++++ TRENDING TERMS FUNCIONS ++++

// getTrendingSearchTerms
function getTrendingTerms() {
    console.log ("##f()## getTrendingTerms function execution");
    console.log(`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
    let trendingText ="";
    let gifTrendingSearchTerms = giphyConnection (`https://api.giphy.com/v1/trending/searches?api_key=${api_key}`);
    gifTrendingSearchTerms.then (response => {
        console.log("Trending Search Terms: "+response.data);
        for (let i=0; i<response.data.length; i++) {
           if(i==(response.data.length-1)) {
                trendingText+=response.data[i];
           } else {
                trendingText+=response.data[i]+", ";
           }
        }
        console.log("Trending Text: "+trendingText);
        let trendingTermsResult = document.getElementById('trending-terms-results');
        console.log(trendingTermsResult.textContent);
        trendingTermsResult.textContent=trendingText;
    }).catch(error => {
        console.log(error);
    });
}

//++++ FAVORITES FUNCTIONS ++++

// drawFavorites
function drawFavorites (favoritesObject) {
    //favoritesObject= JSON.parse(localStorage.getItem('favorites'));
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
        //favorite.setAttribute("order",1+searchResults.pagination.offset+i);
        favorite.setAttribute("order",1+i);
        favorite.setAttribute("id",favoritesObject[i].Id);
        favorite.setAttribute("user",favoritesObject[i].user);
        favorite.setAttribute("title",favoritesObject[i].title);
        console.log(favorite);  
        let favoriteImg = favorite.getElementsByTagName('img');
        favoriteImg[0].src=favoritesObject[i].url;
        /*console.log("Id: "+favoritesObject[i].Id);
        console.log("user: "+favoritesObject[i].user);
        console.log("title: "+favoritesObject[i].title);*/
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
    drawFavorites(favoritesObject);
    drawMoreFavoritesButton(favoritesObject,favoritesPagination);
    moreFavoritesButton.setAttribute('offset', favoritesPagination);
    favoritesPagination=+12;
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


