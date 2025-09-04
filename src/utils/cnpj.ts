/**
 * Remove todos os caracteres não numéricos do CNPJ
 */
export const cleanCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};

/**
 * Formata o CNPJ com pontuação
 */
export const formatCNPJ = (cnpj: string): string => {
  const cleaned = cleanCNPJ(cnpj);
  
  if (cleaned.length !== 14) {
    return cnpj; // Retorna como está se não tiver 14 dígitos
  }
  
  return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

/**
 * Valida se o CNPJ tem formato válido (14 dígitos)
 */
export const isValidCNPJFormat = (cnpj: string): boolean => {
  const cleaned = cleanCNPJ(cnpj);
  return cleaned.length === 14 && /^\d{14}$/.test(cleaned);
};

/**
 * Valida dígito verificador do CNPJ
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  const cleaned = cleanCNPJ(cnpj);
  
  if (!isValidCNPJFormat(cleaned)) {
    return false;
  }

  // Elimina CNPJs conhecidos como inválidos
  if (/^(\d)\1{13}$/.test(cleaned)) {
    return false;
  }

  // Valida DVs
  let size = cleaned.length - 2;
  let numbers = cleaned.substring(0, size);
  const digits = cleaned.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cleaned.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  return result === parseInt(digits.charAt(1));
};

/**
 * Normaliza entrada de CNPJ (aceita nome da empresa ou CNPJ)
 */
export const normalizeCNPJInput = (input: string): { type: 'cnpj' | 'name', value: string } => {
  const cleaned = cleanCNPJ(input);
  
  // Verifica se é um CNPJ completo (14 dígitos)
  if (cleaned.length === 14 && /^\d{14}$/.test(cleaned)) {
    return { type: 'cnpj', value: cleaned };
  }
  
  // Verifica se pode ser um CNPJ parcial (mínimo 8 dígitos para considerar)
  if (cleaned.length >= 8 && /^\d+$/.test(cleaned)) {
    return { type: 'cnpj', value: cleaned };
  }
  
  return { type: 'name', value: input.trim() };
};

/**
 * Valida se é um CNPJ parcial válido
 */
export const isPartialCNPJ = (input: string): boolean => {
  const cleaned = cleanCNPJ(input);
  return cleaned.length >= 8 && cleaned.length <= 14 && /^\d+$/.test(cleaned);
};

/**
 * Detecta se o input é mais provavelmente um CNPJ ou nome
 */
export const detectInputType = (input: string): 'cnpj' | 'name' | 'partial_cnpj' => {
  const cleaned = cleanCNPJ(input);
  
  if (cleaned.length === 14) {
    return 'cnpj';
  }
  
  if (cleaned.length >= 8 && /^\d+$/.test(cleaned)) {
    return 'partial_cnpj';
  }
  
  return 'name';
};

/**
 * Gera mensagem de erro específica para CNPJ
 */
export const getCNPJErrorMessage = (cnpj: string): string => {
  const cleaned = cleanCNPJ(cnpj);
  
  if (cleaned.length === 0) {
    return 'Digite um CNPJ válido';
  }
  
  if (cleaned.length < 14) {
    return 'CNPJ deve ter 14 dígitos';
  }
  
  if (cleaned.length > 14) {
    return 'CNPJ não pode ter mais de 14 dígitos';
  }
  
  if (!isValidCNPJ(cleaned)) {
    return 'CNPJ inválido - verifique os dígitos';
  }
  
  return 'CNPJ não encontrado';
};

/**
 * Formata CEP com máscara
 */
export const formatCEP = (cep: string): string => {
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length !== 8) {
    return cep;
  }
  
  return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

/**
 * Formata telefone brasileiro
 */
export const formatTelefone = (telefone: string): string => {
  if (!telefone) return '';
  
  const cleaned = telefone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  
  return telefone;
};

/**
 * Formata capital social em moeda brasileira
 */
export const formatCapitalSocial = (capital: string): string => {
  if (!capital) return '';
  
  const numero = parseFloat(capital);
  
  if (isNaN(numero)) return capital;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numero);
};

/**
 * Calcula idade da empresa em anos
 */
export const calcularIdadeEmpresa = (dataAbertura: string): string => {
  if (!dataAbertura) return '';
  
  const abertura = new Date(dataAbertura);
  const hoje = new Date();
  
  if (isNaN(abertura.getTime())) return '';
  
  const diffTime = hoje.getTime() - abertura.getTime();
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  
  if (diffYears < 1) {
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    return diffMonths <= 1 ? '1 mês' : `${diffMonths} meses`;
  }
  
  return diffYears === 1 ? '1 ano' : `${diffYears} anos`;
};

/**
 * Formata data para padrão brasileiro
 */
export const formatDateBR = (date: string): string => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return date;
  
  return dateObj.toLocaleDateString('pt-BR');
};

/**
 * Gera endereço completo formatado
 */
export const formatEnderecoCompleto = (endereco: any): string => {
  if (!endereco) return '';
  
  const partes = [];
  
  if (endereco.tipo_logradouro && endereco.logradouro) {
    partes.push(`${endereco.tipo_logradouro} ${endereco.logradouro}`);
  } else if (endereco.logradouro) {
    partes.push(endereco.logradouro);
  }
  
  if (endereco.numero) {
    partes.push(endereco.numero);
  }
  
  if (endereco.complemento) {
    partes.push(endereco.complemento);
  }
  
  if (endereco.bairro) {
    partes.push(endereco.bairro);
  }
  
  if (endereco.municipio && endereco.uf) {
    partes.push(`${endereco.municipio}/${endereco.uf}`);
  }
  
  if (endereco.cep) {
    partes.push(`CEP: ${formatCEP(endereco.cep)}`);
  }
  
  return partes.join(', ');
};

/**
 * Interpreta o porte da empresa
 */
export const interpretarPorte = (porte: string): string => {
  const portes: Record<string, string> = {
    'MICRO EMPRESA': 'Microempresa',
    'PEQUENO PORTE': 'Empresa de Pequeno Porte',
    'DEMAIS': 'Empresa de Médio/Grande Porte'
  };
  
  return portes[porte] || porte;
};

/**
 * Gera URL do Google Maps para o endereço
 */
export const gerarURLMaps = (endereco: any): string => {
  if (!endereco) return '';
  
  const enderecoCompleto = formatEnderecoCompleto(endereco);
  
  if (!enderecoCompleto) return '';
  
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;
};