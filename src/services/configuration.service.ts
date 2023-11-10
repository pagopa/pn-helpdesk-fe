import { AppConfiguration, Configuration } from '../model/configuration';

export function getConfiguration(): AppConfiguration {
  const configurationFromFile = Configuration.get();
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
