export default ({ env }) => {
  const client = 'postgres';

  return {
    connection: {
      client,
      connection: {
        connectionString: env('DATABASE_URL'),
        // Always use TLS, but skip validation only if you’re intentionally
        // using a self-signed cert (e.g. Render’s default).
        ssl: { rejectUnauthorized: false },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
