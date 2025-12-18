// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Live Server처럼 파일 변경을 확실히 감지하기 위해 polling을 사용합니다.
    // (특정 환경에서 파일 시스템 이벤트가 누락될 때 유용)
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
