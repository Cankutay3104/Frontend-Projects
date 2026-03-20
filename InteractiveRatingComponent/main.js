const ratingState = document.getElementById("rating-state");
const thankYouState = document.getElementById("thank-you-state");

const submitButton = document.querySelector('button[type="submit"]');
const ratingDisplay = document.getElementById("selected-rating");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const checked = document.querySelector('input[name="star"]:checked');
    if (checked) {
        const star = checked.value;
        ratingDisplay.textContent = star;
        ratingState.classList.add("hidden");
        thankYouState.classList.remove("hidden");
    } else {
        alert("Please choose a rating before submitting.");
    }
});
