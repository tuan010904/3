const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const from = document.querySelector('#signup');

const checkUsername = () => {
    let valid = false;

    const min = 3,
        max = 25;
    
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    }else if (!isBetween(username.length,min,max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    }else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let vaild = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    }else if(!isEmaiValid(email)){
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return  valid;
};
const checkPassword = () => {
    let valid = false;
    

    const password = passwordEl.value.trim();

    if (!isREquired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)){
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase'+
        'character, 1 uppercase characters, 1 munber, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};
const checkConfrimPassword = () => {
    let valid = false;
    // check confrim password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwourdEl.value.trim();

    if(!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    }else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};
const isEmaiValid = (email) => {
    //Regular expression (check email)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    const re = /^\w+([.-]?\w+)*@w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);

};
const isPasswordSecure = (password) => {
    //Regular expression (check password)
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value =>  value ==='' ? false : true;
const isBetween = (length , min , max) => length < min || length > max ? false : true;
const showError = (input, message) => {
    //get the from-field elelment
    const fromField = input.parentElement;
    //add the error class
    formField.classList.remmove('success');
    formField.classList.add('error');

    //show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    //get the form-field element
    const formField = input.parentElement;

    //remove the error class
    formField.classList.remmove('error');
    formField.classList.add('success');

    //hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};
form.addEventListener('submit', function(e){
    //prevent the form submitting
    e.preventDefault();

    //validate fields
    let isUsernameValid = checkUsername(),
        isEmaiValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfrimPassword();

    let isFormValid = isUsernameValid &&
        isEmaiValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    //submit to the server if the form is valid
    if(isFormValid) {

    }
});
const debounce = (fn, delay = 1) => {
    let timeoutId;
    return (...args) => {
        //cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
form.addEventListerer('input', debounce(function(e){
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
        case 'password':
            checkPassword();
            break;
        case ' confirm-password':
            checkConfrimPassword();
            break;
    }
}));