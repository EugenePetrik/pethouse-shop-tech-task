import { AppPage } from '../AppPage';
import { FiltersComponent } from './components/FiltersComponent';

export class ProductPage extends AppPage {
  readonly filters = new FiltersComponent(this.page);
}
