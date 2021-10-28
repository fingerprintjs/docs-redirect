# Documentation redirect

The [cloudFront_function.js](cloudFront_function.js) file is a CloudFront function to redirect URLs from [docs.fingerprintjs.com](https://docs.fingerprintjs.com)
to the new address: [dev.fingerprintjs.com](https://dev.fingerprintjs.com).

## How to deploy

### Initial setup

Go to the AWS console, to [S3 management](https://s3.console.aws.amazon.com/s3/home).
Create an empty public bucket.

Go to [CloudFront functions management](https://console.aws.amazon.com/cloudfront/v3/home?#/functions).
Create a new function, type `Redirects from the old documentation to the new one (https://github.com/fingerprintjs/docs-redirect)` in the "Description" field.
Paste the function code from [cloudFront_function.js](cloudFront_function.js), click "Save changes".
Open the "Publish" tab and publish the function.

Go to [CloudFront management](https://console.aws.amazon.com/cloudfront/v3/home).
Create a new distribution. Leave everything default except:

- Choose the empty S3 bucket as the origin domain
- Type `docs.fingerprintjs.com` in the "Alternate domain name" field
- Create (if not created) and choose an SSL certificate for the domain in the "Custom SSL certificate" field
- Choose the CloudFront function created earlier in the "Viewer request" field
- Type `Redirects from the old documentation to the new one (https://github.com/fingerprintjs/docs-redirect)` in the "Description" field

### Function code update

1. Go to [CloudFront functions management](https://console.aws.amazon.com/cloudfront/v3/home?#/functions). Open the function.
2. Paste the function code from [cloudFront_function.js](cloudFront_function.js), click "Save changes".
3. Open the "Publish" tab and publish the function.
