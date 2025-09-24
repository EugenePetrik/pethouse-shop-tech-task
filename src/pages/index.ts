import { PageHolder } from './PageHolder';
import { ShopPage } from './shop/ShopPage';

export class Application extends PageHolder {
  readonly product: ShopPage = new ShopPage(this.page);
}
