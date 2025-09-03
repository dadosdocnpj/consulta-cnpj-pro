export interface CNAEGrupo {
  codigo: string;
  nome: string;
  secao: string;
  descricao: string;
  slug: string;
  divisoes: CNAEDivisao[];
}

export interface CNAEDivisao {
  codigo: string;
  nome: string;
  slug: string;
  classes: CNAEClasse[];
}

export interface CNAEClasse {
  codigo: string;
  nome: string;
  slug: string;
}

export const cnaeSections = [
  {
    codigo: "A",
    nome: "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
    descricao: "Atividades relacionadas ao setor primário da economia",
    icon: "🌾",
    slug: "agricultura-pecuaria"
  },
  {
    codigo: "B", 
    nome: "Indústrias Extrativas",
    descricao: "Extração de minerais, petróleo e outros recursos naturais",
    icon: "⛏️",
    slug: "industrias-extrativas"
  },
  {
    codigo: "C",
    nome: "Indústrias de Transformação", 
    descricao: "Fabricação e transformação de produtos industriais",
    icon: "🏭",
    slug: "industrias-transformacao"
  },
  {
    codigo: "D",
    nome: "Eletricidade e Gás",
    descricao: "Geração, transmissão e distribuição de energia",
    icon: "⚡",
    slug: "eletricidade-gas"
  },
  {
    codigo: "E",
    nome: "Água, Esgoto, Atividades de Gestão de Resíduos",
    descricao: "Saneamento e gestão ambiental",
    icon: "💧",
    slug: "agua-saneamento"
  },
  {
    codigo: "F",
    nome: "Construção",
    descricao: "Construção civil e obras de infraestrutura",
    icon: "🏗️",
    slug: "construcao"
  },
  {
    codigo: "G",
    nome: "Comércio; Reparação de Veículos Automotores e Motocicletas",
    descricao: "Comércio atacadista e varejista",
    icon: "🛒",
    slug: "comercio"
  },
  {
    codigo: "H",
    nome: "Transporte, Armazenagem e Correio",
    descricao: "Serviços de transporte e logística",
    icon: "🚛",
    slug: "transporte"
  },
  {
    codigo: "I",
    nome: "Alojamento e Alimentação",
    descricao: "Hotéis, restaurantes e serviços de alimentação",
    icon: "🏨",
    slug: "alojamento-alimentacao"
  },
  {
    codigo: "J",
    nome: "Informação e Comunicação",
    descricao: "Tecnologia, telecomunicações e mídia",
    icon: "💻",
    slug: "informacao-comunicacao"
  },
  {
    codigo: "K",
    nome: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    descricao: "Bancos, seguradoras e serviços financeiros",
    icon: "🏦",
    slug: "atividades-financeiras"
  },
  {
    codigo: "L",
    nome: "Atividades Imobiliárias",
    descricao: "Compra, venda e aluguel de imóveis",
    icon: "🏘️",
    slug: "atividades-imobiliarias"
  },
  {
    codigo: "M",
    nome: "Atividades Profissionais, Científicas e Técnicas",
    descricao: "Consultoria, engenharia e serviços especializados",
    icon: "🔬",
    slug: "atividades-profissionais"
  },
  {
    codigo: "N",
    nome: "Atividades Administrativas e Serviços Complementares",
    descricao: "Serviços de apoio administrativo e terceirizados",
    icon: "📋",
    slug: "atividades-administrativas"
  },
  {
    codigo: "O",
    nome: "Administração Pública, Defesa e Seguridade Social",
    descricao: "Órgãos públicos e serviços governamentais",
    icon: "🏛️",
    slug: "administracao-publica"
  },
  {
    codigo: "P",
    nome: "Educação",
    descricao: "Ensino e atividades educacionais",
    icon: "🎓",
    slug: "educacao"
  },
  {
    codigo: "Q",
    nome: "Saúde Humana e Serviços Sociais",
    descricao: "Hospitais, clínicas e assistência social",
    icon: "🏥",
    slug: "saude-servicos-sociais"
  },
  {
    codigo: "R",
    nome: "Artes, Cultura, Esporte e Recreação",
    descricao: "Entretenimento e atividades culturais",
    icon: "🎭",
    slug: "artes-cultura-esporte"
  },
  {
    codigo: "S",
    nome: "Outras Atividades de Serviços",
    descricao: "Serviços diversos não classificados anteriormente",
    icon: "🔧",
    slug: "outras-atividades-servicos"
  },
  {
    codigo: "T",
    nome: "Serviços Domésticos",
    descricao: "Atividades exercidas por famílias como empregadoras",
    icon: "🏠",
    slug: "servicos-domesticos"
  },
  {
    codigo: "U",
    nome: "Organismos Internacionais",
    descricao: "Organizações internacionais e extraterritoriais",
    icon: "🌍",
    slug: "organismos-internacionais"
  }
];

export const cnaeGrupos: CNAEGrupo[] = [
  {
    codigo: "C",
    nome: "Indústrias de Transformação",
    secao: "C",
    descricao: "Fabricação e transformação de produtos industriais",
    slug: "industrias-transformacao",
    divisoes: [
      {
        codigo: "11",
        nome: "Fabricação de bebidas",
        slug: "fabricacao-bebidas",
        classes: [
          { codigo: "1113502", nome: "Fabricação de refrigerantes e de outras bebidas não alcoólicas", slug: "fabricacao-refrigerantes" }
        ]
      }
    ]
  },
  {
    codigo: "G",
    nome: "Comércio; Reparação de Veículos Automotores e Motocicletas",
    secao: "G",
    descricao: "Comércio atacadista e varejista",
    slug: "comercio",
    divisoes: [
      {
        codigo: "45",
        nome: "Comércio e reparação de veículos automotores e motocicletas",
        slug: "comercio-reparacao-veiculos",
        classes: [
          { codigo: "4511", nome: "Comércio a varejo de automóveis, camionetas e utilitários novos", slug: "comercio-automoveis-novos" },
          { codigo: "4512", nome: "Comércio a varejo de automóveis, camionetas e utilitários usados", slug: "comercio-automoveis-usados" },
          { codigo: "4520", nome: "Manutenção e reparação de veículos automotores", slug: "manutencao-reparacao-veiculos" }
        ]
      },
      {
        codigo: "46",
        nome: "Comércio por atacado, exceto veículos automotores e motocicletas",
        slug: "comercio-atacado",
        classes: [
          { codigo: "4611", nome: "Representantes comerciais e agentes do comércio", slug: "representantes-comerciais" },
          { codigo: "4621", nome: "Comércio atacadista de café em grão", slug: "comercio-atacadista-cafe" },
          { codigo: "4631", nome: "Comércio atacadista de leite e laticínios", slug: "comercio-atacadista-laticinios" },
          { codigo: "4649401", nome: "Comércio atacadista de produtos alimentícios em geral", slug: "comercio-atacadista" }
        ]
      },
      {
        codigo: "47",
        nome: "Comércio varejista",
        slug: "comercio-varejista",
        classes: [
          { codigo: "4711", nome: "Hipermercados", slug: "hipermercados" },
          { codigo: "4712", nome: "Supermercados", slug: "supermercados" },
          { codigo: "4713", nome: "Lojas de departamentos ou magazines", slug: "lojas-departamentos" }
        ]
      }
    ]
  },
  {
    codigo: "J",
    nome: "Informação e Comunicação",
    secao: "J",
    descricao: "Tecnologia, telecomunicações e mídia",
    slug: "informacao-comunicacao",
    divisoes: [
      {
        codigo: "62",
        nome: "Atividades dos serviços de tecnologia da informação",
        slug: "servicos-tecnologia-informacao",
        classes: [
          { codigo: "6201", nome: "Desenvolvimento de programas de computador sob encomenda", slug: "desenvolvimento-programas-encomenda" },
          { codigo: "6202", nome: "Desenvolvimento e licenciamento de programas de computador customizáveis", slug: "desenvolvimento-programas-customizaveis" },
          { codigo: "6203100", nome: "Desenvolvimento e licenciamento de programas de computador não customizáveis", slug: "desenvolvimento-de-programas" }
        ]
      },
      {
        codigo: "63",
        nome: "Atividades de prestação de serviços de informação",
        slug: "prestacao-servicos-informacao",
        classes: [
          { codigo: "6311", nome: "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet", slug: "tratamento-dados-hospedagem" },
          { codigo: "6319", nome: "Portais, provedores de conteúdo e outros serviços de informação na internet", slug: "portais-provedores-conteudo" }
        ]
      }
    ]
  },
  {
    codigo: "K",
    nome: "Atividades Financeiras, de Seguros e Serviços Relacionados",
    secao: "K",
    descricao: "Bancos, seguradoras e serviços financeiros",
    slug: "atividades-financeiras",
    divisoes: [
      {
        codigo: "64",
        nome: "Atividades de serviços financeiros",
        slug: "servicos-financeiros",
        classes: [
          { codigo: "6422100", nome: "Bancos múltiplos, com carteira comercial", slug: "bancos-multiplos" }
        ]
      }
    ]
  },
  {
    codigo: "M",
    nome: "Atividades Profissionais, Científicas e Técnicas",
    secao: "M", 
    descricao: "Consultoria, engenharia e serviços especializados",
    slug: "atividades-profissionais",
    divisoes: [
      {
        codigo: "69",
        nome: "Atividades jurídicas, de contabilidade e de auditoria",
        slug: "atividades-juridicas-contabilidade",
        classes: [
          { codigo: "6911", nome: "Atividades jurídicas", slug: "atividades-juridicas" },
          { codigo: "6920", nome: "Atividades de contabilidade", slug: "atividades-contabilidade" }
        ]
      },
      {
        codigo: "70",
        nome: "Atividades de sedes de empresas e de consultoria em gestão empresarial",
        slug: "consultoria-gestao-empresarial",
        classes: [
          { codigo: "7020", nome: "Atividades de consultoria em gestão empresarial", slug: "consultoria-gestao" }
        ]
      },
      {
        codigo: "73",
        nome: "Publicidade e pesquisa de mercado",
        slug: "publicidade-pesquisa-mercado",
        classes: [
          { codigo: "7320300", nome: "Pesquisa de mercado e de opinião pública", slug: "pesquisa-de-mercado" }
        ]
      }
    ]
  },
  {
    codigo: "S",
    nome: "Outras Atividades de Serviços",
    secao: "S",
    descricao: "Serviços diversos não classificados anteriormente",
    slug: "outras-atividades-servicos",
    divisoes: [
      {
        codigo: "94",
        nome: "Atividades de organizações associativas",
        slug: "organizacoes-associativas",
        classes: [
          { codigo: "9430800", nome: "Atividades de organizações profissionais", slug: "atividades-de-organizacoes" }
        ]
      }
    ]
  }
];

export const popularCNAEs = [
  { codigo: "1113502", nome: "Fabricação de refrigerantes e de outras bebidas não alcoólicas", slug: "fabricacao-refrigerantes" },
  { codigo: "4649401", nome: "Comércio atacadista de produtos alimentícios em geral", slug: "comercio-atacadista" },
  { codigo: "6203100", nome: "Desenvolvimento e licenciamento de programas de computador não customizáveis", slug: "desenvolvimento-de-programas" },
  { codigo: "6422100", nome: "Bancos múltiplos, com carteira comercial", slug: "bancos-multiplos" },
  { codigo: "7320300", nome: "Pesquisa de mercado e de opinião pública", slug: "pesquisa-de-mercado" },
  { codigo: "9430800", nome: "Atividades de organizações profissionais", slug: "atividades-de-organizacoes" },
  { codigo: "4711-3/02", nome: "Hipermercados", slug: "hipermercados" },
  { codigo: "4712-1/00", nome: "Supermercados", slug: "supermercados" },
  { codigo: "6201-5/00", nome: "Desenvolvimento de programas de computador sob encomenda", slug: "desenvolvimento-software" },
  { codigo: "6920-6/01", nome: "Serviços de contabilidade", slug: "servicos-contabilidade" }
];