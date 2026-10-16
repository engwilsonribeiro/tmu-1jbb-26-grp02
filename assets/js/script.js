
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const linksMenu = document.querySelectorAll(".menu a");
const anoAtual = document.getElementById("ano");

if (menuToggle && menu) {
    // Abre e fecha o menu em telas pequenas
    menuToggle.addEventListener("click", () => {
        const estaAberto = menu.classList.toggle("aberto");

        menuToggle.setAttribute("aria-expanded", String(estaAberto));
        menuToggle.setAttribute(
            "aria-label",
            estaAberto ? "Fechar menu" : "Abrir menu"
        );

        menuToggle.innerHTML = estaAberto
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Destaca a opção selecionada
    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            linksMenu.forEach((item) => {
                item.classList.remove("ativo");
            });

            link.classList.add("ativo");

            // Fecha o menu após selecionar uma opção
            menu.classList.remove("aberto");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// Atualiza automaticamente o ano do rodapé
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}