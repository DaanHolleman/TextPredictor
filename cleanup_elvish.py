# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 15:39:01 2022

@author: Daan
"""

from bs4 import BeautifulSoup
import numpy as np
import os

clean_words_elvish = 'clean_words_elvish.npy'

def get_files():
    out_files = []
    root = os.getcwd() + ''
    for path, subdirs, files in os.walk(root):
        for name in files:
            out_files += [path + '\\' + name]
            os.path.join(path, name)
    return out_files

def match(control, target : list, strict : bool = False, inverse : bool = False):
    control = control if type(control) is list else [control]
    found = []
    for entry in target:
        checklist = [ item in entry for item in control ]
        if (strict and all(checklist)) or (not strict and any(checklist)):
            found += [entry]
    if inverse:
        anti = []
        for entry in target:
            if entry not in found:
                anti += [entry]
        found = anti
    return found

def filelines(filename):
    with open(filename, 'r', encoding='utf8') as file:
        lines = [line.rstrip() for line in file]
    return lines

def get_words():
    try:
        clean_words = np.load(clean_words_elvish)
    except:
        print('Failed to load elvish words!')
        files = get_files()
        files = match('\\words\\', files, True)
        
        span_filter = lambda tag: tag.name == 'span' and tag.get('class') == ['primary']
        nav_filter  = lambda tag: tag.name == 'span' and tag.get('class') == ['hierarchy-nav']
        keep = ['Words', 'Names', 'Roots', 'Phrases']
        
        
        all_words = []
        for file in files:
            soup = BeautifulSoup(open(file, 'r', encoding='utf8').read(), 'html.parser')
            
            nav_names = [ span.contents[1].text for span in soup.find_all(nav_filter)]
            match_length = len(match(keep, nav_names))
            
            if match_length == 0:
                continue
            
            spans = []
            for span in soup.find_all(span_filter):
                try:
                    content = str(span.contents[0])
                    if '<a href=' not in content:
                        spans += [content]
                except:
                    pass
            all_words += [str(unique) for unique in np.unique(spans)]
            print(len(all_words), end=' ')
        
        print('Getting unique characters...')
        all_chars = ''
        for word in all_words:
            all_chars += word
        chars_unique, chars_count = np.unique(list(all_chars), return_counts=True)
        
        # filter characters
        ignore = chars_unique[chars_count < 5]
        destroyed = ' ' # dangerous ascii character....
        maps = [['A','ÀÁÂÆĀĂ'],
                ['C','Ċ'],
                ['E','ÈÉÊËĒĔƎ'],
                ['I','ÌÍÎĪĬ'],
                ['D','Ð'],
                ['N','ÑŇṆ'],
                ['O','ÒÓÔŌŎ'],
                ['U','ÙÚÛŪ'],
                ['R','ŘṘṚ'],
                ['S','ŠṢ'],
                ['L','Ḷ'],
                ['M','Ṃ'],
                ['W','ẆẈ'],
                ['Y','Ẏ'],
                ['a','àáâãäæāăằ'],
                ['e','èéêëēĕėęḗẹ'],
                ['i','ìíîïīĭ'],
                ['d','ðđ'],
                ['o','òóôõöōŏœṓọ'],
                ['n','ñňṇ'],
                ['u','ùúûüũūŭ'],
                ['y','ýŷẏ'],
                ['ng','Ŋŋ'],
                ['r','ŕřṛṝ'],
                ['s','šṣ'],
                ['l','ḷḹ'],
                ['m','ṃ'],
                ['w','ẇẉ'],
                ['z','ẓ']]
        alphabet = 'abcdefghijklmnopqrstuvwxyz'
        
        # cleanup words
        clean_words = []
        for i in range(len(all_words)):
            word = all_words[i]
            
            for letter, utf in maps:
                for char in utf:
                    word = word.replace(char, letter)
            
            if any([ic in word for ic in ignore]):
                continue
            
            word = word.encode('ascii', 'ignore').decode('utf-8')
            word.replace(destroyed,'')
            if not all([char.lower() in alphabet for char in word]):
                continue
            
            clean_words += [word.lower()]
        clean_words = np.unique(clean_words)
        
        # write to file
        np.save(clean_words_elvish, clean_words)
        
    return clean_words

def main():
    global words
    words = get_words()

if __name__ == '__main__':
    main()