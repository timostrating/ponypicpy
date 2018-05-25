import csv

words_where_we_are_looking_for = ["energie", "overstap"]

with open('test.csv', 'rb') as csvfile:
    csvreader = csv.DictReader(csvfile)
    sum = 0

    for row in csvreader:
        if any(ext in row["name"] for ext in words_where_we_are_looking_for):
            sum += 1
            print row["date"], row["name"]

print sum