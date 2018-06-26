import scrapy
from datetime import timedelta, date
import dateparser


class ParoolSpider(scrapy.Spider):
    name = "parool"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        start_date = date(2014, 6, 1)
        end_date = date(2014, 7, 1)

        for single_date in self.daterange(start_date, end_date):
            self.start_urls.append("https://www.parool.nl/archief/detail/" + single_date.strftime("%d%m%Y"))
        
    def parse(self, response):
        for article in response.css('article'):
            url = article.css('a').xpath('@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'parool.nl',
            'url': response.url,
            'datum': dateparser.parse(response.css('footer time').xpath('./@datetime').extract_first().split(" ")[0]),
            'titel': response.css('.article__header .article__title ::text').extract_first(),
            'tekst': (''.join(response.css(".article__wrapper ::text").extract())).replace("\t", "").replace("\n", "")
        }