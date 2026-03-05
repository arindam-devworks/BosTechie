import { useState } from 'react';
import Table from '../components/Table';
import { Mail, Smartphone, RefreshCw, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function Inbox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const StatusDropdown = ({ currentStatus }) => {
        return (
            <select
                defaultValue={currentStatus || 'pending'}
                className={`text-xs font-medium px-2 py-1 rounded-full border outline-none transition-colors duration-200 bg-white dark:bg-slate-900
          ${currentStatus === 'resolved' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30' : ''}
          ${currentStatus === 'pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/30' : ''}
          ${currentStatus === 'ignored' ? 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-slate-600' : ''}
        `}
            >
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="ignored">Ignored</option>
            </select>
        );
    };

    const columns = [
        {
            header: 'Contact Name',
            accessor: 'contactName',
            render: (row) => <div className="font-medium text-gray-900 dark:text-gray-100">{row.contactName}</div>
        },
        {
            header: 'Channel',
            accessor: 'channel',
            render: (row) => (
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 capitalize">
                    {row.channel === 'whatsapp' ? <Smartphone size={14} className="text-green-600 dark:text-green-400" /> : <Mail size={14} className="text-blue-600 dark:text-blue-400" />}
                    {row.channel}
                </div>
            )
        },
        {
            header: 'Message Preview',
            accessor: 'preview',
            className: 'w-1/3',
            render: (row) => <div className="truncate max-w-xs md:max-w-md text-gray-600 dark:text-gray-400" title={row.preview}>{row.preview}</div>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <StatusDropdown currentStatus={row.status} />
        },
        {
            header: 'Date',
            accessor: 'date',
            render: (row) => <div className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">{new Date(row.date).toLocaleString()}</div>
        },
    ];

    const handleRefresh = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Unified Inbox</h1>
            </div>

            <Table
                columns={columns}
                data={messages}
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search messages..."
                emptyStateMessage="Your inbox is empty. No replies available yet."
                actions={
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                }
            />
        </div>
    );
}
