// Update the totals and percentages
function updateTotals() {
    totalUnder18s = 0;
    totalAdults = 0;

    // Sum under 18s and adults from table rows
    const rows = document.querySelectorAll("#businessPlanningTable tbody tr");
    rows.forEach(row => {
        const under18sInput = row.querySelector(".under18s");
        const adultsInput = row.querySelector(".adults");

        const under18s = parseInt(under18sInput.value) || 0;
        const adults = parseInt(adultsInput.value) || 0;

        totalUnder18s += under18s;
        totalAdults += adults;
    });

    // Update total summary cards
    document.getElementById("totalUnder18s").textContent = totalUnder18s;
    document.getElementById("totalAdults").textContent = totalAdults;

    // Calculate planned percentages
    const under18sPlannedPercentage =
        under18sTarget > 0 ? ((totalUnder18s / under18sTarget) * 100).toFixed(2) + "%" : "N/A";
    const adultsPlannedPercentage =
        adultsTarget > 0 ? ((totalAdults / adultsTarget) * 100).toFixed(2) + "%" : "N/A";

    // Update planned percentage summary cards
    document.getElementById("under18sPlannedPercentage").textContent = under18sPlannedPercentage;
    document.getElementById("adultsPlannedPercentage").textContent = adultsPlannedPercentage;
}

// Update target values from input boxes
function updateTargets() {
    under18sTarget = parseInt(document.getElementById('targetUnder18s').value) || 0;
    adultsTarget = parseInt(document.getElementById('targetAdults').value) || 0;

    updateTotals(); // Recalculate totals
}

// Add rows to business planning table
function addRow() {
    const tableBody = document.querySelector("#businessPlanningTable tbody");

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" placeholder="Course ID"></td>
        <td><input type="text" placeholder="Course Title"></td>
        <td><input class="under18s" type="number" min="0" value="0" onchange="updateTotals()"></td>
        <td><input class="adults" type="number" min="0" value="0" onchange="updateTotals()"></td>
        <td><button onclick="deleteRow(this)"><img src="images/delete.svg"></button></td>
    `;
    tableBody.appendChild(newRow);
}

// Delete rows from business planning table
function deleteRow(button) {
    button.parentElement.parentElement.remove();

    // Recalculate totals
    updateTotals();
}

// Add event listeners for target input boxes
function getTargets() {
    document.getElementById('targetUnder18s').addEventListener("input", updateTargets);
    document.getElementById('targetAdults').addEventListener("input", updateTargets);
}

document.addEventListener("DOMContentLoaded", () => {
    getTargets();
});

module.exports = { updateTotals, updateTargets, addRow, deleteRow, getTargets };