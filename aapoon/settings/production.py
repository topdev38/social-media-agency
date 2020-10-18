from .base import *

DEBUG = True

SECRET_KEY = '!r-q65&abt%x7zdfl463_b!v1md6)um6kv@vo)_t#s0))aa0_@'



AWS_S3_BUCKET_NAME = 'zappa-a8pgot5be'
AWS_S3_BUCKET_NAME_STATIC = 'zappa-a8pgot5be'

DATABASES = {
    'default': {
        'ENGINE': 'django_s3_sqlite',
        'NAME': 'db.sqlite3',
        'BUCKET': AWS_S3_BUCKET_NAME,
    }
}


AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_S3_BUCKET_NAME
STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
STATICFILES_STORAGE = 'django_s3_storage.storage.ManifestStaticS3Storage'
# Don't do this! It's convenient but insecure to use the same 
# bucket for static files and media.
DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'
AWS_S3_BUCKET_AUTH = False

AWS_S3_MAX_AGE_SECONDS = 60 * 60 * 24 * 365





# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['3w1duiqlo9.execute-api.us-east-1.amazonaws.com']

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
