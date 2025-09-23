import { AppComponent } from '../../../AppComponent';

export enum Brands {
  PET_STAGES = 'Petstages',
  BARKSI = 'Barksi',
  NINA_OTTOSSON = 'Nina Ottosson',
  BAJDYK = 'Байдик',
  KARE_LINE = 'KareLine',
}

export class FiltersComponent extends AppComponent {
  readonly brandsContainer = this.page.locator('.brands-container');
  readonly brandItems = this.brandsContainer.locator('.brand-item');

  public async selectBrand(brandName: Brands): Promise<void> {
    const brandItem = this.brandItems.filter({ hasText: brandName }).first();
    await brandItem.click();
  }
}
