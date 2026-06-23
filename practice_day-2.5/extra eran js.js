const mealsDetails = (title, image, desc) => {
    const oldModal = document.querySelector(".custom-modal-overlay");
    if (oldModal) oldModal.remove();

    const overlay = document.createElement("div");
    overlay.classList.add("custom-modal-overlay");

    const modalBox = document.createElement("div");
    modalBox.classList.add("custom-modal");

    modalBox.innerHTML = `
        <button class="close-btn">&times;</button>
        <h3 class="text-center">${title}</h3>
        <img src="${image}" alt="${title}" class="img-fluid rounded d-block mx-auto my-3">
        <p>${desc}</p>
    `;

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    modalBox.querySelector(".close-btn").addEventListener("click", () => {
        overlay.remove();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
};

/* 
/* Modal overlay */
// .custom-modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0,0,0,0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 9999;
// }

/* Modal box */
// .custom-modal {
//     background-color: #fff;
//     border-radius: 10px;
//     max-width: 700px;
//     width: 90%;
//     padding: 20px;
//     position: relative;
//     box-shadow: 0 5px 20px rgba(0,0,0,0.3);
// }

/* Close button */
// .custom-modal .close-btn {
//     position: absolute;
//     top: 10px;
//     right: 15px;
//     font-size: 22px;
//     border: none;
//     background: none;
//     cursor: pointer;
// }


