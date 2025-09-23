import { PageHolder } from './PageHolder';
import { ProductPage } from './product/ProductPage';

export class Application extends PageHolder {
  readonly product: ProductPage = new ProductPage(this.page);
}
