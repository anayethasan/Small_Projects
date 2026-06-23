const allMeal = async () => {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();
    displayData(data.categories);
  } catch (error) {
    console.log(error);
  }
};

const displayData = (meals) => {
  const cardDiv = document.querySelector(".meals");
  cardDiv.innerHTML = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4");

    div.innerHTML = `
            <div class="card h-100 shadow-sm p-4">
                <img src="${meal.strCategoryThumb || meal.strMealThumb}" alt="${
      meal.strCategory || meal.strMeal
    }" class="card-img-top">
                <p class="card-text fs-5 text-center fw-bold">
                    ${meal.strCategory || meal.strMeal}
                </p>
                <button onClick="mealsDetails(
                    '${meal.strCategory || meal.strMeal}',
                    '${meal.strCategoryThumb || meal.strMealThumb}',
                    \`${meal.strCategoryDescription || meal.strInstructions}\`
                )" class="btn btn-primary w-100">
                    See More Details
                </button>
            </div>
        `;
    cardDiv.appendChild(div);
  });
};
allMeal();

const mealsDetails = (title, image, desc) => {
  const modalDiv = document.getElementById("modalContent");

  modalDiv.innerHTML = `
        <img src="${image}" class="img-fluid rounded mb-4 d-block mx-auto" alt="${title}">
        <h3>${title}</h3>
        <p>${desc}</p>
    `;

  const modal = new bootstrap.Modal(document.getElementById("mealModal"));
  modal.show();
};

const findMeal = async () => {
  const input = document.querySelector(".input-value");
  const query = input.value.trim();
  const msg = document.getElementById("notFoundMsg");

  msg.textContent = ""; 

  if (query === "") {
    allMeal();
    return;
  }

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    if (data.meals) {
      displayData(data.meals);
    } else {
      document.querySelector(".meals").innerHTML = "";
      msg.textContent = "Not found or invalid meal name!";
    }
    input.value = "";
  } catch (error) {
    console.log(error);
  }
};
// document.getElementById("button-addon2").addEventListener("click", findMeal);

document.querySelector(".input-value").addEventListener("keypress", (e) => {
  if (e.key === "Enter") findMeal();
});
