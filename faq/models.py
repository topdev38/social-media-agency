from django.db import models


from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from streams import blocks


class FaqPage(Page):
    template = "faq/faq_page.html"
    faq_image = models.ForeignKey(
        "wagtailimages.Image",
        blank=False,
        null=True,
        related_name="+",
        on_delete=models.SET_NULL,
    )
    faqs = StreamField(
        [
            ("faqs", blocks.Faq())
        ],
        null=True,
        blank=True
    )
    
    content_panels = Page.content_panels + [
        ImageChooserPanel("faq_image"),
        StreamFieldPanel("faqs"),
    ]