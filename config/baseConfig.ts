import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const baseConfig: IBaseConfig = {
  WEB_URL: process.env.WEB_URL!,
};

interface IBaseConfig {
  WEB_URL: string;
}
