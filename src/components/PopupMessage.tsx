import { AlertTriangle } from 'lucide-react';

interface PopupMessageProps {
  title: string;
  message: string;
  onClickAction?: any;
}

export function PopupMessage({ title, message, onClickAction }: PopupMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300">
      <div className="popup rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0 p-6 w-120 animate-slide-message-in">
        <div className="primary-text text-md font-semibold border-b border-color pb-3 pl-2">{title}</div>
        <div className="secondary-text text-md py-3 pl-2 flex items-center">
          <AlertTriangle size={24} className="mr-2" /> {message}
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <div className="text-sm py-[6px] px-4 rounded-md primary-btn" onClick={() => onClickAction({ type: 'confirm' })}>
            Confirm
          </div>
          <div className="text-sm py-[6px] px-4 rounded-md secondary-btn" onClick={() => onClickAction({ type: 'cancel' })}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
