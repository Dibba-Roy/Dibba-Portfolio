module.exports = ({ env }) => {
  // debug logging (you can remove this once it's working)
  console.log('🔑 R2 creds',
    'ACCESS_KEY_ID=', process.env.CF_R2_ACCESS_KEY_ID,
    'SECRET=', !!process.env.CF_R2_SECRET_ACCESS_KEY,
    'BUCKET=', process.env.CF_R2_BUCKET,
    'ENDPOINT=', process.env.CF_R2_ENDPOINT,
    'REGION=', process.env.CF_R2_REGION,
  );

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          // Explicitly nest under "credentials"
          credentials: {
            accessKeyId:     env('CF_R2_ACCESS_KEY_ID'),
            secretAccessKey: env('CF_R2_SECRET_ACCESS_KEY'),
          },
          region:        env('CF_R2_REGION', 'auto'),
          endpoint:      env('CF_R2_ENDPOINT'),
          baseUrl:         env('CF_R2_PUBLIC_URL'),
          params:        { Bucket: env('CF_R2_BUCKET') },
          signatureVersion: 'v4',
          s3ForcePathStyle:   true,
        },
        actionOptions: {
          upload: {
            // make objects publicly readable so the admin UI can fetch them
            ACL: 'public-read',
          },
          delete: {},
        },
      },
    },
  };
};
