// src/components/ui/toast.jsx

import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../lib/utils';
import React from 'react';

// ToastProvider envolve os toasts (provê contexto e animações)
export const ToastProvider = ToastPrimitive.Provider;

// Container de onde os toasts aparecem (posição fixa na tela)
export const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        // Posição fixa no canto inferior direito, gap entre toasts, padding
        'fixed bottom-0 right-0 flex flex-col p-6 gap-3 max-w-sm w-full',
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Toast principal (Root) com variantes de estilo
export const Toast = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg',
        // Variantes: default branco e destructive vermelho
        variant === 'destructive'
          ? 'border-red-600 bg-red-600 text-white'
          : 'border-gray-200 bg-white text-gray-900',
        className
      )}
      {...props}
    />
  )
);
Toast.displayName = ToastPrimitive.Root.displayName;

// Título do toast (texto principal em negrito)
export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

// Descrição do toast (texto secundário)
export const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Description
      ref={ref}
      className={cn('text-sm opacity-80', className)}
      {...props}
    />
  )
);
ToastDescription.displayName = ToastPrimitive.Description.displayName;

// Botão de ação no toast (por exemplo, "Desfazer")
// Usa altText para acessibilidade (texto alternativo)
export const ToastAction = React.forwardRef(
  ({ className, altText, ...props }, ref) => (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(
        'inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        className
      )}
      altText={altText}
      {...props}
    />
  )
);
ToastAction.displayName = ToastPrimitive.Action.displayName;

export const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
      className
    )}
    {...props}
  >
    {/* SVG de um “X” simples */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;
