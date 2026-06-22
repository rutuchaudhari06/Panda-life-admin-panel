// Panda Life — CRM Module Dummy Data

export const leads = [
  {
    id: 'LEAD-1001',
    name: 'Karan Malhotra',
    email: 'karan.malhotra@gmail.com',
    source: 'Website',
    status: 'New',
    assignedTo: 'Rahul Verma',
    phone: '+91 98765 43210',
    dateAdded: '2026-06-18',
    notes: 'Interested in bulk orders of Bamboo Bottles for a corporate gifting event.'
  },
  {
    id: 'LEAD-1002',
    name: 'Shreya Ghoshal',
    email: 'shreya.ghoshal@hotmail.com',
    source: 'Social Media',
    status: 'Contacted',
    assignedTo: 'Rahul Verma',
    phone: '+91 98123 45678',
    dateAdded: '2026-06-15',
    notes: 'Inquired on Instagram about customization option (name engraving) for Bamboo Mugs.'
  },
  {
    id: 'LEAD-1003',
    name: 'Vikram Seth',
    email: 'vikram.seth@corporate.in',
    source: 'Referral',
    status: 'Converted',
    assignedTo: 'Ananya Sharma',
    phone: '+91 99887 76655',
    dateAdded: '2026-06-10',
    notes: 'Placed first custom bulk order of 200 units of Bamboo Toothbrushes. Account created.'
  },
  {
    id: 'LEAD-1004',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@yahoo.com',
    source: 'Google Search',
    status: 'New',
    assignedTo: 'Rahul Verma',
    phone: '+91 97766 55443',
    dateAdded: '2026-06-19',
    notes: 'Filled contact form on site. Wants a price quote for 50 Bamboo Cutlery Sets.'
  },
  {
    id: 'LEAD-1005',
    name: 'Sneha Patel',
    email: 'sneha.patel@outlook.com',
    source: 'Cold Email',
    status: 'Contacted',
    assignedTo: 'Ananya Sharma',
    phone: '+91 91234 56789',
    dateAdded: '2026-06-14',
    notes: 'Sent pricing list for sustainable straws. Follow-up scheduled for next week.'
  },
  {
    id: 'LEAD-1006',
    name: 'Arjun Rampal',
    email: 'arjun.rampal@rediffmail.com',
    source: 'Social Media',
    status: 'New',
    assignedTo: 'Rahul Verma',
    phone: '+91 95544 33221',
    dateAdded: '2026-06-18',
    notes: 'Inquired about distributor opportunities in North India.'
  },
  {
    id: 'LEAD-1007',
    name: 'Aditi Rao',
    email: 'aditi.rao@gmail.com',
    source: 'Website',
    status: 'Converted',
    assignedTo: 'Rahul Verma',
    phone: '+91 96677 88990',
    dateAdded: '2026-06-08',
    notes: 'Purchased 5 Bamboo Flasks via retail shop. Converted from a subscriber lead.'
  },
  {
    id: 'LEAD-1008',
    name: 'Deepak Chawla',
    email: 'deepak.c@techcorp.com',
    source: 'Google Search',
    status: 'Contacted',
    assignedTo: 'Rahul Verma',
    phone: '+91 98888 77777',
    dateAdded: '2026-06-12',
    notes: 'Shared sample images of custom printed cups. Waiting for logo assets.'
  }
];

export const tickets = [
  {
    id: 'TKT-3001',
    customerName: 'Aarav Sharma',
    issue: 'Received broken bamboo flask',
    priority: 'High',
    status: 'Open',
    date: '2026-06-19',
    description: 'The package arrived damaged, and the outer bamboo casing of the flask has a visible crack. Requesting replacement.'
  },
  {
    id: 'TKT-3002',
    customerName: 'Meera Reddy',
    issue: 'Custom engraving spelling error',
    priority: 'Medium',
    status: 'In Progress',
    date: '2026-06-18',
    description: 'The custom engraving on the bamboo notebook reads "Meeraa" instead of "Meera". Engraving proof confirms correct spelling was submitted.'
  },
  {
    id: 'TKT-3003',
    customerName: 'Kabir Kapoor',
    issue: 'Delay in delivery (ORD-5014)',
    priority: 'Low',
    status: 'Resolved',
    date: '2026-06-15',
    description: 'Order was delayed by the courier partner. Ticket updated with new tracking code, and delivery has now been completed.'
  },
  {
    id: 'TKT-3004',
    customerName: 'Priya Iyer',
    issue: 'Payment failed but amount deducted',
    priority: 'High',
    status: 'In Progress',
    date: '2026-06-19',
    description: 'Attempted to check out with GPay. Received transaction failure screen, but banks statement shows ₹1,450 debited. Verification needed.'
  },
  {
    id: 'TKT-3005',
    customerName: 'Dev Gupta',
    issue: 'Wants to cancel order before dispatch',
    priority: 'Low',
    status: 'Resolved',
    date: '2026-06-17',
    description: 'Customer requested order cancellation. Order status was pending dispatch, so it has been successfully cancelled and refund initiated.'
  },
  {
    id: 'TKT-3006',
    customerName: 'Diya Patel',
    issue: 'Incorrect coupon code application',
    priority: 'Medium',
    status: 'Open',
    date: '2026-06-19',
    description: 'Customer tried applying the coupon "BAMBOO15" which did not discount their eco-cleaning kit. Checking coupon logic.'
  }
];

export const followups = [
  {
    id: 'FLW-5001',
    customerName: 'Tara Joshi',
    lastContactDate: '2026-06-12',
    nextFollowUpDate: '2026-06-22',
    assignedRepresentative: 'Rahul Verma',
    status: 'Pending',
    notes: 'Check if they liked the catalog of customized desk organizers sent last week.'
  },
  {
    id: 'FLW-5002',
    customerName: 'Aman Nair',
    lastContactDate: '2026-06-15',
    nextFollowUpDate: '2026-06-19',
    assignedRepresentative: 'Ananya Sharma',
    status: 'Completed',
    notes: 'Called to confirm the shipping address details for their bulk corporate order.'
  },
  {
    id: 'FLW-5003',
    customerName: 'Nikhil Mehta',
    lastContactDate: '2026-06-10',
    nextFollowUpDate: '2026-06-25',
    assignedRepresentative: 'Rahul Verma',
    status: 'Rescheduled',
    notes: 'Postponed call as client is out of the country. Re-scheduled for late June.'
  },
  {
    id: 'FLW-5004',
    customerName: 'Sara Iyer',
    lastContactDate: '2026-06-18',
    nextFollowUpDate: '2026-06-21',
    assignedRepresentative: 'Rahul Verma',
    status: 'Pending',
    notes: 'Follow up on payment link sent for the sample products (Toothbrushes, Mugs).'
  },
  {
    id: 'FLW-5005',
    customerName: 'Vikram Gupta',
    lastContactDate: '2026-05-28',
    nextFollowUpDate: '2026-06-20',
    assignedRepresentative: 'Ananya Sharma',
    status: 'Pending',
    notes: 'Follow up after 3 weeks to see if they are ready to re-order the monthly bamboo tissue boxes.'
  }
];
