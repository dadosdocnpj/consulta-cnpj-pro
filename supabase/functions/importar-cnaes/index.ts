import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { getDadosCompletosOfficiais, criarSlug } from './dados-completos.ts'

interface ResultadoImportacao {
  sucesso: boolean;
  message: string;
  detalhes: {
    secoes: { total: number; importadas: number; erros: number };
    divisoes: { total: number; importadas: number; erros: number };
    grupos: { total: number; importadas: number; erros: number };
    classes: { total: number; importadas: number; erros: number };
    subclasses: { total: number; importadas: number; erros: number };
  };
  erros: string[];
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

async function processarEmLotes<T>(
  items: T[],
  processarItem: (item: T) => Promise<void>,
  tamanhoLote: number = 50,
  nomeEntidade: string = 'item'
): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  let sucessos = 0
  let erros = 0
  const mensagensErro: string[] = []

  console.log(`Processando ${items.length} ${nomeEntidade}(s) em lotes de ${tamanhoLote}`)

  for (let i = 0; i < items.length; i += tamanhoLote) {
    const lote = items.slice(i, i + tamanhoLote)
    console.log(`Processando lote ${Math.floor(i / tamanhoLote) + 1}/${Math.ceil(items.length / tamanhoLote)} de ${nomeEntidade}`)

    for (const item of lote) {
      try {
        await processarItem(item)
        sucessos++
      } catch (error) {
        erros++
        const mensagem = `Erro ao processar ${nomeEntidade}: ${error.message}`
        mensagensErro.push(mensagem)
        console.error(mensagem)
      }
    }

    // Pequena pausa entre lotes para evitar sobrecarga
    if (i + tamanhoLote < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  return { sucessos, erros, mensagensErro }
}

// Função de validação removida - as tabelas já existem no banco
// Validação desnecessária que causava erro 500 ao tentar acessar information_schema

async function importarSecoes(secoes: any[]): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  return await processarEmLotes(
    secoes,
    async (secao) => {
      const { error } = await supabase
        .from('cnaes_secoes')
        .upsert({
          codigo: secao.codigo,
          nome: secao.nome,
          descricao: secao.descricao || null,
          slug: criarSlug(secao.nome),
          icone: secao.icone || null
        }, {
          onConflict: 'codigo'
        })

      if (error) {
        throw new Error(`Erro ao inserir seção ${secao.codigo}: ${error.message}`)
      }
    },
    25,
    'seções'
  )
}

async function importarDivisoes(divisoes: any[]): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  return await processarEmLotes(
    divisoes,
    async (divisao) => {
      // Buscar seção pai
      const { data: secao, error: secaoError } = await supabase
        .from('cnaes_secoes')
        .select('id')
        .eq('codigo', divisao.secao_codigo)
        .single()

      if (secaoError || !secao) {
        throw new Error(`Seção pai ${divisao.secao_codigo} não encontrada para divisão ${divisao.codigo}`)
      }

      const { error } = await supabase
        .from('cnaes_divisoes')
        .upsert({
          codigo: divisao.codigo,
          nome: divisao.nome,
          descricao: divisao.descricao || null,
          slug: criarSlug(divisao.nome),
          secao_id: secao.id
        }, {
          onConflict: 'codigo'
        })

      if (error) {
        throw new Error(`Erro ao inserir divisão ${divisao.codigo}: ${error.message}`)
      }
    },
    25,
    'divisões'
  )
}

async function importarGrupos(grupos: any[]): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  return await processarEmLotes(
    grupos,
    async (grupo) => {
      // Buscar divisão pai
      const { data: divisao, error: divisaoError } = await supabase
        .from('cnaes_divisoes')
        .select('id')
        .eq('codigo', grupo.divisao_codigo)
        .single()

      if (divisaoError || !divisao) {
        throw new Error(`Divisão pai ${grupo.divisao_codigo} não encontrada para grupo ${grupo.codigo}`)
      }

      const { error } = await supabase
        .from('cnaes_grupos')
        .upsert({
          codigo: grupo.codigo,
          nome: grupo.nome,
          descricao: grupo.descricao || null,
          slug: criarSlug(grupo.nome),
          divisao_id: divisao.id
        }, {
          onConflict: 'codigo'
        })

      if (error) {
        throw new Error(`Erro ao inserir grupo ${grupo.codigo}: ${error.message}`)
      }
    },
    25,
    'grupos'
  )
}

async function importarClasses(classes: any[]): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  return await processarEmLotes(
    classes,
    async (classe) => {
      // Buscar grupo pai
      const { data: grupo, error: grupoError } = await supabase
        .from('cnaes_grupos')
        .select('id')
        .eq('codigo', classe.grupo_codigo)
        .single()

      if (grupoError || !grupo) {
        throw new Error(`Grupo pai ${classe.grupo_codigo} não encontrado para classe ${classe.codigo}`)
      }

      const { error } = await supabase
        .from('cnaes_classes')
        .upsert({
          codigo: classe.codigo,
          nome: classe.nome,
          descricao: classe.descricao || null,
          slug: criarSlug(classe.nome),
          grupo_id: grupo.id
        }, {
          onConflict: 'codigo'
        })

      if (error) {
        throw new Error(`Erro ao inserir classe ${classe.codigo}: ${error.message}`)
      }
    },
    25,
    'classes'
  )
}

async function importarSubclasses(subclasses: any[]): Promise<{ sucessos: number; erros: number; mensagensErro: string[] }> {
  return await processarEmLotes(
    subclasses,
    async (subclasse) => {
      // Buscar classe pai
      const { data: classe, error: classeError } = await supabase
        .from('cnaes_classes')
        .select('id')
        .eq('codigo', subclasse.classe_codigo)
        .single()

      if (classeError || !classe) {
        throw new Error(`Classe pai ${subclasse.classe_codigo} não encontrada para subclasse ${subclasse.codigo}`)
      }

      const { error } = await supabase
        .from('cnaes_subclasses')
        .upsert({
          codigo: subclasse.codigo,
          nome: subclasse.nome,
          descricao: subclasse.descricao || null,
          slug: criarSlug(subclasse.nome),
          classe_id: classe.id,
          is_principal: subclasse.is_principal || false
        }, {
          onConflict: 'codigo'
        })

      if (error) {
        throw new Error(`Erro ao inserir subclasse ${subclasse.codigo}: ${error.message}`)
      }
    },
    25,
    'subclasses'
  )
}

async function importarCNAEs(): Promise<ResultadoImportacao> {
  console.log('=== INÍCIO DA IMPORTAÇÃO DE CNAEs ===')
  
  const resultado: ResultadoImportacao = {
    sucesso: false,
    message: '',
    detalhes: {
      secoes: { total: 0, importadas: 0, erros: 0 },
      divisoes: { total: 0, importadas: 0, erros: 0 },
      grupos: { total: 0, importadas: 0, erros: 0 },
      classes: { total: 0, importadas: 0, erros: 0 },
      subclasses: { total: 0, importadas: 0, erros: 0 }
    },
    erros: []
  }

  try {
    console.log('Obtendo dados oficiais dos CNAEs...')
    const dadosCompletos = getDadosCompletosOfficiais()

    // Importar seções
    console.log('\n=== IMPORTANDO SEÇÕES ===')
    resultado.detalhes.secoes.total = dadosCompletos.secoes.length
    const resultadoSecoes = await importarSecoes(dadosCompletos.secoes)
    resultado.detalhes.secoes.importadas = resultadoSecoes.sucessos
    resultado.detalhes.secoes.erros = resultadoSecoes.erros
    resultado.erros.push(...resultadoSecoes.mensagensErro)

    // Importar divisões
    console.log('\n=== IMPORTANDO DIVISÕES ===')
    resultado.detalhes.divisoes.total = dadosCompletos.divisoes.length
    const resultadoDivisoes = await importarDivisoes(dadosCompletos.divisoes)
    resultado.detalhes.divisoes.importadas = resultadoDivisoes.sucessos
    resultado.detalhes.divisoes.erros = resultadoDivisoes.erros
    resultado.erros.push(...resultadoDivisoes.mensagensErro)

    // Importar grupos
    console.log('\n=== IMPORTANDO GRUPOS ===')
    resultado.detalhes.grupos.total = dadosCompletos.grupos.length
    const resultadoGrupos = await importarGrupos(dadosCompletos.grupos)
    resultado.detalhes.grupos.importadas = resultadoGrupos.sucessos
    resultado.detalhes.grupos.erros = resultadoGrupos.erros
    resultado.erros.push(...resultadoGrupos.mensagensErro)

    // Importar classes
    console.log('\n=== IMPORTANDO CLASSES ===')
    resultado.detalhes.classes.total = dadosCompletos.classes.length
    const resultadoClasses = await importarClasses(dadosCompletos.classes)
    resultado.detalhes.classes.importadas = resultadoClasses.sucessos
    resultado.detalhes.classes.erros = resultadoClasses.erros
    resultado.erros.push(...resultadoClasses.mensagensErro)

    // Importar subclasses
    console.log('\n=== IMPORTANDO SUBCLASSES ===')
    resultado.detalhes.subclasses.total = dadosCompletos.subclasses.length
    const resultadoSubclasses = await importarSubclasses(dadosCompletos.subclasses)
    resultado.detalhes.subclasses.importadas = resultadoSubclasses.sucessos
    resultado.detalhes.subclasses.erros = resultadoSubclasses.erros
    resultado.erros.push(...resultadoSubclasses.mensagensErro)

    // Verificar sucesso geral
    const totalErros = resultado.detalhes.secoes.erros + 
                      resultado.detalhes.divisoes.erros + 
                      resultado.detalhes.grupos.erros + 
                      resultado.detalhes.classes.erros + 
                      resultado.detalhes.subclasses.erros

    if (totalErros === 0) {
      resultado.sucesso = true
      resultado.message = 'Importação de CNAEs concluída com sucesso!'
    } else {
      resultado.sucesso = false
      resultado.message = `Importação concluída com ${totalErros} erro(s)`
    }

    console.log('\n=== RESULTADO FINAL ===')
    console.log(`Seções: ${resultado.detalhes.secoes.importadas}/${resultado.detalhes.secoes.total}`)
    console.log(`Divisões: ${resultado.detalhes.divisoes.importadas}/${resultado.detalhes.divisoes.total}`)
    console.log(`Grupos: ${resultado.detalhes.grupos.importadas}/${resultado.detalhes.grupos.total}`)
    console.log(`Classes: ${resultado.detalhes.classes.importadas}/${resultado.detalhes.classes.total}`)
    console.log(`Subclasses: ${resultado.detalhes.subclasses.importadas}/${resultado.detalhes.subclasses.total}`)
    console.log(`Total de erros: ${totalErros}`)

    return resultado

  } catch (error) {
    console.error('Erro geral na importação:', error)
    resultado.sucesso = false
    resultado.message = `Erro durante a importação: ${error.message}`
    resultado.erros.push(error.message)
    return resultado
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Iniciando importação de CNAEs...')
    const resultado = await importarCNAEs()

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: resultado.sucesso ? 200 : 500
    })

  } catch (error) {
    console.error('Erro na função importar-cnaes:', error)
    
    const resultado: ResultadoImportacao = {
      sucesso: false,
      message: `Erro inesperado: ${error.message}`,
      detalhes: {
        secoes: { total: 0, importadas: 0, erros: 0 },
        divisoes: { total: 0, importadas: 0, erros: 0 },
        grupos: { total: 0, importadas: 0, erros: 0 },
        classes: { total: 0, importadas: 0, erros: 0 },
        subclasses: { total: 0, importadas: 0, erros: 0 }
      },
      erros: [error.message]
    }

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})