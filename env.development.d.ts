/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_URL: string,
  readonly VITE_POST_URL: string,
  readonly VITE_REPLY_URL: string,
  readonly VITE_COMMENT_URL: string,
  readonly VITE_REPLY_URL: string,
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}