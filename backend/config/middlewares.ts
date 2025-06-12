export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',

  // CORS must be an object to configure it
  {
    name: 'strapi::cors',
    config: {
      // allow your front-end origin(s):
      origin: [
        'http://localhost:5173',            
        'https://dibba-portfolio.pages.dev/',
      ],
      methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
      headers: ['Content-Type','Authorization','Accept'],
      keepHeaderOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
