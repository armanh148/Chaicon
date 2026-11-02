import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cityList = [
    { id: 'all', name: 'All Pakistan (All Cities)', count: 36, isAll: true },
    { id: 'Lahore', name: 'Lahore', count: 10 },
    { id: 'Sialkot', name: 'Sialkot', count: 8 },
    { id: 'Karachi', name: 'Karachi', count: 6 },
    { id: 'Gujranwala', name: 'Gujranwala', count: 3 },
    { id: 'Islamabad', name: 'Islamabad', count: 3 },
    { id: 'Peshawar', name: 'Peshawar', count: 1 },
    { id: 'Gujrat', name: 'Gujrat', count: 1 },
    { id: 'Shikarpur', name: 'Shikarpur', count: 1 },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Request for Wholesale Quotation');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const sectorCategories = [
    { id: 'all', label: 'All Sectors', icon: 'fa-th-large', keywords: [] },
    { id: 'machinery', label: 'Industrial Machinery', icon: 'fa-cogs', keywords: ['laser', 'machine', 'printer', 'chiller', 'incubator', 'generator', 'burner', 'juicer', 'compressor', 'equipment', 'tester', 'sandblasting'] },
    { id: 'textiles', label: 'Textiles & Garments', icon: 'fa-shirt', keywords: ['cotton', 'kurta', 'track suits', 'caps', 'hoodi', 'sweater', 'jackets', 'wallet', 'shirt', 'textile', 'leather', 'quilted', 'fabric'] },
    { id: 'food', label: 'Food & Organic', icon: 'fa-bowl-food', keywords: ['pickle', 'honey', 'syrup', 'oil', 'salt', 'foods', 'tea'] },
    { id: 'solar', label: 'Solar & Electrical', icon: 'fa-sun', keywords: ['solar', 'battery', 'energiko', 'lithium', 'bell', 'inverter'] },
    { id: 'tools', label: 'Hardware & Tools', icon: 'fa-screwdriver-wrench', keywords: ['spanner', 'tools', 'torch', 'holder', 'rack', 'stainless', 'serrated', 'point'] },
    { id: 'sports', label: 'Sports & Safety', icon: 'fa-shield-halved', keywords: ['guard', 'sleeve', 'safety', 'head guard', 'rash guard', 'training', 'running'] },
    { id: 'printing', label: 'Packaging & Labels', icon: 'fa-print', keywords: ['dtf', 'sticker', 'label', 'printing', 'waste disposal', 'box'] },
  ];

  const filteredProducts = products.filter(p => {
    const pCity = (p.city || '').toLowerCase();
    const pText = ((p.alt || '') + ' ' + (p.seller || '')).toLowerCase();

    // 1. City Filter
    const matchesCity = (selectedCity === 'all') || pCity.includes(selectedCity.toLowerCase());

    // 2. Sector / Category Filter
    let matchesCategory = true;
    if (activeCategory !== 'all') {
      const activeSec = sectorCategories.find(s => s.id === activeCategory);
      if (activeSec && activeSec.keywords.length > 0) {
        matchesCategory = activeSec.keywords.some(k => pText.includes(k));
      }
    }

    // 3. Search Query Filter
    const matchesSearch = !searchQuery || pText.includes(searchQuery.toLowerCase());

    return matchesCity && matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
  };

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Shukriya ${formData.name || ''}! Aap ki inquiry verified seller tak phonch gayi hai.`);
    setModalOpen(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="chaicon-app">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-left">
              <span className="top-live-badge"><span className="pulse-dot"></span> LIVE WHOLESALE MANDI</span>
              <span className="top-tagline">🇵🇰 Pakistan's No. 1 B2B Sourcing Platform for Industrial Machinery & Direct Factory Trade</span>
            </div>
            <div className="top-right">
              <a href="tel:+923343331111" className="top-link"><i className="fa fa-phone"></i> +92-334-333-1111</a>
              <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer" className="top-link whatsapp-top">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Helpdesk
              </a>
              <span className="currency-pill"><i className="fa-solid fa-money-bill-transfer"></i> PKR / USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY HEADER */}
      <header className="site-header">
        <div className="container">
          <div className="header-main">
            {/* Logo */}
            <a href="/" className="brand-group">
              <div className="brand-icon-box">
                <i className="fa-solid fa-boxes-packing"></i>
              </div>
              <div className="brand-meta">
                <div className="brand-logo-text brand-font">
                  Chaicon.com<sup>BETA</sup>
                </div>
                <div className="brand-tagline">
                  Pakistan's Online Wholesale Mandi
                </div>
              </div>
            </a>

            {/* Smart Search Bar */}
            <div className="header-search">
              <div className="search-pill-box">
                <div className="search-select-wrapper">
                  <select className="search-category-select" defaultValue="all">
                    <option value="all">All Sectors</option>
                    <option value="machinery">Machinery</option>
                    <option value="suppliers">Suppliers</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search industrial lasers, chillers, textile, packaging & tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" className="search-clear-btn" onClick={() => setSearchQuery('')}>
                    <i className="fa fa-times"></i>
                  </button>
                )}
                <button type="button" className="search-action-btn">
                  <i className="fa fa-search"></i>
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="header-actions">
              <button 
                type="button" 
                onClick={() => handleOpenModal('Register as Verified Supplier')} 
                className="btn-seller-link"
              >
                <i className="fa fa-store"></i>
                <span>Sell on Chaicon</span>
              </button>
              <button 
                type="button" 
                onClick={() => handleOpenModal('Post Direct RFQ / Bulk Requirement')} 
                className="btn-rfq-quote"
              >
                <i className="fa fa-bolt-lightning"></i>
                <span>Get Instant Quotes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subnav Categories Strip */}
        <div className="subnav-sectors">
          <div className="container">
            <div className="sectors-list">
              {sectorCategories.map(cat => {
                // Calculate count for each category
                const catCount = cat.id === 'all'
                  ? products.length
                  : products.filter(p => {
                      const pText = ((p.alt || '') + ' ' + (p.seller || '')).toLowerCase();
                      return cat.keywords.some(k => pText.includes(k));
                    }).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`sector-pill ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <i className={`fa ${cat.icon}`}></i> 
                    <span>{cat.label}</span>
                    <span className="cat-pill-count">{catCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-showcase">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-text-block">
              <div className="hero-pill-badge">
                <i className="fa-solid fa-award"></i> Pakistan's Verified B2B Trade Gateway
              </div>
              <h1 className="hero-title brand-font">
                Source Direct from <span className="highlight-magenta">Pakistan's Top Factories</span>
              </h1>
              <p className="hero-desc">
                Connect directly with certified industrial machinery manufacturers, bulk suppliers, and dairy equipment producers in Lahore, Karachi, Faisalabad, Gujranwala, and Peshawar. Get wholesale factory rates with verified buyer protection.
              </p>
              
              <div className="hero-btn-row">
                <a href="#browse-catalog" className="btn-rfq-quote hero-main-cta">
                  <i className="fa-solid fa-cart-flatbed-suitcase"></i> Explore 36+ Verified Products
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenModal('Post Direct Buying Requirement')}
                  className="btn-seller-link hero-secondary-cta"
                >
                  <i className="fa fa-file-invoice"></i> Post Direct RFQ Requirement
                </button>
              </div>

              <div className="hero-stats-row">
                <div className="stat-box">
                  <h3 className="brand-font">5,400<span>+</span></h3>
                  <p>Registered Manufacturers</p>
                </div>
                <div className="stat-box">
                  <h3 className="brand-font">42,000<span>+</span></h3>
                  <p>Industrial Listings</p>
                </div>
                <div className="stat-box">
                  <h3 className="brand-font">100<span>%</span></h3>
                  <p>Verified Factory Deals</p>
                </div>
              </div>
            </div>

            {/* 2x2 Feature Highlights */}
            <div className="hero-cards-grid">
              <div className="value-box">
                <div className="value-box-top-border border-orange"></div>
                <div className="value-icon icon-bg-orange">
                  <i className="fa-solid fa-industry"></i>
                </div>
                <h4>Industrial Machinery</h4>
                <p>Laser coding, production lines, milk chillers, and turnkey manufacturing plants.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-magenta"></div>
                <div className="value-icon icon-bg-magenta">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h4>Verified Suppliers</h4>
                <p>Vetted factories with valid NTN, physical unit inspections, and manufacturer badges.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-green"></div>
                <div className="value-icon icon-bg-green">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <h4>Instant WhatsApp Quotes</h4>
                <p>Direct chat links with seller sales desks for live quotes, specs, and video tours.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-navy"></div>
                <div className="value-icon icon-bg-navy">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <h4>Nationwide Freight</h4>
                <p>Safe cargo logistics across Punjab, Sindh, KPK, Balochistan & export terminals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG SECTION */}
      <main className="product-showcase-section" id="browse-catalog">
        <div className="container">
          
          {/* Interactive City Filter Bar */}
          <div className="filter-ctrl-bar">
            <div className="filter-ctrl-inner">
              <div className="city-filter-dropdown-group">
                <span className="filter-label">
                  <i className="fa-solid fa-location-crosshairs" style={{ color: 'var(--brand-orange)' }}></i> 
                  Filter By City:
                </span>
                
                {/* Custom Elegant Dropdown */}
                <div className="custom-city-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`custom-city-select-trigger ${cityDropdownOpen ? 'active' : ''}`}
                    onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                    aria-expanded={cityDropdownOpen}
                  >
                    <span className="current-selected-label">
                      <span className="city-marker-icon">
                        {selectedCity === 'all' ? '📍' : <i className="fa-solid fa-location-dot"></i>}
                      </span>
                      <span className="city-name-text">
                        {cityList.find(c => c.id === selectedCity)?.name || 'All Pakistan'}
                      </span>
                    </span>
                    <i className={`fa-solid fa-chevron-down dropdown-caret-icon ${cityDropdownOpen ? 'open' : ''}`}></i>
                  </button>

                  {cityDropdownOpen && (
                    <div className="custom-city-options-popover">
                      {cityList.map(city => (
                        <div
                          key={city.id}
                          className={`custom-city-option-item ${selectedCity === city.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedCity(city.id);
                            setCityDropdownOpen(false);
                          }}
                        >
                          <div className="option-name-part">
                            <span className="option-loc-icon">
                              {city.isAll ? '📍' : <i className="fa-solid fa-location-dot"></i>}
                            </span>
                            <span className="option-text">{city.name}</span>
                          </div>
                          <span className="option-count-badge">
                            {city.count} {city.count === 1 ? 'Product' : 'Products'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedCity !== 'all' && (
                  <button 
                    type="button" 
                    className="reset-city-btn" 
                    onClick={() => {
                      setSelectedCity('all');
                      setCityDropdownOpen(false);
                    }}
                  >
                    <i className="fa-solid fa-rotate-left"></i> Reset City
                  </button>
                )}
              </div>

              <div className="filter-meta-count">
                Showing <strong>{filteredProducts.length}</strong> Verified Factory Listings
              </div>
            </div>
          </div>

          {/* Section Heading Banner */}
          <div className="section-banner-heading">
            <div className="section-banner-left">
              <span className="banner-star-badge"><i className="fa fa-star"></i></span>
              <h3>Featured Factory Inventory & Machinery</h3>
            </div>
            <span className="section-banner-badge">Real-Time Wholesale Rates</span>
          </div>

          {/* Dynamic Product Cards Grid */}
          <div className="product-grid-layout">
            {filteredProducts.length === 0 ? (
              <div className="empty-state-box">
                <i className="fa fa-search" style={{ fontSize: '42px', color: 'var(--text-light)', marginBottom: '14px' }}></i>
                <h4 style={{ color: 'var(--brand-navy)', fontSize: '20px', fontWeight: 800 }}>No matching wholesale products found</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginTop: '6px' }}>Try clearing your search terms or selecting "All Pakistan".</p>
                <button type="button" className="btn-clear-filters" onClick={() => { setSearchQuery(''); setSelectedCity('all'); setActiveCategory('all'); }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((p, idx) => {
                const imgIndex = (idx % 36) + 1;
                const pad = imgIndex < 10 ? '0' + imgIndex : imgIndex;
                const localImg = `/assets/images/products/p${pad}.webp`;

                return (
                  <div className="catalog-card" key={p.id || idx}>
                    <div className="card-photo-box">
                      <span className="badge-city-loc"><i className="fa fa-map-marker-alt"></i> {p.city || 'Pakistan'}</span>
                      <span className="badge-verified-tag"><i className="fa-solid fa-certificate"></i> Verified Factory</span>
                      <img 
                        src={localImg} 
                        alt={p.alt || 'Product'} 
                        loading="lazy" 
                        onError={(e) => { e.target.src = '/assets/images/meta-img.jpeg'; }} 
                      />
                    </div>
                    <div className="card-details-box">
                      <div className="seller-brand-heading">
                        <i className="fa-solid fa-circle-check"></i> {p.seller || 'Verified Factory'}
                      </div>
                      <h4 className="card-item-title" title={p.alt}>{p.alt}</h4>
                      
                      <div className="price-strip-box">
                        <div className="price-left">
                          <span className="price-label">Wholesale Price</span>
                          <span className="pkr-main-rate">{p.pkr || 'Negotiable'}</span>
                        </div>
                        {p.usd && (
                          <div className="price-right">
                            <span className="usd-approx-rate">{p.usd}</span>
                          </div>
                        )}
                      </div>

                      <div className="meta-moq-info">
                        <span className="moq-tag-box"><i className="fa-solid fa-layer-group"></i> MOQ: <strong>{p.moq || '1'} {p.unit || 'Unit'}</strong></span>
                        <span className="stock-tag-box"><i className="fa-solid fa-boxes-stacked"></i> In Stock</span>
                      </div>

                      <div className="card-cta-group">
                        <button 
                          type="button" 
                          onClick={() => handleOpenModal(`Quote for: ${p.alt}`)} 
                          className="btn-card-rfq"
                        >
                          <i className="fa fa-envelope-open-text"></i> Get Quote
                        </button>
                        <a 
                          href={`https://wa.me/923348577777?text=Assalam%20o%20Alaikum,%20I%20am%20interested%20in%20${encodeURIComponent(p.alt)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-card-whatsapp"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Chat Now
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* INQUIRY POPUP MODAL */}
      {modalOpen && (
        <div className="inquiry-overlay active" onClick={() => setModalOpen(false)}>
          <div className="inquiry-box-window" onClick={(e) => e.stopPropagation()}>
            <button className="inquiry-close-x" onClick={() => setModalOpen(false)}>
              <i className="fa fa-times"></i>
            </button>
            <div className="modal-icon-badge">
              <i className="fa-solid fa-file-contract"></i>
            </div>
            <h3 className="brand-font">{modalTitle}</h3>
            <p>Directly communicate with registered Pakistani factories for bulk rates and OEM specs.</p>
            <form onSubmit={handleFormSubmit}>
              <div className="input-row">
                <label>Company / Contact Person</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Eastern Engineering Works"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-row">
                <label>Phone / WhatsApp Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="e.g. 0300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="input-row">
                <label>Required Quantity & Specifications</label>
                <textarea 
                  rows="3" 
                  required 
                  placeholder="Describe units needed, delivery location, custom requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn-submit-rfq">
                <i className="fa-solid fa-paper-plane"></i> Send Inquiry to Factory
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIGNATURE BLACK FOOTER */}
      <footer className="master-footer" id="about">
        <div className="container">
          <div className="footer-grid-layout">
            <div className="footer-about">
              <h2 className="brand-font">Chaicon.com<span>BETA</span></h2>
              <div className="footer-tagline-text">Pakistan's Online Wholesale Mandi</div>
              <p>
                Chaicon.com is Pakistan's premier B2B digital sourcing platform connecting local manufacturers, industrial plants, and commercial machine suppliers with wholesale buyers worldwide.
              </p>
              <div className="footer-social-row">
                <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer" className="social-circle whatsapp">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="tel:+923343331111" className="social-circle phone">
                  <i className="fa fa-phone"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-circle linkedin">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-column-title">Direct Helpline</h4>
              <div className="footer-direct-contact">
                <div className="contact-line">
                  <i className="fa fa-phone" style={{ color: 'var(--brand-orange)' }}></i>
                  <div>
                    <span className="contact-small-label">UAN Helpline</span>
                    <a href="tel:+923343331111">+92-334-333-1111</a>
                  </div>
                </div>
                <div className="contact-line">
                  <i className="fa-brands fa-whatsapp" style={{ color: 'var(--whatsapp-green)' }}></i>
                  <div>
                    <span className="contact-small-label">WhatsApp Sourcing</span>
                    <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer">+92-334-857-7777</a>
                  </div>
                </div>
                <div className="contact-line">
                  <i className="fa fa-map-marker-alt" style={{ color: 'var(--brand-orange)' }}></i>
                  <div>
                    <span className="contact-small-label">Hub Centers</span>
                    <span>Lahore, Karachi, Gujranwala</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="footer-column-title">Wholesale Sectors</h4>
              <ul className="footer-links-list">
                <li><a href="#">Commercial & Industrial Machinery</a></li>
                <li><a href="#">Milk Chillers & Dairy Equipment</a></li>
                <li><a href="#">Packaging & Laser Coding</a></li>
                <li><a href="#">Fabrics & Fashion Textiles</a></li>
                <li><a href="#">Hardware & Electrical Tools</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">Trade Assurance</h4>
              <ul className="footer-links-list">
                <li><button type="button" onClick={() => handleOpenModal('Register as Manufacturer')} className="footer-link-btn">Register as Manufacturer</button></li>
                <li><button type="button" onClick={() => handleOpenModal('Post Buying Requirement')} className="footer-link-btn">Post RFQ Requirement</button></li>
                <li><a href="#">Buyer Protection Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>© 2026 Chaicon.com — Engineered for Pakistani Commerce & Global Trade.</div>
            <div>Verified B2B Gateway • ISO 9001 Certified Directory • 100% Fluid Full-Width</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
