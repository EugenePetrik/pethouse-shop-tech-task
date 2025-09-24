import { AppPage } from '../AppPage';
import { FiltersComponent } from './components/FiltersComponent';
import { ResultsComponent } from './components/ResultsComponent';

export class ShopPage extends AppPage {
  readonly filters = new FiltersComponent(this.page);
  readonly results = new ResultsComponent(this.page);
}
