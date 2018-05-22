/*
HTML elements:
---------------
+ search button - #searchBtn
+ search input - #searchBox
+ objects output - #output
---------------
*/

// Gloval Variables
var appID = "36b1ec01"; // edamamAPI application ID
var appKey = "b47a9edb6afcce664d0df80592628d5a"; // edamamAPI application key
var searchParam = ""; // the search param to use for the api query
var excluded = ""; // ingredient to exclude from results //TODO: fix to include multiple ingredients ('&excluded='+ array[i])
var maxResults = 5; // the maxium number of results to return from the API
var space = "%20"; // use this instead of spaces between words
var regEx = /[^a-zA-Z\s]/gi; //only letters and spaces
var recipes = []; // holds an array of 'Recipe' objects that we fetched from the API

// Constructor
function Recipe(label, ingredients, image, url) {
    this.label = label;
    this.ingredients = ingredients;
    this.image = image;
    this.url = url;
}

// iterate over the ingredients list and print the ingredients
Recipe.prototype.listIngredients = function () {
    for (var i = 0; i < this.ingredients.length; i++) {
        //TODO: print the ingredients to screen
    }
};


//TODO: Recipe.prototype functions to print to screen the rest of the Recipe properties


// replaces the spaces in the string with "%20" 
function replaceSpaces(str) {
    return str.split(' ').join('%20');
}

// removes numbers and special characters
function removeNonLettes(str) {
    return str.replace(regEx, '');
}

// searchParam => contains lettes only and "%20" instead of spaces
function parseSearchParam() {
    searchParam = removeNonLettes(searchParam);
    searchParam = replaceSpaces(searchParam);
}

//TODO: extract the relevant information from the fetched json file
//TODO: DELETE THIS LINE - json.hits[i].recipe.* -> image(url), ingredients[], label, url(recipe external url) 
function apiSuccess(json) {
    for (var i = 0; i < json.hits.length; i++) {
        var recipe = new Recipe(json.hits[i].recipe.label, json.hits[i].recipe.ingredients, json.hits[i].recipe.image, json.hits[i].recipe.url);
        recipes.push(recipe);
        console.log('​recipe', recipe);
        // recipe.listIngredients(); //TODO: continue this logic


    }
}

// API
function runAPI() {
    // var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam; // the URL for the API to use
    var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam + "&excluded=" + excluded + "&from=0&to=" + maxResults; // the URL for the API to use
    $.ajax({
        type: "GET",
        dataType: "json",
        async: "false",
        url: apiURL,
        success: function (json) { //TODO: finish building the success function
            apiSuccess(json);


        },
        error: function () { //TODO: build meaningful error function
            alert("API error!");
        }
    });
}

$(document).ready(function () {

    // update the search parameter on button click 
    $('#searchBtn').click(function () {
        searchParam = $('#searchBox').val();
        parseSearchParam();
        runAPI();

    });

    // clear out the search box on a mouse click
    $('#searchBox').click(function () {
        $('#searchBox').val("");
    });

    // // update the search parameter when the user presses the "ENTER" key (while focus is on the search box)
    // $('#searchBox').keydown(function (event) {
    //     if (event.keyCode == 13) {
    //         searchParam = $('#searchBox').val();
    //         parseSearchParam();
    //         runAPI();
    //         return false;
    //     }
    // });






});


// jQueryUI autocomplete
$(function () {
    var availableTags = [
        "American",
        "Mexican",
        "Swiss",
        "Tex-Mex",
        "balsamic",
        'basil',
        "beans",
        'beef',
        "bell",
        'black',
        'broccoli',
        "broth",
        "brown",
        "burger",
        "burrito",
        "butter",
        "canned",
        "canola",
        "carrots",
        "cheddar",
        "cheese",
        "chicken",
        "chops",
        "cocoa",
        "cooked",
        "corn",
        "couscous",
        "cucumber",
        "dip",
        "dressing",
        "dried",
        "eggs",
        "feta",
        "fish",
        "flour",
        "fresh",
        "fresh",
        "fried",
        "fries",
        "frozen",
        "garlic",
        "green",
        "grilled",
        "ham",
        "hot",
        "hummus",
        "ketchup",
        "lamb",
        "legs",
        "lemon",
        "lentil",
        "lettuce",
        "mayo",
        "mayonnaise",
        "meatballs",
        "mild",
        "mushrooms",
        "mustard",
        "oil",
        "olive",
        "olives",
        "omelet",
        "onion",
        "onions",
        "orange",
        "oregano",
        "paprika",
        "pasta",
        "patties",
        "peas",
        "pepper",
        "pig",
        "pizza",
        "pork",
        "potato",
        "potatoes",
        "powder",
        "quinoa",
        "ravioli",
        "red",
        "relish",
        "rice",
        "roasted",
        "rosemary",
        "salsa",
        "salt",
        "sauce",
        "sausage",
        "sharp",
        "soup",
        "spice",
        "spices",
        "spicy",
        "squash",
        "steak",
        "taco",
        "thighs",
        "thyme",
        "tomatoes",
        "turkey",
        "vegetable",
        "veggies",
        "water",
        "white",
        "wine",
        "wings",
        "yellow",
        "yogurt",
        "zest",
        "zucchini"
    ];

    function split(val) {
        return val.split(" ");
    }

    function extractLast(term) {
        return split(term).pop();
    }

    $("#searchBox")
        // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 2,
            source: function (request, response) {
                // delegate back to autocomplete, but extract the last term
                response($.ui.autocomplete.filter(
                    availableTags, extractLast(request.term)));
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push("");
                this.value = terms.join(" ");
                return false;
            }
        });
});