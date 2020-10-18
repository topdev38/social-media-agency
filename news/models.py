from django.db import models
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from wagtail.search import index
from wagtail.core.models import Page
from wagtail.core.fields import RichTextField, StreamField
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from streams import blocks

class NewsListingPage(RoutablePageMixin, Page):

    template = "news/news_listing_page.html"

    custom_title = models.CharField(
        max_length=100,
        blank=False,
        null=False,
        help_text='Overwrites the default title',
    )
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
    ]
    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        all_posts = NewsDetailPage.objects.live().public()
        paginator = Paginator(all_posts, 9) # Show 9 resources per page
        page = request.GET.get('page')
        try:
            resources = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            resources = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            resources = paginator.page(paginator.num_pages)

        # make the variable 'resources' available on the template
        context['posts'] = resources
        return context
    @route(r'^lastest-news/$', name = 'latest_posts')
    def latest_news_posts(self, request, *args, **kwargs):
        context = self.get_context(request, *args, **kwargs)
        context["latest_posts"] = NewsDetailPage.objects.live().public()[:3]
        return render(request, "news/latest_news.html", context)
class NewsDetailPage(Page):
    custom_title = models.CharField(
        max_length=200,
        blank=False,
        null=False,
        help_text='Overwrites the default title',
    )
    news_image = models.ForeignKey(
        "wagtailimages.Image",
        blank=True,
        null=True,
        related_name="+",
        on_delete=models.SET_NULL,
    )
    summary = models.TextField(
        blank=False,
        null=False,
        help_text='Overwrites the default title',
        default="Input the summary...",
    )    
    content = RichTextField(default='Input here...')
    search_fields = Page.search_fields + [ # Inherit search_fields from Page
        index.SearchField('summary'),
        index.SearchField('content'),
    ]
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
        ImageChooserPanel("news_image"),
        FieldPanel("summary"),
        FieldPanel("content"),
    ]