import { type Locator } from '@playwright/test';
import { AppComponent } from '../../AppComponent';
import { step } from '../../../../config/reporters/step';
import { parsePrice } from '../../../utils/price.utils';

export class Result extends AppComponent {
  readonly specialOfferDiscountLabelSelector = '.z-main-sales-sale-bubble';
  readonly priceDiscountLabelSelector = '.ph-new-catalog-tovar-action-bubble';
  readonly priceUahSelector = '.ph-new-catalog-price-block-uah';
  readonly priceKopSelector = '.ph-new-catalog-price-block-kop';

  constructor(private root: Locator) {
    super(root.page());
  }

  async specialOfferDiscountLabel(): Promise<string> {
    const element = this.root.locator(this.specialOfferDiscountLabelSelector).first();
    return element.textContent() as Promise<string>;
  }

  async priceDiscountLabel(): Promise<string> {
    const element = this.root.locator(this.priceDiscountLabelSelector).first();
    return element.textContent() as Promise<string>;
  }

  async discountedPrice(): Promise<number> {
    const priceUahElement = this.root.locator(this.priceUahSelector).first();
    const priceKopElement = this.root.locator(this.priceKopSelector).first();

    const displayedUahPriceText = await priceUahElement.textContent();
    const displayedKopPriceText = await priceKopElement.textContent();

    const displayedUahPrice = parsePrice(displayedUahPriceText);
    const displayedKopPrice = parsePrice(displayedKopPriceText);

    const totalDiscountedPrice = displayedUahPrice + (displayedKopPrice / 100);
    return totalDiscountedPrice;
  }

  @step()
  async resultDetails(): Promise<{
      specialOfferDiscountLabel: string,
      priceDiscountLabel: string,
      discountedPrice: number,
  }> {
    return {
      specialOfferDiscountLabel: await this.specialOfferDiscountLabel(),
      priceDiscountLabel: await this.priceDiscountLabel(),
      discountedPrice: await this.discountedPrice(),
    };
  }
}
