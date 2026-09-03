(function () {
    'use strict';

    const SERVICE_ID = 'service_a12gpbs';
    const TEMPLATE_ID = 'template_nmzglff';
    // EmailJS public key: safe to ship client-side by design, but only if
    // "Allowed origins" is locked to this domain in the EmailJS dashboard.
    const PUBLIC_KEY = 'sDziwdQK5i8m2E_Aw';

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = document.getElementById('contactForm');

    if (!form) {
        return;
    }

    const submitButton = document.getElementById('sendMessageButton');
    const status = document.getElementById('success');

    emailjs.init(PUBLIC_KEY);

    /** Writes a validation message into the field's help block. */
    function setFieldError(field, message) {
        const group = field.closest('.control-group');
        const helpBlock = group ? group.querySelector('.help-block') : null;

        if (helpBlock) {
            helpBlock.textContent = message;
        }

        if (message) {
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.removeAttribute('aria-invalid');
        }
    }

    function clearErrors() {
        form.querySelectorAll('.help-block').forEach((helpBlock) => {
            helpBlock.textContent = '';
        });
        form.querySelectorAll('[aria-invalid]').forEach((field) => {
            field.removeAttribute('aria-invalid');
        });
    }

    /**
     * Validates every required field and reports the problems inline.
     * Returns the first invalid field, or null when the form is valid.
     */
    function validateForm() {
        let firstInvalid = null;

        form.querySelectorAll('[required]').forEach((field) => {
            const value = field.value.trim();
            let message = '';

            if (!value) {
                message = field.dataset.validationRequiredMessage || 'This field is required.';
            } else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
                message = 'Please enter a valid email address.';
            }

            setFieldError(field, message);

            if (message && !firstInvalid) {
                firstInvalid = field;
            }
        });

        return firstInvalid;
    }

    function setBusy(isBusy) {
        if (submitButton) {
            submitButton.disabled = isBusy;
        }

        if (status) {
            status.textContent = isBusy ? 'Sending your message...' : '';
        }
    }

    function sendEmail() {
        setBusy(true);

        return emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then(() => {
                form.reset();
                clearErrors();
                Swal.fire('Your message has been sent successfully.');
            })
            .catch((error) => {
                console.error('EmailJS request failed:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The message has not been sent. Please try again later.'
                });
            })
            .finally(() => {
                setBusy(false);
            });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstInvalid = validateForm();

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        sendEmail();
    });

    // Clear a field's error as soon as the visitor starts fixing it.
    form.addEventListener('input', (event) => {
        if (event.target.hasAttribute('aria-invalid')) {
            setFieldError(event.target, '');
        }
    });
})();
