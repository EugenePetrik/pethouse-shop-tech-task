import { step } from '../config/reporters/step';
import { AppComponent } from './AppComponent';

export abstract class AppPage extends AppComponent {
  @step()
  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }
}
