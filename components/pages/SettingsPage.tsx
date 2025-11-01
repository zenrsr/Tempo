import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TEMPORAL_CONNECTIONS } from '../../data/mockData';
import { TemporalConnection } from '../../types';

const SettingsPage: React.FC = () => {
    const { user, currentOrg } = useAuth();
    
    // State for the form fields
    const [displayName, setDisplayName] = useState('');
    const [target, setTarget] = useState('');
    const [clientType, setClientType] = useState<'cloud' | 'self_hosted'>('cloud');
    
    // Manage connections in state to allow adding/deleting
    const [allConnections, setAllConnections] = useState<TemporalConnection[]>(TEMPORAL_CONNECTIONS);

    const orgConnections = useMemo(() => {
        if (!currentOrg) return [];
        return allConnections.filter(conn => conn.orgId === currentOrg.id);
    }, [currentOrg, allConnections]);

    if (!user || !currentOrg) {
        return <p>Loading...</p>;
    }

    const handleAddConnection = (e: React.FormEvent) => {
        e.preventDefault();
        const newConnection: TemporalConnection = {
            id: `conn_${Date.now()}`,
            orgId: currentOrg.id,
            displayName,
            target,
            clientType,
        };
        setAllConnections(prev => [...prev, newConnection]);
        
        // Reset form
        setDisplayName('');
        setTarget('');
        setClientType('cloud');
    };

    const handleDeleteConnection = (connectionId: string) => {
        if (window.confirm("Are you sure you want to delete this connection?")) {
            setAllConnections(prev => prev.filter(c => c.id !== connectionId));
        }
    };
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">Settings</h1>
                <p className="text-sm text-gray-400">Manage settings for your account and organization</p>
            </div>

            <div className="space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-white">Temporal Connections</h3>
                        <p className="mt-1 text-sm text-gray-400">Connect Tempo to your Temporal clusters.</p>
                    </div>
                    
                    {orgConnections.length > 0 ? (
                        <ul className="divide-y divide-gray-800">
                            {orgConnections.map(conn => (
                                <li key={conn.id} className="px-6 py-4 flex items-center justify-between group">
                                    <div>
                                        <p className="text-sm font-medium text-white">{conn.displayName}</p>
                                        <p className="text-sm text-gray-400">{conn.target}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
                                            {conn.clientType.replace('_', '-')}
                                        </span>
                                        <button 
                                            onClick={() => handleDeleteConnection(conn.id)}
                                            className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete Connection"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p className="px-6 py-4 text-sm text-gray-500 border-y border-gray-800">No connections configured for this organization.</p>
                    )}

                    <form onSubmit={handleAddConnection} className="p-6 border-t border-gray-800 space-y-4">
                        <h4 className="text-md font-medium text-white">Add New Connection</h4>
                        
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300">Display Name</label>
                            <input
                                type="text"
                                name="displayName"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                placeholder="e.g., Production Cluster"
                            />
                        </div>

                        <div>
                            <label htmlFor="target" className="block text-sm font-medium text-gray-300">Target URL / Namespace</label>
                             <input
                                type="text"
                                name="target"
                                id="target"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                placeholder="my-cluster.tmprl.cloud:7233"
                            />
                        </div>

                        <div>
                            <label htmlFor="clientType" className="block text-sm font-medium text-gray-300">Client Type</label>
                            <select
                                id="clientType"
                                name="clientType"
                                value={clientType}
                                onChange={(e) => setClientType(e.target.value as 'cloud' | 'self_hosted')}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-800 text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="cloud">Cloud</option>
                                <option value="self_hosted">Self-Hosted</option>
                            </select>
                        </div>
                        
                        <div className="flex justify-end">
                             <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                            >
                                Save Connection
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white">Your Profile</h3>
                    <div className="mt-4 space-y-2 text-sm">
                        <p><span className="font-semibold text-gray-400">Name:</span> {user.name}</p>
                        <p><span className="font-semibold text-gray-400">Email:</span> {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;