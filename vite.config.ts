import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4175, strictPort: true },
  preview: { host: '127.0.0.1', port: 4175, strictPort: true },
  test: {
    maxWorkers: 2,
    testTimeout: 15_000,
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
