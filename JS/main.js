const plantContainer = document.getElementById("plantContainer");
const searchInput = document.querySelector(".nav input");
const searchButton = document.querySelector(".nav button");

// Create modal
const body = document.body;
const modal = document.createElement("div");
modal.id = "plant-modal";
modal.style.display = "none";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <img id="modal-img" src="" alt="Plant Image" />
    <h3 id="modal-title"></h3>
    <p id="modal-desc"></p>
    <p><strong>Uses:</strong> <span id="modal-uses"></span></p>
  </div>
`;
body.appendChild(modal);

// Modal references
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalUses = document.getElementById("modal-uses");
const closeBtn = modal.querySelector(".close-btn");

// Store cards for search
let allCards = [];

// Fetch plant data from JSON
fetch("/JS/plants.json")
  .then(res => res.json())
  .then(plants => {
    plants.forEach(plant => {
      const card = document.createElement("div");
      card.className = "plant-cards";
      card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" />
        <div class="info">
          <h3>${plant.name}</h3>
          <p><strong>Uses:</strong> ${plant.uses}</p>
        </div>
      `;
      plantContainer.appendChild(card);
      allCards.push({ card, name: plant.name.toLowerCase() });

      card.addEventListener("click", () => {
        modalImg.src = plant.image;
        modalTitle.textContent = plant.name;
        modalDesc.textContent = plant.description;
        modalUses.textContent = plant.uses;
        modal.style.display = "flex";
      });
    });
  })
  .catch(err => console.error("Failed to load plant data:", err));

// Modal close handlers
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Search functionality
searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();
  allCards.forEach(({ card, name }) => {
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchButton.click();
});

// --- GET STARTED BUTTON SCROLL ---
const getStartedBtn = document.getElementById("content");
const plantSection = document.querySelector(".wrap");

getStartedBtn.addEventListener("click", () => {
  plantSection.scrollIntoView({ behavior: "smooth" });
});