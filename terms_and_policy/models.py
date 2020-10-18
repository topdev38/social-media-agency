from django.db import models
from django.shortcuts import render

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from streams import blocks

class TermsAndPolicyPage(Page):
    template = "terms_and_policy/terms_and_policy.html"
    custom_title = RichTextField(default='Input here...')
    summary = RichTextField(default='Input here...')
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
        FieldPanel("summary"),
    ]