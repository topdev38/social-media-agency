from django.db import models
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField, StreamField
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from streams import blocks

class BlogListingPage(RoutablePageMixin, Page):

    template = "blog/blog_listing_page.html"

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
        all_posts = BlogDetailPage.objects.live().public()
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
    @route(r'^latest/$', name = 'latest_posts')
    def latest_blog_posts(self, request, *args, **kwargs):
        context = self.get_context(request, *args, **kwargs)
        context["latest_posts"] = BlogDetailPage.objects.live().public()[:9]
        return render(request, "blog/latest_post.html", context)
class BlogDetailPage(Page):
    custom_title = models.CharField(
        max_length=200,
        blank=False,
        null=False,
        help_text='Overwrites the default title',
    )
    blog_image = models.ForeignKey(
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
    content_panels = Page.content_panels + [
        FieldPanel("custom_title"),
        ImageChooserPanel("blog_image"),
        FieldPanel("summary"),
        FieldPanel("content"),
    ]