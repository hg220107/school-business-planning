const { updateTotals, updateTargets, addRow, deleteRow, getTargets } = require("./business-planning");

describe("business-planning.js functions testing", () => {
  // Setup test environment
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input id="targetUnder18s" type="number" value="0">
        <input id="targetAdults" type="number" value="0">
        <table id="businessPlanningTable">
          <tbody>
            <tr>
              <td><input class="under18s" type="number" value="0"></td>
              <td><input class="adults" type="number" value="0"></td>
            </tr>
          </tbody>
        </table>
        <div id="totalUnder18s"></div>
        <div id="totalAdults"></div>
        <div id="under18sPlannedPercentage"></div>
        <div id="adultsPlannedPercentage"></div>
      </div>
    `;

    // Get environment elements
    tableBody = document.querySelector("#businessPlanningTable tbody");
    targetUnder18sInput = document.getElementById("targetUnder18s");
    targetAdultsInput = document.getElementById("targetAdults");

    // Set initial targets
    global.under18sTarget = 4000;
    global.adultsTarget = 2000;
  });

  test("that updateTotals correctly updates total values", () => {
    // Set test values for inputs
    const under18sInput = tableBody.querySelector(".under18s");
    const adultsInput = tableBody.querySelector(".adults");
    under18sInput.value = 30;
    adultsInput.value = 10;

    // Call updateTotals
    updateTotals();

    // Check updated totals
    const totalUnder18s = document.getElementById("totalUnder18s");
    const totalAdults = document.getElementById("totalAdults");
    expect(totalUnder18s.textContent).toBe("30");
    expect(totalAdults.textContent).toBe("10");
  });

  test("that updateTotals correctly calculates planned percentages", () => {
    //Set test values for inputs
    const under18sInput = tableBody.querySelector(".under18s");
    const adultsInput = tableBody.querySelector(".adults");
    under18sInput.value = 30;
    adultsInput.value = 10;

    // Call updateTotals
    updateTotals();

    // Check planned percentages are correct
    const under18sPlannedPercentage = document.getElementById("under18sPlannedPercentage");
    const adultsPlannedPercentage = document.getElementById("adultsPlannedPercentage");
    expect(under18sPlannedPercentage.textContent).toBe("0.75%");
    expect(adultsPlannedPercentage.textContent).toBe("0.50%");
  });

  test("that updateTotals returns N/A for planned percentages when targets are 0", () => {
    // Set targets to 0
    global.under18sTarget = 0;
    global.adultsTarget = 0;

    // Set test values for inputs
    const under18sInput = tableBody.querySelector(".under18s");
    const adultsInput = tableBody.querySelector(".adults");
    under18sInput.value = 30;
    adultsInput.value = 10;

    // Call updateTotals
    updateTotals();

    // Check planned percentages are N/A
    const under18sPlannedPercentage = document.getElementById("under18sPlannedPercentage");
    const adultsPlannedPercentage = document.getElementById("adultsPlannedPercentage");
    expect(under18sPlannedPercentage.textContent).toBe("N/A");
    expect(adultsPlannedPercentage.textContent).toBe("N/A");
  });

  test("that updateTargets correctly updates from inputs", () => {
    // Set test values for inputs
    targetUnder18sInput.value = "5000";
    targetAdultsInput.value = "2500";

    // Execute input events
    targetUnder18sInput.dispatchEvent(new Event("input"));
    targetAdultsInput.dispatchEvent(new Event("input"));

    // Call updateTargets
    updateTargets();

    // Check the updated target values
    expect(global.under18sTarget).toBe(5000);
    expect(global.adultsTarget).toBe(2500);
  });

  test("that addRow adds a new row to the business planning table", () => {
    // Ensure the table starts with one row
    expect(tableBody.rows.length).toBe(1);

    // Call addRow
    addRow();

    // Check that two rows now exist
    expect(tableBody.rows.length).toBe(2);
  });

  test("that deleteRow removes a row from the business planning table", () => {
    // Add an extra row to the table
    addRow();
    // Check that two rows now exist
    expect(tableBody.rows.length).toBe(2);

    // Get the delete button for the second row
    const deleteButton = tableBody.rows[1].querySelector("button");

    // Call deleteRow with the delete button
    deleteRow(deleteButton);

    // Ensure one row exists
    expect(tableBody.rows.length).toBe(1);
  });

  test("that getTargets adds event listeners to target input boxes", () => {
    // Spy on the target input boxes for event listeners
    const addEventListenerSpy = jest.spyOn(document.getElementById('targetUnder18s'), 'addEventListener');
    const addEventListenerSpy2 = jest.spyOn(document.getElementById('targetAdults'), 'addEventListener');

    // Call getTargets to add event listeners
    getTargets();

    // Check that the event listeners were added to the target input boxes
    expect(addEventListenerSpy).toHaveBeenCalledWith("input", updateTargets);
    expect(addEventListenerSpy2).toHaveBeenCalledWith("input", updateTargets);
  });
});