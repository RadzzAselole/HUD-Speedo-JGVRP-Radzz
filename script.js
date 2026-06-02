let elements = {};
let speedMode = 0;
let indicators = 0;
let currentGear = 0;
let currentRawSpeed = 0;

const onOrOff = state => state ? 'On' : 'Off';

/**
 * Updates the display of the engine state.
 *
 * @param {boolean} state If true, the engine is on; otherwise, it is off.
 * @description Sets the engine state display based on the provided boolean state.
 */
function setEngine(state) {
    elements.engine.classList.toggle('active-yellow', state);
}

/**
 * Updates the speed display based on the current speed mode.
 * @param {number} speed - The speed value in meters per second (m/s).
 * @description Converts the speed value to the current speed mode and updates the display.
 */
function setSpeed(speed) {
    currentRawSpeed = speed;

    let speedValue, unitText;

    if (currentGear == 0) {
        updateGearDisplay();
    }

    switch(speedMode)
    {
        case 1: speedValue = `${Math.round(speed * 2.236936)}`; unitText = 'MPH'; break; // MPH
        case 2: speedValue = `${Math.round(speed * 1.943844)}`; unitText = 'Knots'; break; // Knots
        default: speedValue = `${Math.round(speed * 3.6)}`; unitText = 'KMH'; // KMH
    }
    if (speedValue > 999) speedValue = '999';  

    let speedString = String(speedValue).padStart(3, '0');

    if (elements.speedDigits.length === 3) {
        elements.speedDigits[0].innerText = speedString[0];
        elements.speedDigits[1].innerText = speedString[1];
        elements.speedDigits[2].innerText = speedString[2];
    }

    elements.speed.innerText = speedValue;
    elements.speedUnit.innerText = unitText;
}

/**
 * Updates the RPM (Revolutions Per Minute) display.
 * @param {number} rpm - The RPM value to display. (0 to 1).
 */
function setRPM(rpm) {
    elements.rpm.innerText = Math.round(rpm * 10000)    ;
}

/**
 * Updates the fuel level display as a percentage.
 * @param {number} fuel - The fuel level (0 to 1).
 */
function setFuel(fuel) {
    elements.fuel.innerText = `${Math.round(fuel * 100)}%`;
}

/**
 * Updates the vehicle health display as a percentage.
 * @param {number} health - The vehicle health level (0 to 1).
 */
function setHealth(health) {
    elements.health.innerText = `${Math.round(health * 100)}%`;
}

/**
 * Updates the current gear display.
 * @param {number} gear - The current gear to display. 0 represents neutral/reverse.
 */
function setGear(gear) {
    currentGear = gear;
    updateGearDisplay();
}

/**
 * Updates the gear display based on the current gear value.
 */
function updateGearDisplay() {
    if (currentGear === 0) {
        if (currentRawSpeed > 0.5) {
            elements.gear.innerText = 'R';
        } else {
            elements.gear.innerText = 'N';
        }
    } else {
        elements.gear.innerText = String(currentGear);
    }
}

/**
 * Updates the headlights status display.
 * @param {number} state - The headlight state (0: Off, 1: On, 2: High Beam).
 */
function setHeadlights(state) {
    switch(state)
    {
        case 1: elements.headlights.classList.toggle('active-yellow', true); break;
        case 2: elements.headlights.classList.toggle('active-blue', true); break;
        default: elements.headlights.classList.remove('active-yellow', 'active-blue');
    }
}

/**
 * Sets the state of the left turn indicator and updates the display.
 * @param {boolean} state - If true, turns the left indicator on; otherwise, turns it off.
 */
function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    elements.indicators.classList.toggle('active-yellow', indicators & 0b01);
}

/**
 * Sets the state of the right turn indicator and updates the display.
 * @param {boolean} state - If true, turns the right indicator on; otherwise, turns it off.
 */
function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    elements.indicators.classList.toggle('active-yellow', indicators & 0b10);
}

/**
 * Updates the seatbelt status display.
 * @param {boolean} state - If true, indicates seatbelts are fastened; otherwise, indicates they are not.
 */
function setSeatbelts(state) {
    elements.seatbelts.classList.toggle('active-yellow', state);
}

/**
 * Sets the speed display mode and updates the speed unit display.
 * @param {number} mode - The speed mode to set (0: KMH, 1: MPH, 2: Knots).
 */
function setSpeedMode(mode) {
    speedMode = mode;
}

/**
 * Updates the odometer display.
 * @param {number} distance - The distance in miles.
 */
function setOdometer(distance)
{
    elements.odometer.innerText = distance.toFixed(1) + ' Miles';
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    elements = {
        engine: document.getElementById('engine'),

        speedDigits: document.querySelectorAll('#speed-digits-container .digit'),
        speedUnit: document.getElementById('speed-unit'),

        rpm: document.getElementById('rpm'),
        fuel: document.getElementById('fuel'),
        health: document.getElementById('health'),
        gear: document.getElementById('gear'),
        headlights: document.getElementById('headlights'),
        indicators: document.getElementById('indicators'), // Assuming both indicators share the same element for simplicity
        seatbelts: document.getElementById('seatbelts'),
        odometer: document.getElementById('odometer'),
    };
});
