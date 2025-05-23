// src/components/ui/toaster.jsx

import React from 'react';
import { useToast } from '../../hooks/use-toast';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          open={toast.open}
          onOpenChange={toast.onOpenChange}
          variant={toast.variant}
        >
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && (
            <ToastDescription>{toast.description}</ToastDescription>
          )}
          {toast.action && (
            <ToastAction altText="Ação">{toast.action}</ToastAction>
          )}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
