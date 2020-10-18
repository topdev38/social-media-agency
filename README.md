# Social Media website

Tech Stack:
Django, Wagtail, Jinja Template

# django-channels-daphne-nginx
Deploy Django(+Channels + Celery + Django REST Framework) project on Ubuntu 20.04 with NGINX

1. Install asdf (version management)
- sudo apt update
 https://asdf-vm.com/#/core-manage-asdf
- Run `git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.0`
- Add the below command into the ~/.bashrc
 * . $HOME/.asdf/asdf.sh
 * . $HOME/.asdf/completions/asdf.bash
- Restart the bash
- Run `asdf reshim`

2. install python plugin into 'asdf'
 * Run `asdf plugin add python`
 * Run `asdf install python <version>` e.g. `asdf install python 3.7.6`
 
 If python plugin doesn't install properly, check this url
 https://github.com/pyenv/pyenv/wiki/Common-build-problems
 
 
 * Check if python 3.7.6 is installed - `python --version`
3. Download the project from the github and Run it as development server
 * `git clone <git_url>`
 * Navigate into the project dir.
 * Create Virtual Environment and activate the virtualenv
   `python -m venv venv`
   `source venv/bin/activate`
 * Install the dependencies from 'requirements.txt'
  `pip install -r requirements.txt`
 * Migrate the database and run the project to see if the dependencies are installed successfully.
  `python manage.py migrate`
  `python manage.py runserver`
  
 
 4. Install guicorn and run the project by using gunicorn
  * Run `pip install gunicorn`
  * Run `sudo nano /etc/systemd/system/gunicorn.service)
  * Write the below code into the gunicorn.service file
    ```
    [Unit]
       Description=gunicorn daemon
       After=network.target

    [Service]
       User=ubuntu
       Group=www-data
       WorkingDirectory=/home/ubuntu/<project_dir>
       ExecStart=/home/ubuntu/<project_dir>/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/ubuntu/<project_dir>/gunicorn.sock <project_name>.wsgi:application

    [Install]
       WantedBy=multi-user.target

    ```
   * `sudo systemctl daemon-reload`
   * `sudo systemctl start gunicorn.service`
   * `sudo systemctl enable gunicorn.service`
   
   Check if the `gunicorn.sock` file exists in the project directory
 
 7. NGINX configuration
   * `sudo nano /etc/nginx/sites-available`
   * Add the following
     ```
     server {
         listen 80;
         server_name ;

         location = /favicon.ico { access_log off; log_not_found off; }
         location /static/ {
             root /home/ubuntu;
         }

         location / {
             include proxy_params;
             proxy_pass http://unix:/home/ubuntu/<project_dir>/gunicorn.sock;
         }
     }
     ```
Front-end and back-end designed with Django for www.aapoon.com
