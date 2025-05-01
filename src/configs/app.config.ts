export const appConfig = () => ({
  SERVER: {
    port: process.env.PORT || 3001,
  },

  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'Moctopus123',
    database: process.env.DB_DATABASE || 'db_user_ms',
  },
});
