import { expect, type Locator } from '@playwright/test';
import { step } from '../../config/reporters/step';
import { AppComponent } from './AppComponent';

export abstract class AppPage extends AppComponent {
  @step()
  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  @step()
  async verifyPageUrl(url: string | RegExp): Promise<void> {
    await expect(this.page, 'URL is not correct').toHaveURL(url);
  }

  @step()
  async verifyElementsCount(elements: Locator, count: number): Promise<void> {
    await expect(elements, 'Elements count is not correct').toHaveCount(count);
  }
}
