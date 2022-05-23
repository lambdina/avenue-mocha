FROM python:3.8

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY . /app

RUN flask db init && flask db migrate

EXPOSE 5000

CMD [ "python3", "app.py" ]
