import scrapy
from datetime import timedelta, date
import urllib2

class DeHerautSpider(scrapy.Spider):
    name = "deheraut"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(1, 13):
            for j in range(0,25):
                self.start_urls.append('https://www.herautonline.nl/?m=2014{0}?paged={1}'.format(str(i).zfill(2), j))
                
    def parse(self, response):
        for article in response.css('article'):
            url = article.css('h2 a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'deheraut.nl',
            'url': response.url,
            'datum': response.css('.tie-date ::text').extract_first(),
            'titel': response.css('h1 ::text').extract_first(),
            'tekst': (''.join(response.css(".entry > p ::text").extract())).replace("\t", "").replace("\n", "").replace("\r", "")
        }