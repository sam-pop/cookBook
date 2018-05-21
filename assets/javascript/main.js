// Gloval Variables
var appID = "36b1ec01";
var appKey = "b47a9edb6afcce664d0df80592628d5a";

// API
$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        async: "false",
        url: "",
        success: function (json) {
            console.log(json.id);

        },
        error: function () {
            alert("API error!");
        }
    });
});