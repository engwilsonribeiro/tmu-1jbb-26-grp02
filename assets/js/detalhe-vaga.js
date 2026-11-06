document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("detalheVaga");
    const idVaga = new URLSearchParams(window.location.search).get("vaga");

    const vagas = {
        "designer-ui-ux": {
            titulo: "Designer UI/UX",
            empresa: "Bispo Alimentos",
            local: "José Bonifácio, SP",
            area: "Design",
            tipo: "Híbrido",
            nivel: "Pleno",
            descricao: "Criar experiências digitais claras e intuitivas, colaborando com produto e desenvolvimento desde a descoberta até a entrega.",
            responsabilidades: [
                "Desenhar fluxos, wireframes e protótipos para produtos digitais.",
                "Planejar e conduzir testes de usabilidade e transformar os resultados em melhorias.",
                "Manter componentes e padrões visuais consistentes no design system."
            ],
            requisitos: [
                "Experiência com design de interfaces e ferramentas de prototipação, como Figma.",
                "Conhecimento de fundamentos de UX, acessibilidade e design responsivo.",
                "Portfólio com projetos de interface ou experiência do usuário."
            ]
        },
        "desenvolvedor-full-stack": {
            titulo: "Desenvolvedor(a) Full Stack",
            empresa: "Minerva Foods",
            local: "José Bonifácio, SP",
            area: "Tecnologia/TI",
            tipo: "Remoto",
            nivel: "Sênior",
            salario: "A combinar",
            publicado: "Publicado há 5 horas",
            descricao: "Estamos em busca de um(a) desenvolvedor(a) Full Stack para integrar nosso time e atuar no desenvolvimento de aplicações web modernas e escaláveis.",
            responsabilidades: [
                "Desenvolver e manter aplicações web",
                "Criar e integrar APIs",
                "Trabalhar com banco de dados",
                "Participar do planejamento e desenvolvimento de projetos",
                "Colaborar com diferentes equipes"
            ],
            requisitos: [
                "Experiência sólida com JavaScript ou TypeScript e desenvolvimento web.",
                "Conhecimento de frameworks de front-end e serviços de back-end.",
                "Experiência com APIs, bancos de dados relacionais e controle de versão."
            ],
            beneficios: [
                "Plano de saúde e odontológico.",
                "Vale-refeição e vale-alimentação.",
                "Horário flexível e trabalho remoto."
            ],
            sobreEmpresa: "A Minerva Foods é uma das líderes na produção e comercialização de carne in natura e seus derivados na América do Sul."
        },
        "analista-marketing-digital": {
            titulo: "Analista de Marketing Digital",
            empresa: "Nestlé",
            local: "Mirassol, SP",
            area: "Marketing",
            tipo: "Presencial",
            nivel: "Especialista",
            descricao: "Planejar e acompanhar iniciativas digitais para fortalecer a presença da marca e alcançar os objetivos das campanhas.",
            responsabilidades: [
                "Planejar campanhas digitais e acompanhar sua execução.",
                "Analisar indicadores e propor otimizações com base nos resultados.",
                "Coordenar calendário de conteúdo e alinhamentos com áreas parceiras."
            ],
            requisitos: [
                "Experiência em marketing digital e gestão de campanhas.",
                "Familiaridade com métricas, ferramentas de análise e relatórios.",
                "Boa comunicação e capacidade de organizar projetos com diferentes equipes."
            ]
        },
        "aprendiz-administrativo": {
            titulo: "Aprendiz Administrativo",
            empresa: "Petrobras",
            local: "Rio de Janeiro, RJ",
            area: "Administrativo",
            tipo: "Presencial",
            nivel: "Estágio",
            descricao: "Apoiar as rotinas administrativas da equipe, desenvolvendo conhecimentos profissionais em um ambiente colaborativo.",
            responsabilidades: [
                "Organizar documentos e atualizar registros e planilhas.",
                "Apoiar o atendimento e o encaminhamento de solicitações.",
                "Auxiliar a equipe em tarefas administrativas do dia a dia."
            ],
            requisitos: [
                "Ensino médio em andamento ou concluído.",
                "Conhecimentos básicos de informática e ferramentas de escritório.",
                "Organização, responsabilidade e disposição para aprender."
            ]
        },
        "assistente-recursos-humanos": {
            titulo: "Assistente de Recursos Humanos",
            empresa: "Empresa Exemplo",
            local: "São Paulo, SP",
            area: "Administrativo",
            tipo: "Híbrido",
            nivel: "Júnior",
            descricao: "Dar suporte às atividades de recursos humanos e contribuir para uma boa experiência das pessoas durante os processos internos.",
            responsabilidades: [
                "Apoiar processos de recrutamento, integração e comunicação interna.",
                "Organizar documentos e manter informações de colaboradores atualizadas.",
                "Auxiliar no atendimento de dúvidas e solicitações da equipe."
            ],
            requisitos: [
                "Conhecimentos básicos de rotinas administrativas ou de RH.",
                "Organização, discrição e boa comunicação.",
                "Conhecimento de ferramentas de escritório."
            ]
        },
        "desenvolvedor-front-end": {
            titulo: "Desenvolvedor Front-end",
            empresa: "Tech Solutions",
            local: "São José do Rio Preto, SP",
            area: "Tecnologia",
            tipo: "Remoto",
            nivel: "Pleno",
            descricao: "Construir interfaces web responsivas e acessíveis, trabalhando em parceria com design e back-end.",
            responsabilidades: [
                "Implementar telas e componentes reutilizáveis.",
                "Integrar interfaces com APIs e serviços da aplicação.",
                "Garantir qualidade visual, acessibilidade e compatibilidade entre navegadores."
            ],
            requisitos: [
                "Experiência com HTML, CSS e JavaScript.",
                "Conhecimento de um framework moderno de front-end.",
                "Familiaridade com Git, APIs REST e layout responsivo."
            ]
        },
        "estagio-marketing": {
            titulo: "Estágio em Marketing",
            empresa: "Criativa Digital",
            local: "Bauru, SP",
            area: "Marketing",
            tipo: "Presencial",
            nivel: "Estágio",
            descricao: "Apoiar a criação de conteúdo e a organização das ações de marketing da equipe.",
            responsabilidades: [
                "Ajudar a preparar publicações para canais digitais.",
                "Apoiar o calendário editorial e a organização de materiais.",
                "Pesquisar referências e acompanhar resultados das ações."
            ],
            requisitos: [
                "Estar estudando Marketing, Comunicação ou área relacionada.",
                "Boa comunicação escrita e interesse por conteúdo digital.",
                "Organização e familiaridade básica com redes sociais."
            ]
        },
        "designer-grafico": {
            titulo: "Designer Gráfico",
            empresa: "Studio Criativo",
            local: "São Paulo, SP",
            area: "Design",
            tipo: "Remoto",
            nivel: "Júnior",
            descricao: "Criar peças visuais para campanhas e canais digitais, seguindo a identidade de cada projeto.",
            responsabilidades: [
                "Desenvolver peças gráficas para redes sociais e materiais digitais.",
                "Adaptar layouts para diferentes formatos e canais.",
                "Colaborar com o time criativo na preparação e revisão de materiais."
            ],
            requisitos: [
                "Conhecimento de ferramentas de criação gráfica.",
                "Noções de tipografia, composição e identidade visual.",
                "Portfólio com trabalhos de design."
            ]
        }
    };

    const vaga = idVaga ? vagas[idVaga] : null;

    if (!vaga) {
        document.title = "Vaga não encontrada | Hire Me!";
        container.innerHTML =
            '<div class="estado-vazio"><h1>Vaga não encontrada</h1>' +
            '<p>O endereço pode estar incorreto ou a vaga não está mais disponível.</p>' +
            '<a href="Vagas.html">Voltar para a lista de vagas</a></div>';
        return;
    }

    document.title = `${vaga.titulo} | Hire Me!`;
    container.replaceChildren();

    const logos = {
        "designer-ui-ux": "assets/images/bispo.jpg",
        "desenvolvedor-full-stack": "assets/images/minerva foods.jpg",
        "analista-marketing-digital": "assets/images/nestle.png",
        "aprendiz-administrativo": "assets/images/petrobras.png"
    };

    const identificacao = document.createElement("header");
    identificacao.className = "vaga-identificacao";

    const logo = document.createElement("div");
    logo.className = "vaga-logo";
    if (logos[idVaga]) {
        const imagem = document.createElement("img");
        imagem.src = logos[idVaga];
        imagem.alt = vaga.empresa;
        logo.appendChild(imagem);
    } else {
        const iniciais = document.createElement("span");
        iniciais.className = "vaga-logo-fallback";
        iniciais.textContent = vaga.empresa.slice(0, 2).toUpperCase();
        logo.appendChild(iniciais);
    }

    const tituloContainer = document.createElement("div");
    tituloContainer.className = "vaga-titulo";
    const titulo = document.createElement("h1");
    titulo.textContent = vaga.titulo;
    const empresa = document.createElement("p");
    empresa.className = "vaga-empresa";
    empresa.textContent = vaga.empresa;

    const resumo = document.createElement("div");
    resumo.className = "vaga-resumo";
    [
        ["⌖", vaga.local],
        ["♧", vaga.nivel],
        ["◷", vaga.publicado || "Publicado recentemente"]
    ].forEach(([icone, texto]) => {
        const item = document.createElement("span");
        const iconeItem = document.createElement("span");
        iconeItem.className = "resumo-icone";
        iconeItem.setAttribute("aria-hidden", "true");
        iconeItem.textContent = icone;
        item.append(iconeItem, document.createTextNode(texto));
        resumo.appendChild(item);
    });

    tituloContainer.append(titulo, empresa, resumo);
    identificacao.append(logo, tituloContainer);

    const acoes = document.createElement("div");
    acoes.className = "vaga-acoes";
    const candidatar = document.createElement("a");
    candidatar.className = "btn-candidatar";
    candidatar.href = "entrar.html";
    candidatar.textContent = "Candidatar-se";

    const salvar = document.createElement("button");
    salvar.className = "btn-salvar";
    salvar.type = "button";
    salvar.setAttribute("aria-pressed", "false");
    salvar.textContent = "Salvar vaga";
    salvar.addEventListener("click", () => {
        const salva = salvar.getAttribute("aria-pressed") !== "true";
        salvar.setAttribute("aria-pressed", String(salva));
        salvar.textContent = salva ? "Vaga salva" : "Salvar vaga";
    });
    acoes.append(candidatar, salvar);

    const conteudo = document.createElement("div");
    conteudo.className = "vaga-conteudo";
    const abas = document.createElement("div");
    abas.className = "vaga-abas";
    abas.setAttribute("role", "tablist");
    abas.setAttribute("aria-label", "Informações da vaga");
    const painelGrid = document.createElement("div");
    painelGrid.className = "vaga-painel-grid";
    const painel = document.createElement("section");
    painel.className = "vaga-painel";
    painel.setAttribute("role", "tabpanel");
    painel.id = "painelDetalheVaga";

    const beneficios = vaga.beneficios || [
        "Ambiente colaborativo e oportunidades de desenvolvimento.",
        "Benefícios compatíveis com o mercado.",
        "Possibilidade de crescimento profissional."
    ];
    const conteudosAbas = [
        {
            nome: "Sobre a vaga",
            renderizar: () => {
                const descricao = document.createElement("p");
                descricao.className = "descricao-resumo";
                descricao.textContent = vaga.descricao;
                painel.appendChild(descricao);

                const responsabilidadesTitulo = document.createElement("h2");
                responsabilidadesTitulo.textContent = "Responsabilidades";
                painel.appendChild(responsabilidadesTitulo);

                const lista = document.createElement("ul");
                vaga.responsabilidades.forEach((texto) => {
                    const item = document.createElement("li");
                    item.textContent = texto;
                    lista.appendChild(item);
                });
                painel.appendChild(lista);

                const verMais = document.createElement("button");
                verMais.className = "vaga-mais";
                verMais.type = "button";
                verMais.setAttribute("aria-expanded", "false");
                verMais.textContent = "Ver mais";
                verMais.addEventListener("click", () => {
                    const expandido = verMais.getAttribute("aria-expanded") !== "true";
                    descricao.classList.toggle("expandida", expandido);
                    verMais.setAttribute("aria-expanded", String(expandido));
                    verMais.textContent = expandido ? "Ver menos" : "Ver mais";
                });
                painel.appendChild(verMais);
            }
        },
        {
            nome: "Requisitos",
            renderizar: () => {
                const tituloRequisitos = document.createElement("h2");
                tituloRequisitos.textContent = "Requisitos";
                painel.appendChild(tituloRequisitos);
                const lista = document.createElement("ul");
                vaga.requisitos.forEach((texto) => {
                    const item = document.createElement("li");
                    item.textContent = texto;
                    lista.appendChild(item);
                });
                painel.appendChild(lista);
            }
        },
        {
            nome: "Benefícios",
            renderizar: () => {
                const tituloBeneficios = document.createElement("h2");
                tituloBeneficios.textContent = "Benefícios";
                painel.appendChild(tituloBeneficios);
                const lista = document.createElement("ul");
                beneficios.forEach((texto) => {
                    const item = document.createElement("li");
                    item.textContent = texto;
                    lista.appendChild(item);
                });
                painel.appendChild(lista);
            }
        },
        {
            nome: "Sobre a Empresa",
            renderizar: () => {
                const tituloEmpresa = document.createElement("h2");
                tituloEmpresa.textContent = vaga.empresa;
                const descricaoEmpresa = document.createElement("p");
                descricaoEmpresa.textContent = vaga.sobreEmpresa ||
                    `Conheça as oportunidades e a cultura da ${vaga.empresa}.`;
                painel.append(tituloEmpresa, descricaoEmpresa);
            }
        }
    ];

    function selecionarAba(indiceSelecionado) {
        abas.querySelectorAll('[role="tab"]').forEach((aba, indice) => {
            const selecionada = indice === indiceSelecionado;
            aba.setAttribute("aria-selected", String(selecionada));
            aba.tabIndex = selecionada ? 0 : -1;
        });
        painel.setAttribute("aria-labelledby", `abaVaga${indiceSelecionado}`);
        painel.replaceChildren();
        conteudosAbas[indiceSelecionado].renderizar();
    }

    conteudosAbas.forEach((aba, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.id = `abaVaga${indice}`;
        botao.setAttribute("role", "tab");
        botao.setAttribute("aria-controls", painel.id);
        botao.setAttribute("aria-selected", String(indice === 0));
        botao.tabIndex = indice === 0 ? 0 : -1;
        botao.textContent = aba.nome;
        botao.addEventListener("click", () => selecionarAba(indice));
        abas.appendChild(botao);
    });
    const informacoes = document.createElement("aside");
    informacoes.className = "vaga-informacoes";
    [
        ["▱", "Salário", vaga.salario || "A combinar"],
        ["◷", "Tipo de trabalho", vaga.tipo],
        ["♧", "Nível de experiência", vaga.nivel],
        ["⌖", "Área de atuação", vaga.area]
    ].forEach(([icone, rotulo, valor]) => {
        const item = document.createElement("div");
        item.className = "informacao";
        const iconeItem = document.createElement("span");
        iconeItem.className = "informacao-icone";
        iconeItem.setAttribute("aria-hidden", "true");
        iconeItem.textContent = icone;
        const texto = document.createElement("div");
        const tituloInfo = document.createElement("h2");
        tituloInfo.textContent = rotulo;
        const valorInfo = document.createElement("p");
        valorInfo.textContent = valor;
        texto.append(tituloInfo, valorInfo);
        item.append(iconeItem, texto);
        informacoes.appendChild(item);
    });

    painelGrid.append(painel, informacoes);
    conteudo.append(abas, painelGrid);
    container.append(identificacao, acoes, conteudo);
    selecionarAba(0);
});
