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
    uni_ch = list(uni_ch)
    return uni_ch

def encode_word(word : str, freq : list, size : int = 16):
    """
    Encode a word using a frequency of letters list.
    The letters will be represented by a byte that indicates the index
    of the letter in the `freq` list. 
    A single byte is used per character.
    !! The `freq` should not be longer than 256 entries !!
    """
    if len(freq) > 256:
        raise RuntimeError("Frequency list should not be longer than 256 entries.")
    # Set vector size
    if size is None: size = len(word)
    # match desired size
    word = word[:size]
    word += ' ' * (size - len(word))
    # create integers corresponding to chars
    word_ints = [ freq.index(char) for char in word ]
    # create bytearray
    word_bytes = bytearray(word_ints) # new empty bytearray
    return word_bytes

def build_features(words : list, size : int = 16):
    N = len(words)
    freq = build_frequency(words)
    features = np.zeros((N,size))
    for index, word in enumerate(words):
        word_ints = np.array([int(b) for b in encode_word(word, freq, size) ])
        features[index] = word_ints
    return features

def save_features(fname : str, features : list):
    freq = build_frequency(words)
    for word in words:
        b_array = encode_word(word, freq)

def load_features(fname : str):
    freq = ...
    features = ...
    return words, freq


words = cel.get_words()
features = build_features(words, 16)
