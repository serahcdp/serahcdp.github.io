'use strict';
let categoryInfo = document.getElementById('category-info');
let homeInfo = document.getElementById('home-content');
/*************************JSON************************************* */
let acmeURL = "/acme/js/acme.json";
fetchData(acmeURL);
function fetchData(acmeURL) {
    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                var result = response.json();
                console.log('result', result);
                return result;
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            console.log(data);
            document.querySelector("body").addEventListener('click', function (navoption) {
                var navOpt = navoption.target.closest('a');
                if (anchor !== null) {
                    console.log(navOpt.textContent);
                    var home = false;
                    //Anvils
                    if (navOpt.textContent == "Anvils") {
                        console.log(data.Anvils);
                        document.getElementById('category-name').innerHTML = data.Anvils.name;
                        document.getElementById('category-img').src = data.Anvils.path;
                        document.getElementById('description').innerHTML = data.Anvils.description;
                        document.getElementById('made-by').innerHTML = data.Anvils.manufacturer;
                        document.getElementById('review').innerHTML = data.Anvils.reviews;
                        document.getElementById('price').innerHTML = data.Anvils.price;
                    }
                    else {
                        home = true;
                    }
                }
                if (home == 0) {
                    categoryInfo.setAttribute('class', ''); // removes hide class
                    homeInfo.setAttribute('class', 'hide'); // hides home
                } else {
                    categoryInfo.setAttribute('class', 'hide'); // removes hide class
                    homeInfo.setAttribute('class', ''); // hides home
                }
            }, false);
        })

        // If there is an error
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
        })
}