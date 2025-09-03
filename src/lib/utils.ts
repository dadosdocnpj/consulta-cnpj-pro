import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Remove acentos de uma string
 */
export const removeAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Cria um slug a partir do nome da cidade
 * Converte para minúsculo, remove acentos e substitui espaços por hífens
 */
export const createCitySlug = (cityName: string): string => {
  if (!cityName) return '';
  
  return removeAccents(cityName)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Converte um slug de volta para nome de cidade para busca no banco
 * Tenta primeiro como slug, depois como nome original
 */
export const parseCityFromSlug = (slug: string): string => {
  if (!slug) return '';
  
  // Se for um slug (contém hífens e está em minúsculo), converte de volta
  if (slug.includes('-') && slug === slug.toLowerCase()) {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  // Senão, retorna como está (compatibilidade com URLs antigas)
  return decodeURIComponent(slug);
};
