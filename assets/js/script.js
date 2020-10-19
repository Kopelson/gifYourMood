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
                    if(i > picArr.length)
                    {
                        // if we have 4 stop
                        break;
                    }
                    // randomly selects pics 
                    let index = Math.floor(Math.random()*picArr.length);
                    //Pick a random picture from the response
                    let randomPic = picArr[index];
                    //remove selected picture from the array
                    picArr.splice(index, 1);                                            
                    // names ID assinged to image 
                    let id = "picture" + i;
                    // adds image to html
                    $("#"+id).children("img").attr("src", randomPic.src.portrait);
                }
    
            }
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
            // gif array 
            let gifArr = response.data;
            // randomly selecting a gif from the array and assigning it a variable
            let randomGif = gifArr[Math.floor(Math.random() * gifArr.length)];
            // displaying gif on html
            $("#gif").attr("src", randomGif.images.original.url);
            // handles errors
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
    
        //The parameter will be updated
        pexelApiQuery(pexelSearchPhrase);
    });
    
    //Choosing a picture return a gif
    $("#modal-picture").on("click", "a", function(event) {
        event.preventDefault();
        //The parameter will be updated
        let combinedQuery = moodChoice + " " + jokeChoice ;
        // the actual gif search with the parameters we created above and combined in combinedQuery
        giphyApiQuery(combinedQuery);
    });
    
    //Store the gif in an array in localstorage
    $("#like").on("click", function(event) {
        event.preventDefault();
        //If storage hasn't been initialized
        if (!localStorage.getItem("gifs")) 
        {
            // gif array set to an empty array
            let gifArr = [];
            // pushes id and src to local storage
            gifArr.push($("#gif").attr("src"));
            // makes sure results are in a string
            localStorage.setItem("gifs", JSON.stringify(gifArr));
        } else {
            //extract the array of gifs from local storage
            let gifArr = JSON.parse(localStorage.getItem("gifs")); 
            gifArr.push($("#gif").attr("src"));
            localStorage.setItem("gifs", JSON.stringify(gifArr));
        }
        // resets
        resetElements();
        // opens gif gallery
        openGallery();
    
    });
    // displays gallery page when gif is "liked"
    function openGallery() {
        window.location.assign("./gallery.html"); 
    }   
});
