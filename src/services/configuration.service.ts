import { Configuration } from '../model/configuration';

interface AppConfigurationFromFile {
  AWS_USER_POOLS_ID: string;
  AWS_USER_POOLS_WEB_CLIENT_ID: string;
  API_DOMAIN: string;
  WEB_API_DOMAIN: string;
}

interface AppConfiguration extends AppConfigurationFromFile {
  AWS_PROJECT_REGION: string;
  AWS_COGNITO_REGION: string;
  API_ENDPOINT: string;
  API_AGGREGATE_ENDPOINT: string;
  API_PAPER_CHANNEL_ENDPOINT: string;
}

export function getConfiguration(): AppConfiguration {
  const configurationFromFile = Configuration.get<AppConfigurationFromFile>();
  return {
    ...configurationFromFile,
    AWS_PROJECT_REGION: 'eu-south-1',
    AWS_COGNITO_REGION: 'eu-south-1',
    API_ENDPOINT: `https://${configurationFromFile.API_DOMAIN}/log-extractor`,
    API_AGGREGATE_ENDPOINT: `https://${configurationFromFile.WEB_API_DOMAIN}/api-key-bo`,
    API_PAPER_CHANNEL_ENDPOINT: `https://${configurationFromFile.WEB_API_DOMAIN}`,
  };
}

export async function loadConfiguration(): Promise<void> {
  await Configuration.load();
  process.env.NODE_ENV === 'development' && console.log(getConfiguration());
}
