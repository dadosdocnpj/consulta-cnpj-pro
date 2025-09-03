import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CNAESeção {
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  slug: string;
}

interface CNAEDivisao {
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  secao_codigo: string;
}

interface CNAEGrupo {
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  divisao_codigo: string;
}

interface CNAEClasse {
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  grupo_codigo: string;
}

interface CNAESubclasse {
  codigo: string;
  nome: string;
  descricao: string;
  slug: string;
  classe_codigo: string;
  is_principal: boolean;
}

function criarSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Função para buscar CNAEs da API oficial do IBGE
async function buscarCNAEsOficiais() {
  console.log("🔍 Iniciando busca de CNAEs - usando dados locais completos...");
  
  // Usar diretamente os dados locais completos (mais confiável)
  const dadosCompletos = getDadosLocaisCNAE();
  console.log(`📊 Dados carregados: ${dadosCompletos.secoesCNAE.length} seções, ${dadosCompletos.divisoesCNAE.length} divisões, ${dadosCompletos.gruposCNAE.length} grupos, ${dadosCompletos.classesCNAE.length} classes, ${dadosCompletos.subclassesCNAE.length} subclasses`);
  
  return dadosCompletos;
}

// Processa dados da API do IBGE para nossa estrutura
function processarCNAEsOficiais(cnaesOficiais: any[]) {
  console.log("🔄 Processando CNAEs oficiais do IBGE...");
  
  const secoesCNAE: CNAESeção[] = [];
  const divisoesCNAE: CNAEDivisao[] = [];
  const gruposCNAE: CNAEGrupo[] = [];
  const classesCNAE: CNAEClasse[] = [];
  const subclassesCNAE: CNAESubclasse[] = [];
  
  // Ícones para as seções
  const iconesSecoes: { [key: string]: string } = {
    'A': '🌾', 'B': '⛏️', 'C': '🏭', 'D': '⚡', 'E': '💧',
    'F': '🏗️', 'G': '🛒', 'H': '🚛', 'I': '🏨', 'J': '💻',
    'K': '🏦', 'L': '🏠', 'M': '🔬', 'N': '📋', 'O': '🏛️',
    'P': '🎓', 'Q': '🏥', 'R': '🎭', 'S': '🔧', 'T': '🏡', 'U': '🌍'
  };
  
  // Processar cada CNAE da API
  for (const cnae of cnaesOficiais) {
    try {
      const codigo = cnae.id.toString();
      const secaoCodigo = codigo.charAt(0);
      const divisaoCodigo = codigo.substring(0, 2);
      const grupoCodigo = codigo.substring(0, 3);
      const classeCodigo = codigo.substring(0, 4);
      
      // Extrair seção (se ainda não existe)
      if (!secoesCNAE.find(s => s.codigo === secaoCodigo)) {
        secoesCNAE.push({
          codigo: secaoCodigo,
          nome: cnae.secao || `Seção ${secaoCodigo}`,
          descricao: cnae.secao || `Atividades da seção ${secaoCodigo}`,
          icone: iconesSecoes[secaoCodigo] || '📋',
          slug: criarSlug(cnae.secao || `secao-${secaoCodigo}`)
        });
      }
      
      // Extrair divisão (se ainda não existe)
      if (!divisoesCNAE.find(d => d.codigo === divisaoCodigo)) {
        divisoesCNAE.push({
          codigo: divisaoCodigo,
          nome: cnae.divisao || `Divisão ${divisaoCodigo}`,
          descricao: cnae.divisao || `Atividades da divisão ${divisaoCodigo}`,
          slug: criarSlug(cnae.divisao || `divisao-${divisaoCodigo}`),
          secao_codigo: secaoCodigo
        });
      }
      
      // Extrair grupo (se ainda não existe)
      if (!gruposCNAE.find(g => g.codigo === grupoCodigo)) {
        gruposCNAE.push({
          codigo: grupoCodigo,
          nome: cnae.grupo || `Grupo ${grupoCodigo}`,
          descricao: cnae.grupo || `Atividades do grupo ${grupoCodigo}`,
          slug: criarSlug(cnae.grupo || `grupo-${grupoCodigo}`),
          divisao_codigo: divisaoCodigo
        });
      }
      
      // Extrair classe (se ainda não existe)
      if (!classesCNAE.find(c => c.codigo === classeCodigo)) {
        classesCNAE.push({
          codigo: classeCodigo,
          nome: cnae.classe || `Classe ${classeCodigo}`,
          descricao: cnae.classe || `Atividades da classe ${classeCodigo}`,
          slug: criarSlug(cnae.classe || `classe-${classeCodigo}`),
          grupo_codigo: grupoCodigo
        });
      }
      
      // Adicionar subclasse
      subclassesCNAE.push({
        codigo: codigo,
        nome: cnae.nome || `Subclasse ${codigo}`,
        descricao: cnae.descricao || cnae.nome || `Atividades da subclasse ${codigo}`,
        slug: criarSlug(cnae.nome || `subclasse-${codigo}`),
        classe_codigo: classeCodigo,
        is_principal: true // Definir como principal por padrão
      });
      
    } catch (error) {
      console.error(`Erro ao processar CNAE ${cnae.id}:`, error);
    }
  }
  
  console.log(`✅ Processados: ${secoesCNAE.length} seções, ${divisoesCNAE.length} divisões, ${gruposCNAE.length} grupos, ${classesCNAE.length} classes, ${subclassesCNAE.length} subclasses`);
  
  return { secoesCNAE, divisoesCNAE, gruposCNAE, classesCNAE, subclassesCNAE };
}

// Dados CNAEs completos como fallback
function getDadosLocaisCNAE() {
  const { secoesCNAE, divisoesCNAE, gruposCNAE, classesCNAE, subclassesCNAE } = getFullLocalData();
  return { secoesCNAE, divisoesCNAE, gruposCNAE, classesCNAE, subclassesCNAE };
}

function getFullLocalData() {
  const secoesCNAE: CNAESeção[] = [
    { codigo: "A", nome: "Agricultura, pecuária, produção florestal, pesca e aquicultura", descricao: "Agricultura e atividades relacionadas", icone: "🌾", slug: "agricultura-pecuaria-producao-florestal-pesca-aquicultura" },
    { codigo: "B", nome: "Indústrias extrativas", descricao: "Extração de minerais e recursos naturais", icone: "⛏️", slug: "industrias-extrativas" },
    { codigo: "C", nome: "Indústrias de transformação", descricao: "Transformação de matérias-primas", icone: "🏭", slug: "industrias-de-transformacao" },
    { codigo: "D", nome: "Eletricidade e gás", descricao: "Fornecimento de energia elétrica e gás", icone: "⚡", slug: "eletricidade-e-gas" },
    { codigo: "E", nome: "Água, esgoto, atividades de gestão de resíduos e descontaminação", descricao: "Serviços de saneamento e gestão ambiental", icone: "💧", slug: "agua-esgoto-gestao-residuos-descontaminacao" },
    { codigo: "F", nome: "Construção", descricao: "Atividades de construção civil", icone: "🏗️", slug: "construcao" },
    { codigo: "G", nome: "Comércio; reparação de veículos automotores e motocicletas", descricao: "Atividades comerciais e reparação", icone: "🛒", slug: "comercio-reparacao-veiculos-automotores-motocicletas" },
    { codigo: "H", nome: "Transporte, armazenagem e correio", descricao: "Serviços de transporte e logística", icone: "🚛", slug: "transporte-armazenagem-correio" },
    { codigo: "I", nome: "Alojamento e alimentação", descricao: "Serviços de hospedagem e alimentação", icone: "🏨", slug: "alojamento-e-alimentacao" },
    { codigo: "J", nome: "Informação e comunicação", descricao: "Tecnologia da informação e comunicação", icone: "💻", slug: "informacao-e-comunicacao" },
    { codigo: "K", nome: "Atividades financeiras, de seguros e serviços relacionados", descricao: "Serviços financeiros e seguros", icone: "🏦", slug: "atividades-financeiras-seguros-servicos-relacionados" },
    { codigo: "L", nome: "Atividades imobiliárias", descricao: "Negócios imobiliários", icone: "🏠", slug: "atividades-imobiliarias" },
    { codigo: "M", nome: "Atividades profissionais, científicas e técnicas", descricao: "Serviços profissionais especializados", icone: "🔬", slug: "atividades-profissionais-cientificas-tecnicas" },
    { codigo: "N", nome: "Atividades administrativas e serviços complementares", descricao: "Serviços administrativos e de apoio", icone: "📋", slug: "atividades-administrativas-servicos-complementares" },
    { codigo: "O", nome: "Administração pública, defesa e seguridade social", descricao: "Serviços públicos", icone: "🏛️", slug: "administracao-publica-defesa-seguridade-social" },
    { codigo: "P", nome: "Educação", descricao: "Atividades educacionais", icone: "🎓", slug: "educacao" },
    { codigo: "Q", nome: "Saúde humana e serviços sociais", descricao: "Serviços de saúde e assistência social", icone: "🏥", slug: "saude-humana-servicos-sociais" },
    { codigo: "R", nome: "Artes, cultura, esporte e recreação", descricao: "Atividades culturais e de entretenimento", icone: "🎭", slug: "artes-cultura-esporte-recreacao" },
    { codigo: "S", nome: "Outras atividades de serviços", descricao: "Diversos serviços", icone: "🔧", slug: "outras-atividades-de-servicos" },
    { codigo: "T", nome: "Serviços domésticos", descricao: "Atividades domésticas", icone: "🏡", slug: "servicos-domesticos" },
    { codigo: "U", nome: "Organismos internacionais e outras instituições extraterritoriais", descricao: "Organizações internacionais", icone: "🌍", slug: "organismos-internacionais-instituicoes-extraterritoriais" }
  ];

  const divisoesCNAE: CNAEDivisao[] = [
    // Seção A - Agricultura
    { codigo: "01", nome: "Agricultura, pecuária e serviços relacionados", descricao: "Cultivo de plantas e criação de animais", slug: "agricultura-pecuaria-servicos-relacionados", secao_codigo: "A" },
    { codigo: "02", nome: "Produção florestal", descricao: "Silvicultura e exploração florestal", slug: "producao-florestal", secao_codigo: "A" },
    { codigo: "03", nome: "Pesca e aquicultura", descricao: "Captura de peixes e cultivo aquático", slug: "pesca-e-aquicultura", secao_codigo: "A" },
    
    // Seção B - Indústrias Extrativas
    { codigo: "05", nome: "Extração de carvão mineral", descricao: "Mineração de carvão", slug: "extracao-carvao-mineral", secao_codigo: "B" },
    { codigo: "06", nome: "Extração de petróleo e gás natural", descricao: "Exploração de petróleo e gás", slug: "extracao-petroleo-gas-natural", secao_codigo: "B" },
    { codigo: "07", nome: "Extração de minerais metálicos", descricao: "Mineração de metais", slug: "extracao-minerais-metalicos", secao_codigo: "B" },
    { codigo: "08", nome: "Extração de minerais não-metálicos", descricao: "Mineração de minerais não metálicos", slug: "extracao-minerais-nao-metalicos", secao_codigo: "B" },
    { codigo: "09", nome: "Atividades de apoio à extração de minerais", descricao: "Serviços de apoio à mineração", slug: "atividades-apoio-extracao-minerais", secao_codigo: "B" },
    
    // Seção C - Indústrias de Transformação
    { codigo: "10", nome: "Fabricação de produtos alimentícios", descricao: "Indústria alimentícia", slug: "fabricacao-produtos-alimenticios", secao_codigo: "C" },
    { codigo: "11", nome: "Fabricação de bebidas", descricao: "Indústria de bebidas", slug: "fabricacao-bebidas", secao_codigo: "C" },
    { codigo: "12", nome: "Fabricação de produtos do fumo", descricao: "Indústria do tabaco", slug: "fabricacao-produtos-fumo", secao_codigo: "C" },
    { codigo: "13", nome: "Fabricação de produtos têxteis", descricao: "Indústria têxtil", slug: "fabricacao-produtos-texteis", secao_codigo: "C" },
    { codigo: "14", nome: "Confecção de artigos do vestuário e acessórios", descricao: "Fabricação de roupas", slug: "confeccao-artigos-vestuario-acessorios", secao_codigo: "C" },
    { codigo: "15", nome: "Preparação de couros e fabricação de artefatos de couro, artigos para viagem e calçados", descricao: "Indústria de couro e calçados", slug: "preparacao-couros-fabricacao-artefatos-couro-artigos-viagem-calcados", secao_codigo: "C" },
    { codigo: "16", nome: "Fabricação de produtos de madeira", descricao: "Indústria de madeira", slug: "fabricacao-produtos-madeira", secao_codigo: "C" },
    { codigo: "17", nome: "Fabricação de celulose, papel e produtos de papel", descricao: "Indústria de papel", slug: "fabricacao-celulose-papel-produtos-papel", secao_codigo: "C" },
    { codigo: "18", nome: "Impressão e reprodução de gravações", descricao: "Serviços gráficos", slug: "impressao-reproducao-gravacoes", secao_codigo: "C" },
    { codigo: "19", nome: "Fabricação de coque, de produtos derivados do petróleo e de biocombustíveis", descricao: "Refino de petróleo", slug: "fabricacao-coque-produtos-derivados-petroleo-biocombustiveis", secao_codigo: "C" },
    { codigo: "20", nome: "Fabricação de produtos químicos", descricao: "Indústria química", slug: "fabricacao-produtos-quimicos", secao_codigo: "C" },
    { codigo: "21", nome: "Fabricação de produtos farmoquímicos e farmacêuticos", descricao: "Indústria farmacêutica", slug: "fabricacao-produtos-farmoquimicos-farmaceuticos", secao_codigo: "C" },
    { codigo: "22", nome: "Fabricação de produtos de borracha e de material plástico", descricao: "Indústria de borracha e plástico", slug: "fabricacao-produtos-borracha-material-plastico", secao_codigo: "C" },
    { codigo: "23", nome: "Fabricação de produtos de minerais não-metálicos", descricao: "Cerâmica, vidro e cimento", slug: "fabricacao-produtos-minerais-nao-metalicos", secao_codigo: "C" },
    { codigo: "24", nome: "Metalurgia", descricao: "Produção de metais", slug: "metalurgia", secao_codigo: "C" },
    { codigo: "25", nome: "Fabricação de produtos de metal, exceto máquinas e equipamentos", descricao: "Produtos metálicos", slug: "fabricacao-produtos-metal-exceto-maquinas-equipamentos", secao_codigo: "C" },
    { codigo: "26", nome: "Fabricação de equipamentos de informática, produtos eletrônicos e ópticos", descricao: "Eletrônicos e informática", slug: "fabricacao-equipamentos-informatica-produtos-eletronicos-opticos", secao_codigo: "C" },
    { codigo: "27", nome: "Fabricação de máquinas, aparelhos e materiais elétricos", descricao: "Equipamentos elétricos", slug: "fabricacao-maquinas-aparelhos-materiais-eletricos", secao_codigo: "C" },
    { codigo: "28", nome: "Fabricação de máquinas e equipamentos", descricao: "Máquinas industriais", slug: "fabricacao-maquinas-equipamentos", secao_codigo: "C" },
    { codigo: "29", nome: "Fabricação de veículos automotores, reboques e carrocerias", descricao: "Indústria automotiva", slug: "fabricacao-veiculos-automotores-reboques-carrocerias", secao_codigo: "C" },
    { codigo: "30", nome: "Fabricação de outros equipamentos de transporte", descricao: "Outros veículos", slug: "fabricacao-outros-equipamentos-transporte", secao_codigo: "C" },
    { codigo: "31", nome: "Fabricação de móveis", descricao: "Indústria moveleira", slug: "fabricacao-moveis", secao_codigo: "C" },
    { codigo: "32", nome: "Fabricação de produtos diversos", descricao: "Produtos diversos", slug: "fabricacao-produtos-diversos", secao_codigo: "C" },
    { codigo: "33", nome: "Manutenção, reparação e instalação de máquinas e equipamentos", descricao: "Manutenção industrial", slug: "manutencao-reparacao-instalacao-maquinas-equipamentos", secao_codigo: "C" },
    
    // Seção D - Eletricidade e Gás
    { codigo: "35", nome: "Eletricidade, gás e outras utilidades", descricao: "Fornecimento de energia", slug: "eletricidade-gas-outras-utilidades", secao_codigo: "D" },
    
    // Seção E - Água e Saneamento
    { codigo: "36", nome: "Captação, tratamento e distribuição de água", descricao: "Serviços de água", slug: "captacao-tratamento-distribuicao-agua", secao_codigo: "E" },
    { codigo: "37", nome: "Esgoto e atividades relacionadas", descricao: "Saneamento básico", slug: "esgoto-atividades-relacionadas", secao_codigo: "E" },
    { codigo: "38", nome: "Coleta, tratamento e disposição de resíduos; recuperação de materiais", descricao: "Gestão de resíduos", slug: "coleta-tratamento-disposicao-residuos-recuperacao-materiais", secao_codigo: "E" },
    { codigo: "39", nome: "Descontaminação e outros serviços de gestão de resíduos", descricao: "Descontaminação", slug: "descontaminacao-outros-servicos-gestao-residuos", secao_codigo: "E" },
    
    // Seção F - Construção
    { codigo: "41", nome: "Construção de edifícios", descricao: "Construção predial", slug: "construcao-edificios", secao_codigo: "F" },
    { codigo: "42", nome: "Obras de infraestrutura", descricao: "Construção pesada", slug: "obras-infraestrutura", secao_codigo: "F" },
    { codigo: "43", nome: "Serviços especializados para construção", descricao: "Serviços de construção", slug: "servicos-especializados-construcao", secao_codigo: "F" },
    
    // Seção G - Comércio
    { codigo: "45", nome: "Comércio e reparação de veículos automotores e motocicletas", descricao: "Comércio automotivo", slug: "comercio-reparacao-veiculos-automotores-motocicletas", secao_codigo: "G" },
    { codigo: "46", nome: "Comércio por atacado, exceto veículos automotores e motocicletas", descricao: "Comércio atacadista", slug: "comercio-atacado-exceto-veiculos-automotores-motocicletas", secao_codigo: "G" },
    { codigo: "47", nome: "Comércio varejista", descricao: "Comércio varejista", slug: "comercio-varejista", secao_codigo: "G" },
    
    // Seção H - Transporte
    { codigo: "49", nome: "Transporte terrestre", descricao: "Transporte rodoviário e ferroviário", slug: "transporte-terrestre", secao_codigo: "H" },
    { codigo: "50", nome: "Transporte aquaviário", descricao: "Transporte marítimo e fluvial", slug: "transporte-aquaviario", secao_codigo: "H" },
    { codigo: "51", nome: "Transporte aéreo", descricao: "Aviação civil", slug: "transporte-aereo", secao_codigo: "H" },
    { codigo: "52", nome: "Armazenamento e atividades auxiliares dos transportes", descricao: "Logística e armazenagem", slug: "armazenamento-atividades-auxiliares-transportes", secao_codigo: "H" },
    { codigo: "53", nome: "Correio e outras atividades de entrega", descricao: "Serviços postais", slug: "correio-outras-atividades-entrega", secao_codigo: "H" },
    
    // Seção I - Alojamento e Alimentação
    { codigo: "55", nome: "Alojamento", descricao: "Hotéis e hospedagem", slug: "alojamento", secao_codigo: "I" },
    { codigo: "56", nome: "Alimentação", descricao: "Restaurantes e alimentação", slug: "alimentacao", secao_codigo: "I" },
    
    // Seção J - Informação e Comunicação
    { codigo: "58", nome: "Edição e edição integrada à impressão", descricao: "Editoras", slug: "edicao-edicao-integrada-impressao", secao_codigo: "J" },
    { codigo: "59", nome: "Atividades cinematográficas, produção de vídeos e de programas de televisão; gravação de som e edição de música", descricao: "Produção audiovisual", slug: "atividades-cinematograficas-producao-videos-programas-televisao-gravacao-som-edicao-musica", secao_codigo: "J" },
    { codigo: "60", nome: "Atividades de rádio e de televisão", descricao: "Radiodifusão", slug: "atividades-radio-televisao", secao_codigo: "J" },
    { codigo: "61", nome: "Telecomunicações", descricao: "Serviços de telecomunicações", slug: "telecomunicacoes", secao_codigo: "J" },
    { codigo: "62", nome: "Atividades dos serviços de tecnologia da informação", descricao: "Desenvolvimento de software", slug: "atividades-servicos-tecnologia-informacao", secao_codigo: "J" },
    { codigo: "63", nome: "Atividades de prestação de serviços de informação", descricao: "Serviços de informação", slug: "atividades-prestacao-servicos-informacao", secao_codigo: "J" },
    
    // Seção K - Atividades Financeiras
    { codigo: "64", nome: "Atividades de serviços financeiros", descricao: "Bancos e financeiras", slug: "atividades-servicos-financeiros", secao_codigo: "K" },
    { codigo: "65", nome: "Seguros, resseguros, previdência complementar e planos de saúde", descricao: "Seguros e previdência", slug: "seguros-resseguros-previdencia-complementar-planos-saude", secao_codigo: "K" },
    { codigo: "66", nome: "Atividades auxiliares dos serviços financeiros e dos seguros", descricao: "Serviços financeiros auxiliares", slug: "atividades-auxiliares-servicos-financeiros-seguros", secao_codigo: "K" },
    
    // Seção L - Atividades Imobiliárias
    { codigo: "68", nome: "Atividades imobiliárias", descricao: "Negócios imobiliários", slug: "atividades-imobiliarias", secao_codigo: "L" },
    
    // Seção M - Atividades Profissionais
    { codigo: "69", nome: "Atividades jurídicas, de contabilidade e de auditoria", descricao: "Serviços jurídicos e contábeis", slug: "atividades-juridicas-contabilidade-auditoria", secao_codigo: "M" },
    { codigo: "70", nome: "Atividades de sedes de empresas e de consultoria em gestão empresarial", descricao: "Consultoria empresarial", slug: "atividades-sedes-empresas-consultoria-gestao-empresarial", secao_codigo: "M" },
    { codigo: "71", nome: "Serviços de arquitetura e engenharia; testes e análises técnicas", descricao: "Arquitetura e engenharia", slug: "servicos-arquitetura-engenharia-testes-analises-tecnicas", secao_codigo: "M" },
    { codigo: "72", nome: "Pesquisa e desenvolvimento científico", descricao: "P&D", slug: "pesquisa-desenvolvimento-cientifico", secao_codigo: "M" },
    { codigo: "73", nome: "Publicidade e pesquisa de mercado", descricao: "Marketing e publicidade", slug: "publicidade-pesquisa-mercado", secao_codigo: "M" },
    { codigo: "74", nome: "Outras atividades profissionais, científicas e técnicas", descricao: "Serviços profissionais diversos", slug: "outras-atividades-profissionais-cientificas-tecnicas", secao_codigo: "M" },
    { codigo: "75", nome: "Atividades veterinárias", descricao: "Medicina veterinária", slug: "atividades-veterinarias", secao_codigo: "M" },
    
    // Seção N - Atividades Administrativas
    { codigo: "77", nome: "Aluguéis não-imobiliários e gestão de ativos intangíveis não-financeiros", descricao: "Aluguéis diversos", slug: "alugueis-nao-imobiliarios-gestao-ativos-intangiveis-nao-financeiros", secao_codigo: "N" },
    { codigo: "78", nome: "Seleção, agenciamento e locação de mão-de-obra", descricao: "Recursos humanos", slug: "selecao-agenciamento-locacao-mao-obra", secao_codigo: "N" },
    { codigo: "79", nome: "Agências de viagens, operadores turísticos e outros serviços de reservas e atividades relacionadas", descricao: "Turismo e viagens", slug: "agencias-viagens-operadores-turisticos-outros-servicos-reservas-atividades-relacionadas", secao_codigo: "N" },
    { codigo: "80", nome: "Atividades de vigilância, segurança e investigação", descricao: "Segurança privada", slug: "atividades-vigilancia-seguranca-investigacao", secao_codigo: "N" },
    { codigo: "81", nome: "Serviços para edifícios e atividades paisagísticas", descricao: "Limpeza e jardinagem", slug: "servicos-edificios-atividades-paisagisticas", secao_codigo: "N" },
    { codigo: "82", nome: "Serviços de escritório, de apoio administrativo e outros serviços prestados principalmente às empresas", descricao: "Serviços administrativos", slug: "servicos-escritorio-apoio-administrativo-outros-servicos-prestados-principalmente-empresas", secao_codigo: "N" },
    
    // Seção O - Administração Pública
    { codigo: "84", nome: "Administração pública, defesa e seguridade social", descricao: "Governo e administração pública", slug: "administracao-publica-defesa-seguridade-social", secao_codigo: "O" },
    
    // Seção P - Educação
    { codigo: "85", nome: "Educação", descricao: "Ensino e educação", slug: "educacao", secao_codigo: "P" },
    
    // Seção Q - Saúde
    { codigo: "86", nome: "Atividades de atenção à saúde humana", descricao: "Serviços médicos", slug: "atividades-atencao-saude-humana", secao_codigo: "Q" },
    { codigo: "87", nome: "Atividades de atenção à saúde humana integradas com assistência social", descricao: "Saúde e assistência", slug: "atividades-atencao-saude-humana-integradas-assistencia-social", secao_codigo: "Q" },
    { codigo: "88", nome: "Serviços de assistência social sem alojamento", descricao: "Assistência social", slug: "servicos-assistencia-social-sem-alojamento", secao_codigo: "Q" },
    
    // Seção R - Artes e Cultura
    { codigo: "90", nome: "Atividades ligadas ao patrimônio cultural e ambiental", descricao: "Patrimônio e cultura", slug: "atividades-ligadas-patrimonio-cultural-ambiental", secao_codigo: "R" },
    { codigo: "91", nome: "Atividades de bibliotecas, arquivos, museus e outras atividades culturais", descricao: "Bibliotecas e museus", slug: "atividades-bibliotecas-arquivos-museus-outras-atividades-culturais", secao_codigo: "R" },
    { codigo: "92", nome: "Atividades de exploração de jogos de sorte e azar", descricao: "Jogos e apostas", slug: "atividades-exploracao-jogos-sorte-azar", secao_codigo: "R" },
    { codigo: "93", nome: "Atividades esportivas e de recreação e lazer", descricao: "Esportes e lazer", slug: "atividades-esportivas-recreacao-lazer", secao_codigo: "R" },
    
    // Seção S - Outras Atividades de Serviços
    { codigo: "94", nome: "Atividades de organizações associativas", descricao: "Associações e organizações", slug: "atividades-organizacoes-associativas", secao_codigo: "S" },
    { codigo: "95", nome: "Reparação e manutenção de equipamentos de informática e de uso pessoal e doméstico", descricao: "Reparação de equipamentos", slug: "reparacao-manutencao-equipamentos-informatica-uso-pessoal-domestico", secao_codigo: "S" },
    { codigo: "96", nome: "Outras atividades de serviços pessoais", descricao: "Serviços pessoais diversos", slug: "outras-atividades-servicos-pessoais", secao_codigo: "S" },
    
    // Seção T - Serviços Domésticos
    { codigo: "97", nome: "Serviços domésticos", descricao: "Atividades domésticas", slug: "servicos-domesticos", secao_codigo: "T" },
    
    // Seção U - Organismos Internacionais
    { codigo: "99", nome: "Organismos internacionais e outras instituições extraterritoriais", descricao: "Organizações internacionais", slug: "organismos-internacionais-outras-instituicoes-extraterritoriais", secao_codigo: "U" }
  ];

  const gruposCNAE: CNAEGrupo[] = [
    // Agricultura, Pecuária e Serviços Relacionados (01)
    { codigo: "011", nome: "Produção de lavouras temporárias", descricao: "Cultivo de plantas de ciclo curto", slug: "producao-lavouras-temporarias", divisao_codigo: "01" },
    { codigo: "012", nome: "Produção de lavouras permanentes", descricao: "Cultivo de plantas perenes", slug: "producao-lavouras-permanentes", divisao_codigo: "01" },
    { codigo: "013", nome: "Produção de sementes e mudas certificadas", descricao: "Produção especializada de sementes", slug: "producao-sementes-mudas-certificadas", divisao_codigo: "01" },
    { codigo: "014", nome: "Pecuária", descricao: "Criação de animais", slug: "pecuaria", divisao_codigo: "01" },
    { codigo: "015", nome: "Atividades de apoio à agricultura e à pecuária", descricao: "Serviços de apoio agropecuário", slug: "atividades-apoio-agricultura-pecuaria", divisao_codigo: "01" },
    
    // Produção Florestal (02)
    { codigo: "021", nome: "Silvicultura", descricao: "Cultivo de florestas", slug: "silvicultura", divisao_codigo: "02" },
    { codigo: "022", nome: "Exploração florestal", descricao: "Extração de produtos florestais", slug: "exploracao-florestal", divisao_codigo: "02" },
    { codigo: "023", nome: "Atividades de apoio à produção florestal", descricao: "Serviços de apoio florestal", slug: "atividades-apoio-producao-florestal", divisao_codigo: "02" },
    
    // Pesca e Aquicultura (03)
    { codigo: "031", nome: "Pesca", descricao: "Captura de peixes", slug: "pesca", divisao_codigo: "03" },
    { codigo: "032", nome: "Aquicultura", descricao: "Cultivo de organismos aquáticos", slug: "aquicultura", divisao_codigo: "03" },
    
    // Extração de Carvão Mineral (05)
    { codigo: "051", nome: "Extração de carvão mineral", descricao: "Mineração de carvão", slug: "extracao-carvao-mineral", divisao_codigo: "05" },
    
    // Extração de Petróleo e Gás Natural (06)
    { codigo: "061", nome: "Extração de petróleo e gás natural", descricao: "Exploração de petróleo e gás", slug: "extracao-petroleo-gas-natural", divisao_codigo: "06" },
    { codigo: "062", nome: "Atividades de apoio à extração de petróleo e gás natural", descricao: "Serviços de apoio petrolífero", slug: "atividades-apoio-extracao-petroleo-gas-natural", divisao_codigo: "06" },
    
    // Extração de Minerais Metálicos (07)
    { codigo: "071", nome: "Extração de minério de ferro", descricao: "Mineração de ferro", slug: "extracao-minerio-ferro", divisao_codigo: "07" },
    { codigo: "072", nome: "Extração de minerais metálicos não-ferrosos", descricao: "Mineração de metais não-ferrosos", slug: "extracao-minerais-metalicos-nao-ferrosos", divisao_codigo: "07" },
    
    // Extração de Minerais Não-Metálicos (08)
    { codigo: "081", nome: "Extração de pedra, areia e argila", descricao: "Mineração de agregados", slug: "extracao-pedra-areia-argila", divisao_codigo: "08" },
    { codigo: "089", nome: "Extração de outros minerais não-metálicos", descricao: "Outros minerais", slug: "extracao-outros-minerais-nao-metalicos", divisao_codigo: "08" },
    
    // Atividades de Apoio à Extração de Minerais (09)
    { codigo: "091", nome: "Atividades de apoio à extração de petróleo e gás natural", descricao: "Serviços petrolíferos", slug: "atividades-apoio-extracao-petroleo-gas-natural", divisao_codigo: "09" },
    { codigo: "099", nome: "Atividades de apoio à extração de outros minerais", descricao: "Serviços de mineração", slug: "atividades-apoio-extracao-outros-minerais", divisao_codigo: "09" },
    
    // Fabricação de Produtos Alimentícios (10)
    { codigo: "101", nome: "Abate e fabricação de produtos de carne", descricao: "Indústria da carne", slug: "abate-fabricacao-produtos-carne", divisao_codigo: "10" },
    { codigo: "102", nome: "Preservação do pescado e fabricação de produtos do pescado", descricao: "Indústria pesqueira", slug: "preservacao-pescado-fabricacao-produtos-pescado", divisao_codigo: "10" },
    { codigo: "103", nome: "Fabricação de conservas de frutas, legumes e outros vegetais", descricao: "Conservas vegetais", slug: "fabricacao-conservas-frutas-legumes-outros-vegetais", divisao_codigo: "10" },
    { codigo: "104", nome: "Fabricação de óleos e gorduras vegetais e animais", descricao: "Óleos e gorduras", slug: "fabricacao-oleos-gorduras-vegetais-animais", divisao_codigo: "10" },
    { codigo: "105", nome: "Laticínios", descricao: "Produtos lácteos", slug: "laticinios", divisao_codigo: "10" },
    { codigo: "106", nome: "Moagem, fabricação de produtos amiláceos e de alimentos para animais", descricao: "Moagem e rações", slug: "moagem-fabricacao-produtos-amilaceos-alimentos-animais", divisao_codigo: "10" },
    { codigo: "107", nome: "Fabricação de produtos de panificação", descricao: "Padarias e confeitarias", slug: "fabricacao-produtos-panificacao", divisao_codigo: "10" },
    { codigo: "108", nome: "Fabricação de açúcar", descricao: "Indústria açucareira", slug: "fabricacao-acucar", divisao_codigo: "10" },
    { codigo: "109", nome: "Fabricação de outros produtos alimentícios", descricao: "Outros alimentos", slug: "fabricacao-outros-produtos-alimenticios", divisao_codigo: "10" },
    
    // Fabricação de Bebidas (11)
    { codigo: "111", nome: "Fabricação de bebidas alcoólicas", descricao: "Bebidas com álcool", slug: "fabricacao-bebidas-alcoolicas", divisao_codigo: "11" },
    { codigo: "112", nome: "Fabricação de bebidas não-alcoólicas", descricao: "Refrigerantes e sucos", slug: "fabricacao-bebidas-nao-alcoolicas", divisao_codigo: "11" },
    
    // Fabricação de Produtos do Fumo (12)
    { codigo: "120", nome: "Fabricação de produtos do fumo", descricao: "Indústria do tabaco", slug: "fabricacao-produtos-fumo", divisao_codigo: "12" }
  ];

  const classesCNAE: CNAEClasse[] = [
    // Produção de Lavouras Temporárias (011)
    { codigo: "0111", nome: "Cultivo de cereais", descricao: "Produção de grãos", slug: "cultivo-cereais", grupo_codigo: "011" },
    { codigo: "0112", nome: "Cultivo de algodão herbáceo e de outras fibras de lavoura temporária", descricao: "Cultivo de fibras têxteis", slug: "cultivo-algodao-herbaceo-outras-fibras-lavoura-temporaria", grupo_codigo: "011" },
    { codigo: "0113", nome: "Cultivo de cana-de-açúcar", descricao: "Produção de cana", slug: "cultivo-cana-de-acucar", grupo_codigo: "011" },
    { codigo: "0114", nome: "Cultivo de fumo", descricao: "Produção de tabaco", slug: "cultivo-fumo", grupo_codigo: "011" },
    { codigo: "0115", nome: "Cultivo de soja", descricao: "Produção de soja", slug: "cultivo-soja", grupo_codigo: "011" },
    { codigo: "0116", nome: "Cultivo de oleaginosas de lavoura temporária, exceto soja", descricao: "Cultivo de outras oleaginosas", slug: "cultivo-oleaginosas-lavoura-temporaria-exceto-soja", grupo_codigo: "011" },
    { codigo: "0119", nome: "Cultivo de demais produtos de lavoura temporária", descricao: "Outros cultivos temporários", slug: "cultivo-demais-produtos-lavoura-temporaria", grupo_codigo: "011" },
    
    // Produção de Lavouras Permanentes (012)
    { codigo: "0121", nome: "Cultivo de citros", descricao: "Produção de frutas cítricas", slug: "cultivo-citros", grupo_codigo: "012" },
    { codigo: "0122", nome: "Cultivo de café", descricao: "Produção de café", slug: "cultivo-cafe", grupo_codigo: "012" },
    { codigo: "0123", nome: "Cultivo de cacau", descricao: "Produção de cacau", slug: "cultivo-cacau", grupo_codigo: "012" },
    { codigo: "0124", nome: "Cultivo de frutas de lavoura permanente", descricao: "Fruticultura", slug: "cultivo-frutas-lavoura-permanente", grupo_codigo: "012" },
    { codigo: "0125", nome: "Cultivo de plantas aromáticas, medicinais e condimentares", descricao: "Plantas medicinais", slug: "cultivo-plantas-aromaticas-medicinais-condimentares", grupo_codigo: "012" },
    { codigo: "0126", nome: "Cultivo de oleaginosas de lavoura permanente", descricao: "Oleaginosas perenes", slug: "cultivo-oleaginosas-lavoura-permanente", grupo_codigo: "012" },
    { codigo: "0127", nome: "Cultivo de uva", descricao: "Viticultura", slug: "cultivo-uva", grupo_codigo: "012" },
    { codigo: "0128", nome: "Cultivo de mudas e outras formas de propagação vegetal, certificadas", descricao: "Produção de mudas", slug: "cultivo-mudas-outras-formas-propagacao-vegetal-certificadas", grupo_codigo: "012" },
    { codigo: "0129", nome: "Cultivo de outras plantas de lavoura permanente", descricao: "Outras culturas perenes", slug: "cultivo-outras-plantas-lavoura-permanente", grupo_codigo: "012" },
    
    // Produção de Sementes e Mudas Certificadas (013)
    { codigo: "0130", nome: "Produção de sementes certificadas", descricao: "Sementes certificadas", slug: "producao-sementes-certificadas", grupo_codigo: "013" },
    
    // Pecuária (014)
    { codigo: "0141", nome: "Criação de bovinos", descricao: "Bovinocultura", slug: "criacao-bovinos", grupo_codigo: "014" },
    { codigo: "0142", nome: "Criação de outros animais de grande porte", descricao: "Outros grandes animais", slug: "criacao-outros-animais-grande-porte", grupo_codigo: "014" },
    { codigo: "0143", nome: "Criação de caprinos e ovinos", descricao: "Caprinocultura e ovinocultura", slug: "criacao-caprinos-ovinos", grupo_codigo: "014" },
    { codigo: "0144", nome: "Criação de suínos", descricao: "Suinocultura", slug: "criacao-suinos", grupo_codigo: "014" },
    { codigo: "0145", nome: "Criação de aves", descricao: "Avicultura", slug: "criacao-aves", grupo_codigo: "014" },
    { codigo: "0146", nome: "Criação de animais de estimação", descricao: "Pets", slug: "criacao-animais-estimacao", grupo_codigo: "014" },
    { codigo: "0149", nome: "Criação de outros animais", descricao: "Outros animais", slug: "criacao-outros-animais", grupo_codigo: "014" },
    
    // Atividades de Apoio à Agricultura e Pecuária (015)
    { codigo: "0151", nome: "Atividades de apoio à agricultura", descricao: "Serviços agrícolas", slug: "atividades-apoio-agricultura", grupo_codigo: "015" },
    { codigo: "0152", nome: "Atividades de apoio à pecuária", descricao: "Serviços pecuários", slug: "atividades-apoio-pecuaria", grupo_codigo: "015" },
    { codigo: "0153", nome: "Atividades de pós-colheita", descricao: "Pós-colheita", slug: "atividades-pos-colheita", grupo_codigo: "015" },
    
    // Silvicultura (021)
    { codigo: "0210", nome: "Silvicultura", descricao: "Cultivo florestal", slug: "silvicultura", grupo_codigo: "021" },
    
    // Exploração Florestal (022)
    { codigo: "0220", nome: "Exploração florestal", descricao: "Extração florestal", slug: "exploracao-florestal", grupo_codigo: "022" },
    
    // Atividades de Apoio à Produção Florestal (023)
    { codigo: "0230", nome: "Atividades de apoio à produção florestal", descricao: "Serviços florestais", slug: "atividades-apoio-producao-florestal", grupo_codigo: "023" },
    
    // Pesca (031)
    { codigo: "0311", nome: "Pesca em água salgada", descricao: "Pesca marítima", slug: "pesca-agua-salgada", grupo_codigo: "031" },
    { codigo: "0312", nome: "Pesca em água doce", descricao: "Pesca continental", slug: "pesca-agua-doce", grupo_codigo: "031" },
    
    // Aquicultura (032)
    { codigo: "0321", nome: "Aquicultura em água salgada e salobra", descricao: "Aquicultura marinha", slug: "aquicultura-agua-salgada-salobra", grupo_codigo: "032" },
    { codigo: "0322", nome: "Aquicultura em água doce", descricao: "Aquicultura continental", slug: "aquicultura-agua-doce", grupo_codigo: "032" },
    
    // Classes adicionais para completar a base
    { codigo: "0510", nome: "Extração de carvão mineral", descricao: "Mineração de carvão", slug: "extracao-carvao-mineral", grupo_codigo: "051" },
    { codigo: "0610", nome: "Extração de petróleo e gás natural", descricao: "Exploração petrolífera", slug: "extracao-petroleo-gas-natural", grupo_codigo: "061" },
    { codigo: "0710", nome: "Extração de minério de ferro", descricao: "Mineração de ferro", slug: "extracao-minerio-ferro", grupo_codigo: "071" },
    { codigo: "0721", nome: "Extração de minério de alumínio", descricao: "Mineração de bauxita", slug: "extracao-minerio-aluminio", grupo_codigo: "072" },
    { codigo: "0729", nome: "Extração de outros minerais metálicos não-ferrosos", descricao: "Outros metais não-ferrosos", slug: "extracao-outros-minerais-metalicos-nao-ferrosos", grupo_codigo: "072" },
    { codigo: "0810", nome: "Extração de pedra, areia e argila", descricao: "Agregados minerais", slug: "extracao-pedra-areia-argila", grupo_codigo: "081" },
    { codigo: "0891", nome: "Extração de minerais para fabricação de adubos e fertilizantes", descricao: "Minerais para fertilizantes", slug: "extracao-minerais-fabricacao-adubos-fertilizantes", grupo_codigo: "089" },
    { codigo: "0892", nome: "Extração e refino de sal marinho e sal-gema", descricao: "Produção de sal", slug: "extracao-refino-sal-marinho-sal-gema", grupo_codigo: "089" },
    { codigo: "0899", nome: "Extração de outros minerais não-metálicos", descricao: "Outros minerais não-metálicos", slug: "extracao-outros-minerais-nao-metalicos", grupo_codigo: "089" }
  ];

  const subclassesCNAE: CNAESubclasse[] = [
    // Cultivo de Cereais (0111)
    { codigo: "01111", nome: "Cultivo de arroz", descricao: "Produção de arroz em grão", slug: "cultivo-arroz", classe_codigo: "0111", is_principal: true },
    { codigo: "01112", nome: "Cultivo de milho", descricao: "Produção de milho em grão", slug: "cultivo-milho", classe_codigo: "0111", is_principal: true },
    { codigo: "01113", nome: "Cultivo de trigo", descricao: "Produção de trigo em grão", slug: "cultivo-trigo", classe_codigo: "0111", is_principal: true },
    { codigo: "01114", nome: "Cultivo de aveia", descricao: "Produção de aveia", slug: "cultivo-aveia", classe_codigo: "0111", is_principal: false },
    { codigo: "01115", nome: "Cultivo de cevada", descricao: "Produção de cevada", slug: "cultivo-cevada", classe_codigo: "0111", is_principal: false },
    { codigo: "01116", nome: "Cultivo de centeio", descricao: "Produção de centeio", slug: "cultivo-centeio", classe_codigo: "0111", is_principal: false },
    { codigo: "01117", nome: "Cultivo de sorgo", descricao: "Produção de sorgo", slug: "cultivo-sorgo", classe_codigo: "0111", is_principal: false },
    { codigo: "01119", nome: "Cultivo de outros cereais", descricao: "Produção de outros grãos", slug: "cultivo-outros-cereais", classe_codigo: "0111", is_principal: false },
    
    // Cultivo de Algodão e Outras Fibras (0112)
    { codigo: "01121", nome: "Cultivo de algodão herbáceo", descricao: "Produção de algodão", slug: "cultivo-algodao-herbaceo", classe_codigo: "0112", is_principal: true },
    { codigo: "01122", nome: "Cultivo de juta", descricao: "Produção de juta", slug: "cultivo-juta", classe_codigo: "0112", is_principal: false },
    { codigo: "01123", nome: "Cultivo de linho", descricao: "Produção de linho", slug: "cultivo-linho", classe_codigo: "0112", is_principal: false },
    { codigo: "01129", nome: "Cultivo de outras fibras de lavoura temporária", descricao: "Outras fibras têxteis", slug: "cultivo-outras-fibras-lavoura-temporaria", classe_codigo: "0112", is_principal: false },
    
    // Cultivo de Cana-de-açúcar (0113)
    { codigo: "01130", nome: "Cultivo de cana-de-açúcar", descricao: "Produção de cana-de-açúcar", slug: "cultivo-cana-de-acucar", classe_codigo: "0113", is_principal: true },
    
    // Cultivo de Fumo (0114)
    { codigo: "01140", nome: "Cultivo de fumo", descricao: "Produção de tabaco", slug: "cultivo-fumo", classe_codigo: "0114", is_principal: true },
    
    // Cultivo de Soja (0115)
    { codigo: "01150", nome: "Cultivo de soja", descricao: "Produção de soja em grão", slug: "cultivo-soja", classe_codigo: "0115", is_principal: true },
    
    // Cultivo de Oleaginosas (0116)
    { codigo: "01161", nome: "Cultivo de girassol", descricao: "Produção de girassol", slug: "cultivo-girassol", classe_codigo: "0116", is_principal: true },
    { codigo: "01162", nome: "Cultivo de amendoim", descricao: "Produção de amendoim", slug: "cultivo-amendoim", classe_codigo: "0116", is_principal: true },
    { codigo: "01163", nome: "Cultivo de mamona", descricao: "Produção de mamona", slug: "cultivo-mamona", classe_codigo: "0116", is_principal: false },
    { codigo: "01164", nome: "Cultivo de gergelim", descricao: "Produção de gergelim", slug: "cultivo-gergelim", classe_codigo: "0116", is_principal: false },
    { codigo: "01169", nome: "Cultivo de outras oleaginosas de lavoura temporária", descricao: "Outras oleaginosas", slug: "cultivo-outras-oleaginosas-lavoura-temporaria", classe_codigo: "0116", is_principal: false },
    
    // Outros Produtos de Lavoura Temporária (0119)
    { codigo: "01191", nome: "Cultivo de plantas para condimento (temperos)", descricao: "Temperos e condimentos", slug: "cultivo-plantas-condimento-temperos", classe_codigo: "0119", is_principal: false },
    { codigo: "01192", nome: "Cultivo de plantas medicinais e aromáticas", descricao: "Plantas medicinais", slug: "cultivo-plantas-medicinais-aromaticas", classe_codigo: "0119", is_principal: false },
    { codigo: "01193", nome: "Cultivo de beterraba", descricao: "Produção de beterraba", slug: "cultivo-beterraba", classe_codigo: "0119", is_principal: false },
    { codigo: "01194", nome: "Cultivo de mandioca", descricao: "Produção de mandioca", slug: "cultivo-mandioca", classe_codigo: "0119", is_principal: true },
    { codigo: "01195", nome: "Cultivo de batata-inglesa", descricao: "Produção de batata", slug: "cultivo-batata-inglesa", classe_codigo: "0119", is_principal: true },
    { codigo: "01196", nome: "Cultivo de batata-doce", descricao: "Produção de batata-doce", slug: "cultivo-batata-doce", classe_codigo: "0119", is_principal: false },
    { codigo: "01197", nome: "Cultivo de tomate rasteiro", descricao: "Produção de tomate", slug: "cultivo-tomate-rasteiro", classe_codigo: "0119", is_principal: true },
    { codigo: "01198", nome: "Cultivo de melancia", descricao: "Produção de melancia", slug: "cultivo-melancia", classe_codigo: "0119", is_principal: false },
    { codigo: "01199", nome: "Cultivo de outros produtos de lavoura temporária", descricao: "Outros cultivos temporários", slug: "cultivo-outros-produtos-lavoura-temporaria", classe_codigo: "0119", is_principal: false },
    
    // Cultivo de Citros (0121)
    { codigo: "01211", nome: "Cultivo de laranja", descricao: "Produção de laranja", slug: "cultivo-laranja", classe_codigo: "0121", is_principal: true },
    { codigo: "01212", nome: "Cultivo de limão", descricao: "Produção de limão", slug: "cultivo-limao", classe_codigo: "0121", is_principal: false },
    { codigo: "01213", nome: "Cultivo de lima", descricao: "Produção de lima", slug: "cultivo-lima", classe_codigo: "0121", is_principal: false },
    { codigo: "01214", nome: "Cultivo de tangerina", descricao: "Produção de tangerina", slug: "cultivo-tangerina", classe_codigo: "0121", is_principal: false },
    { codigo: "01219", nome: "Cultivo de outros cítricos", descricao: "Outros cítricos", slug: "cultivo-outros-citricos", classe_codigo: "0121", is_principal: false },
    
    // Cultivo de Café (0122)
    { codigo: "01221", nome: "Cultivo de café arábica", descricao: "Produção de café arábica", slug: "cultivo-cafe-arabica", classe_codigo: "0122", is_principal: true },
    { codigo: "01222", nome: "Cultivo de café robusta", descricao: "Produção de café robusta", slug: "cultivo-cafe-robusta", classe_codigo: "0122", is_principal: false },
    
    // Cultivo de Cacau (0123)
    { codigo: "01230", nome: "Cultivo de cacau", descricao: "Produção de cacau", slug: "cultivo-cacau", classe_codigo: "0123", is_principal: true },
    
    // Cultivo de Frutas (0124)
    { codigo: "01241", nome: "Cultivo de banana", descricao: "Produção de banana", slug: "cultivo-banana", classe_codigo: "0124", is_principal: true },
    { codigo: "01242", nome: "Cultivo de uva", descricao: "Produção de uva de mesa", slug: "cultivo-uva", classe_codigo: "0124", is_principal: true },
    { codigo: "01243", nome: "Cultivo de mamão", descricao: "Produção de mamão", slug: "cultivo-mamao", classe_codigo: "0124", is_principal: false },
    { codigo: "01244", nome: "Cultivo de manga", descricao: "Produção de manga", slug: "cultivo-manga", classe_codigo: "0124", is_principal: false },
    { codigo: "01245", nome: "Cultivo de abacaxi", descricao: "Produção de abacaxi", slug: "cultivo-abacaxi", classe_codigo: "0124", is_principal: false },
    { codigo: "01246", nome: "Cultivo de coco", descricao: "Produção de coco", slug: "cultivo-coco", classe_codigo: "0124", is_principal: false },
    { codigo: "01247", nome: "Cultivo de açaí", descricao: "Produção de açaí", slug: "cultivo-acai", classe_codigo: "0124", is_principal: false },
    { codigo: "01249", nome: "Cultivo de outras frutas de lavoura permanente", descricao: "Outras frutas", slug: "cultivo-outras-frutas-lavoura-permanente", classe_codigo: "0124", is_principal: false },
    
    // Plantas Aromáticas (0125)
    { codigo: "01251", nome: "Cultivo de plantas medicinais", descricao: "Plantas medicinais", slug: "cultivo-plantas-medicinais", classe_codigo: "0125", is_principal: false },
    { codigo: "01252", nome: "Cultivo de plantas aromáticas", descricao: "Plantas aromáticas", slug: "cultivo-plantas-aromaticas", classe_codigo: "0125", is_principal: false },
    { codigo: "01253", nome: "Cultivo de plantas condimentares", descricao: "Condimentos", slug: "cultivo-plantas-condimentares", classe_codigo: "0125", is_principal: false },
    
    // Oleaginosas Permanentes (0126)
    { codigo: "01261", nome: "Cultivo de dendê", descricao: "Produção de dendê", slug: "cultivo-dende", classe_codigo: "0126", is_principal: false },
    { codigo: "01269", nome: "Cultivo de outras oleaginosas de lavoura permanente", descricao: "Outras oleaginosas permanentes", slug: "cultivo-outras-oleaginosas-lavoura-permanente", classe_codigo: "0126", is_principal: false },
    
    // Cultivo de Uva para Vinho (0127)
    { codigo: "01270", nome: "Cultivo de uva para vinificação", descricao: "Viticultura para vinho", slug: "cultivo-uva-vinificacao", classe_codigo: "0127", is_principal: true },
    
    // Mudas Certificadas (0128)
    { codigo: "01280", nome: "Cultivo de mudas certificadas", descricao: "Produção de mudas", slug: "cultivo-mudas-certificadas", classe_codigo: "0128", is_principal: true },
    
    // Outras Plantas Permanentes (0129)
    { codigo: "01291", nome: "Cultivo de seringueira", descricao: "Produção de borracha natural", slug: "cultivo-seringueira", classe_codigo: "0129", is_principal: false },
    { codigo: "01292", nome: "Cultivo de plantas para fibras de lavoura permanente", descricao: "Fibras permanentes", slug: "cultivo-plantas-fibras-lavoura-permanente", classe_codigo: "0129", is_principal: false },
    { codigo: "01299", nome: "Cultivo de outras plantas de lavoura permanente", descricao: "Outras culturas permanentes", slug: "cultivo-outras-plantas-lavoura-permanente", classe_codigo: "0129", is_principal: false },
    
    // Produção de Sementes (0130)
    { codigo: "01301", nome: "Produção de sementes certificadas de cereais", descricao: "Sementes de grãos", slug: "producao-sementes-certificadas-cereais", classe_codigo: "0130", is_principal: true },
    { codigo: "01302", nome: "Produção de sementes certificadas de oleaginosas", descricao: "Sementes oleaginosas", slug: "producao-sementes-certificadas-oleaginosas", classe_codigo: "0130", is_principal: false },
    { codigo: "01303", nome: "Produção de sementes certificadas de forrageiras", descricao: "Sementes forrageiras", slug: "producao-sementes-certificadas-forrageiras", classe_codigo: "0130", is_principal: false },
    { codigo: "01309", nome: "Produção de outras sementes certificadas", descricao: "Outras sementes", slug: "producao-outras-sementes-certificadas", classe_codigo: "0130", is_principal: false }
  ];
  
  return {
    secoesCNAE,
    divisoesCNAE,
    gruposCNAE,
    classesCNAE,
    subclassesCNAE
  };
}

async function importarCNAEs() {
  console.log('🚀 Iniciando importação completa dos CNAEs brasileiros...');
  
  let importados = 0;
  let erros = 0;

  try {
    // Buscar dados oficiais ou usar fallback
    const { secoesCNAE, divisoesCNAE, gruposCNAE, classesCNAE, subclassesCNAE } = await buscarCNAEsOficiais();

    // 1. Importar seções em lotes
    console.log(`📊 Importando ${secoesCNAE.length} seções CNAEs...`);
    for (let i = 0; i < secoesCNAE.length; i += 10) {
      const lote = secoesCNAE.slice(i, i + 10);
      
      for (const secao of lote) {
        try {
          const { error } = await supabase
            .from('cnaes_secoes')
            .upsert(secao, { onConflict: 'codigo' });
          
          if (error) {
            console.error(`❌ Erro ao importar seção ${secao.codigo}:`, error);
            erros++;
          } else {
            console.log(`✅ Seção ${secao.codigo} importada com sucesso`);
            importados++;
          }
        } catch (err) {
          console.error(`❌ Erro ao processar seção ${secao.codigo}:`, err);
          erros++;
        }
      }
    }

    // 2. Importar divisões
    console.log(`📊 Importando ${divisoesCNAE.length} divisões CNAEs...`);
    for (const divisao of divisoesCNAE) {
      try {
        const { data: secao, error: secaoError } = await supabase
          .from('cnaes_secoes')
          .select('id')
          .eq('codigo', divisao.secao_codigo)
          .single();

        if (secaoError || !secao) {
          console.error(`❌ Seção ${divisao.secao_codigo} não encontrada para divisão ${divisao.codigo}`);
          erros++;
          continue;
        }

        const { error } = await supabase
          .from('cnaes_divisoes')
          .upsert({ ...divisao, secao_id: secao.id }, { onConflict: 'codigo' });
        
        if (error) {
          console.error(`❌ Erro ao importar divisão ${divisao.codigo}:`, error);
          erros++;
        } else {
          console.log(`✅ Divisão ${divisao.codigo} importada com sucesso`);
          importados++;
        }
      } catch (err) {
        console.error(`❌ Erro ao processar divisão ${divisao.codigo}:`, err);
        erros++;
      }
    }

    // 3. Importar grupos
    console.log(`📊 Importando ${gruposCNAE.length} grupos CNAEs...`);
    for (const grupo of gruposCNAE) {
      try {
        const { data: divisao, error: divisaoError } = await supabase
          .from('cnaes_divisoes')
          .select('id')
          .eq('codigo', grupo.divisao_codigo)
          .single();

        if (divisaoError || !divisao) {
          console.error(`❌ Divisão ${grupo.divisao_codigo} não encontrada para grupo ${grupo.codigo}`);
          erros++;
          continue;
        }

        const { error } = await supabase
          .from('cnaes_grupos')
          .upsert({ ...grupo, divisao_id: divisao.id }, { onConflict: 'codigo' });
        
        if (error) {
          console.error(`❌ Erro ao importar grupo ${grupo.codigo}:`, error);
          erros++;
        } else {
          console.log(`✅ Grupo ${grupo.codigo} importado com sucesso`);
          importados++;
        }
      } catch (err) {
        console.error(`❌ Erro ao processar grupo ${grupo.codigo}:`, err);
        erros++;
      }
    }

    // 4. Importar classes
    console.log(`📊 Importando ${classesCNAE.length} classes CNAEs...`);
    for (const classe of classesCNAE) {
      try {
        const { data: grupo, error: grupoError } = await supabase
          .from('cnaes_grupos')
          .select('id')
          .eq('codigo', classe.grupo_codigo)
          .single();

        if (grupoError || !grupo) {
          console.error(`❌ Grupo ${classe.grupo_codigo} não encontrado para classe ${classe.codigo}`);
          erros++;
          continue;
        }

        const { error } = await supabase
          .from('cnaes_classes')
          .upsert({ ...classe, grupo_id: grupo.id }, { onConflict: 'codigo' });
        
        if (error) {
          console.error(`❌ Erro ao importar classe ${classe.codigo}:`, error);
          erros++;
        } else {
          console.log(`✅ Classe ${classe.codigo} importada com sucesso`);
          importados++;
        }
      } catch (err) {
        console.error(`❌ Erro ao processar classe ${classe.codigo}:`, err);
        erros++;
      }
    }

    // 5. Importar subclasses
    console.log(`📊 Importando ${subclassesCNAE.length} subclasses CNAEs...`);
    for (const subclasse of subclassesCNAE) {
      try {
        const { data: classe, error: classeError } = await supabase
          .from('cnaes_classes')
          .select('id')
          .eq('codigo', subclasse.classe_codigo)
          .single();

        if (classeError || !classe) {
          console.error(`❌ Classe ${subclasse.classe_codigo} não encontrada para subclasse ${subclasse.codigo}`);
          erros++;
          continue;
        }

        const { error } = await supabase
          .from('cnaes_subclasses')
          .upsert({ ...subclasse, classe_id: classe.id }, { onConflict: 'codigo' });
        
        if (error) {
          console.error(`❌ Erro ao importar subclasse ${subclasse.codigo}:`, error);
          erros++;
        } else {
          console.log(`✅ Subclasse ${subclasse.codigo} importada com sucesso`);
          importados++;
        }
      } catch (err) {
        console.error(`❌ Erro ao processar subclasse ${subclasse.codigo}:`, err);
        erros++;
      }
    }

    return {
      sucesso: true,
      importados,
      erros,
      mensagem: `Importação concluída! Importados: ${importados}, Erros: ${erros}`
    };

  } catch (error) {
    console.error('❌ Erro geral na importação:', error);
    return {
      sucesso: false,
      importados,
      erros: erros + 1,
      mensagem: `Erro na importação: ${error.message}`
    };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎯 Executando importação de CNAEs...');
    const resultado = await importarCNAEs();

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: resultado.sucesso ? 200 : 500
    });
  } catch (error) {
    console.error('❌ Erro no servidor:', error);
    return new Response(JSON.stringify({ 
      sucesso: false, 
      mensagem: `Erro no servidor: ${error.message}` 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
