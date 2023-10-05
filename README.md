[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![alt text](https://github.com/JenevaRay/Codeathon/blob/main/assets/codeathon.jpg)

# Codeathon

A full stack application that brings coders together

### Table of Contents

**[Elevator Pitch](#elevator-pitch)**<br>
**[User Story](#user-story)**<br>
**[Acceptance Criteria](#acceptance-criteria)**<br>
**[Installation Instructions](#installation)**<br>
**[Usage Instructions](#usage)**<br>
**[License](#license)**<br>
**[Contributing](#contributing)**<br>
**[Special Thanks](#thanks)**<br>
**[Distribution of Tasks](#distribution-of-tasks)**<br>

# Elevator Pitch

Codeathon is a platform to interact with the nation’s developer community through hackathon events. Our mission is to foster creativity, innovation, and collaboration within the developer community. We believe that the future is built on the ideas and solutions of passionate individuals, and we want to provide a platform for aspiring innovators to turn their visions into reality by attending or hosting a Codeathon in a city near you.

# User Story

- AS A programmer looking for a platform to create, register, or find hackathons
- I WANT a website that can offer this functionality
- SO THAT I can join, create, or find local hackathons in my area.

# Acceptance Criteria

- GIVEN a full stack application that offers a crud service
- WHEN I visit the landing page 
- THEN I am prompted to either log in or create an account
- WHEN I log in, I am brought to the dashboard to view hackathons
- THEN I am able to view current, past, and future hackathons and pay for reservations, or create a new event
- WHEN I visit the events page
- THEN I am able to view current and future events
- WHEN I visit the registration page
- THEN I am able to host or pay for an event as an attendee
- WHEN I go to the checkout page
- THEN I am able to checkout for the event I want and pay the fee


# Installation

`git clone https://github.com/JenevaRay/Codeathon.git`


# Usage

First, install all dependencies:

```
npm install
```

then create/edit the following files accordingly:
```
create a .env file using the .envExample

Edit the config file from client/src/config/remote.js so it points to the included server (Example: localhost:3001) or use this link https://codeathon-server-a60585dbdc98.herokuapp.com/
```

Next, you can run the development version of the application:
```
npm run develop
```

You can view the app locally at http://localhost:3000/

Or view the app [live](https://codeathon-1b48b4588e47.herokuapp.com/)

# License

This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

# Contributing

Contributing is welcomed! Please submit a pull request.

# Distribution of Tasks

Jeneva
Back-End, Front-End, GraphQL, Stripe, Node.js, Typescript

Adam
Project Organization, Database Design, GraphQL, Back-End, Node.js

Christian
Front-End, UX/UI, Tailwind CSS, and Stripe

Coby
Back-End, Service Worker, JWT, Stripe


# Thanks

A special thanks to:

[Creative Tim](https://www.creative-tim.com/) for supplying some components



