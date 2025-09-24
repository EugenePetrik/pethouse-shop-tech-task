import { routes } from '../../../testData/routes.data';
import { expect, test } from '../../fixtures';
import { Brands } from '../../pages/shop/components/FiltersComponent';
import { ApiHelper } from '../../utils/api.helper';
import { calculateDiscountedPrice } from '../../utils/price.utils';

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
    await app.product.open('/shop/koshkam/igrushki');
  });

  await test.step('Apply brand filter', async () => {
    await app.product.filters.selectBrand(Brands.BARKSI);
  });

  await test.step('Verify URL contains brand filter', async () => {
    await expect(
        page,
        'URL is not correct after applying brand filter',
    ).toHaveURL(/.*\/shop\/koshkam\/igrushki\/barksi\//);
  });

  await test.step('Verify correct number of products displayed', async () => {
    await expect(
        app.product.results.productCards,
        'Product cards count is not correct',
    ).toHaveCount(numberOfProducts);
  });

  await test.step('Verify discount labels and prices for each product', async () => {
    const productPricesFromApi = getOriginalPrices();

    for (let index = 0; index < numberOfProducts; index++) {
      const productCard = await app.product.results.getResultDetailsByIndex(index);

      expect(
          productCard.specialOfferDiscountLabel,
          `Special offer discount label is not correct for product ${index + 1}`,
      ).toEqual(discountLabel);

      expect(
          productCard.priceDiscountLabel,
          `Discount label is not correct for product ${index + 1}`,
      ).toEqual(discountLabel);

      const expectedDiscountedPrice = calculateDiscountedPrice(productPricesFromApi[index], discountPercentage);
      expect(
          productCard.discountedPrice,
          `Discounted price is not correct for product ${index + 1}`,
      ).toEqual(expectedDiscountedPrice);
    }
  });
});
