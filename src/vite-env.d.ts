/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_FORMSPREE_WEBHOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
