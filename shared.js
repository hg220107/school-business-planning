function setTargets() {
    // Sets student targets in session storage
    try {
        // Retrieve student targets
        let under18sTarget = parseInt(document.getElementById("under18sTarget").value);
        let adultsTarget = parseInt(document.getElementById("adultsTarget").value);
        // Check if the student targets are positive numbers
        if (under18sTarget < 0 || isNaN(under18sTarget) ||
            adultsTarget < 0 || isNaN(adultsTarget)) {
            throw new Error("Please enter positive numbers for student targets");
        }
        // Store target values in session storage if correct
        sessionStorage.setItem('under18sTarget', under18sTarget);
        sessionStorage.setItem('adultsTarget', adultsTarget);
    }
    // Throw error if invalid targets submitted
    catch (error) {
        alert(error.message);
    }
}

function getTargets() {
    // Retrieve student targets from session storage
    let under18sTarget = sessionStorage.getItem('under18sTarget')
    let adultsTarget = sessionStorage.getItem('adultsTarget');
    return {
        under18sTarget: under18sTarget,
        adultsTarget: adultsTarget
    };
}