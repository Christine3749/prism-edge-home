/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_CONSOLE_URL?: string;
  readonly VITE_DESKTOP_DOWNLOAD_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
