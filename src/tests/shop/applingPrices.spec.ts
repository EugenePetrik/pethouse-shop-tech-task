import { PRODUCTS_DATA } from '../../../testData/products.data';
import { routes } from '../../../testData/routes.data';
import { urls } from '../../../testData/urls.data';
import type { ApiResponse } from '../../../types/products';
import { ApiInterceptor } from '../../api/interceptors/ApiInterceptor';
import { ProductsInterceptor } from '../../api/interceptors/ProductsInterceptor';
import { test } from '../../fixtures';
import { Brands } from '../../pages/shop/components/FiltersComponent';

PRODUCTS_DATA.forEach(({ discountPercent, productsCount, discountLabel }) => {
  test('should apply final price correctly', async ({ app, page }) => {
    const getOriginalPrices = await test.step('Set up API interception to modify product prices', async () => {
      return ApiInterceptor.interceptAndModifyResponse(
          page,
          routes.cats.toys.barski,
          (json: ApiResponse) => ProductsInterceptor.applyProductsDiscount(
              json,
              {
                discountPercent,
                productsCount,
                discountLabel,
              },
          ),
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
      await app.product.verifyElementsCount(app.product.results.productCards, productsCount);
    });

    await test.step('Verify discount labels and prices for each product', async () => {
      await app.product.results.verifyDiscountLabelsAndPrices({
        prices: getOriginalPrices(),
        productsCount,
        discountPercent,
        discountLabel: `-${discountLabel}%`,
      });
    });
  });
});
