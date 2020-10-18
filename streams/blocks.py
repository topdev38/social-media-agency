from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock

class HomeCard(blocks.StructBlock):
    # Title and text and nothing else.
    
    title = blocks.CharBlock(required=True, help_text='Add your title')
    text = blocks.TextBlock(required=True, help_text='Add additional text')

    class Meta:
        template = "streams/home_card.html"
        icon = "edit"
        label = "Title & Text"
class HomeImageSlide(blocks.StructBlock):
    title = blocks.CharBlock(required=True, help_text='Add your title')
    subtitle = blocks.TextBlock(required=True, help_text='Add additional text')
    image = ImageChooserBlock(required=True, help_text='Upload slide image')
    class Meta:
        template = "streams/home_slide.html"
        icon = "edit"
        label = "Image & text"
class Faq(blocks.StructBlock):
    category = blocks.CharBlock(required=True, help_text='Add your title')
    content = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("question", blocks.CharBlock(required=True, max_length='200', help_text='Add your title')),
                ("answer", blocks.RichTextBlock()),
            ]
        )
    )
    class Meta:
        template = "streams/faq.html"
        icon = "placeholder"
        label = "FAQ"
