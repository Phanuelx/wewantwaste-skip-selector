import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle, AlertTriangle, Calendar, Shield, Star } from 'lucide-react';

const SkipSelector = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Getting skip data from the API when component loads
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) throw new Error('Couldnt fetch the skip data');
        const data = await response.json();
        setSkips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  // Work out final price with VAT added
  const calculateFinalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  // Just some descriptions I wrote for different skip sizes
  const getCapacityDescription = (size) => {
    const descriptions = {
      4: "Perfect for small bathroom or kitchen renovations",
      6: "Ideal for single room clearouts and small gardens",
      8: "Great for multiple rooms or moderate garden work",
      10: "Suitable for house clearouts and larger projects",
      12: "Perfect for major renovations and construction",
      14: "Ideal for large construction and demolition work",
      16: "Excellent for commercial and major residential projects",
      20: "Heavy-duty commercial and industrial waste",
      40: "Maximum capacity for large-scale operations"
    };
    return descriptions[size] || "Professional waste management solution";
  };

  // These are the sizes people usually go for
  const isPopular = (size) => {
    return [6, 8, 10].includes(size);
  };

  const handleSkipSelection = (skip) => {
    setSelectedSkip(skip);
    // TODO: navigate to next step in real app
    console.log('Selected skip:', skip);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WeWantWaste</h1>
                <p className="text-sm text-gray-500">Professional Waste Management</p>
              </div>
            </div>
            {/* Progress dots - only show on bigger screens */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <span>Postcode</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <span>Waste Type</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-blue-600">Select Skip</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                <span>Permit Check</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                <span>Choose Date</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                <span>Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Skip Size
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that best matches your project needs. All prices include VAT and 14-day hire period.
          </p>
        </div>

        {/* Skip cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips.map((skip) => {
            const finalPrice = calculateFinalPrice(skip.price_before_vat, skip.vat);
            const isSelected = selectedSkip?.id === skip.id;
            
            return (
              <div
                key={skip.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 ${
                  isSelected ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-100 hover:border-blue-200'
                }`}
                onClick={() => handleSkipSelection(skip)}
              >
                {/* Popular badge for common sizes */}
                {isPopular(skip.size) && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Warning badge for skips that need permits */}
                {!skip.allowed_on_road && (
                  <div className="absolute -top-3 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Permit Required</span>
                  </div>
                )}

                <div className="p-6">
                  {/* Skip size display */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-3">
                      <span className="text-2xl font-bold text-white">{skip.size}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{skip.size} Yard Skip</h3>
                  </div>

                  {/* Description text */}
                  <p className="text-gray-600 text-center mb-4 min-h-[3rem]">
                    {getCapacityDescription(skip.size)}
                  </p>

                  {/* Feature list */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{skip.hire_period_days} day hire period</span>
                    </div>
                    {skip.allows_heavy_waste && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Heavy waste allowed</span>
                      </div>
                    )}
                    {skip.allowed_on_road ? (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Road placement allowed</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>Private land only</span>
                      </div>
                    )}
                  </div>

                  {/* Price section */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">£{finalPrice}</div>
                    <div className="text-sm text-gray-500">inc. VAT</div>
                    {skip.price_before_vat !== finalPrice && (
                      <div className="text-xs text-gray-400">
                        (£{skip.price_before_vat} + {skip.vat}% VAT)
                      </div>
                    )}
                  </div>

                  {/* Selection button */}
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {isSelected ? (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Selected</span>
                      </div>
                    ) : (
                      'Select This Skip'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue button shows when user selects a skip */}
        {selectedSkip && (
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Continue to Permit Check →
            </button>
          </div>
        )}

        {/* Bottom info section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose WeWantWaste?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reliable Service</h4>
              <p className="text-gray-600 text-sm">On-time delivery and collection with professional service every time.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fully Licensed</h4>
              <p className="text-gray-600 text-sm">All permits and licenses handled. Environmentally responsible disposal.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-4">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Value</h4>
              <p className="text-gray-600 text-sm">Competitive prices with no hidden fees. What you see is what you pay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSelector;