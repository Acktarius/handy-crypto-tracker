export class NonKYCBanner {
  static render(): string {
    return `
      <div class="nonkyc-banner">
        <div class="banner-header">
          NonKYC Exchanges ▼
        </div>
        <div class="banner-content">
          <a href="https://tradeogre.com/markets" target="_blank" rel="noopener noreferrer">
            TradeOgre
          </a>
          <a href="https://nonkyc.io" target="_blank" rel="noopener noreferrer">
            nonkyc
          </a>
          <a href="https://www.sevenseas.exchange/" target="_blank" rel="noopener noreferrer">
            Seven Seas
          </a>
        </div>
      </div>
    `;
  }
}