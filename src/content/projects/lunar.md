---
title: "Continuous Control of Lunar Lander Using Deep Reinforcement Learning (TD3)"
date: 2026-06-24
description: "I built a reinforcement learning agent from scratch in PyTorch that learns to fly and land a rocket in a physics simulator."
category: "Reinforcement Learning"
coverImage: "/lunar/cover_landing.png"
---
# Teaching an Agent to Land a Rocket

**[View on GitHub](https://github.com/dexigaGT/TD3)**

We trained a reinforcement learning agent to solve the continuous control variant of Lunar Lander-v3 from Gymnasium. In this post, I'll walk you through how our agent successfully solves the environment using Twin Delayed Deep Deterministic Policy Gradient (TD3).

<video src="/lunar/solution_learning_progression.mp4" autoplay loop muted playsinline style="width: 100%; max-height: 70vh; object-fit: contain;"></video>

*The finished agent: three random drops, three clean landings on the pad.*

## Environment Dynamics

The task is treated as a Markov decision process with an 8-dimensional state space and a 2-dimensional continuous action space. The environment presents several unique challenges:

* **Dense Reward Shaping**: A dense shaping reward is paid on every step, encouraging the lander to act centered, slow, and upright.
* **Sparse Terminal Reward**: A sparse terminal reward of +100 for rest or -100 for crashing is only paid at the end.
* **Action Dead Zones**: Side boosters only fire beyond ±0.5, creating flat policy gradients near initialization.
* **Irreducible Variance**: Every reset applies a random initial force, meaning even a flawless policy occasionally draws an unrecoverable start.

## Hyperparameter Sensitivity & Behavioral Impact

We systematically swept three algorithmic hyperparameters against the defaults from Fujimoto et al. (2018) to observe how fine-tuning alters physical behavior in the environment:

### 1. Soft Target-Update Rate ($\tau$)
Controls target network dynamics and the speed at which the bootstrap target moves. 
* **Behavioral Effect**: High values lead to unstable, jerky corrections, causing the lander to overshoot its descent vector.

<video controls src="/lunar/compare_tau.mp4" style="width: 100%; max-height: 50vh; object-fit: contain;"></video>

### 2. Policy Delay ($d$)
Governs the actor-critic coupling by determining how often the actor updates relative to the critic.
* **Behavioral Effect**: Setting $d=1$ (no delay) causes a complete collapse. The actor perpetually chases transient critic errors, leading to wild spinning and rapid structural failure.

<video controls src="/lunar/compare_policy_delay.mp4" style="width: 100%; max-height: 50vh; object-fit: contain;"></video>

### 3. Exploration Noise ($\sigma$)
Acts as the sole exploration mechanism since the TD3 policy remains deterministic during training.
* **Behavioral Effect**: Insufficient noise ($\sigma = 0.05$) leaves the agent trapped inside action dead zones, unaware that firing the side boosters past the $\pm0.5$ threshold is a viable mechanism to stabilize lateral drift.

<video controls src="/lunar/compare_exploration_noise.mp4" style="width: 100%; max-height: 50vh; object-fit: contain;"></video>

---
## Final Agent
<video src="/lunar/solution_learning_progression.mp4" autoplay loop muted playsinline style="width: 100%; max-height: 70vh; object-fit: contain;"></video>

That progress shows up as a steady climb in its score over training, crossing the passing line of 200 partway through:

<img src="/lunar/fig_A_training.png" style="width: 100%; max-height: 70vh; object-fit: contain;" alt="Training curve climbing past the solved line" />

Tested on 100 fresh landings with the learning turned off, the finished agent averaged **241** — comfortably above passing. The occasional low score isn't a mistake by the agent; the simulator gives every drop a random shove, and once in a while it's simply unrecoverable. That's exactly why the bar is an *average* over 100 tries rather than a single perfect run.

<img src="/lunar/fig_B_eval.png" style="width: 100%; max-height: 70vh; object-fit: contain;" alt="100-episode evaluation, mostly above the passing line" />


---

