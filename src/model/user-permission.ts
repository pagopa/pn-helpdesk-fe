export enum Permission {
  LOG_EXTRACT_READ = 'log-extract-read',
  API_KEY_READ = 'api-key-read',
  API_KEY_WRITE = 'api-key-write',
  LOG_DOWNTIME_READ = 'log-downtime-read',
  LOG_DOWNTIME_WRITE = 'log-downtime-write',
  TENDER_READ = 'tender-read',
  TENDER_WRITE = 'tender-write',
};

export interface UserData {
  email?: string;
  permissions: Array<Permission>;
}
