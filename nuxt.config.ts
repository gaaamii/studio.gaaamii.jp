// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      title: "gaaamiiスタジオ",
    },
  },
  runtimeConfig: {
    public: {
      API_SERVER_ORIGIN: "https://api.gaaamii.jp",
    },
  },
  typescript: {
    strict: true,
  },
});
