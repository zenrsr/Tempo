import React, { useState } from 'react';
import { Task, TaskHistoryItem } from '../../types';
import { TaskStatus } from '../../constants';
import Modal from './Modal';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../../contexts/AuthContext';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose, onUpdateTask }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [actionToConfirm, setActionToConfirm] = useState<'approved' | 'rejected' | null>(null);

  if (!task || !user) return null;

  const handleConfirmAction = () => {
    if (!actionToConfirm) return;

    // Fix: Used TaskStatus enum instead of Task type for Rejected status.
    const newStatus = actionToConfirm === 'approved' ? TaskStatus.Approved : TaskStatus.Rejected;
    const newHistoryItem: TaskHistoryItem = {
      id: `hist_${task.id}_${task.history.length + 1}`,
      action: actionToConfirm,
      user: { id: user.id, name: user.name },
      timestamp: new Date().toISOString(),
      comment: comment || undefined,
    };

    const updatedTask: Task = {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      history: [...task.history, newHistoryItem],
    };

    onUpdateTask(updatedTask);
    setComment('');
    setActionToConfirm(null); // Close confirmation modal
  };

  const isActionable = task.status === TaskStatus.Pending;

  return (
    <>
      <Modal isOpen={!!task} onClose={onClose} title={task.title}>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400">Payload</h4>
            <pre className="mt-1 p-3 bg-gray-800 rounded-md text-xs text-gray-300 overflow-x-auto">
              {JSON.stringify(task.payload, null, 2)}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400">History</h4>
            <ul className="mt-2 space-y-3">
              {task.history.map(item => (
                <li key={item.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 font-bold">
                    {item.user.name.substring(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">{item.user.name}</span>
                      <span className="capitalize"> {item.action}</span> this task.
                    </p>
                    {item.comment && <p className="mt-1 text-sm p-2 bg-gray-800 rounded-md text-gray-400 italic">"{item.comment}"</p>}
                    <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isActionable && (
            <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-800 space-y-4">
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  placeholder="Add an optional comment..."
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                ></textarea>
                <div className="flex justify-end space-x-3">
                  <button
                      onClick={() => setActionToConfirm('rejected')}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
                  >
                      Reject
                  </button>
                  <button
                      onClick={() => setActionToConfirm('approved')}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-900"
                  >
                      Approve
                  </button>
                </div>
            </div>
        )}
      </Modal>
      <ConfirmationModal
        isOpen={actionToConfirm !== null}
        onClose={() => setActionToConfirm(null)}
        onConfirm={handleConfirmAction}
        title={`Confirm Task ${actionToConfirm === 'approved' ? 'Approval' : 'Rejection'}`}
        message="Are you sure you want to proceed? This action cannot be undone."
        confirmButtonText={actionToConfirm === 'approved' ? 'Approve' : 'Reject'}
        confirmButtonClass={
          actionToConfirm === 'approved'
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        }
      />
    </>
  );
};

export default TaskDetailModal;