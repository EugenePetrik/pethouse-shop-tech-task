import { expect, type Locator, type Page } from '@playwright/test';
import { parsePrice } from './price.utils';

export class PriceVerificationHelper {
  static async verifyProductPrice(
      productCard: Locator,
      expectedPrice: number,
      productIndex: number,
  ) {
    // Get the displayed price (UAH + kopecks)
    const priceUAHElement = productCard.locator('.ph-new-catalog-price-block-uah').first();
    const priceCentsElement = productCard.locator('.ph-new-catalog-price-block-kop').first();

    const displayedUAHPriceText = await priceUAHElement.textContent();
    const displayedCentsPriceText = await priceCentsElement.textContent();

    const displayedUAHPrice = parsePrice(displayedUAHPriceText);
    const displayedCentsPrice = parsePrice(displayedCentsPriceText);

    // Combine UAH and kopecks into total price
    const totalDisplayedPrice = displayedUAHPrice + (displayedCentsPrice / 100);

    // eslint-disable-next-line @stylistic/max-len
    console.log(`Product ${productIndex + 1}: Expected: ${expectedPrice}, Displayed UAH: ${displayedUAHPrice}, Displayed kopecks: ${displayedCentsPrice}, Total: ${totalDisplayedPrice}`);

    // Verify the price calculation is correct
    expect(totalDisplayedPrice).toBeCloseTo(expectedPrice, 2);
  }

  static async verifyDiscountLabel(productCard: Locator) {
    const discountLabel = productCard.locator('.ph-new-catalog-tovar-action-bubble').first();
    await expect(discountLabel).toContainText('-95%');
  }

  static async verifyAllDiscountLabels(page: Page) {
    const allDiscountLabels = page.locator('.z-main-sales-sale-bubble');
    const discountCount = await allDiscountLabels.count();

    for (let i = 0; i < discountCount; i++) {
      const labelText = await allDiscountLabels.nth(i).textContent();

      if (labelText?.includes('%')) {
        expect(labelText).toContain('-95%');
      }
    }
  }
}
