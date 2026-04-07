import { AppConfiguration, Configuration } from '../model/configuration';

export function getConfiguration(): AppConfiguration {
  const configurationFromFile = Configuration.get();
  const region = 'eu-south-1';
  return {
    ...configurationFromFile,
    AWS_PROJECT_REGION: region,
    AWS_COGNITO_REGION: region,
    API_ENDPOINT: `https://${configurationFromFile.API_DOMAIN}/log-extractor`,
    API_AGGREGATE_ENDPOINT: `https://${configurationFromFile.WEB_API_DOMAIN}/api-key-bo`,
    API_PAPER_CHANNEL_ENDPOINT: `https://${configurationFromFile.WEB_API_DOMAIN}`,
    API_DOWNTIME_LOGS_ENDPOINT: `https://${configurationFromFile.WEB_API_DOMAIN}`,
  };
}

export async function loadConfiguration(): Promise<void> {
  await Configuration.load();
  process.env.NODE_ENV === 'development' && console.log(getConfiguration());
}
