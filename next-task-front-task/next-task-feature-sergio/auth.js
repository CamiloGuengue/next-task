
// SIGN UP FORM HANDLER - Complete registration flow

const signupForm = document.getElementById('signup-form');

if (signupForm) {
    // Get error and success message elements
    const signupError = document.getElementById('signup-error');
    const signupSuccess = document.getElementById('signup-success');

    // Listen for form submission event
    signupForm.addEventListener('submit', function(e) {
        // Prevent default form submission (page reload)
        e.preventDefault();

        // Extract form input values and trim whitespace
        const name = document.getElementById('signup-name').value.trim();
        // Convert email to lowercase to ensure consistency
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        // Hide any previous validation messages
        signupError.classList.add('d-none');
        signupSuccess.classList.add('d-none');

        // Validation 1: Ensure all required fields are filled
        if (!name || !email || !password || !confirmPassword) {
            signupError.textContent = 'Please fill all fields';
            signupError.classList.remove('d-none');
            return;
        }

        // Validation 2: Verify passwords match
        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match';
            signupError.classList.remove('d-none');
            return;
        }

        // Validation 3: Ensure minimum password length
        if (password.length < 6) {
            signupError.textContent = 'Password must be at least 6 characters';
            signupError.classList.remove('d-none');
            return;
        }

        // Retrieve existing users from browser localStorage
        let users;
        try {
            users = JSON.parse(localStorage.getItem('taskflow-users')) || [];
        } catch (e) {
            console.error('localStorage corrupted:', e);
            users = [];
        }

        // Validation 4: Check if email is already registered
        if (users.find(user => user.email === email)) {
            signupError.textContent = 'Email already registered';
            signupError.classList.remove('d-none');
            return;
        }

        // Create new user object
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        // Add new user to users array
        users.push(newUser);

        // Persist updated users array to localStorage
        localStorage.setItem('taskflow-users', JSON.stringify(users));

        // Show success feedback and clear form
        signupSuccess.classList.remove('d-none');
        signupForm.reset();

        // Automatically switch to login tab after 1.5 seconds
        setTimeout(() => {
            const loginTabTrigger = document.getElementById('login-tab');
            if (loginTabTrigger) {
                const loginTab = new bootstrap.Tab(loginTabTrigger);
                loginTab.show();
                // Pre-fill email for better UX
                document.getElementById('login-email').value = email;
            }
            signupSuccess.classList.add('d-none');
        }, 1500);
    });
}


// LOGIN FORM HANDLER - User authentication

const loginForm = document.getElementById('login-form');

if (loginForm) {
    const loginError = document.getElementById('login-error');

    // Listen for login form submission
    loginForm.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();

        // Extract credentials from form
        // Convert to lowercase to match stored data
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;

        // Clear previous error messages
        loginError.classList.add('d-none');

        // Basic validation: required fields
        if (!email || !password) {
            loginError.textContent = 'Please enter email and password';
            loginError.classList.remove('d-none');
            return;
        }

        // Load users from localStorage
        let users;
        try {
            users = JSON.parse(localStorage.getItem('taskflow-users')) || [];
        } catch (e) {
            console.error('localStorage error:', e);
            users = [];
        }

        // Search for user with matching credentials
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // LOGIN SUCCESSFUL
            // Store current user session
            localStorage.setItem('taskflow-current-user', JSON.stringify(user));
            
            // Redirect to main app
            window.location.href = 'indexTask.html';  //aca se cambia la pagina despues de iniciar sesion 
            
        } else {
            // LOGIN FAILED - Invalid credentials
            loginError.textContent = 'Invalid email or password';
            
            // Helpful message if no users exist yet
            if (users.length === 0) {
                loginError.textContent = 'No users found. Please Sign Up first.';
            }
            
            loginError.classList.remove('d-none');
        }
    });
}