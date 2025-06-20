  // use astro:page-load event if you are using View Transitions

  document.addEventListener("DOMContentLoaded", () => {
  
      const form = document.getElementById("form");
      const result = document.getElementById("result");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.classList.add("was-validated");
        if (!form.checkValidity()) {
          form.querySelectorAll(":invalid")[0].focus();
          return;
        }
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Enviando...";

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        })
          .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              result.classList.add("text-succesfull");
              result.innerHTML = "Tu correo ha sido enviado, me pondré en contacto contigo en cuanto pueda.";
            } else {
              console.log(response);
              result.classList.add("text-red-500");
              result.innerHTML = json.message;
            }
          })
          .catch((error) => {
            console.log(error);
            result.innerHTML = "Hubo un error, por favor vuelve a intentar o búscame en otra de mis formas de contacto.";
          })
          .then(function () {
            form.reset();
            form.classList.remove("was-validated");
            setTimeout(() => {
              result.style.display = "none";
            }, 5000);
          });
      });
    },
    { once: true },
  );