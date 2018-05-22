/*
HTML elements:
---------------
+ search button - #searchBtn
+ search input - #searchBox
+ api output (apiSuccess function) - #output
---------------
*/

// Gloval Variables
var appID = "36b1ec01"; // edamam application ID
var appKey = "b47a9edb6afcce664d0df80592628d5a"; // edamam application key
var searchParam = ""; // the search param to use for the api query
var space = "%20"; // use this instead of spaces between worsd
var RegEx = /[^a-zA-Z\s]/gi; //only letters and spaces
var recipes = []; // holds an array of Recipe Objects that we fetched from the API

// Constructor
function Recipe(label, ingredients, image, url) {
    this.label = label;
    this.ingredients = ingredients;
    this.image = image;
    this.url = url;
}

// iterate over the ingredients list and FIXME: ...and does what?
Recipe.prototype.listIngredients = function () {
    for (var i = 0; i < this.ingredients.length; i++) {
        console.log(this.ingredients[i]); //TODO: change
    }
};

// replaces the spaces in the string with "%20" 
function replaceSpaces(str) {
    return str.split(' ').join('%20');
}

// removes numbers and special characters
function removeNonLettes(str) {
    return str.replace(RegEx, '');
}

// searchParam => contains lettes only and "%20" instead of spaces
function parseSearchParam() {
    searchParam = removeNonLettes(searchParam);
    searchParam = replaceSpaces(searchParam);
}

//TODO: extract the relevant information from the fetched json file
//FIXME: json.hits[i].recipe.* -> image(url), ingredients[], label, url(recipe external url) 
function apiSuccess(json) {
    for (var i = 0; i < json.hits.length; i++) {
        var recipe = new Recipe(json.hits[i].recipe.label, json.hits[i].recipe.ingredients, json.hits[i].recipe.image, json.hits[i].recipe.url);
        recipes.push(recipe);

        //TODO: check if needed / if not delete
        // var output = $('#output');
        // output.append('<p>' + json.hits[i].recipe.url + '</p>');
    }
}

// API
function runAPI() {
    var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam; // the URL for the API to use
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
        console.log('​recipes', recipes); //TODO: delete

    });

    // clear out the search box on a mouse click
    $('#searchBox').click(function () {
        $('#searchBox').val("");
    });

    // update the search parameter when the user presses the "ENTER" key (while focus is on the search box)
    $('#searchBox').keydown(function (event) {
        if (event.keyCode == 13) {
            searchParam = $('#searchBox').val();
            parseSearchParam();
            runAPI();
            return false;
        }
    });






});