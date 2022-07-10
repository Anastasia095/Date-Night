var omdbID = "0000000";
var omdbidLast = 0;


function generateID(){
    function getRandomInt() {
        min = Math.ceil(1);
        max = Math.floor(9916857);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    
    var omdbid1 = omdbID + getRandomInt();
    omdbidLast = omdbid1.slice(-7);
}

var startbtn = document.getElementById("start");



var recipe = {
    APIKey: "51f5155dad22491daa0d2fd70c0fed4f",

    fetchRecipe: function () {

        fetch(
            "https://api.spoonacular.com/recipes/random?apiKey="
            + this.APIKey
        )

        .then((response) => {
            return response.json();
        })
        .then((data) => this.displayRecipe(data));
    },
    displayRecipe: function (data) {
    console.log(data.recipes);
    var imgSize = "312x231.jpg";
    const { image } = data.recipes[0];
    const { title } = data.recipes[0];
    const { summary } = data.recipes[0];
    const { instructions } = data.recipes[0];
    console.log(instructions);
    var imgResize = image.slice(0, -11) + imgSize;
    

    document.getElementById("icon").src = imgResize;
    document.getElementById("title").innerText = title;
    document.getElementById("summary").innerHTML = instructions;
    }


};

var movie = {
    apiKey: "7ec448d5",

    fetchMovie: function (titleID) {

        fetch(
            "http://www.omdbapi.com/?i=tt"
            + titleID 
            + "&type=movie"
            + "&apikey=" 
            + this.apiKey
        )

        .then((response) => {
            return response.json();
        })
         .then((data) => this.displayMovie(data));
    },
    displayMovie: function (data) {
    console.log(data);
    console.log(data.Response)
    console.log(data.Poster)
    if (data.Response == "True" && data.Poster !== "N/A") {
        var imgSize = "240x150.jpg";
        const { Title } = data;
        const { Poster } = data;
        const { Plot } =  data;
        const { Genre } = data;
        const { Year } = data;
        // var imgResize = image.slice(0, -11) + imgSize;
        document.getElementById("iconM").src = Poster;
        document.getElementById("movieTitle").innerText = Title;
        document.getElementById("plot").innerHTML = "<b>Plot: </b>" + Plot;
        document.getElementById("genre").innerHTML = "<b>Genre: </b>" + Genre;
        document.getElementById("year").innerHTML = "<b>Year: </b>" + Year;
        // document.getElementById("summary").innerHTML = instructions;
    } else {
        console.log(data.Response)
        generateID();
        movie.fetchMovie(omdbidLast);
    }
    }            
};


console.log("Before Event");
startbtn.addEventListener('click', function (event) {
    console.log("Event");
    var selectedButton = event.target;
    if (selectedButton.tagName != 'BUTTON')
        return;
    recipe.fetchRecipe();
    movie.fetchMovie(omdbidLast);

});


