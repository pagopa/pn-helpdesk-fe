import { loadConfiguration, getConfiguration } from '../configuration.service';
import { Configuration } from '../../model/configuration';

describe('configuration.service', () => {
  it('loadConfiguration calls Configuration.load', async () => {
    const loadSpy = jest.spyOn(Configuration, 'load').mockResolvedValue();
    await loadConfiguration();
    expect(loadSpy).toHaveBeenCalled();
    loadSpy.mockRestore();
  });

  it('getConfiguration returns enriched configuration', () => {
    const config = getConfiguration();
    expect(config.AWS_PROJECT_REGION).toBe('eu-south-1');
    expect(config.AWS_COGNITO_REGION).toBe('eu-south-1');
    expect(config.API_ENDPOINT).toBe('https://api.bo.dev.notifichedigitali.it/log-extractor');
    expect(config.API_AGGREGATE_ENDPOINT).toBe(
      'https://webapi.dev.notifichedigitali.it/api-key-bo'
    );
  });
});
