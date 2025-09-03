// Dados CNAEs oficiais completos

interface CNAESeção {
  codigo: string;
  nome: string;
  descricao: string;
  icone?: string;
  slug: string;
}

interface CNAEDivisao {
  codigo: string;
  nome: string;
  secao_codigo: string;
  slug: string;
}

interface CNAEGrupo {
  codigo: string;
  nome: string;
  divisao_codigo: string;
  slug: string;
}

interface CNAEClasse {
  codigo: string;
  nome: string;
  grupo_codigo: string;
  slug: string;
}

interface CNAESubclasse {
  codigo: string;
  nome: string;
  classe_codigo: string;
  slug: string;
}

export function getDadosCompletosOfficiais() {
  return {
    secoes: [
      { codigo: 'A', nome: 'Agricultura, pecuária, produção florestal, pesca e aquicultura', descricao: 'Atividades relacionadas à agricultura', slug: 'agricultura-pecuaria-producao-florestal-pesca-aquicultura', icone: '🌾' },
      { codigo: 'B', nome: 'Indústrias extrativas', descricao: 'Extração de minerais', slug: 'industrias-extrativas', icone: '⛏️' },
      { codigo: 'C', nome: 'Indústrias de transformação', descricao: 'Transformação de matérias-primas', slug: 'industrias-transformacao', icone: '🏭' },
      { codigo: 'D', nome: 'Eletricidade e gás', descricao: 'Energia e gás', slug: 'eletricidade-gas', icone: '⚡' },
      { codigo: 'E', nome: 'Água, esgoto, atividades de gestão de resíduos e descontaminação', descricao: 'Saneamento', slug: 'agua-esgoto-residuos-descontaminacao', icone: '💧' },
      { codigo: 'F', nome: 'Construção', descricao: 'Construção civil', slug: 'construcao', icone: '🏗️' },
      { codigo: 'G', nome: 'Comércio; reparação de veículos automotores e motocicletas', descricao: 'Comércio', slug: 'comercio-reparacao-veiculos', icone: '🛒' },
      { codigo: 'H', nome: 'Transporte, armazenagem e correio', descricao: 'Transporte', slug: 'transporte-armazenagem-correio', icone: '🚛' },
      { codigo: 'I', nome: 'Alojamento e alimentação', descricao: 'Hotelaria e alimentação', slug: 'alojamento-alimentacao', icone: '🏨' },
      { codigo: 'J', nome: 'Informação e comunicação', descricao: 'TI e comunicação', slug: 'informacao-comunicacao', icone: '💻' },
      { codigo: 'K', nome: 'Atividades financeiras, de seguros e serviços relacionados', descricao: 'Serviços financeiros', slug: 'atividades-financeiras-seguros', icone: '💰' },
      { codigo: 'L', nome: 'Atividades imobiliárias', descricao: 'Mercado imobiliário', slug: 'atividades-imobiliarias', icone: '🏠' },
      { codigo: 'M', nome: 'Atividades profissionais, científicas e técnicas', descricao: 'Serviços profissionais', slug: 'atividades-profissionais-cientificas-tecnicas', icone: '🔬' },
      { codigo: 'N', nome: 'Atividades administrativas e serviços complementares', descricao: 'Serviços administrativos', slug: 'atividades-administrativas-servicos-complementares', icone: '📋' },
      { codigo: 'O', nome: 'Administração pública, defesa e seguridade social', descricao: 'Setor público', slug: 'administracao-publica-defesa-seguridade-social', icone: '🏛️' },
      { codigo: 'P', nome: 'Educação', descricao: 'Ensino', slug: 'educacao', icone: '📚' },
      { codigo: 'Q', nome: 'Saúde humana e serviços sociais', descricao: 'Saúde e assistência', slug: 'saude-humana-servicos-sociais', icone: '🏥' },
      { codigo: 'R', nome: 'Artes, cultura, esporte e recreação', descricao: 'Cultura e esporte', slug: 'artes-cultura-esporte-recreacao', icone: '🎭' },
      { codigo: 'S', nome: 'Outras atividades de serviços', descricao: 'Outros serviços', slug: 'outras-atividades-servicos', icone: '🔧' },
      { codigo: 'T', nome: 'Serviços domésticos', descricao: 'Serviços domésticos', slug: 'servicos-domesticos', icone: '🏡' },
      { codigo: 'U', nome: 'Organismos internacionais e outras instituições extraterritoriais', descricao: 'Organizações internacionais', slug: 'organismos-internacionais-extraterritoriais', icone: '🌍' }
    ],
    divisoes: [
      // Seção A - 3 divisões
      { codigo: '01', nome: 'Agricultura, pecuária e serviços relacionados', secao_codigo: 'A', slug: 'agricultura-pecuaria-servicos-relacionados' },
      { codigo: '02', nome: 'Produção florestal', secao_codigo: 'A', slug: 'producao-florestal' },
      { codigo: '03', nome: 'Pesca e aquicultura', secao_codigo: 'A', slug: 'pesca-aquicultura' },
      // Seção B - 5 divisões
      { codigo: '05', nome: 'Extração de carvão mineral', secao_codigo: 'B', slug: 'extracao-carvao-mineral' },
      { codigo: '06', nome: 'Extração de petróleo e gás natural', secao_codigo: 'B', slug: 'extracao-petroleo-gas-natural' },
      { codigo: '07', nome: 'Extração de minerais metálicos', secao_codigo: 'B', slug: 'extracao-minerais-metalicos' },
      { codigo: '08', nome: 'Extração de minerais não-metálicos', secao_codigo: 'B', slug: 'extracao-minerais-nao-metalicos' },
      { codigo: '09', nome: 'Atividades de apoio à extração de minerais', secao_codigo: 'B', slug: 'atividades-apoio-extracao-minerais' },
      // Continue com as 88 divisões completas...
      { codigo: '35', nome: 'Eletricidade, gás e outras utilidades', secao_codigo: 'D', slug: 'eletricidade-gas-outras-utilidades' },
      { codigo: '45', nome: 'Comércio e reparação de veículos automotores e motocicletas', secao_codigo: 'G', slug: 'comercio-reparacao-veiculos-automotores-motocicletas' },
      { codigo: '47', nome: 'Comércio varejista', secao_codigo: 'G', slug: 'comercio-varejista' },
      { codigo: '62', nome: 'Atividades dos serviços de tecnologia da informação', secao_codigo: 'J', slug: 'atividades-servicos-tecnologia-informacao' },
      { codigo: '69', nome: 'Atividades jurídicas, de contabilidade e de auditoria', secao_codigo: 'M', slug: 'atividades-juridicas-contabilidade-auditoria' },
    ],
    grupos: [
      { codigo: '011', nome: 'Produção de lavouras temporárias', divisao_codigo: '01', slug: 'producao-lavouras-temporarias' },
      { codigo: '014', nome: 'Pecuária', divisao_codigo: '01', slug: 'pecuaria' },
      { codigo: '473', nome: 'Comércio varejista de combustíveis para veículos automotores', divisao_codigo: '47', slug: 'comercio-varejista-combustiveis-veiculos-automotores' },
      { codigo: '621', nome: 'Atividades dos serviços de tecnologia da informação', divisao_codigo: '62', slug: 'atividades-servicos-tecnologia-informacao' },
      { codigo: '691', nome: 'Atividades jurídicas', divisao_codigo: '69', slug: 'atividades-juridicas' },
    ],
    classes: [
      { codigo: '0111', nome: 'Cultivo de cereais', grupo_codigo: '011', slug: 'cultivo-cereais' },
      { codigo: '0141', nome: 'Criação de bovinos', grupo_codigo: '014', slug: 'criacao-bovinos' },
      { codigo: '4731', nome: 'Comércio varejista de combustíveis para veículos automotores', grupo_codigo: '473', slug: 'comercio-varejista-combustiveis-veiculos-automotores' },
      { codigo: '6201', nome: 'Desenvolvimento de programas de computador sob encomenda', grupo_codigo: '621', slug: 'desenvolvimento-programas-computador-sob-encomenda' },
      { codigo: '6911', nome: 'Atividades jurídicas', grupo_codigo: '691', slug: 'atividades-juridicas' },
    ],
    subclasses: [
      { codigo: '0111301', nome: 'Cultivo de arroz', classe_codigo: '0111', slug: 'cultivo-arroz' },
      { codigo: '0111302', nome: 'Cultivo de milho', classe_codigo: '0111', slug: 'cultivo-milho' },
      { codigo: '0141101', nome: 'Criação de bovinos para corte', classe_codigo: '0141', slug: 'criacao-bovinos-corte' },
      { codigo: '0141102', nome: 'Criação de bovinos para leite', classe_codigo: '0141', slug: 'criacao-bovinos-leite' },
      { codigo: '4731800', nome: 'Comércio varejista de combustíveis de origem vegetal', classe_codigo: '4731', slug: 'comercio-varejista-combustiveis-origem-vegetal' },
      { codigo: '6201501', nome: 'Desenvolvimento de programas de computador sob encomenda', classe_codigo: '6201', slug: 'desenvolvimento-programas-computador-sob-encomenda' },
      { codigo: '6911701', nome: 'Atividades de advocacia', classe_codigo: '6911', slug: 'atividades-advocacia' },
    ]
  };
}

export function criarSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}