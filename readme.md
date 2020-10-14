# Documentation redirect

The [nginx.conf](nginx.conf) file is Nginx configuration to redirect URLs from [docs.fingerprintjs.com](https://docs.fingerprintjs.com) to the new address: [dev.fingerprintjs.com/v2](https://dev.fingerprintjs.com).

The [nginx.original.conf](nginx.original.conf) file is the initial Nginx configuration.

## How to deploy

Replace the `/etc/nginx/nginx.conf` file content on the server with the content of [nginx.conf](nginx.conf) from this repository manually.
Then run the following command on the server:

```bash
sudo service nginx reload
```

## How to make a redirect server from scratch

Make an AWS EC2 Linux instance, the cheapest one will be fine, e.g. `t3a.nano`.

Connect to it via SSH, install Nginx and Certbot using the following commands:

```bash
# Nginx
sudo amazon-linux-extras install nginx1
sudo service nginx start

# Certbot
cd /tmp
wget -O epel.rpm –nv https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install -y ./epel.rpm
sudo yum install certbot python2-certbot-nginx.noarch
```

Add automatic certificate renewal to the cron tasks. Run:

```bash
sudo crontab -e
```

Add a line (leave a blank line at the end):

```
25 2 * * * /usr/bin/certbot renew --quiet
```

Save and quit the editor.

To obtain an SSL certificate, setup the domain DNS to point to the server, wait for the DNS records to get applied, then run:

```bash
sudo certbot certonly --nginx -d docs.fingerprintjs.com
```

Then [deploy the Nginx configuration](#how-to-deploy).
