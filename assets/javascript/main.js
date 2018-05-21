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