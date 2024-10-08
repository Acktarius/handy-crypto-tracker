import React, { useState } from 'react';

interface NonKYCBannerProps {
  // Add any props if needed
}

export function NonKYCBanner({}: NonKYCBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleBanner = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`nonkyc-banner ${isExpanded ? 'expanded' : ''}`}>
      <div className="banner-header" onClick={toggleBanner}>
        NonKYC Exchanges {isExpanded ? '▲' : '▼'}
      </div>
      {isExpanded && (
        <div className="banner-content">
          <a href="https://tradeogre.com/markets" target="_blank" rel="noopener noreferrer">TradeOgre</a>
          <a href="https://nonkyc.io" target="_blank" rel="noopener noreferrer">nonkyc</a>
          <a href="https://www.sevenseas.exchange/" target="_blank" rel="noopener noreferrer">Seven Seas</a>
        </div>
      )}
    </div>
  );
}