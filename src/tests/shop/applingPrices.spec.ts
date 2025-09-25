import { routes } from '../../../testData/routes.data';
import { urls } from '../../../testData/urls.data';
import { test } from '../../fixtures';
import { Brands } from '../../pages/shop/components/FiltersComponent';
import { ApiHelper } from '../../utils/api.helper';

test('should apply final price correctly', async ({ app, page }) => {
  const numberOfProducts = 3;
  const discountPercentage = 0.05;
  const discountLabel = '-95%';

  const getOriginalPrices = await test.step('Set up API interception to modify product prices', async () => {
    return ApiHelper.setupApiInterception(
        routes.cats.toys.barski,
        page,
    );
  });

  await test.step('Navigate to products page', async () => {
    await app.product.open(urls.cats.toys);
  });

  await test.step('Apply brand filter', async () => {
    await app.product.filters.selectBrand(Brands.BARKSI);
  });

  await test.step('Verify URL contains brand filter', async () => {
    await app.product.verifyPageUrl(/.*\/shop\/koshkam\/igrushki\/barksi\//);
  });

  await test.step('Verify correct number of products displayed', async () => {
    await app.product.verifyElementsCount(app.product.results.productCards, numberOfProducts);
  });

  await test.step('Verify discount labels and prices for each product', async () => {
    await app.product.results.verifyDiscountLabelsAndPrices({
      prices: getOriginalPrices(),
      numberOfProducts,
      discountPercentage,
      discountLabel,
    });
  });
});
