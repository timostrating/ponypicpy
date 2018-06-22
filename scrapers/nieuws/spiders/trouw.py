import scrapy
from datetime import timedelta, date
import urllib2

class TrouwSpider(scrapy.Spider):
    name = "trouw"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(0, 1442188): # er zijn 1442188 artikelen
            self.start_urls.append('https://www.trouw.nl/zoeken?query=de&sortMode=relevance&page=' + str(i))
        
    def parse(self, response):
        for article in response.css('.search-result__item'):
            if article.css(".search-result__item-description ::text").extract_first().split(" ")[2] == "2014":
                url = "https://www.trouw.nl"+article.css('a').xpath('@href').extract_first()
                yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'trouw.nl',
            'url': response.url,
            'datum': response.css('time').xpath('./@datetime').extract_first()[6:],
            'titel': response.css('h1 ::text').extract_first(),
            'tekst': (''.join(response.css(".article__content p::text").extract())).replace("\t", "").replace("\n", "").replace("\r", "")
        }