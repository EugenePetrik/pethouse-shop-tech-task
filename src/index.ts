import { PageHolder } from './PageHolder';
import { CatalogPage } from './pages/catalog/CatalogPage';

export class Application extends PageHolder {
  readonly catalog: CatalogPage = new CatalogPage(this.page);
}
