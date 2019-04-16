const employeeGrid = document.getElementById('employeeGrid');
const modal = document.getElementById('modal');
const userInfoApi = 'https://randomuser.me/api/?nat=us&results=12';
let currentIndex = 0;
let employeeData = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error));
}

fetchData(userInfoApi)
  .then(data => {
    let employeeInfo = "<ul id='employeeList'>";

    $.each (data.results, function (key, value) {
      employeeInfo += `
      <li class="employee" data-index="` + key + `">
        <img class="employeeImage" src="${value.picture.large}">
        <div class="employeeText">
          <h3 class="employeeName">${value.name.first} ${value.name.last}</h3>
          <p>${value.email}</p>
          <p>${value.location.city}</p>
        </div>
      </li>`

      let employeeResults = {
        image: value.picture.large,
        name: value.name.first + ' ' + value.name.last,
        email: value.email,
        city: value.location.city,
        phone: value.phone,
        address: value.location.street + ', ' + value.location.state + ' ' + value.location.postcode,
        birthday: 'Birthday: ' + value.dob.date.substring(5,7) + '/' + value.dob.date.substring(8,10) + '/' + value.dob.date.substring(0,4)
      };
      employeeData.push(employeeResults);
    });
    employeeInfo += `</ul>`;
    employeeGrid.innerHTML = employeeInfo;
  })
  .catch(console.log('This does not seem to be working!'));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function scrollCheck(){
  if (currentIndex == 0) {
    $('#scrollLeft').hide();
  } else if (currentIndex == 11) {
    $('#scrollRight').hide();
  } else {
    $('#scrollRight').show();
    $('#scrollLeft').show();
  }
}

// Get Modal Element
function viewModal(index){
  let currentEmployee = employeeData[index];

  modalInfo.innerHTML = `
  <img src="${currentEmployee.image}" class="modalImage">
  <div class="modalText">
    <h3>${currentEmployee.name}</h3>
    <p>${currentEmployee.email}</p>
    <p>${currentEmployee.city}</p>
    <hr class="lineBreak" />
    <p>${currentEmployee.phone}</p>
    <p>${currentEmployee.address}</p>
    <p>${currentEmployee.birthday.substring()}</p>
  </div>`;
  modal.style.display = 'block';
}

  $('#employeeGrid').on('click', 'LI', (function(){
    currentIndex = parseInt(this.dataset.index);
    scrollCheck();
    viewModal(currentIndex);
}));

// Close modal
$('#close').click(function(){
  $('#modal').hide();
});

// Scroll modal

$('#scrollLeft').click(function(){
  currentIndex -= 1;
  scrollCheck();
  viewModal(currentIndex);
});

$('#scrollRight').click(function(){
  currentIndex += 1;
  scrollCheck();
  viewModal(currentIndex);
});

// Search Bar

function searchBar() {
  // Declare variables
  var input, filter, ul, li, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('employeeList');
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    h3 = li[i].getElementsByTagName("h3")[0];
    txtValue = h3.textContent || h3.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
