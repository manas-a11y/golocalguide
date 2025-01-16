document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    
    const apiEndpoint = "https://api.example.com/signup";

    
    const validationRules = {
        username: {
            regex: /^[a-zA-Z0-9_-]{3,15}$/,
            error: "Username must be 3-15 characters long, and can contain letters, numbers, underscores, or dashes.",
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            error: "Enter a valid email address.",
        },
        password: {
            regex: /^.{6,}$/,
            error: "Password must be at least 6 characters long.",
        },
        confirmPassword: {
            custom: () => password.value === confirmPassword.value,
            error: "Passwords do not match.",
        },
    };

    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.opacity = 1;
        input.classList.add("invalid");
    };


    const clearError = (input) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = "";
        errorElement.style.opacity = 0;
        input.classList.remove("invalid");
    };

 
    const validateField = (input) => {
        const field = validationRules[input.id];
        if (field) {
            const isValid = field.regex ? field.regex.test(input.value) : field.custom();
            if (!isValid) {
                showError(input, field.error);
                return false;
            } else {
                clearError(input);
                return true;
            }
        }
        return true;
    };

    
    signupForm.addEventListener("input", (e) => {
        if (e.target.tagName === "INPUT") validateField(e.target);
    });

   
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        
        const isFormValid = [...signupForm.elements].every((input) => validateField(input));

        if (isFormValid) {
            
            const userData = {
                username: username.value,
                email: email.value,
                password: password.value,
            };

            try {
             
                toggleLoading(true);

                
                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                
                if (response.ok) {
                    const result = await response.json();
                    alert("Sign-up successful! Welcome to TravelLocal.");
                    signupForm.reset();
                } else {
                    const error = await response.json();
                    alert(Sign-up failed: ${error.message});
                }
            } catch (error) {
                alert("An error occurred. Please try again later.");
                console.error("Error:", error);
            } finally {
                
                toggleLoading(false);
            }
        }
    });

    
    const toggleLoading = (isLoading) => {
        const submitButton = signupForm.querySelector("button[type='submit']");
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? "Signing Up..." : "Sign Up";
    };
});