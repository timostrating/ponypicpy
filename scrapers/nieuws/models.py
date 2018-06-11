from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL

import settings


DeclarativeBase = declarative_base()


def db_connect():
    """
    Performs database connection using database settings from settings.py.
    Returns sqlalchemy engine instance
    """
    return create_engine(URL(**settings.DATABASE))

def create_nieuws_table(engine):
    """"""
    DeclarativeBase.metadata.create_all(engine)

class Nieuws(DeclarativeBase):
    """Sqlalchemy nieuws model"""
    __tablename__ = "nieuws"

    id = Column(Integer, primary_key=True)
    naam = Column('naam', String)
    url = Column('url', String, nullable=True)
    datum = Column('datum', Date, nullable=True)
    titel = Column('titel', String, nullable=True)
    tekst = Column('tekst', String, nullable=True)
