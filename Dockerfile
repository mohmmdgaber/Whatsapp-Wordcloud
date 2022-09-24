
FROM ubuntu:18.04
FROM python:3.6
RUN apt-get update && \
      apt-get -y install sudo
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY requirements.txt /requirements.txt
ADD . /code
RUN
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt && \
    useradd -m  app |chpasswd && adduser --disabled-password --no-create-home app sudo 
ENV PATH="/py/bin:$PATH"

USER app
RUN ["python", "-c", "import nltk; nltk.download('stopwords')" ]
CMD ["python", "manage.py", "runserver"]


EXPOSE 5000