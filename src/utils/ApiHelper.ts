import { type Page } from '@playwright/test';
import type { ApiResponse, PriceItem, Product } from '../../types/products';

export class ApiHelper {
  static async setupApiInterception(page: Page): Promise<()=> number[]> {
    let originalPrices: number[] = [];

    await page.route('**/shop/koshkam/igrushki/*.json*', async (route) => {
      const response = await route.fetch();
      const originalData: ApiResponse = await response.json();

      if (originalData.pageProps?.catalog?.goods) {
        originalPrices = this.extractOriginalPrices(originalData.pageProps.catalog.goods);

        const modifiedData = this.applyDiscountToProducts(originalData);

        await route.fulfill({
          status: response.status(),
          headers: response.headers(),
          body: JSON.stringify(modifiedData),
        });
      } else {
        await route.continue();
      }
    });

    // returns a function to get the prices after the request has been made
    return (): number[] => originalPrices;
  }

  private static extractOriginalPrices(goods: Product[]): number[] {
    return goods
        .slice(0, 3)
        .map((product) => {
          // Get the MINIMUM price from all price variants
          if (product.prices && product.prices.length > 0) {
            const prices = product.prices.map((priceItem) => {
              return parseFloat(priceItem.price.replace(',', '.'));
            });
            return Math.min(...prices);
          }
          return parseFloat(product['min-price'].replace(',', '.'));
        });
  }

  private static applyDiscountToProducts(originalData: ApiResponse): ApiResponse {
    return {
      ...originalData,
      pageProps: {
        ...originalData.pageProps,
        catalog: {
          ...originalData.pageProps.catalog,
          goods: originalData.pageProps.catalog.goods
              .slice(0, 3)
              .map((product: Product) => this.applyDiscountToProduct(product)),
        },
      },
    };
  }

  private static applyDiscountToProduct(product: Product): Product {
    const allPrices: number[] = product.prices.map((priceItem: PriceItem) => {
      return parseFloat(priceItem.price.replace(',', '.'));
    });
    const originalPrice: number = Math.min(...allPrices);
    const discountedPrice: number = Math.round(originalPrice * 0.05);

    return {
      ...product,
      'min-price': discountedPrice.toFixed(2).replace('.', ','),
      'special-offer-faso-text': '-95%',
      'prices': product.prices.map((priceItem: PriceItem) => {
        const originalPrice: number = parseFloat(priceItem.price.replace(',', '.'));
        const variantDiscountedPrice: number = Math.round(originalPrice * 0.05);

        return {
          ...priceItem,
          'price': variantDiscountedPrice.toFixed(2).replace('.', ','),
          'discount': '95',
          'action-text': '-95%',
          'price-wd': priceItem.price,
          'action-all-label': ['-95%'],
        };
      }),
    };
  }
}
