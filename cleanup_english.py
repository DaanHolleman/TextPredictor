# -*- coding: utf-8 -*-
"""
Created on Wed Oct 26 14:10:34 2022

@author: Daan

Cleanup words from the words file
"""
import numpy as np

git_file = 'english-words/words.txt'
clean_words_english = 'clean_words_english.npy'
duplicates = 2
alphabet = 'abcdefghijklmnopqrstuvwxyz'

def cleanup(input_file : str, output_file : str, duplicates : int):
    # Create text wrappers
    try:
        wrap_in  = open(input_file, 'r')
        wrap_out = []
    except:
        print(f'Opening {input_file}, and {output_file} files failed.')
        return False
    
    # Initialize logic variables
    used = [None] * duplicates
    index = 0
    
    # Open text files
    print('Processing input file...')
    with wrap_in as file:
        for line in file:
            word = (line.rstrip()).lower()
            for char in word:
                if char not in alphabet:
                    break
            else:
                if word not in used:
                    wrap_out += [word.lower()]
                    used[index] = word
                    index = (index + 1) % len(used)
    
    np.save(clean_words_english, wrap_out)
    print(f'Words written to {output_file}')
    return True

def load_words(words_file : str):
    return np.load(words_file)

def get_words():
    """
    Get a list of valid words.
    words_file:     filename of valid words.
    git_file:       filename of backup list.
    duplicates:     number of duplicate words
    """
    try:
        words = load_words(clean_words_english)
    except:
        print('Loading Failed. Trying to create document.')
        if cleanup(git_file, clean_words_english, duplicates):
            words = load_words(clean_words_english)
        else:
            print('Could not create document.')
            return None
    return words

def main():
    global words
    words = get_words()

if __name__ == '__main__':
    main()
