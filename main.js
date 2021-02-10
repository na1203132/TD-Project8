//DOCUMENT OBJECT MODEL DEFINITIONS
let cardsContainer = document.querySelector('.cards-container');
const card = document.querySelector('.card');
let employees = [];
let modalContainer = document.querySelector('.modal-content');
let overlay = document.querySelector('.overlay');
const modalClose = document.querySelector(".modal-close");

function fetchData(url){
    return fetch(url)
            //   .then(checkStatus)
              .then(res => res.json())
              .catch(error => console.log('Looks like there was a problem',error))
  }

//   function checkStatus(response){
//     if(response.ok){
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(new Error(response.statusText));
//     }
  
//   }

fetchData('https://randomuser.me/api/?results=12').then(data => generateCards(data.results))

// function generateCards(data){
//     const cards = data.map((card,index) => `
//         <div class="card" id="${index}">
//             <img src="${card.picture.large}" alt="profile-picture">
//             <div class="user-data">
//                 <h3 class="name">${card.name.first} ${card.name.last}</h3>
//                 <div class="contact-info">
//                     <p>${card.email}</p>
//                     <span>${card.location.country}</span>
//                 </div>
//             </div>
//         </div>
//       `).join('');
//     cardsContainer.innerHTML=cards;
//   }


function generateCards(employeeData) {
  employees = employeeData;
  // store the employee HTML as we create it
  let employeeHTML = '';
  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
  let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let picture = employee.picture;
  // template literals make this so much cleaner!
  employeeHTML += `
                  <div class="card" data-index="${index}">
                    <img class="avatar" src="${picture.large}" alt="profile-picture"/>
                    <div class="user-data">
                      <h3 class="name">${name.first} ${name.last}</h3>
                      <div class="contact-info">
                        <p>${email}</p>
                        <span>${city}</span>
                      </div>
                    </div>
                  </div>
                  `
                  });
    cardsContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  // use object destructuring make our template literal cleaner
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
      <img class="avatar-overlay" src="${picture.large}" />
      <div class="text-container">
      <h3 class="name">${name.first} ${name.last}</h3>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
      ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
      `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


cardsContainer.addEventListener('click', e => {

  if (e.target !== cardsContainer) {
  const card = e.target.closest(".card");
  const index = card.getAttribute('data-index');
  displayModal(index);
  }
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });
  