# Documentation redirect

The [nginx.conf](nginx.conf) file is Nginx configuration to redirect URLs from [docs.fingerprintjs.com](https://docs.fingerprintjs.com) to the new address: [dev.fingerprintjs.com/v2](https://dev.fingerprintjs.com).

The [nginx.original.conf](nginx.original.conf) file is the initial Nginx configuration.

## How to deploy

Replace the `/etc/nginx/nginx.conf` file content on the server with the content of [nginx.conf](nginx.conf) from this repository manually.
