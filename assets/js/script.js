const header = document.querySelector("header");

window.addEventListener ("scroll", function () {
header.classList.toggle ("sticky", window.scrollY > 200)
})


let menu = document.querySelector ('#menu-icon');
let navlist= document.querySelector ('.navlist');

menu.onclick = () => {
    menu.classList.toggle ('bx-x');
    navlist.classList.toggle ('open');
}

window.onscroll = () => {
    menu.classList.remove ('bx-x');
    navlist.classList.remove ('open');
}

const sr = ScrollReveal ({
    distance: '40px',
    duration: 2050,
    delay: 200,
    reset: true
})

sr.reveal('.hero-text', {origin: 'top'});
sr.reveal('.box, .about-text', {origin: 'bottom'});
sr.reveal('.about-text, .title, .contact-form h2', {origin: 'top'});
sr.reveal('.contact-form', {origin: 'left'});
sr.reveal('.hero-cv-text, .portfolio-cv-text', {origin: 'top'});
sr.reveal('.about-cv-text', {origin: 'bottom'});
sr.reveal('.hero-project-text, .portfolio-project-text', {origin: 'top'});
sr.reveal('.about-project-text', {origin: 'bottom'});

//GALLERY PHOTO

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener ("mousedown", (e) => {
        const startX = e.clientX; 
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; 

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition; 
        }

        const handleMouseUp = () => {
            document.removeEventListener ("mousemove", handleMouseMove);
            document.removeEventListener ("mouseup", handleMouseUp);
        }

        document.addEventListener ("mousemove", handleMouseMove);
        document.addEventListener ("mouseup", handleMouseUp);
    })

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"})
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }


    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`; 
    }


    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}


window.addEventListener('load', initSlider);

//CONTACT FORM EMAILJS
document.getElementById('btn').addEventListener('click', SendMail);

   // Aggiungi event listener per rimuovere gli errori al click su qualsiasi parte della pagina
   document.addEventListener('click', function() {
    removeErrors();
});



// Aggiungi event listener per la validazione durante la digitazione
document.getElementById('yourName').addEventListener('input', validateName);
document.getElementById('email_id').addEventListener('input', validateEmail);
document.getElementById('message').addEventListener('input', validateMessage);

function validateName() {
    var nameField = document.getElementById('yourName');
    var nameError = document.getElementById('yourNameError');
    var nameValue = nameField.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Il campo nome è obbligatorio.";
        nameField.classList.add('invalid');
    } else if (nameValue.length < 3) {
        nameError.textContent = "Il nome deve contenere almeno 3 caratteri.";
        nameField.classList.add('invalid');
    } else {
        nameError.textContent = "";
        nameField.classList.remove('invalid');
    }
}

function validateEmail() {
    var emailField = document.getElementById('email_id');
    var emailError = document.getElementById('emailError');
    var emailValue = emailField.value.trim();

    if (emailValue === "") {
        emailError.textContent = "Il campo email è obbligatorio.";
        emailField.classList.add('invalid');
    } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "L'indirizzo email non è valido.";
        emailField.classList.add('invalid');
    } else {
        emailError.textContent = "";
        emailField.classList.remove('invalid');
    }
}

function validateMessage() {
    var messageField = document.getElementById('message');
    var messageError = document.getElementById('messageError');
    var messageValue = messageField.value.trim();

    if (messageValue === "") {
        messageError.textContent = "Il campo messaggio è obbligatorio.";
        messageField.classList.add('invalid');
    } else {
        messageError.textContent = "";
        messageField.classList.remove('invalid');
    }
}

function SendMail() {
    (function() {
        emailjs.init("whq-QrWdL5QVlPrWb");
    })();

    var nameField = document.getElementById('yourName');
    var emailField = document.getElementById('email_id');
    var messageField = document.getElementById('message');

    var nameError = document.getElementById('yourNameError');
    var emailError = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');

    var name = nameField.value.trim();
    var email = emailField.value.trim();
    var message = messageField.value.trim();

    var isFormValid = true;


    // Reset dei messaggi di errore e delle classi invalid
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameField.classList.remove('invalid');
    emailField.classList.remove('invalid');
    messageField.classList.remove('invalid');

    // Controllo del nome
    if (name === "") {
        nameError.textContent = "Il campo nome è obbligatorio.";
        nameField.classList.add('invalid');
        isFormValid = false;
    } else if (name.length < 3) {
        nameError.textContent = "Il nome deve contenere almeno 3 caratteri.";
        nameField.classList.add('invalid');
        isFormValid = false;
    }

    // Controllo dell'email
    if (email === "") {
        emailError.textContent = "Il campo email è obbligatorio.";
        emailField.classList.add('invalid');
        isFormValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "L'indirizzo email non è valido.";
        emailField.classList.add('invalid');
        isFormValid = false;
    }

    // Controllo del messaggio
    if (message === "") {
        messageError.textContent = "Il campo messaggio è obbligatorio.";
        messageField.classList.add('invalid');
        isFormValid = false;
    }

    // Interrompi l'invio se il form non è valido
    if (!isFormValid) {
        return;
    }

    // Parametri per EmailJS
    var params = {
        from_name: name,
        email_id: email,
        message: message
    };

    var submitButton = document.getElementById('btn');
    var originalButtonText = submitButton.textContent; // Salva il testo originale del pulsante

    emailjs.send("service_ta250tj", "template_2887edg", params)
        .then(function (res) {
            console.log("Email inviata con successo! Stato:", res.status);
            submitButton.textContent = "Inviato!"; // Aggiorna il testo del pulsante
            submitButton.classList.add("success");

            // Ripristina il testo originale del pulsante dopo 3 secondi
            setTimeout(function() {
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove("success");
            }, 3000);

            document.getElementById('contactForm').reset(); // Resetta il form
            nameField.classList.remove('invalid');
            emailField.classList.remove('invalid');
            messageField.classList.remove('invalid');
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
        })
        .catch(function (err) {
            console.error("Errore durante l'invio dell'email:", err);
            submitButton.textContent = "Errore!"; // Aggiorna il testo del pulsante con un messaggio di errore
            submitButton.classList.add("error");

            // Ripristina il testo originale del pulsante dopo 3 secondi
            setTimeout(function() {
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove("error");
            }, 3000);
        });
}

// Funzione per validare l'email
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}