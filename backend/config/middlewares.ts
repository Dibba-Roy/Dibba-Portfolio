export default [
  'strapi::errors',

  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173',            // local Vite dev
        'https://dibba-portfolio.pages.dev',// your Pages URL
      ],
      methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
      // allow all headers (or remove this line to use Strapi's default)
      headers: ['*'],
      keepHeaderOnError: true,
    },
  },

  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
