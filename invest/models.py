from django.db import models

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.fields import RichTextField
from streams import blocks

class InvestPage(Page):
    template = "invest/invest_page.html"
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
    content_image = models.ForeignKey(
        "wagtailimages.Image",
        blank=False,
        null=True,
        related_name="+",
        on_delete=models.SET_NULL,
    )
    summary = RichTextField(default='Input here...')
    statistics = RichTextField(default='Input here...')
    bottom_text = RichTextField(default='Input here...')
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
        ImageChooserPanel("head_image"),
        ImageChooserPanel("content_image"),
        FieldPanel("summary"),
        FieldPanel("statistics"),
        FieldPanel("bottom_text"),
    ]