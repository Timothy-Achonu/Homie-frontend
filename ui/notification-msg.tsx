'use client';

import { Typography } from './typography';
import clsx from 'clsx';

export interface NotificationMsgProps {
  message?: string;
  subtitle?: string;
  type?: 'success' | 'error';
}




const NotificationMsg = ({ message, subtitle, type = 'success' }: NotificationMsgProps) => {
  return (
    <div className="flex flex-col">
      {message && (
        <h2
          className={clsx(
            'text-body-s font-bold tracking-[0.2px] first-letter:capitalize',
            type === 'success' ? 'text-success' : 'text-error'
          )}
        >
          {message}
        </h2>
      )}

      {subtitle && (
        <Typography className="text-[#A9A9A9]" variant="text-xs">
          {subtitle[0]?.toUpperCase() + subtitle?.slice(1)}
        </Typography>
      )}
    </div>
  );
};

export { NotificationMsg };
