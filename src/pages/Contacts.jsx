import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { contactSchema } from '../validations/contactSchema';
import {
    Plus, Search, Filter, Download,
    Upload, MoreHorizontal, Edit,
    Trash2, UserPlus, Globe, Tag,
    Calendar, Mail, Phone as PhoneIcon,
    ChevronLeft, ChevronRight, X,
    LayoutGrid, List as ListIcon
} from 'lucide-react';

const MOCK_CONTACTS = [
    { id: 1, name: 'Alex Rivera', email: 'alex@orbit.com', phone: '+1234567890', country: 'USA', tags: 'VIP, Tech', createdAt: '2026-03-01' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@galaxy.io', phone: '+8612345678', country: 'China', tags: 'Enterprise', createdAt: '2026-03-02' },
    { id: 3, name: 'Marcus Vogt', email: 'marcus@nebula.de', phone: '+491234567', country: 'Germany', tags: 'Lead', createdAt: '2026-03-03' },
    { id: 4, name: 'Elena Rossi', email: 'elena@stellar.it', phone: '+3912345678', country: 'Italy', tags: 'Partner', createdAt: '2026-03-04' },
    { id: 5, name: 'Kenji Sato', email: 'kenji@pulsar.jp', phone: '+8112345678', country: 'Japan', tags: 'VIP', createdAt: '2026-03-05' },
];

export default function Contacts() {
    const [contacts, setContacts] = useState(MOCK_CONTACTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { register, handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(contactSchema),
        mode: 'onChange'
    });

    const filteredContacts = useMemo(() => {
        return contacts.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.tags.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [contacts, searchTerm]);

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSave = (data) => {
        if (editingContact) {
            setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, ...data } : c));
        } else {
            setContacts([...contacts, { ...data, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Erase this entity from Orbit?')) {
            setContacts(contacts.filter(c => c.id !== id));
        }
    };

    const openModal = (contact = null) => {
        setEditingContact(contact);
        if (contact) reset(contact);
        else reset({ name: '', email: '', phone: '', country: '', tags: '', organization: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
        reset();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Fleet Management</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Sector 7G / {contacts.length} Entities Online</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <Upload size={14} />
                        Import CSV
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <Download size={14} />
                        Export
                    </button>
                    <button
                        onClick={() => openModal()}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <UserPlus size={14} />
                        Sync New Entity
                    </button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="glass-card rounded-[32px] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Terminal ID, Entity or Tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100/50 dark:border-slate-800/50 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                    <div className="flex justify-center p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-slate-100/50 dark:border-slate-700/50">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex-1 sm:flex-none flex justify-center p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                            <ListIcon size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex-1 sm:flex-none flex justify-center p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    <button className="flex justify-center items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 sm:bg-transparent dark:sm:bg-transparent border border-slate-100 dark:border-slate-800 sm:border-transparent dark:sm:border-transparent rounded-xl text-[11px] font-black text-slate-500 dark:text-slate-400 sm:text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Filter size={16} />
                        Advanced Ops
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'list' ? (
                <div className="glass-card rounded-[32px] overflow-hidden border border-white/40 dark:border-slate-800">
                    <div className="overflow-x-auto border-x-0 border-transparent">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Entity Signature</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Terminal Comms</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Sector</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Orbital Clusters</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Ops</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                {paginatedContacts.map((contact) => (
                                    <tr key={contact.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orbit flex items-center justify-center text-white font-black text-sm shadow-md">
                                                    {contact.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{contact.name}</p>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <Calendar size={10} className="text-slate-300 dark:text-slate-600" />
                                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Linked: {contact.createdAt}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                    <Mail size={12} className="text-primary-400" />
                                                    <span className="text-[12px] font-bold">{contact.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-400">
                                                    <PhoneIcon size={12} className="text-slate-300 dark:text-slate-600" />
                                                    <span className="text-[11px] font-medium">{contact.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-full text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest border border-slate-200/50 dark:border-slate-700/50">
                                                <Globe size={12} className="text-primary-500" />
                                                {contact.country.label || contact.country}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-wrap gap-1.5">
                                                {Array.isArray(contact.tags) ? contact.tags.map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-tighter rounded-md border border-primary-100 dark:border-primary-800/30">
                                                        #{tag.trim()}
                                                    </span>
                                                )) : contact.tags.split(',').map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-tighter rounded-md border border-primary-100 dark:border-primary-800/30">
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openModal(contact)} className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/40 rounded-lg transition-all">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(contact.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedContacts.map((contact) => (
                        <div key={contact.id} className="glass-card rounded-[32px] p-6 group hover:border-primary-200/50 dark:hover:border-primary-500/30 transition-all border border-transparent">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-orbit flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/10">
                                    {contact.name.charAt(0)}
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openModal(contact)} className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 rounded-xl transition-all">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(contact.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 rounded-xl transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1">{contact.name}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    <Globe size={12} className="text-primary-500" />
                                    {contact.country.label || contact.country}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                    <Mail size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-primary-400 transition-colors" />
                                    <span className="text-[13px] font-bold truncate">{contact.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-400">
                                    <PhoneIcon size={14} className="text-slate-300 dark:text-slate-600" />
                                    <span className="text-[12px] font-medium">{contact.phone}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {Array.isArray(contact.tags) ? contact.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-tighter rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {tag.trim()}
                                    </span>
                                )) : contact.tags.split(',').map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-tighter rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4">
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Sector <span className="text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredContacts.length)}</span> of {filteredContacts.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-2xl text-[11px] font-black transition-all ${currentPage === i + 1 ? 'bg-orbit text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Entity Sync Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-[40px] shadow-2xl shadow-slate-950/20 dark:border dark:border-slate-800 overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center justify-between p-8 border-b border-slate-50 dark:border-slate-900">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    {editingContact ? 'Edit Protocol' : 'Initialize Sync'}
                                </h3>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-1">Configure entity parameters</p>
                            </div>
                            <button onClick={closeModal} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-colors text-slate-400 dark:text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(handleSave)} className="p-6 lg:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Entity Name</label>
                                    <input
                                        {...register('name')}
                                        placeholder="Full Name"
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all"
                                    />
                                    {errors.name && <p className="text-[9px] font-bold text-red-500 uppercase ml-1">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="id@orbit.com"
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all"
                                    />
                                    {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase ml-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Comms Protocol (Phone)</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="orbit-phone-input">
                                                <PhoneInput
                                                    {...field}
                                                    international
                                                    defaultCountry="IN"
                                                    placeholder="Phone Number"
                                                    className="w-full px-5 py-1 bg-slate-50 border border-transparent focus-within:border-primary-500 focus-within:bg-white dark:bg-slate-900/50 dark:focus-within:bg-slate-900 text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-2xl transition-all"
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors.phone && <p className="text-[9px] font-bold text-red-500 uppercase ml-1">{errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Universal Sector (Country)</label>
                                    <input
                                        {...register('country')}
                                        placeholder="USA, India, etc"
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all"
                                    />
                                    {errors.country && <p className="text-[9px] font-bold text-red-500 uppercase ml-1">{errors.country.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Orbital Clusters (Tags)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors">
                                        <Tag size={18} />
                                    </div>
                                    <input
                                        {...register('tags')}
                                        placeholder="VIP, Lead, Tech (comma separated)"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all"
                                    />
                                </div>
                                {errors.tags && <p className="text-[9px] font-bold text-red-500 uppercase ml-1">{errors.tags.message}</p>}
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-outfit"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="flex-[2] py-4 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all disabled:opacity-50 font-outfit"
                                >
                                    {editingContact ? 'Commit Changes' : 'Initialize Entity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
