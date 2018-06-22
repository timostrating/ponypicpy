import scrapy
from datetime import timedelta, date
import urllib2

class NDSpider(scrapy.Spider):
    name = "nd"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(0, int(11566 / 20)): # er zijn 11566 artikelen
            self.start_urls.append('https://www.nd.nl/zoeken-in.908675.lynkx?t=a&q=de&c=&dateFrom=1 januari 2014&dateTo=31 december 2014&pageStart908677=' + str(i*20 + 1))
        
    def parse(self, response):
        for article in response.css('.list__item'):
            url = "https://www.nd.nl/"+article.css('a.list__item__link').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'nd.nl',
            'url': response.url,
            'datum': response.css('.article-info__author-publication-date ::text').extract_first(),
            'titel': response.css('article header h1 ::text').extract_first(),
            'tekst': (''.join(response.css(".article__content__body ::text").extract())).replace("\t", "").replace("\n", "").replace("\r", "")
        }

    def make_requests_from_url(self, url):
        request = super(NDSpider, self).make_requests_from_url(url)
        request.cookies['ASP.NET_SessionId'] = "wbn2yihprronhy25sfiyr2j0" # You probably need to change this value, just copy this value from your own coockie
        request.cookies['cookieConsentAccepted'] = 1
        return request