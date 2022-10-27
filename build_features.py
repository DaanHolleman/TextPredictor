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
    word += ' ' * int(size - len(word))
    # create integers corresponding to chars
    word_ints = [ freq.index(char) for char in word ]
    # create bytearray
    word_bytes = bytearray(word_ints) # new empty bytearray
    return word_bytes

def build_features(words : list, size : int = 16):
    N = len(words)
    freq = build_frequency(words)
    features = np.zeros((N,size), dtype=int)
    for index, word in enumerate(words):
        word_ints = np.array([int(b) for b in encode_word(word, freq, size) ])
        features[index] = word_ints
    return features, freq

def save_features(fname : str, features : list, freq : list):
    writer = open(fname, 'wb')
    # write freq key size to file
    freq_size = len(freq).to_bytes(2, 'big')
    writer.write(freq_size)
    # write freq entries to file
    for char in freq:
        writer.write(bytes(char, encoding='ascii'))
    # write features
    
    features_size = features.shape[0]
    
    writer.write(int(features_size).to_bytes(64, 'big'))
    
    for feature in features:
        for integer in feature:
            writer.write(int(integer).to_bytes(2, 'big'))
    writer.close()


def load_features(fname : str, size : int = 16):
    reader = open(fname, 'rb')
    
    # populate freq
    freq_size = int.from_bytes(reader.read(2), 'big')
    freq = [None]*freq_size
    for i in range(freq_size):
        freq[i] = reader.read(1).decode('ascii')
    
    # populate features
    features_size = int.from_bytes(reader.read(64), 'big')
    print(features_size)
    features = np.zeros((features_size, size), dtype=int)
    for i in range(features_size):
        feature = [None]*size
        for j in range(size):
            feature[j] = int.from_bytes(reader.read(2), 'big')
        features[i] = feature
    return features, freq

fname = 'elvish_features.bin'
words = cel.get_words()
features, freq = build_features(words, 16)
save_features(fname, features, freq)
l_feat, l_freq = load_features(fname, 16)
