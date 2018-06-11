from sqlalchemy.orm import sessionmaker
from models import Nieuws, db_connect, create_nieuws_table


class NieuwsPipeline(object):
    """Nieuws pipeline for storing scraped items in the database"""
    def __init__(self):
        """
        Initializes database connection and sessionmaker.
        Creates nieuws table.
        """
        engine = db_connect()
        create_nieuws_table(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        """Save nieuws in the database.

        This method is called for every item pipeline component.

        """
        session = self.Session()
        nieuws = Nieuws(**item)

        try:
            session.add(nieuws)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

        return item