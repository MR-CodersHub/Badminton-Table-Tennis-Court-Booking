(function () {
  'use strict';

  function showFieldError(input, message) {
    const error = document.getElementById(input.getAttribute('aria-describedby'));
    if (!error) return;
    error.textContent = message;
    error.hidden = !message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function emailMessage(input) {
    if (!input.value.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) return 'Enter a valid email address.';
    return '';
  }

  function validateRequired(input, label) {
    if (!input.value.trim()) return `Please enter your ${label}.`;
    return '';
  }

  function setStatus(element, message, state) {
    if (!element) return;
    element.textContent = message;
    element.dataset.state = state || '';
  }

  function runDemoSubmission(button, status, message) {
    const label = button.querySelector('.auth-submit-label');
    button.disabled = true;
    button.classList.add('is-loading');
    button.setAttribute('aria-busy', 'true');
    if (label) label.textContent = 'PLEASE WAIT';
    setStatus(status, '', '');

    window.setTimeout(function () {
      button.disabled = false;
      button.classList.remove('is-loading');
      button.removeAttribute('aria-busy');
      if (label) label.textContent = button.dataset.originalLabel;
      setStatus(status, message, 'success');
    }, 550);
  }

  function initPasswordToggles() {
    document.querySelectorAll('[data-password-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        const input = document.getElementById(button.dataset.passwordToggle);
        const icon = button.querySelector('i');
        if (!input) return;
        const showing = input.type === 'password';
        input.type = showing ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(showing));
        button.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
        if (icon) icon.className = showing ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      });
    });
  }

  function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const status = document.getElementById('loginStatus');
    const submit = form.querySelector('[type="submit"]');
    const resetDialog = document.getElementById('resetDialog');

    [email, password].forEach(function (input) {
      input.addEventListener('input', function () { showFieldError(input, ''); });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const emailError = emailMessage(email);
      const passwordError = validateRequired(password, 'password');
      showFieldError(email, emailError);
      showFieldError(password, passwordError);

      if (emailError || passwordError) {
        setStatus(status, 'Please check the highlighted fields.', 'error');
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }

      runDemoSubmission(submit, status, 'Demo only: no authentication backend is connected. You have not been signed in.');
    });

    document.querySelectorAll('[data-open-reset]').forEach(function (button) {
      button.addEventListener('click', function () {
        const resetStatus = document.getElementById('resetStatus');
        setStatus(resetStatus, '', '');
        if (resetDialog && !resetDialog.open) resetDialog.showModal();
      });
    });

    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
      const resetEmail = document.getElementById('resetEmail');
      resetEmail.addEventListener('input', function () { showFieldError(resetEmail, ''); });
      resetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const error = emailMessage(resetEmail);
        showFieldError(resetEmail, error);
        if (error) {
          resetEmail.focus();
          return;
        }
        runDemoSubmission(
          resetForm.querySelector('[type="submit"]'),
          document.getElementById('resetStatus'),
          'Password reset is unavailable in this demo; no email was sent.'
        );
      });
    }
  }

  function initSignup() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const phone = document.getElementById('signupPhone');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const terms = document.getElementById('signupTerms');
    const status = document.getElementById('signupStatus');
    const submit = form.querySelector('[type="submit"]');
    const fields = [name, email, phone, password, confirmPassword, terms];

    fields.forEach(function (input) {
      input.addEventListener('input', function () {
        showFieldError(input, '');
        if (input === password && confirmPassword.value) showFieldError(confirmPassword, '');
      });
      input.addEventListener('change', function () { showFieldError(input, ''); });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const errors = [
        validateRequired(name, 'full name'),
        emailMessage(email),
        validateRequired(phone, 'phone number'),
        !password.value ? 'Please enter a password.' : password.value.length < 8 ? 'Use at least 8 characters.' : '',
        !confirmPassword.value ? 'Please confirm your password.' : confirmPassword.value !== password.value ? 'Passwords do not match.' : '',
        terms.checked ? '' : 'Please accept the Terms and Privacy Policy to continue.'
      ];

      fields.forEach(function (input, index) {
        showFieldError(input, errors[index]);
      });

      const firstInvalid = fields.find(function (input, index) { return Boolean(errors[index]); });
      if (firstInvalid) {
        setStatus(status, 'Please check the highlighted fields.', 'error');
        firstInvalid.focus();
        return;
      }

      runDemoSubmission(submit, status, 'Demo only: account creation is not connected. No account was created.');
    });
  }

  function initDialogs() {
    const dialog = document.getElementById('legalDialog');
    const title = document.getElementById('legalTitle');
    const message = document.getElementById('legalMessage');
    if (!dialog || !title || !message) return;

    const legalCopy = {
      terms: {
        title: 'Terms and Conditions',
        message: 'This prototype is for demonstration only. Booking, account, and payment services are not connected, and submitting this form does not create an account.'
      },
      privacy: {
        title: 'Privacy Policy',
        message: 'This prototype does not send or store your form details. A production COURTLY account would require a published privacy policy before collecting personal information.'
      }
    };

    document.querySelectorAll('[data-legal]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        const copy = legalCopy[button.dataset.legal];
        if (!copy) return;
        title.textContent = copy.title;
        message.textContent = copy.message;
        dialog.showModal();
      });
    });
  }

  function initSocialDemoButtons() {
    document.querySelectorAll('[data-social]').forEach(function (button) {
      button.addEventListener('click', function () {
        const formStatus = document.getElementById('loginStatus') || document.getElementById('signupStatus');
        const action = document.getElementById('signupForm') ? 'sign-up' : 'sign-in';
        setStatus(formStatus, `${button.dataset.social} ${action} is a visual demo; no provider is connected.`, '');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.auth-submit-label').forEach(function (label) {
      label.closest('.auth-submit').dataset.originalLabel = label.textContent;
    });
    initPasswordToggles();
    initLogin();
    initSignup();
    initDialogs();
    initSocialDemoButtons();
  });
}());
