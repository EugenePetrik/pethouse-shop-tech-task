import { expect, test } from '../../fixtures';
import { Brands } from '../../pages/shop/components/FiltersComponent';
import { ApiHelper } from '../../utils/api.helper';
import { calculateDiscountedPrice } from '../../utils/price.utils';

test('should apply final price correctly', async ({ app, page }) => {
  const getOriginalPrices = await test.step('Set up API interception to modify product prices', async () => {
    return ApiHelper.setupApiInterception(page);
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
    ).toHaveCount(3);
  });

  await test.step('Verify discount labels and prices for each product', async () => {
    const productPricesFromApi = getOriginalPrices();

    await test.step(`Verify data for product 1`, async () => {
      const index = 0;
      const productCard = await app.product.results.getResultDetailsByIndex(index);

      await test.step('Verify special offer discount label', async () => {
        expect(productCard.specialOfferDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify price discount label', async () => {
        expect(productCard.priceDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify discounted price calculation', async () => {
        const expectedDiscountedPrice = calculateDiscountedPrice(productPricesFromApi[index]);
        expect(productCard.discountedPrice).toEqual(expectedDiscountedPrice);
      });
    });

    await test.step(`Verify data for product 2`, async () => {
      const index = 1;
      const productCard = await app.product.results.getResultDetailsByIndex(index);

      await test.step('Verify special offer discount label', async () => {
        expect(productCard.specialOfferDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify price discount label', async () => {
        expect(productCard.priceDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify discounted price calculation', async () => {
        const expectedDiscountedPrice = calculateDiscountedPrice(productPricesFromApi[index]);
        expect(productCard.discountedPrice).toEqual(expectedDiscountedPrice);
      });
    });

    await test.step(`Verify data for product 3`, async () => {
      const index = 2;
      const productCard = await app.product.results.getResultDetailsByIndex(index);

      await test.step('Verify special offer discount label', async () => {
        expect(productCard.specialOfferDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify price discount label', async () => {
        expect(productCard.priceDiscountLabel).toEqual('-95%');
      });

      await test.step('Verify discounted price calculation', async () => {
        const expectedDiscountedPrice = calculateDiscountedPrice(productPricesFromApi[index]);
        expect(productCard.discountedPrice).toEqual(expectedDiscountedPrice);
      });
    });
  });
});
