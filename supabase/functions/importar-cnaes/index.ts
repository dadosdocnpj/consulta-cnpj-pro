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

// Dados das seções CNAEs (A-U)
const secoesCNAE: CNAESeção[] = [
  {
    codigo: 'A',
    nome: 'Agricultura, pecuária, produção florestal, pesca e aquicultura',
    descricao: 'Atividades relacionadas ao cultivo de plantas, criação de animais e exploração de recursos naturais renováveis',
    icone: '🌱',
    slug: 'agricultura-pecuaria-producao-florestal-pesca-aquicultura'
  },
  {
    codigo: 'B',
    nome: 'Indústrias extrativas',
    descricao: 'Extração de minerais, petróleo, gás natural e outros recursos naturais não renováveis',
    icone: '⛏️',
    slug: 'industrias-extrativas'
  },
  {
    codigo: 'C',
    nome: 'Indústrias de transformação',
    descricao: 'Transformação de matérias-primas em produtos acabados ou semi-acabados',
    icone: '🏭',
    slug: 'industrias-de-transformacao'
  },
  {
    codigo: 'D',
    nome: 'Eletricidade e gás',
    descricao: 'Geração, transmissão e distribuição de energia elétrica e gás',
    icone: '⚡',
    slug: 'eletricidade-gas'
  },
  {
    codigo: 'E',
    nome: 'Água, esgoto, atividades de gestão de resíduos e descontaminação',
    descricao: 'Captação, tratamento e distribuição de água, coleta e tratamento de esgoto, gestão de resíduos',
    icone: '💧',
    slug: 'agua-esgoto-gestao-residuos-descontaminacao'
  },
  {
    codigo: 'F',
    nome: 'Construção',
    descricao: 'Construção de edifícios, obras de infraestrutura e serviços especializados de construção',
    icone: '🏗️',
    slug: 'construcao'
  },
  {
    codigo: 'G',
    nome: 'Comércio; reparação de veículos automotores e motocicletas',
    descricao: 'Comércio atacadista e varejista, reparação de veículos e motocicletas',
    icone: '🛒',
    slug: 'comercio-reparacao-veiculos-motocicletas'
  },
  {
    codigo: 'H',
    nome: 'Transporte, armazenagem e correio',
    descricao: 'Transporte de passageiros e cargas, armazenagem e atividades de correio',
    icone: '🚛',
    slug: 'transporte-armazenagem-correio'
  },
  {
    codigo: 'I',
    nome: 'Alojamento e alimentação',
    descricao: 'Hotéis, pousadas, restaurantes, bares e similares',
    icone: '🏨',
    slug: 'alojamento-alimentacao'
  },
  {
    codigo: 'J',
    nome: 'Informação e comunicação',
    descricao: 'Atividades de informática, telecomunicações, produção e distribuição de informação',
    icone: '💻',
    slug: 'informacao-comunicacao'
  },
  {
    codigo: 'K',
    nome: 'Atividades financeiras, de seguros e serviços relacionados',
    descricao: 'Bancos, seguradoras, fundos de investimento e outros serviços financeiros',
    icone: '🏦',
    slug: 'atividades-financeiras-seguros-servicos-relacionados'
  },
  {
    codigo: 'L',
    nome: 'Atividades imobiliárias',
    descricao: 'Compra, venda, locação e administração de imóveis',
    icone: '🏠',
    slug: 'atividades-imobiliarias'
  },
  {
    codigo: 'M',
    nome: 'Atividades profissionais, científicas e técnicas',
    descricao: 'Atividades jurídicas, contábeis, consultoria, arquitetura, engenharia, pesquisa e desenvolvimento',
    icone: '🔬',
    slug: 'atividades-profissionais-cientificas-tecnicas'
  },
  {
    codigo: 'N',
    nome: 'Atividades administrativas e serviços complementares',
    descricao: 'Atividades de apoio administrativo, limpeza, segurança, paisagismo e outros serviços de apoio',
    icone: '📋',
    slug: 'atividades-administrativas-servicos-complementares'
  },
  {
    codigo: 'O',
    nome: 'Administração pública, defesa e seguridade social',
    descricao: 'Atividades de administração pública, defesa nacional e seguridade social obrigatória',
    icone: '🏛️',
    slug: 'administracao-publica-defesa-seguridade-social'
  },
  {
    codigo: 'P',
    nome: 'Educação',
    descricao: 'Educação infantil, fundamental, média, superior, profissional e outros tipos de educação',
    icone: '🎓',
    slug: 'educacao'
  },
  {
    codigo: 'Q',
    nome: 'Saúde humana e serviços sociais',
    descricao: 'Atividades de atenção à saúde humana e assistência social',
    icone: '🏥',
    slug: 'saude-humana-servicos-sociais'
  },
  {
    codigo: 'R',
    nome: 'Artes, cultura, esporte e recreação',
    descricao: 'Atividades criativas, artísticas, esportivas e de entretenimento',
    icone: '🎭',
    slug: 'artes-cultura-esporte-recreacao'
  },
  {
    codigo: 'S',
    nome: 'Outras atividades de serviços',
    descricao: 'Reparação e manutenção de objetos pessoais, serviços pessoais e outros serviços',
    icone: '🔧',
    slug: 'outras-atividades-servicos'
  },
  {
    codigo: 'T',
    nome: 'Serviços domésticos',
    descricao: 'Atividades de famílias como empregadoras de pessoal doméstico',
    icone: '🏡',
    slug: 'servicos-domesticos'
  },
  {
    codigo: 'U',
    nome: 'Organismos internacionais e outras instituições extraterritoriais',
    descricao: 'Atividades de organismos internacionais e representações estrangeiras',
    icone: '🌍',
    slug: 'organismos-internacionais-instituicoes-extraterritoriais'
  }
];

// Dados simplificados de algumas divisões, grupos, classes e subclasses mais importantes
const divisoesCNAE: CNAEDivisao[] = [
  // Seção C - Indústrias de transformação
  { codigo: '10', nome: 'Fabricação de produtos alimentícios', descricao: 'Processamento e fabricação de alimentos', slug: 'fabricacao-produtos-alimenticios', secao_codigo: 'C' },
  { codigo: '11', nome: 'Fabricação de bebidas', descricao: 'Fabricação de bebidas alcoólicas e não alcoólicas', slug: 'fabricacao-bebidas', secao_codigo: 'C' },
  { codigo: '13', nome: 'Fabricação de produtos têxteis', descricao: 'Preparação e fiação de fibras têxteis', slug: 'fabricacao-produtos-texteis', secao_codigo: 'C' },
  { codigo: '14', nome: 'Confecção de artigos do vestuário e acessórios', descricao: 'Confecção de roupas e acessórios', slug: 'confeccao-artigos-vestuario-acessorios', secao_codigo: 'C' },
  { codigo: '20', nome: 'Fabricação de produtos químicos', descricao: 'Fabricação de produtos químicos básicos e especializados', slug: 'fabricacao-produtos-quimicos', secao_codigo: 'C' },
  { codigo: '26', nome: 'Fabricação de equipamentos de informática, produtos eletrônicos e ópticos', descricao: 'Fabricação de computadores, equipamentos eletrônicos', slug: 'fabricacao-equipamentos-informatica-eletronicos-opticos', secao_codigo: 'C' },
  { codigo: '28', nome: 'Fabricação de máquinas e equipamentos', descricao: 'Fabricação de máquinas e equipamentos diversos', slug: 'fabricacao-maquinas-equipamentos', secao_codigo: 'C' },
  { codigo: '29', nome: 'Fabricação de veículos automotores, reboques e carrocerias', descricao: 'Fabricação de automóveis, caminhões e ônibus', slug: 'fabricacao-veiculos-automotores-reboques-carrocerias', secao_codigo: 'C' },
  
  // Seção G - Comércio
  { codigo: '45', nome: 'Comércio e reparação de veículos automotores e motocicletas', descricao: 'Venda e manutenção de veículos', slug: 'comercio-reparacao-veiculos-automotores-motocicletas', secao_codigo: 'G' },
  { codigo: '46', nome: 'Comércio por atacado, exceto veículos automotores e motocicletas', descricao: 'Comércio atacadista de diversos produtos', slug: 'comercio-atacado-exceto-veiculos-automotores-motocicletas', secao_codigo: 'G' },
  { codigo: '47', nome: 'Comércio varejista', descricao: 'Comércio varejista de diversos produtos', slug: 'comercio-varejista', secao_codigo: 'G' },
  
  // Seção J - Informação e comunicação
  { codigo: '58', nome: 'Edição e edição integrada à impressão', descricao: 'Edição de livros, jornais, revistas e software', slug: 'edicao-edicao-integrada-impressao', secao_codigo: 'J' },
  { codigo: '62', nome: 'Atividades dos serviços de tecnologia da informação', descricao: 'Desenvolvimento de software e consultoria em TI', slug: 'atividades-servicos-tecnologia-informacao', secao_codigo: 'J' },
  { codigo: '63', nome: 'Atividades de prestação de serviços de informação', descricao: 'Portais, provedores de conteúdo e outros serviços de informação', slug: 'atividades-prestacao-servicos-informacao', secao_codigo: 'J' },
  
  // Seção M - Atividades profissionais
  { codigo: '69', nome: 'Atividades jurídicas, de contabilidade e de auditoria', descricao: 'Escritórios de advocacia, contabilidade e auditoria', slug: 'atividades-juridicas-contabilidade-auditoria', secao_codigo: 'M' },
  { codigo: '70', nome: 'Atividades de sedes de empresas e de consultoria em gestão empresarial', descricao: 'Holdings e consultoria empresarial', slug: 'atividades-sedes-empresas-consultoria-gestao-empresarial', secao_codigo: 'M' },
  { codigo: '71', nome: 'Serviços de arquitetura e engenharia; testes e análises técnicas', descricao: 'Escritórios de arquitetura, engenharia e análises técnicas', slug: 'servicos-arquitetura-engenharia-testes-analises-tecnicas', secao_codigo: 'M' },
  { codigo: '72', nome: 'Pesquisa e desenvolvimento científico', descricao: 'Pesquisa e desenvolvimento em diversas áreas', slug: 'pesquisa-desenvolvimento-cientifico', secao_codigo: 'M' },
];

const gruposCNAE: CNAEGrupo[] = [
  // Divisão 62 - TI
  { codigo: '621', nome: 'Desenvolvimento de programas de computador e serviços relacionados', descricao: 'Desenvolvimento de software sob medida e produtos de software', slug: 'desenvolvimento-programas-computador-servicos-relacionados', divisao_codigo: '62' },
  { codigo: '622', nome: 'Atividades de consultoria em tecnologia da informação', descricao: 'Consultoria em TI e integração de sistemas', slug: 'atividades-consultoria-tecnologia-informacao', divisao_codigo: '62' },
  { codigo: '629', nome: 'Outras atividades de serviços de tecnologia da informação', descricao: 'Outras atividades relacionadas à tecnologia da informação', slug: 'outras-atividades-servicos-tecnologia-informacao', divisao_codigo: '62' },
  
  // Divisão 47 - Comércio varejista
  { codigo: '471', nome: 'Comércio varejista em lojas não especializadas', descricao: 'Supermercados, hipermercados e lojas de departamento', slug: 'comercio-varejista-lojas-nao-especializadas', divisao_codigo: '47' },
  { codigo: '472', nome: 'Comércio varejista de produtos alimentícios, bebidas e fumo em lojas especializadas', descricao: 'Lojas especializadas em alimentos e bebidas', slug: 'comercio-varejista-produtos-alimenticios-bebidas-fumo-lojas-especializadas', divisao_codigo: '47' },
  { codigo: '474', nome: 'Comércio varejista de material de construção', descricao: 'Lojas de materiais de construção', slug: 'comercio-varejista-material-construcao', divisao_codigo: '47' },
  { codigo: '477', nome: 'Comércio varejista de produtos farmacêuticos, perfumaria e cosméticos e artigos médicos', descricao: 'Farmácias e lojas de cosméticos', slug: 'comercio-varejista-produtos-farmaceuticos-perfumaria-cosmeticos-artigos-medicos', divisao_codigo: '47' },
];

const classesCNAE: CNAEClasse[] = [
  // Grupo 621 - Desenvolvimento de software
  { codigo: '6201', nome: 'Desenvolvimento de programas de computador sob encomenda', descricao: 'Desenvolvimento de software personalizado', slug: 'desenvolvimento-programas-computador-sob-encomenda', grupo_codigo: '621' },
  { codigo: '6202', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', descricao: 'Desenvolvimento de software customizável', slug: 'desenvolvimento-licenciamento-programas-computador-customizaveis', grupo_codigo: '621' },
  { codigo: '6203', nome: 'Desenvolvimento e licenciamento de programas de computador não customizáveis', descricao: 'Desenvolvimento de software não customizável', slug: 'desenvolvimento-licenciamento-programas-computador-nao-customizaveis', grupo_codigo: '621' },
  { codigo: '6204', nome: 'Consultoria em tecnologia da informação', descricao: 'Serviços de consultoria em TI', slug: 'consultoria-tecnologia-informacao', grupo_codigo: '621' },
  
  // Grupo 471 - Comércio varejista não especializado
  { codigo: '4711', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados e supermercados', descricao: 'Hipermercados e supermercados', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-hipermercados-supermercados', grupo_codigo: '471' },
  { codigo: '4712', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns', descricao: 'Minimercados, mercearias e armazéns', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-minimercados-mercearias-armazens', grupo_codigo: '471' },
  { codigo: '4713', nome: 'Lojas de departamentos ou magazines', descricao: 'Lojas de departamento e magazines', slug: 'lojas-departamentos-magazines', grupo_codigo: '471' },
];

const subclassesCNAE: CNAESubclasse[] = [
  // Classe 6201 - Desenvolvimento de software sob encomenda
  { codigo: '6201500', nome: 'Desenvolvimento de programas de computador sob encomenda', descricao: 'Desenvolvimento de software personalizado para clientes específicos', slug: 'desenvolvimento-programas-computador-sob-encomenda', classe_codigo: '6201', is_principal: true },
  
  // Classe 6202 - Software customizável
  { codigo: '6202300', nome: 'Desenvolvimento e licenciamento de programas de computador customizáveis', descricao: 'Desenvolvimento de software que pode ser adaptado às necessidades do cliente', slug: 'desenvolvimento-licenciamento-programas-computador-customizaveis', classe_codigo: '6202', is_principal: true },
  
  // Classe 6203 - Software não customizável
  { codigo: '6203100', nome: 'Desenvolvimento e licenciamento de programas de computador não customizáveis', descricao: 'Desenvolvimento de software padronizado', slug: 'desenvolvimento-licenciamento-programas-computador-nao-customizaveis', classe_codigo: '6203', is_principal: true },
  
  // Classe 6204 - Consultoria em TI
  { codigo: '6204000', nome: 'Consultoria em tecnologia da informação', descricao: 'Serviços de consultoria especializada em tecnologia da informação', slug: 'consultoria-tecnologia-informacao', classe_codigo: '6204', is_principal: true },
  
  // Classe 4711 - Hipermercados e supermercados
  { codigo: '4711301', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados', descricao: 'Hipermercados', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-hipermercados', classe_codigo: '4711', is_principal: true },
  { codigo: '4711302', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados', descricao: 'Supermercados', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-supermercados', classe_codigo: '4711', is_principal: true },
  
  // Classe 4712 - Minimercados
  { codigo: '4712100', nome: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns', descricao: 'Minimercados, mercearias e armazéns', slug: 'comercio-varejista-mercadorias-geral-predominancia-produtos-alimenticios-minimercados-mercearias-armazens', classe_codigo: '4712', is_principal: true },
  
  // Classe 4713 - Lojas de departamento
  { codigo: '4713002', nome: 'Lojas de departamentos ou magazines', descricao: 'Lojas de departamento e magazines', slug: 'lojas-departamentos-magazines', classe_codigo: '4713', is_principal: true },
];

async function importarCNAEs() {
  console.log('Iniciando importação dos CNAEs...');
  
  let importados = 0;
  let erros = 0;

  try {
    // 1. Importar seções
    console.log(`Importando ${secoesCNAE.length} seções CNAEs...`);
    for (const secao of secoesCNAE) {
      try {
        const { error } = await supabase
          .from('cnaes_secoes')
          .upsert(secao, { onConflict: 'codigo' });
        
        if (error) {
          console.error(`Erro ao importar seção ${secao.codigo}:`, error);
          erros++;
        } else {
          console.log(`✅ Seção ${secao.codigo} importada com sucesso`);
          importados++;
        }
      } catch (err) {
        console.error(`Erro ao processar seção ${secao.codigo}:`, err);
        erros++;
      }
    }

    // 2. Importar divisões
    console.log(`Importando ${divisoesCNAE.length} divisões CNAEs...`);
    for (const divisao of divisoesCNAE) {
      try {
        // Buscar ID da seção
        const { data: secao, error: secaoError } = await supabase
          .from('cnaes_secoes')
          .select('id')
          .eq('codigo', divisao.secao_codigo)
          .single();

        if (secaoError) {
          console.error(`❌ Seção ${divisao.secao_codigo} não encontrada para divisão ${divisao.codigo}:`, secaoError);
          erros++;
          continue;
        }

        if (secao) {
          const { error } = await supabase
            .from('cnaes_divisoes')
            .upsert({
              codigo: divisao.codigo,
              nome: divisao.nome,
              descricao: divisao.descricao,
              slug: divisao.slug,
              secao_id: secao.id
            }, { onConflict: 'codigo' });
          
          if (error) {
            console.error(`Erro ao importar divisão ${divisao.codigo}:`, error);
            erros++;
          } else {
            console.log(`✅ Divisão ${divisao.codigo} importada com sucesso`);
            importados++;
          }
        } else {
          console.error(`❌ Seção ${divisao.secao_codigo} não encontrada para divisão ${divisao.codigo}`);
          erros++;
        }
      } catch (err) {
        console.error(`Erro ao processar divisão ${divisao.codigo}:`, err);
        erros++;
      }
    }

    // 3. Importar grupos
    console.log(`Importando ${gruposCNAE.length} grupos CNAEs...`);
    for (const grupo of gruposCNAE) {
      try {
        // Buscar ID da divisão
        const { data: divisao, error: divisaoError } = await supabase
          .from('cnaes_divisoes')
          .select('id')
          .eq('codigo', grupo.divisao_codigo)
          .single();

        if (divisaoError) {
          console.error(`❌ Divisão ${grupo.divisao_codigo} não encontrada para grupo ${grupo.codigo}:`, divisaoError);
          erros++;
          continue;
        }

        if (divisao) {
          const { error } = await supabase
            .from('cnaes_grupos')
            .upsert({
              codigo: grupo.codigo,
              nome: grupo.nome,
              descricao: grupo.descricao,
              slug: grupo.slug,
              divisao_id: divisao.id
            }, { onConflict: 'codigo' });
          
          if (error) {
            console.error(`Erro ao importar grupo ${grupo.codigo}:`, error);
            erros++;
          } else {
            console.log(`✅ Grupo ${grupo.codigo} importado com sucesso`);
            importados++;
          }
        } else {
          console.error(`❌ Divisão ${grupo.divisao_codigo} não encontrada para grupo ${grupo.codigo}`);
          erros++;
        }
      } catch (err) {
        console.error(`Erro ao processar grupo ${grupo.codigo}:`, err);
        erros++;
      }
    }

    // 4. Importar classes
    console.log(`Importando ${classesCNAE.length} classes CNAEs...`);
    for (const classe of classesCNAE) {
      try {
        // Buscar ID do grupo
        const { data: grupo, error: grupoError } = await supabase
          .from('cnaes_grupos')
          .select('id')
          .eq('codigo', classe.grupo_codigo)
          .single();

        if (grupoError) {
          console.error(`❌ Grupo ${classe.grupo_codigo} não encontrado para classe ${classe.codigo}:`, grupoError);
          erros++;
          continue;
        }

        if (grupo) {
          const { error } = await supabase
            .from('cnaes_classes')
            .upsert({
              codigo: classe.codigo,
              nome: classe.nome,
              descricao: classe.descricao,
              slug: classe.slug,
              grupo_id: grupo.id
            }, { onConflict: 'codigo' });
          
          if (error) {
            console.error(`Erro ao importar classe ${classe.codigo}:`, error);
            erros++;
          } else {
            console.log(`✅ Classe ${classe.codigo} importada com sucesso`);
            importados++;
          }
        } else {
          console.error(`❌ Grupo ${classe.grupo_codigo} não encontrado para classe ${classe.codigo}`);
          erros++;
        }
      } catch (err) {
        console.error(`Erro ao processar classe ${classe.codigo}:`, err);
        erros++;
      }
    }

    // 5. Importar subclasses
    console.log(`Importando ${subclassesCNAE.length} subclasses CNAEs...`);
    for (const subclasse of subclassesCNAE) {
      try {
        // Buscar ID da classe
        const { data: classe, error: classeError } = await supabase
          .from('cnaes_classes')
          .select('id')
          .eq('codigo', subclasse.classe_codigo)
          .single();

        if (classeError) {
          console.error(`❌ Classe ${subclasse.classe_codigo} não encontrada para subclasse ${subclasse.codigo}:`, classeError);
          erros++;
          continue;
        }

        if (classe) {
          const { error } = await supabase
            .from('cnaes_subclasses')
            .upsert({
              codigo: subclasse.codigo,
              nome: subclasse.nome,
              descricao: subclasse.descricao,
              slug: subclasse.slug,
              classe_id: classe.id,
              is_principal: subclasse.is_principal
            }, { onConflict: 'codigo' });
          
          if (error) {
            console.error(`Erro ao importar subclasse ${subclasse.codigo}:`, error);
            erros++;
          } else {
            console.log(`✅ Subclasse ${subclasse.codigo} importada com sucesso`);
            importados++;
          }
        } else {
          console.error(`❌ Classe ${subclasse.classe_codigo} não encontrada para subclasse ${subclasse.codigo}`);
          erros++;
        }
      } catch (err) {
        console.error(`Erro ao processar subclasse ${subclasse.codigo}:`, err);
        erros++;
      }
    }

    console.log(`Importação concluída! Importados: ${importados}, Erros: ${erros}`);
    
    return {
      sucesso: true,
      importados,
      erros,
      total: secoesCNAE.length + divisoesCNAE.length + gruposCNAE.length + classesCNAE.length + subclassesCNAE.length
    };

  } catch (error) {
    console.error('Erro geral na importação:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Iniciando importação dos CNAEs brasileiros...');
    
    const resultado = await importarCNAEs();

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na importação dos CNAEs:', error);
    return new Response(JSON.stringify({ 
      sucesso: false, 
      erro: error.message,
      importados: 0,
      erros: 1
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});