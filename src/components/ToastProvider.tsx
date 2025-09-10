'use client';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        style: { borderRadius: '12px' },
        success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
        error: { iconTheme: { primary: '#E11900', secondary: '#fff' } },
      }}
    />
  );
}
