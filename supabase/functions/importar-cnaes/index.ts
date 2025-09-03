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
  try {
    console.log("🔍 Buscando CNAEs da API oficial do IBGE...");
    
    // API oficial do IBGE para CNAEs
    const response = await fetch('https://servicodados.ibge.gov.br/api/v2/cnae/classes');
    
    if (!response.ok) {
      throw new Error(`Erro na API do IBGE: ${response.status}`);
    }
    
    const cnaesOficiais = await response.json();
    console.log(`📊 Encontrados ${cnaesOficiais.length} CNAEs oficiais`);
    
    return processarCNAEsOficiais(cnaesOficiais);
  } catch (error) {
    console.error("❌ Erro ao buscar CNAEs oficiais:", error);
    // Fallback para dados locais em caso de falha
    return getDadosLocaisCNAE();
  }
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
    { codigo: "01", nome: "Agricultura, pecuária e serviços relacionados", descricao: "Cultivo de plantas e criação de animais", slug: "agricultura-pecuaria-servicos-relacionados", secao_codigo: "A" },
    { codigo: "02", nome: "Produção florestal", descricao: "Silvicultura e exploração florestal", slug: "producao-florestal", secao_codigo: "A" },
    { codigo: "03", nome: "Pesca e aquicultura", descricao: "Captura de peixes e cultivo aquático", slug: "pesca-e-aquicultura", secao_codigo: "A" },
    { codigo: "05", nome: "Extração de carvão mineral", descricao: "Mineração de carvão", slug: "extracao-carvao-mineral", secao_codigo: "B" },
    { codigo: "06", nome: "Extração de petróleo e gás natural", descricao: "Exploração de petróleo e gás", slug: "extracao-petroleo-gas-natural", secao_codigo: "B" },
    { codigo: "07", nome: "Extração de minerais metálicos", descricao: "Mineração de metais", slug: "extracao-minerais-metalicos", secao_codigo: "B" },
    { codigo: "08", nome: "Extração de minerais não-metálicos", descricao: "Mineração de minerais não metálicos", slug: "extracao-minerais-nao-metalicos", secao_codigo: "B" },
    { codigo: "09", nome: "Atividades de apoio à extração de minerais", descricao: "Serviços de apoio à mineração", slug: "atividades-apoio-extracao-minerais", secao_codigo: "B" },
    { codigo: "10", nome: "Fabricação de produtos alimentícios", descricao: "Indústria alimentícia", slug: "fabricacao-produtos-alimenticios", secao_codigo: "C" },
    { codigo: "11", nome: "Fabricação de bebidas", descricao: "Indústria de bebidas", slug: "fabricacao-bebidas", secao_codigo: "C" }
  ];

  const gruposCNAE: CNAEGrupo[] = [
    { codigo: "011", nome: "Produção de lavouras temporárias", descricao: "Cultivo de plantas de ciclo curto", slug: "producao-lavouras-temporarias", divisao_codigo: "01" },
    { codigo: "012", nome: "Produção de lavouras permanentes", descricao: "Cultivo de plantas perenes", slug: "producao-lavouras-permanentes", divisao_codigo: "01" },
    { codigo: "013", nome: "Produção de sementes e mudas certificadas", descricao: "Produção especializada de sementes", slug: "producao-sementes-mudas-certificadas", divisao_codigo: "01" },
    { codigo: "014", nome: "Pecuária", descricao: "Criação de animais", slug: "pecuaria", divisao_codigo: "01" },
    { codigo: "015", nome: "Atividades de apoio à agricultura e à pecuária", descricao: "Serviços de apoio agropecuário", slug: "atividades-apoio-agricultura-pecuaria", divisao_codigo: "01" },
    { codigo: "021", nome: "Silvicultura", descricao: "Cultivo de florestas", slug: "silvicultura", divisao_codigo: "02" },
    { codigo: "022", nome: "Exploração florestal", descricao: "Extração de produtos florestais", slug: "exploracao-florestal", divisao_codigo: "02" },
    { codigo: "023", nome: "Atividades de apoio à produção florestal", descricao: "Serviços de apoio florestal", slug: "atividades-apoio-producao-florestal", divisao_codigo: "02" },
    { codigo: "031", nome: "Pesca", descricao: "Captura de peixes", slug: "pesca", divisao_codigo: "03" },
    { codigo: "032", nome: "Aquicultura", descricao: "Cultivo de organismos aquáticos", slug: "aquicultura", divisao_codigo: "03" }
  ];

  const classesCNAE: CNAEClasse[] = [
    { codigo: "0111", nome: "Cultivo de cereais", descricao: "Produção de grãos", slug: "cultivo-cereais", grupo_codigo: "011" },
    { codigo: "0112", nome: "Cultivo de algodão herbáceo e de outras fibras de lavoura temporária", descricao: "Cultivo de fibras têxteis", slug: "cultivo-algodao-herbaceo-outras-fibras-lavoura-temporaria", grupo_codigo: "011" },
    { codigo: "0113", nome: "Cultivo de cana-de-açúcar", descricao: "Produção de cana", slug: "cultivo-cana-de-acucar", grupo_codigo: "011" },
    { codigo: "0114", nome: "Cultivo de fumo", descricao: "Produção de tabaco", slug: "cultivo-fumo", grupo_codigo: "011" },
    { codigo: "0115", nome: "Cultivo de soja", descricao: "Produção de soja", slug: "cultivo-soja", grupo_codigo: "011" },
    { codigo: "0116", nome: "Cultivo de oleaginosas de lavoura temporária, exceto soja", descricao: "Cultivo de outras oleaginosas", slug: "cultivo-oleaginosas-lavoura-temporaria-exceto-soja", grupo_codigo: "011" },
    { codigo: "0119", nome: "Cultivo de demais produtos de lavoura temporária", descricao: "Outros cultivos temporários", slug: "cultivo-demais-produtos-lavoura-temporaria", grupo_codigo: "011" },
    { codigo: "0121", nome: "Cultivo de citros", descricao: "Produção de frutas cítricas", slug: "cultivo-citros", grupo_codigo: "012" },
    { codigo: "0122", nome: "Cultivo de café", descricao: "Produção de café", slug: "cultivo-cafe", grupo_codigo: "012" },
    { codigo: "0123", nome: "Cultivo de cacau", descricao: "Produção de cacau", slug: "cultivo-cacau", grupo_codigo: "012" }
  ];

  const subclassesCNAE: CNAESubclasse[] = [
    { codigo: "01111", nome: "Cultivo de arroz", descricao: "Produção de arroz em grão", slug: "cultivo-arroz", classe_codigo: "0111", is_principal: true },
    { codigo: "01112", nome: "Cultivo de milho", descricao: "Produção de milho em grão", slug: "cultivo-milho", classe_codigo: "0111", is_principal: true },
    { codigo: "01113", nome: "Cultivo de trigo", descricao: "Produção de trigo em grão", slug: "cultivo-trigo", classe_codigo: "0111", is_principal: true },
    { codigo: "01119", nome: "Cultivo de outros cereais", descricao: "Produção de outros grãos", slug: "cultivo-outros-cereais", classe_codigo: "0111", is_principal: false },
    { codigo: "01121", nome: "Cultivo de algodão herbáceo", descricao: "Produção de algodão", slug: "cultivo-algodao-herbaceo", classe_codigo: "0112", is_principal: true },
    { codigo: "01122", nome: "Cultivo de juta", descricao: "Produção de juta", slug: "cultivo-juta", classe_codigo: "0112", is_principal: false },
    { codigo: "01130", nome: "Cultivo de cana-de-açúcar", descricao: "Produção de cana-de-açúcar", slug: "cultivo-cana-de-acucar", classe_codigo: "0113", is_principal: true },
    { codigo: "01140", nome: "Cultivo de fumo", descricao: "Produção de tabaco", slug: "cultivo-fumo", classe_codigo: "0114", is_principal: true },
    { codigo: "01150", nome: "Cultivo de soja", descricao: "Produção de soja em grão", slug: "cultivo-soja", classe_codigo: "0115", is_principal: true },
    { codigo: "01161", nome: "Cultivo de girassol", descricao: "Produção de girassol", slug: "cultivo-girassol", classe_codigo: "0116", is_principal: true }
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
