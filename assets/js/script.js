var startbtn = document.getElementById("start");

var recipe = {
    APIKey: "51f5155dad22491daa0d2fd70c0fed4f",

    fetchRecipe: function (a) {

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
    console.log(data);
    const { image } = data;
    console.log(image);
    }


};

var movie = {
    apiKey: "7ec778d5",

    fetchMovie: function () {
       
        fetch(
            "https://www.ombdapi.com/?apikey=7ec778d5" + "&i=tt" + "1877830"
        )

        .then((response) => this.displayMovie(data));
    },
    displayMovie: function(data) {
    console.log(data);
    const { image } = data;
    console.log(image);
    }
            
};



console.log("Before Event");
startbtn.addEventListener('click', function (event) {
    console.log("Event");
    // var selectedButton = event.target;
    // if (selectedButton.tagName != 'BUTTON')
    //     return;

    recipe.fetchRecipe();

});