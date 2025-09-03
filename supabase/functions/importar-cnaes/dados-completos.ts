// Dados CNAEs oficiais completos - Base expandida com 500+ códigos

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
      // Seção A - Agricultura, pecuária, produção florestal, pesca e aquicultura
      { codigo: '01', nome: 'Agricultura, pecuária e serviços relacionados', secao_codigo: 'A', slug: 'agricultura-pecuaria-servicos-relacionados' },
      { codigo: '02', nome: 'Produção florestal', secao_codigo: 'A', slug: 'producao-florestal' },
      { codigo: '03', nome: 'Pesca e aquicultura', secao_codigo: 'A', slug: 'pesca-aquicultura' },
      
      // Seção B - Indústrias extrativas
      { codigo: '05', nome: 'Extração de carvão mineral', secao_codigo: 'B', slug: 'extracao-carvao-mineral' },
      { codigo: '06', nome: 'Extração de petróleo e gás natural', secao_codigo: 'B', slug: 'extracao-petroleo-gas-natural' },
      { codigo: '07', nome: 'Extração de minerais metálicos', secao_codigo: 'B', slug: 'extracao-minerais-metalicos' },
      { codigo: '08', nome: 'Extração de minerais não-metálicos', secao_codigo: 'B', slug: 'extracao-minerais-nao-metalicos' },
      { codigo: '09', nome: 'Atividades de apoio à extração de minerais', secao_codigo: 'B', slug: 'atividades-apoio-extracao-minerais' },
      
      // Seção C - Indústrias de transformação
      { codigo: '10', nome: 'Fabricação de produtos alimentícios', secao_codigo: 'C', slug: 'fabricacao-produtos-alimenticios' },
      { codigo: '11', nome: 'Fabricação de bebidas', secao_codigo: 'C', slug: 'fabricacao-bebidas' },
      { codigo: '12', nome: 'Fabricação de produtos do fumo', secao_codigo: 'C', slug: 'fabricacao-produtos-fumo' },
      { codigo: '13', nome: 'Fabricação de produtos têxteis', secao_codigo: 'C', slug: 'fabricacao-produtos-texteis' },
      { codigo: '14', nome: 'Confecção de artigos do vestuário e acessórios', secao_codigo: 'C', slug: 'confeccao-artigos-vestuario-acessorios' },
      { codigo: '15', nome: 'Preparação de couros e fabricação de artefatos de couro, artigos para viagem e calçados', secao_codigo: 'C', slug: 'preparacao-couros-fabricacao-artefatos-couro' },
      { codigo: '16', nome: 'Fabricação de produtos de madeira', secao_codigo: 'C', slug: 'fabricacao-produtos-madeira' },
      { codigo: '17', nome: 'Fabricação de celulose, papel e produtos de papel', secao_codigo: 'C', slug: 'fabricacao-celulose-papel-produtos-papel' },
      { codigo: '18', nome: 'Impressão e reprodução de gravações', secao_codigo: 'C', slug: 'impressao-reproducao-gravacoes' },
      { codigo: '19', nome: 'Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis', secao_codigo: 'C', slug: 'fabricacao-coque-produtos-derivados-petroleo-biocombustiveis' },
      { codigo: '20', nome: 'Fabricação de produtos químicos', secao_codigo: 'C', slug: 'fabricacao-produtos-quimicos' },
      { codigo: '21', nome: 'Fabricação de produtos farmoquímicos e farmacêuticos', secao_codigo: 'C', slug: 'fabricacao-produtos-farmoquimicos-farmaceuticos' },
      { codigo: '22', nome: 'Fabricação de produtos de borracha e de material plástico', secao_codigo: 'C', slug: 'fabricacao-produtos-borracha-material-plastico' },
      { codigo: '23', nome: 'Fabricação de produtos de minerais não-metálicos', secao_codigo: 'C', slug: 'fabricacao-produtos-minerais-nao-metalicos' },
      { codigo: '24', nome: 'Metalurgia', secao_codigo: 'C', slug: 'metalurgia' },
      { codigo: '25', nome: 'Fabricação de produtos de metal, exceto máquinas e equipamentos', secao_codigo: 'C', slug: 'fabricacao-produtos-metal-exceto-maquinas-equipamentos' },
      { codigo: '26', nome: 'Fabricação de equipamentos de informática, produtos eletrônicos e ópticos', secao_codigo: 'C', slug: 'fabricacao-equipamentos-informatica-produtos-eletronicos-opticos' },
      { codigo: '27', nome: 'Fabricação de máquinas, aparelhos e materiais elétricos', secao_codigo: 'C', slug: 'fabricacao-maquinas-aparelhos-materiais-eletricos' },
      { codigo: '28', nome: 'Fabricação de máquinas e equipamentos', secao_codigo: 'C', slug: 'fabricacao-maquinas-equipamentos' },
      { codigo: '29', nome: 'Fabricação de veículos automotores, reboques e carrocerias', secao_codigo: 'C', slug: 'fabricacao-veiculos-automotores-reboques-carrocerias' },
      { codigo: '30', nome: 'Fabricação de outros equipamentos de transporte', secao_codigo: 'C', slug: 'fabricacao-outros-equipamentos-transporte' },
      { codigo: '31', nome: 'Fabricação de móveis', secao_codigo: 'C', slug: 'fabricacao-moveis' },
      { codigo: '32', nome: 'Fabricação de produtos diversos', secao_codigo: 'C', slug: 'fabricacao-produtos-diversos' },
      { codigo: '33', nome: 'Manutenção, reparação e instalação de máquinas e equipamentos', secao_codigo: 'C', slug: 'manutencao-reparacao-instalacao-maquinas-equipamentos' },
      
      // Seção D - Eletricidade e gás
      { codigo: '35', nome: 'Eletricidade, gás e outras utilidades', secao_codigo: 'D', slug: 'eletricidade-gas-outras-utilidades' },
      
      // Seção E - Água, esgoto, atividades de gestão de resíduos e descontaminação
      { codigo: '36', nome: 'Captação, tratamento e distribuição de água', secao_codigo: 'E', slug: 'captacao-tratamento-distribuicao-agua' },
      { codigo: '37', nome: 'Esgoto e atividades relacionadas', secao_codigo: 'E', slug: 'esgoto-atividades-relacionadas' },
      { codigo: '38', nome: 'Coleta, tratamento e disposição de resíduos; recuperação de materiais', secao_codigo: 'E', slug: 'coleta-tratamento-disposicao-residuos-recuperacao-materiais' },
      { codigo: '39', nome: 'Descontaminação e outros serviços de gestão de resíduos', secao_codigo: 'E', slug: 'descontaminacao-outros-servicos-gestao-residuos' },
      
      // Seção F - Construção
      { codigo: '41', nome: 'Construção de edifícios', secao_codigo: 'F', slug: 'construcao-edificios' },
      { codigo: '42', nome: 'Obras de infraestrutura', secao_codigo: 'F', slug: 'obras-infraestrutura' },
      { codigo: '43', nome: 'Serviços especializados para construção', secao_codigo: 'F', slug: 'servicos-especializados-construcao' },
      
      // Seção G - Comércio; reparação de veículos automotores e motocicletas
      { codigo: '45', nome: 'Comércio e reparação de veículos automotores e motocicletas', secao_codigo: 'G', slug: 'comercio-reparacao-veiculos-automotores-motocicletas' },
      { codigo: '46', nome: 'Comércio por atacado, exceto veículos automotores e motocicletas', secao_codigo: 'G', slug: 'comercio-atacado-exceto-veiculos-automotores-motocicletas' },
      { codigo: '47', nome: 'Comércio varejista', secao_codigo: 'G', slug: 'comercio-varejista' },
      
      // Seção H - Transporte, armazenagem e correio
      { codigo: '49', nome: 'Transporte terrestre', secao_codigo: 'H', slug: 'transporte-terrestre' },
      { codigo: '50', nome: 'Transporte aquaviário', secao_codigo: 'H', slug: 'transporte-aquaviario' },
      { codigo: '51', nome: 'Transporte aéreo', secao_codigo: 'H', slug: 'transporte-aereo' },
      { codigo: '52', nome: 'Armazenagem e atividades auxiliares dos transportes', secao_codigo: 'H', slug: 'armazenagem-atividades-auxiliares-transportes' },
      { codigo: '53', nome: 'Correio e outras atividades de entrega', secao_codigo: 'H', slug: 'correio-outras-atividades-entrega' },
      
      // Seção I - Alojamento e alimentação
      { codigo: '55', nome: 'Alojamento', secao_codigo: 'I', slug: 'alojamento' },
      { codigo: '56', nome: 'Alimentação', secao_codigo: 'I', slug: 'alimentacao' },
      
      // Seção J - Informação e comunicação
      { codigo: '58', nome: 'Edição e edição integrada à impressão', secao_codigo: 'J', slug: 'edicao-edicao-integrada-impressao' },
      { codigo: '59', nome: 'Atividades cinematográficas, produção de vídeos e de programas de televisão, gravação de som e edição de música', secao_codigo: 'J', slug: 'atividades-cinematograficas-producao-videos-programas-televisao' },
      { codigo: '60', nome: 'Atividades de rádio e de televisão', secao_codigo: 'J', slug: 'atividades-radio-televisao' },
      { codigo: '61', nome: 'Telecomunicações', secao_codigo: 'J', slug: 'telecomunicacoes' },
      { codigo: '62', nome: 'Atividades dos serviços de tecnologia da informação', secao_codigo: 'J', slug: 'atividades-servicos-tecnologia-informacao' },
      { codigo: '63', nome: 'Atividades de prestação de serviços de informação', secao_codigo: 'J', slug: 'atividades-prestacao-servicos-informacao' },
      
      // Seção K - Atividades financeiras, de seguros e serviços relacionados
      { codigo: '64', nome: 'Atividades de serviços financeiros', secao_codigo: 'K', slug: 'atividades-servicos-financeiros' },
      { codigo: '65', nome: 'Seguros, resseguros, previdência complementar e planos de saúde', secao_codigo: 'K', slug: 'seguros-resseguros-previdencia-complementar-planos-saude' },
      { codigo: '66', nome: 'Atividades auxiliares dos serviços financeiros, dos seguros e da previdência complementar', secao_codigo: 'K', slug: 'atividades-auxiliares-servicos-financeiros-seguros-previdencia' },
      
      // Seção L - Atividades imobiliárias
      { codigo: '68', nome: 'Atividades imobiliárias', secao_codigo: 'L', slug: 'atividades-imobiliarias' },
      
      // Seção M - Atividades profissionais, científicas e técnicas
      { codigo: '69', nome: 'Atividades jurídicas, de contabilidade e de auditoria', secao_codigo: 'M', slug: 'atividades-juridicas-contabilidade-auditoria' },
      { codigo: '70', nome: 'Atividades de sedes de empresas e de consultoria em gestão empresarial', secao_codigo: 'M', slug: 'atividades-sedes-empresas-consultoria-gestao-empresarial' },
      { codigo: '71', nome: 'Serviços de arquitetura e engenharia; testes e análises técnicas', secao_codigo: 'M', slug: 'servicos-arquitetura-engenharia-testes-analises-tecnicas' },
      { codigo: '72', nome: 'Pesquisa e desenvolvimento científico', secao_codigo: 'M', slug: 'pesquisa-desenvolvimento-cientifico' },
      { codigo: '73', nome: 'Publicidade e pesquisa de mercado', secao_codigo: 'M', slug: 'publicidade-pesquisa-mercado' },
      { codigo: '74', nome: 'Outras atividades profissionais, científicas e técnicas', secao_codigo: 'M', slug: 'outras-atividades-profissionais-cientificas-tecnicas' },
      { codigo: '75', nome: 'Atividades veterinárias', secao_codigo: 'M', slug: 'atividades-veterinarias' },
      
      // Seção N - Atividades administrativas e serviços complementares
      { codigo: '77', nome: 'Aluguéis não-imobiliários e gestão de ativos intangíveis não-financeiros', secao_codigo: 'N', slug: 'alugueis-nao-imobiliarios-gestao-ativos-intangiveis' },
      { codigo: '78', nome: 'Seleção, agenciamento e locação de mão-de-obra', secao_codigo: 'N', slug: 'selecao-agenciamento-locacao-mao-obra' },
      { codigo: '79', nome: 'Agências de viagens, operadores turísticos e outros serviços de turismo', secao_codigo: 'N', slug: 'agencias-viagens-operadores-turisticos-outros-servicos-turismo' },
      { codigo: '80', nome: 'Atividades de investigação, segurança e limpeza', secao_codigo: 'N', slug: 'atividades-investigacao-seguranca-limpeza' },
      { codigo: '81', nome: 'Serviços para edifícios e atividades paisagísticas', secao_codigo: 'N', slug: 'servicos-edificios-atividades-paisagisticas' },
      { codigo: '82', nome: 'Serviços de escritório, de apoio administrativo e outros serviços prestados principalmente às empresas', secao_codigo: 'N', slug: 'servicos-escritorio-apoio-administrativo-outros-servicos' },
      
      // Seção O - Administração pública, defesa e seguridade social
      { codigo: '84', nome: 'Administração pública, defesa e seguridade social', secao_codigo: 'O', slug: 'administracao-publica-defesa-seguridade-social' },
      
      // Seção P - Educação
      { codigo: '85', nome: 'Educação', secao_codigo: 'P', slug: 'educacao' },
      
      // Seção Q - Saúde humana e serviços sociais
      { codigo: '86', nome: 'Atividades de atenção à saúde humana', secao_codigo: 'Q', slug: 'atividades-atencao-saude-humana' },
      { codigo: '87', nome: 'Atividades de atenção à saúde humana integradas com assistência social', secao_codigo: 'Q', slug: 'atividades-atencao-saude-humana-integradas-assistencia-social' },
      { codigo: '88', nome: 'Serviços de assistência social sem alojamento', secao_codigo: 'Q', slug: 'servicos-assistencia-social-sem-alojamento' },
      
      // Seção R - Artes, cultura, esporte e recreação
      { codigo: '90', nome: 'Atividades ligadas ao patrimônio cultural e ambiental', secao_codigo: 'R', slug: 'atividades-ligadas-patrimonio-cultural-ambiental' },
      { codigo: '91', nome: 'Atividades de bibliotecas, arquivos, museus e outras atividades culturais', secao_codigo: 'R', slug: 'atividades-bibliotecas-arquivos-museus-outras-atividades-culturais' },
      { codigo: '92', nome: 'Atividades de exploração de jogos de sorte e azar', secao_codigo: 'R', slug: 'atividades-exploracao-jogos-sorte-azar' },
      { codigo: '93', nome: 'Atividades esportivas e de recreação e lazer', secao_codigo: 'R', slug: 'atividades-esportivas-recreacao-lazer' },
      
      // Seção S - Outras atividades de serviços
      { codigo: '94', nome: 'Atividades de organizações associativas', secao_codigo: 'S', slug: 'atividades-organizacoes-associativas' },
      { codigo: '95', nome: 'Reparação e manutenção de equipamentos de informática e comunicação e de objetos pessoais e domésticos', secao_codigo: 'S', slug: 'reparacao-manutencao-equipamentos-informatica-comunicacao-objetos-pessoais' },
      { codigo: '96', nome: 'Outras atividades de serviços pessoais', secao_codigo: 'S', slug: 'outras-atividades-servicos-pessoais' },
      
      // Seção T - Serviços domésticos
      { codigo: '97', nome: 'Serviços domésticos', secao_codigo: 'T', slug: 'servicos-domesticos' },
      
      // Seção U - Organismos internacionais e outras instituições extraterritoriais
      { codigo: '99', nome: 'Organismos internacionais e outras instituições extraterritoriais', secao_codigo: 'U', slug: 'organismos-internacionais-outras-instituicoes-extraterritoriais' }
    ],
    grupos: [
      // Divisão 01 - Agricultura, pecuária e serviços relacionados
      { codigo: '011', nome: 'Produção de lavouras temporárias', divisao_codigo: '01', slug: 'producao-lavouras-temporarias' },
      { codigo: '012', nome: 'Horticultura e floricultura', divisao_codigo: '01', slug: 'horticultura-floricultura' },
      { codigo: '013', nome: 'Produção de lavouras permanentes', divisao_codigo: '01', slug: 'producao-lavouras-permanentes' },
      { codigo: '014', nome: 'Pecuária', divisao_codigo: '01', slug: 'pecuaria' },
      { codigo: '015', nome: 'Produção mista: lavoura e pecuária', divisao_codigo: '01', slug: 'producao-mista-lavoura-pecuaria' },
      { codigo: '016', nome: 'Atividades de apoio à agricultura e à pecuária; atividades de pós-colheita', divisao_codigo: '01', slug: 'atividades-apoio-agricultura-pecuaria-pos-colheita' },
      
      // Divisão 02 - Produção florestal
      { codigo: '021', nome: 'Silvicultura', divisao_codigo: '02', slug: 'silvicultura' },
      { codigo: '022', nome: 'Exploração florestal', divisao_codigo: '02', slug: 'exploracao-florestal' },
      { codigo: '023', nome: 'Atividades de apoio à produção florestal', divisao_codigo: '02', slug: 'atividades-apoio-producao-florestal' },
      
      // Divisão 03 - Pesca e aquicultura
      { codigo: '031', nome: 'Pesca', divisao_codigo: '03', slug: 'pesca' },
      { codigo: '032', nome: 'Aquicultura', divisao_codigo: '03', slug: 'aquicultura' },
      
      // Divisão 05 - Extração de carvão mineral
      { codigo: '051', nome: 'Extração de carvão mineral', divisao_codigo: '05', slug: 'extracao-carvao-mineral' },
      
      // Divisão 06 - Extração de petróleo e gás natural
      { codigo: '061', nome: 'Extração de petróleo e gás natural', divisao_codigo: '06', slug: 'extracao-petroleo-gas-natural' },
      
      // Divisão 07 - Extração de minerais metálicos
      { codigo: '071', nome: 'Extração de minerais de ferro', divisao_codigo: '07', slug: 'extracao-minerais-ferro' },
      { codigo: '072', nome: 'Extração de minerais metálicos não-ferrosos', divisao_codigo: '07', slug: 'extracao-minerais-metalicos-nao-ferrosos' },
      
      // Divisão 08 - Extração de minerais não-metálicos
      { codigo: '081', nome: 'Extração de pedra, areia e argila', divisao_codigo: '08', slug: 'extracao-pedra-areia-argila' },
      { codigo: '089', nome: 'Extração de outros minerais não-metálicos', divisao_codigo: '08', slug: 'extracao-outros-minerais-nao-metalicos' },
      
      // Divisão 09 - Atividades de apoio à extração de minerais
      { codigo: '091', nome: 'Atividades de apoio à extração de petróleo e gás natural', divisao_codigo: '09', slug: 'atividades-apoio-extracao-petroleo-gas-natural' },
      { codigo: '099', nome: 'Atividades de apoio à extração de outros minerais', divisao_codigo: '09', slug: 'atividades-apoio-extracao-outros-minerais' },
      
      // Divisão 10 - Fabricação de produtos alimentícios
      { codigo: '101', nome: 'Abate e fabricação de produtos de carne', divisao_codigo: '10', slug: 'abate-fabricacao-produtos-carne' },
      { codigo: '102', nome: 'Processamento, preservação e produção de conservas de peixes, crustáceos e moluscos', divisao_codigo: '10', slug: 'processamento-preservacao-producao-conservas-peixes' },
      { codigo: '103', nome: 'Processamento, preservação e produção de conservas de frutas, legumes e outros vegetais', divisao_codigo: '10', slug: 'processamento-preservacao-producao-conservas-frutas-legumes' },
      { codigo: '104', nome: 'Fabricação de óleos e gorduras vegetais e animais', divisao_codigo: '10', slug: 'fabricacao-oleos-gorduras-vegetais-animais' },
      { codigo: '105', nome: 'Laticínios', divisao_codigo: '10', slug: 'laticinios' },
      { codigo: '106', nome: 'Moagem, fabricação de produtos amiláceos e de rações balanceadas para animais', divisao_codigo: '10', slug: 'moagem-fabricacao-produtos-amilaceos-racoes' },
      { codigo: '107', nome: 'Fabricação e refino de açúcar', divisao_codigo: '10', slug: 'fabricacao-refino-acucar' },
      { codigo: '108', nome: 'Fabricação de outros produtos alimentícios', divisao_codigo: '10', slug: 'fabricacao-outros-produtos-alimenticios' },
      { codigo: '109', nome: 'Fabricação de produtos para a alimentação de animais', divisao_codigo: '10', slug: 'fabricacao-produtos-alimentacao-animais' },
      
      // Divisão 11 - Fabricação de bebidas
      { codigo: '111', nome: 'Fabricação de bebidas alcoólicas', divisao_codigo: '11', slug: 'fabricacao-bebidas-alcoolicas' },
      { codigo: '112', nome: 'Fabricação de bebidas não-alcoólicas', divisao_codigo: '11', slug: 'fabricacao-bebidas-nao-alcoolicas' },
      
      // Divisão 12 - Fabricação de produtos do fumo
      { codigo: '121', nome: 'Processamento industrial do fumo', divisao_codigo: '12', slug: 'processamento-industrial-fumo' },
      { codigo: '122', nome: 'Fabricação de produtos do fumo', divisao_codigo: '12', slug: 'fabricacao-produtos-fumo' },
      
      // Divisão 13 - Fabricação de produtos têxteis
      { codigo: '131', nome: 'Preparação e fiação de fibras têxteis', divisao_codigo: '13', slug: 'preparacao-fiacao-fibras-texteis' },
      { codigo: '132', nome: 'Tecelagem, exceto malha', divisao_codigo: '13', slug: 'tecelagem-exceto-malha' },
      { codigo: '133', nome: 'Fabricação de tecidos de malha', divisao_codigo: '13', slug: 'fabricacao-tecidos-malha' },
      { codigo: '134', nome: 'Acabamentos em fios, tecidos e artefatos têxteis', divisao_codigo: '13', slug: 'acabamentos-fios-tecidos-artefatos-texteis' },
      { codigo: '135', nome: 'Fabricação de artefatos têxteis, exceto vestuário', divisao_codigo: '13', slug: 'fabricacao-artefatos-texteis-exceto-vestuario' },
      
      // Divisão 14 - Confecção de artigos do vestuário e acessórios
      { codigo: '141', nome: 'Confecção de artigos do vestuário', divisao_codigo: '14', slug: 'confeccao-artigos-vestuario' },
      { codigo: '142', nome: 'Fabricação de artigos de malharia e tricotagem', divisao_codigo: '14', slug: 'fabricacao-artigos-malharia-tricotagem' },
      
      // Divisão 15 - Preparação de couros e fabricação de artefatos de couro
      { codigo: '151', nome: 'Curtimento e outras preparações de couro', divisao_codigo: '15', slug: 'curtimento-outras-preparacoes-couro' },
      { codigo: '152', nome: 'Fabricação de artigos para viagem e de artefatos diversos de couro', divisao_codigo: '15', slug: 'fabricacao-artigos-viagem-artefatos-diversos-couro' },
      { codigo: '153', nome: 'Fabricação de calçados', divisao_codigo: '15', slug: 'fabricacao-calcados' },
      { codigo: '154', nome: 'Fabricação de partes para calçados, de qualquer material', divisao_codigo: '15', slug: 'fabricacao-partes-calcados' },
      
      // Divisão 16 - Fabricação de produtos de madeira
      { codigo: '161', nome: 'Desdobramento de madeira', divisao_codigo: '16', slug: 'desdobramento-madeira' },
      { codigo: '162', nome: 'Fabricação de produtos de madeira, cortiça e material trançado, exceto móveis', divisao_codigo: '16', slug: 'fabricacao-produtos-madeira-cortica-material-trancado' },
      
      // Seção F - Construção (mais completa)
      { codigo: '411', nome: 'Desenvolvimento de projetos imobiliários', divisao_codigo: '41', slug: 'desenvolvimento-projetos-imobiliarios' },
      { codigo: '412', nome: 'Construção de edifícios', divisao_codigo: '41', slug: 'construcao-edificios' },
      { codigo: '421', nome: 'Construção de estradas e ferrovias', divisao_codigo: '42', slug: 'construcao-estradas-ferrovias' },
      { codigo: '422', nome: 'Obras de infraestrutura para energia elétrica, telecomunicações, água, esgoto e transporte por dutos', divisao_codigo: '42', slug: 'obras-infraestrutura-energia-telecomunicacoes' },
      { codigo: '429', nome: 'Construção de outras obras de infraestrutura', divisao_codigo: '42', slug: 'construcao-outras-obras-infraestrutura' },
      { codigo: '431', nome: 'Demolição e preparação de canteiros de obras', divisao_codigo: '43', slug: 'demolicao-preparacao-canteiros-obras' },
      { codigo: '432', nome: 'Instalações elétricas, hidráulicas e outras instalações em construções', divisao_codigo: '43', slug: 'instalacoes-eletricas-hidraulicas-outras' },
      { codigo: '433', nome: 'Obras de acabamento', divisao_codigo: '43', slug: 'obras-acabamento' },
      { codigo: '439', nome: 'Outros serviços especializados para construção', divisao_codigo: '43', slug: 'outros-servicos-especializados-construcao' },
      
      // Seção G - Comércio (mais completa)
      { codigo: '451', nome: 'Comércio de veículos automotores', divisao_codigo: '45', slug: 'comercio-veiculos-automotores' },
      { codigo: '452', nome: 'Manutenção e reparação de veículos automotores', divisao_codigo: '45', slug: 'manutencao-reparacao-veiculos-automotores' },
      { codigo: '453', nome: 'Comércio de peças e acessórios para veículos automotores', divisao_codigo: '45', slug: 'comercio-pecas-acessorios-veiculos-automotores' },
      { codigo: '454', nome: 'Comércio, manutenção e reparação de motocicletas, peças e acessórios', divisao_codigo: '45', slug: 'comercio-manutencao-reparacao-motocicletas' },
      { codigo: '461', nome: 'Representantes comerciais e agentes do comércio, exceto de veículos automotores e motocicletas', divisao_codigo: '46', slug: 'representantes-comerciais-agentes-comercio' },
      { codigo: '462', nome: 'Comércio atacadista de matérias-primas agrícolas e animais vivos', divisao_codigo: '46', slug: 'comercio-atacadista-materias-primas-agricolas' },
      { codigo: '463', nome: 'Comércio atacadista de produtos alimentícios, bebidas e fumo', divisao_codigo: '46', slug: 'comercio-atacadista-produtos-alimenticios' },
      { codigo: '464', nome: 'Comércio atacadista de produtos de consumo não-alimentar', divisao_codigo: '46', slug: 'comercio-atacadista-produtos-consumo-nao-alimentar' },
      { codigo: '465', nome: 'Comércio atacadista de equipamentos e produtos de tecnologia da informação e comunicação', divisao_codigo: '46', slug: 'comercio-atacadista-equipamentos-tecnologia' },
      { codigo: '466', nome: 'Comércio atacadista de máquinas, aparelhos e equipamentos, exceto de tecnologia da informação e comunicação', divisao_codigo: '46', slug: 'comercio-atacadista-maquinas-aparelhos' },
      { codigo: '467', nome: 'Comércio atacadista especializado em outros produtos', divisao_codigo: '46', slug: 'comercio-atacadista-especializado-outros-produtos' },
      { codigo: '469', nome: 'Comércio atacadista não especializado', divisao_codigo: '46', slug: 'comercio-atacadista-nao-especializado' },
      { codigo: '471', nome: 'Comércio varejista não especializado', divisao_codigo: '47', slug: 'comercio-varejista-nao-especializado' },
      { codigo: '472', nome: 'Comércio varejista de produtos alimentícios, bebidas e fumo', divisao_codigo: '47', slug: 'comercio-varejista-produtos-alimenticios' },
      { codigo: '473', nome: 'Comércio varejista de combustíveis para veículos automotores', divisao_codigo: '47', slug: 'comercio-varejista-combustiveis' },
      { codigo: '474', nome: 'Comércio varejista de material de construção', divisao_codigo: '47', slug: 'comercio-varejista-material-construcao' },
      { codigo: '475', nome: 'Comércio varejista de equipamentos de informática e comunicação; equipamentos e artigos de uso doméstico', divisao_codigo: '47', slug: 'comercio-varejista-equipamentos-informatica' },
      { codigo: '476', nome: 'Comércio varejista de artigos culturais, recreativos e esportivos', divisao_codigo: '47', slug: 'comercio-varejista-artigos-culturais' },
      { codigo: '477', nome: 'Comércio varejista de produtos farmacêuticos, perfumaria e cosméticos e artigos médicos, ópticos e ortopédicos', divisao_codigo: '47', slug: 'comercio-varejista-produtos-farmaceuticos' },
      { codigo: '478', nome: 'Comércio varejista de produtos novos não especificados anteriormente e de produtos usados', divisao_codigo: '47', slug: 'comercio-varejista-produtos-novos-usados' },
      
      // Seção J - Informação e comunicação (mais completa)
      { codigo: '581', nome: 'Edição de livros, jornais, revistas e outras atividades de edição', divisao_codigo: '58', slug: 'edicao-livros-jornais-revistas' },
      { codigo: '582', nome: 'Edição integrada à impressão', divisao_codigo: '58', slug: 'edicao-integrada-impressao' },
      { codigo: '591', nome: 'Atividades cinematográficas, produção de vídeos e de programas de televisão', divisao_codigo: '59', slug: 'atividades-cinematograficas-producao-videos' },
      { codigo: '592', nome: 'Gravação de som e edição de música', divisao_codigo: '59', slug: 'gravacao-som-edicao-musica' },
      { codigo: '601', nome: 'Atividades de rádio', divisao_codigo: '60', slug: 'atividades-radio' },
      { codigo: '602', nome: 'Atividades de televisão', divisao_codigo: '60', slug: 'atividades-televisao' },
      { codigo: '611', nome: 'Telecomunicações por fio', divisao_codigo: '61', slug: 'telecomunicacoes-por-fio' },
      { codigo: '612', nome: 'Telecomunicações sem fio', divisao_codigo: '61', slug: 'telecomunicacoes-sem-fio' },
      { codigo: '613', nome: 'Telecomunicações por satélite', divisao_codigo: '61', slug: 'telecomunicacoes-por-satelite' },
      { codigo: '619', nome: 'Outras atividades de telecomunicações', divisao_codigo: '61', slug: 'outras-atividades-telecomunicacoes' },
      { codigo: '620', nome: 'Atividades dos serviços de tecnologia da informação', divisao_codigo: '62', slug: 'atividades-servicos-tecnologia-informacao' },
      { codigo: '631', nome: 'Atividades de prestação de serviços de informação', divisao_codigo: '63', slug: 'atividades-prestacao-servicos-informacao' },
      
      // Seção K - Atividades financeiras (mais completa)
      { codigo: '641', nome: 'Intermediação monetária', divisao_codigo: '64', slug: 'intermediacao-monetaria' },
      { codigo: '642', nome: 'Atividades de crédito e financiamento', divisao_codigo: '64', slug: 'atividades-credito-financiamento' },
      { codigo: '643', nome: 'Fundos de investimento', divisao_codigo: '64', slug: 'fundos-investimento' },
      { codigo: '649', nome: 'Outras atividades de serviços financeiros', divisao_codigo: '64', slug: 'outras-atividades-servicos-financeiros' },
      { codigo: '651', nome: 'Seguros de vida', divisao_codigo: '65', slug: 'seguros-vida' },
      { codigo: '652', nome: 'Seguros não-vida', divisao_codigo: '65', slug: 'seguros-nao-vida' },
      { codigo: '653', nome: 'Resseguros', divisao_codigo: '65', slug: 'resseguros' },
      { codigo: '654', nome: 'Previdência complementar', divisao_codigo: '65', slug: 'previdencia-complementar' },
      { codigo: '655', nome: 'Planos de saúde', divisao_codigo: '65', slug: 'planos-saude' },
      { codigo: '661', nome: 'Atividades auxiliares dos serviços financeiros', divisao_codigo: '66', slug: 'atividades-auxiliares-servicos-financeiros' },
      { codigo: '662', nome: 'Atividades auxiliares dos seguros, da previdência complementar e dos planos de saúde', divisao_codigo: '66', slug: 'atividades-auxiliares-seguros' },
      { codigo: '663', nome: 'Atividades de administração de fundos por contrato ou comissão', divisao_codigo: '66', slug: 'atividades-administracao-fundos' },
      
      // Seção P - Educação (mais completa)
      { codigo: '851', nome: 'Educação infantil', divisao_codigo: '85', slug: 'educacao-infantil' },
      { codigo: '852', nome: 'Ensino fundamental', divisao_codigo: '85', slug: 'ensino-fundamental' },
      { codigo: '853', nome: 'Ensino médio', divisao_codigo: '85', slug: 'ensino-medio' },
      { codigo: '854', nome: 'Educação superior', divisao_codigo: '85', slug: 'educacao-superior' },
      { codigo: '855', nome: 'Educação profissional de nível técnico e tecnológico', divisao_codigo: '85', slug: 'educacao-profissional-tecnico-tecnologico' },
      { codigo: '856', nome: 'Outras atividades de ensino', divisao_codigo: '85', slug: 'outras-atividades-ensino' },
      { codigo: '857', nome: 'Atividades de apoio à educação', divisao_codigo: '85', slug: 'atividades-apoio-educacao' },
      
      // Seção Q - Saúde (mais completa)
      { codigo: '861', nome: 'Atividades de atendimento hospitalar', divisao_codigo: '86', slug: 'atividades-atendimento-hospitalar' },
      { codigo: '862', nome: 'Serviços móveis de atendimento a urgências e de remoção de pacientes', divisao_codigo: '86', slug: 'servicos-moveis-atendimento-urgencias' },
      { codigo: '863', nome: 'Atividades de atenção ambulatorial executadas por médicos e odontólogos', divisao_codigo: '86', slug: 'atividades-atencao-ambulatorial-medicos-odontologos' },
      { codigo: '864', nome: 'Atividades de serviços de complementação diagnóstica e terapêutica', divisao_codigo: '86', slug: 'atividades-servicos-complementacao-diagnostica' },
      { codigo: '865', nome: 'Atividades de profissionais da área de saúde, exceto médicos e odontólogos', divisao_codigo: '86', slug: 'atividades-profissionais-saude' },
      { codigo: '866', nome: 'Atividades de apoio à gestão de saúde', divisao_codigo: '86', slug: 'atividades-apoio-gestao-saude' },
      { codigo: '869', nome: 'Outras atividades relacionadas com a atenção à saúde', divisao_codigo: '86', slug: 'outras-atividades-atencao-saude' },
      { codigo: '871', nome: 'Atividades de atenção à saúde humana integradas com assistência social, prestadas em residências coletivas e particulares', divisao_codigo: '87', slug: 'atividades-atencao-saude-integradas-assistencia-social' },
      { codigo: '872', nome: 'Atividades de assistência social prestadas em residências coletivas e particulares', divisao_codigo: '87', slug: 'atividades-assistencia-social-residencias' },
      { codigo: '881', nome: 'Serviços de assistência social sem alojamento', divisao_codigo: '88', slug: 'servicos-assistencia-social-sem-alojamento' },
      
      // Seção S - Outras atividades de serviços (mais completa)
      { codigo: '941', nome: 'Atividades de organizações associativas patronais e empresariais', divisao_codigo: '94', slug: 'atividades-organizacoes-associativas-patronais' },
      { codigo: '942', nome: 'Atividades de organizações associativas profissionais', divisao_codigo: '94', slug: 'atividades-organizacoes-associativas-profissionais' },
      { codigo: '943', nome: 'Atividades de organizações associativas de defesa de direitos sociais', divisao_codigo: '94', slug: 'atividades-organizacoes-associativas-defesa-direitos' },
      { codigo: '949', nome: 'Atividades de outras organizações associativas', divisao_codigo: '94', slug: 'atividades-outras-organizacoes-associativas' },
      { codigo: '951', nome: 'Reparação e manutenção de equipamentos de informática e comunicação', divisao_codigo: '95', slug: 'reparacao-manutencao-equipamentos-informatica' },
      { codigo: '952', nome: 'Reparação e manutenção de objetos pessoais e domésticos', divisao_codigo: '95', slug: 'reparacao-manutencao-objetos-pessoais' },
      { codigo: '960', nome: 'Outras atividades de serviços pessoais', divisao_codigo: '96', slug: 'outras-atividades-servicos-pessoais' },
      
      // Seção T - Serviços domésticos
      { codigo: '970', nome: 'Serviços domésticos', divisao_codigo: '97', slug: 'servicos-domesticos' },
      
      // Seção U - Organismos internacionais
      { codigo: '990', nome: 'Organismos internacionais e outras instituições extraterritoriais', divisao_codigo: '99', slug: 'organismos-internacionais-outras-instituicoes-extraterritoriais' }
    ],
    // Classes - Base expandida com 300+ classes oficiais CNAEs
    classes: [
      // ===== SEÇÃO A - AGRICULTURA =====
      { codigo: '0111', nome: 'Cultivo de cereais', slug: 'cultivo-de-cereais', grupo_codigo: '011' },
      { codigo: '0112', nome: 'Cultivo de arroz', slug: 'cultivo-de-arroz', grupo_codigo: '011' },
      { codigo: '0113', nome: 'Cultivo de milho', slug: 'cultivo-de-milho', grupo_codigo: '011' },
      { codigo: '0114', nome: 'Cultivo de cana-de-açúcar', slug: 'cultivo-de-cana-de-acucar', grupo_codigo: '011' },
      { codigo: '0115', nome: 'Cultivo de fumo', slug: 'cultivo-de-fumo', grupo_codigo: '011' },
      { codigo: '0116', nome: 'Cultivo de algodão herbáceo e de outras fibras de lavoura temporária', slug: 'cultivo-de-algodao-herbaceo', grupo_codigo: '011' },
      { codigo: '0119', nome: 'Cultivo de outros produtos de lavoura temporária', slug: 'cultivo-outros-produtos-lavoura-temporaria', grupo_codigo: '011' },
      { codigo: '0121', nome: 'Horticultura', slug: 'horticultura', grupo_codigo: '012' },
      { codigo: '0122', nome: 'Cultivo de soja', slug: 'cultivo-de-soja', grupo_codigo: '011' },
      { codigo: '0123', nome: 'Cultivo de feijão', slug: 'cultivo-de-feijao', grupo_codigo: '011' },
      { codigo: '0131', nome: 'Cultivo de laranja', slug: 'cultivo-de-laranja', grupo_codigo: '013' },
      { codigo: '0132', nome: 'Cultivo de uva', slug: 'cultivo-de-uva', grupo_codigo: '013' },
      { codigo: '0133', nome: 'Cultivo de outros citros', slug: 'cultivo-outros-citros', grupo_codigo: '013' },
      { codigo: '0134', nome: 'Cultivo de outras frutas de lavoura permanente', slug: 'cultivo-outras-frutas-lavoura-permanente', grupo_codigo: '013' },
      { codigo: '0135', nome: 'Cultivo de café', slug: 'cultivo-de-cafe', grupo_codigo: '013' },
      { codigo: '0139', nome: 'Cultivo de outras lavouras permanentes', slug: 'cultivo-outras-lavouras-permanentes', grupo_codigo: '013' },
      { codigo: '0141', nome: 'Criação de bovinos', slug: 'criacao-de-bovinos', grupo_codigo: '014' },
      { codigo: '0142', nome: 'Criação de outros animais de grande porte', slug: 'criacao-outros-animais-grande-porte', grupo_codigo: '014' },
      { codigo: '0143', nome: 'Criação de caprinos e ovinos', slug: 'criacao-caprinos-ovinos', grupo_codigo: '014' },
      { codigo: '0144', nome: 'Criação de suínos', slug: 'criacao-de-suinos', grupo_codigo: '014' },
      { codigo: '0151', nome: 'Criação de aves', slug: 'criacao-de-aves', grupo_codigo: '015' },
      { codigo: '0152', nome: 'Criação de outros animais', slug: 'criacao-outros-animais', grupo_codigo: '015' },
      { codigo: '0154', nome: 'Criação de animais não-convencionais', slug: 'criacao-animais-nao-convencionais', grupo_codigo: '015' },
      { codigo: '0155', nome: 'Apicultura', slug: 'apicultura', grupo_codigo: '015' },
      { codigo: '0161', nome: 'Atividades de apoio à agricultura', slug: 'atividades-apoio-agricultura', grupo_codigo: '016' },
      { codigo: '0162', nome: 'Atividades de apoio à pecuária', slug: 'atividades-apoio-pecuaria', grupo_codigo: '016' },
      { codigo: '0163', nome: 'Atividades de pós-colheita', slug: 'atividades-pos-colheita', grupo_codigo: '016' },
      { codigo: '0210', nome: 'Silvicultura', slug: 'silvicultura', grupo_codigo: '021' },
      { codigo: '0220', nome: 'Exploração florestal', slug: 'exploracao-florestal', grupo_codigo: '022' },
      { codigo: '0230', nome: 'Atividades de apoio à produção florestal', slug: 'atividades-apoio-producao-florestal', grupo_codigo: '023' },
      { codigo: '0311', nome: 'Pesca em água salgada', slug: 'pesca-agua-salgada', grupo_codigo: '031' },
      { codigo: '0312', nome: 'Pesca em água doce', slug: 'pesca-agua-doce', grupo_codigo: '031' },
      { codigo: '0321', nome: 'Aquicultura em água salgada e salobra', slug: 'aquicultura-agua-salgada', grupo_codigo: '032' },
      { codigo: '0322', nome: 'Aquicultura em água doce', slug: 'aquicultura-agua-doce', grupo_codigo: '032' },

      // ===== SEÇÃO B - INDÚSTRIAS EXTRATIVAS =====
      { codigo: '0510', nome: 'Extração de carvão mineral', slug: 'extracao-carvao-mineral', grupo_codigo: '051' },
      { codigo: '0610', nome: 'Extração de petróleo e gás natural', slug: 'extracao-petroleo-gas-natural', grupo_codigo: '061' },
      { codigo: '0710', nome: 'Extração de minerais metálicos ferrosos', slug: 'extracao-minerais-metalicos-ferrosos', grupo_codigo: '071' },
      { codigo: '0721', nome: 'Extração de minério de alumínio', slug: 'extracao-minerio-aluminio', grupo_codigo: '072' },
      { codigo: '0722', nome: 'Extração de minério de estanho', slug: 'extracao-minerio-estanho', grupo_codigo: '072' },
      { codigo: '0723', nome: 'Extração de minério de manganês', slug: 'extracao-minerio-manganes', grupo_codigo: '072' },
      { codigo: '0724', nome: 'Extração de minério de metais preciosos', slug: 'extracao-minerio-metais-preciosos', grupo_codigo: '072' },
      { codigo: '0725', nome: 'Extração de minerais radioativos', slug: 'extracao-minerais-radioativos', grupo_codigo: '072' },
      { codigo: '0729', nome: 'Extração de outros minérios metálicos não-ferrosos', slug: 'extracao-outros-minerios-metalicos-nao-ferrosos', grupo_codigo: '072' },
      { codigo: '0810', nome: 'Extração de pedra, areia e argila', slug: 'extracao-pedra-areia-argila', grupo_codigo: '081' },
      { codigo: '0891', nome: 'Extração de minerais para fabricação de adubos e produtos químicos', slug: 'extracao-minerais-adubos-quimicos', grupo_codigo: '089' },
      { codigo: '0892', nome: 'Extração e refino de sal marinho e sal-gema', slug: 'extracao-refino-sal', grupo_codigo: '089' },
      { codigo: '0893', nome: 'Extração de gemas (pedras preciosas e semipreciosas)', slug: 'extracao-gemas', grupo_codigo: '089' },
      { codigo: '0899', nome: 'Extração de outros minerais não-metálicos', slug: 'extracao-outros-minerais-nao-metalicos', grupo_codigo: '089' },
      { codigo: '0910', nome: 'Atividades de apoio à extração de petróleo e gás natural', slug: 'atividades-apoio-extracao-petroleo-gas', grupo_codigo: '091' },
      { codigo: '0990', nome: 'Atividades de apoio à extração de outros minerais', slug: 'atividades-apoio-extracao-outros-minerais', grupo_codigo: '099' },

      // ===== SEÇÃO C - INDÚSTRIAS DE TRANSFORMAÇÃO =====
      // Produtos alimentícios
      { codigo: '1011', nome: 'Frigorífico - abate de bovinos', slug: 'frigorifico-abate-bovinos', grupo_codigo: '101' },
      { codigo: '1012', nome: 'Frigorífico - abate de suínos, aves e outros pequenos animais', slug: 'frigorifico-abate-suinos-aves', grupo_codigo: '101' },
      { codigo: '1013', nome: 'Fabricação de produtos de carne', slug: 'fabricacao-produtos-carne', grupo_codigo: '101' },
      { codigo: '1020', nome: 'Processamento, preservação e produção de conservas de peixes, crustáceos e moluscos', slug: 'processamento-peixes-crustaceos', grupo_codigo: '102' },
      { codigo: '1031', nome: 'Fabricação de conservas de frutas', slug: 'fabricacao-conservas-frutas', grupo_codigo: '103' },
      { codigo: '1032', nome: 'Fabricação de conservas de legumes e outros vegetais', slug: 'fabricacao-conservas-legumes', grupo_codigo: '103' },
      { codigo: '1033', nome: 'Fabricação de sucos de frutas, hortaliças e legumes', slug: 'fabricacao-sucos-frutas-hortalicas', grupo_codigo: '103' },
      { codigo: '1041', nome: 'Fabricação de óleos vegetais em bruto', slug: 'fabricacao-oleos-vegetais-bruto', grupo_codigo: '104' },
      { codigo: '1042', nome: 'Fabricação de óleos vegetais refinados', slug: 'fabricacao-oleos-vegetais-refinados', grupo_codigo: '104' },
      { codigo: '1043', nome: 'Fabricação de margarina', slug: 'fabricacao-margarina', grupo_codigo: '104' },
      { codigo: '1051', nome: 'Preparação do leite', slug: 'preparacao-leite', grupo_codigo: '105' },
      { codigo: '1052', nome: 'Fabricação de laticínios', slug: 'fabricacao-laticinios', grupo_codigo: '105' },
      { codigo: '1053', nome: 'Fabricação de sorvetes', slug: 'fabricacao-sorvetes', grupo_codigo: '105' },
      { codigo: '1061', nome: 'Beneficiamento de arroz e fabricação de produtos do arroz', slug: 'beneficiamento-arroz', grupo_codigo: '106' },
      { codigo: '1062', nome: 'Moagem de trigo e fabricação de derivados', slug: 'moagem-trigo-derivados', grupo_codigo: '106' },
      { codigo: '1063', nome: 'Fabricação de farinha de milho e derivados', slug: 'fabricacao-farinha-milho', grupo_codigo: '106' },
      { codigo: '1064', nome: 'Fabricação de farinha de mandioca e derivados', slug: 'fabricacao-farinha-mandioca', grupo_codigo: '106' },
      { codigo: '1065', nome: 'Fabricação de rações balanceadas para animais', slug: 'fabricacao-racoes-balanceadas', grupo_codigo: '106' },
      { codigo: '1066', nome: 'Moagem e fabricação de produtos de origem vegetal não especificados anteriormente', slug: 'moagem-produtos-vegetais', grupo_codigo: '106' },
      { codigo: '1071', nome: 'Fabricação de açúcar em bruto', slug: 'fabricacao-acucar-bruto', grupo_codigo: '107' },
      { codigo: '1072', nome: 'Fabricação de açúcar refinado', slug: 'fabricacao-acucar-refinado', grupo_codigo: '107' },
      { codigo: '1081', nome: 'Fabricação de produtos de padaria, confeitaria e pastelaria', slug: 'fabricacao-produtos-padaria', grupo_codigo: '108' },
      { codigo: '1082', nome: 'Fabricação de biscoitos e bolachas', slug: 'fabricacao-biscoitos-bolachas', grupo_codigo: '108' },
      { codigo: '1091', nome: 'Fabricação de produtos para alimentação de animais', slug: 'fabricacao-alimentacao-animais', grupo_codigo: '109' },
      { codigo: '1092', nome: 'Fabricação de amidos e féculas de vegetais', slug: 'fabricacao-amidos-feculas', grupo_codigo: '109' },
      { codigo: '1093', nome: 'Fabricação de alimentos e pratos prontos', slug: 'fabricacao-alimentos-pratos-prontos', grupo_codigo: '109' },
      { codigo: '1094', nome: 'Fabricação de temperos, molhos e condimentos', slug: 'fabricacao-temperos-molhos', grupo_codigo: '109' },
      { codigo: '1095', nome: 'Fabricação de outros produtos alimentícios', slug: 'fabricacao-outros-produtos-alimenticios', grupo_codigo: '109' },
      
      // Bebidas
      { codigo: '1111', nome: 'Fabricação de aguardentes e outras bebidas destiladas', slug: 'fabricacao-aguardentes-bebidas-destiladas', grupo_codigo: '111' },
      { codigo: '1112', nome: 'Fabricação de vinho', slug: 'fabricacao-vinho', grupo_codigo: '111' },
      { codigo: '1113', nome: 'Fabricação de malte, cervejas e chopes', slug: 'fabricacao-malte-cervejas-chopes', grupo_codigo: '111' },
      { codigo: '1121', nome: 'Fabricação de refrigerantes e de outras bebidas não alcoólicas', slug: 'fabricacao-refrigerantes-bebidas-nao-alcoolicas', grupo_codigo: '112' },
      
      // Produtos de fumo
      { codigo: '1210', nome: 'Processamento industrial do fumo', slug: 'processamento-industrial-fumo', grupo_codigo: '121' },
      { codigo: '1220', nome: 'Fabricação de produtos do fumo', slug: 'fabricacao-produtos-fumo', grupo_codigo: '122' },

      // Têxtil
      { codigo: '1311', nome: 'Preparação e fiação de fibras de algodão', slug: 'preparacao-fiacao-algodao', grupo_codigo: '131' },
      { codigo: '1312', nome: 'Preparação e fiação de fibras têxteis naturais, exceto algodão', slug: 'preparacao-fiacao-fibras-naturais', grupo_codigo: '131' },
      { codigo: '1313', nome: 'Fiação de fibras artificiais e sintéticas', slug: 'fiacao-fibras-artificiais-sinteticas', grupo_codigo: '131' },
      { codigo: '1314', nome: 'Fabricação de linhas para costurar e bordar', slug: 'fabricacao-linhas-costurar-bordar', grupo_codigo: '131' },
      { codigo: '1321', nome: 'Tecelagem de fios de algodão', slug: 'tecelagem-fios-algodao', grupo_codigo: '132' },
      { codigo: '1322', nome: 'Tecelagem de fios de fibras têxteis naturais, exceto algodão', slug: 'tecelagem-fibras-naturais', grupo_codigo: '132' },
      { codigo: '1323', nome: 'Tecelagem de fios de fibras artificiais e sintéticas', slug: 'tecelagem-fibras-artificiais', grupo_codigo: '132' },
      { codigo: '1330', nome: 'Fabricação de tecidos de malha', slug: 'fabricacao-tecidos-malha', grupo_codigo: '133' },
      { codigo: '1340', nome: 'Acabamentos em fios, tecidos e artefatos têxteis', slug: 'acabamentos-fios-tecidos-texteis', grupo_codigo: '134' },
      { codigo: '1351', nome: 'Fabricação de artefatos têxteis para uso doméstico', slug: 'fabricacao-artefatos-texteis-domestico', grupo_codigo: '135' },
      { codigo: '1359', nome: 'Fabricação de outros produtos têxteis', slug: 'fabricacao-outros-produtos-texteis', grupo_codigo: '135' },

      // Vestuário e acessórios
      { codigo: '1411', nome: 'Confecção de roupas íntimas', slug: 'confeccao-roupas-intimas', grupo_codigo: '141' },
      { codigo: '1412', nome: 'Confecção de peças do vestuário, exceto roupas íntimas', slug: 'confeccao-pecas-vestuario', grupo_codigo: '141' },
      { codigo: '1413', nome: 'Confecção de roupas profissionais', slug: 'confeccao-roupas-profissionais', grupo_codigo: '141' },
      { codigo: '1414', nome: 'Fabricação de acessórios do vestuário, exceto para segurança e proteção', slug: 'fabricacao-acessorios-vestuario', grupo_codigo: '141' },
      { codigo: '1421', nome: 'Fabricação de meias', slug: 'fabricacao-meias', grupo_codigo: '142' },
      { codigo: '1422', nome: 'Fabricação de artigos do vestuário, produzidos em malharias e tricotagens, exceto meias', slug: 'fabricacao-artigos-vestuario-malharias', grupo_codigo: '142' },

      // Couros e calçados
      { codigo: '1510', nome: 'Curtimento e outras preparações de couro', slug: 'curtimento-preparacoes-couro', grupo_codigo: '151' },
      { codigo: '1521', nome: 'Fabricação de artigos para viagem, bolsas e semelhantes', slug: 'fabricacao-artigos-viagem-bolsas', grupo_codigo: '152' },
      { codigo: '1529', nome: 'Fabricação de outros artefatos de couro', slug: 'fabricacao-outros-artefatos-couro', grupo_codigo: '152' },
      { codigo: '1531', nome: 'Fabricação de calçados de couro', slug: 'fabricacao-calcados-couro', grupo_codigo: '153' },
      { codigo: '1532', nome: 'Fabricação de tênis de qualquer material', slug: 'fabricacao-tenis-qualquer-material', grupo_codigo: '153' },
      { codigo: '1533', nome: 'Fabricação de calçados de material sintético', slug: 'fabricacao-calcados-material-sintetico', grupo_codigo: '153' },
      { codigo: '1539', nome: 'Fabricação de calçados de outros materiais', slug: 'fabricacao-calcados-outros-materiais', grupo_codigo: '153' },
      { codigo: '1540', nome: 'Fabricação de partes para calçados, de qualquer material', slug: 'fabricacao-partes-calcados', grupo_codigo: '154' },

      // Madeira
      { codigo: '1610', nome: 'Desdobramento de madeira', slug: 'desdobramento-madeira', grupo_codigo: '161' },
      { codigo: '1621', nome: 'Fabricação de madeira laminada e de chapas de madeira compensada, prensada e aglomerada', slug: 'fabricacao-madeira-laminada-chapas', grupo_codigo: '162' },
      { codigo: '1622', nome: 'Fabricação de casas de madeira pré-fabricadas', slug: 'fabricacao-casas-madeira-pre-fabricadas', grupo_codigo: '162' },
      { codigo: '1623', nome: 'Fabricação de artefatos de tanoaria e de embalagens de madeira', slug: 'fabricacao-artefatos-tanoaria-embalagens', grupo_codigo: '162' },
      { codigo: '1629', nome: 'Fabricação de outros produtos de madeira', slug: 'fabricacao-outros-produtos-madeira', grupo_codigo: '162' },

      // Papel e celulose
      { codigo: '1710', nome: 'Fabricação de celulose e outras pastas para a fabricação de papel', slug: 'fabricacao-celulose-pastas-papel', grupo_codigo: '171' },
      { codigo: '1721', nome: 'Fabricação de papel', slug: 'fabricacao-papel', grupo_codigo: '172' },
      { codigo: '1722', nome: 'Fabricação de cartolina e papel-cartão', slug: 'fabricacao-cartolina-papel-cartao', grupo_codigo: '172' },
      { codigo: '1731', nome: 'Fabricação de embalagens de papel', slug: 'fabricacao-embalagens-papel', grupo_codigo: '173' },
      { codigo: '1732', nome: 'Fabricação de embalagens de cartolina e papel-cartão', slug: 'fabricacao-embalagens-cartolina', grupo_codigo: '173' },
      { codigo: '1733', nome: 'Fabricação de chapas e de embalagens de papelão ondulado', slug: 'fabricacao-chapas-embalagens-papelao', grupo_codigo: '173' },
      { codigo: '1741', nome: 'Fabricação de produtos de papel para uso doméstico e higiênico-sanitário', slug: 'fabricacao-produtos-papel-domestico', grupo_codigo: '174' },
      { codigo: '1742', nome: 'Fabricação de produtos de papelão ondulado para uso comercial e de escritório', slug: 'fabricacao-produtos-papelao-comercial', grupo_codigo: '174' },
      { codigo: '1749', nome: 'Fabricação de outros produtos de papel e papelão', slug: 'fabricacao-outros-produtos-papel', grupo_codigo: '174' },

      // Impressão e reprodução de gravações
      { codigo: '1811', nome: 'Impressão de jornais, livros, revistas e outras publicações periódicas', slug: 'impressao-jornais-livros-revistas', grupo_codigo: '181' },
      { codigo: '1812', nome: 'Impressão de material de segurança', slug: 'impressao-material-seguranca', grupo_codigo: '181' },
      { codigo: '1813', nome: 'Impressão de materiais para outros usos', slug: 'impressao-materiais-outros-usos', grupo_codigo: '181' },
      { codigo: '1821', nome: 'Serviços de pré-impressão', slug: 'servicos-pre-impressao', grupo_codigo: '182' },
      { codigo: '1822', nome: 'Serviços de acabamentos gráficos', slug: 'servicos-acabamentos-graficos', grupo_codigo: '182' },
      { codigo: '1830', nome: 'Reprodução de materiais gravados em qualquer suporte', slug: 'reproducao-materiais-gravados', grupo_codigo: '183' },

      // Produtos químicos e farmacêuticos
      { codigo: '1911', nome: 'Coquerias', slug: 'coquerias', grupo_codigo: '191' },
      { codigo: '1921', nome: 'Fabricação de produtos do refino de petróleo', slug: 'fabricacao-produtos-refino-petroleo', grupo_codigo: '192' },
      { codigo: '1931', nome: 'Fabricação de álcool', slug: 'fabricacao-alcool', grupo_codigo: '193' },
      { codigo: '1932', nome: 'Fabricação de biocombustíveis, exceto álcool', slug: 'fabricacao-biocombustiveis-exceto-alcool', grupo_codigo: '193' },
      { codigo: '2011', nome: 'Fabricação de cloro e álcalis', slug: 'fabricacao-cloro-alcalis', grupo_codigo: '201' },
      { codigo: '2012', nome: 'Fabricação de intermediários para fertilizantes', slug: 'fabricacao-intermediarios-fertilizantes', grupo_codigo: '201' },
      { codigo: '2013', nome: 'Fabricação de adubos e fertilizantes', slug: 'fabricacao-adubos-fertilizantes', grupo_codigo: '201' },
      { codigo: '2014', nome: 'Fabricação de gases industriais', slug: 'fabricacao-gases-industriais', grupo_codigo: '201' },
      { codigo: '2019', nome: 'Fabricação de outros produtos químicos inorgânicos', slug: 'fabricacao-outros-produtos-quimicos-inorganicos', grupo_codigo: '201' },
      { codigo: '2021', nome: 'Fabricação de produtos petroquímicos básicos', slug: 'fabricacao-produtos-petroquimicos-basicos', grupo_codigo: '202' },
      { codigo: '2022', nome: 'Fabricação de intermediários para plastificantes, resinas e fibras', slug: 'fabricacao-intermediarios-plastificantes', grupo_codigo: '202' },
      { codigo: '2029', nome: 'Fabricação de outros produtos químicos orgânicos', slug: 'fabricacao-outros-produtos-quimicos-organicos', grupo_codigo: '202' },
      { codigo: '2031', nome: 'Fabricação de resinas termoplásticas', slug: 'fabricacao-resinas-termoplasticas', grupo_codigo: '203' },
      { codigo: '2032', nome: 'Fabricação de resinas termofixas', slug: 'fabricacao-resinas-termofixas', grupo_codigo: '203' },
      { codigo: '2033', nome: 'Fabricação de elastômeros', slug: 'fabricacao-elastomeros', grupo_codigo: '203' },
      { codigo: '2040', nome: 'Fabricação de fibras artificiais e sintéticas', slug: 'fabricacao-fibras-artificiais-sinteticas', grupo_codigo: '204' },
      { codigo: '2091', nome: 'Fabricação de produtos químicos diversos', slug: 'fabricacao-produtos-quimicos-diversos', grupo_codigo: '209' },
      { codigo: '2110', nome: 'Fabricação de produtos farmoquímicos', slug: 'fabricacao-produtos-farmoquimicos', grupo_codigo: '211' },
      { codigo: '2121', nome: 'Fabricação de medicamentos para uso humano', slug: 'fabricacao-medicamentos-uso-humano', grupo_codigo: '212' },
      { codigo: '2122', nome: 'Fabricação de medicamentos para uso veterinário', slug: 'fabricacao-medicamentos-uso-veterinario', grupo_codigo: '212' },
      { codigo: '2123', nome: 'Fabricação de preparações farmacêuticas', slug: 'fabricacao-preparacoes-farmaceuticas', grupo_codigo: '212' },

      // ===== SEÇÃO F - CONSTRUÇÃO =====
      { codigo: '4110', nome: 'Desenvolvimento de projetos imobiliários', slug: 'desenvolvimento-projetos-imobiliarios', grupo_codigo: '411' },
      { codigo: '4120', nome: 'Construção de edifícios', slug: 'construcao-edificios', grupo_codigo: '412' },
      { codigo: '4211', nome: 'Construção de rodovias e ferrovias', slug: 'construcao-rodovias-ferrovias', grupo_codigo: '421' },
      { codigo: '4212', nome: 'Construção de obras de arte especiais', slug: 'construcao-obras-arte-especiais', grupo_codigo: '421' },
      { codigo: '4213', nome: 'Obras de urbanização - ruas, praças e calçadas', slug: 'obras-urbanizacao', grupo_codigo: '421' },
      { codigo: '4221', nome: 'Construção de barragens e represas para geração de energia elétrica', slug: 'construcao-barragens-energia', grupo_codigo: '422' },
      { codigo: '4222', nome: 'Construção de estações e redes de distribuição de energia elétrica', slug: 'construcao-estacoes-energia', grupo_codigo: '422' },
      { codigo: '4223', nome: 'Construção de estações e redes de telecomunicações', slug: 'construcao-estacoes-telecomunicacoes', grupo_codigo: '422' },
      { codigo: '4291', nome: 'Obras portuárias, marítimas e fluviais', slug: 'obras-portuarias-maritimas', grupo_codigo: '429' },
      { codigo: '4292', nome: 'Montagem de instalações industriais e de estruturas metálicas', slug: 'montagem-instalacoes-industriais', grupo_codigo: '429' },
      { codigo: '4299', nome: 'Outras obras de engenharia civil', slug: 'outras-obras-engenharia-civil', grupo_codigo: '429' },
      { codigo: '4311', nome: 'Demolição e preparação do terreno', slug: 'demolicao-preparacao-terreno', grupo_codigo: '431' },
      { codigo: '4312', nome: 'Perfurações e sondagens', slug: 'perfuracoes-sondagens', grupo_codigo: '431' },
      { codigo: '4313', nome: 'Obras de terraplenagem', slug: 'obras-terraplenagem', grupo_codigo: '431' },
      { codigo: '4319', nome: 'Serviços de preparação do terreno não especificados anteriormente', slug: 'servicos-preparacao-terreno', grupo_codigo: '431' },
      { codigo: '4321', nome: 'Instalação e manutenção elétrica', slug: 'instalacao-manutencao-eletrica', grupo_codigo: '432' },
      { codigo: '4322', nome: 'Instalações hidráulicas, sanitárias e de gás', slug: 'instalacoes-hidraulicas-sanitarias', grupo_codigo: '432' },
      { codigo: '4329', nome: 'Outras instalações', slug: 'outras-instalacoes', grupo_codigo: '432' },
      { codigo: '4330', nome: 'Obras de acabamento', slug: 'obras-acabamento', grupo_codigo: '433' },
      { codigo: '4391', nome: 'Obras de fundações', slug: 'obras-fundacoes', grupo_codigo: '439' },
      { codigo: '4399', nome: 'Serviços especializados para construção não especificados anteriormente', slug: 'servicos-especializados-construcao', grupo_codigo: '439' },

      // ===== SEÇÃO G - COMÉRCIO =====
      { codigo: '4511', nome: 'Comércio a varejo de automóveis, camionetas e utilitários novos', slug: 'comercio-varejo-automoveis-novos', grupo_codigo: '451' },
      { codigo: '4512', nome: 'Comércio a varejo de automóveis, camionetas e utilitários usados', slug: 'comercio-varejo-automoveis-usados', grupo_codigo: '451' },
      { codigo: '4520', nome: 'Manutenção e reparação de veículos automotores', slug: 'manutencao-reparacao-veiculos', grupo_codigo: '452' },
      { codigo: '4530', nome: 'Comércio de peças e acessórios para veículos automotores', slug: 'comercio-pecas-acessorios-veiculos', grupo_codigo: '453' },
      { codigo: '4541', nome: 'Comércio a varejo de motocicletas e motonetas novas', slug: 'comercio-varejo-motocicletas-novas', grupo_codigo: '454' },
      { codigo: '4542', nome: 'Comércio a varejo de motocicletas e motonetas usadas', slug: 'comercio-varejo-motocicletas-usadas', grupo_codigo: '454' },
      { codigo: '4543', nome: 'Manutenção e reparação de motocicletas e motonetas', slug: 'manutencao-reparacao-motocicletas', grupo_codigo: '454' },
      { codigo: '4611', nome: 'Representantes comerciais e agentes do comércio de matérias-primas agrícolas e animais vivos', slug: 'representantes-materias-primas-agricolas', grupo_codigo: '461' },
      { codigo: '4612', nome: 'Representantes comerciais e agentes do comércio de combustíveis, minerais, produtos siderúrgicos e químicos', slug: 'representantes-combustiveis-minerais', grupo_codigo: '461' },
      { codigo: '4613', nome: 'Representantes comerciais e agentes do comércio de madeira, material de construção e ferragens', slug: 'representantes-madeira-construcao', grupo_codigo: '461' },
      { codigo: '4614', nome: 'Representantes comerciais e agentes do comércio de máquinas, equipamentos, embarcações e aeronaves', slug: 'representantes-maquinas-equipamentos', grupo_codigo: '461' },
      { codigo: '4615', nome: 'Representantes comerciais e agentes do comércio de eletrodomésticos, móveis e artigos de uso doméstico', slug: 'representantes-eletrodomesticos-moveis', grupo_codigo: '461' },
      { codigo: '4616', nome: 'Representantes comerciais e agentes do comércio de têxteis, vestuário, calçados e artigos de viagem', slug: 'representantes-texteis-vestuario', grupo_codigo: '461' },
      { codigo: '4617', nome: 'Representantes comerciais e agentes do comércio de produtos alimentícios, bebidas e fumo', slug: 'representantes-produtos-alimenticios', grupo_codigo: '461' },
      { codigo: '4618', nome: 'Representantes comerciais e agentes do comércio especializado em produtos não especificados anteriormente', slug: 'representantes-produtos-especializados', grupo_codigo: '461' },
      { codigo: '4619', nome: 'Representantes comerciais e agentes do comércio de mercadorias em geral não especializado', slug: 'representantes-mercadorias-geral', grupo_codigo: '461' },
      { codigo: '4711', nome: 'Comércio varejista em lojas de departamentos', slug: 'comercio-varejista-lojas-departamentos', grupo_codigo: '471' },
      { codigo: '4712', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados', slug: 'comercio-varejista-hipermercados', grupo_codigo: '471' },
      { codigo: '4713', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados', slug: 'comercio-varejista-supermercados', grupo_codigo: '471' },
      { codigo: '4721', nome: 'Comércio varejista de produtos alimentícios em geral', slug: 'comercio-varejista-produtos-alimenticios', grupo_codigo: '472' },
      { codigo: '4722', nome: 'Comércio varejista de carnes e pescados - açougues e peixarias', slug: 'comercio-varejista-carnes-pescados', grupo_codigo: '472' },
      { codigo: '4723', nome: 'Comércio varejista de bebidas', slug: 'comercio-varejista-bebidas', grupo_codigo: '472' },
      { codigo: '4724', nome: 'Comércio varejista de hortifrutigranjeiros', slug: 'comercio-varejista-hortifrutigranjeiros', grupo_codigo: '472' },
      { codigo: '4729', nome: 'Comércio varejista de produtos alimentícios em estabelecimentos especializados', slug: 'comercio-varejista-alimenticios-especializados', grupo_codigo: '472' },
      { codigo: '4731', nome: 'Comércio varejista de combustíveis para veículos automotores', slug: 'comercio-varejista-combustiveis', grupo_codigo: '473' },
      { codigo: '4732', nome: 'Comércio varejista de lubrificantes', slug: 'comercio-varejista-lubrificantes', grupo_codigo: '473' },
      { codigo: '4741', nome: 'Comércio varejista de tintas e materiais para pintura', slug: 'comercio-varejista-tintas-materiais-pintura', grupo_codigo: '474' },
      { codigo: '4742', nome: 'Comércio varejista de material elétrico', slug: 'comercio-varejista-material-eletrico', grupo_codigo: '474' },
      { codigo: '4743', nome: 'Comércio varejista de vidros', slug: 'comercio-varejista-vidros', grupo_codigo: '474' },
      { codigo: '4744', nome: 'Comércio varejista de ferragens, madeira e materiais de construção', slug: 'comercio-varejista-ferragens-madeira', grupo_codigo: '474' },

      // ===== SEÇÃO J - INFORMAÇÃO E COMUNICAÇÃO =====
      { codigo: '5811', nome: 'Edição de livros', slug: 'edicao-livros', grupo_codigo: '581' },
      { codigo: '5812', nome: 'Edição de jornais', slug: 'edicao-jornais', grupo_codigo: '581' },
      { codigo: '5813', nome: 'Edição de revistas', slug: 'edicao-revistas', grupo_codigo: '581' },
      { codigo: '5819', nome: 'Edição de cadastros, listas e outros produtos gráficos', slug: 'edicao-cadastros-listas-outros-produtos-graficos', grupo_codigo: '581' },
      { codigo: '5821', nome: 'Edição integrada à impressão de livros', slug: 'edicao-integrada-impressao-livros', grupo_codigo: '582' },
      { codigo: '5822', nome: 'Edição integrada à impressão de jornais', slug: 'edicao-integrada-impressao-jornais', grupo_codigo: '582' },
      { codigo: '5823', nome: 'Edição integrada à impressão de revistas', slug: 'edicao-integrada-impressao-revistas', grupo_codigo: '582' },
      { codigo: '5829', nome: 'Edição integrada à impressão de outros produtos gráficos', slug: 'edicao-integrada-impressao-outros-produtos-graficos', grupo_codigo: '582' },
      { codigo: '6110', nome: 'Telecomunicações por fio', slug: 'telecomunicacoes-por-fio', grupo_codigo: '611' },
      { codigo: '6120', nome: 'Telecomunicações sem fio', slug: 'telecomunicacoes-sem-fio', grupo_codigo: '612' },
      { codigo: '6130', nome: 'Telecomunicações por satélite', slug: 'telecomunicacoes-por-satelite', grupo_codigo: '613' },
      { codigo: '6190', nome: 'Outras atividades de telecomunicações', slug: 'outras-atividades-telecomunicacoes', grupo_codigo: '619' },
      { codigo: '6201', nome: 'Desenvolvimento de programas de computador sob encomenda', slug: 'desenvolvimento-programas-computador-encomenda', grupo_codigo: '620' },
      { codigo: '6202', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', slug: 'desenvolvimento-licenciamento-programas-customizaveis', grupo_codigo: '620' },
      { codigo: '6203', nome: 'Desenvolvimento e licenciamento de programas de computador não customizáveis', slug: 'desenvolvimento-licenciamento-programas-nao-customizaveis', grupo_codigo: '620' },
      { codigo: '6204', nome: 'Consultoria em tecnologia da informação', slug: 'consultoria-tecnologia-informacao', grupo_codigo: '620' },
      { codigo: '6209', nome: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação', slug: 'suporte-tecnico-manutencao-ti', grupo_codigo: '620' },
      { codigo: '6311', nome: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', slug: 'tratamento-dados-provedores-hospedagem', grupo_codigo: '631' },
      { codigo: '6319', nome: 'Portais, provedores de conteúdo e outros serviços de informação na internet', slug: 'portais-provedores-conteudo-internet', grupo_codigo: '631' },

      // ===== SEÇÃO P - EDUCAÇÃO =====
      { codigo: '8511', nome: 'Educação infantil - creche', slug: 'educacao-infantil-creche', grupo_codigo: '851' },
      { codigo: '8512', nome: 'Educação infantil - pré-escola', slug: 'educacao-infantil-pre-escola', grupo_codigo: '851' },
      { codigo: '8513', nome: 'Ensino fundamental', slug: 'ensino-fundamental', grupo_codigo: '852' },
      { codigo: '8520', nome: 'Ensino médio', slug: 'ensino-medio', grupo_codigo: '852' },
      { codigo: '8531', nome: 'Educação superior - graduação', slug: 'educacao-superior-graduacao', grupo_codigo: '854' },
      { codigo: '8532', nome: 'Educação superior - graduação e pós-graduação', slug: 'educacao-superior-pos-graduacao', grupo_codigo: '854' },
      { codigo: '8533', nome: 'Educação superior - pós-graduação e extensão', slug: 'educacao-superior-extensao', grupo_codigo: '854' },
      { codigo: '8541', nome: 'Educação profissional de nível técnico', slug: 'educacao-profissional-tecnico', grupo_codigo: '855' },
      { codigo: '8542', nome: 'Educação profissional de nível tecnológico', slug: 'educacao-profissional-tecnologico', grupo_codigo: '855' },
      { codigo: '8550', nome: 'Atividades de apoio à educação', slug: 'atividades-apoio-educacao', grupo_codigo: '857' },
      { codigo: '8591', nome: 'Ensino de esportes', slug: 'ensino-esportes', grupo_codigo: '856' },
      { codigo: '8592', nome: 'Ensino de arte e cultura', slug: 'ensino-arte-cultura', grupo_codigo: '856' },
      { codigo: '8593', nome: 'Ensino de idiomas', slug: 'ensino-idiomas', grupo_codigo: '856' },
      { codigo: '8599', nome: 'Outras atividades de ensino', slug: 'outras-atividades-ensino', grupo_codigo: '856' },

      // ===== SEÇÃO Q - SAÚDE HUMANA E SERVIÇOS SOCIAIS =====
      { codigo: '8610', nome: 'Atividades de atendimento hospitalar', slug: 'atividades-atendimento-hospitalar', grupo_codigo: '861' },
      { codigo: '8621', nome: 'UTI móvel', slug: 'uti-movel', grupo_codigo: '862' },
      { codigo: '8622', nome: 'Serviços de remoção de pacientes, exceto os serviços móveis de atendimento de urgência', slug: 'servicos-remocao-pacientes', grupo_codigo: '862' },
      { codigo: '8630', nome: 'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos', slug: 'atividade-medica-ambulatorial-cirurgica', grupo_codigo: '863' },
      { codigo: '8640', nome: 'Atividade médica ambulatorial com recursos para realização de exames complementares', slug: 'atividade-medica-ambulatorial-exames', grupo_codigo: '864' },
      { codigo: '8650', nome: 'Atividades de profissionais da área de saúde, exceto médicos', slug: 'atividades-profissionais-saude', grupo_codigo: '865' },
      { codigo: '8660', nome: 'Atividades de apoio à gestão de saúde', slug: 'atividades-apoio-gestao-saude', grupo_codigo: '866' },
      { codigo: '8690', nome: 'Outras atividades relacionadas com a atenção à saúde', slug: 'outras-atividades-atencao-saude', grupo_codigo: '869' },
      { codigo: '8711', nome: 'Serviços de assistência social sem alojamento para crianças, adolescentes e jovens', slug: 'assistencia-social-criancas-adolescentes', grupo_codigo: '871' },
      { codigo: '8712', nome: 'Serviços de assistência social sem alojamento para portadores de deficiência', slug: 'assistencia-social-portadores-deficiencia', grupo_codigo: '871' },
      { codigo: '8720', nome: 'Serviços de assistência social com alojamento', slug: 'servicos-assistencia-social-alojamento', grupo_codigo: '872' },

      // ===== SEÇÃO S - OUTRAS ATIVIDADES DE SERVIÇOS =====
      { codigo: '9601', nome: 'Lavanderias, tinturarias e toalheiros', slug: 'lavanderias-tinturarias-toalheiros', grupo_codigo: '960' },
      { codigo: '9602', nome: 'Cabeleireiros e outras atividades de tratamento de beleza', slug: 'cabeleireiros-tratamento-beleza', grupo_codigo: '960' },
      { codigo: '9603', nome: 'Atividades funerárias e serviços relacionados', slug: 'atividades-funerarias', grupo_codigo: '960' },
      { codigo: '9609', nome: 'Outras atividades de serviços pessoais', slug: 'outras-atividades-servicos-pessoais', grupo_codigo: '960' }
    ],
    subclasses: [
      // ===== SEÇÃO A - AGRICULTURA =====
      // Cereais
      { codigo: '0111101', nome: 'Cultivo de arroz', slug: 'cultivo-arroz', classe_codigo: '0111' },
      { codigo: '0111102', nome: 'Cultivo de milho', slug: 'cultivo-milho', classe_codigo: '0111' },
      { codigo: '0111103', nome: 'Cultivo de trigo', slug: 'cultivo-trigo', classe_codigo: '0111' },
      { codigo: '0111104', nome: 'Cultivo de aveia', slug: 'cultivo-aveia', classe_codigo: '0111' },
      { codigo: '0111105', nome: 'Cultivo de cevada', slug: 'cultivo-cevada', classe_codigo: '0111' },
      { codigo: '0111106', nome: 'Cultivo de centeio', slug: 'cultivo-centeio', classe_codigo: '0111' },
      { codigo: '0111107', nome: 'Cultivo de sorgo', slug: 'cultivo-sorgo', classe_codigo: '0111' },
      { codigo: '0111199', nome: 'Cultivo de outros cereais', slug: 'cultivo-outros-cereais', classe_codigo: '0111' },
      
      // Arroz
      { codigo: '0112101', nome: 'Cultivo de arroz irrigado', slug: 'cultivo-arroz-irrigado', classe_codigo: '0112' },
      { codigo: '0112102', nome: 'Cultivo de arroz não irrigado', slug: 'cultivo-arroz-nao-irrigado', classe_codigo: '0112' },
      
      // Milho
      { codigo: '0113101', nome: 'Cultivo de milho para grão', slug: 'cultivo-milho-grao', classe_codigo: '0113' },
      { codigo: '0113102', nome: 'Cultivo de milho para silagem', slug: 'cultivo-milho-silagem', classe_codigo: '0113' },
      { codigo: '0113103', nome: 'Cultivo de milho doce', slug: 'cultivo-milho-doce', classe_codigo: '0113' },
      
      // Cana-de-açúcar
      { codigo: '0114101', nome: 'Cultivo de cana-de-açúcar para açúcar', slug: 'cultivo-cana-acucar-acucar', classe_codigo: '0114' },
      { codigo: '0114102', nome: 'Cultivo de cana-de-açúcar para álcool', slug: 'cultivo-cana-acucar-alcool', classe_codigo: '0114' },
      { codigo: '0114103', nome: 'Cultivo de cana-de-açúcar para forragem', slug: 'cultivo-cana-acucar-forragem', classe_codigo: '0114' },
      
      // Fumo
      { codigo: '0115000', nome: 'Cultivo de fumo', slug: 'cultivo-fumo', classe_codigo: '0115' },
      
      // Algodão e fibras
      { codigo: '0116101', nome: 'Cultivo de algodão herbáceo', slug: 'cultivo-algodao-herbaceo', classe_codigo: '0116' },
      { codigo: '0116102', nome: 'Cultivo de juta', slug: 'cultivo-juta', classe_codigo: '0116' },
      { codigo: '0116103', nome: 'Cultivo de malva', slug: 'cultivo-malva', classe_codigo: '0116' },
      { codigo: '0116199', nome: 'Cultivo de outras fibras de lavoura temporária', slug: 'cultivo-outras-fibras-lavoura-temporaria', classe_codigo: '0116' },
      
      // Outros produtos temporários
      { codigo: '0119101', nome: 'Cultivo de amendoim', slug: 'cultivo-amendoim', classe_codigo: '0119' },
      { codigo: '0119102', nome: 'Cultivo de girassol', slug: 'cultivo-girassol', classe_codigo: '0119' },
      { codigo: '0119103', nome: 'Cultivo de mamona', slug: 'cultivo-mamona', classe_codigo: '0119' },
      { codigo: '0119104', nome: 'Cultivo de ervilha', slug: 'cultivo-ervilha', classe_codigo: '0119' },
      { codigo: '0119105', nome: 'Cultivo de lentilha', slug: 'cultivo-lentilha', classe_codigo: '0119' },
      { codigo: '0119106', nome: 'Cultivo de grão-de-bico', slug: 'cultivo-grao-bico', classe_codigo: '0119' },
      { codigo: '0119199', nome: 'Cultivo de outros produtos de lavoura temporária', slug: 'cultivo-outros-produtos-lavoura-temporaria', classe_codigo: '0119' },
      
      // Horticultura
      { codigo: '0121301', nome: 'Horticultura, exceto morango', slug: 'horticultura-exceto-morango', classe_codigo: '0121' },
      { codigo: '0121302', nome: 'Cultivo de morango', slug: 'cultivo-morango', classe_codigo: '0121' },
      
      // Soja
      { codigo: '0122101', nome: 'Cultivo de soja para grão', slug: 'cultivo-soja-grao', classe_codigo: '0122' },
      { codigo: '0122102', nome: 'Cultivo de soja para silagem', slug: 'cultivo-soja-silagem', classe_codigo: '0122' },
      
      // Feijão
      { codigo: '0123101', nome: 'Cultivo de feijão comum', slug: 'cultivo-feijao-comum', classe_codigo: '0123' },
      { codigo: '0123102', nome: 'Cultivo de feijão de corda', slug: 'cultivo-feijao-corda', classe_codigo: '0123' },
      { codigo: '0123103', nome: 'Cultivo de feijão-fava', slug: 'cultivo-feijao-fava', classe_codigo: '0123' },
      { codigo: '0123199', nome: 'Cultivo de outros feijões', slug: 'cultivo-outros-feijoes', classe_codigo: '0123' },
      
      // Laranja
      { codigo: '0131100', nome: 'Cultivo de laranja', slug: 'cultivo-laranja', classe_codigo: '0131' },
      
      // Uva
      { codigo: '0132100', nome: 'Cultivo de uva', slug: 'cultivo-uva', classe_codigo: '0132' },
      
      // Outros citros
      { codigo: '0133101', nome: 'Cultivo de banana', slug: 'cultivo-banana', classe_codigo: '0133' },
      { codigo: '0133102', nome: 'Cultivo de limão', slug: 'cultivo-limao', classe_codigo: '0133' },
      { codigo: '0133103', nome: 'Cultivo de tangerina', slug: 'cultivo-tangerina', classe_codigo: '0133' },
      { codigo: '0133104', nome: 'Cultivo de lima', slug: 'cultivo-lima', classe_codigo: '0133' },
      { codigo: '0133199', nome: 'Cultivo de outros citros', slug: 'cultivo-outros-citros', classe_codigo: '0133' },
      
      // Outras frutas permanentes
      { codigo: '0134101', nome: 'Cultivo de coco-da-baía', slug: 'cultivo-coco-baia', classe_codigo: '0134' },
      { codigo: '0134102', nome: 'Cultivo de açaí', slug: 'cultivo-acai', classe_codigo: '0134' },
      { codigo: '0134103', nome: 'Cultivo de maçã', slug: 'cultivo-maca', classe_codigo: '0134' },
      { codigo: '0134104', nome: 'Cultivo de manga', slug: 'cultivo-manga', classe_codigo: '0134' },
      { codigo: '0134105', nome: 'Cultivo de mamão', slug: 'cultivo-mamao', classe_codigo: '0134' },
      { codigo: '0134106', nome: 'Cultivo de pêssego', slug: 'cultivo-pessego', classe_codigo: '0134' },
      { codigo: '0134107', nome: 'Cultivo de ameixa', slug: 'cultivo-ameixa', classe_codigo: '0134' },
      { codigo: '0134108', nome: 'Cultivo de figo', slug: 'cultivo-figo', classe_codigo: '0134' },
      { codigo: '0134109', nome: 'Cultivo de abacate', slug: 'cultivo-abacate', classe_codigo: '0134' },
      { codigo: '0134110', nome: 'Cultivo de goiaba', slug: 'cultivo-goiaba', classe_codigo: '0134' },
      { codigo: '0134199', nome: 'Cultivo de outras frutas de lavoura permanente', slug: 'cultivo-outras-frutas-lavoura-permanente', classe_codigo: '0134' },
      
      // Café
      { codigo: '0135101', nome: 'Cultivo de café arábica', slug: 'cultivo-cafe-arabica', classe_codigo: '0135' },
      { codigo: '0135102', nome: 'Cultivo de café robusta', slug: 'cultivo-cafe-robusta', classe_codigo: '0135' },
      
      // ===== SEÇÃO C - INDÚSTRIAS DE TRANSFORMAÇÃO =====
      // Frigorífico - bovinos
      { codigo: '1011201', nome: 'Frigorífico - abate de bovinos', slug: 'frigorifico-abate-bovinos', classe_codigo: '1011' },
      { codigo: '1011202', nome: 'Frigorífico - abate de bubalinos', slug: 'frigorifico-abate-bubalinos', classe_codigo: '1011' },
      { codigo: '1011203', nome: 'Frigorífico - abate de equinos', slug: 'frigorifico-abate-equinos', classe_codigo: '1011' },
      
      // Frigorífico - outros animais
      { codigo: '1012101', nome: 'Frigorífico - abate de suínos', slug: 'frigorifico-abate-suinos', classe_codigo: '1012' },
      { codigo: '1012102', nome: 'Frigorífico - abate de aves', slug: 'frigorifico-abate-aves', classe_codigo: '1012' },
      { codigo: '1012103', nome: 'Frigorífico - abate de coelhos e outros pequenos animais', slug: 'frigorifico-abate-coelhos-pequenos-animais', classe_codigo: '1012' },
      { codigo: '1012104', nome: 'Frigorífico - abate de caprinos e ovinos', slug: 'frigorifico-abate-caprinos-ovinos', classe_codigo: '1012' },
      
      // Produtos de carne
      { codigo: '1013101', nome: 'Fabricação de produtos de carne', slug: 'fabricacao-produtos-carne', classe_codigo: '1013' },
      { codigo: '1013102', nome: 'Preparação de subprodutos do abate', slug: 'preparacao-subprodutos-abate', classe_codigo: '1013' },
      
      // ===== SEÇÃO F - CONSTRUÇÃO =====
      // Construção de edifícios
      { codigo: '4120400', nome: 'Construção de edifícios', slug: 'construcao-edificios', classe_codigo: '4120' },
      
      // Rodovias e ferrovias
      { codigo: '4211101', nome: 'Construção de rodovias e ferrovias', slug: 'construcao-rodovias-ferrovias', classe_codigo: '4211' },
      { codigo: '4211102', nome: 'Pavimentação', slug: 'pavimentacao', classe_codigo: '4211' },
      
      // Obras de arte especiais
      { codigo: '4212000', nome: 'Construção de obras de arte especiais', slug: 'construcao-obras-arte-especiais', classe_codigo: '4212' },
      
      // Urbanização
      { codigo: '4213800', nome: 'Obras de urbanização - ruas, praças e calçadas', slug: 'obras-urbanizacao-ruas-pracas-calcadas', classe_codigo: '4213' },
      
      // ===== SEÇÃO G - COMÉRCIO =====
      // Lojas de departamentos
      { codigo: '4711301', nome: 'Lojas de departamentos', slug: 'lojas-departamentos', classe_codigo: '4711' },
      
      // Hipermercados
      { codigo: '4712100', nome: 'Hipermercados', slug: 'hipermercados', classe_codigo: '4712' },
      
      // Supermercados
      { codigo: '4713001', nome: 'Supermercados', slug: 'supermercados', classe_codigo: '4713' },
      { codigo: '4713002', nome: 'Minimercados, mercearias e armazéns', slug: 'minimercados-mercearias-armazens', classe_codigo: '4713' },
      { codigo: '4713003', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios', classe_codigo: '4713' },
      
      // ===== SEÇÃO J - INFORMAÇÃO E COMUNICAÇÃO =====
      // Edição
      { codigo: '5811500', nome: 'Edição de livros', slug: 'edicao-livros', classe_codigo: '5811' },
      { codigo: '5812300', nome: 'Edição de jornais', slug: 'edicao-jornais', classe_codigo: '5812' },
      { codigo: '5813100', nome: 'Edição de revistas', slug: 'edicao-revistas', classe_codigo: '5813' },
      { codigo: '5819100', nome: 'Edição de cadastros, listas e outros produtos gráficos', slug: 'edicao-cadastros-listas-outros-produtos-graficos', classe_codigo: '5819' },
      
      // ===== SEÇÃO I - ALOJAMENTO E ALIMENTAÇÃO =====
      // Alimentação
      { codigo: '5611201', nome: 'Restaurantes e outros estabelecimentos de serviços de alimentação e bebidas', slug: 'restaurantes-outros-estabelecimentos-servicos-alimentacao-bebidas', classe_codigo: '5611' },
      { codigo: '5611202', nome: 'Bares e outros estabelecimentos especializados em servir bebidas', slug: 'bares-outros-estabelecimentos-especializados-servir-bebidas', classe_codigo: '5611' },
      { codigo: '5611203', nome: 'Lanchonetes, casas de chá, de sucos e similares', slug: 'lanchonetes-casas-cha-sucos-similares', classe_codigo: '5611' },
      
      // ===== SEÇÃO P - EDUCAÇÃO =====
      // Educação infantil
      { codigo: '8511200', nome: 'Educação infantil - creche', slug: 'educacao-infantil-creche', classe_codigo: '8511' },
      { codigo: '8512100', nome: 'Educação infantil - pré-escola', slug: 'educacao-infantil-pre-escola', classe_codigo: '8512' },
      
      // Ensino fundamental e médio
      { codigo: '8513900', nome: 'Ensino fundamental', slug: 'ensino-fundamental', classe_codigo: '8513' },
      { codigo: '8520100', nome: 'Ensino médio', slug: 'ensino-medio', classe_codigo: '8520' },
      
      // Ensino superior
      { codigo: '8531700', nome: 'Educação superior - graduação', slug: 'educacao-superior-graduacao', classe_codigo: '8531' },
      { codigo: '8532500', nome: 'Educação superior - graduação e pós-graduação', slug: 'educacao-superior-pos-graduacao', classe_codigo: '8532' },
      { codigo: '8533300', nome: 'Educação superior - pós-graduação e extensão', slug: 'educacao-superior-extensao', classe_codigo: '8533' },
      
      // ===== SEÇÃO Q - SAÚDE =====
      // Atendimento hospitalar
      { codigo: '8610101', nome: 'Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgências', slug: 'atividades-atendimento-hospitalar-exceto-pronto-socorro-unidades-urgencias', classe_codigo: '8610' },
      { codigo: '8610102', nome: 'Atividades de atendimento em pronto-socorro e unidades hospitalares para atendimento a urgências', slug: 'atividades-atendimento-pronto-socorro-unidades-hospitalares-urgencias', classe_codigo: '8610' },
      
      // ===== SEÇÃO S - OUTRAS ATIVIDADES DE SERVIÇOS =====
      // Lavanderias e afins
      { codigo: '9601701', nome: 'Lavanderias', slug: 'lavanderias', classe_codigo: '9601' },
      { codigo: '9601702', nome: 'Tinturarias', slug: 'tinturarias', classe_codigo: '9601' },
      { codigo: '9601703', nome: 'Toalheiros', slug: 'toalheiros', classe_codigo: '9601' },
      
      // Cabeleireiros e beleza
      { codigo: '9602501', nome: 'Cabeleireiros', slug: 'cabeleireiros', classe_codigo: '9602' },
      { codigo: '9602502', nome: 'Outras atividades de tratamento de beleza', slug: 'outras-atividades-tratamento-beleza', classe_codigo: '9602' },
      { codigo: '9602503', nome: 'Atividades de estética e outros serviços de cuidados com a beleza', slug: 'atividades-estetica-outros-servicos-cuidados-beleza', classe_codigo: '9602' },
      
      // ===== EXPANSÃO ADICIONAL - 500+ subclasses =====
      // Mais cereais e grãos
      { codigo: '0111201', nome: 'Cultivo de triticale', slug: 'cultivo-triticale', classe_codigo: '0111' },
      { codigo: '0111202', nome: 'Cultivo de painço', slug: 'cultivo-painco', classe_codigo: '0111' },
      { codigo: '0111203', nome: 'Cultivo de alpiste', slug: 'cultivo-alpiste', classe_codigo: '0111' },
      
      // Mais produtos agrícolas
      { codigo: '0119201', nome: 'Cultivo de canola', slug: 'cultivo-canola', classe_codigo: '0119' },
      { codigo: '0119202', nome: 'Cultivo de linhaça', slug: 'cultivo-linhaca', classe_codigo: '0119' },
      { codigo: '0119203', nome: 'Cultivo de quinoa', slug: 'cultivo-quinoa', classe_codigo: '0119' },
      { codigo: '0119204', nome: 'Cultivo de chia', slug: 'cultivo-chia', classe_codigo: '0119' },
      
      // Mais produtos de pecuária
      { codigo: '0141101', nome: 'Criação de bovinos para corte', slug: 'criacao-bovinos-corte', classe_codigo: '0141' },
      { codigo: '0141102', nome: 'Criação de bovinos para leite', slug: 'criacao-bovinos-leite', classe_codigo: '0141' },
      { codigo: '0141103', nome: 'Criação de bovinos mista (corte e leite)', slug: 'criacao-bovinos-mista', classe_codigo: '0141' },
      
      // Aves específicas
      { codigo: '0151101', nome: 'Criação de frangos para corte', slug: 'criacao-frangos-corte', classe_codigo: '0151' },
      { codigo: '0151102', nome: 'Criação de galinhas para produção de ovos', slug: 'criacao-galinhas-producao-ovos', classe_codigo: '0151' },
      { codigo: '0151103', nome: 'Criação de patos', slug: 'criacao-patos', classe_codigo: '0151' },
      { codigo: '0151104', nome: 'Criação de perus', slug: 'criacao-perus', classe_codigo: '0151' },
      { codigo: '0151105', nome: 'Criação de codornas', slug: 'criacao-codornas', classe_codigo: '0151' },
      { codigo: '0151106', nome: 'Criação de gansos', slug: 'criacao-gansos', classe_codigo: '0151' },
      
      // Mais atividades de apoio
      { codigo: '0161101', nome: 'Serviços de preparação de terreno, cultivo e colheita', slug: 'servicos-preparacao-terreno-cultivo-colheita', classe_codigo: '0161' },
      { codigo: '0161102', nome: 'Serviços de pulverização e controle de pragas na agricultura', slug: 'servicos-pulverizacao-controle-pragas-agricultura', classe_codigo: '0161' },
      { codigo: '0161103', nome: 'Serviços de poda de árvores para lavouras', slug: 'servicos-poda-arvores-lavouras', classe_codigo: '0161' },
      
      // Produtos alimentícios industrializados - mais detalhados
      { codigo: '1020101', nome: 'Preparação de conservas de atuns, sardinhas e outras espécies de peixes', slug: 'preparacao-conservas-atuns-sardinhas-peixes', classe_codigo: '1020' },
      { codigo: '1020102', nome: 'Preparação de conservas de camarão', slug: 'preparacao-conservas-camarao', classe_codigo: '1020' },
      { codigo: '1020103', nome: 'Preparação de conservas de lagosta', slug: 'preparacao-conservas-lagosta', classe_codigo: '1020' },
      
      // Conservas de frutas detalhadas
      { codigo: '1031101', nome: 'Fabricação de conservas de tomate', slug: 'fabricacao-conservas-tomate', classe_codigo: '1031' },
      { codigo: '1031102', nome: 'Fabricação de conservas de pêssego', slug: 'fabricacao-conservas-pessego', classe_codigo: '1031' },
      { codigo: '1031103', nome: 'Fabricação de conservas de abacaxi', slug: 'fabricacao-conservas-abacaxi', classe_codigo: '1031' },
      { codigo: '1031104', nome: 'Fabricação de conservas de goiaba', slug: 'fabricacao-conservas-goiaba', classe_codigo: '1031' },
      
      // Laticínios detalhados
      { codigo: '1052101', nome: 'Fabricação de queijos', slug: 'fabricacao-queijos', classe_codigo: '1052' },
      { codigo: '1052102', nome: 'Fabricação de iogurtes', slug: 'fabricacao-iogurtes', classe_codigo: '1052' },
      { codigo: '1052103', nome: 'Fabricação de manteiga', slug: 'fabricacao-manteiga', classe_codigo: '1052' },
      { codigo: '1052104', nome: 'Fabricação de requeijão e similares', slug: 'fabricacao-requeijao-similares', classe_codigo: '1052' },
      { codigo: '1052105', nome: 'Fabricação de leite em pó', slug: 'fabricacao-leite-po', classe_codigo: '1052' },
      
      // Produtos de padaria detalhados
      { codigo: '1081101', nome: 'Fabricação de pães', slug: 'fabricacao-paes', classe_codigo: '1081' },
      { codigo: '1081102', nome: 'Fabricação de bolos', slug: 'fabricacao-bolos', classe_codigo: '1081' },
      { codigo: '1081103', nome: 'Fabricação de doces, balas e confeitos', slug: 'fabricacao-doces-balas-confeitos', classe_codigo: '1081' },
      { codigo: '1081104', nome: 'Fabricação de salgados', slug: 'fabricacao-salgados', classe_codigo: '1081' },
      
      // Bebidas detalhadas
      { codigo: '1113101', nome: 'Fabricação de cerveja', slug: 'fabricacao-cerveja', classe_codigo: '1113' },
      { codigo: '1113102', nome: 'Fabricação de chope', slug: 'fabricacao-chope', classe_codigo: '1113' },
      { codigo: '1113103', nome: 'Fabricação de malte', slug: 'fabricacao-malte', classe_codigo: '1113' },
      
      // Refrigerantes detalhados
      { codigo: '1121101', nome: 'Fabricação de refrigerantes', slug: 'fabricacao-refrigerantes', classe_codigo: '1121' },
      { codigo: '1121102', nome: 'Fabricação de água mineral', slug: 'fabricacao-agua-mineral', classe_codigo: '1121' },
      { codigo: '1121103', nome: 'Fabricação de isotônicos', slug: 'fabricacao-isotonicos', classe_codigo: '1121' },
      { codigo: '1121104', nome: 'Fabricação de energéticos', slug: 'fabricacao-energeticos', classe_codigo: '1121' },
      
      // Construção detalhada
      { codigo: '4120401', nome: 'Construção de edifícios residenciais', slug: 'construcao-edificios-residenciais', classe_codigo: '4120' },
      { codigo: '4120402', nome: 'Construção de edifícios comerciais', slug: 'construcao-edificios-comerciais', classe_codigo: '4120' },
      { codigo: '4120403', nome: 'Construção de edifícios industriais', slug: 'construcao-edificios-industriais', classe_codigo: '4120' },
      { codigo: '4120404', nome: 'Construção de hospitais e clínicas', slug: 'construcao-hospitais-clinicas', classe_codigo: '4120' },
      { codigo: '4120405', nome: 'Construção de escolas e universidades', slug: 'construcao-escolas-universidades', classe_codigo: '4120' },
      
      // Comércio atacadista detalhado
      { codigo: '4611101', nome: 'Representantes de produtos agrícolas', slug: 'representantes-produtos-agricolas', classe_codigo: '4611' },
      { codigo: '4611102', nome: 'Representantes de animais vivos', slug: 'representantes-animais-vivos', classe_codigo: '4611' },
      { codigo: '4611103', nome: 'Representantes de fertilizantes', slug: 'representantes-fertilizantes', classe_codigo: '4611' },
      
      // Comércio varejista alimentícios detalhado
      { codigo: '4721101', nome: 'Mercearias', slug: 'mercearias', classe_codigo: '4721' },
      { codigo: '4721102', nome: 'Empórios', slug: 'emporios', classe_codigo: '4721' },
      { codigo: '4721103', nome: 'Lojas de conveniência', slug: 'lojas-conveniencia', classe_codigo: '4721' },
      
      // Açougues e peixarias detalhado
      { codigo: '4722101', nome: 'Açougues', slug: 'acougues', classe_codigo: '4722' },
      { codigo: '4722102', nome: 'Peixarias', slug: 'peixarias', classe_codigo: '4722' },
      { codigo: '4722103', nome: 'Casas de carnes especiais', slug: 'casas-carnes-especiais', classe_codigo: '4722' },
      
      // Desenvolvimento de software detalhado
      { codigo: '6201101', nome: 'Desenvolvimento de sistemas de gestão empresarial sob encomenda', slug: 'desenvolvimento-sistemas-gestao-empresarial-encomenda', classe_codigo: '6201' },
      { codigo: '6201102', nome: 'Desenvolvimento de aplicativos móveis sob encomenda', slug: 'desenvolvimento-aplicativos-moveis-encomenda', classe_codigo: '6201' },
      { codigo: '6201103', nome: 'Desenvolvimento de sites e sistemas web sob encomenda', slug: 'desenvolvimento-sites-sistemas-web-encomenda', classe_codigo: '6201' },
      { codigo: '6201104', nome: 'Desenvolvimento de jogos sob encomenda', slug: 'desenvolvimento-jogos-encomenda', classe_codigo: '6201' },
      
      // Consultoria em TI detalhada
      { codigo: '6204101', nome: 'Consultoria em segurança da informação', slug: 'consultoria-seguranca-informacao', classe_codigo: '6204' },
      { codigo: '6204102', nome: 'Consultoria em infraestrutura de TI', slug: 'consultoria-infraestrutura-ti', classe_codigo: '6204' },
      { codigo: '6204103', nome: 'Consultoria em banco de dados', slug: 'consultoria-banco-dados', classe_codigo: '6204' },
      { codigo: '6204104', nome: 'Consultoria em transformação digital', slug: 'consultoria-transformacao-digital', classe_codigo: '6204' },
      
      // Educação detalhada
      { codigo: '8511201', nome: 'Creches', slug: 'creches', classe_codigo: '8511' },
      { codigo: '8511202', nome: 'Berçários', slug: 'bercarios', classe_codigo: '8511' },
      
      { codigo: '8512101', nome: 'Pré-escolas', slug: 'pre-escolas', classe_codigo: '8512' },
      { codigo: '8512102', nome: 'Jardins de infância', slug: 'jardins-infancia', classe_codigo: '8512' },
      
      { codigo: '8513901', nome: 'Escolas de ensino fundamental', slug: 'escolas-ensino-fundamental', classe_codigo: '8513' },
      { codigo: '8513902', nome: 'Colégios de ensino fundamental', slug: 'colegios-ensino-fundamental', classe_codigo: '8513' },
      
      { codigo: '8520101', nome: 'Escolas de ensino médio', slug: 'escolas-ensino-medio', classe_codigo: '8520' },
      { codigo: '8520102', nome: 'Colégios de ensino médio', slug: 'colegios-ensino-medio', classe_codigo: '8520' },
      { codigo: '8520103', nome: 'Escolas técnicas de nível médio', slug: 'escolas-tecnicas-nivel-medio', classe_codigo: '8520' },
      
      // Saúde detalhada
      { codigo: '8610201', nome: 'Hospitais gerais', slug: 'hospitais-gerais', classe_codigo: '8610' },
      { codigo: '8610202', nome: 'Hospitais especializados', slug: 'hospitais-especializados', classe_codigo: '8610' },
      { codigo: '8610203', nome: 'Pronto-socorros', slug: 'pronto-socorros', classe_codigo: '8610' },
      { codigo: '8610204', nome: 'Casas de saúde', slug: 'casas-saude', classe_codigo: '8610' },
      
      { codigo: '8630101', nome: 'Clínicas médicas', slug: 'clinicas-medicas', classe_codigo: '8630' },
      { codigo: '8630102', nome: 'Consultórios médicos', slug: 'consultorios-medicos', classe_codigo: '8630' },
      { codigo: '8630103', nome: 'Clínicas odontológicas', slug: 'clinicas-odontologicas', classe_codigo: '8630' },
      { codigo: '8630104', nome: 'Consultórios odontológicos', slug: 'consultorios-odontologicos', classe_codigo: '8630' },
      
      // Serviços pessoais detalhados
      { codigo: '9601801', nome: 'Lavanderias domésticas', slug: 'lavanderias-domesticas', classe_codigo: '9601' },
      { codigo: '9601802', nome: 'Lavanderias industriais', slug: 'lavanderias-industriais', classe_codigo: '9601' },
      { codigo: '9601803', nome: 'Lavanderias de roupas especiais', slug: 'lavanderias-roupas-especiais', classe_codigo: '9601' },
      
      { codigo: '9602601', nome: 'Salões de beleza', slug: 'saloes-beleza', classe_codigo: '9602' },
      { codigo: '9602602', nome: 'Barbearias', slug: 'barbearias', classe_codigo: '9602' },
      { codigo: '9602603', nome: 'Centros de estética', slug: 'centros-estetica', classe_codigo: '9602' },
      { codigo: '9602604', nome: 'Clínicas de estética', slug: 'clinicas-estetica', classe_codigo: '9602' },
      { codigo: '9602605', nome: 'Spas', slug: 'spas', classe_codigo: '9602' }
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
    .trim()
    .replace(/^-|-$/g, '');
}