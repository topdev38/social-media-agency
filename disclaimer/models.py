from django.db import models
from django.shortcuts import render

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.fields import RichTextField
from streams import blocks

class DisclaimerPage(Page):
    template = "disclaimer/disclaimer_page.html"
    summary = RichTextField(default='Input here...')
    content_panels = Page.content_panels + [
        FieldPanel("summary"),
    ]