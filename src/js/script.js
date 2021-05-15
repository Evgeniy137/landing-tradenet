
/* ===== AOS plugin ===== */
AOS.init();
/* ===== ///// AOS plugin ===== */


/* ===== intlTelInput plugin ===== */
var input = document.querySelector("#phone"),
    countryData = window.intlTelInputGlobals.getCountryData(),
    addressDropdown = document.querySelector("#address-country");

// init plugin
var iti = window.intlTelInput(input, {
    initialCountry: "auto",
    nationalMode: true,
    geoIpLookup: function (callback) {
        $.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            callback(countryCode);
        });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js?456789" // just for formatting/placeholders etc
});

// init valid country number
var handleChange = function () {
    var text = (iti.isValidNumber()) ? console.log(iti.getNumber()) : "Please enter a number below";

    var textNode = document.createTextNode(text);
};
input.addEventListener('change', handleChange);
input.addEventListener('keyup', handleChange);

// init Country sync
for (var i = 0; i < countryData.length; i++) {
    var country = countryData[i];
    var optionNode = document.createElement("option");
    optionNode.value = country.iso2;
    var textNode = document.createTextNode(country.name);
    optionNode.appendChild(textNode);
    addressDropdown.appendChild(optionNode);
}

addressDropdown.value = iti.getSelectedCountryData().iso2;

input.addEventListener('countrychange', function (e) {
    addressDropdown.value = iti.getSelectedCountryData().iso2;
});

addressDropdown.addEventListener('change', function () {
    iti.setCountry(this.value);
});

/* ===== ///// intlTelInput plugin ===== */


