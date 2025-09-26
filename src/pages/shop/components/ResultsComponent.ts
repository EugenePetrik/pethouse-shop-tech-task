import { expect, type Locator } from '@playwright/test';
import { AppComponent } from '../../AppComponent';
import { step } from '../../../../config/reporters/step';
import { Result } from './ResultComponent';
import { calculateDiscountedPrice } from '../../../utils/price.utils';

export class ResultsComponent extends AppComponent {
  readonly productCards: Locator = this.page.locator('.ph-new-catalog-tovar-block');

  @step()
  async getResultDetailsByIndex(index: number): Promise<Awaited<ReturnType<Result['resultDetails']>>> {
    const results = await this.productCards.all();
    return new Result(results[index]).resultDetails();
  }

  @step()
  async verifyDiscountLabelsAndPrices(data: {
    prices: number[],
    productsCount: number,
    discountPercent: number,
    discountLabel: string,
  }): Promise<void> {
    const { prices, productsCount, discountPercent, discountLabel } = data;

    for (let index = 0; index < productsCount; index++) {
      const productCard = await this.getResultDetailsByIndex(index);

      expect(
          productCard.specialOfferDiscountLabel,
          `Special offer discount label is not correct for product ${index + 1}`,
      ).toEqual(discountLabel);

      expect(
          productCard.priceDiscountLabel,
          `Discount label is not correct for product ${index + 1}`,
      ).toEqual(discountLabel);

      const expectedDiscountedPrice = calculateDiscountedPrice(prices[index], discountPercent);
      expect(
          productCard.discountedPrice,
          `Discounted price is not correct for product ${index + 1}`,
      ).toEqual(expectedDiscountedPrice);
    }
  }
}
