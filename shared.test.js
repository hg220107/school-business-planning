const { setTargets } = require('./shared');

test('that Jest is functioning', () => {
    expect(true).toBe(true);
});

describe('setTargets', () => {
    // Simulate input boxes
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="under18sTarget" type="number" value="30">
            <input id="adultsTarget" type="number" value="0">
        `;
    });

    test('that it returns the input box values', () => {
        // Call the function
        const targets = setTargets();
        // Assert that the values match
        expect(targets.under18sTarget).toBe(30);
        expect(targets.adultsTarget).toBe(0);
    });

    test('that invalid values result in NaN', () => {
        // Simulate invalid input values
        document.getElementById("under18sTarget").value = NaN;
        document.getElementById("adultsTarget").value = "invalidValue";
        // Call the function
        const targets = setTargets();
        // Assert that the values are NaN
        expect(targets.under18sTarget).toBeNaN();
        expect(targets.adultsTarget).toBeNaN();
    });
});

