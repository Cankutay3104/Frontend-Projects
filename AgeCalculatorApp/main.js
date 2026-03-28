const form = document.querySelector("form");

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const errorDay = document.querySelector(".day-error");
const errorMonth = document.querySelector(".month-error");
const errorYear = document.querySelector(".year-error");

const displayDay = document.querySelector(".js-day");
const displayMonth = document.querySelector(".js-month");
const displayYear = document.querySelector(".js-year");

function animateNumber(element, finalValue, duration) {
    let startTime = null;

    if (finalValue === 0) {
        element.textContent = "0";
        return;
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;

        const percentage = Math.min(progress / duration, 1);

        const currentValue = Math.floor(percentage * finalValue);

        element.textContent = currentValue;

        if (percentage < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    errorDay.textContent = "";
    errorMonth.textContent = "";
    errorYear.textContent = "";

    let isValid = true;

    const d = Number(inputDay.value);
    const m = Number(inputMonth.value);
    const y = Number(inputYear.value);

    if (!inputDay.value) {
        errorDay.textContent = "This field is required";
        isValid = false;
    }
    if (!inputMonth.value) {
        errorMonth.textContent = "This field is required";
        isValid = false;
    }
    if (!inputYear.value) {
        errorYear.textContent = "This field is required";
        isValid = false;
    }
    if (!isValid) return;

    const currentYear = new Date().getFullYear();
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
    const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

    if (m < 1 || m > 12) {
        errorMonth.textContent = "Must be a valid month";
        isValid = false;
    }

    if (y > currentYear) {
        errorYear.textContent = "Must be in the past";
        isValid = false;
    }

    if (d < 1 || d > 31) {
        errorDay.textContent = "Must be a valid day";
        isValid = false;
    } else if (m === 2) {
        // February special case
        if (isLeapYear && d > 29) {
            errorDay.textContent = "Must be a valid day";
            isValid = false;
        } else if (!isLeapYear && d > 28) {
            errorDay.textContent = "Must be a valid day";
            isValid = false;
        }
    } else if (!monthsWith31Days.includes(m) && d > 30) {
        errorDay.textContent = "Must be a valid day";
        isValid = false;
    }

    if (isValid) {
        const inpDate = new Date(y, m - 1, d);
        const now = new Date();
        if (inpDate > now) {
            errorYear.textContent = "Must be in the past";
            isValid = false;
            return;
        }

        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let todayDay = now.getDate();

        if (todayDay < d) {
            const daysInPrevMonth = new Date(todayYear, todayMonth - 1, 0).getDate();
            todayDay += daysInPrevMonth;
            todayMonth -= 1;
        }

        if (todayMonth < m) {
            todayMonth += 12;
            todayYear -= 1;
        }

        const answerDays = todayDay - d;
        const answerMonths = todayMonth - m;
        const answerYears = todayYear - y;

        animateNumber(displayDay, answerDays, 750);
        animateNumber(displayMonth, answerMonths, 500);
        animateNumber(displayYear, answerYears, 1000);
    }
});
