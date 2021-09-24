function newRequest(method, url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url);
        request.responseType = "json";

        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error("Request error: " + request.statusText));
            }
        }

        request.onerror = () => {
            reject(Error("Network error"));
        }

        request.send();
    })
}

// var getAllCompanies = async function () {
//     try {
//         return await newRequest("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Company");

//     } catch (error) {
//         console.log(error.message);
//     }
// }

var getAllCompanies = function () {
    return new Promise( resolve => {
        setTimeout(function() {
            resolve("algo");
        }, 5000)
    })
}

var getAllEmployees = async function () {
    try {
        return await newRequest("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Employee");

    } catch (error) {
        console.log(error.message);
    }
}

var parallel = async function () {
    await Promise.all([
        (async () => await getAllCompanies())(),
        (async () => await getAllEmployees())()
    ])

        .then(response => {
            console.log(response)
        })

        .catch(error => {
            console.log(error);
        })
}



parallel();
