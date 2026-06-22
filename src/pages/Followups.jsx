import { useState, useMemo } from 'react';
import { Eye, CalendarDays } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { FormInput, FormSelect, FormTextarea, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { followups as initialFollowups } from '../data/crm';

const PAGE_SIZE = 8;

export default function Followups() {
  const [followups, setFollowups] = useState(initialFollowups);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const [selectedFollowup, setSelectedFollowup] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  // New Follow-up Form State
  const [newCustomer, setNewCustomer] = useState('');
  const [newLastContact, setNewLastContact] = useState('');
  const [newNextFollowup, setNewNextFollowup] = useState('');
  const [newRep, setNewRep] = useState('Rahul Verma');
  const [newStatus, setNewStatus] = useState('Pending');
  const [newNotes, setNewNotes] = useState('');

  const filtered = useMemo(() => {
    return followups.filter((f) => {
      const matchesSearch = 
        f.customerName.toLowerCase().includes(search.toLowerCase()) ||
        f.assignedRepresentative.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [followups, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddFollowup = (e) => {
    e.preventDefault();
    if (!newCustomer.trim() || !newNextFollowup.trim()) return;

    const newFollow = {
      id: `FLW-${5000 + followups.length + 1}`,
      customerName: newCustomer,
      lastContactDate: newLastContact || 'N/A',
      nextFollowUpDate: newNextFollowup,
      assignedRepresentative: newRep,
      status: newStatus,
      notes: newNotes || 'No notes provided.'
    };

    setFollowups([newFollow, ...followups]);
    setAddOpen(false);

    // Reset fields
    setNewCustomer('');
    setNewLastContact('');
    setNewNextFollowup('');
    setNewRep('Rahul Verma');
    setNewStatus('Pending');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Follow-ups</h1>
          <p className="text-sm text-gray-600 mt-1">Track and schedule client follow-up interactions</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-500 border border-[#1D3D12] text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit"
        >
          <CalendarDays size={16} /> Schedule Follow-up
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Search follow-ups by customer..."
          className="w-full sm:max-w-xs"
        />
        <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-48 px-3.5 py-2.5 bg-white border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Customer Name</th>
                <th className="px-5 py-3 font-medium">Last Contact Date</th>
                <th className="px-5 py-3 font-medium">Next Follow-up Date</th>
                <th className="px-5 py-3 font-medium">Representative</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((f) => (
                <tr key={f.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3 font-medium text-charcoal-800">{f.customerName}</td>
                  <td className="px-5 py-3 text-charcoal-600">{f.lastContactDate}</td>
                  <td className="px-5 py-3 text-charcoal-600 font-semibold">{f.nextFollowUpDate}</td>
                  <td className="px-5 py-3 text-charcoal-600">{f.assignedRepresentative}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setSelectedFollowup(f)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors"
                    >
                      <Eye size={13} /> View Notes
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">No follow-ups found.</td>
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
      <Modal isOpen={!!selectedFollowup} onClose={() => setSelectedFollowup(null)} title="Follow-up Details" size="md">
        {selectedFollowup && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-charcoal-900">{selectedFollowup.customerName}</h3>
              <p className="text-xs text-gray-400">Follow-up Session ID: {selectedFollowup.id}</p>
            </div>

            <div className="bg-beige-50 rounded-xl p-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Last Contact Date</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedFollowup.lastContactDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Next Follow-up Date</p>
                <p className="text-sm font-medium text-[#1D3D12] font-semibold">{selectedFollowup.nextFollowUpDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Assigned Representative</p>
                <p className="text-sm font-medium text-charcoal-850">{selectedFollowup.assignedRepresentative}</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <StatusBadge status={selectedFollowup.status} />
              </div>
            </div>

            <div className="bg-beige-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-450 uppercase mb-1">Follow-up Notes / Goal</h4>
              <p className="text-sm text-charcoal-700 leading-relaxed whitespace-pre-wrap">{selectedFollowup.notes}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <SecondaryButton onClick={() => setSelectedFollowup(null)}>Close</SecondaryButton>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Follow-up Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Schedule Follow-up" size="md">
        <form onSubmit={handleAddFollowup} className="space-y-4">
          <FormInput
            label="Customer Name"
            placeholder="e.g. Tara Joshi"
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Last Contact Date"
              type="date"
              value={newLastContact}
              onChange={(e) => setNewLastContact(e.target.value)}
            />
            <FormInput
              label="Next Follow-up Date"
              type="date"
              value={newNextFollowup}
              onChange={(e) => setNewNextFollowup(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Assigned Representative"
              value={newRep}
              onChange={(e) => setNewRep(e.target.value)}
              options={['Rahul Verma', 'Ananya Sharma', 'Priya Patel', 'Amit Singh']}
            />
            <FormSelect
              label="Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              options={['Pending', 'Completed', 'Rescheduled']}
            />
          </div>
          <FormTextarea
            label="Follow-up Notes / Agenda"
            placeholder="What needs to be discussed? Call objectives..."
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <SecondaryButton onClick={() => setAddOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">Schedule</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
