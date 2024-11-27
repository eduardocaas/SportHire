var acc = document.getElementsByClassName("accordion");
var i;

// Acessando o botão com a classe "accordion-last" (último item)
var lastAccordion = document.querySelector(".accordion-last");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Fecha todos os outros painéis antes de abrir o atual
    for (var j = 0; j < acc.length; j++) {
      var panel = acc[j].nextElementSibling;
      if (panel !== this.nextElementSibling) {
        panel.style.maxHeight = null;  // Fecha o painel
        acc[j].classList.remove("active");  // Remove a classe 'active' dos outros botões
        // Se o item não for o último, garantimos que ele tenha a classe com bordas
        if (acc[j] === lastAccordion) {
          acc[j].classList.add("accordion-last");
        }
      }
    }

    // Alterna o painel clicado
    this.classList.toggle("active");
    var currentPanel = this.nextElementSibling;

    if (currentPanel.style.maxHeight) {
      currentPanel.style.maxHeight = null;  // Fecha o painel atual
    } else {
      currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";  // Abre o painel atual      

      // Se o item clicado for o último, removemos as bordas inferiores
      if (this === lastAccordion) {
        this.classList.remove("accordion-last");  // Remove as bordas quando o painel é aberto
      }
    }

    // Restaurar a classe "accordion-last" quando o painel for fechado
    if (!currentPanel.style.maxHeight) {
      if (this === lastAccordion) {
        this.classList.add("accordion-last");  // Restaura as bordas
      }
    }
  });
}