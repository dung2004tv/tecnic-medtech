import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tecnicmedtech.app',
  appName: 'TECNIC Medtech',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
