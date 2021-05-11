

/* document.addEventListener('DOMContentLoaded', function () {

    let form = document.querySelector(".form")
    let input1 = document.querySelectorAll("#input");
    let formData = new FormData(form)

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        input1.forEach((item) => {
            formData.set(item.name, item.value)
        })
        for (let value of formData.entries()) {
            console.log(value[0] + ': ' + value[1] + ';  type ' + typeof (value[0] + ': ' + value[1]));
            console.log(typeof (formData))

        }
    })

}) */

var input = document.querySelector("#phone");
window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            callback(countryCode);
        });
    },
    utilsScript: "../../build/js/utils.js?1613236686837" // just for formatting/placeholders etc
});