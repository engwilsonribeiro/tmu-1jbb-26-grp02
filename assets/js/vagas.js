
document.addEventListener("DOMContentLoaded", () => {
    const formBusca = document.getElementById("formBusca");
    const palavraChave = document.getElementById("palavraChave");
    const areaAtuacao = document.getElementById("areaAtuacao");
    const localizacao = document.getElementById("localizacao");
    const filtroArea = document.getElementById("filtroArea");
    const ordenacao = document.getElementById("ordenacao");
    const limparFiltros = document.getElementById("limparFiltros");
    const verTodas = document.getElementById("verTodas");
    const container = document.getElementById("vagasContainer");
    const mensagemVazia = document.getElementById("mensagemVazia");

    let vagasExtrasCarregadas = false;

    // Converte texto para facilitar as comparações.
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // Adiciona vagas demonstrativas.
    function carregarMaisVagas() {
        if (vagasExtrasCarregadas) {
            return;
        }

        const vagasExtras = [
            {
                id: "assistente-recursos-humanos",
                titulo: "Assistente de Recursos Humanos",
                empresa: "Empresa Exemplo",
                local: "São Paulo, SP",
                area: "administrativo",
                tipo: "hibrido",
                nivel: "junior",
                tempo: 8
            },
            {
                id: "desenvolvedor-front-end",
                titulo: "Desenvolvedor Front-end",
                empresa: "Tech Solutions",
                local: "São José do Rio Preto, SP",
                area: "tecnologia",
                tipo: "remoto",
                nivel: "pleno",
                tempo: 10
            },
            {
                id: "estagio-marketing",
                titulo: "Estágio em Marketing",
                empresa: "Criativa Digital",
                local: "Bauru, SP",
                area: "marketing",
                tipo: "presencial",
                nivel: "estagio",
                tempo: 12
            },
            {
                id: "designer-grafico",
                titulo: "Designer Gráfico",
                empresa: "Studio Criativo",
                local: "São Paulo, SP",
                area: "design",
                tipo: "remoto",
                nivel: "junior",
                tempo: 15
            }
        ];

        vagasExtras.forEach((vaga) => {
            const artigo = document.createElement("article");
            artigo.className = "vaga";
            artigo.dataset.vagaExtra = "true";

            artigo.dataset.titulo = vaga.titulo;
            artigo.dataset.id = vaga.id;
            artigo.dataset.empresa = vaga.empresa;
            artigo.dataset.local = vaga.local;
            artigo.dataset.area = vaga.area;
            artigo.dataset.tipo = vaga.tipo;
            artigo.dataset.nivel = vaga.nivel;
            artigo.dataset.tempo = vaga.tempo;

            // Cria o cartão usando elementos HTML.
            const logo = document.createElement("div");
            logo.className = "logo-empresa";
            logo.textContent = "HM";
            logo.style.fontWeight = "bold";
            logo.style.color = "#00a99d";

            const info = document.createElement("div");
            info.className = "vaga-info";

            const titulo = document.createElement("h3");
            titulo.textContent = vaga.titulo;

            const empresa = document.createElement("p");
            empresa.className = "empresa";
            empresa.textContent = vaga.empresa;

            const detalhes = document.createElement("p");
            detalhes.className = "detalhes";
            detalhes.textContent =
                `⌖ ${vaga.local} · ${vaga.nivel}`;

            info.append(titulo, empresa, detalhes);

            const direita = document.createElement("div");
            direita.className = "vaga-direita";

            const tempo = document.createElement("span");
            tempo.className = "tempo";
            tempo.textContent = `Publicado há ${vaga.tempo} horas`;

            const favorito = document.createElement("button");
            favorito.type = "button";
            favorito.className = "favorito";
            favorito.setAttribute("aria-label", "Salvar vaga");
            favorito.setAttribute("aria-pressed", "false");
            favorito.textContent = "♡";

            direita.append(tempo, favorito);
            artigo.append(logo, info, direita);

            const link = document.createElement("a");
            link.className = "vaga-link";
            link.href = `DetalheVaga.html?vaga=${encodeURIComponent(vaga.id)}`;
            link.setAttribute("aria-label", `Ver detalhes da vaga ${vaga.titulo}`);
            artigo.appendChild(link);

            container.appendChild(artigo);
        });

        vagasExtrasCarregadas = true;
        verTodas.textContent = "Mostrar vagas principais";
        filtrarVagas();
    }

    function mostrarVagasPrincipais() {
        container.querySelectorAll('[data-vaga-extra="true"]').forEach((vaga) => {
            vaga.remove();
        });

        vagasExtrasCarregadas = false;
        verTodas.textContent = "Ver todas as vagas";
        filtrarVagas();
    }

    // Aplica a pesquisa e os filtros selecionados.
    function filtrarVagas() {
        const busca = normalizar(palavraChave.value);
        const local = normalizar(localizacao.value);
        const areaBusca = areaAtuacao.value;
        const areaFiltro = filtroArea.value;

        const tiposSelecionados = [
            ...document.querySelectorAll('input[name="tipo"]:checked')
        ].map((input) => input.value);

        const niveisSelecionados = [
            ...document.querySelectorAll('input[name="nivel"]:checked')
        ].map((input) => input.value);

        const vagas = [...container.querySelectorAll(".vaga")];

        vagas.forEach((vaga) => {
            const titulo = normalizar(vaga.dataset.titulo);
            const empresa = normalizar(vaga.dataset.empresa);
            const cidade = normalizar(vaga.dataset.local);

            const textoEncontrado =
                !busca ||
                titulo.includes(busca) ||
                empresa.includes(busca) ||
                cidade.includes(busca);

            const localEncontrado =
                !local || cidade.includes(local);

            const areaEncontrada =
                (!areaBusca || vaga.dataset.area === areaBusca) &&
                (!areaFiltro || vaga.dataset.area === areaFiltro);

            const tipoEncontrado =
                tiposSelecionados.length === 0 ||
                tiposSelecionados.includes(vaga.dataset.tipo);

            const nivelEncontrado =
                niveisSelecionados.length === 0 ||
                niveisSelecionados.includes(vaga.dataset.nivel);

            const corresponde =
                textoEncontrado &&
                localEncontrado &&
                areaEncontrada &&
                tipoEncontrado &&
                nivelEncontrado;

            vaga.hidden = !corresponde;
        });

        // Organiza as vagas visíveis.
        const criterio = ordenacao.value;

        const vagasOrdenadas = [...vagas].sort((a, b) => {
            if (criterio === "antigas") {
                return Number(b.dataset.tempo) -
                    Number(a.dataset.tempo);
            }

            if (criterio === "titulo") {
                return a.dataset.titulo.localeCompare(
                    b.dataset.titulo,
                    "pt-BR"
                );
            }

            return Number(a.dataset.tempo) -
                Number(b.dataset.tempo);
        });

        vagasOrdenadas.forEach((vaga) => container.appendChild(vaga));

        const encontrouVaga = vagas.some((vaga) => !vaga.hidden);

        mensagemVazia.hidden = encontrouVaga;
    }

    // Pesquisa ao enviar o formulário.
    formBusca.addEventListener("submit", (evento) => {
        evento.preventDefault();
        filtrarVagas();
    });

    // Atualiza os resultados quando os filtros mudam.
    [
        areaAtuacao,
        filtroArea,
        ordenacao
    ].forEach((campo) => {
        campo.addEventListener("change", filtrarVagas);
    });

    document.querySelectorAll(
        'input[name="tipo"], input[name="nivel"]'
    ).forEach((campo) => {
        campo.addEventListener("change", filtrarVagas);
    });

    // Limpa todos os filtros.
    limparFiltros.addEventListener("click", () => {
        formBusca.reset();
        filtroArea.value = "";
        ordenacao.value = "recentes";

        document.querySelectorAll(
            'input[name="tipo"], input[name="nivel"]'
        ).forEach((campo) => {
            campo.checked = false;
        });

        filtrarVagas();
    });

    // Alterna entre as vagas principais e todas as oportunidades.
    verTodas.addEventListener("click", () => {
        if (vagasExtrasCarregadas) {
            mostrarVagasPrincipais();
            return;
        }

        carregarMaisVagas();
    });

    // Permite favoritar e desfavoritar vagas.
    container.addEventListener("click", (evento) => {
        const botao = evento.target.closest(".favorito");

        if (!botao) {
            return;
        }

        const salvo = botao.classList.toggle("salvo");

        botao.textContent = salvo ? "♥" : "♡";
        botao.setAttribute("aria-pressed", String(salvo));

        botao.setAttribute(
            "aria-label",
            salvo ? "Remover vaga dos favoritos" : "Salvar vaga"
        );
    });

    // Mostra resultados atualizados ao digitar.
    palavraChave.addEventListener("input", filtrarVagas);
    localizacao.addEventListener("input", filtrarVagas);
});
