

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
  geoIpLookup: function(success, failure) {
    axios({
        method: "get",
        url: 'https://ipinfo.io',
        responseType: "json"
    })
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js" // just for formatting/placeholders etc
});