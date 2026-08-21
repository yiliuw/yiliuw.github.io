(function () {
	"use strict";

	var params = new URLSearchParams(window.location.search);
	var requestedSource = params.get("source") || "direct";
	var source = requestedSource.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "direct";
	var sourceInput = document.getElementById("pilot-source");
	var nextInput = document.getElementById("pilot-next");
	var form = document.querySelector(".pilot-form");

	if (sourceInput) {
		sourceInput.value = source;
	}

	if (nextInput) {
		nextInput.value = "https://yiliuw.github.io/maxi/pilot/thanks.html?source=" + encodeURIComponent(source);
	}

	if (form) {
		form.addEventListener("submit", function () {
			var button = form.querySelector("button[type='submit']");
			if (button) {
				button.disabled = true;
				button.textContent = "Sending…";
			}
		});
	}
}());
