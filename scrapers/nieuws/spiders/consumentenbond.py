import scrapy
from datetime import timedelta, date
import urllib2

class ConsumentenbondSpider(scrapy.Spider):
    name = "consumentenbond"
    start_urls = ["https://www.consumentenbond.nl/nieuws/2014?pageSize=40000"]

    def parse(self, response):
        for article in response.css('.media-content.flex'):
            url = article.css('h3 a').xpath('@href').extract_first()
            if url is not None:
                yield scrapy.Request("https://www.consumentenbond.nl"+url, callback=self.parse_article)
    def parse_article(self, response):
        yield {
            'naam': 'consumentenbond.nl',
            'url': response.url,
            'datum': response.css('.flex-basis-12.small-12.fo.cb-grey.size-12 > p > span ::text').extract()[1],
            'titel': response.css('h1 ::text').extract_first(),
            'tekst': ''.join(response.css(".component.component-content ::text").extract())
        }
