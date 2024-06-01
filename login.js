// JavaScript for handling form interactions and OTP verification
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginInput = document.getElementById('loginInput');
    const otpInput = document.getElementById('otpInput');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Enable the "Send OTP" button when there is input in the login input
    loginInput.addEventListener('input', () => {
        sendOtpBtn.disabled = loginInput.value.trim() === '';
    });

    // Handle the "Send OTP" button click
    sendOtpBtn.addEventListener('click', () => {
        const loginValue = loginInput.value.trim();
        if (loginValue) {
            requestOTP(loginValue);
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginValue = loginInput.value.trim();
        const otpValue = otpInput.value.trim();

        if (!loginValue) {
            alert('Please enter your phone number or Gmail.');
            return;
        }

        if (!otpValue) {
            alert('Please enter the OTP.');
            return;
        }

        // Send the form data to the server for verification
        verifyLogin(loginValue, otpValue);
    });

    // Function to request OTP from the server
    function requestOTP(loginValue) {
        // Simulate an API request to the server to request an OTP
        // This should be replaced with an actual API call to your server
        console.log(`Requesting OTP for ${loginValue}`);
        
        // Simulate successful OTP request
        setTimeout(() => {
            console.log('OTP sent to the user');
            otpInput.disabled = false; // Enable OTP input
            submitBtn.disabled = false; // Enable submit button
        }, 1000);
    }

    // Function to verify login with OTP
    function verifyLogin(loginValue, otpValue) {
        // Simulate an API request to verify the login and OTP
        // This should be replaced with an actual API call to your server
        console.log(`Verifying login for ${loginValue} with OTP: ${otpValue}`);
        
        // Simulate successful verification
        setTimeout(() => {
            console.log('Login successful');
            alert('Login successful!');
            // index.js
            var isValidLogin = true; // Assuming login is valid for demonstration

            if (isValidLogin) {
                // Redirect to index.html
                window.location.href = "index.html";
            }
        }, 1000);
    }
});
