import type { ApiResponse, PriceItem, Product } from '../../../types/products';
import { calculateDiscountedPrice, formatPrice, parsePrice } from '../../utils/price.utils';

export class ProductsInterceptor {
  static applyProductsDiscount(
      json: ApiResponse,
      productData: {
        discountPercent: number,
        productsCount: number,
        discountLabel: string,
      },
  ): { modifiedJson: ApiResponse; result: number[] } {
    const { discountPercent, productsCount, discountLabel } = productData;

    const products = json.pageProps?.catalog?.goods;
    let originalPrices: number[] = [];
    let modifiedJson = json;

    if (products && products.length > 0) {
      originalPrices = this.extractOriginalPrices(products, productsCount);
      modifiedJson = this.applyDiscountToProducts(json, discountPercent, productsCount, discountLabel);
    }

    return {
      modifiedJson,
      result: originalPrices,
    };
  }

  private static extractOriginalPrices(goods: Product[], productsNumber: number): number[] {
    return goods
        .slice(0, productsNumber)
        .map((product) => {
          if (product.prices && product.prices.length > 0) {
            const prices = product.prices.map((priceItem) => {
              return parsePrice(priceItem.price);
            });
            return Math.min(...prices);
          }
          return parsePrice(product['min-price']);
        });
  }

  private static applyDiscountToProducts(
      originalData: ApiResponse,
      discountPercent: number,
      productsNumber: number,
      discountLabel: string,
  ): ApiResponse {
    return {
      ...originalData,
      pageProps: {
        ...originalData.pageProps,
        catalog: {
          ...originalData.pageProps.catalog,
          goods: originalData.pageProps.catalog.goods
              .slice(0, productsNumber)
              .map((product: Product) => this.applyDiscountToProduct(product, discountPercent, discountLabel)),
        },
      },
    };
  }

  private static applyDiscountToProduct(
      product: Product,
      discountPercent: number,
      discountLabel: string,
  ): Product {
    const allPrices: number[] = product.prices.map((priceItem: PriceItem) => {
      return parsePrice(priceItem.price);
    });

    const originalPrice: number = Math.min(...allPrices);
    const discountedPrice: number = calculateDiscountedPrice(originalPrice, discountPercent);

    return {
      ...product,
      'min-price': formatPrice(discountedPrice),
      'special-offer-faso-text': `-${discountLabel}%`,
      'prices': product.prices.map((priceItem: PriceItem) => {
        const originalPrice: number = parsePrice(priceItem.price);
        const variantDiscountedPrice: number = calculateDiscountedPrice(originalPrice, discountPercent);

        return {
          ...priceItem,
          'price': formatPrice(variantDiscountedPrice),
          'discount': `${discountLabel}`,
          'action-text': `-${discountLabel}%`,
          'price-wd': priceItem.price,
          'action-all-label': [`-${discountLabel}%`],
        };
      }),
    };
  }
}
