echo 'Building project in production environment...'
npm run build
echo 'Project built'

echo 'Compressing project files...'
tar -zcvf cropchat.tar.gz * > /dev/null 2>&1
echo 'Files compressed'

echo 'Copying project to staging server...'
scp gtd.io.tar.gz ubuntu@gtd.chbo.io:/home/ubuntu
ssh ubuntu@gtd.chbo.io rm -Rf /var/www/cropchat/current
ssh ubuntu@gtd.chbo.io mkdir /var/www/cropchat/current

echo 'Extracting files...'
ssh ubuntu@gtd.chbo.io tar -xvzf /home/ubuntu/cropchat.tar.gz -C /var/www/cropchat/current/ > /dev/null 2>&1
echo 'Files extracted'

ssh ubuntu@gtd.chbo.io ln -sf /var/www/cropchat/shared/config/config.js /var/www/cropchat/current/config/config.js

ssh ubuntu@gtd.chbo.io sudo supervisorctl restart cropchat
echo 'Deployed successfully!'
