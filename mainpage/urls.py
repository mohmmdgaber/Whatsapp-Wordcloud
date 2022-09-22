
from django.urls import path
#now import the views.py file into this code
from mainpage.views import Ajaxhandler
from mainpage.views import redirectindex
from mainpage.views import index
from mainpage.views import wordcloud


urlpatterns=[
  path('',redirectindex),
  path('<str:msg>',Ajaxhandler.as_view()),
  path('redirect-success/<str:msg>',index),
    path('wordcloud/<str:msg>',wordcloud)
]