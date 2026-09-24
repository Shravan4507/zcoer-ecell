import type { ToastType } from '../components/toast/Toast';

export function notify(message: string, type: ToastType = 'info', duration?: number) {
  window.dispatchEvent(new CustomEvent('app-toast', { detail: { message, type, duration } }));
}
