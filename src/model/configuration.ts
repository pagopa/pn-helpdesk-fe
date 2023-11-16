/* eslint-disable max-classes-per-file */

import { fetchConfiguration } from '../helpers/fetch.configuration.utility';

interface AppConfigurationFromFile {
  AWS_USER_POOLS_ID: string;
  AWS_USER_POOLS_WEB_CLIENT_ID: string;
  API_DOMAIN: string;
  WEB_API_DOMAIN: string;
}

export interface AppConfiguration extends AppConfigurationFromFile {
  AWS_PROJECT_REGION: string;
  AWS_COGNITO_REGION: string;
  API_ENDPOINT: string;
  API_AGGREGATE_ENDPOINT: string;
  API_PAPER_CHANNEL_ENDPOINT: string;
}

class ConfigurationError extends Error {}

export class Configuration {
  private static storedConfiguration: AppConfigurationFromFile | null = null;
  private static configurationLoadingExecuted = false;

  static clear() {
    this.storedConfiguration = null;
    this.configurationLoadingExecuted = false;
  }

  /**
   * Get current configuration of type <T> if loading has been already made, otherwise it throws a ConfigurationError
   * @returns Configuration of type T
   */
  static get(): AppConfigurationFromFile {
    if (!this.configurationLoadingExecuted) {
      throw new ConfigurationError(
        'loadConfiguration must be called before any call to getConfiguration'
      );
    } else if (this.storedConfiguration == null) {
      throw new ConfigurationError('error detected when loading configuration');
    }
    return this.storedConfiguration;
  }

  /**
   * This method loads and validates a Configuration of type T
   * @param validator for T, you should provide your validator based on your config object
   */
  static async load(): Promise<void> {
    if (this.configurationLoadingExecuted) {
      throw new ConfigurationError('Configuration should be loaded just once');
    }
    this.configurationLoadingExecuted = true;
    const readValue: AppConfigurationFromFile = await fetchConfiguration();
    this.storedConfiguration = readValue;
  }

  static setForTest(fakeConfiguration: AppConfigurationFromFile): void {
    this.configurationLoadingExecuted = true;
    this.storedConfiguration = fakeConfiguration;
  }
}
