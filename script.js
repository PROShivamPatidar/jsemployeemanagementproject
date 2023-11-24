const form = document.getElementById("form");
const recordscontainer = document.getElementById("records-container");
const createButton = document.querySelector("#form button");

let employelist = [];
let empid = 1000;
let formstate = "CREATE";

const onSubmitForm = (event) => {
  event.preventDefault();
  const employee = {
    employeeId: ++empid,
    name: event.target.name.value,
    salary: event.target.salary.value,
    team: event.target.team.value,
    role: event.target.role.value,
    companyname: event.target.companyname.value,
  };
  if (formstate === "CREATE") {
    addNewEmployeeRecord(employee);
  } else if (formstate === "UPDATE") {
    updateEmployeeRecord(employee);
    formstate = "CREATE";
    createButton.innerText = "Create Employee";
  }

  form.reset();
};

function deleteRecord(event) {
  if (formstate === "UPDATE") {
    alert("Please update first");
    return;
  }
  const deleteButton = event.target;
  const record = deleteButton.parentNode.parentNode;
  record.remove();
  const currentEmployeId = parseInt(deleteButton.getAttribute("data-empid"));
  employelist = employelist.filter(
    (employee) => employee.employeeId !== currentEmployeId
  );
}

function fillFormWithData(employee) {
  for (let key in employee) {
    if (key != "employeeId") {
      form[key].value = employee[key];
    }
  }
  createButton.innerText = "Update Employee";
  formstate = "UPDATE";
}

function updateEmployeeRecord(employee) {
  const currentEmployeId = parseInt(form.employeeId.value);
  for (let i = 0; i < employelist.length; i++) {
    if (currentEmployeId === employelist[i].employeeId) {
      // Update the existing employee object
      employelist[i] = employee;
      // Update the displayed record
      updateDisplayedRecord(employelist[i]);
      break;
    }
  }
}

function updateDisplayedRecord(employee) {
  const record = recordscontainer.querySelector(
    `[data-empid="${employee.employeeId}"]`
  );
  const cells = record.querySelectorAll("td");
  let index = 0;
  for (let key in employee) {
    cells[index].innerText = employee[key];
    index++;
  }
}

function editRecord(event) {
  const editButton = event.target;
  const currentEmployeId = parseInt(editButton.getAttribute("data-empid"));
  for (let i = 0; i < employelist.length; i++) {
    if (currentEmployeId === employelist[i].employeeId) {
      fillFormWithData(employelist[i]);
      break;
    }
  }
}

function addNewEmployeeRecord(employee) {
  const record = document.createElement("tr");
  for (let key in employee) {
    const cell = document.createElement("td");
    cell.innerText = employee[key];
    record.appendChild(cell);
  }

  const optionSell = document.createElement("td");

  const editIcon = document.createElement("span");
  editIcon.className = "material-icons icon";
  editIcon.innerText = "edit";
  editIcon.addEventListener("click", editRecord);
  editIcon.setAttribute("data-empid", employee.employeeId);

  const deleteIcon = document.createElement("span");
  deleteIcon.className = "material-icons icon";
  deleteIcon.innerText = "delete";
  deleteIcon.addEventListener("click", deleteRecord);
  deleteIcon.setAttribute("data-empid", employee.employeeId);

  optionSell.append(editIcon, deleteIcon);
  record.appendChild(optionSell);
  recordscontainer.appendChild(record);

  employelist.push(employee);
}

form.addEventListener("submit", onSubmitForm);
