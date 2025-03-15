'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';

const pricingPlans = {
  graphics: [
    {
      name: 'Basic',
      price: '15,000',
      description: 'Essential graphics design services for small businesses',
      features: [
        'Logo Design',
        'Business Card Design',
        'Social Media Templates (3)',
        'Basic Brand Guidelines',
        '2 Revisions',
        '5 Days Delivery'
      ]
    },
    {
      name: 'Professional',
      price: '35,000',
      description: 'Comprehensive design package for growing businesses',
      features: [
        'Everything in Basic',
        'Full Brand Identity',
        'Social Media Templates (10)',
        'Marketing Materials',
        'Unlimited Revisions',
        '10 Days Delivery',
        'Source Files'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete design solutions for established businesses',
      features: [
        'Everything in Professional',
        'Custom Illustrations',
        'Print Materials',
        'Packaging Design',
        'Brand Strategy',
        'Priority Support',
        'Dedicated Designer'
      ]
    }
  ],
  web: [
    {
      name: 'Starter',
      price: '45,000',
      description: 'Perfect for small business websites',
      features: [
        '5 Pages Website',
        'Responsive Design',
        'Basic SEO Setup',
        'Contact Form',
        'Social Media Integration',
        '2 Weeks Delivery'
      ]
    },
    {
      name: 'Business',
      price: '95,000',
      description: 'Advanced website with custom functionality',
      features: [
        '10 Pages Website',
        'E-commerce Integration',
        'Advanced SEO',
        'Custom Features',
        'Analytics Setup',
        '4 Weeks Delivery',
        'Training Session'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale web solutions for large businesses',
      features: [
        'Custom Web Application',
        'Advanced E-commerce',
        'API Integration',
        'Custom Backend',
        'Performance Optimization',
        'Priority Support',
        'Maintenance Plan'
      ]
    }
  ],
  social: [
    {
      name: 'Basic',
      price: '25,000',
      description: 'Essential social media management',
      features: [
        '2 Platforms',
        '12 Posts Monthly',
        'Basic Content Strategy',
        'Community Management',
        'Monthly Reports',
        'Basic Analytics'
      ]
    },
    {
      name: 'Growth',
      price: '45,000',
      description: 'Comprehensive social media presence',
      features: [
        '4 Platforms',
        '20 Posts Monthly',
        'Content Calendar',
        'Engagement Strategy',
        'Paid Ads Management',
        'Advanced Analytics',
        'Weekly Reports'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '85,000',
      description: 'Advanced social media marketing',
      features: [
        'All Platforms',
        '30 Posts Monthly',
        'Custom Strategy',
        'Influencer Marketing',
        'Campaign Management',
        'ROI Tracking',
        '24/7 Support'
      ]
    }
  ]
};

// Type definitions
type ServiceType = 'All' | 'Design' | 'Print' | 'Design & Print';

const priceList = [
  { no: '01', description: 'Company Profile', price: '5000', type: 'Design' },
  { no: '02', description: 'Logo design', price: '1500', type: 'Design' },
  { no: '03', description: 'Business card design', price: '500', type: 'Design' },
  { no: '04', description: '100 Pcs Bs Card Print', price: '1000', type: 'Print' },
  { no: '05', description: 'Letterhead design', price: '500', type: 'Design' },
  { no: '06', description: 'Receipt design', price: '500', type: 'Design' },
  { no: '07', description: 'Invoice design', price: '500', type: 'Design' },
  { no: '08', description: 'Quotation design', price: '500', type: 'Design' },
  { no: '09', description: 'Single Flier design', price: '500', type: 'Design' },
  { no: '10', description: '10 Fliers design package', price: '3000', type: 'Design' },
  { no: '11', description: 'Rollup Banner (Design & Print)', price: '8000', type: 'Design & Print' },
  { no: '12', description: 'Brochure design', price: '1000', type: 'Design' },
  { no: '13', description: 'Banner/Sticker design', price: '500', type: 'Design' },
  { no: '14', description: 'Banner/Sticker print (per m²)', price: '600', type: 'Print' },
  { no: '15', description: 'Packaging design', price: '3000', type: 'Design' },
  { no: '16', description: 'Poster design', price: '1000', type: 'Design' },
  { no: '17', description: 'Certificate design', price: '1000', type: 'Design' },
];

export default function Pricing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ServiceType>('All');
  
  // Enhanced filtering logic
  const filteredPriceList = priceList.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique types for filter buttons
  const serviceTypes: ServiceType[] = ['All', 'Design', 'Print', 'Design & Print'];

  const PriceCard = ({ item }: { item: typeof priceList[0] }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{item.description}</h3>
          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
            item.type === 'Design' 
              ? 'bg-blue-100 text-blue-800' 
              : item.type === 'Print'
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {item.type}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-semibold">{item.price}</span>
          <span className="text-gray-600 text-sm ml-1">Ksh</span>
        </div>
      </div>
      <div className="text-xs text-gray-500">Service ID: {item.no}</div>
    </div>
  );

  return (
    <>
      
      <main className="pt-24">
        <PageHero 
          title="Price List"
          description="Comprehensive pricing for our design and printing services"
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search and Filter Controls */}
              <div className="mb-8 space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-700"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>

                {/* Type Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                        ${selectedType === type
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredPriceList.length} {filteredPriceList.length === 1 ? 'service' : 'services'}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="py-4 px-6 text-left">NO</th>
                        <th className="py-4 px-6 text-left">DESCRIPTION</th>
                        <th className="py-4 px-6 text-left">TYPE</th>
                        <th className="py-4 px-6 text-right">PRICE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPriceList.map((item) => (
                        <tr key={item.no} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-gray-600">{item.no}</td>
                          <td className="py-4 px-6 font-medium text-gray-900">{item.description}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'Design' 
                                ? 'bg-blue-100 text-blue-800' 
                                : item.type === 'Print'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-medium">
                            {item.price}<span className="text-gray-600 text-sm ml-1">Ksh</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredPriceList.length === 0 && (
                  <div className="text-center py-12">
                    <i className="fas fa-search text-gray-400 text-3xl mb-4"></i>
                    <p className="text-gray-500">No services found matching your search.</p>
                  </div>
                )}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden grid gap-4">
                {filteredPriceList.map((item) => (
                  <PriceCard key={item.no} item={item} />
                ))}
                
                {filteredPriceList.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <i className="fas fa-search text-gray-400 text-3xl mb-4"></i>
                    <p className="text-gray-500">No services found matching your search.</p>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-info-circle text-primary mt-1"></i>
                  <div className="text-gray-600 text-sm">
                    <p className="font-medium mb-1">Important Notes:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Prices are subject to change based on project requirements</li>
                      <li>Custom projects may require a personalized quote</li>
                      <li>All prices are in Kenyan Shillings (KSH)</li>
                      <li>Contact us for bulk orders or special requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 