# Generated by Django 5.0.3 on 2024-04-28 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_alter_movie_movieid_alter_user_movieids'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='movieID',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
