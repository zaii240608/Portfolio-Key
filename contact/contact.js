const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const form = document.getElementById('zine-form');

if (!form) {
  console.error('Contact form not found.');
} else {
  const isConfigured =
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

  if (!isConfigured) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('EmailJS belum dikonfigurasi. Isi public key, service ID, dan template ID di contact.js dulu.');
    });
  } else {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitButton = form.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'SENDING...';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(() => {
          alert('Message sent successfully! I\'ll get back to you as soon as possible.');
          form.reset();
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          alert('Failed to send message. Please try again later. Sorry for the inconvenience.');
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        });
    });
  }
}