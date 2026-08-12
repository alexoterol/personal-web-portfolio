const serviceId = 'service_a12gpbs';
const templateId = 'template_nmzglff';
// EmailJS public key: safe to ship client-side by design, but only if
// "Allowed origins" is locked to this domain in the EmailJS dashboard.
const publicKey = 'sDziwdQK5i8m2E_Aw';

emailjs.init(publicKey);

const frmEmail = document.getElementById('contactForm');
frmEmail.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío predeterminado del formulario.

    // Realiza tus validaciones aquí.
    const isValid = validateForm();

    if (isValid) {
        sendEmail(); // Llama a la función sendEmail solo si las validaciones son exitosas.
    } else {
        console.log('El formulario no pasó las validaciones.');
        alert('Por favor, corrige los errores antes de enviar.');
    }
});

function validateForm() {
    // Ejemplo de validación simple.
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    if (!emailField.value || !messageField.value) {
        return false; // Indica que el formulario no es válido.
    }

    // Validación adicional para el formato del correo.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return false;
    }

    return true; // Todo está en orden, formulario válido.
}

function sendEmail() {
    emailjs
        .sendForm(serviceId, templateId, frmEmail, publicKey)
        .then((result) => {
            Swal.fire('Your message has been sent successfully.');
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error', // Asegúrate de usar minúsculas aquí.
                title: 'Oops...',
                text: 'The message has not been sent.'
            });
        });
}
