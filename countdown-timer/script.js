let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
	// clear any existing timers before start any new timer
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it
		if (secondsLeft <= 0) {
			clearInterval(countdown);
			return;
		}
		// display it
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSecondes = seconds % 60;
	const display = `${minutes < 10 ? "0" : ""}${minutes}:${
		remainderSecondes < 10 ? "0" : ""
	}${remainderSecondes}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${
		adjustedHour < 10 ? "0" : ""
	}${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const minutes = this.minutes.value;
	this.reset();
	timer(minutes * 60);
});
