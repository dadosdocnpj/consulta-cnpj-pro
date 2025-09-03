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
      { codigo: '017', nome: 'Caça e atividades de serviços relacionados', divisao_codigo: '01', slug: 'caca-atividades-servicos-relacionados' },
      
      // Divisão 02 - Produção florestal
      { codigo: '021', nome: 'Produção florestal - florestas plantadas', divisao_codigo: '02', slug: 'producao-florestal-florestas-plantadas' },
      { codigo: '022', nome: 'Produção florestal - florestas nativas', divisao_codigo: '02', slug: 'producao-florestal-florestas-nativas' },
      { codigo: '023', nome: 'Atividades de apoio à produção florestal', divisao_codigo: '02', slug: 'atividades-apoio-producao-florestal' },
      
      // Divisão 03 - Pesca e aquicultura
      { codigo: '031', nome: 'Pesca', divisao_codigo: '03', slug: 'pesca' },
      { codigo: '032', nome: 'Aquicultura', divisao_codigo: '03', slug: 'aquicultura' },
      
      // Divisão 05 - Extração de carvão mineral
      { codigo: '051', nome: 'Extração de carvão mineral', divisao_codigo: '05', slug: 'extracao-carvao-mineral' },
      
      // Divisão 06 - Extração de petróleo e gás natural
      { codigo: '061', nome: 'Extração de petróleo e gás natural', divisao_codigo: '06', slug: 'extracao-petroleo-gas-natural' },
      
      // Divisão 07 - Extração de minerais metálicos
      { codigo: '071', nome: 'Extração de minério de ferro', divisao_codigo: '07', slug: 'extracao-minerio-ferro' },
      { codigo: '072', nome: 'Extração de minerais metálicos não-ferrosos', divisao_codigo: '07', slug: 'extracao-minerais-metalicos-nao-ferrosos' },
      
      // Divisão 08 - Extração de minerais não-metálicos
      { codigo: '081', nome: 'Extração de pedra, areia e argila', divisao_codigo: '08', slug: 'extracao-pedra-areia-argila' },
      { codigo: '089', nome: 'Extração de outros minerais não-metálicos', divisao_codigo: '08', slug: 'extracao-outros-minerais-nao-metalicos' },
      
      // Divisão 09 - Atividades de apoio à extração de minerais
      { codigo: '091', nome: 'Atividades de apoio à extração de petróleo e gás natural', divisao_codigo: '09', slug: 'atividades-apoio-extracao-petroleo-gas-natural' },
      { codigo: '099', nome: 'Atividades de apoio à extração de outros minerais', divisao_codigo: '09', slug: 'atividades-apoio-extracao-outros-minerais' },
      
      // Indústrias de transformação - Seção C (principais grupos)
      { codigo: '101', nome: 'Abate e fabricação de produtos de carne', divisao_codigo: '10', slug: 'abate-fabricacao-produtos-carne' },
      { codigo: '102', nome: 'Preservação do pescado e fabricação de produtos do pescado', divisao_codigo: '10', slug: 'preservacao-pescado-fabricacao-produtos-pescado' },
      { codigo: '103', nome: 'Fabricação de conservas de frutas, legumes e outros vegetais', divisao_codigo: '10', slug: 'fabricacao-conservas-frutas-legumes-outros-vegetais' },
      { codigo: '104', nome: 'Fabricação de óleos e gorduras vegetais e animais', divisao_codigo: '10', slug: 'fabricacao-oleos-gorduras-vegetais-animais' },
      { codigo: '105', nome: 'Laticínios', divisao_codigo: '10', slug: 'laticinios' },
      { codigo: '106', nome: 'Moagem, fabricação de produtos amiláceos e de alimentos para animais', divisao_codigo: '10', slug: 'moagem-fabricacao-produtos-amilaceos-alimentos-animais' },
      { codigo: '107', nome: 'Fabricação de produtos de panificação', divisao_codigo: '10', slug: 'fabricacao-produtos-panificacao' },
      { codigo: '108', nome: 'Fabricação de açúcar', divisao_codigo: '10', slug: 'fabricacao-acucar' },
      { codigo: '109', nome: 'Fabricação de outros produtos alimentícios', divisao_codigo: '10', slug: 'fabricacao-outros-produtos-alimenticios' },
      
      { codigo: '111', nome: 'Fabricação de bebidas alcoólicas', divisao_codigo: '11', slug: 'fabricacao-bebidas-alcoolicas' },
      { codigo: '112', nome: 'Fabricação de bebidas não-alcoólicas', divisao_codigo: '11', slug: 'fabricacao-bebidas-nao-alcoolicas' },
      
      { codigo: '121', nome: 'Processamento industrial do fumo', divisao_codigo: '12', slug: 'processamento-industrial-fumo' },
      { codigo: '122', nome: 'Fabricação de produtos do fumo', divisao_codigo: '12', slug: 'fabricacao-produtos-fumo' },
      
      { codigo: '131', nome: 'Preparação e fiação de fibras têxteis', divisao_codigo: '13', slug: 'preparacao-fiacao-fibras-texteis' },
      { codigo: '132', nome: 'Tecelagem, exceto malha', divisao_codigo: '13', slug: 'tecelagem-exceto-malha' },
      { codigo: '133', nome: 'Fabricação de tecidos de malha', divisao_codigo: '13', slug: 'fabricacao-tecidos-malha' },
      { codigo: '134', nome: 'Acabamentos em fios, tecidos e artigos têxteis', divisao_codigo: '13', slug: 'acabamentos-fios-tecidos-artigos-texteis' },
      { codigo: '135', nome: 'Fabricação de outros produtos têxteis', divisao_codigo: '13', slug: 'fabricacao-outros-produtos-texteis' },
      
      { codigo: '141', nome: 'Confecção de artigos do vestuário', divisao_codigo: '14', slug: 'confeccao-artigos-vestuario' },
      { codigo: '142', nome: 'Fabricação de artigos de malharia e tricotagem', divisao_codigo: '14', slug: 'fabricacao-artigos-malharia-tricotagem' },
      { codigo: '143', nome: 'Fabricação de artigos de tecido não-tecido e de outros têxteis técnicos e industriais', divisao_codigo: '14', slug: 'fabricacao-artigos-tecido-nao-tecido-outros-texteis-tecnicos' },
      
      // Principais grupos de comércio e serviços
      { codigo: '451', nome: 'Comércio de veículos automotores', divisao_codigo: '45', slug: 'comercio-veiculos-automotores' },
      { codigo: '452', nome: 'Manutenção e reparação de veículos automotores', divisao_codigo: '45', slug: 'manutencao-reparacao-veiculos-automotores' },
      { codigo: '453', nome: 'Comércio de peças e acessórios para veículos automotores', divisao_codigo: '45', slug: 'comercio-pecas-acessorios-veiculos-automotores' },
      { codigo: '454', nome: 'Comércio, manutenção e reparação de motocicletas, peças e acessórios', divisao_codigo: '45', slug: 'comercio-manutencao-reparacao-motocicletas-pecas-acessorios' },
      
      { codigo: '471', nome: 'Comércio varejista não-especializado', divisao_codigo: '47', slug: 'comercio-varejista-nao-especializado' },
      { codigo: '472', nome: 'Comércio varejista de produtos alimentícios, bebidas e fumo', divisao_codigo: '47', slug: 'comercio-varejista-produtos-alimenticios-bebidas-fumo' },
      { codigo: '473', nome: 'Comércio varejista de combustíveis para veículos automotores', divisao_codigo: '47', slug: 'comercio-varejista-combustiveis-veiculos-automotores' },
      { codigo: '474', nome: 'Comércio varejista de material de construção', divisao_codigo: '47', slug: 'comercio-varejista-material-construcao' },
      { codigo: '475', nome: 'Comércio varejista de equipamentos de informática e comunicação; equipamentos e artigos de uso doméstico', divisao_codigo: '47', slug: 'comercio-varejista-equipamentos-informatica-comunicacao-artigos-uso-domestico' },
      { codigo: '476', nome: 'Comércio varejista de artigos culturais, recreativos e esportivos', divisao_codigo: '47', slug: 'comercio-varejista-artigos-culturais-recreativos-esportivos' },
      { codigo: '477', nome: 'Comércio varejista de produtos farmacêuticos, perfumaria e cosméticos e artigos médicos e ortopédicos', divisao_codigo: '47', slug: 'comercio-varejista-produtos-farmaceuticos-perfumaria-cosmeticos-artigos-medicos' },
      { codigo: '478', nome: 'Comércio varejista de produtos novos não especificados anteriormente e de produtos usados', divisao_codigo: '47', slug: 'comercio-varejista-produtos-novos-nao-especificados-produtos-usados' },
      
      { codigo: '621', nome: 'Atividades dos serviços de tecnologia da informação', divisao_codigo: '62', slug: 'atividades-servicos-tecnologia-informacao' },
      
      { codigo: '691', nome: 'Atividades jurídicas', divisao_codigo: '69', slug: 'atividades-juridicas' },
      { codigo: '692', nome: 'Atividades de contabilidade, consultoria e auditoria contábil e tributária', divisao_codigo: '69', slug: 'atividades-contabilidade-consultoria-auditoria-contabil-tributaria' },
    ],
    classes: [
      // Grupo 011 - Produção de lavouras temporárias
      { codigo: '0111', nome: 'Cultivo de cereais', grupo_codigo: '011', slug: 'cultivo-cereais' },
      { codigo: '0112', nome: 'Cultivo de algodão herbáceo e de outras fibras de lavoura temporária', grupo_codigo: '011', slug: 'cultivo-algodao-herbaceo-outras-fibras-lavoura-temporaria' },
      { codigo: '0113', nome: 'Cultivo de cana-de-açúcar', grupo_codigo: '011', slug: 'cultivo-cana-acucar' },
      { codigo: '0114', nome: 'Cultivo de fumo', grupo_codigo: '011', slug: 'cultivo-fumo' },
      { codigo: '0115', nome: 'Cultivo de soja', grupo_codigo: '011', slug: 'cultivo-soja' },
      { codigo: '0116', nome: 'Cultivo de oleaginosas de lavoura temporária, exceto soja', grupo_codigo: '011', slug: 'cultivo-oleaginosas-lavoura-temporaria-exceto-soja' },
      { codigo: '0119', nome: 'Cultivo de plantas de lavoura temporária não especificadas anteriormente', grupo_codigo: '011', slug: 'cultivo-plantas-lavoura-temporaria-nao-especificadas' },
      
      // Grupo 012 - Horticultura e floricultura
      { codigo: '0121', nome: 'Horticultura', grupo_codigo: '012', slug: 'horticultura' },
      { codigo: '0122', nome: 'Cultivo de flores e plantas ornamentais', grupo_codigo: '012', slug: 'cultivo-flores-plantas-ornamentais' },
      
      // Grupo 013 - Produção de lavouras permanentes
      { codigo: '0131', nome: 'Cultivo de laranja', grupo_codigo: '013', slug: 'cultivo-laranja' },
      { codigo: '0132', nome: 'Cultivo de outras frutas cítricas', grupo_codigo: '013', slug: 'cultivo-outras-frutas-citricas' },
      { codigo: '0133', nome: 'Cultivo de café', grupo_codigo: '013', slug: 'cultivo-cafe' },
      { codigo: '0134', nome: 'Cultivo de cacau', grupo_codigo: '013', slug: 'cultivo-cacau' },
      { codigo: '0135', nome: 'Cultivo de açaí', grupo_codigo: '013', slug: 'cultivo-acai' },
      { codigo: '0139', nome: 'Cultivo de frutas de lavoura permanente não especificadas anteriormente', grupo_codigo: '013', slug: 'cultivo-frutas-lavoura-permanente-nao-especificadas' },
      
      // Grupo 014 - Pecuária
      { codigo: '0141', nome: 'Criação de bovinos', grupo_codigo: '014', slug: 'criacao-bovinos' },
      { codigo: '0142', nome: 'Criação de outros animais de grande porte', grupo_codigo: '014', slug: 'criacao-outros-animais-grande-porte' },
      { codigo: '0143', nome: 'Criação de caprinos e ovinos', grupo_codigo: '014', slug: 'criacao-caprinos-ovinos' },
      { codigo: '0144', nome: 'Criação de suínos', grupo_codigo: '014', slug: 'criacao-suinos' },
      { codigo: '0145', nome: 'Criação de aves', grupo_codigo: '014', slug: 'criacao-aves' },
      { codigo: '0146', nome: 'Criação de animais aquáticos em água doce', grupo_codigo: '014', slug: 'criacao-animais-aquaticos-agua-doce' },
      { codigo: '0147', nome: 'Criação de animais aquáticos em água salgada', grupo_codigo: '014', slug: 'criacao-animais-aquaticos-agua-salgada' },
      { codigo: '0149', nome: 'Criação de outros animais não especificados anteriormente', grupo_codigo: '014', slug: 'criacao-outros-animais-nao-especificados' },
      
      // Principais classes de comércio
      { codigo: '4511', nome: 'Comércio a varejo de automóveis, camionetas e utilitários novos', grupo_codigo: '451', slug: 'comercio-varejo-automoveis-camionetas-utilitarios-novos' },
      { codigo: '4512', nome: 'Comércio a varejo de automóveis, camionetas e utilitários usados', grupo_codigo: '451', slug: 'comercio-varejo-automoveis-camionetas-utilitarios-usados' },
      
      { codigo: '4721', nome: 'Comércio varejista de produtos farmacêuticos, sem manipulação de fórmulas', grupo_codigo: '472', slug: 'comercio-varejista-produtos-farmaceuticos-sem-manipulacao-formulas' },
      { codigo: '4722', nome: 'Comércio varejista de produtos farmacêuticos, com manipulação de fórmulas', grupo_codigo: '472', slug: 'comercio-varejista-produtos-farmaceuticos-com-manipulacao-formulas' },
      { codigo: '4723', nome: 'Comércio varejista de produtos farmacêuticos homeopáticos', grupo_codigo: '472', slug: 'comercio-varejista-produtos-farmaceuticos-homeopaticos' },
      { codigo: '4724', nome: 'Comércio varejista de produtos farmacêuticos veterinários', grupo_codigo: '472', slug: 'comercio-varejista-produtos-farmaceuticos-veterinarios' },
      
      { codigo: '4731', nome: 'Comércio varejista de combustíveis para veículos automotores', grupo_codigo: '473', slug: 'comercio-varejista-combustiveis-veiculos-automotores' },
      
      // Tecnologia da informação
      { codigo: '6201', nome: 'Desenvolvimento de programas de computador sob encomenda', grupo_codigo: '621', slug: 'desenvolvimento-programas-computador-sob-encomenda' },
      { codigo: '6202', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', grupo_codigo: '621', slug: 'desenvolvimento-licenciamento-programas-computador-customizaveis' },
      { codigo: '6203', nome: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis', grupo_codigo: '621', slug: 'desenvolvimento-licenciamento-programas-computador-nao-customizaveis' },
      { codigo: '6204', nome: 'Consultoria em tecnologia da informação', grupo_codigo: '621', slug: 'consultoria-tecnologia-informacao' },
      { codigo: '6209', nome: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação', grupo_codigo: '621', slug: 'suporte-tecnico-manutencao-outros-servicos-tecnologia-informacao' },
      
      // Atividades jurídicas
      { codigo: '6911', nome: 'Atividades jurídicas', grupo_codigo: '691', slug: 'atividades-juridicas' },
      
      // Contabilidade
      { codigo: '6920', nome: 'Atividades de contabilidade, consultoria e auditoria contábil e tributária', grupo_codigo: '692', slug: 'atividades-contabilidade-consultoria-auditoria-contabil-tributaria' },
    ],
    subclasses: [
      // Classe 0111 - Cultivo de cereais
      { codigo: '0111301', nome: 'Cultivo de arroz', classe_codigo: '0111', slug: 'cultivo-arroz', is_principal: true },
      { codigo: '0111302', nome: 'Cultivo de milho', classe_codigo: '0111', slug: 'cultivo-milho', is_principal: true },
      { codigo: '0111303', nome: 'Cultivo de trigo', classe_codigo: '0111', slug: 'cultivo-trigo', is_principal: false },
      { codigo: '0111399', nome: 'Cultivo de outros cereais não especificados anteriormente', classe_codigo: '0111', slug: 'cultivo-outros-cereais-nao-especificados', is_principal: false },
      
      // Classe 0112 - Cultivo de algodão herbáceo e de outras fibras de lavoura temporária
      { codigo: '0112101', nome: 'Cultivo de algodão herbáceo', classe_codigo: '0112', slug: 'cultivo-algodao-herbaceo', is_principal: true },
      { codigo: '0112199', nome: 'Cultivo de outras fibras de lavoura temporária', classe_codigo: '0112', slug: 'cultivo-outras-fibras-lavoura-temporaria', is_principal: false },
      
      // Classe 0113 - Cultivo de cana-de-açúcar
      { codigo: '0113000', nome: 'Cultivo de cana-de-açúcar', classe_codigo: '0113', slug: 'cultivo-cana-acucar', is_principal: true },
      
      // Classe 0114 - Cultivo de fumo
      { codigo: '0114000', nome: 'Cultivo de fumo', classe_codigo: '0114', slug: 'cultivo-fumo', is_principal: true },
      
      // Classe 0115 - Cultivo de soja
      { codigo: '0115000', nome: 'Cultivo de soja', classe_codigo: '0115', slug: 'cultivo-soja', is_principal: true },
      
      // Classe 0116 - Cultivo de oleaginosas de lavoura temporária, exceto soja
      { codigo: '0116101', nome: 'Cultivo de amendoim', classe_codigo: '0116', slug: 'cultivo-amendoim', is_principal: false },
      { codigo: '0116102', nome: 'Cultivo de girassol', classe_codigo: '0116', slug: 'cultivo-girassol', is_principal: false },
      { codigo: '0116103', nome: 'Cultivo de mamona', classe_codigo: '0116', slug: 'cultivo-mamona', is_principal: false },
      { codigo: '0116199', nome: 'Cultivo de outras oleaginosas de lavoura temporária não especificadas anteriormente', classe_codigo: '0116', slug: 'cultivo-outras-oleaginosas-lavoura-temporaria', is_principal: false },
      
      // Classe 0121 - Horticultura
      { codigo: '0121301', nome: 'Cultivo de tomate rasteiro', classe_codigo: '0121', slug: 'cultivo-tomate-rasteiro', is_principal: false },
      { codigo: '0121302', nome: 'Cultivo de tomate em estufa', classe_codigo: '0121', slug: 'cultivo-tomate-estufa', is_principal: false },
      { codigo: '0121303', nome: 'Cultivo de alface', classe_codigo: '0121', slug: 'cultivo-alface', is_principal: false },
      { codigo: '0121304', nome: 'Cultivo de batata-inglesa', classe_codigo: '0121', slug: 'cultivo-batata-inglesa', is_principal: false },
      { codigo: '0121305', nome: 'Cultivo de cebola', classe_codigo: '0121', slug: 'cultivo-cebola', is_principal: false },
      { codigo: '0121399', nome: 'Cultivo de outras hortaliças não especificadas anteriormente', classe_codigo: '0121', slug: 'cultivo-outras-hortalicas-nao-especificadas', is_principal: true },
      
      // Classe 0141 - Criação de bovinos
      { codigo: '0141101', nome: 'Criação de bovinos para corte', classe_codigo: '0141', slug: 'criacao-bovinos-corte', is_principal: true },
      { codigo: '0141102', nome: 'Criação de bovinos para leite', classe_codigo: '0141', slug: 'criacao-bovinos-leite', is_principal: true },
      { codigo: '0141103', nome: 'Criação de bovinos, exceto para corte e leite', classe_codigo: '0141', slug: 'criacao-bovinos-exceto-corte-leite', is_principal: false },
      
      // Classe 0142 - Criação de outros animais de grande porte
      { codigo: '0142301', nome: 'Criação de búfalos', classe_codigo: '0142', slug: 'criacao-bufalos', is_principal: false },
      { codigo: '0142302', nome: 'Criação de equinos', classe_codigo: '0142', slug: 'criacao-equinos', is_principal: false },
      { codigo: '0142303', nome: 'Criação de asininos e muares', classe_codigo: '0142', slug: 'criacao-asininos-muares', is_principal: false },
      
      // Classe 0143 - Criação de caprinos e ovinos
      { codigo: '0143501', nome: 'Criação de caprinos', classe_codigo: '0143', slug: 'criacao-caprinos', is_principal: false },
      { codigo: '0143502', nome: 'Criação de ovinos, inclusive para produção de lã', classe_codigo: '0143', slug: 'criacao-ovinos-inclusive-producao-la', is_principal: false },
      
      // Classe 0144 - Criação de suínos
      { codigo: '0144001', nome: 'Criação de suínos', classe_codigo: '0144', slug: 'criacao-suinos', is_principal: true },
      
      // Classe 0145 - Criação de aves
      { codigo: '0145101', nome: 'Criação de frangos para corte', classe_codigo: '0145', slug: 'criacao-frangos-corte', is_principal: true },
      { codigo: '0145102', nome: 'Criação de galinhas para produção de ovos', classe_codigo: '0145', slug: 'criacao-galinhas-producao-ovos', is_principal: true },
      { codigo: '0145103', nome: 'Criação de outros galináceos', classe_codigo: '0145', slug: 'criacao-outros-galinaceos', is_principal: false },
      { codigo: '0145199', nome: 'Criação de outras aves não especificadas anteriormente', classe_codigo: '0145', slug: 'criacao-outras-aves-nao-especificadas', is_principal: false },
      
      // Principais subclasses de comércio varejista
      { codigo: '4721101', nome: 'Comércio varejista de produtos farmacêuticos, sem manipulação de fórmulas', classe_codigo: '4721', slug: 'comercio-varejista-produtos-farmaceuticos-sem-manipulacao', is_principal: true },
      { codigo: '4722901', nome: 'Comércio varejista de produtos farmacêuticos homeopáticos', classe_codigo: '4722', slug: 'comercio-varejista-produtos-farmaceuticos-homeopaticos', is_principal: false },
      { codigo: '4723700', nome: 'Comércio varejista de produtos farmacêuticos veterinários', classe_codigo: '4723', slug: 'comercio-varejista-produtos-farmaceuticos-veterinarios', is_principal: false },
      
      // Classe 4731 - Comércio varejista de combustíveis para veículos automotores
      { codigo: '4731800', nome: 'Comércio varejista de combustíveis de origem vegetal', classe_codigo: '4731', slug: 'comercio-varejista-combustiveis-origem-vegetal', is_principal: false },
      { codigo: '4731801', nome: 'Comércio varejista de álcool carburante', classe_codigo: '4731', slug: 'comercio-varejista-alcool-carburante', is_principal: false },
      { codigo: '4731802', nome: 'Comércio varejista de biodiesel', classe_codigo: '4731', slug: 'comercio-varejista-biodiesel', is_principal: false },
      { codigo: '4731899', nome: 'Comércio varejista de outros combustíveis para veículos automotores', classe_codigo: '4731', slug: 'comercio-varejista-outros-combustiveis-veiculos-automotores', is_principal: true },
      
      // Classe 6201 - Desenvolvimento de programas de computador sob encomenda
      { codigo: '6201501', nome: 'Desenvolvimento de programas de computador sob encomenda', classe_codigo: '6201', slug: 'desenvolvimento-programas-computador-sob-encomenda', is_principal: true },
      
      // Classe 6202 - Desenvolvimento e licenciamento de programas de computador customizáveis
      { codigo: '6202300', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', classe_codigo: '6202', slug: 'desenvolvimento-licenciamento-programas-computador-customizaveis', is_principal: true },
      
      // Classe 6203 - Desenvolvimento e licenciamento de programas de computador não-customizáveis
      { codigo: '6203100', nome: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis', classe_codigo: '6203', slug: 'desenvolvimento-licenciamento-programas-computador-nao-customizaveis', is_principal: true },
      
      // Classe 6204 - Consultoria em tecnologia da informação
      { codigo: '6204000', nome: 'Consultoria em tecnologia da informação', classe_codigo: '6204', slug: 'consultoria-tecnologia-informacao', is_principal: true },
      
      // Classe 6209 - Suporte técnico, manutenção e outros serviços em tecnologia da informação
      { codigo: '6209100', nome: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação', classe_codigo: '6209', slug: 'suporte-tecnico-manutencao-outros-servicos-tecnologia-informacao', is_principal: true },
      
      // Classe 6911 - Atividades jurídicas
      { codigo: '6911701', nome: 'Atividades de advocacia', classe_codigo: '6911', slug: 'atividades-advocacia', is_principal: true },
      { codigo: '6911702', nome: 'Atividades de cartórios', classe_codigo: '6911', slug: 'atividades-cartorios', is_principal: false },
      { codigo: '6911799', nome: 'Outras atividades jurídicas não especificadas anteriormente', classe_codigo: '6911', slug: 'outras-atividades-juridicas-nao-especificadas', is_principal: false },
      
      // Classe 6920 - Atividades de contabilidade
      { codigo: '6920601', nome: 'Atividades de contabilidade', classe_codigo: '6920', slug: 'atividades-contabilidade', is_principal: true },
      { codigo: '6920602', nome: 'Atividades de consultoria e auditoria contábil e tributária', classe_codigo: '6920', slug: 'atividades-consultoria-auditoria-contabil-tributaria', is_principal: false },
      
      // Expandindo dados completos com mais CNAEs...
      // Classe 0111 - Cultivo de cereais
      { codigo: '0111300', nome: 'Cultivo de arroz', classe_codigo: '0111', slug: 'cultivo-arroz', is_principal: false },
      { codigo: '0111301', nome: 'Cultivo de arroz inundado', classe_codigo: '0111', slug: 'cultivo-arroz-inundado', is_principal: true },
      { codigo: '0111302', nome: 'Cultivo de arroz de sequeiro', classe_codigo: '0111', slug: 'cultivo-arroz-sequeiro', is_principal: false },
      { codigo: '0111303', nome: 'Cultivo de outros cereais não especificados', classe_codigo: '0111', slug: 'cultivo-outros-cereais-nao-especificados', is_principal: false },
      
      // Classe 0112 - Cultivo de milho
      { codigo: '0112101', nome: 'Cultivo de milho', classe_codigo: '0112', slug: 'cultivo-milho', is_principal: true },
      { codigo: '0112199', nome: 'Cultivo de outros cereais para grãos', classe_codigo: '0112', slug: 'cultivo-outros-cereais-graos', is_principal: false },
      
      // Classe 0113 - Cultivo de cana-de-açúcar
      { codigo: '0113000', nome: 'Cultivo de cana-de-açúcar', classe_codigo: '0113', slug: 'cultivo-cana-acucar', is_principal: true },
      
      // Classe 0114 - Cultivo de fumo
      { codigo: '0114000', nome: 'Cultivo de fumo', classe_codigo: '0114', slug: 'cultivo-fumo', is_principal: true },
      
      // Classe 0115 - Cultivo de algodão herbáceo e outras fibras de lavoura temporária
      { codigo: '0115000', nome: 'Cultivo de algodão herbáceo e outras fibras de lavoura temporária', classe_codigo: '0115', slug: 'cultivo-algodao-herbaceo-outras-fibras-lavoura-temporaria', is_principal: true },
      
      // Classe 0116 - Cultivo de plantas oleaginosas de lavoura temporária
      { codigo: '0116101', nome: 'Cultivo de soja', classe_codigo: '0116', slug: 'cultivo-soja', is_principal: true },
      { codigo: '0116102', nome: 'Cultivo de amendoim', classe_codigo: '0116', slug: 'cultivo-amendoim', is_principal: false },
      { codigo: '0116199', nome: 'Cultivo de outras oleaginosas de lavoura temporária', classe_codigo: '0116', slug: 'cultivo-outras-oleaginosas-lavoura-temporaria', is_principal: false },
      
      // Classe 0119 - Cultivo de outros produtos de lavoura temporária
      { codigo: '0119101', nome: 'Cultivo de feijão', classe_codigo: '0119', slug: 'cultivo-feijao', is_principal: true },
      { codigo: '0119199', nome: 'Cultivo de outros produtos de lavoura temporária não especificados anteriormente', classe_codigo: '0119', slug: 'cultivo-outros-produtos-lavoura-temporaria-nao-especificados', is_principal: false },
      
      // Classe 0121 - Horticultura
      { codigo: '0121301', nome: 'Horticultura, exceto morango', classe_codigo: '0121', slug: 'horticultura-exceto-morango', is_principal: true },
      { codigo: '0121302', nome: 'Cultivo de morango', classe_codigo: '0121', slug: 'cultivo-morango', is_principal: false },
      { codigo: '0121303', nome: 'Cultivo de flores e plantas ornamentais', classe_codigo: '0121', slug: 'cultivo-flores-plantas-ornamentais', is_principal: false },
      { codigo: '0121304', nome: 'Cultivo de mudas e outras formas de propagação vegetal, certificadas', classe_codigo: '0121', slug: 'cultivo-mudas-outras-formas-propagacao-vegetal-certificadas', is_principal: false },
      
      // Classe 0131 - Cultivo de laranja
      { codigo: '0131000', nome: 'Cultivo de laranja', classe_codigo: '0131', slug: 'cultivo-laranja', is_principal: true },
      
      // Classe 0132 - Cultivo de uva
      { codigo: '0132000', nome: 'Cultivo de uva', classe_codigo: '0132', slug: 'cultivo-uva', is_principal: true },
      
      // Classe 0133 - Cultivo de outros citros
      { codigo: '0133000', nome: 'Cultivo de outros citros', classe_codigo: '0133', slug: 'cultivo-outros-citros', is_principal: true },
      
      // Classe 0134 - Cultivo de outras frutas de lavoura permanente
      { codigo: '0134000', nome: 'Cultivo de outras frutas de lavoura permanente', classe_codigo: '0134', slug: 'cultivo-outras-frutas-lavoura-permanente', is_principal: true },
      
      // Adicionando mais subclasses para atingir um conjunto mais completo
      // Setor de Serviços - Informação e Comunicação
      { codigo: '5811800', nome: 'Edição de livros', classe_codigo: '5811', slug: 'edicao-livros', is_principal: true },
      { codigo: '5812500', nome: 'Edição de jornais', classe_codigo: '5812', slug: 'edicao-jornais', is_principal: true },
      { codigo: '5813100', nome: 'Edição de revistas', classe_codigo: '5813', slug: 'edicao-revistas', is_principal: true },
      
      // Setor Industrial
      { codigo: '1011201', nome: 'Frigorífico - abate de bovinos', classe_codigo: '1011', slug: 'frigorifico-abate-bovinos', is_principal: true },
      { codigo: '1011202', nome: 'Frigorífico - abate de equinos', classe_codigo: '1011', slug: 'frigorifico-abate-equinos', is_principal: false },
      { codigo: '1012101', nome: 'Frigorífico - abate de suínos', classe_codigo: '1012', slug: 'frigorifico-abate-suinos', is_principal: true },
      { codigo: '1013901', nome: 'Frigorífico - abate de aves', classe_codigo: '1013', slug: 'frigorifico-abate-aves', is_principal: true },
      { codigo: '1013902', nome: 'Frigorífico - abate de pequenos animais', classe_codigo: '1013', slug: 'frigorifico-abate-pequenos-animais', is_principal: false },
      
      // Setor de Comércio
      { codigo: '4711301', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados', classe_codigo: '4711', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-hipermercados', is_principal: true },
      { codigo: '4711302', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados', classe_codigo: '4711', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-supermercados', is_principal: false },
      { codigo: '4712100', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns', classe_codigo: '4712', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-minimercados-mercearias-armazens', is_principal: true },
      
      // Setor de Construção
      { codigo: '4120400', nome: 'Construção de edifícios', classe_codigo: '4120', slug: 'construcao-edificios', is_principal: true },
      { codigo: '4211101', nome: 'Construção de rodovias e ferrovias', classe_codigo: '4211', slug: 'construcao-rodovias-ferrovias', is_principal: true },
      { codigo: '4212000', nome: 'Construção de obras-de-arte especiais', classe_codigo: '4212', slug: 'construcao-obras-arte-especiais', is_principal: true },
      
      // Setor de Educação
      { codigo: '8511200', nome: 'Educação infantil - creche', classe_codigo: '8511', slug: 'educacao-infantil-creche', is_principal: true },
      { codigo: '8512100', nome: 'Educação infantil - pré-escola', classe_codigo: '8512', slug: 'educacao-infantil-pre-escola', is_principal: true },
      { codigo: '8513900', nome: 'Ensino fundamental', classe_codigo: '8513', slug: 'ensino-fundamental', is_principal: true },
      { codigo: '8520100', nome: 'Ensino médio', classe_codigo: '8520', slug: 'ensino-medio', is_principal: true },
      
      // Setor de Saúde
      { codigo: '8610101', nome: 'Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgências', classe_codigo: '8610', slug: 'atividades-atendimento-hospitalar-exceto-pronto-socorro-unidades-atendimento-urgencias', is_principal: true },
      { codigo: '8610102', nome: 'Atividades de atendimento em pronto-socorro e unidades hospitalares para atendimento a urgências', classe_codigo: '8610', slug: 'atividades-atendimento-pronto-socorro-unidades-hospitalares-atendimento-urgencias', is_principal: false },
      { codigo: '8630501', nome: 'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos', classe_codigo: '8630', slug: 'atividade-medica-ambulatorial-recursos-realizacao-procedimentos-cirurgicos', is_principal: true },
      { codigo: '8630502', nome: 'Atividade médica ambulatorial com recursos para realização de exames complementares', classe_codigo: '8630', slug: 'atividade-medica-ambulatorial-recursos-realizacao-exames-complementares', is_principal: false },
      
      // Adicionando mais para completar o conjunto
      { codigo: '9601701', nome: 'Lavanderias', classe_codigo: '9601', slug: 'lavanderias', is_principal: true },
      { codigo: '9601702', nome: 'Tinturarias', classe_codigo: '9601', slug: 'tinturarias', is_principal: false },
      { codigo: '9602501', nome: 'Cabeleireiros, manicure e pedicure', classe_codigo: '9602', slug: 'cabeleireiros-manicure-pedicure', is_principal: true },
      { codigo: '9602502', nome: 'Atividades de estética e outros serviços de cuidados com a beleza', classe_codigo: '9602', slug: 'atividades-estetica-outros-servicos-cuidados-beleza', is_principal: false }
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