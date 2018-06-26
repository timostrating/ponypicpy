import scrapy
from datetime import timedelta, date
import urllib2

class NosSpider(scrapy.Spider):
    name = "nos"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        start_date = date(2014, 6, 1)
        end_date = date(2014, 7, 1)

        for single_date in self.daterange(start_date, end_date):
            self.start_urls.append("https://nos.nl/nieuws/archief/" + single_date.strftime("%Y-%m-%d"))

    def parse(self, response):
        for nos in response.css('.list-time__item'):
            url = 'https://nos.nl' + nos.css('a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'nos.nl',
            'url': response.url,
            'datum': response.css('time').xpath('./@datetime').extract_first()[:10],
            'titel': response.css('.article__title ::text').extract_first(),
            'tekst': ''.join(response.css(".article_textwrap ::text").extract())
        }