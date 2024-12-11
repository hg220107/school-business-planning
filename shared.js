let under18sTarget;
let adultsTarget;

function setTargets() {
    // Sets student targets in session storage
    let under18sTarget = parseInt(document.getElementById("under18sTarget").value);
    let adultsTarget = parseInt(document.getElementById("adultsTarget").value);
    return { under18sTarget, adultsTarget };
}

module.exports = { setTargets };