import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AUDIT_LOGS } from '../../data/mockData';

const AuditLogPage: React.FC = () => {
    const { currentOrg } = useAuth();
    
    const logs = useMemo(() => {
        if (!currentOrg) return [];
        return AUDIT_LOGS
            .filter(log => log.orgId === currentOrg.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [currentOrg]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">Audit Log</h1>
                <p className="text-sm text-gray-400">A record of all activities within {currentOrg?.name}</p>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-800">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-900">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actor</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Target</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.actor.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/50 text-blue-300">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{log.target.type}:{log.target.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogPage;
