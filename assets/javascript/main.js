// Gloval Variables
var appID = "36b1ec01";
var appKey = "b47a9edb6afcce664d0df80592628d5a";
var searchParam = "chicken%20flour%20bread";
var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam;

// API
$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        async: "false",
        url: apiURL,
        success: function (json) {
            console.log(json.hits[1]);

        },
        error: function () {
            alert("API error!");
        }
    });
});