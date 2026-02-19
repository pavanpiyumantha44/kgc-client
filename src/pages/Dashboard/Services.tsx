import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown,X, Package, FileText, ExternalLink} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ServiceDTO } from '../../services/service';

type SortField = keyof ServiceDTO | null;
type SortDirection = 'asc' | 'desc' | null;

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const itemsPerPage = 8;

  const [services, setServices] = useState<ServiceDTO[]>([
    {
      id: 'srv_001',
      name: 'Tennis Court Rental',
      description: 'Premium tennis court facilities with professional lighting and maintained surfaces',
      orgId: 'org_001',
      createdAt: '2025-01-15T10:30:00Z',
      modifiedAt: '2025-01-20T14:45:00Z',
      serviceDetailsCount: 3
    },
    {
      id: 'srv_002',
      name: 'Table Tennis Sessions',
      description: 'Indoor table tennis with quality equipment and air-conditioned environment',
      orgId: 'org_001',
      createdAt: '2025-01-16T09:00:00Z',
      modifiedAt: '2025-01-22T11:20:00Z',
      serviceDetailsCount: 2
    },
    {
      id: 'srv_003',
      name: 'Snooker Table Booking',
      description: 'Professional snooker tables with premium cloth and lighting',
      orgId: 'org_001',
      createdAt: '2025-01-18T13:15:00Z',
      modifiedAt: '2025-01-25T16:30:00Z',
      serviceDetailsCount: 4
    },
    {
      id: 'srv_004',
      name: 'Coaching Sessions',
      description: 'Professional coaching for tennis, table tennis, and snooker',
      orgId: 'org_001',
      createdAt: '2025-01-20T08:45:00Z',
      modifiedAt: '2025-01-28T10:15:00Z',
      serviceDetailsCount: 5
    },
    {
      id: 'srv_005',
      name: 'Equipment Rental',
      description: 'Rackets, balls, and other sports equipment available for rent',
      orgId: 'org_001',
      createdAt: '2025-01-22T11:30:00Z',
      modifiedAt: '2025-01-29T13:00:00Z',
      serviceDetailsCount: 8
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert('Please enter service name');
      return;
    }

    const newService: ServiceDTO = {
      id: `srv_${String(services.length + 1).padStart(3, '0')}`,
      name: formData.name,
      description: formData.description || null,
      orgId: 'org_001',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      serviceDetailsCount: 0
    };

    setServices([...services, newService]);
    setShowAddModal(false);
    setFormData({ name: '', description: '' });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedServices = useMemo(() => {
    if (!sortField || !sortDirection) return services;

    return [...services].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [services, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = sortedServices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Add Service Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">All Services</h2>
              <p className="text-sm text-gray-600">Total: {services.length} services</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Service</span>
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Service Name</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Details Count
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Created</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentServices.map((service) => (
                    <tr 
                      key={service.id} 
                      onClick={() => handleRowClick(service.id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                            <Package className="text-emerald-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                          {service.description || 'No description'}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {service.serviceDetailsCount || 0} details
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{formatDate(service.createdAt)}</p>
                        <p className="text-xs text-gray-500">Modified: {formatDate(service.modifiedAt)}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(service.id);
                            }}
                            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <ExternalLink size={16} className="text-emerald-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {currentServices.map((service) => (
                <div 
                  key={service.id} 
                  onClick={() => handleRowClick(service.id)}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="text-emerald-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.id}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {service.serviceDetailsCount || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {service.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {formatDate(service.createdAt)}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-1.5 hover:bg-blue-50 rounded"
                      >
                        <Edit size={14} className="text-blue-600" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                        className="p-1.5 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, sortedServices.length)} of {sortedServices.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
    </main>
      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Add New Service</h3>
                  <p className="text-gray-600 mt-1">Create a new service for your organization</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="text-gray-600" size={28} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Package className="inline mr-2" size={16} />
                    Service Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="e.g., Tennis Court Rental"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="inline mr-2" size={16} />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe your service in detail..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Create Service</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesPage;