import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Request for Quotation');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCity = (selectedCity === 'all') || (p.city && p.city.toLowerCase().includes(selectedCity.toLowerCase()));
    const matchesSearch = !searchQuery || 
      (p.alt && p.alt.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (p.seller && p.seller.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setSearchQuery(cat === 'all' ? '' : cat);
  };

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Shukriya ${formData.name || ''}! Aap ki wholesale inquiry supplier ko dispatch kardi gayi hai.`);
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
              <span className="top-tag">Wholesale Mandi</span>
              <span>🇵🇰 Pakistan's No. 1 B2B Sourcing Network for Commercial Machinery & Factories</span>
            </div>
            <div className="top-right">
              <a href="tel:+923343331111"><i className="fa fa-phone"></i> +92-334-333-1111</a>
              <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }}></i> WhatsApp Support
              </a>
              <a href="#about"><i className="fa fa-shield-alt"></i> Buyer Protection</a>
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
                <i className="fa-solid fa-industry"></i>
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

            {/* Search Bar */}
            <div className="header-search">
              <div className="search-pill-box">
                <select className="search-category-select" defaultValue="all">
                  <option value="all">All Sectors</option>
                  <option value="machinery">Machinery</option>
                  <option value="suppliers">Suppliers</option>
                </select>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search industrial machinery, milk chillers, raw materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                onClick={() => handleOpenModal('Post Direct RFQ / Buying Requirement')} 
                className="btn-rfq-quote"
              >
                <i className="fa fa-paper-plane"></i>
                <span>Get Quotes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subnav Categories */}
        <div className="subnav-sectors">
          <div className="container">
            <div className="sectors-list">
              {[
                { id: 'all', label: 'All Sectors', icon: 'fa-th-large' },
                { id: 'machinery', label: 'Industrial Machinery', icon: 'fa-cogs' },
                { id: 'laser', label: 'Laser & Coding Printers', icon: 'fa-bolt' },
                { id: 'cotton', label: 'Textiles & Fabrics', icon: 'fa-tshirt' },
                { id: 'solar', label: 'Solar & Electrical', icon: 'fa-sun' },
                { id: 'torch', label: 'Hardware & Tools', icon: 'fa-wrench' },
                { id: 'chiller', label: 'Milk Chillers & Dairy', icon: 'fa-snowflake' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`sector-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <i className={`fa ${cat.icon}`}></i> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-showcase">
        <div className="container">
          <div className="hero-layout">
            <div>
              <div className="hero-pill-badge">
                <i className="fa fa-certificate"></i> Verified Factory Sourcing Hub
              </div>
              <h1 className="hero-title brand-font">
                Direct B2B Sourcing from <span className="highlight-magenta">Pakistan's Top Factories</span>
              </h1>
              <p className="hero-desc">
                Connect directly with verified machinery manufacturers, wholesale suppliers, and milk chiller vendors in Lahore, Karachi, Faisalabad, Gujranwala, and Peshawar. Negotiate wholesale rates and secure verified trade.
              </p>
              <div className="hero-btn-row">
                <a href="#browse-catalog" className="btn-rfq-quote" style={{ padding: '13px 28px', fontSize: '14.5px' }}>
                  <i className="fa fa-boxes"></i> Explore 36+ Verified Products
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenModal('Post Direct Buying Requirement')}
                  className="btn-seller-link"
                  style={{ padding: '13px 22px', fontSize: '14.5px' }}
                >
                  <i className="fa fa-file-invoice"></i> Post Buying Requirement
                </button>
              </div>

              <div className="hero-stats-row">
                <div className="stat-box">
                  <h3 className="brand-font">5,400+</h3>
                  <p>Registered Manufacturers</p>
                </div>
                <div className="stat-box">
                  <h3 className="brand-font">42,000+</h3>
                  <p>Industrial Listings</p>
                </div>
                <div className="stat-box">
                  <h3 className="brand-font">100%</h3>
                  <p>Verified Factory Deals</p>
                </div>
              </div>
            </div>

            {/* 2x2 Feature Highlights */}
            <div className="hero-cards-grid">
              <div className="value-box">
                <div className="value-box-top-border border-orange"></div>
                <div className="value-icon icon-bg-orange">
                  <i className="fa fa-industry"></i>
                </div>
                <h4>Industrial Machinery</h4>
                <p>From 20W CO2 Lasers to milk chillers and manufacturing production units.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-magenta"></div>
                <div className="value-icon icon-bg-magenta">
                  <i className="fa fa-shield-alt"></i>
                </div>
                <h4>Verified Suppliers</h4>
                <p>Direct communication with vetted factory owners across Pakistan.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-green"></div>
                <div className="value-icon icon-bg-green">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <h4>Instant WhatsApp Chat</h4>
                <p>Direct chat links for instant quote delivery, samples and negotiation.</p>
              </div>

              <div className="value-box">
                <div className="value-box-top-border border-navy"></div>
                <div className="value-icon icon-bg-navy">
                  <i className="fa fa-truck-fast"></i>
                </div>
                <h4>Nationwide Logistics</h4>
                <p>Full freight cargo delivery across Punjab, Sindh, KPK and Balochistan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG SECTION (1600px Max-Width) */}
      <main className="product-showcase-section" id="browse-catalog">
        <div className="container">
          
          {/* Interactive City Filters Bar */}
          <div className="filter-ctrl-bar">
            <div className="filter-ctrl-inner">
              <div className="city-pills-wrap">
                <span className="filter-label"><i className="fa fa-map-marker-alt" style={{ color: 'var(--brand-orange)' }}></i> Filter By City:</span>
                {['all', 'Lahore', 'Karachi', 'Faisalabad', 'Gujranwala', 'Peshawar'].map(city => (
                  <button
                    key={city}
                    type="button"
                    className={`city-filter-btn ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city === 'all' ? 'All Pakistan' : city}
                  </button>
                ))}
              </div>
              <div className="filter-meta-count">
                Showing <strong>{filteredProducts.length}</strong> Wholesale Products
              </div>
            </div>
          </div>

          {/* Signature Orange Section Heading Strip */}
          <div className="section-banner-heading">
            <h3><i className="fa fa-star"></i> Featured Factory Products</h3>
            <span className="section-banner-badge">Real-Time Factory Prices</span>
          </div>

          {/* Dynamic Product Cards Grid */}
          <div className="product-grid-layout">
            {filteredProducts.length === 0 ? (
              <div className="empty-state-box">
                <i className="fa fa-search" style={{ fontSize: '38px', color: 'var(--text-light)', marginBottom: '12px' }}></i>
                <h4 style={{ color: 'var(--brand-navy)', fontSize: '18px' }}>No matching wholesale products found</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Try clearing search keywords or selecting "All Pakistan".</p>
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
                      <span className="badge-verified-tag"><i className="fa fa-check-circle"></i> Verified</span>
                      <img 
                        src={localImg} 
                        alt={p.alt || 'Product'} 
                        loading="lazy" 
                        onError={(e) => { e.target.src = '/assets/images/meta-img.jpeg'; }} 
                      />
                    </div>
                    <div className="card-details-box">
                      <div className="seller-brand-heading">
                        <i className="fa fa-building-circle-check"></i> {p.seller || 'Verified Factory'}
                      </div>
                      <h4 className="card-item-title" title={p.alt}>{p.alt}</h4>
                      
                      <div className="price-strip-box">
                        <span className="pkr-main-rate">{p.pkr || 'Negotiable'}</span>
                        {p.usd && <span className="usd-approx-rate">{p.usd}</span>}
                      </div>

                      <div className="meta-moq-info">
                        <span className="moq-tag-box"><i className="fa fa-boxes"></i> MOQ: {p.moq || '1'} ({p.unit || 'Unit'})</span>
                        <span className="stock-tag-box"><i className="fa fa-shield-alt"></i> In Stock</span>
                      </div>

                      <div className="card-cta-group">
                        <button 
                          type="button" 
                          onClick={() => handleOpenModal(`Quote for: ${p.alt}`)} 
                          className="btn-card-rfq"
                        >
                          <i className="fa fa-envelope"></i> Quote
                        </button>
                        <a 
                          href={`https://wa.me/923348577777?text=Assalam%20o%20Alaikum,%20I%20am%20interested%20in%20${encodeURIComponent(p.alt)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-card-whatsapp"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Chat
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
            <h3 className="brand-font">{modalTitle}</h3>
            <p>Fill out the details below and verified factory suppliers will get in touch with you directly.</p>
            <form onSubmit={handleFormSubmit}>
              <div className="input-row">
                <label>Your Name / Company Name</label>
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
                  placeholder="Describe unit quantity, delivery location, technical requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn-submit-rfq">Send Inquiry to Supplier</button>
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
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', fontSize: '18px' }}>
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="tel:+923343331111" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '15px' }}>
                  <i className="fa fa-phone"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-column-title">Direct Contact</h4>
              <div className="footer-direct-contact">
                <div className="contact-line">
                  <i className="fa fa-phone" style={{ color: 'var(--brand-orange)' }}></i>
                  <a href="tel:+923343331111">+92-334-333-1111</a>
                </div>
                <div className="contact-line">
                  <i className="fa-brands fa-whatsapp" style={{ color: 'var(--whatsapp-green)' }}></i>
                  <a href="https://api.whatsapp.com/send/?phone=923348577777" target="_blank" rel="noreferrer">+92-334-857-7777</a>
                </div>
                <div className="contact-line">
                  <i className="fa fa-map-marker-alt" style={{ color: 'var(--brand-orange)' }}></i>
                  <span>Lahore & Karachi, Pakistan</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="footer-column-title">Sourcing Sectors</h4>
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
            <div>Verified B2B Gateway • ISO 9001 Certified Directory • Full Width Fluid Layout</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
