$(document).ready(function(){
    let moodChoice = "";
    let jokeChoice = "";
    let pictureChoice = "";
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
    
    $("#happy").on("click", function() {
        let happyArr = ["happy", 
        "cheerful",
        "contented",
        "delighted",
        "ecstatic",
        "elated",
        "glad",
        "joyful",
        "joyous",
        "jubilant",
        "lively",
        "merry",
        "overjoyed",
        "peaceful",
        "pleasant",
        "pleased",
        "thrilled",
        "upbeat"
        ];

        let randomHappyWord = Math.floor(Math.random() * happyArr.length);
        console.log(happyArr[randomHappyWord]);
        moodChoice = happyArr[randomHappyWord];

        // call joke API
        let pun = "Pun";
    
        let happyJokeURL = url + pun + blacklistFlags + racist + and + amount + and + type
        $.ajax({
            url: happyJokeURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            jokeBtnOne.text(response.jokes[0].joke);
            jokeBtnTwo.text(response.jokes[1].joke);
            jokeBtnThree.text(response.jokes[2].joke);
            jokeBtnFour.text(response.jokes[3].joke);
    
        let jokeArr = [];
    
    
        }, function(error) {
            console.log(error);
        });
        // paint JOKES onto buttons
    
    
        // WHAT HAPPENS NEXT
        // 1.click on button
        // 2.new jokes appear
        // create variables out of responses? 
    })
    
    $("#sad").on("click", function() {
        // call joke api
        let dark = "Dark";
        let miscellaneous = "Miscellaneous";
        let jokeQueryUrl = url + miscellaneous + "," + dark + blacklistFlags + racist + and + amount + and + type;
        $.ajax({
            url: jokeQueryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            jokeBtnOne.text(response.jokes[0].joke);
            jokeBtnTwo.text(response.jokes[1].joke);
            jokeBtnThree.text(response.jokes[2].joke);
            jokeBtnFour.text(response.jokes[3].joke);
        }, function(error) {
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
    function pexelApiQuery(search) {
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
                xhr.setRequestHeader("Authorization", pexelsApiKey);
            },
            method: "GET"
        }).then(function(response) {
            let picArr = response.photos;
    
            if(picArr.length === 0)
            {
                //do something here
                pexelApiQuery("random");
            }
            else{
                for(var i = 1; i <= 4; i++)     //Iterate through 4 picture elements and set src attribute for each element
                {
                    if(i > picArr.length)       //Check if the returned array of picture has less than 4 pictures
                    {
                        break;                  
                    }
                    let index = Math.floor(Math.random()*picArr.length);              //Randomize the index 
                    let randomPic = picArr[index];                                    //Pick a random picture from the response using the index
                    picArr.splice(index, 1);                                          //Remove selected picture from the array to avoid repeating the picture
                    let id = "picture" + i;                                           //Get the current element id
                    $("#"+id).children("img").attr("src", randomPic.src.portrait);    //Append the url to the src attr of the img

                    
                    //this assigns urlString the current picture url 
                    let urlString = randomPic.url;
                    //tutorial on parsing a url https://dmitripavlutin.com/parse-url-javascript/
                    //this url constructor allows us to parse url's
                    const url = new URL(
                        urlString
                    );
                    //this grabs the pathname in the url
                    let pathName = url.pathname;
                    //this creates an array of strings of the pathname
                    let pathNameArr = pathName.split("-");
                    //this removes the first index of the array which containes "/photo/*"
                    pathNameArr.splice(0,1);
                    //this initializes a do/while conditional
                    let j = 0;
                    //this do loop assigns a random word describing the picture in the data-id attribute on the img element
                    do {
                        //this randomly assigns an index of pathNameArr
                        let randomPicWordIndex = Math.floor(Math.random()* pathNameArr.length);
                        //this makes sure the last index is never picked due to it being a string of numbers
                        let randomPicWord = pathNameArr[randomPicWordIndex - 1];
                        //this checks if the index goes below 0 it will change to the first index of the pathNameArr
                        if (randomPicWord === undefined){
                            randomPicWord = pathNameArr[randomPicWordIndex + 1];
                        };
                        //this checks the index of jokeArr which contains a list of common words and repicks a word if the randomly choosen word is a common word.
                        if (jokeArr.indexOf(randomPicWord) === -1) {
                            //if the random word is not a common word the img element gains the data-id attribute equal to the random word
                            $("#"+id).children("img").attr("data-id", randomPicWord);
                            //this adds one to j to end the do/while loop
                            j++;
                        //this gets a new random index to pick a different word
                        }else{
                            randomPicWordIndex = Math.floor(Math.random()* pathNameArr.length);
                        };  
                    }
                    //the do/while conditional
                     while(j < 1);
                };    
            };
        }, function(error) {
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
    function giphyApiQuery(search) {
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
        }).then(function(response) {
    
            let gifArr = response.data;                                        //Get the gif array from the response
            let randomGif = gifArr[Math.floor(Math.random() * gifArr.length)]; //Pick a random gif from the array
            $("#gif").attr("src", randomGif.images.original.url);              //Set the src attr of the gif element with the url
        }, function(error) {
            console.log(error);
        });
    
    };
    
    
    // //this function will make all ajax request
    function ajaxRequest(queryUrl) {
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            ajaxResponse = response;
            console.log(ajaxResponse);
        }, function(error) {
            console.log(error);
        });
    
    };
    
    //Reset elements
    function resetElements() {
        for (var i = 1; i <= 4; i++) {
            let picID = "picture" + i;
            $("#" + picID).children("img").attr("src", ""); //Reset the picture elements to have no src
    
            let jokeID = "joke" + i;
            $("#" + jokeID).text(""); //Reset the joke elements to have no text
        }
    
        $("#gif").attr("src", ""); //Reset the gif element to have no src
    
    
    }
    
    /****************************/
    //Event handling functions
    
    let pexelSearchPhrase = "";                                //pexel search parameter
    let jokeArr = ["as",
        "I",
        "his",
        "that",
        "he",
        "was",
        "for",
        "on",
        "are",
        "with",
        "they",
        "be",
        "at",
        "one",
        "have",
        "this",
        "from",
        "by",
        "hot",
        "word",
        "but",
        "what",
        "some",
        "is",
        "it",
        "you",
        "or",
        "had",
        "the",
        "of",
        "to",
        "and",
        "a",
        "in",
        "we",
        "can",
        "out",
        "other",
        "were",
        "which",
        "do",
        "their",
        "time",
        "if",
        "will",
        "how",
        "said",
        "an",
        "each",
		"tell"];
    //joke 1 handler
    jokeBtnOne.on("click", function(event){
        event.preventDefault();
    
         let theJoke = $(this).text();
         console.log(theJoke);
         console.log(theJoke.split(" "));

         let jokeSentenceArr = theJoke.split(" ");
        //  console.log(randomJokeIndex);
        let i = 0;
        do {
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
             if (indexOf === -1) {
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                i++;
             }else{
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
                console.log("else");
             }
             console.log("You have looped");
             console.log(randomJokeIndex);
             console.log(indexOf);
             console.log(jokeChoice);
             console.log(typeof(indexOf));

         }
         while(i < 1);
         console.log();

    
        //  let searchPhrase = theJoke.split(' ').slice(0,3).join(' ');
         pexelSearchPhrase = jokeChoice;
    });
    
    //joke 1 handler
    jokeBtnTwo.on("click", function(event){
        event.preventDefault();
    
         let theJoke = $(this).text();
         console.log(theJoke);
         console.log(theJoke.split(" "));

         let jokeSentenceArr = theJoke.split(" ");
        //  console.log(randomJokeIndex);
        let i = 0;
        do {
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
             if (indexOf === -1) {
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                i++;
             }else{
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
                console.log("else");
             }
             console.log("You have looped");
             console.log(randomJokeIndex);
             console.log(indexOf);
             console.log(jokeChoice);
             console.log(typeof(indexOf));

         }
         while(i < 1);
         console.log();

    
        //  let searchPhrase = theJoke.split(' ').slice(0,3).join(' ');
         pexelSearchPhrase = jokeChoice;
    });
    jokeBtnThree.on("click", function(event){
        event.preventDefault();
    
         let theJoke = $(this).text();
         console.log(theJoke);
         console.log(theJoke.split(" "));

         let jokeSentenceArr = theJoke.split(" ");
        //  console.log(randomJokeIndex);
        let i = 0;
        do {
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
             if (indexOf === -1) {
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                i++;
             }else{
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
                console.log("else");
             }
             console.log("You have looped");
             console.log(randomJokeIndex);
             console.log(indexOf);
             console.log(jokeChoice);
             console.log(typeof(indexOf));

         }
         while(i < 1);
         console.log();

    
        //  let searchPhrase = theJoke.split(' ').slice(0,3).join(' ');
         pexelSearchPhrase = jokeChoice;
    });
    jokeBtnFour.on("click", function(event){
        event.preventDefault();
    
         let theJoke = $(this).text();
         console.log(theJoke);
         console.log(theJoke.split(" "));

         let jokeSentenceArr = theJoke.split(" ");
        //  console.log(randomJokeIndex);
        let i = 0;
        do {
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
             if (indexOf === -1) {
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                i++;
             }else{
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
                console.log("else");
             }
             console.log("You have looped");
             console.log(randomJokeIndex);
             console.log(indexOf);
             console.log(jokeChoice);
             console.log(typeof(indexOf));

         }
         while(i < 1);
         console.log();

    
        //  let searchPhrase = theJoke.split(' ').slice(0,3).join(' ');
         pexelSearchPhrase = jokeChoice;
    });
    
    //Choosing a joke return 4 pictures
    $("#modal-jokes").on("click", "a", function(event) {
        event.preventDefault();
    
        //This is for testing purpose
        //The parameter will be updated
        pexelApiQuery(pexelSearchPhrase);
    });
    
    //Choosing a picture return a gif
    //this adds a click event listener on modal-picture id specifically the img tags
    $("#modal-picture").on("click", "img", function(event) {
        event.preventDefault();
        //this assigns pictureChoice to the word describing the picture
        pictureChoice = $(this).data("id");
        //this stores a string of words from the mood. joke, and picture
        let combinedQuery = moodChoice + " " + jokeChoice + " " + pictureChoice;
        //this query's Giphy api with the combined words
        giphyApiQuery(combinedQuery);
    });
    
    //Store the gif in an array in localstorage
    $("#like").on("click", function(event) {
        event.preventDefault();
        if (!localStorage.getItem("gifs")) //If storage hasn't been initialized
        {
            let gifArr = [];                                        //Initialize the array
            gifArr.push($("#gif").attr("src"));                     //Push the url to the array
            localStorage.setItem("gifs", JSON.stringify(gifArr));   //Store the array in localstorage
        } else {
            let gifArr = JSON.parse(localStorage.getItem("gifs")); //extract the array of gifs from local storage
            gifArr.push($("#gif").attr("src"));                     //Push the url to the array
            localStorage.setItem("gifs", JSON.stringify(gifArr));   //Store the array in localstorage
        }
    
        resetElements();    //Reset here after the user likes a gif
        openGallery();
    
    });
    
    // This function will open new page
    function openGallery() {
        window.location.assign("./gallery.html"); 
    }   
});
