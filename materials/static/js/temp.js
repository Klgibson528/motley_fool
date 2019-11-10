// Retrieving DOM elements
let disclosure_div = document.querySelector("[data-swapper-tag]");

// Retrieving data from disclosure api
function getDisclosure() {
    $.ajax({
        url: "http://localhost:8000/disclosure",
        type: "GET",
        success: function (data) {
            displayDisclosure(data.disclosure);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Something went wrong. Please try again.");
        }
    });
}

// Displays disclosure
function displayDisclosure(data) {
    disclosure_div.innerHTML = data;
}

// Let's go!
document.addEventListener("DOMContentLoaded", function(){
    getDisclosure()
});