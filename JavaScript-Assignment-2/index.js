
let cart = [];

const allDrink = async () => {
  try {
    const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
    const data = await res.json();
    displayData(data.drinks);

  } catch (error) {
    console.log(error);
  }
};

allDrink();

const displayData = (drinks) => {
  const cardDiv = document.querySelector(".drinks");
  cardDiv.innerHTML = "";

  drinks.forEach((drink) => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4");

    div.innerHTML = `
      <div class="card h-100 shadow-sm p-3 d-flex flex-column">

          <img src="${drink.strDrinkThumb}" class="card-img-top rounded">

          <h1 class="text-center mt-3 fs-4 fw-bold">Name: ${drink.strDrink}</h1>
          <h3 class="text-center fs-5 fw-semibold">Category: ${drink.strCategory}</h3>
          <h5 class="text-center fs-6 fw-semibold">Alcoholic: ${drink.strAlcoholic}</h5>

          <p class="text-center flex-grow-1">
              ${drink.strInstructions.slice(0, 120)}...
          </p>

          <div class="d-flex gap-2 mt-auto">
              <button 
                class="btn btn-outline-secondary w-100 text-nowrap"
                id="btn-${drink.idDrink}"
                onclick='addToCart("${drink.idDrink}", "${drink.strDrink}", "${drink.strDrinkThumb}")'
              >
                Add to group
              </button>

              <button 
                class="btn btn-primary w-100 text-nowrap"
                onclick='drinksDetails("${drink.idDrink}")'
              >
                Details
              </button>
          </div>

      </div>
    `;

    cardDiv.appendChild(div);
  });
};

const drinksDetails = async (id) => {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const drink = data.drinks[0];

  const modalDiv = document.getElementById("modalContent");

  modalDiv.innerHTML = `
    <img src="${drink.strDrinkThumb}" class="img-fluid rounded mb-3" style="max-width: 300px; margin: 0 auto; display: block;">

    <h3>${drink.strDrink}</h3>
    <p><b>Category:</b> ${drink.strCategory}</p>
    <p><b>Glass:</b> ${drink.strGlass}</p>
    <p><b>IBA:</b> ${drink.strIBA || "N/A"}</p>
    <p><b>Instructions:</b> ${drink.strInstructions}</p>
  `;

  new bootstrap.Modal(document.getElementById("drinkModal")).show();
};
const addToCart = (id, name, img) => {
  const existingItem = cart.find(item => item.id === id);
  
  // If item already exists, remove it
  if (existingItem) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    
    const btn = document.getElementById(`btn-${id}`);
    btn.innerText = "Add to group";
    btn.classList.remove("btn-danger");
    btn.classList.add("btn-outline-secondary");
    return;
  }

  if (cart.length >= 7) {
    alert("tumi 7tar besi mod khaite parba na pore moira jaba!");
    return;
  }

  cart.push({ id, name, img });
  updateCartUI();

  const btn = document.getElementById(`btn-${id}`);
  btn.innerText = "Already Added";
  btn.classList.remove("btn-outline-secondary");
  btn.classList.add("btn-danger");
};


const updateCartUI = () => {
  const cartDiv = document.querySelector(".cart");
  
  cartDiv.classList.remove("d-none");

  if (cart.length === 0) {
    cartDiv.innerHTML = `
      <div class="cart-box text-center mb-3">
          <h4>Total Cart: 0</h4>
      </div>
    `;
    return;
  }

  cartDiv.innerHTML = `
    <div class="cart-box text-center mb-3">
        <h4>Total Cart: ${cart.length}</h4>
    </div>

    <table class="table cart-table">
      <tbody>
        ${cart.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td><img src="${item.img}" width="45"></td>
            <td>${item.name}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
};
updateCartUI();
const findDrink = async () => {
  const input = document.querySelector(".input-value");
  const query = input.value.trim();
  const msg = document.getElementById("notFoundMsg");

  msg.innerText = "";

  if (!query) {
    allDrink();
    return;
  }

  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (data.drinks) {
      displayData(data.drinks);
    } else {
      document.querySelector(".drinks").innerHTML = "";
      msg.textContent = "Drink not found!";
    }

    input.value = "";

  } catch (error) {
    console.log(error);
  }
};


document.querySelector(".input-value").addEventListener("keypress", (e) => {
  if (e.key === "Enter") 
    findDrink();
});



