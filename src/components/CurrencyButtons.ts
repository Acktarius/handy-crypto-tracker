export class CurrencyButtons {
  static render(currencies: string[], selectedCurrency: string): string {
    return `
      <div class="currency-buttons">
        ${currencies.map((currency) => `
          <button
            class="currency-button ${selectedCurrency === currency ? 'active' : ''}"
            data-currency="${currency}"
          >
            ${currency}
          </button>
        `).join('')}
      </div>
    `;
  }
}