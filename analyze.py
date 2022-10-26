# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 15:05:22 2022

@author: Daan
"""

import cleanup_english as cen
import cleanup_elvish as cel
import numpy as np
import matplotlib.pyplot as plt
plt.close('all')

def uniqueness(words):
    total_unique = len(np.unique(words))
    total_words = len(words)
    ratio_unique = total_unique / total_words
    print(f'Words list is {int(ratio_unique*10000)/100}% unique.')
    return ratio_unique == 1

def longest_word(words):
    longest = len(words[0])
    long_word = words[0]
    for word in words[1:]:
        if len(word) > longest:
            longest = len(word)
            long_word = word
    print(f'The longest word is {long_word} with {longest} letters.')
    return longest

def length_distribution(words):
    lengths = [ len(word) for word in words ]
    hist, bin_edges = np.histogram(lengths, 20)
    bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2
    bin_width = bin_edges[1] - bin_edges[0]
    
    mean = np.mean(lengths)
    std = np.std(lengths)
    
    print(f'95% Interval range: {mean-2*std:.1f} to {mean+2*std:.1f} letters.')
    
    plt.figure()
    plt.bar(bin_centers, hist, width=bin_width)
    ylim = plt.gca().get_ylim()
    plt.vlines(mean, *ylim, colors='r', zorder=30)
    plt.vlines([mean-std*2, mean+std*2], *ylim, colors='r', linestyles='--', zorder=30)
    return lengths

def analyze(words):
    uniqueness(words)
    longest_word(words)
    length_distribution(words)

eng_words = cen.get_words()
elv_words = cel.get_words()

print(f'{"":=^40}')
analyze(eng_words)
print(f'{"":.^40}')
analyze(elv_words)
