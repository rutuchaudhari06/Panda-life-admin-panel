import { useState, useMemo } from 'react';
import { Eye, UserPlus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { FormInput, FormSelect, FormTextarea, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { leads as initialLeads } from '../data/crm';

const PAGE_SIZE = 8;

export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  
  const [selectedLead, setSelectedLead] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  // New Lead Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSource, setNewSource] = useState('Website');
  const [newStatus, setNewStatus] = useState('New');
  const [newAssigned, setNewAssigned] = useState('Rahul Verma');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch = 
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newLead = {
      id: `LEAD-${1000 + leads.length + 1}`,
      name: newName,
      email: newEmail,
      source: newSource,
      status: newStatus,
      assignedTo: newAssigned,
      phone: newPhone || '+91 99999 99999',
      dateAdded: new Date().toISOString().split('T')[0],
      notes: newNotes || 'No notes provided.'
    };

    setLeads([newLead, ...leads]);
    setAddOpen(false);

    // Reset fields
    setNewName('');
    setNewEmail('');
    setNewSource('Website');
    setNewStatus('New');
    setNewAssigned('Rahul Verma');
    setNewPhone('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Leads</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage potential customer leads</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-500 border border-[#1D3D12] text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit"
        >
          <UserPlus size={16} /> Add Lead
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Search leads by name or email..."
          className="w-full sm:max-w-xs"
        />
        <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Lead Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Assigned To</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((l) => (
                <tr key={l.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <span className="font-medium text-charcoal-800">{l.name}</span>
                  </td>
                  <td className="px-5 py-3 text-charcoal-600">{l.email}</td>
                  <td className="px-5 py-3 text-charcoal-600">{l.source}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-5 py-3 text-charcoal-600">{l.assignedTo}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setSelectedLead(l)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors"
                    >
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Lead Details" size="md">
        {selectedLead && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-charcoal-900">{selectedLead.name}</h3>
              <p className="text-xs text-gray-400">Lead ID: {selectedLead.id} · Added: {selectedLead.dateAdded}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm font-medium text-charcoal-850 break-all">{selectedLead.email}</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedLead.phone}</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Source</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedLead.source}</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Assigned Representative</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedLead.assignedTo}</p>
              </div>
            </div>

            <div className="bg-beige-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <StatusBadge status={selectedLead.status} />
            </div>

            <div className="bg-beige-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-405 uppercase mb-1">Internal Notes</h4>
              <p className="text-sm text-charcoal-700 leading-relaxed whitespace-pre-wrap">{selectedLead.notes}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <SecondaryButton onClick={() => setSelectedLead(null)}>Close</SecondaryButton>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create New Lead" size="md">
        <form onSubmit={handleAddLead} className="space-y-4">
          <FormInput
            label="Lead Name"
            placeholder="e.g. Karan Malhotra"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <FormInput
            label="Email Address"
            type="email"
            placeholder="e.g. name@example.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <FormInput
            label="Phone Number"
            placeholder="e.g. +91 98765 43210"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Source"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              options={['Website', 'Referral', 'Social Media', 'Cold Email', 'Google Search']}
            />
            <FormSelect
              label="Assigned To"
              value={newAssigned}
              onChange={(e) => setNewAssigned(e.target.value)}
              options={['Rahul Verma', 'Ananya Sharma', 'Priya Patel', 'Amit Singh']}
            />
          </div>
          <FormSelect
            label="Initial Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={['New', 'Contacted', 'Converted']}
          />
          <FormTextarea
            label="Lead Notes"
            placeholder="Enter any initial details, interest, or requirements..."
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <SecondaryButton onClick={() => setAddOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">Create Lead</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
