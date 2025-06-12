module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('CF_R2_ACCESS_KEY_ID'),
        secretAccessKey: env('CF_R2_SECRET_ACCESS_KEY'),
        region: env('CF_R2_REGION', 'auto'),
        endpoint: env('CF_R2_ENDPOINT'),
        params: { Bucket: env('CF_R2_BUCKET') },
        signatureVersion: 'v4',
        forcePathStyle: true,
      },
      actionOptions: { upload: {}, delete: {} },
    },
  },
});
