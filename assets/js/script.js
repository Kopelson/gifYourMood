// readying the document fully loaded
$(document).ready(function(){
    // user mood choice stores here
    let moodChoice = "";
    // user joke choice stores here
    let jokeChoice = "";
    // jokeAPI url parameters
    let any = "Any";
    let dark = "Dark";
    let pun = "Pun";
    let miscellaneous = "Miscellaneous";
    let blacklistFlags = "?blacklistFlags=";
    let sexist = "sexist";
    let nsfw = "nsfw";
    let racist = "racist";
    let and = "&"
    let type = "type=single"
    let amount = "amount=4";
    let url = "https://sv443.net/jokeapi/v2/joke/";
    // assigning variables to joke choice buttons
    var jokeBtnOne = $("#joke1");
    var jokeBtnTwo = $("#joke2");
    var jokeBtnThree = $("#joke3");
    var jokeBtnFour = $("#joke4");
    // happy button selected
    $("#happy").on("click", function() {
        // happy array
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
        // randomly assinging a happy word as a search parameter for the final GIF
        let randomHappyWord = Math.floor(Math.random() * happyArr.length);
        // variable to carry result
        moodChoice = happyArr[randomHappyWord];
         // building jokeAPI url
        let happyJokeURL = url + pun + blacklistFlags + racist + "," + sexist + "," + nsfw + and + amount + and + type
        // ajax call to JokeAPI
        $.ajax({
            url: happyJokeURL,
            method: "GET"
        }).then(function(response) {
            // places jokeAPI response text on button choices
            jokeBtnOne.text(response.jokes[0].joke);
            jokeBtnTwo.text(response.jokes[1].joke);
            jokeBtnThree.text(response.jokes[2].joke);
            jokeBtnFour.text(response.jokes[3].joke);
    
            // controls any call errors
        }, function(error) {
            // reports errors in console
            console.log(error);
        });
    })
    // sad button selected
    $("#sad").on("click", function() {
        // sad array
        let sadArr = [
        "bad",
        "blue",
        "brokenhearted",
        "cast-down",
        "crestfallen",
        "dejected",
        "depressed",
        "despondent",
        "disconsolate",
        "doleful",
        "down",
        "downcast",
        "downhearted",
        "droopy",
        "forlorn",
        "gloomy",
        "glum",
        "heartbroken",
        "heartsick",
        "heavyhearted",
        "joyless",
        "low",
        "low-spirited",
        "melancholic",
        "miserable",
        "mournful",
        "sorrowful",
        "unhappy"
        ];
        // randomly selects a sad word for gif search parameters
        let randomSadWord = Math.floor(Math.random() * sadArr.length);
        // variable assigned for later search parameters
        moodChoice = sadArr[randomSadWord];
        // jokeAPI url
        let jokeQueryUrl = url + miscellaneous + "," + dark + blacklistFlags + racist + "," + sexist + "," + nsfw + and + amount + and + type;
        // ajax call to jokeAPI
        $.ajax({
            url: jokeQueryUrl,
            method: "GET"
        }).then(function(response) {
            // reponse results
            jokeBtnOne.text(response.jokes[0].joke);
            jokeBtnTwo.text(response.jokes[1].joke);
            jokeBtnThree.text(response.jokes[2].joke);
            jokeBtnFour.text(response.jokes[3].joke);
        }, function(error) {
            console.log(error);
            // handles and alerts in console any errors
        });
    })
    // pexelAPI function
    function pexelApiQuery(search) {
        // url parameters
        let query = "?query=";
        let perPage = "per_page=80";
        let page = "page=1";
        let pexelsApiKey = "563492ad6f91700001000001a7186190942c4e13817d5ad0d55b7ade";
        let url = "https://api.pexels.com/v1/search";
        let and = "&"
        // final url
        let queryUrl = url + query + search + and + perPage + and + page;
        // API call to pexelAPI
        $.ajax({
            url: queryUrl,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", pexelsApiKey);
            },
            method: "GET"
        }).then(function(response) {
            // grabs photo array and uses it to randomly select 4 pics 
            let picArr = response.photos;
    
            if(picArr.length === 0)
            {
                //chose random pic search
                pexelApiQuery("random");
            }
            else{
                
                //Iterate through 4 picture elements and set src attribute for each element
                for(var i = 1; i <= 4; i++)
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
            // handles errors
            console.log(error);
            // displays errors
        });
    };
    
    //Giphy API function
    function giphyApiQuery(search) {
        // giphy search parameters
        let giphyApiKey = "api_key=1RtzRKPjjkz1zLpVge9zotETQENJDzjR";
        let url = "https://api.giphy.com/v1/gifs/search?";
        let query = "q="
        let and = "&"
        // gihpy API call URL
        let queryUrl = url + giphyApiKey + and + query + search;
        // Giphy ajax call
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            // handling the response with a for loop
            for (var i = 1; i <= 4; i++) {
                let id = "picture" + i;
                // variable for creating id
                $("#" + id).children("img").attr("src", "");
                // adds img with id and src to html 
            }
    
            let gifArr = response.data;                                        //Get the gif array from the response
            let randomGif = gifArr[Math.floor(Math.random() * gifArr.length)]; //Pick a random gif from the array
            $("#gif").attr("src", randomGif.images.original.url);              //Set the src attr of the gif element with the url
        }, function(error) {
            console.log(error);
            // dislays errors in console
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
    //Event handling functions
    
    //pexel search parameter
    let pexelSearchPhrase = "";
    // joke array holds common words needed for elimination. Result handling.
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
        "tell",
        "know",
        "with",
        "butt",
        "dead",
        "abort"
    ];
    //joke 1 handler
    jokeBtnOne.on("click", function(event){
        // stops the button from performing its default function until clicked
        event.preventDefault();
        // assinging variable to the text inside of "This" being the button
         let theJoke = $(this).text();
         let jokeSentenceArr = theJoke.split(" ");
        //  splitting the joke text into "string"
        let i = 0;
        // assinging index to 0 & a do/while loop
        do {
            // creating a variable to randomly select words from the joke sentence array
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            //creating variable to compare index of selected word to if statement index
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
            // if the index is equal to -1 than the word is not included in the elimination array: jokeArr 
            if (indexOf === -1) {
                // joke choice parameter for gif search = "word" selected for final search
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                // keeps the loop going until a word is found
                i++;
             }else{
                //  randomly selects a word from the jokeSentence array
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
             }

         }
        //  only do the above loop WHILE i < 1; otherwise ends
         while(i < 1);
        // assigns earlier empty string to joke choice variable
         pexelSearchPhrase = jokeChoice;

         //make the API request
         pexelApiQuery(pexelSearchPhrase);
    });
    
    //joke 2 handler
    jokeBtnTwo.on("click", function(event){
        event.preventDefault();
        // stops the button from performing its default function until clicked
        let theJoke = $(this).text();
        // assinging variable to the text inside of "This" being the button
        let jokeSentenceArr = theJoke.split(" ");
        //  splitting the joke text into "string"

        let i = 0;
        // assinging index to 0 & a do/while loop
        do {
            // creating a variable to randomly select words from the joke sentence array
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            //creating variable to compare index of selected word to if statement index
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
            // if the index is equal to -1 than the word is not included in the elimination array: jokeArr
             if (indexOf === -1) {
                 // joke choice parameter for gif search = "word" selected for final search
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                // keeps the loop going until a word is found
                i++;
             }else{
                //  randomly selects a word from the jokeSentence array 
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
             }
         }
         //  only do the above loop WHILE i < 1; otherwise ends
         while(i < 1);
         // assigns earlier empty string to joke choice variable
         pexelSearchPhrase = jokeChoice;

         //make the API request
         pexelApiQuery(pexelSearchPhrase);
    });
    // joke 3 handler
    jokeBtnThree.on("click", function(event){
        // stops the button from performing its default function until clicked
        event.preventDefault();
        // assinging variable to the text inside of "This" being the button
         let theJoke = $(this).text();
         //  splitting the joke text into "string"
        let jokeSentenceArr = theJoke.split(" ");
        // if the index is equal to -1 than the word is not included in the elimination array: jokeArr
        let i = 0;
        // assinging index to 0 & a do/while loop
        do {
            // creating a variable to randomly select words from the joke sentence array
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            //creating variable to compare index of selected word to if statement index
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
            // if the index is equal to -1 than the word is not included in the elimination array: jokeArr
             if (indexOf === -1) {
                 // joke choice parameter for gif search = "word" selected for final search
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                // keeps the loop going until a word is found
                i++;
             }else{
                 //  randomly selects a word from the jokeSentence array
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
             }
         }
         //  only do the above loop WHILE i < 1; otherwise ends
         while(i < 1);
         // assigns earlier empty string to joke choice variable
         pexelSearchPhrase = jokeChoice;

         //make the API request
         pexelApiQuery(pexelSearchPhrase);
    });
    // joke 4 handler
    jokeBtnFour.on("click", function(event){
        // stops the button from performing its default function until clicked
        event.preventDefault();
        // assinging variable to the text inside of "This" being the button
         let theJoke = $(this).text();
         //  splitting the joke text into "string"
         let jokeSentenceArr = theJoke.split(" ");
        
        let i = 0;
        // assinging index to 0 & a do/while loop
        do {
            // creating a variable to randomly select words from the joke sentence array
            let randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
            //creating variable to compare index of selected word to if statement index
            let indexOf = jokeArr.indexOf(jokeSentenceArr[randomJokeIndex]);
            // if the index is equal to -1 than the word is not included in the elimination array: jokeArr
             if (indexOf === -1) {
                // joke choice parameter for gif search = "word" selected for final search
                jokeChoice = jokeSentenceArr[randomJokeIndex];
                // keeps the loop going until a word is found
                i++;
             }else{
                //  randomly selects a word from the jokeSentence array
                randomJokeIndex = Math.floor(Math.random()* jokeSentenceArr.length);
             }

         }
        //  only do the above loop WHILE i < 1; otherwise ends
         while(i < 1);
         // assigns earlier empty string to joke choice variable
         pexelSearchPhrase = jokeChoice;
    });
    
    //Choosing a joke return 4 pictures
    $("#modal-jokes").on("click", "a", function(event) {
        event.preventDefault();
         //make the API request
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
        //If storage hasn't been initialized
        if (!localStorage.getItem("gifs")) 
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
