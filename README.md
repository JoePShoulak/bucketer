# Bucketer

## Overview

The Bucketer is a custom block that will remove the liquid from a full Cauldron above it and output the bucketed version of that liquid. This allows us to convert our Dripstone Lava Farms into Dripstone Lava Bucket Farms, enabling closed-loop infinite-fuel auto smelters. 

## Crafting

The Bucketer requires:

4x Smooth Stone
2x Redstone Torch
1x Dropper
1x Comparator
1x Bucket

## Tl;dr
The shortest way to get this block working is:
1. Place it under a cauldron that is part of an active Dripstone Lava Farm
2. Place a Hopper on any side but the face and make sure it has Buckets
3. Place a Hopper underneath it

Note: You can also place a chest in front instead of a hopper below, and if you do neither it will just dispense it.

## Behavior

Two sets of checks must pass for the Bucketer to produce a Bucketed Liquid. If a Bucketer can not produce an output it will never take an input. It is therefore impossible (at least, it should be) to lose resources with the Bucketer.

These checks happen once every 5 in-game ticks. 

### Input Rules

* **Liquid**: There must be a Cauldron immediately above the Bucketer which is full (fill_level of 6)
* **Buckets**: There must be a Hopper pointing toward any side of the Bucketer _except the Face Side_, and that Hopper must contain at least one Bucket.

If both of the Input Rules are met, the Bucketer will continue to the Output Rules (this is not when we consume those input resources).

## Output Rules

There are four Output Modes: **Hopper**, **Furnace**, **Chest**, and **Dispense**.

* **Hopper Mode**: If there is a Hopper beneath the Bucketer, the Bucketer will be in Hopper Mode. If the Hopper has room, a Bucketed Liquid will be outputted to the Hopper.   
* **Furnace Mode**: If there is a Furnace (...or Blast Furnace, or Smoker) in front of the Bucketer, the Bucketer will be in Furnace Mode. If the Hopper has room, _and the Bucketed Liquid is Lava_, a Bucketed Liquid will be outputted to the Hop.  
* **Chest Mode**: If there is a Chest (...or Barrel, Hopper, or Shulker Chest) in front of the Bucketer, the Bucketer will be in Chest Mode. If the Chest has room, a Bucketed Liquid will be outputted to the Hop.  
* **Dispense Mode**: If there is no container below or in front of the Bucketer, but there is Air or Water in front of the Bucketer, it will be in Dispense Mode and will spawn the Bucketed Liquid into the space in front of it. It will not dispense the Bucketed Liquid into Lava (although maybe it should).

## Usage

There are three items the Bucketer can produce: Lava Buckets, Water Buckets, and Powdered Snow Buckets. Since Water Buckets are _trivially_ simple to create, and Powdered Snow isn't in short supply any place you find it, this add-on is most useful for working with Lava Buckets. Specifically, when placed under the Cauldron of a Dripstone Lava Farm and provided an Input Hopper with Buckets, it will begin to produce Lava Buckets. This can be used to convert a Dripstone Lava Farm into a Dripstone Lava Bucket Farm. 

Two more sub-devices must be created to make use of the Lava Bucket Farm in a meaningful way. 

An Item filter on the output of a nearby Auto-Furnace, separating Empty Buckets from all other outputs (send these to your Bucker Input Hopper)  
An Item Elevator to return the Lava Buckets to the Furnace, made with either Water or Droppers (send these to your Furnace Side Input)
