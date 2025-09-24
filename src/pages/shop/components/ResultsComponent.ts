import { type Locator } from '@playwright/test';
import { AppComponent } from '../../AppComponent';
import { step } from '../../../../config/reporters/step';
import { Result } from './ResultComponent';

export class ResultsComponent extends AppComponent {
  readonly productCards: Locator = this.page.locator('.ph-new-catalog-tovar-block');

  @step()
  async getResultDetailsByIndex(index: number): Promise<Awaited<ReturnType<Result['resultDetails']>>> {
    const results = await this.productCards.all();
    return new Result(results[index]).resultDetails();
  }
}
