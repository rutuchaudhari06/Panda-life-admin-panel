import { useState, useMemo } from 'react';
import { Eye, PlusCircle } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { FormInput, FormSelect, FormTextarea, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { tickets as initialTickets } from '../data/crm';

const PAGE_SIZE = 8;

export default function Tickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [page, setPage] = useState(1);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  // New Ticket Form State
  const [newCustomer, setNewCustomer] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newStatus, setNewStatus] = useState('Open');
  const [newDesc, setNewDesc] = useState('');

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch = 
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.issue.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newCustomer.trim() || !newIssue.trim()) return;

    const newTicket = {
      id: `TKT-${3000 + tickets.length + 1}`,
      customerName: newCustomer,
      issue: newIssue,
      priority: newPriority,
      status: newStatus,
      date: new Date().toISOString().split('T')[0],
      description: newDesc || 'No additional details provided.'
    };

    setTickets([newTicket, ...tickets]);
    setAddOpen(false);

    // Reset fields
    setNewCustomer('');
    setNewIssue('');
    setNewPriority('Medium');
    setNewStatus('Open');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Support Tickets</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and resolve customer support queries</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-500 border border-[#1D3D12] text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit"
        >
          <PlusCircle size={16} /> Create Ticket
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Search tickets by ID, customer or issue..."
          className="w-full sm:max-w-xs"
        />
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto self-stretch sm:self-auto">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-40 px-3.5 py-2.5 bg-white border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-40 px-3.5 py-2.5 bg-white border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Ticket ID</th>
                <th className="px-5 py-3 font-medium">Customer Name</th>
                <th className="px-5 py-3 font-medium">Issue</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((t) => (
                <tr key={t.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3 font-semibold text-charcoal-800">{t.id}</td>
                  <td className="px-5 py-3 font-medium text-charcoal-800">{t.customerName}</td>
                  <td className="px-5 py-3 text-charcoal-600 max-w-xs truncate">{t.issue}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={t.priority} />
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-3 text-gray-500">{t.date}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors"
                    >
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">No tickets found.</td>
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
      <Modal isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} title="Support Ticket Details" size="md">
        {selectedTicket && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-semibold text-lg text-charcoal-900">{selectedTicket.issue}</h3>
                <p className="text-xs text-gray-400">Ticket ID: {selectedTicket.id} · Submitted: {selectedTicket.date}</p>
              </div>
            </div>

            <div className="bg-beige-50 rounded-xl p-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Customer Name</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedTicket.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Submission Date</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedTicket.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Priority</p>
                <StatusBadge status={selectedTicket.priority} />
              </div>
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <StatusBadge status={selectedTicket.status} />
              </div>
            </div>

            <div className="bg-beige-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-450 uppercase mb-1">Issue Description</h4>
              <p className="text-sm text-charcoal-700 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <SecondaryButton onClick={() => setSelectedTicket(null)}>Close</SecondaryButton>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Ticket Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create Support Ticket" size="md">
        <form onSubmit={handleAddTicket} className="space-y-4">
          <FormInput
            label="Customer Name"
            placeholder="e.g. Aarav Sharma"
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            required
          />
          <FormInput
            label="Issue Summary"
            placeholder="e.g. Broken bamboo flask casing"
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Priority"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              options={['High', 'Medium', 'Low']}
            />
            <FormSelect
              label="Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              options={['Open', 'In Progress', 'Resolved']}
            />
          </div>
          <FormTextarea
            label="Full Description"
            placeholder="Describe the customer's problem or query in detail..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <SecondaryButton onClick={() => setAddOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">Create Ticket</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
