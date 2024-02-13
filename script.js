  // store all the data in local storage
    // also provide a unique id to each employee
    class Employee {
        constructor(name, email, phone, job) {
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.job = job;
            this.id = Math.floor(Math.random() * 1000);
        }
    }

    // show all the employees in the table
    function showEmployees() {
        let employees = JSON.parse(localStorage.getItem('employees'));
        let employeesTable = document.getElementById('employees');
        employeesTable.innerHTML = '';
        if (employees != null) {
            for (let i = 0; i < employees.length; i++) {
                employeesTable.innerHTML += `
                    <tr>
                        <td class="px-4 py-2">${employees[i].id}</td>
                        <td class="px-4 py-2">${employees[i].name}</td>
                        <td class="px-4 py-2">${employees[i].phone}</td>
                        <td class="px-4 py-2">${employees[i].job}</td>
                        <td class="px-4 py-2  flex justify-center gap-2">
                            <img onclick="editEmployee(${employees[i].id})" src="edit.png" alt="edit" class="w-6 h-6 cursor-pointer">
                            <img onclick="deleteEmployee(${employees[i].id})" src="delete.png" alt="delete" class="w-6 h-6 cursor-pointer">
                        </td>
                    </tr>
                `;
            }
        }
    }

    // add employee also check if the employee already exists phone number is unique also chck imput fields are not empty
    function addEmployee() {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let job = document.getElementById('job').value;
        let employees = JSON.parse(localStorage.getItem('employees'));
        if (employees == null) {
            employees = [];
        }
        let employee = new Employee(name, email, phone, job);
        let flag = 0;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].phone == employee.phone) {
                flag = 1;
                break;
            }
        }
        if (flag == 0 && name != '' && email != '' && phone != '' && job != '' && phone.length >= 10 && phone.length <= 14) {
            employees.push(employee);
            localStorage.setItem('employees', JSON.stringify(employees));
            emptyFields();
            showEmployees();
        } else if (flag == 1) {
            alert('Employee already exists');
        } else {
            alert('Please fill all the fields');
        }
    }

    // edit employee
    function editEmployee(id) {
        let employees = JSON.parse(localStorage.getItem('employees'));
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id == id) {
                document.getElementById('name').value = employees[i].name;
                document.getElementById('email').value = employees[i].email;
                document.getElementById('phone').value = employees[i].phone;
                document.getElementById('job').value = employees[i].job;
                break;
            }
        }
    }

    // update employee
    function updateEmployee() {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let job = document.getElementById('job').value;
        let employees = JSON.parse(localStorage.getItem('employees'));
        let id = 0;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].phone == phone || employees[i].email == email) {
                id = employees[i].id;
                break;
            }
        }
        // add confirmation box
        if (confirm('Are you sure you want to update this employee?')) {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id == id) {
                    employees[i].name = name;
                    employees[i].email = email;
                    employees[i].phone = phone;
                    employees[i].job = job;
                    break;
                }
            }
            localStorage.setItem('employees', JSON.stringify(employees));
            emptyFields();
            showEmployees();
        }
    }


    // delete employee
    function deleteEmployee(id) {
        let employees = JSON.parse(localStorage.getItem('employees'));
        if (confirm('Are you sure you want to delete this employee?')) {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id == id) {
                    employees.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem('employees', JSON.stringify(employees));
            showEmployees();
        }
    }

    function emptyFields() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('job').value = '';
    }

    showEmployees();