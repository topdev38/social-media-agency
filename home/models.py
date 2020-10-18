from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField, StreamField
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from streams import blocks


class HomePage(Page):

    slides = StreamField(
        [
            ("image_and_text", blocks.HomeImageSlide())
        ],
        null=True,
        blank=True
    )
    video_section_subscribe = RichTextField(default='Input here...')
    card_title = models.CharField(max_length=100, blank=False, null=True, default='Title')
    cards = StreamField(
        [
            ("title_and_text", blocks.HomeCard())
        ],
        null=True,
        blank=True
    ) 
    content_panels = Page.content_panels + [
        StreamFieldPanel("slides"),
        FieldPanel("video_section_subscribe"),
        FieldPanel("card_title"),
        StreamFieldPanel("cards"),
    ]
class Meta:
    verbose_name = "Home page"
    verbose_name_plural = "Home pages"