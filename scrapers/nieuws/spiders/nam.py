import scrapy
from datetime import timedelta, date
import urllib2

class NosSpider(scrapy.Spider):
    name = "nam"
    start_urls = ["https://www.nam.nl/nieuws/2014.html"]

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def parse(self, response):
        for article in response.css('.promo-list__text'):
            url = article.css('a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'nam.nl',
            'url': response.url,
            'datum': response.css('.page-header__text .page-header__date ::text').extract_first(),
            'titel': response.css('.page-header__text p ::text').extract()[1],
            'tekst': (''.join(response.css("article ::text").extract())).replace("\t", "").replace("\n", "")
        }

