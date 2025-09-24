import { expect, test } from '../../fixtures';
import { Brands } from '../../pages/shop/components/FiltersComponent';
import { ApiHelper } from '../../utils/api.helper';
import { calculateDiscountedPrice } from '../../utils/price.utils';
import { PriceVerificationHelper } from '../../utils/price.verification.helper';

test('should apply final price correctly', async ({ app, page }) => {
  // Set up API interception and get original prices
  const getOriginalPrices = await ApiHelper.setupApiInterception(page);

  await app.product.open('/shop/koshkam/igrushki');

  await app.product.filters.selectBrand(Brands.BARKSI);

  await expect(
      page,
      'URL is not correct after applying brand filter',
  ).toHaveURL(/.*\/shop\/koshkam\/igrushki\/barksi\//);

  await expect(
      app.product.productCards,
      'Product cards count is not correct',
  ).toHaveCount(3);

  const pricesFromApiRequest = getOriginalPrices();

  // Verify discount labels and price calculations for each product
  for (let i = 0; i < 3; i++) {
    const productCard = app.product.productCards.nth(i);

    // Verify discount label
    await PriceVerificationHelper.verifyDiscountLabel(productCard);

    // Calculate expected price and verify
    const expectedPrice = calculateDiscountedPrice(pricesFromApiRequest[i]);
    await PriceVerificationHelper.verifyProductPrice(productCard, expectedPrice, i);
  }

  // Additional verification for all discount labels
  await PriceVerificationHelper.verifyAllDiscountLabels(page);
});
