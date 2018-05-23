/*
HTML elements:
---------------
+ search button - #searchBtn
+ search input - #searchBox (add title="..." for the tooltip content)
+ objects output - #output
+ loading screen -  .preload (& <img src="./assets/images/loading_spinner.gif" />)
                    .mainContent (for fadeIn effect also holds all the page content)
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


// iterate over the ingredients list and creates an unordered list of ingredients
Recipe.prototype.listIngredients = function () {
    var ingList = $('<ul>');
    for (var i = 0; i < this.ingredients.length; i++) {
        var ing = $('<li>').text(this.ingredients[i].text);
        ingList.append(ing);
    }
    return ingList;
};

// builds the card items and appends them to the page (BULMA)
Recipe.prototype.showRecipe = function () {
    var link = $('<a>').attr({
        'href': this.url,
        'target': '_blank'
    });

    var ingredientDropdown = $('<div>').addClass('dropdown').append([$('<div>').addClass('dropdown-trigger').attr('title', "Click me!").append($('<button>').attr({
        'aria-haspopup': 'true',
        'aria-controls': 'dropdown-menu2'
    }).append([$('<span>').text('Ingredient List'), $('<span>').addClass('icon is-small').append(
        $('<i>').addClass('fas fa-angle-down').attr('aria-hidden', true))])), $('<div>').addClass('dropdown-menu').attr({
        id: 'dropdown-menu2',
        role: 'menu'
    }).append($('<div>').addClass('dropdown-content').append($('<div>').addClass('dropdown-item').append(this.listIngredients())))]);

    var card = $('<div>').addClass('card').append(link.append([$('<div>').addClass('card-image').append($('<figure>').addClass('image is-6by6')
        .append($('<img>').attr('src', this.image))), $('<div>').addClass('card-content card-header').append($('<div>').addClass('title is-5').text(this.label))])).append($('<p>')
        .addClass('content card-li').append(ingredientDropdown));

    $('#output').append(card);
    $('#output').append('<br>'); //FIXME: check if needed



};
// // builds the card items and appends them to the page (BOOTSTRAP)
// Recipe.prototype.showRecipe = function () {
//     var link = $('<a>').attr('href', this.url);
//     var card = $('<div>').addClass('card').append(link.append(
//         $('<img>').attr('src', this.image).addClass('card-img-top')));
//     $('<div>').addClass('card-body').appendTo(card).append([
//         link.append($('<h5>').addClass('card-title').text(this.label)),
//         $('<p>').addClass('card-text').append(this.listIngredients())
//     ]);
//     $('#output').append(card);
// };


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

// create Recipe objects from the API's json file and display them
function apiSuccess(json) {
    for (var i = 0; i < json.hits.length; i++) {
        var recipe = new Recipe(json.hits[i].recipe.label, json.hits[i].recipe.ingredients, json.hits[i].recipe.image, json.hits[i].recipe.url);
        recipes.push(recipe);
        console.log('​recipe', recipe); //TODO: delete when no longer needed
        recipe.showRecipe();
    }
}

// API
function runAPI() {
    var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam + "&excluded=" + excluded + "&from=0&to=" + maxResults; // the URL for the API to use
    $.ajax({
        type: "GET",
        dataType: "json",
        async: "false",
        url: apiURL,
        success: function (json) { //TODO: finish building the success function
            apiSuccess(json);

            // opens ingredients dropdown on mouse click and closes on mouseout
            $(document).on("click", ".dropdown", function () {
                this.classList.toggle('is-active');
                $(this).mouseout(function () {
                    this.classList.remove('is-active');
                });

            });
        },
        error: function () { //TODO: build meaningful error function
            alert("API error!");
        }
    });
}


$(".preload").hide(); // hide prograss bar
$('#notification').hide(); // hide the notification

$(document).ready(function () {

    $('#aboutLink').click(function () {
        $('#notification').toggle();
    });

    $('#deleteBtn').click(function () {
        $('#notification').hide();
    });

    //jQueryUI tooptip
    $('#searchBox').tooltip({
        show: {
            effect: "slideDown",
            delay: 1000
        },
        hide: {
            effect: "slideUp",
            delay: 100
        },
        track: true
    });

    // update the search parameter on button click 
    $('#searchBtn').click(function () {
        $('#output').empty();
        searchParam = $('#searchBox').val();
        parseSearchParam();
        runAPI();

        // content loading progress bar
        $(".preload").show().fadeOut(3000, function () {
            $("#output").fadeIn(1000);
        });

    });

    // // clear out the search box on a mouse click
    // $('#searchBox').click(function () {
    //     $('#searchBox').val("");
    // });

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
        "basil",
        "beans",
        "beef",
        "bell",
        "black",
        "breast",
        "broccoli",
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
        "noodle",
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
        "salad",
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
        "toast",
        "toasted",
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


// clearable text input
function tog(v) {
    return v ? 'addClass' : 'removeClass';
}
$(document).on('input', '.clearable', function () {
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function (e) {
    $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
}).on('touchstart click', '.onX', function (ev) {
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
});