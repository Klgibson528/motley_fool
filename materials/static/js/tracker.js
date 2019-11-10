// Retrieving DOM elements
let submit_btn = document.getElementById('submit-btn');

// Binding eventlistener
submit_btn.addEventListener('click', function (e) {
    e.preventDefault();
    let email_input = document.getElementById("email");
    let email = email_input.value;

    // Posting data to add_to_campaign
    $.ajax({
        url: "http://localhost:8000/add_to_campaign ",
        type: "POST",
        data: { "email": email },
        success: function (data) {
            createTracker(data, email);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Something went wrong. Please try again.");
        }
    });
});

// Object to track new fools
class FoolTracker {
    constructor(pageType, pageProperties) {
        this.pageType = pageType;
        this.pageProperties = pageProperties;
    }
    trackEvent(eventName, eventProperties) {
        let trackingProperties = {};
        Object.assign(trackingProperties, this.pageProperties, eventProperties);
    }
}

// Creating tracker for user and redirecting to campaign_url
function createTracker(data, email) {
    let curr_date = new Date();
    let fool = new FoolTracker("advertorial", { email: email, user_id: data.user_id });
    fool.trackEvent("email capture", { date: curr_date });
    alert("You have successfully joined our email list!");
    window.location = data.campaign_url;
}