
FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY requirements.txt /requirements.txt
ADD . /code
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt && \
    adduser --disabled-password --no-create-home app
RUN /py/bin/python -m pip install "pymongo[srv]"
ENV PATH="/py/bin:$PATH"
USER app
CMD ["python", "manage.py", "runserver"]
EXPOSE 5000