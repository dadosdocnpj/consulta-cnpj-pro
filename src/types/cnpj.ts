export interface CNPJData {
  status: string;
  cnpj: string;
  razao_social?: string;
  nome_fantasia?: string;
  situacao_cadastral?: string;
  data_situacao_cadastral?: string;
  motivo_situacao_cadastral?: string;
  natureza_juridica?: string;
  porte?: string;
  tipo?: string;
  cnae_principal?: {
    codigo: string;
    descricao: string;
  };
  cnaes_secundarios?: Array<{
    codigo: string;
    descricao: string;
  }>;
  endereco?: {
    tipo_logradouro?: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  telefone?: string;
  telefone2?: string;
  email?: string;
  data_abertura?: string;
  regime_tributario?: string;
  capital_social?: string;
  cnpj_formatado?: string;
  slug?: string;
  url_path?: string;
}

export interface CNPJLookupResponse extends CNPJData {
  // Herda todos os campos de CNPJData
}

export interface CNPJLookupRequest {
  cnpj: string;
}