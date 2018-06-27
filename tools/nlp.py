# -*- coding: utf-8 -*-
# Some of the strings that get scraped require utf-8

# pip install pattern
from pattern.nl import sentiment

neutralText = "Het is een vrij rustige dag."
positiveText = "Het product is mij zeer goed bevallen."
negativeText = "Diepbedroeft over de zeer gebrekkige service van deze onervaren werknemer."

text = "De Indiase diplomate die het middelpunt vormde van een hoogoplopende ruzie tussen de VS en India, heeft de VS verlaten. De Amerikaanse autoriteiten vroegen Devyani Khobragade, plaatsvervangend consul in New York, te vertrekken nadat ze officieel in staat van beschuldiging was gesteld wegens visumfraude. Het Indiase ministerie van Buitenlandse Zaken maakte kort daarop bekend dat de diplomate wordt overgeplaatst naar het departement in New Delhi. OnderbetaaldEen rechtbank in New York oordeelde gisteren dat Khobragade valse informatie had gegeven bij de aanvraag van een visum voor haar Indiase huishoudelijke hulp. Ook zou ze hebben verdoezeld dat deze hulp minder betaald kreeg dan het Amerikaanse wettelijk minimumloon. Khobragade's arrestatie en tijdelijke opsluiting, vorige week, wekten grote verontwaardiging in India. Boze Indiërs eisten een boycot van Amerikaanse producten in India."

# Classify the text. The function returns 2 values.
# sentiment(text) returns (polarity, subjectivity).
sentimentAnalyse = sentiment(" 10 Verschillen")

print sentimentAnalyse

# A text is quickly classified as negative. Because of that, we need to
# use a threshold to classify the text as positive, negative, or neutral.
# predictedSentiment = 'positive#' if sentimentAnalyse[0] > 0 else 'negative'
predictedSentiment = 'neutral'
if sentimentAnalyse[0] > 0.4:
    predictedSentiment = 'positive'
elif sentimentAnalyse[0] < -0.2:
    predictedSentiment = 'negative'

predictionSummary = "The provided text is classified as " + str(predictedSentiment) + ' which a score of ' + str(sentimentAnalyse[0])

print predictionSummary