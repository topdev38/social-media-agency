from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!r-q65&abt%x7zdfl463_b!v1md6)um6kv@vo)_t#s0))aa0_@'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static'),
]

# ManifestStaticFilesStorage is recommended in production, to prevent outdated
# Javascript / CSS assets being served from cache (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/2.2/ref/contrib/staticfiles/#manifeststaticfilesstorage
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'




# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '52.203.175.44'] 

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'

EMAIL_PORT = 587

EMAIL_HOST_USER = 'AKIAJPSJZGQDB6C66F7A'

EMAIL_HOST_PASSWORD = 'AotGAAbX6wuOaKL4LUkAFWI8IKCpQqfGlpgSAY5Nu0PO'

DEFAULT_FROM_EMAIL = 'admin@aapoon.com'


EMAIL_USE_TLS = True
EMAIL_USE_SSL = False


try:
    from .local import *
except ImportError:
    pass

