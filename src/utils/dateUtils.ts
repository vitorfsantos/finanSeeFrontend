/**
 * Utilitários para formatação de datas
 */

/**
 * Formata uma data string para o formato brasileiro com data e hora
 * @param dateString - String da data no formato ISO ou compatível
 * @returns String formatada no padrão DD/MM/AAAA, HH:MM
 */
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formata uma data string para o formato brasileiro apenas com data
 * @param dateString - String da data no formato ISO ou compatível
 * @returns String formatada no padrão DD/MM/AAAA
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

/**
 * Formata uma data string para o formato brasileiro apenas com hora
 * @param dateString - String da data no formato ISO ou compatível
 * @returns String formatada no padrão HH:MM
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formata uma data string para o formato brasileiro com data e hora completa
 * @param dateString - String da data no formato ISO ou compatível
 * @returns String formatada no padrão DD/MM/AAAA, HH:MM:SS
 */
export const formatDateTimeFull = (dateString: string): string => {
  return new Date(dateString).toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
