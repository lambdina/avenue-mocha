FROM python:3.8

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /backend/requirements.txt

WORKDIR /backend

RUN pip3 install -r requirements.txt

COPY . /backend

RUN flask db init && flask db migrate

CMD [ "python3", "app.py" ]
