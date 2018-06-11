BOT_NAME = 'nieuws'

DOWNLOAD_DELAY = 2
CONCURRENT_REQUESTS_PER_DOMAIN = 8

SPIDER_MODULES = ['nieuws.spiders']    

DATABASE = {
    'drivername': 'mysql',
    'host': 'localhost',
    'port': '3306',
    'username': 'root',
    'password': 'lol123',
    'database': 'ponydb'
}

ITEM_PIPELINES = {
    'nieuws.pipelines.NieuwsPipeline': 1
}
