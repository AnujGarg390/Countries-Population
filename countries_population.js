let searchInputElement = document.getElementById("searchInput");
let resultCountriesElement = document.getElementById("resultCountries");
let spinnerElement = document.getElementById("spinner");

function createandappendresult(country) {
    let countryElement = document.createElement("div");
    countryElement.classList.add("d-flex", "flex-row", "col-md-5", "col-12", "ml-auto", "mr-auto", "country-card");
    resultCountriesElement.appendChild(countryElement);

    let countryFlag = document.createElement("img");
    countryFlag.src = country.flag;
    countryFlag.classList.add("country-flag", "mt-auto", "mb-auto");
    countryElement.appendChild(countryFlag);

    let countryInfo = document.createElement("div");
    countryInfo.classList.add("d-flex", "flex-column", "ml-4");
    countryElement.appendChild(countryInfo);

    let countryName = document.createElement("p");
    countryName.textContent = country.name;
    countryName.classList.add("country-name");
    countryInfo.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = country.population;
    countryPopulation.classList.add("country-population");
    countryInfo.appendChild(countryPopulation);
}

function displaysearchresults(countriesList, searchvalue) {
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.toLowerCase().includes(searchvalue.toLowerCase())) {
            createandappendresult(country);
        }
    }
}

function searchFunction() {
    let searchValue = searchInputElement.value;
    let options = {
        method: "GET",
    };
    spinnerElement.classList.remove("d-none");
    resultCountriesElement.textContent = "";




    fetch("https://apis.ccbp.in/countries-data", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            spinnerElement.classList.add("d-none");

            displaysearchresults(jsondata, searchValue);
        });

}

searchInputElement.addEventListener("keyup", searchFunction);