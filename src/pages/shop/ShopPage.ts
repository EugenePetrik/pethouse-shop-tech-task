import { AppPage } from '../AppPage';
import { FiltersComponent } from './components/FiltersComponent';

export class ShopPage extends AppPage {
  readonly filters = new FiltersComponent(this.page);
  readonly productCards = this.page.locator('.ph-new-catalog-tovar-block');
}
