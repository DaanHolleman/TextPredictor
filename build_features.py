# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 19:30:47 2022

@author: Daan

train on each word:
    

"""
import cleanup_english as cen
import cleanup_elvish as cel
import numpy as np
import matplotlib.pyplot as plt
plt.close('all')

def build_frequency(words):
    all_chars = ''
    for word in words:
        for char in word.lower():
            all_chars += char
    
    uni_ch, cnt_ch = np.unique(list(all_chars), return_counts=True)
    uni_ch = uni_ch[ cnt_ch.argsort() ]
    cnt_ch.sort()
    
    return uni_ch[::-1]

words = cel.get_words()
lengths = np.array([len(word) for word in words])
words = words[(lengths>=1.8) * (lengths<=10.0)]

freq = build_frequency(words)
