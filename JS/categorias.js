/* =====================================================================
   TechFix — Categorias de serviço (lista fixa)
   ---------------------------------------------------------------------
   Lista única usada no cadastro de serviços do profissional e nos
   filtros da página de Serviços, pra evitar categoria digitada livre
   (cada profissional escrevendo diferente) e manter nomes voltados ao
   problema do cliente, não ao nome técnico da profissão.
   Ícones conferidos contra o pacote remixicon@4.6.0 real.
   ===================================================================== */

window.CATEGORIAS = [
  {
    slug: "predial",
    nome: "Reparos e Reforma em Casa",
    exemplo: "ex: encanador, pedreiro, telhado, reforma",
    icone: "ri-home-gear-line",
  },
  {
    slug: "eletrica",
    nome: "Instalação e Fiação Elétrica",
    exemplo: "ex: tomada, disjuntor, quadro de luz, fiação",
    icone: "ri-flashlight-line",
  },
  {
    slug: "eletro",
    nome: "Conserto de Eletrodomésticos",
    exemplo: "ex: geladeira, fogão, máquina de lavar, micro-ondas",
    icone: "ri-plug-line",
  },
  {
    slug: "pintura",
    nome: "Pintura",
    exemplo: "ex: pintura de parede, textura, acabamento",
    icone: "ri-paint-brush-line",
  },
  {
    slug: "veiculos",
    nome: "Manutenção de Veículos",
    exemplo: "ex: carro, moto",
    icone: "ri-car-line",
  },
  {
    slug: "informatica",
    nome: "Computador e Celular",
    exemplo: "ex: não liga, lentidão, internet/Wi-Fi",
    icone: "ri-computer-line",
  },
  {
    slug: "industriais",
    nome: "Manutenção de Equipamentos",
    exemplo: "ex: máquinas e equipamentos de uso profissional",
    icone: "ri-settings-3-line",
  },
  {
    slug: "jardinagem",
    nome: "Jardinagem e Paisagismo",
    exemplo: "ex: poda, grama, jardim",
    icone: "ri-plant-line",
  },
  {
    slug: "chaveiro",
    nome: "Chaveiro",
    exemplo: "ex: chave perdida, fechadura, cópia de chave",
    icone: "ri-key-2-line",
  },
  {
    slug: "montagem_moveis",
    nome: "Montagem de Móveis",
    exemplo: "ex: guarda-roupa, estante, cama",
    icone: "ri-sofa-line",
  },
  {
    slug: "dedetizacao",
    nome: "Dedetização e Controle de Pragas",
    exemplo: "ex: formiga, barata, cupim",
    icone: "ri-bug-line",
  },
  {
    slug: "climatizacao",
    nome: "Ar-Condicionado e Climatização",
    exemplo: "ex: instalação, limpeza, manutenção",
    icone: "ri-temp-cold-line",
  },
];

window.Categorias = {
  lista: () => window.CATEGORIAS,
  porSlug: (slug) => window.CATEGORIAS.find((c) => c.slug === slug) || null,
};
