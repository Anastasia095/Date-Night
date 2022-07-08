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
    console.log(data);
    console.log(data.recipes[0]);
    console.log(data.recipes[0].image);
    
    const { image } = data.recipes[0].image;
    document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";

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