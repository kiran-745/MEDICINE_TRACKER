document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medicineForm");
  const tableBody = document.querySelector("#medicineTable tbody");

  let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

  function renderTable() {
    tableBody.innerHTML = "";
    medicines.forEach((med, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${med.name}</td>
        <td>${med.dose}</td>
        <td>${med.time}</td>
        <td class="actions">
          <button data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function saveToStorage() {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const dose = form.dose.value.trim();
    const time = form.time.value;

    if (!name || !dose || !time) {
      alert("Please fill all fields");
      return;
    }

    medicines.push({ name, dose, time });
    saveToStorage();
    renderTable();
    form.reset();
  });

  tableBody.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      medicines.splice(index, 1);
      saveToStorage();
      renderTable();
    }
  });

  renderTable();
});
