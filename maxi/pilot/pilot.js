(function () {
	"use strict";

	var params = new URLSearchParams(window.location.search);
	var requestedSource = params.get("source") || "direct";
	var source = requestedSource.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "direct";
	var sourceInput = document.getElementById("pilot-source");
	var form = document.querySelector(".pilot-form");

	if (sourceInput) {
		sourceInput.value = source;
	}

	if (form) {
		form.addEventListener("submit", function (event) {
			var endpoint = form.getAttribute("data-ajax-endpoint");
			var button = form.querySelector("button[type='submit']");
			var status = form.querySelector(".pilot-status");

			if (!window.fetch || !endpoint) {
				return;
			}

			event.preventDefault();

			var data = {};
			new FormData(form).forEach(function (value, key) {
				data[key] = value;
			});

			button.disabled = true;
			button.textContent = "Sending…";
			status.textContent = "";

			window.fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(function (response) {
					if (!response.ok) {
						throw new Error("Submission failed");
					}
					return response.json();
				})
				.then(function (result) {
					if (result.success === false || result.success === "false") {
						throw new Error("Submission failed");
					}
					window.location.href = "thanks.html?source=" + encodeURIComponent(source);
				})
				.catch(function () {
					button.disabled = false;
					button.textContent = "Try again";
					status.textContent = "We could not send your information just now. Please try again in a moment.";
				});
		});
	}
}());
