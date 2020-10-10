

//JokeAPI	Programming, Miscellaneous and Dark Jokes
//JokeAPI  documentation https://sv443.net/jokeapi/v2/
//Doesn't use API keys
//I think we should use separate functions to create different query URL's for each api
function jokeApiQuery(){
    //select any joke
    let any = "Any";
    //muiltiple selections are seperated by a ","
    //catagory options 
    // let more = ","
    // let miscellaneous = "Miscellaneous";
    // let programming = "Programming";
    // let dark = "Dark";
    // let pun = "Pun";
    // blacklist flag options
    let blacklistFlags = "?blacklistFlags=";
    // let nsfw = "nsfw";
    // let religious = "religious";
    // let political = "political";
    let racist = "racist";
    // let sexist = "sexist";
    //each option after is separated by a "&"
    let and = "&"
    //type options *twoPart is default
    // let type = "type=single"
    //amount of jokes * 1 joke is default
    let amount = "amount=4";
    //the url for jokeAPI
    let url = "https://sv443.net/jokeapi/v2/joke/";
    //this will need to be coded for user options but for test purposes
    let queryUrl = url + any + blacklistFlags + racist + and + amount;
    ajaxRequest(queryUrl);
};

//Pexels	Free Stock Photos and Videos	
//Pexel API Documentation https://www.pexels.com/api/documentation/

// function pexelApiQuery(){
//     let pexelsApiKey = "563492ad6f91700001000001a7186190942c4e13817d5ad0d55b7ade";
// }

//Giphy 
//Giphy API Documentation https://developers.giphy.com/docs/api#quick-start-guide
// function giphyApiQuery(){
//     let giphyApiKey = "1RtzRKPjjkz1zLpVge9zotETQENJDzjR";

// }



//this function will make all ajax request
function ajaxRequest(queryUrl){
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });

};

//test response
jokeApiQuery();
