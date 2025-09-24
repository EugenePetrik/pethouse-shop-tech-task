export function parsePrice(priceText: string | null): number {
  return priceText
      ? parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'))
      : 0;
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export function calculateDiscountedPrice(price: number, discount = 0.05): number {
  return Math.round(price * discount);
}
