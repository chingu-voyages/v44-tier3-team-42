'use client';

import useBoundStore from '@/store';
import type { AlertType } from '@/store/alertSlice';
import { twMerge } from 'tailwind-merge';

type ToastProps = {
  type?: AlertType;
  message: string;
};

const variants: { [key in AlertType]: string } = {
  default: 'border-primary bg-primarySubtle',
  error: 'border-red-700 bg-red-200',
  success: 'border-green-700 bg-green-200',
};

const Toast: React.FC<ToastProps> = ({ type = 'default', message }) => (
  <div
    className={twMerge(
      'flex items-center px-3 py-2 rounded-lg border-2',
      variants[type],
    )}
  >
    <p>{message}</p>
  </div>
);

type PopupProps = {
  /**
   * Variant of the component
   */
  variant?: 'toast' | 'banner';
};

const Popup: React.FC<PopupProps> = ({ variant = 'toast' }) => {
  const alert = useBoundStore((state) => state.alert);

  if (!alert.message) {
    return null;
  }

  let displayEl = null;

  if (variant === 'toast') {
    displayEl = <Toast type={alert.type} message={alert.message} />;
  }

  return (
    <div className="fixed z-50 left-3 bottom-6" role="alert">
      {displayEl}
    </div>
  );
};

export default Popup;
