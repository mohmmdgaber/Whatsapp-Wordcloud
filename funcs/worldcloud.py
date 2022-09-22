
import operator
import os
import re
import string
from django.conf import settings
import nltk
from nltk.corpus import stopwords
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt
from bidi.algorithm import get_display
def two_names(filename):
  target_folder = settings.PULL_DRIVER_UPLOAD_PATH
  target = os.path.join(target_folder, filename)
  f = open(target, "r")
  z=dict()
  with open(target, encoding='utf8') as f:
    for x in f:
       if len(x.split('-'))>=2:
         if len(x.split('-')[1].split(':'))>=2:
           word=x.split('-')[1].split(':')[0]
           if word in z:
            z[word] += 1
           else:
             z[word] = 1
  sorted_dict1 = {}
  sorted_values1 = sorted(z.values()) # Sort the values
  for i in sorted_values1:
    for k in z.keys():
     if z[k] == i:
        sorted_dict1[k] = z[k]
        break
  twovalues=tuple((list(sorted_dict1.keys())[::-1])[0:2])
  f.close()
  return twovalues


def belong(line,firstname,secondname):
 if len(line.split('-'))>=2:
    if len(line.split('-')[1].split(':'))>=2:
      word=line.split('-')[1].split(':')[0]
      if(len(line.split('-')[1].split(':')[1].split(' '))>0):
       if(word==firstname):
        return "firstname"
       if(word==secondname):
        return "secondname"
      else:
        return "empty-message"

 return "non-name"

def stitchmes(lst,ind,line,firstname,secondname):
  persmsg=belong(line,firstname,secondname)
  if persmsg=="non-name":
    for i in range(ind,ind-10,-1):
      ans=belong(lst[i],firstname,secondname)
      if ans!="non-nam belong(lst[i])e":
        return ans

    
  return persmsg






def getchats(filename):
  print("start")
  usrs=two_names(filename)
  first=usrs[0]
  sec=usrs[1]
  target_folder = settings.PULL_DRIVER_UPLOAD_PATH
  target = os.path.join(target_folder, filename)
  f = open(target, "r")
  frstdic=dict()
  secdic=dict()
  with open(target, encoding='utf8') as f:
    lines=[]
    for line in f:
     lines.append(line.strip())
    for k,i in enumerate(lines):
      usr=stitchmes(lines,k,i,first,sec)
      if usr=="firstname":
        kkk=i.split('-')[1].split(':')[1].split(' ')
        for j in kkk:
           if fixxword(j) in frstdic:
            frstdic[fixxword(j)] += 1
           else:
            frstdic[fixxword(j)] = 1
      if usr=="secondname":
        kkk=i.split('-')[1].split(':')[1].split(' ')
        for j in kkk:
           if fixxword(j) in secdic:
            secdic[fixxword(j)] += 1
           else:
            secdic[fixxword(j)] = 1
  
  f.close()



  def getdic(usr):
    if usr=="firstname":
      return frstdic
    if usr=="secondname":
      return secdic
  return getdic
  




def fixxword(wrd):
    try:
      k=get_display(wrd).lower()
      return k
    except:
      return wrd.lower()
    

        

def filter_dics(filename):
  dics=getchats(filename)
  firs=dics("firstname")
  sec=dics("secondname")
  for i in stopwords.words('english'):
   try:
    firs.pop(i)
   except:
    print('',end='')
   try:
    sec.pop(i)
   except:
    print('',end='')
  unwanted=['okay','good','this','which','yeah','https','omitted','<Media','omitted>','','1','2','3','4','5','6','7','8','9','0','missed','voice','message','file','deleted','attached','http','call','shared']
  for i in unwanted:
   try:
    firs.pop(i)
   except:
    print('',end='')
   try:
    sec.pop(i)
   except:
    print('',end='')

  firs_sort=dict( sorted(firs.items(), key=operator.itemgetter(1),reverse=True))
  top_frst=list(firs_sort.keys())[0:4]
  sec_sort=dict(sorted(sec.items(), key=operator.itemgetter(1),reverse=True))
  top_sec=list(sec_sort.keys())[0:4]
  for i in top_frst:
    try:
     firs_sort.pop(i)
    except:
     print('',end='')
  for i in top_sec:
    try:
     sec_sort.pop(i)
    except:
     print('',end='')
  def getdic(usr):
    if usr=="firstname":
      return firs_sort
    if usr=="secondname":
      return sec_sort
  return getdic
  


def toWordCloud(filename,usr):
  dics=filter_dics(filename)
  dicc=dics(usr)
  # the regex used to detect words is a combination of normal words, ascii art, and emojis
  # 2+ consecutive letters (also include apostrophes), e.x It's
  normal_word = r"(?:\w[\w']+)"
  # 2+ consecutive punctuations, e.x. :)
  ascii_art = r"(?:[{punctuation}][{punctuation}]+)".format(punctuation=string.punctuation)
  # a single character that is not alpha_numeric or other ascii printable
  emoji = r"(?:[^\s])(?<![\w{ascii_printable}])".format(ascii_printable=string.printable)
  regexp = r"{normal_word}|{ascii_art}|{emoji}".format(normal_word=normal_word, ascii_art=ascii_art,emoji=emoji)
  font_path = os.path.join(settings.FONT_PATH, 'Symbola.otf')
  wordcloud = WordCloud(width = 2000, height = 2000,max_font_size=200,min_font_size=5, max_words=3000, background_color="white",font_path=font_path, regexp=regexp).generate_from_frequencies(dicc)
  plt.rcParams['figure.dpi'] = 500
  plt.tight_layout(pad=0)
  plt.axis("off")
  full_frame(10,10)
  plt.imshow(wordcloud, interpolation='antialiased')
  plt.savefig(os.path.join(settings.WORDCLOUD_SAVE_PATH,filename+'&&'+usr+'.png'))



def full_frame(width=None, height=None):
    import matplotlib as mpl
    mpl.rcParams['savefig.pad_inches'] = 0
    figsize = None if width is None else (width, height)
    fig = plt.figure(figsize=figsize)
    ax = plt.axes([0,0,1,1], frameon=False)
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)
    plt.autoscale(tight=True)