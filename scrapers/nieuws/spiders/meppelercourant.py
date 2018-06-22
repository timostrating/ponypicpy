import scrapy
from datetime import timedelta, date
import urllib2

class MeppelercourantSpider(scrapy.Spider):
    name = "meppelercourant"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(1, 13):
            self.start_urls.append('https://www.meppelercourant.nl/zoeken/resultaat?p={0}'.format(i))
                
    def parse(self, response):
        for article in response.css('.comp-zoeken-sublist-container > div'):
            url = "https://www.meppelercourant.nl" + article.css('a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'meppelercourant.nl',
            'url': response.url,
            'datum': filter(None, response.css('.comp-nieuws-detail-credits ::text').extract_first().split(" "))[3:][:3].replace(",", " "),
            'titel': response.css('h1 ::text').extract_first(),
            'tekst': (''.join(response.css(".comp-nieuws-detail-text > p ::text").extract())).replace("\t", "").replace("\n", "").replace("\r", "")
        }

    def make_requests_from_url(self, url):
        request = super(MeppelercourantSpider, self).make_requests_from_url(url)
        request.cookies['PHPSESSID'] = "56cagigi64jq2afkbk8rcjpki4" # You probably need to change this value, just copy this value from your own coockie
        return request