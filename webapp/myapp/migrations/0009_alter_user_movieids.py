# Generated by Django 5.0.3 on 2024-04-28 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_alter_movie_movieid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='movieIDs',
            field=models.ManyToManyField(blank=True, related_name='users', to='myapp.movie'),
        ),
    ]