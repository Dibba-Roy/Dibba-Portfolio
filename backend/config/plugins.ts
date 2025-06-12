export default ({ env }: { env: any }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('CF_R2_ACCESS_KEY_ID'),
        secretAccessKey: env('CF_R2_SECRET_ACCESS_KEY'),
        region: env('CF_R2_REGION', 'auto'),
        endpoint: env('CF_R2_ENDPOINT'),        
        signatureVersion: 'v4',
        s3ForcePathStyle: false,               
        params: {
          Bucket: env('CF_R2_BUCKET'),
        },
      },
      actionOptions: {
        upload: {
          ACL: 'public-read',                   
        },
        delete: {},
      },
    },
  },
});
