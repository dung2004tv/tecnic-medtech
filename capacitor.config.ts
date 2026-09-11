import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tecnicmedtech.app',
  appName: 'TECNIC MEDTECH',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
