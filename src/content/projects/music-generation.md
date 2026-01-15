---
title: "Music Generation Using LSTM Neural Networks"
date: 2024-05-07
description: "An advanced pop music generation algorithm built with LSTM neural networks. A collaborative project focusing on improvements to baseline models and exploring parameter optimization for creative music synthesis."
category: "Machine Learning"
coverImage: "/music-generation/midi.jpg"
---

# Music Generation Using LSTM Neural Networks

**By:** Austin Blanchard, David Exiga, Kris Killinger, Neil Narvekar, Dat Nguyen, and Sofia Valdez

**[Read on Medium with Music Examples](https://david-exiga.medium.com/music-generation-using-lstm-neural-networks-44f6780a4c5)**

---

## Introduction

This pop music generation project showcases the application of LSTM neural networks to creative music synthesis. Our team, composed of music enthusiasts, built this model on top of an existing LSTM baseline created by Sigurður Skúli. This project primarily focuses on our improvements to his model and explores how changing different parameters lead to different musical outputs.

For a comprehensive introduction on how LSTMs work and the baseline model architecture, check out [Skuli's original article on Medium](https://towardsdatascience.com/how-to-generate-music-using-a-lstm-neural-network-in-keras-68786834d4c5).

## Motivation

The rise of artificial intelligence has increased computational creativity, aiding humans in tasks such as architectural design, art, writing novels, and music generation. Our team identified a gap in existing music generation models—most were rudimentary, generating only classical music that tended to continuously repeat the same note.

We decided to take on the challenge of creating a more advanced **pop music generation algorithm** that could produce diverse, creative compositions.

## Music Terminology

Before implementing our model, we familiarized ourselves with essential music terminology:

- **Note**: A symbolic representation of a musical sound comprised of:
  - **Duration**: A note's length (e.g., quarter note, eighth note)
  - **Pitch**: A note's frequency corresponding to a musical note name (e.g., A4 ~ 440Hz)
  - **Dynamics**: A note's loudness denoted in decimals

- **Chord**: Three or more notes played simultaneously
- **Rest**: The interval of silence between notes or chords

## Software Stack

We utilized the following technologies:

- **MIDI Format**: A standardized format for saving and transporting music sequences
- **Music21 Python Toolkit**: For easy reading, writing, and manipulation of notes in MIDI format
- **Libraries**: `glob`, `pickle`, and `keras` for file I/O and LSTM implementation
- **Google Colab**: With GPU acceleration for efficient model training

## Training Data

Our training dataset consisted of **100 pop songs** in MIDI format. All files were:
- In the same key
- At the same tempo
- Encoded with pitch, duration, and volume information

**Example training songs:** Shake It Off, Dancing Queen, Die Young

## Training Times & Infrastructure

Training these models was computationally expensive. With a basic LSTM network on standard Google Colab:
- **Original setup**: ~30 minutes per epoch for 200 epochs = **4 days per model**
- **With Colab Pro + GPU**: 30 seconds to 5 minutes per epoch = **~2 hours per model**

This infrastructure decision significantly impacted our ability to tune hyperparameters. Instead of exhaustive grid searches, we made larger parameter changes to identify promising directions.

## Algorithm Explanation

Our training and generation algorithm closely followed Skuli's approach, with two main phases:

### Phase 1: Training

The training process begins by parsing the MIDI dataset:

1. Loop through each file in the dataset
2. Use Music21 to extract notes and chords
3. Create an ordered list of all notes and chords found

We then transform this list into sequences suitable for neural network training:

**Example transformation:**
- Original sequence: A, B, C, D, E, F
- Sequence length: 2
- Training pairs:
  - X₁ = [A, B] → y₁ = C
  - X₂ = [D, E] → y₂ = F

This creates independent variables (features) with corresponding dependent variables (targets) for the LSTM to learn from.

### Phase 2: Generation

Once trained, the model generates new sequences by:
1. Starting with a seed sequence of notes
2. Using the model to predict the next note
3. Appending the prediction to the sequence
4. Using the updated sequence to predict the next note
5. Repeating until the desired length is reached

## Key Findings

Through systematic experimentation with various parameters and architectures, we explored:

- **Sequence length optimization**: Finding the ideal context window for the model
- **Layer depth and units**: Balancing model complexity with training efficiency
- **Dropout and regularization**: Preventing overfitting on the limited training data
- **Learning rate and decay**: Optimizing convergence speed and stability

## Audio Examples

Listen to generated music samples from our model:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/JHCKurVwENA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-full-screen" allowfullscreen></iframe>

<iframe width="100%" height="315" src="https://www.youtube.com/embed/X6YNEPHMIa4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-full-screen" allowfullscreen></iframe>

## Conclusion

This project demonstrates the feasibility of generating creative pop music using LSTM neural networks. While challenging due to computational constraints, our work shows that with proper parameter tuning and sufficient training data, neural networks can produce diverse and musically coherent compositions.
