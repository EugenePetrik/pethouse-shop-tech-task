import type { APIResponse, Page, Route } from '@playwright/test';

export class ApiInterceptor {
  static async interceptAndModifyResponse<T, R>(
      page: Page,
      urlPattern: RegExp | string,
      transformFn: (json: T)=> { modifiedJson: T; result: R } | Promise<{ modifiedJson: T; result: R }>,
  ): Promise<()=> R> {
    let capturedResult: R;

    await page.route(urlPattern, async (route: Route) => {
      const response: APIResponse = await route.fetch();
      const json = (await response.json()) as T;

      const { modifiedJson, result } = await transformFn(json);

      await route.fulfill({
        response,
        json: modifiedJson,
      });

      if (Array.isArray(result) && result.length > 0) {
        capturedResult = result;
      } else if (!Array.isArray(result)) {
        capturedResult = result;
      }
    });

    return (): R => capturedResult;
  }
}
