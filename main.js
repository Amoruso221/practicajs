var Employee = function (company, lastName, firstName, email) {
    this.company = company;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
}

var newRequest = function(method, url) {
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

var getAllCompanies = async function () {
    try {
        return await newRequest("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Company");

    } catch (error) {
        console.log(error.message);
    }
}

var getAllEmployees = async function () {
    try {
        return await newRequest("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Employee");

    } catch (error) {
        console.log(error.message);
    }
}

var renderTable = function(employeeArray){
    const table = document.getElementById('data');

    for (let i = 0; i < employeeArray.length; i++) {
        let employee = employeeArray[i];

        let newRow = table.insertRow(-1);

        let newCell0 = newRow.insertCell(0);
        let newText0 = document.createTextNode(i+1);
        newCell0.appendChild(newText0);

        let newCell1 = newRow.insertCell(1);
        let newText1 = document.createTextNode(employee.company);
        newCell1.appendChild(newText1);

        let newCell2 = newRow.insertCell(2);
        let newText2 = document.createTextNode(employee.lastName);
        newCell2.appendChild(newText2);

        let newCell3 = newRow.insertCell(3);
        let newText3 = document.createTextNode(employee.firstName);
        newCell3.appendChild(newText3);

        let newCell4 = newRow.insertCell(4);
        let newText4 = document.createTextNode(employee.email);
        newCell4.appendChild(newText4);

        let newCell5 = newRow.insertCell(5);
        var btn = document.createElement('input');
        btn.type = "button";
        btn.value = "delete";
        newCell5.appendChild(btn);
    }
}

var createEmployeesArray = function(companies, employees){
    var newArray = new Array();

    for (let index = 0; index < employees.length; index++) {

        let employee = employees[index];
        let company = companies.find(item => item.companyId === employee.companyId);

        let newEmployee = new Employee();
        newEmployee.company = company.name;
        newEmployee.lastName = employee.lastName;
        newEmployee.firstName = employee.firstName;
        newEmployee.email = employee.email;

        newArray.push(newEmployee);
    }

    renderTable(newArray);
}

var parallel = async function () {
    await Promise.all([
        (async () => await getAllCompanies())(),
        (async () => await getAllEmployees())()
    ])

        .then(response => {
            createEmployeesArray(response[0], response[1]);
        })

        .catch(error => {
            console.log(error);
        })
}

parallel();
