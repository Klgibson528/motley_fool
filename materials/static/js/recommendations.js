// Retrieving DOM elements
let top_five_companies_list = document.getElementById('top-five-companies-list');
let show_more_btn = document.getElementById('show-more-btn');
let show_more_span = document.getElementById('show-more-companies');

// Bindng the eventlistener to button
function bindUIActions() {
    show_more_btn.addEventListener("click", function () {
        if (show_more_span.style.display === "none") {
            show_more_span.style.display = "block";
            show_more_btn.value = "Show Less Recommendations";
        } else {
            show_more_span.style.display = "none";
            show_more_btn.value = "Show More Recommendations";
        }
    });
}

// Retrieves data from recommendaions api
function getRecs() {
    $.ajax({
        url: "http://localhost:8000/recs",
        type: "GET",
        success: function (data) {
            removeDuplicates(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Something went wrong. Please try again.");
        }
    });
}

// Removes duplicates of companies
function removeDuplicates(data) {
    let arr = [];
    let cleaned_data = [];
    data.recs.forEach(function (company, i) {
        if (arr.indexOf(company.company) > -1) {
            return;
        } else {
            arr.push(company.company);
            cleaned_data.push(company);
        }
    })
    getTopFive(cleaned_data);
}

// Sorts data to retrieve top 5 companies based on descending return_vs_benchmark value
function getTopFive(data) {
    data.sort(function (a, b) {
        return b.return_vs_benchmark - a.return_vs_benchmark;
    });
    showTopFive(data);
}

// Creates and appends li elements for top 5 companies
function showTopFive(data) {
    let i = 0;
    while (i < 5) {
        new_li = document.createElement('li');
        new_li.innerHTML = data[0].company;
        top_five_companies_list.append(new_li);
        data.splice(0, 1);
        i++;
    }
    randomize(data);
}

// Randomizes remaining companies
function randomize(data) {
    data.sort(() => Math.random() - 0.5);
    showRemaining(data)
}

// Creates and appends li elements for remaining companies
function showRemaining(data){
    data.forEach(company => {
        new_li = document.createElement('li');
        new_li.innerHTML = company.company;
        show_more_span.append(new_li);
    });
}

document.addEventListener("DOMContentLoaded", function(){
    bindUIActions();
    getRecs();
})