import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  confirmButtonClass?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = 'Confirm',
  confirmButtonClass = 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75" aria-labelledby="confirmation-modal-title" role="dialog" aria-modal="true">
        <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-md border border-gray-800"
        >
            <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-white" id="confirmation-modal-title">{title}</h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-400">{message}</p>
                </div>
            </div>
            <div className="bg-gray-800/50 px-6 py-3 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${confirmButtonClass}`}
                >
                    {confirmButtonText}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;
