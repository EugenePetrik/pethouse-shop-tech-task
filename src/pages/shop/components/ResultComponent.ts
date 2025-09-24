import { type Locator } from '@playwright/test';
import { AppComponent } from '../../AppComponent';
import { step } from '../../../../config/reporters/step';
import { parsePrice } from '../../../utils/price.utils';

export class Result extends AppComponent {
  constructor(private root: Locator) {
    super(root.page());
  }

  async specialOfferDiscountLabel(): Promise<string | null> {
    return this.root.locator('.z-main-sales-sale-bubble').first().textContent();
  }

  async priceDiscountLabel(): Promise<string | null> {
    return this.root.locator('.ph-new-catalog-tovar-action-bubble').first().textContent();
  }

  async discountedPrice(): Promise<number> {
    const priceUAHElement = this.root.locator('.ph-new-catalog-price-block-uah').first();
    const priceCentsElement = this.root.locator('.ph-new-catalog-price-block-kop').first();

    const displayedUahPriceText = await priceUAHElement.textContent();
    const displayedKopPriceText = await priceCentsElement.textContent();

    const displayedUahPrice = parsePrice(displayedUahPriceText);
    const displayedKopPrice = parsePrice(displayedKopPriceText);

    const totalDiscountedPrice = displayedUahPrice + (displayedKopPrice / 100);
    return totalDiscountedPrice;
  }

  @step()
  async resultDetails() {
    return {
      specialOfferDiscountLabel: await this.specialOfferDiscountLabel(),
      priceDiscountLabel: await this.priceDiscountLabel(),
      discountedPrice: await this.discountedPrice(),
    };
  }
}
