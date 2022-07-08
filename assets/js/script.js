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
    // console.log(data.recipes[0]);
    // console.log(data.recipes[0].image);
    var imgSize = "312x231.jpg";
    const { image } = data.recipes[0];
    const { title } = data.recipes[0];
    // const { summary } = data.recipes[0];
    const { instructions } = data.recipes[0];
    console.log(instructions);
    var imgResize = image.slice(0, -11) + imgSize;
    

    document.getElementById("icon").src = imgResize;
    document.getElementById("title").innerText = title;
    document.getElementById("summary").innerHTML = instructions;
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


