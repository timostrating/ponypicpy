# from bs4 import BeautifulSoup

# import time
# import datetime

# # while n < len(programs):
# # time.sleep(2)
# # datetime.date(2014, 3, 13)

# url = "https://nos.nl/nieuws/archief/2014-01-01"

# html = urllib.urlopen(url)
# soup = BeautifulSoup(html, "lxml")

# with open("data/jhee.html", "wb") as code:
#     code.write(str(soup))


#     # ul.list-time
#         # li



import scrapy
from datetime import timedelta, date

class NosSpider(scrapy.Spider):
    name = "nos_spider"
    start_urls = []

    def daterange(self, start_date, end_date):
        for n in range(int ((end_date - start_date).days)):
            yield start_date + timedelta(n)

    def __init__(self):
        start_date = date(2014, 1, 1)
        end_date = date(2015, 1, 1)

        # self.start_urls.append("localhost/nos.html")
        for single_date in self.daterange(start_date, end_date):
            self.start_urls.append("https://nos.nl/nieuws/archief/" + single_date.strftime("%Y-%m-%d"))
 
    custom_settings = {
        "DOWNLOAD_DELAY": 1,
        "CONCURRENT_REQUESTS_PER_DOMAIN": 8
    }

    def parse(self, response):
        for nos in response.css('.list-time__item'):
            yield {
                'name': nos.css('.list-time__title ::text').extract_first(),
                'time': nos.css('.list-time__time ::text').extract_first(),
                'date': nos.css('time').xpath('./@datetime').extract_first()[:10],
            }