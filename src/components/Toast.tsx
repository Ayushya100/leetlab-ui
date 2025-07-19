import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  resStatus: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, resStatus, type = 'success', onClose }: ToastProps) {
  return (
    <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-md shadow-lg text-white flex items-center space-x-3 bg-toast bg-[#1f1f1f] min-w-[300px]">
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className={`absolute w-10 h-10 rounded-full opacity-20 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className={`absolute w-6 h-6 rounded-full opacity-70 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}></div>
        <div className="z-10 text-white">{type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}</div>
      </div>

      <div className="text-sm flex-1">
        <div className="font-medium">{resStatus}</div>
        <div className="truncate overflow-hidden whitespace-nowrap max-w-[300px]" title={message}>
          {message}
        </div>
      </div>

      <button onClick={onClose} className="ml-3 text-white hover:opacity-80 hover:cursor-pointer text-lg">
        ×
      </button>
    </div>
  );
}
