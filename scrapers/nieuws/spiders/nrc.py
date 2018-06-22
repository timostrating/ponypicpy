import scrapy
from datetime import timedelta, date
import json

class NrcSpider(scrapy.Spider):
    name = "nrc"
    start_urls = []
    articles_in_one_API_call = 100

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        for i in range(0, int(63000 / self.articles_in_one_API_call)): # there are around 62000 articles 
            self.start_urls.append("https://www.nrc.nl/search/api/v1/article/search?fromDate=2014-01-01&toDate=2014-12-31&query=+&from={0}&size={1}".format(str(self.articles_in_one_API_call + i), str(self.articles_in_one_API_call)))

    def parse(self, response):
        jsonresponse = json.loads(response.body_as_unicode())
        for hit in jsonresponse["hits"]:    
            yield scrapy.Request(hit['source']['url'], callback=self.parse_article)

    def parse_article(self, response):
        yield {
            'naam': 'nrc.nl',
            'url': response.url,
            'datum': response.css('time').xpath('./@datetime').extract_first()[:10],
            'titel': response.css('.article__header h1 ::text').extract_first(),
            'tekst': (''.join(response.css(".content.article__content  ::text").extract())).replace("\t", "").replace("\n", "")
        }