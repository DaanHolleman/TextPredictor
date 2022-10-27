# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 19:30:47 2022

@author: Daan

FEATURES
vector of length 16
Should take the following form: 
    0       desired word length
    1-15    letters in order of newest to oldest

"""
import cleanup_english as cen
import cleanup_elvish as cel
import numpy as np
import matplotlib.pyplot as plt
plt.close('all')

def build_frequency(words):
    all_chars = ' '
    for word in words:
        for char in word.lower():
            all_chars += char
    
    uni_ch, cnt_ch = np.unique(list(all_chars), return_counts=True)
    uni_ch = uni_ch[ cnt_ch.argsort() ]
    cnt_ch.sort()
    
    return uni_ch

def build_freq_map(freq : list):
    freq_map = { char:index for index, char in enumerate(freq) }
    return freq_map

def encode_word(word : str, freq_map : list, size : int = None):
    """
    Encode a word using a frequency of letters list.
    The letters will be represented by a byte that indicates the index
    of the letter in the `freq_map` list. 
    A single byte is used per character.
    !! The `freq_map` should not be longer than 256 entries !!
    """
    if len(freq_map) > 256:
        raise RuntimeError("Frequency list should not be longer than 256 entries.")
    
    # Set vector size
    if size is None: size = len(word)
    word_bytes = bytearray() # new empty bytearray
    
    # iterate over characters in word
    for char in word:
        index = freq_map[char]
        word_bytes.append( int(index).to_bytes(2, 'big') )
    return word_bytes

words = cel.get_words()
lengths = np.array([len(word) for word in words])
words = words[(lengths>=1.8) * (lengths<=10.0)]

freq = build_frequency(words)
freq_map = build_freq_map(freq)
print( encode_word('foobar', freq_map) )