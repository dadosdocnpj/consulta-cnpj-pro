import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { getDadosCompletosOfficiais, criarSlug } from './dados-completos.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('❌ Variáveis de ambiente do Supabase não configuradas');
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
  icone?: string;
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
}

interface ResultadoImportacao {
  importados: number;
  erros: number;
  total: number;
  detalhes: {
    secoes: { importados: number; erros: number };
    divisoes: { importados: number; erros: number };
    grupos: { importados: number; erros: number };
    classes: { importados: number; erros: number };
    subclasses: { importados: number; erros: number };
  };
}

// Processamento em lotes para evitar timeouts
const BATCH_SIZE = 50;

async function processarEmLotes<T>(
  items: T[],
  processarItem: (item: T) => Promise<{ sucesso: boolean; erro?: string }>,
  nomeCategoria: string
): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  let importados = 0;
  let erros = 0;
  const detalhesErros: string[] = [];

  console.log(`📊 Processando ${items.length} ${nomeCategoria} em lotes de ${BATCH_SIZE}...`);

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const lote = items.slice(i, i + BATCH_SIZE);
    console.log(`⚙️ Processando lote ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(items.length / BATCH_SIZE)} de ${nomeCategoria}...`);

    const promessas = lote.map(async (item) => {
      try {
        const resultado = await processarItem(item);
        if (resultado.sucesso) {
          importados++;
        } else {
          erros++;
          if (resultado.erro) {
            detalhesErros.push(resultado.erro);
          }
        }
      } catch (error) {
        erros++;
        const errorMsg = `❌ Erro ao processar item: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        detalhesErros.push(errorMsg);
      }
    });

    await Promise.all(promessas);
    
    // Pequena pausa entre lotes para evitar sobrecarga
    if (i + BATCH_SIZE < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`✅ ${nomeCategoria}: ${importados} importados, ${erros} erros`);
  return { importados, erros, detalhesErros };
}

async function verificarExistenciaTabela(nomeTabela: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(nomeTabela)
      .select('id')
      .limit(1);
    
    return !error;
  } catch {
    return false;
  }
}

async function validarEstruturaBanco(): Promise<boolean> {
  const tabelas = ['cnaes_secoes', 'cnaes_divisoes', 'cnaes_grupos', 'cnaes_classes', 'cnaes_subclasses'];
  
  for (const tabela of tabelas) {
    const existe = await verificarExistenciaTabela(tabela);
    if (!existe) {
      console.error(`❌ Tabela ${tabela} não encontrada no banco de dados`);
      return false;
    }
  }
  
  console.log('✅ Estrutura do banco validada com sucesso');
  return true;
}

async function importarSecoes(secoes: CNAESeção[]): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  return await processarEmLotes(
    secoes,
    async (secao) => {
      try {
        // Verificar se código é válido (apenas letras A-U)
        if (!/^[A-U]$/.test(secao.codigo)) {
          return { sucesso: false, erro: `❌ Código de seção inválido: ${secao.codigo}` };
        }

        const { error } = await supabase
          .from('cnaes_secoes')
          .upsert({
            codigo: secao.codigo,
            nome: secao.nome,
            descricao: secao.descricao,
            icone: secao.icone,
            slug: secao.slug || criarSlug(secao.nome),
            total_empresas: 0
          }, {
            onConflict: 'codigo'
          });

        if (error) {
          return { sucesso: false, erro: `❌ Erro ao importar seção ${secao.codigo}: ${error.message}` };
        }

        return { sucesso: true };
      } catch (error) {
        return { sucesso: false, erro: `❌ Exceção ao importar seção ${secao.codigo}: ${error instanceof Error ? error.message : String(error)}` };
      }
    },
    'seções'
  );
}

async function importarDivisoes(divisoes: CNAEDivisao[]): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  return await processarEmLotes(
    divisoes,
    async (divisao) => {
      try {
        // Verificar se seção existe
        const { data: secaoExiste } = await supabase
          .from('cnaes_secoes')
          .select('id')
          .eq('codigo', divisao.secao_codigo)
          .single();

        if (!secaoExiste) {
          return { sucesso: false, erro: `❌ Seção ${divisao.secao_codigo} não encontrada para divisão ${divisao.codigo}` };
        }

        const { error } = await supabase
          .from('cnaes_divisoes')
          .upsert({
            codigo: divisao.codigo,
            nome: divisao.nome,
            descricao: divisao.descricao,
            slug: divisao.slug || criarSlug(divisao.nome),
            secao_id: secaoExiste.id,
            total_empresas: 0
          }, {
            onConflict: 'codigo'
          });

        if (error) {
          return { sucesso: false, erro: `❌ Erro ao importar divisão ${divisao.codigo}: ${error.message}` };
        }

        return { sucesso: true };
      } catch (error) {
        return { sucesso: false, erro: `❌ Exceção ao importar divisão ${divisao.codigo}: ${error instanceof Error ? error.message : String(error)}` };
      }
    },
    'divisões'
  );
}

async function importarGrupos(grupos: CNAEGrupo[]): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  return await processarEmLotes(
    grupos,
    async (grupo) => {
      try {
        // Verificar se divisão existe
        const { data: divisaoExiste } = await supabase
          .from('cnaes_divisoes')
          .select('id')
          .eq('codigo', grupo.divisao_codigo)
          .single();

        if (!divisaoExiste) {
          return { sucesso: false, erro: `❌ Divisão ${grupo.divisao_codigo} não encontrada para grupo ${grupo.codigo}` };
        }

        const { error } = await supabase
          .from('cnaes_grupos')
          .upsert({
            codigo: grupo.codigo,
            nome: grupo.nome,
            descricao: grupo.descricao,
            slug: grupo.slug || criarSlug(grupo.nome),
            divisao_id: divisaoExiste.id,
            total_empresas: 0
          }, {
            onConflict: 'codigo'
          });

        if (error) {
          return { sucesso: false, erro: `❌ Erro ao importar grupo ${grupo.codigo}: ${error.message}` };
        }

        return { sucesso: true };
      } catch (error) {
        return { sucesso: false, erro: `❌ Exceção ao importar grupo ${grupo.codigo}: ${error instanceof Error ? error.message : String(error)}` };
      }
    },
    'grupos'
  );
}

async function importarClasses(classes: CNAEClasse[]): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  return await processarEmLotes(
    classes,
    async (classe) => {
      try {
        // Verificar se grupo existe
        const { data: grupoExiste } = await supabase
          .from('cnaes_grupos')
          .select('id')
          .eq('codigo', classe.grupo_codigo)
          .single();

        if (!grupoExiste) {
          return { sucesso: false, erro: `❌ Grupo ${classe.grupo_codigo} não encontrado para classe ${classe.codigo}` };
        }

        const { error } = await supabase
          .from('cnaes_classes')
          .upsert({
            codigo: classe.codigo,
            nome: classe.nome,
            descricao: classe.descricao,
            slug: classe.slug || criarSlug(classe.nome),
            grupo_id: grupoExiste.id,
            total_empresas: 0
          }, {
            onConflict: 'codigo'
          });

        if (error) {
          return { sucesso: false, erro: `❌ Erro ao importar classe ${classe.codigo}: ${error.message}` };
        }

        return { sucesso: true };
      } catch (error) {
        return { sucesso: false, erro: `❌ Exceção ao importar classe ${classe.codigo}: ${error instanceof Error ? error.message : String(error)}` };
      }
    },
    'classes'
  );
}

async function importarSubclasses(subclasses: CNAESubclasse[]): Promise<{ importados: number; erros: number; detalhesErros: string[] }> {
  return await processarEmLotes(
    subclasses,
    async (subclasse) => {
      try {
        // Verificar se classe existe
        const { data: classeExiste } = await supabase
          .from('cnaes_classes')
          .select('id')
          .eq('codigo', subclasse.classe_codigo)
          .single();

        if (!classeExiste) {
          return { sucesso: false, erro: `❌ Classe ${subclasse.classe_codigo} não encontrada para subclasse ${subclasse.codigo}` };
        }

        const { error } = await supabase
          .from('cnaes_subclasses')
          .upsert({
            codigo: subclasse.codigo,
            nome: subclasse.nome,
            descricao: subclasse.descricao,
            slug: subclasse.slug || criarSlug(subclasse.nome),
            classe_id: classeExiste.id,
            total_empresas: 0
          }, {
            onConflict: 'codigo'
          });

        if (error) {
          return { sucesso: false, erro: `❌ Erro ao importar subclasse ${subclasse.codigo}: ${error.message}` };
        }

        return { sucesso: true };
      } catch (error) {
        return { sucesso: false, erro: `❌ Exceção ao importar subclasse ${subclasse.codigo}: ${error instanceof Error ? error.message : String(error)}` };
      }
    },
    'subclasses'
  );
}

async function importarCNAEs(): Promise<ResultadoImportacao> {
  console.log('🚀 Iniciando importação completa dos CNAEs...');
  
  const inicioImportacao = Date.now();

  try {
    // 1. Validar estrutura do banco
    const estruturaValida = await validarEstruturaBanco();
    if (!estruturaValida) {
      throw new Error('❌ Estrutura do banco de dados inválida');
    }

    // 2. Obter dados completos oficiais
    console.log('📥 Carregando dados CNAEs oficiais completos...');
    const { secoesCNAE, divisoesCNAE, gruposCNAE, classesCNAE, subclassesCNAE } = getDadosCompletosOfficiais();

    console.log(`📊 Dados carregados:
    - ${secoesCNAE.length} seções
    - ${divisoesCNAE.length} divisões  
    - ${gruposCNAE.length} grupos
    - ${classesCNAE.length} classes
    - ${subclassesCNAE.length} subclasses`);

    // 3. Importar em ordem hierárquica
    console.log('🔄 Iniciando importação hierárquica...');

    const resultadoSecoes = await importarSecoes(secoesCNAE);
    const resultadoDivisoes = await importarDivisoes(divisoesCNAE);
    const resultadoGrupos = await importarGrupos(gruposCNAE);
    const resultadoClasses = await importarClasses(classesCNAE);
    const resultadoSubclasses = await importarSubclasses(subclassesCNAE);

    // 4. Compilar resultados
    const totalImportados = 
      resultadoSecoes.importados + 
      resultadoDivisoes.importados + 
      resultadoGrupos.importados + 
      resultadoClasses.importados + 
      resultadoSubclasses.importados;

    const totalErros = 
      resultadoSecoes.erros + 
      resultadoDivisoes.erros + 
      resultadoGrupos.erros + 
      resultadoClasses.erros + 
      resultadoSubclasses.erros;

    const totalProcessados = 
      secoesCNAE.length + 
      divisoesCNAE.length + 
      gruposCNAE.length + 
      classesCNAE.length + 
      subclassesCNAE.length;

    const duracaoMs = Date.now() - inicioImportacao;
    const duracao = Math.round(duracaoMs / 1000);

    console.log(`🎉 Importação concluída em ${duracao}s:
    ✅ Total importados: ${totalImportados}
    ❌ Total erros: ${totalErros}
    📊 Total processados: ${totalProcessados}
    
    📋 Detalhes por categoria:
    - Seções: ${resultadoSecoes.importados}/${secoesCNAE.length} (${resultadoSecoes.erros} erros)
    - Divisões: ${resultadoDivisoes.importados}/${divisoesCNAE.length} (${resultadoDivisoes.erros} erros)
    - Grupos: ${resultadoGrupos.importados}/${gruposCNAE.length} (${resultadoGrupos.erros} erros)
    - Classes: ${resultadoClasses.importados}/${classesCNAE.length} (${resultadoClasses.erros} erros)
    - Subclasses: ${resultadoSubclasses.importados}/${subclassesCNAE.length} (${resultadoSubclasses.erros} erros)`);

    // Log dos primeiros erros se houver
    const todosErros = [
      ...resultadoSecoes.detalhesErros,
      ...resultadoDivisoes.detalhesErros,
      ...resultadoGrupos.detalhesErros,
      ...resultadoClasses.detalhesErros,
      ...resultadoSubclasses.detalhesErros
    ];

    if (todosErros.length > 0) {
      console.log('⚠️ Primeiros erros encontrados:');
      todosErros.slice(0, 10).forEach(erro => console.error(erro));
      if (todosErros.length > 10) {
        console.log(`... e mais ${todosErros.length - 10} erros`);
      }
    }

    return {
      importados: totalImportados,
      erros: totalErros,
      total: totalProcessados,
      detalhes: {
        secoes: { importados: resultadoSecoes.importados, erros: resultadoSecoes.erros },
        divisoes: { importados: resultadoDivisoes.importados, erros: resultadoDivisoes.erros },
        grupos: { importados: resultadoGrupos.importados, erros: resultadoGrupos.erros },
        classes: { importados: resultadoClasses.importados, erros: resultadoClasses.erros },
        subclasses: { importados: resultadoSubclasses.importados, erros: resultadoSubclasses.erros }
      }
    };

  } catch (error) {
    const mensagemErro = `❌ Erro fatal na importação: ${error instanceof Error ? error.message : String(error)}`;
    console.error(mensagemErro);
    
    return {
      importados: 0,
      erros: 1,
      total: 0,
      detalhes: {
        secoes: { importados: 0, erros: 0 },
        divisoes: { importados: 0, erros: 0 },
        grupos: { importados: 0, erros: 0 },
        classes: { importados: 0, erros: 0 },
        subclasses: { importados: 0, erros: 1 }
      }
    };
  }
}

// Handler da função serverless
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎯 Função de importação CNAEs chamada');
    
    const resultado = await importarCNAEs();
    
    return new Response(
      JSON.stringify(resultado),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const mensagemErro = `❌ Erro na função: ${error instanceof Error ? error.message : String(error)}`;
    console.error(mensagemErro);
    
    return new Response(
      JSON.stringify({ 
        error: mensagemErro,
        importados: 0,
        erros: 1,
        total: 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});