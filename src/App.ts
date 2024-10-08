import axios from 'axios';
import { CryptoTable } from './components/CryptoTable';
import { CurrencyButtons } from './components/CurrencyButtons';
import { NonKYCBanner } from './components/NonKYCBanner';
import { Footer } from './components/Footer';

export interface Cryptocurrency {
  id: string;
  symbol: string;
}

export class App {
  private root: HTMLElement;
  private prices: Record<string, number> = {};
  private cryptoIcons: Record<string, string> = {};
  private loading: boolean = true;
  private error: string | null = null;
  private darkMode: boolean = false;
  private selectedCurrency: string = "USD";

  private cryptocurrencies: Cryptocurrency[] = [
    { id: "conceal", symbol: "CCX" },
    { id: "bitcoin", symbol: "BTC" },
    { id: "tether", symbol: "USDT" },
    { id: "litecoin", symbol: "LTC" }
  ];
  private currencies: string[] = ["USD", "EUR", "CAD", "JPY", "AUD"];

  constructor(root: HTMLElement) {
    this.root = root;
  }

  async render(): Promise<void> {
    await this.fetchPrices();
    await this.fetchCryptoIcons();
    this.renderApp();
    this.attachEventListeners();
  }

  private async fetchPrices(): Promise<void> {
    this.loading = true;
    this.error = null;
    this.updateErrorMessage(); // Clear any previous error messages
    try {
      const cryptoIds = this.cryptocurrencies.map(c => c.id).join(',');
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${this.selectedCurrency.toLowerCase()}`);
      
      this.cryptocurrencies.forEach((crypto) => {
        this.prices[crypto.symbol] = response.data[crypto.id][this.selectedCurrency.toLowerCase()];
      });
    } catch (error) {
      console.error("Error fetching prices:", error);
      this.error = "Failed to fetch cryptocurrency prices. Please try again later.";
      this.updateErrorMessage(); // Display the error message
    }
    this.loading = false;
    this.updateCryptoTable(); // Update the table after fetching prices
  }

  private async fetchCryptoIcons(): Promise<void> {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: this.cryptocurrencies.map(c => c.id).join(','),
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false
        }
      });
      response.data.forEach((coin: any) => {
        this.cryptoIcons[coin.symbol.toUpperCase()] = coin.image;
      });
    } catch (error) {
      console.error("Error fetching crypto icons:", error);
      this.error = "Failed to fetch cryptocurrency icons. Some icons may not display correctly.";
      this.updateErrorMessage(); // Display the error message
    }
  }

  private toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.root.querySelector('.App')?.classList.toggle('dark-mode');
    const darkModeToggle = this.root.querySelector('#darkModeToggle') as HTMLButtonElement;
    if (darkModeToggle) {
      darkModeToggle.textContent = this.darkMode ? '☀️' : '🌙';
    }
  }

  private async setSelectedCurrency(currency: string): Promise<void> {
    this.selectedCurrency = currency;
    await this.fetchPrices(); // This will update the error message if there's an error
    this.updateCurrencyButtons();
    // updateCryptoTable is called inside fetchPrices
  }

  private renderApp(): void {
    this.root.innerHTML = `
      <div class="App ${this.darkMode ? 'dark-mode' : ''}">
        <button class="dark-mode-switch" id="darkModeToggle">
          ${this.darkMode ? '☀️' : '🌙'}
        </button>
        <h1>Crypto Price Tracker</h1>
        <div id="error-container"></div>
        ${CurrencyButtons.render(this.currencies, this.selectedCurrency)}
        <div id="crypto-table-container">
          ${this.loading ? '<p>Loading...</p>' : CryptoTable.render(this.cryptocurrencies, this.prices, this.selectedCurrency, this.cryptoIcons)}
        </div>
        <div class="bottom-content">
          ${NonKYCBanner.render()}
          ${Footer.render()}
        </div>
      </div>
    `;
    this.updateErrorMessage(); // Display any errors that occurred during initial render
  }

  private updateCurrencyButtons(): void {
    const buttonsContainer = this.root.querySelector('.currency-buttons');
    if (buttonsContainer) {
      buttonsContainer.innerHTML = CurrencyButtons.render(this.currencies, this.selectedCurrency);
    }
  }

  private updateCryptoTable(): void {
    const tableContainer = this.root.querySelector('#crypto-table-container');
    if (tableContainer) {
      tableContainer.innerHTML = this.loading
        ? '<p>Loading...</p>'
        : CryptoTable.render(this.cryptocurrencies, this.prices, this.selectedCurrency, this.cryptoIcons);
    }
  }

  private updateErrorMessage(): void {
    const errorContainer = this.root.querySelector('#error-container');
    if (errorContainer) {
      errorContainer.innerHTML = this.error ? `<p class="error-message">${this.error}</p>` : '';
    }
  }

  private attachEventListeners(): void {
    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.id === 'darkModeToggle') {
        this.toggleDarkMode();
      } else if (target.classList.contains('currency-button')) {
        const currency = target.getAttribute('data-currency');
        if (currency) this.setSelectedCurrency(currency);
      } else if (target.classList.contains('banner-header')) {
        const banner = this.root.querySelector('.nonkyc-banner');
        banner?.classList.toggle('expanded');
      }
    });
  }
}