---
title: "Ecosofia: Environmental monitoring in Patagonia"
slug: "ecosofia-environmental-monitoring-in-patagonia"
date: "2023-04-23 23:37:28"
featuredImage: "./media/firefly_photofrom-the-distance-you-can-see-a-small-solar-powered-environmental-measuring-antena-with-a-macbook-in-patagonia_art_82344si.jpg"
categories: ["Hardware", "Hobby"]
---

# Ecosofia: Environmental monitoring in Patagonia

Project along with Javiera de la Fuente, 2017 - 2018

Grants | Funds: RAIN Icubo UDD

Low cost modular environmental measuring system, sun powered and remote, adaptable to the specific needs of users. Providing  relevant information of their area, and help in quick decision making. EcoSophia also has an experimental infrared photo module, which gives information on the health status of plants.

- [Summary](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#summary)
- [The prototype](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#the-prototype)
- [Assembly/Code](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#assembly-code)[Main Hub](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#main-hub)
- [Station](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#station)

- [Manifest](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#manifest)
- [Gallery](https://buenalynch.com/2023/04/23/ecosofia-environmental-monitoring-in-patagonia/#gallery)

![](https://buenalynch.com/wp-content/uploads/2023/04/image-5.png?w=1024)

![](https://buenalynch.com/wp-content/uploads/2023/04/image-10.png?w=1024)

### Summary

The project aims to develop a low-cost, modular environmental monitoring system that users can adapt to their specific needs by zone, thus reducing the cost of decision-making for conservation efforts.

To achieve this goal, we are developing a comprehensive weather monitoring station that will measure various climate data, such as ambient temperature, humidity, and rainfall, as well as capture photographic data of the surrounding flora. To cater to a larger number of users in remote areas, the system should be as autonomous as possible, and therefore will include a solar-powered energy supply system. Additionally, a remote communication system using radio technology will enable the monitoring of even the most remote and distant locations by transmitting data through a network of chain-stations.

https://youtu.be/cjnoU-rA48w

### The prototype

The prototype consists of several stages. Firstly, the station itself, which collects data through a variety of sensors, operates on a battery and a solar panel to recharge it, and sends all the data through radio to avoid the hassle of having to physically retrieve it, allowing for a periodic report at a low cost and energy consumption.

Next, a main hub receives the information, analyzes and organizes it into a database, while also generating a photograph of the surrounding area to be saved alongside the measurements and make the data obtained even more complete.

The final phase is the upload of all the data to a private server for later visualization and analysis, enabling modification or new decision-making in the geographic area being monitored.

![](https://buenalynch.com/wp-content/uploads/2023/04/image-6.png?w=1024)

The station was constructed using low-cost electronic components and prototyping boards from Arduino and Raspberry Pi. The list of materials used can be consulted here.

### Assembly/Code

![](https://buenalynch.com/wp-content/uploads/2023/04/image-7.png?w=860)

Below are the electronic schematics to manufacture the station. A breadboard can be used for prototyping, but we recommend soldering all the components to a copper plate since the number of connections is not less, and then encapsulating everything inside a container for testing, a more permanent circuit is required. Read the full documentation here.

#### Main Hub

![](https://buenalynch.com/wp-content/uploads/2023/04/image-8.png?w=1024)

The code of this Arduino is responsible for receiving the data transmission from the station and adds the wind speed measurement to send it to the RPI3.

#### Station

![](https://buenalynch.com/wp-content/uploads/2023/04/image-9.png?w=1024)

The solar panel and battery connect to the LiPo Rider Pro at the indicated ports and the LiPo Rider Pro connects to the Arduino via USB.

First you have to connect the 5V and GND pins of the Arduino to the board, as indicated. The pins below are different than the hub because an Arduino Leonardo is used here.

The station collects the data from all the sensors and sends it via the LoRa Radio to the hub.

https://youtu.be/QkHXKrrk530

### Manifest

The project arises from the conviction that technology provides us with the best tools to generate changes and improvements in people's quality of life. We agree with the current technological trend of caring for the environment, in order to ensure the long-term survival of humanity.

Currently, human activity is the main cause of pollution in the world. This pollution is directly related to the amount of resources we need to extract from nature to sustain our daily lives and activities, from the food we eat to the oil that powers our industry.

An important part of our generation's responsibility to history is related to environmental care, as despite being a problem that has been handed down to us from the decisions made by our ancestors, we are the ones who have received all the technological development that has come hand in hand with human industrial activity over the last couple of centuries. This tool allows us to develop various applications for this technology quickly and to almost anyone with internet access and interest.

Within this field, there is the concept of citizen science, according to which an ordinary citizen can participate in the development of science and technology. These citizens are often classified as "makers" or inventors, as there are increasingly more tools that allow for the rapid and functional prototyping of ideas. In our case, the collection, visualization, and analysis of data can be done quickly and accurately and at an accessible cost to manage a larger amount of data from our environment.

Having more data on how the environment behaves around us can allow us to measure our impact on this environment, in order to draw better conclusions about how our behavior affects it, and thus make well-founded decisions to proceed in favor of conservation for our advantage.

Thus, the project aims to develop a modular and low-cost environmental monitoring system, which allows users to adapt it to their specific needs by zone and without excessive spending, lowering the cost of decision-making in favor of biological conservation. To achieve this, we are developing a broad data measurement station for climate data, from ambient temperature, rainfall, humidity, etc., to photographic records of the surrounding flora. This system must be as autonomous as possible to save on energy/maintenance and data collection time.

Such a tool can present us with the opportunity to take control of how our relationship with the environment has developed, to bring that relationship to a point of balance where we can coexist with nature without it being too late for humanity.

### Gallery

First prototype "Estancia la Peninsula, Peninsula Antonio Varas, Ultima Esperanza, Magallanes, Chile"

![](https://buenalynch.com/wp-content/uploads/2023/04/image-11.png)

![](https://buenalynch.com/wp-content/uploads/2023/04/image-10.png)![](https://buenalynch.com/wp-content/uploads/2023/04/image-4.png)

![](https://buenalynch.com/wp-content/uploads/2023/04/image-3.png)