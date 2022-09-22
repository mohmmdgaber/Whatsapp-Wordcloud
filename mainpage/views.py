from datetime import time
import json
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from django.http import JsonResponse
from django.shortcuts import redirect
from django.conf import settings
from funcs.worldcloud import toWordCloud
from funcs.worldcloud import two_names
class Ajaxhandler(View):
    def get(self,request,msg):
        is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
        if is_ajax:
            return HttpResponse("<strong>You are not logged.</strong>")
        if msg=='error' :
            strr="The .txt file format is not valid, Please pick an approbriate file"

        else:
            strr=''
        return render(request, "mainpage/mainpage.html",{'message':strr})
    def post(self,request,msg):
        print("posttt")
        upload_file = request.FILES['drive_file']
        print(upload_file)
        ret = {}
        if upload_file:
           target_folder = settings.PULL_DRIVER_UPLOAD_PATH
           print(target_folder)
           if not os.path.exists(target_folder):
              os.mkdir(target_folder)
           filename = request.POST['filename']
           target = os.path.join(target_folder, filename)
           with open(target, 'wb+') as dest:
            for c in upload_file.chunks():
             dest.write(c)
           ret['file_remote_path'] = target
        else:
          return HttpResponse(status=500)
        return JsonResponse(ret)


def redirectindex(request):
    return redirect('/None')

def index(request,msg):
    if request.method == "POST":
        print('reuqstttt')

    return render(request, "mainpage/test.html",{})

def wordcloud(request,msg):
    filename=msg+'.txt'
    pngname1=msg+'.txt&&firstname.png'
    pngname2=msg+'.txt&&secondname.png'
    txt = os.path.join(settings.PULL_DRIVER_UPLOAD_PATH, filename)
    photo1=os.path.join(settings.WORDCLOUD_SAVE_PATH, pngname1)
    photo2=os.path.join(settings.WORDCLOUD_SAVE_PATH, pngname2)
    if request.method == "POST":
        print('delete')
        os.remove(txt)
        os.remove(photo1)
        os.remove(photo2)
    print(filename)
    if (os.path.isfile(txt)):
     try:
      toWordCloud(filename,'firstname')
      toWordCloud(filename,'secondname')
     except:
      os.remove(txt)
      return redirect('/error')
    else:
     return redirect('/Ass')
    names=two_names(filename)
    name1=names[0]
    name2=names[1]

    return render(request, "mainpage/wordcloud.html",{'imageone':pngname1,'imagetwo':pngname2,'name1':name1,'name2':name2})





