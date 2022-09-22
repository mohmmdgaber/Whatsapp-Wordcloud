
FROM python:3.6
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY requirements.txt /requirements.txt
ADD . /code
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt && \
    adduser --disabled-password --no-create-home app
ENV PATH="/py/bin:$PATH"
USER app
CMD ["python", "manage.py", "runserver"]
EXPOSE 5000