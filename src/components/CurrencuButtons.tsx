import React from 'react';

interface CurrencyButtonsProps {
  currencies: string[];
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const CurrencyButtons: React.FC<CurrencyButtonsProps> = ({ currencies, selectedCurrency, setSelectedCurrency }) => {
  return (
    <div className="currency-buttons">
      {currencies.map((currency) => (
        <button
          key={currency}
          className={`currency-button ${selectedCurrency === currency ? 'active' : ''}`}
          onClick={() => setSelectedCurrency(currency)}
        >
          {currency}
        </button>
      ))}
    </div>
  );
};

export default CurrencyButtons;