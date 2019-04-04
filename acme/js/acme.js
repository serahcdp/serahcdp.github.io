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
                if (navOpt !== null) {
                   
                    var home = false;
                    //Anvils-info
                    if (navOpt.textContent == "Anvils") {
                        
                        document.getElementById('category-name').innerHTML = data.Anvils.name;
                        document.getElementById('category-img').src = data.Anvils.path;
                        document.getElementById('description').innerHTML = data.Anvils.description;
                        document.getElementById('made-by').innerHTML = data.Anvils.manufacturer;
                        document.getElementById('review').innerHTML = data.Anvils.reviews;
                        document.getElementById('price').innerHTML = data.Anvils.price;
                    }
                     //Explosives-info
                    else if (navOpt.textContent == "Explosives") {
                        
                        document.getElementById('category-name').innerHTML = data.Explosives.name;
                        document.getElementById('category-img').src = data.Explosives.path;
                        document.getElementById('description').innerHTML = data.Explosives.description;
                        document.getElementById('made-by').innerHTML = data.Explosives.manufacturer;
                        document.getElementById('review').innerHTML = data.Explosives.reviews;
                        document.getElementById('price').innerHTML = data.Explosives.price;
                    }
                     //Decoys-info
                     else if (navOpt.textContent == "Decoys") {
                        
                        document.getElementById('category-name').innerHTML = data.Decoys.name;
                        document.getElementById('category-img').src = data.Decoys.path;
                        document.getElementById('description').innerHTML = data.Decoys.description;
                        document.getElementById('made-by').innerHTML = data.Decoys.manufacturer;
                        document.getElementById('review').innerHTML = data.Decoys.reviews;
                        document.getElementById('price').innerHTML = data.Decoys.price;
                    }
                     //Traps-info
                     else if (navOpt.textContent == "Traps") {
                        
                        document.getElementById('category-name').innerHTML = data.Traps.name;
                        document.getElementById('category-img').src = data.Traps.path;
                        document.getElementById('description').innerHTML = data.Traps.description;
                        document.getElementById('made-by').innerHTML = data.Traps.manufacturer;
                        document.getElementById('review').innerHTML = data.Traps.reviews;
                        document.getElementById('price').innerHTML = data.Traps.price;
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