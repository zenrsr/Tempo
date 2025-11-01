import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TASKS } from '../../data/mockData';
import { Task } from '../../types';
import { TaskStatus } from '../../constants';
import TaskCard from '../common/TaskCard';
import TaskDetailModal from '../common/TaskDetailModal';

const InboxPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  useEffect(() => {
    if (currentOrg) {
      setTasks(TASKS.filter(task => task.orgId === currentOrg.id));
    } else {
      setTasks([]);
    }
  }, [currentOrg]);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    setTasks(currentTasks => 
      currentTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    setSelectedTask(updatedTask); // Keep modal open with updated data
  }, []);
  
  const closeModal = () => setSelectedTask(null);

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks;
    return tasks.filter(task => task.status === statusFilter);
  }, [tasks, statusFilter]);

  const statusCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {} as Record<TaskStatus, number>);
  }, [tasks]);

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-semibold text-white">Inbox</h1>
            <p className="text-sm text-gray-400">Tasks requiring your attention</p>
        </div>

        <div className="flex items-center space-x-2 border-b border-gray-800">
            <FilterButton label="All" count={tasks.length} active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
            {Object.values(TaskStatus).map(status => (
                <FilterButton key={status} label={status} count={statusCounts[status] || 0} active={statusFilter === status} onClick={() => setStatusFilter(status)} />
            ))}
        </div>
      
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} onSelect={() => setSelectedTask(task)} />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No tasks match the current filter.</p>
                </div>
            )}
        </div>

      <TaskDetailModal 
        task={selectedTask} 
        onClose={closeModal}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

const FilterButton: React.FC<{ label: string, count: number, active: boolean, onClick: () => void }> = ({ label, count, active, onClick }) => (
    <button onClick={onClick} className={`px-3 py-2 text-sm font-medium capitalize rounded-t-md focus:outline-none ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'}`}>
        {label}
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'}`}>{count}</span>
    </button>
);

export default InboxPage;
