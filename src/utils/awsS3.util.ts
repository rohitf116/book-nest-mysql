import * as aws from 'aws-sdk';
aws.config.update({
  accessKeyId: 'AKIA2XJYV2LPGUQQ2XYO',
  secretAccessKey: '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',
  region: 'ap-south-1',
});
//aa
export const uploadFile = async (file): Promise<string> => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link
    let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

    var uploadParams = {
      ACL: 'public-read',
      Bucket: 'book-management-test-api', //HERE
      Key: 'ecom/' + Date.now().toString() + file.originalname, //HERE
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      // console.log(data)
      // console.log("file uploaded succesfully")
      return resolve(data.Location);
    });
  });
};
