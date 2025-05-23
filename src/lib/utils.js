// Função para juntar classNames condicionalmente
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
