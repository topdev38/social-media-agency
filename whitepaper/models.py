from django.db import models
from django.shortcuts import render

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.fields import RichTextField
from streams import blocks

class WhitePaperPage(Page):
    template = "whitepaper/whitepaper_page.html"
    custom_title = models.CharField(
        max_length=100,
        blank=False,
        null=False,
        help_text='Overwrites the default title',
    )
    head_image = models.ForeignKey(
        "wagtailimages.Image",
        blank=False,
        null=True,
        related_name="+",
        on_delete=models.SET_NULL,
    )
    summary = RichTextField(default='Input here...')
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
        ImageChooserPanel("head_image"),
        FieldPanel("summary"),
    ]