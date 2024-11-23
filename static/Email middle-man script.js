function sendData(button) {
    // Add the loading class to show the loader
    button.classList.add('loading');
    const loader = button.querySelector('.loader');
    loader.style.display = "grid"; // Show the loader
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const emailInput = document.getElementById('emailInput');
    const responseText = document.getElementById('responseText');

    if (!submitButton || !emailInput || !responseText) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    submitButton.addEventListener('click', () => {
        const emailValue = emailInput.value;

        if (!emailValue) {
            responseText.textContent = "Please enter a valid email address.";
            responseText.classList.remove("success");
            responseText.classList.add("error");
            return;
        }

        // Call the sendData function to show the loader on the button
        sendData(submitButton);

        // Clear any previous response text
        responseText.textContent = "";

        // Send the email to the backend
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputString: emailValue }), // Send email address
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            return response.json(); // Return the parsed response JSON
        })
        .then(data => {
            // Check for success and update the response text
            if (data.message) {
                responseText.textContent = `Success: ${data.message}`;
                responseText.classList.remove("error");
                responseText.classList.add("success");
                responseText.style.color = "green"; // Change text color to green on success
            }
        })
        .catch(error => {
            // Handle error case and display it
            responseText.textContent = `Error: ${error.message}`;
            responseText.classList.remove("success");
            responseText.classList.add("error");
            responseText.style.color = "red"; // Ensure error text stays red
        })
        .finally(() => {
            // Hide the loader after email sending process is complete
            submitButton.classList.remove('loading');
            const loader = submitButton.querySelector('.loader');
            loader.style.display = "none"; // Hide the loader
        });
    });
});
