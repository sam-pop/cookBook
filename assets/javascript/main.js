// Gloval Variables
var appID = "36b1ec01"; // edamam application ID
var appKey = "b47a9edb6afcce664d0df80592628d5a"; // edamam application key
var searchParam = ""; // the search param to use for the api query
var space = "%20"; // use this instead of spaces between worsd
var RegEx = /[^a-zA-Z\s]/gi; //only letters and spaces

// replaces the spaces in the searchParam with "%20" 
function replaceSpaces() {
    searchParam = searchParam.split(' ').join('%20');
}

// removes numbers and special characters
function removeNonLettes() {
    searchParam = searchParam.replace(RegEx, '');
}

$(document).ready(function () {

    // update the search parameter on button click
    $('#searchBtn').click(function () {
        searchParam = $('#searchBox').val();
        removeNonLettes();
        replaceSpaces();
    });

    // clear out the search box on a mouse click
    $('#searchBox').click(function () {
        $('#searchBox').val("");
    });

    // update the search parameter when the user presses the "ENTER" key (while focus is on the search box)
    $('#searchBox').keydown(function (event) {
        if (event.keyCode == 13) {
            searchParam = $('#searchBox').val();
            removeNonLettes();
            replaceSpaces();
            return false;
        }
    });
    // API url
    var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam;
    // API
    // $.ajax({
    //     type: "GET",
    //     dataType: "json",
    //     async: "false",
    //     url: apiURL, //API url
    //     success: function (json) { //TODO: build the success function
    //         console.log(json.hits); //FIXME: TEST ONLY

    //     },
    //     error: function () { //TODO: build meaningful error function
    //         alert("API error!");
    //     }
    // });
    //  END OF api


});