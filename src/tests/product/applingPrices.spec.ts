import { expect, test } from '../../fixtures';
import { Brands } from '../../pages/product/components/FiltersComponent';
import { ApiHelper } from '../../utils/ApiHelper';
import { PriceVerificationHelper } from '../../utils/PriceVerificationHelper';

test('should apply final price correctly', async ({ app, page }) => {
  // Set up API interception and get original prices
  const getOriginalPrices = await ApiHelper.setupApiInterception(page);

  await app.product.open('/shop/koshkam/igrushki');

  await app.product.filters.selectBrand(Brands.BARKSI);

  await expect(page).toHaveURL(/.*\/shop\/koshkam\/igrushki\/barksi\//);

  // Verify that exactly 3 products are displayed
  await expect(app.product.productCards).toHaveCount(3);

  // Get the original prices after the API call has been made
  const originalPrices = getOriginalPrices();

  // Verify discount labels and price calculations for each product
  for (let i = 0; i < 3; i++) {
    const productCard = app.product.productCards.nth(i);

    // Verify discount label
    await PriceVerificationHelper.verifyDiscountLabel(productCard);

    // Calculate expected price and verify
    const expectedPrice = Math.round(originalPrices[i] * 0.05);
    await PriceVerificationHelper.verifyProductPrice(productCard, expectedPrice, i);
  }

  // Additional verification for all discount labels
  await PriceVerificationHelper.verifyAllDiscountLabels(page);
});
