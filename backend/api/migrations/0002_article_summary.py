# Generated by Django 4.1.3 on 2024-05-22 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="article",
            name="summary",
            field=models.TextField(default="temp"),
            preserve_default=False,
        ),
    ]
