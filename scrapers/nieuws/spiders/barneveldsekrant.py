import scrapy
from datetime import timedelta, date
import urllib2

class BarneveldsekrantSpider(scrapy.Spider):
    name = "barneveldsekrant"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(0, 128): # er zijn 1442188 artikelen
            self.start_urls.append('http://barneveldsekrant.nl/search/site?page={0}&f%5B0%5D=ds_created%3A%5B2014-01-01T00%3A00%3A00Z%20TO%202015-01-01T00%3A00%3A00Z%5D'.format(i))
        
    def parse(self, response):
        for article in response.css('.search-result'):
            url = article.css('a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'barneveldsekrant.nl',
            'url': response.url,
            'datum': response.css('.field-name-post-date-van-de-redactie ::text').extract_first().split(",")[0].replace("\n", ""),
            'titel': response.css('h1 ::text').extract_first().replace("\n", ""),
            'tekst': (''.join(response.css(".field-name-body p ::text").extract())).replace("\t", "").replace("\n", "").replace("\r", "")
        }