document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector(".form__block"),
        formData = {},
        input = document.querySelector("#phone"),
        phoneInput,
        formStart = document.querySelector(".form__start"),
        formEnd = document.querySelector(".form__end"),
        countryData = window.intlTelInputGlobals.getCountryData(),
        addressDropdown = document.querySelector("#address-country"),
        errorMsg = document.querySelector("#error-msg"),
        validMsg = document.querySelector("#valid-msg"),
        errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];


    // add data
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.classList.contains("done")) {
            let elements = document.querySelector(".form__block").elements;

        for (let i = 0; i < elements.length; i++) {
            let item = elements.item(i);
            formData[item.name] = item.value;
        }

        delete formData[''];
        formData['Phone number'] = phoneInput
        let checkbox = document.querySelector('.form__input--checkbox').checked;
        formData['Checkbox checked'] = checkbox;
        console.log(formData)
        formStart.classList.add('form__animate')
        formEnd.classList.add("form__end-animate")
/*         formStart.style.display = "none"
        formEnd.style.display = "block" */
        }
        
    })

    // init plugin
    let iti = window.intlTelInput(input, {
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
    let handleChange = function () {
        let text = (iti.isValidNumber()) ? phoneInput = iti.getNumber() : "Please enter a number below";
        phoneInput = iti.getNumber()
        /* console.log(phoneInput) */
    };


    var reset = function () {
        input.classList.remove("error");
        errorMsg.innerHTML = "";
        errorMsg.classList.add("hide");
        validMsg.classList.add("hide");
    };

    // on blur: validate
    input.addEventListener('blur', function () {
        reset();
        if (input.value.trim()) {
            if (iti.isValidNumber()) {
                validMsg.classList.remove("hide");
                input.classList.add('done')
            } else {
                input.classList.add("error");
                var errorCode = iti.getValidationError();
                errorMsg.innerHTML = errorMap[errorCode];
                errorMsg.classList.remove("hide");
            }
        }
    });

    // on keyup / change flag: reset
    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);
    input.addEventListener('keyup', function() {
        this.value = this.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
    });

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







})




/* ===== AOS plugin ===== */
AOS.init();
/* ===== ///// AOS plugin ===== */





