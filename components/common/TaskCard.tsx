import React from 'react';
import { Task } from '../../types';
import { TaskStatus } from '../../constants';

interface TaskCardProps {
  task: Task;
  onSelect: (task: Task) => void;
}

const statusStyles: Record<TaskStatus, { bg: string, text: string, dot: string }> = {
  [TaskStatus.Pending]: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  [TaskStatus.Approved]: { bg: 'bg-green-900/50', text: 'text-green-400', dot: 'bg-green-400' },
  [TaskStatus.Rejected]: { bg: 'bg-red-900/50', text: 'text-red-400', dot: 'bg-red-400' },
  [TaskStatus.Expired]: { bg: 'bg-gray-800/80', text: 'text-gray-500', dot: 'bg-gray-500' },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect }) => {
  const styles = statusStyles[task.status];

  return (
    <div 
        onClick={() => onSelect(task)}
        className="bg-gray-900 border border-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-800/50 transition-colors duration-200 shadow-md"
    >
        <div className="flex justify-between items-start">
            <p className="text-sm font-semibold text-white pr-4">{task.title}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
                <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${styles.dot}`} fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                </svg>
                {task.status}
            </span>
        </div>
        <div className="mt-4 text-xs text-gray-500">
            <p>Workflow ID: {task.temporalWorkflowId}</p>
            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
        </div>
    </div>
  );
};

export default TaskCard;
