# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 14:10:34 2022

@author: Daan
The goal is make an AI model that can predict the word you are trying to write
via autocomplete, without knowing any english words.
The model takes in the currently written letters and tries to predict what
the next letters will be.

input

"""

import numpy as np
import matplotlib.pyplot as plt
plt.close('all')

words = np.loadtxt('english-words/words.txt', dtype=str)
