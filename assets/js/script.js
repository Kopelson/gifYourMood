// local variables
// joke API
let any = "Any";
let blacklistFlags = "?blacklistFlags=";
let racist = "racist";
let and = "&"
let type = "type=single"
let amount = "amount=4";
let url = "https://sv443.net/jokeapi/v2/joke/";
// let jokeQueryUrl = url + any + blacklistFlags + racist + and + amount + and + type;


var jokeBtnOne = $("#joke1");
var jokeBtnTwo = $("#joke2");
var jokeBtnThree = $("#joke3");
var jokeBtnFour = $("#joke4");

$("#happy").on("click", function(){
    // call joke API
    let pun = "Pun";
    
    let happyJokeURL = url + pun + blacklistFlags + racist + and + amount + and + type
$.ajax({
    url: happyJokeURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    jokeBtnOne.text(response.jokes[0].joke);
    jokeBtnTwo.text(response.jokes[1].joke);
    jokeBtnThree.text(response.jokes[2].joke);
    jokeBtnFour.text(response.jokes[3].joke);




}, function(error){
    console.log(error);
});
// paint JOKES onto buttons


// WHAT HAPPENS NEXT
// 1.click on button
// 2.new jokes appear
// create variables out of responses? 
})

$("#sad").on("click", function(){
    // call joke api
    let dark = "Dark";
    let miscellaneous = "Miscellaneous";
    let jokeQueryUrl = url + miscellaneous + "," + dark + blacklistFlags + racist + and + amount + and + type;
    $.ajax({
    url: jokeQueryUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
    jokeBtnOne.text(response.jokes[0].joke);
    jokeBtnTwo.text(response.jokes[1].joke);
    jokeBtnThree.text(response.jokes[2].joke);
    jokeBtnFour.text(response.jokes[3].joke);
}, function(error){
    console.log(error);
});
    // paint JOKES onto buttons
    
    // 
})

//JokeAPI	Programming, Miscellaneous and Dark Jokes
//JokeAPI  documentation https://sv443.net/jokeapi/v2/
//Doesn't use API keys
//I think we should use separate functions to create different query URL's for each api
// function jokeApiQuery(){
    //select any joke
    //multiple selections are separated by a ","
    //category options 
    // let more = ","
    // let programming = "Programming";
    // blacklist flag options
    // let nsfw = "nsfw";
    // let religious = "religious";
    // let political = "political";
    // let sexist = "sexist";
    //each option after is separated by a "&"
    //type options *twoPart is default
    //amount of jokes * 1 joke is default
    //the url for jokeAPI
    //this will need to be coded for user options but for test purposes
    // ajaxRequest(queryUrl);
// };

//Pexels	Free Stock Photos and Videos	
// Pexel API Documentation https://www.pexels.com/api/documentation/
//turtorial on pexel use in the browser https://www.youtube.com/watch?v=d1Nke7twxMM
function pexelApiQuery(search){
    //we can put any string as the search to get photos
    let query = "?query=";
    let perPage = "per_page=80";
    let page = "page=1";
    let pexelsApiKey = "563492ad6f91700001000001a7186190942c4e13817d5ad0d55b7ade";
    let url = "https://api.pexels.com/v1/search";
    let and = "&"
    let queryUrl = url + query + search + and + perPage + and + page;

    $.ajax({
        url: queryUrl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader( "Authorization", pexelsApiKey);
        },
        method: "GET"
    }).then(function(response){
        let picArr = response.photos;
        for(var i = 1; i <= 4; i++)                                             //Iterate through 4 picture elements and set src attribute for each element
        {
            let index = Math.floor(Math.random()*picArr.length);
            let randomPic = picArr[index];                                      //Pick a random picture from the response
            picArr.splice(index, 1);                                            //remove selected picture from the array

            let id = "picture" + i;
            $("#"+id).children("img").attr("src", randomPic.src.portrait);
        }
    }, function(error){
        console.log(error);
    });

    // You have to link the photo back to pexels by using 
    //  <a href="https://www.pexels.com">Photos provided by Pexels</a>
    //      <!-- or show our white logo -->
    //  <a href="https://www.pexels.com">
    //  <img src="https://images.pexels.com/lib/api/pexels-white.png" />
    //  </a>
    //      <!-- or show our black logo -->
    //  <a href="https://www.pexels.com">
    //  <img src="https://images.pexels.com/lib/api/pexels.png" />
    //  </a>
};

//Giphy 
//Giphy API Documentation https://developers.giphy.com/docs/api#quick-start-guide
function giphyApiQuery(search){
    let giphyApiKey = "api_key=1RtzRKPjjkz1zLpVge9zotETQENJDzjR";
    let url = "https://api.giphy.com/v1/gifs/search?";
    //string req - search a query term or phrase
    let query = "q="
    //integer(int32) - defaults to 25
    //let limit = "limit="
    //integer(int32) - defaults to 0
    //let offset = "offset="
    //string - filters results by specified rating g, pg, pg-13, r
    //let rating = "rating="
    //each option after is separated by a "&"
    let and = "&"
    let queryUrl = url + giphyApiKey + and + query + search;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        for(var i = 1; i<=4; i++)
        {
            let id = "picture" + i;
            $("#"+id).children("img").attr("src", "");
        }

        let gifArr = response.data;
        let randomGif = gifArr[Math.floor(Math.random()*gifArr.length)];    //pick a random gif
        $("#gif").attr("src", randomGif.images.original.url);
    }, function(error){
        console.log(error);
    });

};


// //this function will make all ajax request
function ajaxRequest(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        ajaxResponse = response;
        console.log(ajaxResponse);
    }, function(error){
        console.log(error);
    });

};

//Reset elements
function resetElements()
{
    for(var i = 1; i<=4; i++)
    {
        let picID = "picture" + i;
        $("#"+picID).children("img").attr("src", "");      //Reset the picture elements to have no src
        
        let jokeID = "joke" + i;
        $("#"+jokeID).text("");                            //Reset the joke elements to have no text
    }

    $("#gif").attr("src", "");                             //Reset the gif element to have no src
}

/****************************/
//Event handling functions

//Choosing a joke return 4 pictures
$("#modal-jokes").on("click", "a", function(event){
    event.preventDefault();

    //This is for testing purpose
    //The parameter will be updated
    pexelApiQuery("popcorn");
});

//Choosing a picture return a gif
$("#modal-picture").on("click", "a", function(event){
    event.preventDefault();

    //This is for testing purpose
    //The parameter will be updated
    giphyApiQuery("happy");
});

//Store the gif in an array in localstorage
$("#like").on("click", function(event){
    if(!localStorage.getItem("gifs"))                               //If storage hasn't been initialized
    {
        let gifArr = [];
        gifArr.push($("#gif").attr("src"));
        localStorage.setItem("gifs", JSON.stringify(gifArr));       
    }
    else
    {
        let gifArr = JSON.parse(localStorage.getItem("gifs"));      //extract the array of gifs from local storage
        gifArr.push($("#gif").attr("src"));
        localStorage.setItem("gifs", JSON.stringify(gifArr));     
    }

    resetElements();
});

/****************************/
//test response
// jokeApiQuery();
// pexelApiQuery("popcorn");
// giphyApiQuery("popcorn");
