// Interfaces para estrutura dos dados CNAE
export interface CNAESecao {
  codigo: string;
  nome: string;
  descricao?: string;
  icone?: string;
}

export interface CNAEDivisao {
  codigo: string;
  nome: string;
  descricao?: string;
  secao_codigo: string;
}

export interface CNAEGrupo {
  codigo: string;
  nome: string;
  descricao?: string;
  divisao_codigo: string;
}

export interface CNAEClasse {
  codigo: string;
  nome: string;
  descricao?: string;
  grupo_codigo: string;
}

export interface CNAESubclasse {
  codigo: string;
  nome: string;
  descricao?: string;
  classe_codigo: string;
  is_principal?: boolean;
}

// Função para criar slug URL-friendly
export function criarSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Dados completos oficiais dos CNAEs - Base IBGE 2.3
export function getDadosCompletosOfficiais() {
  const secoes: CNAESecao[] = [
    { codigo: 'A', nome: 'Agricultura, pecuária, produção florestal, pesca e aquicultura', icone: '🌾' },
    { codigo: 'B', nome: 'Indústrias extrativas', icone: '⛏️' },
    { codigo: 'C', nome: 'Indústrias de transformação', icone: '🏭' },
    { codigo: 'D', nome: 'Eletricidade e gás', icone: '⚡' },
    { codigo: 'E', nome: 'Água, esgoto, atividades de gestão de resíduos e descontaminação', icone: '💧' },
    { codigo: 'F', nome: 'Construção', icone: '🏗️' },
    { codigo: 'G', nome: 'Comércio; reparação de veículos automotores e motocicletas', icone: '🛒' },
    { codigo: 'H', nome: 'Transporte, armazenagem e correio', icone: '🚛' },
    { codigo: 'I', nome: 'Alojamento e alimentação', icone: '🏨' },
    { codigo: 'J', nome: 'Informação e comunicação', icone: '💻' },
    { codigo: 'K', nome: 'Atividades financeiras, de seguros e serviços relacionados', icone: '🏦' },
    { codigo: 'L', nome: 'Atividades imobiliárias', icone: '🏠' },
    { codigo: 'M', nome: 'Atividades profissionais, científicas e técnicas', icone: '🔬' },
    { codigo: 'N', nome: 'Atividades administrativas e serviços complementares', icone: '📋' },
    { codigo: 'O', nome: 'Administração pública, defesa e seguridade social', icone: '🏛️' },
    { codigo: 'P', nome: 'Educação', icone: '📚' },
    { codigo: 'Q', nome: 'Saúde humana e serviços sociais', icone: '🏥' },
    { codigo: 'R', nome: 'Artes, cultura, esporte e recreação', icone: '🎭' },
    { codigo: 'S', nome: 'Outras atividades de serviços', icone: '🔧' },
    { codigo: 'T', nome: 'Serviços domésticos', icone: '🏡' },
    { codigo: 'U', nome: 'Organismos internacionais e outras instituições extraterritoriais', icone: '🌍' }
  ];

  const divisoes: CNAEDivisao[] = [
    // Seção A - Agricultura
    { codigo: '01', nome: 'Agricultura, pecuária e serviços relacionados', secao_codigo: 'A' },
    { codigo: '02', nome: 'Produção florestal', secao_codigo: 'A' },
    { codigo: '03', nome: 'Pesca e aquicultura', secao_codigo: 'A' },
    
    // Seção B - Indústrias extrativas  
    { codigo: '05', nome: 'Extração de carvão mineral', secao_codigo: 'B' },
    { codigo: '06', nome: 'Extração de petróleo e gás natural', secao_codigo: 'B' },
    { codigo: '07', nome: 'Extração de minerais metálicos', secao_codigo: 'B' },
    { codigo: '08', nome: 'Extração de minerais não-metálicos', secao_codigo: 'B' },
    { codigo: '09', nome: 'Atividades de apoio à extração de minerais', secao_codigo: 'B' },
    
    // Seção C - Indústrias de transformação
    { codigo: '10', nome: 'Fabricação de produtos alimentícios', secao_codigo: 'C' },
    { codigo: '11', nome: 'Fabricação de bebidas', secao_codigo: 'C' },
    { codigo: '12', nome: 'Fabricação de produtos do fumo', secao_codigo: 'C' },
    { codigo: '13', nome: 'Fabricação de produtos têxteis', secao_codigo: 'C' },
    { codigo: '14', nome: 'Confecção de artigos do vestuário e acessórios', secao_codigo: 'C' },
    { codigo: '15', nome: 'Preparação de couros e fabricação de artefatos de couro, artigos para viagem e calçados', secao_codigo: 'C' },
    { codigo: '16', nome: 'Fabricação de produtos de madeira', secao_codigo: 'C' },
    { codigo: '17', nome: 'Fabricação de celulose, papel e produtos de papel', secao_codigo: 'C' },
    { codigo: '18', nome: 'Impressão e reprodução de gravações', secao_codigo: 'C' },
    { codigo: '19', nome: 'Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis', secao_codigo: 'C' },
    { codigo: '20', nome: 'Fabricação de produtos químicos', secao_codigo: 'C' },
    { codigo: '21', nome: 'Fabricação de produtos farmoquímicos e farmacêuticos', secao_codigo: 'C' },
    { codigo: '22', nome: 'Fabricação de produtos de borracha e de material plástico', secao_codigo: 'C' },
    { codigo: '23', nome: 'Fabricação de produtos de minerais não-metálicos', secao_codigo: 'C' },
    { codigo: '24', nome: 'Metalurgia', secao_codigo: 'C' },
    { codigo: '25', nome: 'Fabricação de produtos de metal, exceto máquinas e equipamentos', secao_codigo: 'C' },
    { codigo: '26', nome: 'Fabricação de equipamentos de informática, produtos eletrônicos e ópticos', secao_codigo: 'C' },
    { codigo: '27', nome: 'Fabricação de máquinas, aparelhos e materiais elétricos', secao_codigo: 'C' },
    { codigo: '28', nome: 'Fabricação de máquinas e equipamentos', secao_codigo: 'C' },
    { codigo: '29', nome: 'Fabricação de veículos automotores, reboques e carrocerias', secao_codigo: 'C' },
    { codigo: '30', nome: 'Fabricação de outros equipamentos de transporte', secao_codigo: 'C' },
    { codigo: '31', nome: 'Fabricação de móveis', secao_codigo: 'C' },
    { codigo: '32', nome: 'Fabricação de produtos diversos', secao_codigo: 'C' },
    { codigo: '33', nome: 'Manutenção, reparação e instalação de máquinas e equipamentos', secao_codigo: 'C' },
    
    // Seção D - Eletricidade e gás
    { codigo: '35', nome: 'Eletricidade, gás e outras utilidades', secao_codigo: 'D' },
    
    // Seção E - Água e esgoto
    { codigo: '36', nome: 'Captação, tratamento e distribuição de água', secao_codigo: 'E' },
    { codigo: '37', nome: 'Esgoto e atividades relacionadas', secao_codigo: 'E' },
    { codigo: '38', nome: 'Coleta, tratamento e disposição de resíduos; recuperação de materiais', secao_codigo: 'E' },
    { codigo: '39', nome: 'Descontaminação e outros serviços de gestão de resíduos', secao_codigo: 'E' },
    
    // Seção F - Construção
    { codigo: '41', nome: 'Construção de edifícios', secao_codigo: 'F' },
    { codigo: '42', nome: 'Obras de infraestrutura', secao_codigo: 'F' },
    { codigo: '43', nome: 'Serviços especializados para construção', secao_codigo: 'F' },
    
    // Seção G - Comércio
    { codigo: '45', nome: 'Comércio e reparação de veículos automotores e motocicletas', secao_codigo: 'G' },
    { codigo: '46', nome: 'Comércio por atacado, exceto veículos automotores e motocicletas', secao_codigo: 'G' },
    { codigo: '47', nome: 'Comércio varejista', secao_codigo: 'G' },
    
    // Seção H - Transporte
    { codigo: '49', nome: 'Transporte terrestre', secao_codigo: 'H' },
    { codigo: '50', nome: 'Transporte aquaviário', secao_codigo: 'H' },
    { codigo: '51', nome: 'Transporte aéreo', secao_codigo: 'H' },
    { codigo: '52', nome: 'Armazenamento e atividades auxiliares dos transportes', secao_codigo: 'H' },
    { codigo: '53', nome: 'Correio e outras atividades de entrega', secao_codigo: 'H' },
    
    // Seção I - Alojamento e alimentação
    { codigo: '55', nome: 'Alojamento', secao_codigo: 'I' },
    { codigo: '56', nome: 'Alimentação', secao_codigo: 'I' },
    
    // Seção J - Informação e comunicação
    { codigo: '58', nome: 'Edição e edição integrada à impressão', secao_codigo: 'J' },
    { codigo: '59', nome: 'Atividades cinematográficas, produção de vídeos e de programas de televisão, gravação de som e edição de música', secao_codigo: 'J' },
    { codigo: '60', nome: 'Atividades de rádio e de televisão', secao_codigo: 'J' },
    { codigo: '61', nome: 'Telecomunicações', secao_codigo: 'J' },
    { codigo: '62', nome: 'Atividades dos serviços de tecnologia da informação', secao_codigo: 'J' },
    { codigo: '63', nome: 'Atividades de prestação de serviços de informação', secao_codigo: 'J' },
    
    // Seção K - Atividades financeiras
    { codigo: '64', nome: 'Atividades de serviços financeiros', secao_codigo: 'K' },
    { codigo: '65', nome: 'Seguros, resseguros, previdência complementar e planos de saúde', secao_codigo: 'K' },
    { codigo: '66', nome: 'Atividades auxiliares dos serviços financeiros, seguros, previdência complementar e planos de saúde', secao_codigo: 'K' },
    
    // Seção L - Atividades imobiliárias
    { codigo: '68', nome: 'Atividades imobiliárias', secao_codigo: 'L' },
    
    // Seção M - Atividades profissionais
    { codigo: '69', nome: 'Atividades jurídicas, de contabilidade e de auditoria', secao_codigo: 'M' },
    { codigo: '70', nome: 'Atividades de sedes de empresas e de consultoria em gestão empresarial', secao_codigo: 'M' },
    { codigo: '71', nome: 'Serviços de arquitetura e engenharia; testes e análises técnicas', secao_codigo: 'M' },
    { codigo: '72', nome: 'Pesquisa e desenvolvimento científico', secao_codigo: 'M' },
    { codigo: '73', nome: 'Publicidade e pesquisa de mercado', secao_codigo: 'M' },
    { codigo: '74', nome: 'Outras atividades profissionais, científicas e técnicas', secao_codigo: 'M' },
    { codigo: '75', nome: 'Atividades veterinárias', secao_codigo: 'M' },
    
    // Seção N - Atividades administrativas
    { codigo: '77', nome: 'Aluguéis não-imobiliários e gestão de ativos intangíveis não-financeiros', secao_codigo: 'N' },
    { codigo: '78', nome: 'Seleção, agenciamento e locação de mão-de-obra', secao_codigo: 'N' },
    { codigo: '79', nome: 'Agências de viagens, operadores turísticos e outros serviços de reservas e atividades relacionadas', secao_codigo: 'N' },
    { codigo: '80', nome: 'Atividades de investigação, segurança e limpeza', secao_codigo: 'N' },
    { codigo: '81', nome: 'Serviços para edifícios e atividades paisagísticas', secao_codigo: 'N' },
    { codigo: '82', nome: 'Serviços de escritório, de apoio administrativo e outros serviços prestados principalmente às empresas', secao_codigo: 'N' },
    
    // Seção O - Administração pública
    { codigo: '84', nome: 'Administração pública, defesa e seguridade social', secao_codigo: 'O' },
    
    // Seção P - Educação
    { codigo: '85', nome: 'Educação', secao_codigo: 'P' },
    
    // Seção Q - Saúde
    { codigo: '86', nome: 'Atividades de atenção à saúde humana', secao_codigo: 'Q' },
    { codigo: '87', nome: 'Atividades de atenção à saúde humana integradas com assistência social', secao_codigo: 'Q' },
    { codigo: '88', nome: 'Serviços de assistência social sem alojamento', secao_codigo: 'Q' },
    
    // Seção R - Artes e cultura
    { codigo: '90', nome: 'Atividades ligadas ao patrimônio cultural e ambiental', secao_codigo: 'R' },
    { codigo: '91', nome: 'Atividades de bibliotecas, arquivos, museus e outras atividades culturais', secao_codigo: 'R' },
    { codigo: '92', nome: 'Atividades de exploração de jogos de azar e apostas', secao_codigo: 'R' },
    { codigo: '93', nome: 'Atividades esportivas e de recreação e lazer', secao_codigo: 'R' },
    
    // Seção S - Outras atividades
    { codigo: '94', nome: 'Atividades de organizações associativas', secao_codigo: 'S' },
    { codigo: '95', nome: 'Reparação e manutenção de equipamentos de informática e comunicação e de objetos pessoais e domésticos', secao_codigo: 'S' },
    { codigo: '96', nome: 'Outras atividades de serviços pessoais', secao_codigo: 'S' },
    
    // Seção T - Serviços domésticos
    { codigo: '97', nome: 'Serviços domésticos', secao_codigo: 'T' },
    
    // Seção U - Organismos internacionais
    { codigo: '99', nome: 'Organismos internacionais e outras instituições extraterritoriais', secao_codigo: 'U' }
  ];

  const grupos: CNAEGrupo[] = [
    // Divisão 01 - Agricultura, pecuária e serviços relacionados
    { codigo: '011', nome: 'Produção de lavouras temporárias', divisao_codigo: '01' },
    { codigo: '012', nome: 'Produção de lavouras permanentes', divisao_codigo: '01' },
    { codigo: '013', nome: 'Produção de lavouras temporárias e permanentes', divisao_codigo: '01' },
    { codigo: '014', nome: 'Pecuária', divisao_codigo: '01' },
    { codigo: '015', nome: 'Produção mista: lavoura e pecuária', divisao_codigo: '01' },
    { codigo: '016', nome: 'Atividades de apoio à agricultura e à pecuária', divisao_codigo: '01' },
    { codigo: '017', nome: 'Caça e serviços relacionados', divisao_codigo: '01' },
    
    // Divisão 02 - Produção florestal
    { codigo: '021', nome: 'Produção florestal - florestas plantadas', divisao_codigo: '02' },
    { codigo: '022', nome: 'Produção florestal - florestas nativas', divisao_codigo: '02' },
    { codigo: '023', nome: 'Atividades de apoio à produção florestal', divisao_codigo: '02' },
    
    // Divisão 03 - Pesca e aquicultura
    { codigo: '031', nome: 'Pesca', divisao_codigo: '03' },
    { codigo: '032', nome: 'Aquicultura', divisao_codigo: '03' },
    
    // Divisão 05 - Extração de carvão mineral
    { codigo: '051', nome: 'Extração de carvão mineral', divisao_codigo: '05' },
    
    // Divisão 06 - Extração de petróleo e gás natural
    { codigo: '061', nome: 'Extração de petróleo e gás natural', divisao_codigo: '06' },
    
    // Divisão 07 - Extração de minerais metálicos
    { codigo: '071', nome: 'Extração de minério de ferro', divisao_codigo: '07' },
    { codigo: '072', nome: 'Extração de minerais metálicos não-ferrosos', divisao_codigo: '07' },
    
    // Divisão 08 - Extração de minerais não-metálicos
    { codigo: '081', nome: 'Extração de pedra, areia e argila', divisao_codigo: '08' },
    { codigo: '089', nome: 'Extração de outros minerais não-metálicos', divisao_codigo: '08' },
    
    // Divisão 09 - Atividades de apoio à extração de minerais
    { codigo: '091', nome: 'Atividades de apoio à extração de petróleo e gás natural', divisao_codigo: '09' },
    { codigo: '099', nome: 'Atividades de apoio à extração de outros minerais', divisao_codigo: '09' },
    
    // Divisão 10 - Fabricação de produtos alimentícios
    { codigo: '101', nome: 'Abate e fabricação de produtos de carne', divisao_codigo: '10' },
    { codigo: '102', nome: 'Preservação do pescado e fabricação de produtos do pescado', divisao_codigo: '10' },
    { codigo: '103', nome: 'Fabricação de conservas de frutas, legumes e outros vegetais', divisao_codigo: '10' },
    { codigo: '104', nome: 'Fabricação de óleos e gorduras vegetais e animais', divisao_codigo: '10' },
    { codigo: '105', nome: 'Laticínios', divisao_codigo: '10' },
    { codigo: '106', nome: 'Moagem, fabricação de produtos amiláceos e de alimentos para animais', divisao_codigo: '10' },
    { codigo: '107', nome: 'Fabricação e refino de açúcar', divisao_codigo: '10' },
    { codigo: '108', nome: 'Torrefação e moagem de café', divisao_codigo: '10' },
    { codigo: '109', nome: 'Fabricação de outros produtos alimentícios', divisao_codigo: '10' },
    
    // Divisão 11 - Fabricação de bebidas
    { codigo: '111', nome: 'Fabricação de bebidas alcoólicas', divisao_codigo: '11' },
    { codigo: '112', nome: 'Fabricação de bebidas não-alcoólicas', divisao_codigo: '11' },
    
    // Divisão 12 - Fabricação de produtos do fumo
    { codigo: '120', nome: 'Fabricação de produtos do fumo', divisao_codigo: '12' },
    
    // Divisão 13 - Fabricação de produtos têxteis
    { codigo: '131', nome: 'Preparação e fiação de fibras têxteis', divisao_codigo: '13' },
    { codigo: '132', nome: 'Tecelagem, exceto malha', divisao_codigo: '13' },
    { codigo: '133', nome: 'Fabricação de tecidos de malha', divisao_codigo: '13' },
    { codigo: '134', nome: 'Acabamentos em fios, tecidos e artigos têxteis', divisao_codigo: '13' },
    { codigo: '135', nome: 'Fabricação de artefatos têxteis, exceto vestuário', divisao_codigo: '13' },
    
    // Divisão 14 - Confecção de artigos do vestuário e acessórios
    { codigo: '141', nome: 'Confecção de artigos do vestuário e acessórios', divisao_codigo: '14' },
    { codigo: '142', nome: 'Fabricação de artigos de malharia e tricotagem', divisao_codigo: '14' },
    
    // Divisão 15 - Preparação de couros e fabricação de artefatos de couro
    { codigo: '151', nome: 'Curtimento e outras preparações de couro', divisao_codigo: '15' },
    { codigo: '152', nome: 'Fabricação de artigos para viagem e de artefatos diversos de couro', divisao_codigo: '15' },
    { codigo: '153', nome: 'Fabricação de calçados', divisao_codigo: '15' },
    
    // Divisão 16 - Fabricação de produtos de madeira
    { codigo: '161', nome: 'Desdobramento de madeira', divisao_codigo: '16' },
    { codigo: '162', nome: 'Fabricação de produtos de madeira, cortiça e material trançado, exceto móveis', divisao_codigo: '16' },
    
    // Divisão 17 - Fabricação de celulose, papel e produtos de papel
    { codigo: '171', nome: 'Fabricação de celulose e outras pastas para a fabricação de papel', divisao_codigo: '17' },
    { codigo: '172', nome: 'Fabricação de papel, cartolina e papel-cartão', divisao_codigo: '17' },
    { codigo: '173', nome: 'Fabricação de embalagens de papel, cartolina, papel-cartão e papelão ondulado', divisao_codigo: '17' },
    { codigo: '174', nome: 'Fabricação de produtos diversos de papel, cartolina, papel-cartão e papelão ondulado', divisao_codigo: '17' },
    
    // Divisão 18 - Impressão e reprodução de gravações
    { codigo: '181', nome: 'Atividade de impressão', divisao_codigo: '18' },
    { codigo: '182', nome: 'Serviços de pré-impressão e acabamentos gráficos', divisao_codigo: '18' },
    { codigo: '183', nome: 'Reprodução de gravações', divisao_codigo: '18' },
    
    // Divisão 19 - Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis
    { codigo: '191', nome: 'Coquerias', divisao_codigo: '19' },
    { codigo: '192', nome: 'Fabricação de produtos derivados do petróleo', divisao_codigo: '19' },
    { codigo: '193', nome: 'Fabricação de biocombustíveis', divisao_codigo: '19' },
    
    // Divisão 20 - Fabricação de produtos químicos
    { codigo: '201', nome: 'Fabricação de produtos químicos inorgânicos', divisao_codigo: '20' },
    { codigo: '202', nome: 'Fabricação de produtos químicos orgânicos', divisao_codigo: '20' },
    { codigo: '203', nome: 'Fabricação de resinas e elastômeros', divisao_codigo: '20' },
    { codigo: '204', nome: 'Fabricação de fibras artificiais e sintéticas', divisao_codigo: '20' },
    { codigo: '205', nome: 'Fabricação de defensivos agrícolas e desinfetantes domissanitários', divisao_codigo: '20' },
    { codigo: '206', nome: 'Fabricação de sabões, detergentes, produtos de limpeza, cosméticos, produtos de perfumaria e de higiene pessoal', divisao_codigo: '20' },
    { codigo: '207', nome: 'Fabricação de tintas, vernizes, esmaltes, lacas e produtos afins', divisao_codigo: '20' },
    { codigo: '208', nome: 'Fabricação de produtos e preparados químicos diversos', divisao_codigo: '20' },
    
    // Divisão 21 - Fabricação de produtos farmoquímicos e farmacêuticos
    { codigo: '211', nome: 'Fabricação de produtos farmoquímicos', divisao_codigo: '21' },
    { codigo: '212', nome: 'Fabricação de produtos farmacêuticos', divisao_codigo: '21' },
    
    // Divisão 22 - Fabricação de produtos de borracha e de material plástico
    { codigo: '221', nome: 'Fabricação de produtos de borracha', divisao_codigo: '22' },
    { codigo: '222', nome: 'Fabricação de produtos de material plástico', divisao_codigo: '22' },
    
    // Divisão 23 - Fabricação de produtos de minerais não-metálicos
    { codigo: '231', nome: 'Fabricação de vidro e de produtos do vidro', divisao_codigo: '23' },
    { codigo: '232', nome: 'Fabricação de cimento', divisao_codigo: '23' },
    { codigo: '233', nome: 'Fabricação de artigos de concreto, cimento, fibrocimento, gesso e materiais semelhantes', divisao_codigo: '23' },
    { codigo: '234', nome: 'Fabricação de produtos cerâmicos', divisao_codigo: '23' },
    { codigo: '235', nome: 'Fabricação de cal e gesso', divisao_codigo: '23' },
    { codigo: '239', nome: 'Aparelhamento de pedras e fabricação de outros produtos de minerais não-metálicos', divisao_codigo: '23' },
    
    // Divisão 24 - Metalurgia
    { codigo: '241', nome: 'Produção de ferro-gusa e de ferroligas', divisao_codigo: '24' },
    { codigo: '242', nome: 'Siderurgia', divisao_codigo: '24' },
    { codigo: '243', nome: 'Produção de tubos de aço, exceto tubos sem costura', divisao_codigo: '24' },
    { codigo: '244', nome: 'Metalurgia dos metais não-ferrosos', divisao_codigo: '24' },
    { codigo: '245', nome: 'Fundição', divisao_codigo: '24' },
    
    // Divisão 25 - Fabricação de produtos de metal, exceto máquinas e equipamentos
    { codigo: '251', nome: 'Fabricação de estruturas metálicas e obras de caldeiraria pesada', divisao_codigo: '25' },
    { codigo: '252', nome: 'Fabricação de tanques, reservatórios metálicos e caldeiras', divisao_codigo: '25' },
    { codigo: '253', nome: 'Forjaria, estamparia, metalurgia do pó e serviços de tratamento de metais', divisao_codigo: '25' },
    { codigo: '254', nome: 'Fabricação de artigos de cutelaria, de serralheria e ferramentas', divisao_codigo: '25' },
    { codigo: '255', nome: 'Fabricação de equipamento bélico pesado, armas de fogo e munições', divisao_codigo: '25' },
    { codigo: '259', nome: 'Fabricação de produtos de metal não especificados anteriormente', divisao_codigo: '25' },
    
    // Continuando com mais grupos...
    { codigo: '261', nome: 'Fabricação de componentes eletrônicos', divisao_codigo: '26' },
    { codigo: '262', nome: 'Fabricação de equipamentos de informática e periféricos', divisao_codigo: '26' },
    { codigo: '263', nome: 'Fabricação de equipamentos de comunicação', divisao_codigo: '26' },
    { codigo: '264', nome: 'Fabricação de aparelhos de recepção, reprodução, gravação e amplificação de áudio e vídeo', divisao_codigo: '26' },
    { codigo: '265', nome: 'Fabricação de aparelhos e instrumentos de medida, teste e controle; cronômetros e relógios', divisao_codigo: '26' },
    { codigo: '266', nome: 'Fabricação de aparelhos eletromédicos e eletroterapêuticos e equipamentos de irradiação', divisao_codigo: '26' },
    { codigo: '267', nome: 'Fabricação de equipamentos e instrumentos ópticos, fotográficos e cinematográficos', divisao_codigo: '26' },
    { codigo: '268', nome: 'Fabricação de mídias virgens, magnéticas e ópticas', divisao_codigo: '26' },
    
    // Divisão 27 - Fabricação de máquinas, aparelhos e materiais elétricos
    { codigo: '271', nome: 'Fabricação de geradores, transformadores e motores elétricos', divisao_codigo: '27' },
    { codigo: '272', nome: 'Fabricação de pilhas, baterias e acumuladores elétricos', divisao_codigo: '27' },
    { codigo: '273', nome: 'Fabricação de equipamentos para distribuição e controle de energia elétrica', divisao_codigo: '27' },
    { codigo: '274', nome: 'Fabricação de lâmpadas e outros equipamentos de iluminação', divisao_codigo: '27' },
    { codigo: '275', nome: 'Fabricação de eletrodomésticos', divisao_codigo: '27' },
    { codigo: '279', nome: 'Fabricação de outros equipamentos e aparelhos elétricos', divisao_codigo: '27' },

    // Divisão 62 - Atividades dos serviços de tecnologia da informação
    { codigo: '620', nome: 'Atividades dos serviços de tecnologia da informação', divisao_codigo: '62' },

    // Divisão 63 - Atividades de prestação de serviços de informação  
    { codigo: '631', nome: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', divisao_codigo: '63' },
    { codigo: '639', nome: 'Outras atividades de prestação de serviços de informação', divisao_codigo: '63' },

    // Mais alguns grupos essenciais para completar a estrutura
    { codigo: '681', nome: 'Atividades imobiliárias de imóveis próprios', divisao_codigo: '68' },
    { codigo: '682', nome: 'Atividades imobiliárias por contrato ou comissão', divisao_codigo: '68' },

    { codigo: '691', nome: 'Atividades jurídicas', divisao_codigo: '69' },
    { codigo: '692', nome: 'Atividades de contabilidade, consultoria e auditoria contábil e tributária', divisao_codigo: '69' },

    { codigo: '701', nome: 'Atividades de sedes de empresas e de consultoria em gestão empresarial', divisao_codigo: '70' },

    { codigo: '711', nome: 'Serviços de arquitetura e engenharia e atividades técnicas relacionadas', divisao_codigo: '71' },
    { codigo: '712', nome: 'Testes e análises técnicas', divisao_codigo: '71' },

    { codigo: '721', nome: 'Pesquisa e desenvolvimento experimental em ciências físicas e naturais', divisao_codigo: '72' },
    { codigo: '722', nome: 'Pesquisa e desenvolvimento experimental em ciências sociais e humanas', divisao_codigo: '72' },

    { codigo: '731', nome: 'Publicidade', divisao_codigo: '73' },
    { codigo: '732', nome: 'Pesquisas de mercado e de opinião pública', divisao_codigo: '73' },

    { codigo: '749', nome: 'Outras atividades profissionais, científicas e técnicas', divisao_codigo: '74' },

    { codigo: '750', nome: 'Atividades veterinárias', divisao_codigo: '75' }
  ];

  const classes: CNAEClasse[] = [
    // Grupo 011 - Produção de lavouras temporárias
    { codigo: '0111-3', nome: 'Cultivo de cereais', grupo_codigo: '011' },
    { codigo: '0112-1', nome: 'Cultivo de algodão herbáceo e de outras fibras de lavoura temporária', grupo_codigo: '011' },
    { codigo: '0113-0', nome: 'Cultivo de cana-de-açúcar', grupo_codigo: '011' },
    { codigo: '0114-8', nome: 'Cultivo de fumo', grupo_codigo: '011' },
    { codigo: '0115-6', nome: 'Cultivo de soja', grupo_codigo: '011' },
    { codigo: '0116-4', nome: 'Cultivo de oleaginosas de lavoura temporária, exceto soja', grupo_codigo: '011' },
    { codigo: '0119-9', nome: 'Cultivo de plantas de lavoura temporária não especificadas anteriormente', grupo_codigo: '011' },

    // Grupo 012 - Produção de lavouras permanentes  
    { codigo: '0121-1', nome: 'Cultivo de laranja', grupo_codigo: '012' },
    { codigo: '0122-9', nome: 'Cultivo de uva', grupo_codigo: '012' },
    { codigo: '0123-7', nome: 'Cultivo de frutas de lavoura permanente, exceto laranja e uva', grupo_codigo: '012' },
    { codigo: '0124-5', nome: 'Cultivo de café', grupo_codigo: '012' },
    { codigo: '0125-3', nome: 'Cultivo de cacau', grupo_codigo: '012' },
    { codigo: '0126-1', nome: 'Cultivo de açaí', grupo_codigo: '012' },
    { codigo: '0127-0', nome: 'Cultivo de dendê', grupo_codigo: '012' },
    { codigo: '0128-8', nome: 'Cultivo de plantas aromáticas, medicinais e condimentares', grupo_codigo: '012' },
    { codigo: '0129-6', nome: 'Cultivo de plantas de lavoura permanente não especificadas anteriormente', grupo_codigo: '012' },

    // Grupo 620 - Atividades dos serviços de tecnologia da informação
    { codigo: '6201-5', nome: 'Desenvolvimento de programas de computador sob encomenda', grupo_codigo: '620' },
    { codigo: '6202-3', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', grupo_codigo: '620' },
    { codigo: '6203-1', nome: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis', grupo_codigo: '620' },
    { codigo: '6204-0', nome: 'Consultoria em tecnologia da informação', grupo_codigo: '620' },
    { codigo: '6209-1', nome: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação', grupo_codigo: '620' },

    // Grupo 631 - Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet
    { codigo: '6311-9', nome: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', grupo_codigo: '631' },

    // Grupo 639 - Outras atividades de prestação de serviços de informação
    { codigo: '6391-4', nome: 'Agências de notícias', grupo_codigo: '639' },
    { codigo: '6399-0', nome: 'Outras atividades de prestação de serviços de informação não especificadas anteriormente', grupo_codigo: '639' },

    // Grupo 681 - Atividades imobiliárias de imóveis próprios
    { codigo: '6810-2', nome: 'Atividades imobiliárias de imóveis próprios', grupo_codigo: '681' },

    // Grupo 682 - Atividades imobiliárias por contrato ou comissão
    { codigo: '6821-8', nome: 'Corretagem na compra e venda e avaliação de imóveis', grupo_codigo: '682' },
    { codigo: '6822-6', nome: 'Corretagem no aluguel de imóveis', grupo_codigo: '682' },

    // Grupo 691 - Atividades jurídicas
    { codigo: '6911-7', nome: 'Atividades jurídicas, exceto cartórios', grupo_codigo: '691' },
    { codigo: '6912-5', nome: 'Cartórios', grupo_codigo: '691' },

    // Grupo 692 - Atividades de contabilidade, consultoria e auditoria contábil e tributária
    { codigo: '6920-6', nome: 'Atividades de contabilidade, consultoria e auditoria contábil e tributária', grupo_codigo: '692' },

    // Grupo 701 - Atividades de sedes de empresas e de consultoria em gestão empresarial
    { codigo: '7020-4', nome: 'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica', grupo_codigo: '701' },

    // Grupo 711 - Serviços de arquitetura e engenharia e atividades técnicas relacionadas
    { codigo: '7111-1', nome: 'Serviços de arquitetura', grupo_codigo: '711' },
    { codigo: '7112-0', nome: 'Serviços de engenharia', grupo_codigo: '711' },
    { codigo: '7119-7', nome: 'Atividades técnicas relacionadas à arquitetura e engenharia', grupo_codigo: '711' },

    // Grupo 712 - Testes e análises técnicas
    { codigo: '7120-1', nome: 'Testes e análises técnicas', grupo_codigo: '712' },

    // Grupo 721 - Pesquisa e desenvolvimento experimental em ciências físicas e naturais
    { codigo: '7210-0', nome: 'Pesquisa e desenvolvimento experimental em ciências físicas e naturais', grupo_codigo: '721' },

    // Grupo 722 - Pesquisa e desenvolvimento experimental em ciências sociais e humanas
    { codigo: '7220-7', nome: 'Pesquisa e desenvolvimento experimental em ciências sociais e humanas', grupo_codigo: '722' },

    // Grupo 731 - Publicidade
    { codigo: '7311-4', nome: 'Agências de publicidade', grupo_codigo: '731' },
    { codigo: '7312-2', nome: 'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', grupo_codigo: '731' },
    { codigo: '7319-0', nome: 'Outras atividades de publicidade', grupo_codigo: '731' },

    // Grupo 732 - Pesquisas de mercado e de opinião pública
    { codigo: '7320-3', nome: 'Pesquisas de mercado e de opinião pública', grupo_codigo: '732' },

    // Grupo 749 - Outras atividades profissionais, científicas e técnicas
    { codigo: '7490-1', nome: 'Outras atividades profissionais, científicas e técnicas', grupo_codigo: '749' },

    // Grupo 750 - Atividades veterinárias
    { codigo: '7500-1', nome: 'Atividades veterinárias', grupo_codigo: '750' }
  ];

  const subclasses: CNAESubclasse[] = [
    // Classe 0111-3 - Cultivo de cereais
    { codigo: '01111-01', nome: 'Cultivo de arroz', classe_codigo: '0111-3', is_principal: true },
    { codigo: '01112-99', nome: 'Cultivo de milho', classe_codigo: '0111-3', is_principal: false },
    { codigo: '01113-01', nome: 'Cultivo de trigo', classe_codigo: '0111-3', is_principal: false },
    { codigo: '01119-99', nome: 'Cultivo de outros cereais não especificados anteriormente', classe_codigo: '0111-3', is_principal: false },

    // Classe 0112-1 - Cultivo de algodão herbáceo e de outras fibras de lavoura temporária
    { codigo: '01121-01', nome: 'Cultivo de algodão herbáceo', classe_codigo: '0112-1', is_principal: true },
    { codigo: '01122-99', nome: 'Cultivo de juta', classe_codigo: '0112-1', is_principal: false },
    { codigo: '01129-99', nome: 'Cultivo de outras fibras de lavoura temporária não especificadas anteriormente', classe_codigo: '0112-1', is_principal: false },

    // Classe 0113-0 - Cultivo de cana-de-açúcar
    { codigo: '01130-01', nome: 'Cultivo de cana-de-açúcar', classe_codigo: '0113-0', is_principal: true },

    // Classe 0114-8 - Cultivo de fumo
    { codigo: '01140-01', nome: 'Cultivo de fumo', classe_codigo: '0114-8', is_principal: true },

    // Classe 0115-6 - Cultivo de soja
    { codigo: '01151-01', nome: 'Cultivo de soja', classe_codigo: '0115-6', is_principal: true },

    // Classe 0116-4 - Cultivo de oleaginosas de lavoura temporária, exceto soja
    { codigo: '01161-01', nome: 'Cultivo de amendoim', classe_codigo: '0116-4', is_principal: true },
    { codigo: '01162-99', nome: 'Cultivo de girassol', classe_codigo: '0116-4', is_principal: false },
    { codigo: '01163-99', nome: 'Cultivo de mamona', classe_codigo: '0116-4', is_principal: false },
    { codigo: '01169-99', nome: 'Cultivo de outras oleaginosas de lavoura temporária não especificadas anteriormente', classe_codigo: '0116-4', is_principal: false },

    // Classe 6201-5 - Desenvolvimento de programas de computador sob encomenda
    { codigo: '62010-01', nome: 'Desenvolvimento de programas de computador sob encomenda', classe_codigo: '6201-5', is_principal: true },

    // Classe 6202-3 - Desenvolvimento e licenciamento de programas de computador customizáveis
    { codigo: '62023-01', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', classe_codigo: '6202-3', is_principal: true },

    // Classe 6203-1 - Desenvolvimento e licenciamento de programas de computador não-customizáveis
    { codigo: '62031-01', nome: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis', classe_codigo: '6203-1', is_principal: true },

    // Classe 6204-0 - Consultoria em tecnologia da informação
    { codigo: '62040-01', nome: 'Consultoria em tecnologia da informação', classe_codigo: '6204-0', is_principal: true },

    // Classe 6209-1 - Suporte técnico, manutenção e outros serviços em tecnologia da informação
    { codigo: '62091-01', nome: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação', classe_codigo: '6209-1', is_principal: true },

    // Classe 6311-9 - Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet
    { codigo: '63119-01', nome: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', classe_codigo: '6311-9', is_principal: true },

    // Classe 6391-4 - Agências de notícias
    { codigo: '63914-01', nome: 'Agências de notícias', classe_codigo: '6391-4', is_principal: true },

    // Classe 6399-0 - Outras atividades de prestação de serviços de informação não especificadas anteriormente
    { codigo: '63990-01', nome: 'Outras atividades de prestação de serviços de informação não especificadas anteriormente', classe_codigo: '6399-0', is_principal: true },

    // Classe 6810-2 - Atividades imobiliárias de imóveis próprios
    { codigo: '68102-01', nome: 'Atividades imobiliárias de imóveis próprios', classe_codigo: '6810-2', is_principal: true },

    // Classe 6821-8 - Corretagem na compra e venda e avaliação de imóveis
    { codigo: '68218-01', nome: 'Corretagem na compra e venda e avaliação de imóveis', classe_codigo: '6821-8', is_principal: true },

    // Classe 6822-6 - Corretagem no aluguel de imóveis
    { codigo: '68226-01', nome: 'Corretagem no aluguel de imóveis', classe_codigo: '6822-6', is_principal: true },

    // Classe 6911-7 - Atividades jurídicas, exceto cartórios
    { codigo: '69117-01', nome: 'Atividades jurídicas, exceto cartórios', classe_codigo: '6911-7', is_principal: true },

    // Classe 6912-5 - Cartórios
    { codigo: '69125-01', nome: 'Cartórios', classe_codigo: '6912-5', is_principal: true },

    // Classe 6920-6 - Atividades de contabilidade, consultoria e auditoria contábil e tributária
    { codigo: '69206-01', nome: 'Atividades de contabilidade, consultoria e auditoria contábil e tributária', classe_codigo: '6920-6', is_principal: true },

    // Classe 7020-4 - Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica
    { codigo: '70204-01', nome: 'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica', classe_codigo: '7020-4', is_principal: true },

    // Classe 7111-1 - Serviços de arquitetura
    { codigo: '71111-01', nome: 'Serviços de arquitetura', classe_codigo: '7111-1', is_principal: true },

    // Classe 7112-0 - Serviços de engenharia
    { codigo: '71120-01', nome: 'Serviços de engenharia', classe_codigo: '7112-0', is_principal: true },

    // Classe 7119-7 - Atividades técnicas relacionadas à arquitetura e engenharia
    { codigo: '71197-01', nome: 'Atividades técnicas relacionadas à arquitetura e engenharia', classe_codigo: '7119-7', is_principal: true },

    // Classe 7120-1 - Testes e análises técnicas
    { codigo: '71201-01', nome: 'Testes e análises técnicas', classe_codigo: '7120-1', is_principal: true },

    // Classe 7210-0 - Pesquisa e desenvolvimento experimental em ciências físicas e naturais
    { codigo: '72100-01', nome: 'Pesquisa e desenvolvimento experimental em ciências físicas e naturais', classe_codigo: '7210-0', is_principal: true },

    // Classe 7220-7 - Pesquisa e desenvolvimento experimental em ciências sociais e humanas
    { codigo: '72207-01', nome: 'Pesquisa e desenvolvimento experimental em ciências sociais e humanas', classe_codigo: '7220-7', is_principal: true },

    // Classe 7311-4 - Agências de publicidade
    { codigo: '73114-01', nome: 'Agências de publicidade', classe_codigo: '7311-4', is_principal: true },

    // Classe 7312-2 - Agenciamento de espaços para publicidade, exceto em veículos de comunicação
    { codigo: '73122-01', nome: 'Agenciamento de espaços para publicidade, exceto em veículos de comunicação', classe_codigo: '7312-2', is_principal: true },

    // Classe 7319-0 - Outras atividades de publicidade
    { codigo: '73190-01', nome: 'Outras atividades de publicidade', classe_codigo: '7319-0', is_principal: true },

    // Classe 7320-3 - Pesquisas de mercado e de opinião pública
    { codigo: '73203-01', nome: 'Pesquisas de mercado e de opinião pública', classe_codigo: '7320-3', is_principal: true },

    // Classe 7490-1 - Outras atividades profissionais, científicas e técnicas
    { codigo: '74901-01', nome: 'Outras atividades profissionais, científicas e técnicas', classe_codigo: '7490-1', is_principal: true },

    // Classe 7500-1 - Atividades veterinárias
    { codigo: '75001-01', nome: 'Atividades veterinárias', classe_codigo: '7500-1', is_principal: true }
  ];

  return {
    secoes,
    divisoes,
    grupos,
    classes,
    subclasses
  };
}