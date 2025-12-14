'use client';

import { Id, ToastContent, ToastOptions, UpdateOptions, toast } from 'react-toastify';
import { NotificationMsg } from '@/ui';
import { Ticket, XCircle } from 'lucide-react';

// Notifications props
interface NotifProps extends ToastOptions<object> {
  content?: ToastContent<unknown>;
  message?: string;
  subtitle?: string;
}

// Update notifications props
interface UpdateNotifProps extends UpdateOptions<object> {
  content?: ToastContent<unknown>;
  message?: string;
  subtitle?: string;
}

// Success notifications trigger
const success = ({ content, message, subtitle, ...options }: NotifProps) =>
  toast.success(content ? content : <NotificationMsg message={message} subtitle={subtitle} />, {
    icon: <Ticket className="h-7 w-7" />,
    ...options,
  });

// Error notifications trigger
const error = ({ content, message, subtitle, ...options }: NotifProps) =>
  toast.error(
    content ? content : <NotificationMsg message={message} subtitle={subtitle} type="error" />,
    {
      icon: <XCircle className="h-7 w-7" />,
      ...options,
    }
  );

// Info notifications trigger
// const info = ({ content, message, subtitle, ...options }: NotifProps) =>
//   toast.info(content ? content : <NotificationMsg message={message} subtitle={subtitle} />, {
//     icon: NotifInfoIcon,
//     ...options,
//   });

// Update notifications trigger
const update = (id: Id, { content, message, subtitle, type, ...props }: UpdateNotifProps) =>
  toast.update(id, {
    render: content ? content : <NotificationMsg message={message} subtitle={subtitle} />,
    icon: type === 'error' ? <XCircle className="h-7 w-7" /> : <Ticket className="h-7 w-7" />,
    ...props,
  });

// Dismiss all notifications
const dismissAll = () => toast.dismiss();

export { success, error, update, dismissAll };
