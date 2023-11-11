import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings
import uuid
import logging
import os
from django.core.files.storage import default_storage

logger = logging.getLogger(__name__)

def upload_to_s3(file, folder_name):
    try:
        s3 = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
       
        unique_filename = str(uuid.uuid4()) + os.path.splitext(file.name)[1]

        if unique_filename.endswith('.jpg') or unique_filename.endswith('.jpeg'):
         content_type = 'image/jpeg'
        elif unique_filename.endswith('.png'):
            content_type = 'image/png'

        extra_args = {'ContentType': content_type, 'ContentDisposition': 'inline'}
        
        s3.upload_fileobj(
            file, settings.AWS_STORAGE_BUCKET_NAME, f'{folder_name}/{unique_filename}',
            ExtraArgs=extra_args
        )

        return f'https://s3.amazonaws.com/{settings.AWS_STORAGE_BUCKET_NAME}/{folder_name}/{unique_filename}'



    except NoCredentialsError:
        logger.error('Credenciales de AWS no disponibles')
        raise Exception('Credenciales de AWS no disponibles')
    except Exception as e:
        logger.error(f"Error al cargar el archivo en S3: {str(e)}")
        raise Exception(f"Error al cargar el archivo en S3: {str(e)}")
