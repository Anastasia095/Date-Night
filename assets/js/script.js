var omdbID = "0000000";
var omdbidLast = 0;
var movieloader = document.getElementById("hideLoader");
var loaderStyle = document.getElementById("lStyle");
var loaderNum = 0;

movieloader.style.display = "none";

function randomLoader(){
    
    loaderNum = Math.floor(Math.random() * (9 - 2 + 2) + 2);
    loaderStyle.classList.add("--" + loaderNum);

}


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

    fetchRecipe: function (diet) {

        fetch(
            "https://api.spoonacular.com/recipes/random?apiKey="
            + this.APIKey
            + "&tags="
            + diet
        )

        .then((response) => {
            return response.json();
        })
        .then((data) => this.displayRecipe(data));
    },
    displayRecipe: function (data) {
    var imgSize = "312x231.jpg";

    const { image } = data.recipes[0];
    const { title } = data.recipes[0];
    const { instructions } = data.recipes[0];
    var imgResize = image.slice(0, -11) + imgSize;
    //local storage start here

    localStorage.setItem("Recipe", title);

    document.getElementById("icon").src = imgResize;
    document.getElementById("title").innerText = title;
    document.getElementById("summary").innerHTML = instructions;
    }


};

var movie = {
    apiKey: "7ec448d5",

    fetchMovie: function (titleID) {

        fetch(
            "https://www.omdbapi.com/?i=tt"
            + titleID 
            + "&type=movie"
            + "&plot=short"
            + "&apikey=" 
            + this.apiKey
        )

        .then((response) => {
            return response.json();
        })
         .then((data) => this.displayMovie(data));
    },
    displayMovie: function (data) {
    if (data.Response == "True" && data.Poster !== "N/A") {
        movieloader.style.display = "none";
        const { Title } = data;
        const { Poster } = data;
        const { Plot } =  data;
        const { Genre } = data;
        const { Year } = data;


        localStorage.setItem("Movie", Title);
        document.getElementById("iconM").style.display = "";
        document.getElementById("iconM").src = Poster;
        document.getElementById("movieTitle").innerText = Title;
        document.getElementById("plot").innerHTML = "<b>Plot: </b>" + Plot;
        document.getElementById("genre").innerHTML = "<b>Genre: </b>" + Genre;
        document.getElementById("year").innerHTML = "<b>Year: </b>" + Year;

    } else {
        generateID();
        movie.fetchMovie(omdbidLast);
    }
    }            
};


startbtn.addEventListener('click', function (event) {
    var selectedButton = event.target;
    if (selectedButton.tagName != 'BUTTON')
        return;
        //very little jQuery below =D
    var diet = $('#tags').val();
    
    recipe.fetchRecipe(diet);
    //regenerate title ID if clicked again
    generateID();
    document.getElementById("iconM").style.display = "none";
    movie.fetchMovie(omdbidLast);
    //displaying loader while waiting on response
    loaderStyle.classList.remove("--" + loaderNum);
    randomLoader();
    movieloader.style.display = "flex";

    var recipe123 = document.getElementById("saved-title");
    var lastRecipe = localStorage.getItem("Recipe");
    recipe123.textContent=lastRecipe;

    var movie123 = document.getElementById("saved-movie");
    var lastMovie = localStorage.getItem("Movie");
    movie123.textContent=lastMovie;

    document.getElementById("start").textContent="Get new combo!";


});



