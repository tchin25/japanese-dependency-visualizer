FROM ubuntu:18.04

WORKDIR /app

RUN apt-get update && apt-get install -qq -y \
    build-essential \
    mecab \
    libmecab-dev \
    mecab-ipadic \
    mecab-ipadic-utf8 \
    mecab-jumandic \
    mecab-jumandic-utf8 \
    python3-pip
    
RUN pip3 install mecab-python3
RUN pip3 install Flask
RUN pip3 install flask-cors

COPY . /app

RUN tar xzvf CRF++-0.58.tar.gz
WORKDIR /app/CRF++-0.58
RUN ./configure
RUN make
RUN make install
RUN ldconfig

WORKDIR /app

RUN tar xjvf cabocha-0.69.tar.bz2
WORKDIR /app/cabocha-0.69
RUN ./configure --with-charset=utf8
RUN make
RUN make install

WORKDIR /app/cabocha-0.69/python
RUN python3 setup.py install

WORKDIR /usr/lib
RUN ln -s /usr/local/lib/libcabocha.so.5 libcabocha.so.5

WORKDIR /app
RUN rm CRF++-0.58.tar.gz
RUN rm -rf CRF++-0.58
RUN rm cabocha-0.69.tar.bz2
RUN rm -rf cabocha-0.69

ENV PYTHONIOENCODING=UTF-8

EXPOSE 5000

CMD [ "python3", "app.py" ]