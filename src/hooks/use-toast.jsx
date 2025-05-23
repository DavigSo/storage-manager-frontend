// src/hooks/use-toast.jsx

import { useState, useEffect } from 'react';

// Estado global em memória para armazenar toasts
let memoryState = { toasts: [] };
let listeners = [];

// Gera um ID único simples para cada toast
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Reducer para gerenciar ações de toast
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      // Adiciona novo toast no início da lista
      return { ...state, toasts: [action.toast, ...state.toasts] };
    case 'UPDATE_TOAST':
      // Atualiza um toast existente pelo id
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case 'DISMISS_TOAST':
      // Fecha (open: false) o toast especificado
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          action.toastId && t.id !== action.toastId ? t : { ...t, open: false }
        ),
      };
    case 'REMOVE_TOAST':
      // Remove completamente o toast da lista
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

// Função para despachar ações e notificar listeners
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// Cria um novo toast com as propriedades e retorna controladores
function toast({ title, description, variant = 'default', action, onOpenChange, ...rest } = {}) {
  const id = generateId();
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });
  const update = (props) => dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } });

  // Adiciona o toast ao estado global (abre-o imediatamente)
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      id,
      title,
      description,
      variant,
      action,
      open: true,
      // Ao mudar de aberto para fechado, executa dismiss (e callback extra, se houver)
      onOpenChange: (open) => {
        if (!open) dismiss();
        if (onOpenChange) onOpenChange(open);
      },
      ...rest,
    },
  });

  return { id, dismiss, update };
}

// Hook para fornecer acesso aos toasts e às funções toast/dismiss
export function useToast() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    // Inscreve-se nas mudanças de estado global
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return {
    // Lista de toasts ativos
    toasts: state.toasts,
    // Função para criar um toast
    toast,
    // Função para dispensar um toast específico
    dismiss: (toastId) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { toast };