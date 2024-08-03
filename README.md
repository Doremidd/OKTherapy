# Group 24 - Therapy Connections

## App description

OKTherapy is a personalized therapy-matching platform designed to connect users with the ideal therapist for their unique needs. By completing a customized questionnaire, users receive a curated list of therapists from a selection of hundreds in their area who align with their preferences and requirements. OKTherapy offers a seamless and supportive path to better mental health, featuring only verified counselors sourced from the BC Counseling database. We also provide a welcoming way for first-time therapy-goers to connect with their preferred therapist, making the journey to mental wellness accessible and comfortable. 

## Team Members

- Aviral Gupta
- Julia Hudea
- Selina Wang
- Isabella Leroux

## Project task requirements

### Minimal requirements (will definitely complete)
As a new user I can register an account for the website so I can use the functionalities of the website. ✅ <br>

As a user I want to login to my account so that I can securely access my personal information. ✅ <br>

As a user I want to fill out my profile with personal information so that I can be well matched based on my needs:
- Generate form questions based on common therapist specialties and areas of practice  ✅
- Create a front-end form ✅
- Create an API endpoint that creates a user profile and saves the data to the database ✅
- Create a database schema ✅ <br>

As a user I want to be matched to therapists to narrow down my search:
- Scrape therapist profiles from https://counsellingbc.com/counsellors ✅
- Create a script to populate the DB with scraped data ✅
- Create an API endpoint to retrieve therapist profiles ✅
- Create an algorithm to filter and rank therapists from the database according to user preferences ✅
- Create a front-end that displays the matched therapists ✅


### Standard requirements (will most likely complete)
As a user I want to be able to browse through therapists profiles that I’ve been matched with to find the one that best suits my needs. ✅ <br>

As a user I want to edit my profile information after creation to reflect my changing needs. ✅ <br>

As a user, I want to be able to see my matched therapists as long as I’m logged in (can be different sessions). ✅ <br>

As a user, I want to have a way to contact the therapists I have been matched with. ✅ <br>

### Stretch requirements (plan to complete at least 1)
As a first time user, I want some template conversation opener to reach out to the therapist with. ✅ <br>

As a therapist, I want to edit my profile information to ensure that it’s accurate. ❌ <br>

We would also like to expand outside of BC and provide counselling across Canada. ❌ (didn't find enough data) <br>


### Tech used from Units 1-5 in the Project

#### Unit 1: Team Formation, Project Ideas and HTML/CSS/JavaScript

As a team, we brainstormed ideas about the project and decided on the technologies/API's/Library's we wanted to use in our project. After coming up with the idea of OkTheary, we sketched out some intial designs and flows of the web application. We came up with user stories for OkTherapy as well as some color palette's.

#### Unit 2: React/Redux

We used React and React-Redux to create a basic frontend and flows for switching between different pages. In particular, we used a component library called "Chakra UI" to build out our questionaire tailored for users.

#### Unit 3: Node & Express

We implemented a node backend for our server to communicate with our frontend using API calls.

#### Unit 4: MongoDB Database

We used MongoDB to store our collections database for persistent storage our data. Specifically we made two collections, one used for the therapists data that we scraped from the web and other used for user's data where we stored their therapy preferences that we collect from our questionaire.

#### Unit 5: Release Engineering

We deployed our application using Render. We also implemented GitHub actions and tests for a continuous integration/ continuous deployment pipeline. We also did some code cleanup and code quality checks before final release.

### Above and Beyond

- GEMINI (email template)

- We also vastly improved our matching algorithm by introducing a ranking system. For each set of therapists that were returned by our matching algorithm we further gave them a score from 0 to 1. The score was based on factors like how many of the users preferred certifications a therapist has or how many of the users preferred therapy methods a therapist offered. Then we ranked each therapists on how many they offered and picked out therapists that most closely resemble a users needs. Furthermore, we added a location feature where using the cordinated of a users entered location, we would try to find therapist most closely related to them.


### Next Steps

To further improve our app, we would have liked to expand our service to more provinces other than BC. We would have also liked a way for therapists to have their own verified accounts that they could then update their profile with similar to how users can for their changing needs, as a therapists might change their methods or specilized fields.

### User flows/prototypes

<img width="1351" alt="Screenshot 2024-05-23 at 11 40 55 PM" src="https://github.com/ubc-cpsc455-2024S/project-24_/assets/106799810/a54652d7-8c46-4bbb-90e4-e96997d13fb2">
<img width="1343" alt="Screenshot 2024-05-23 at 11 41 22 PM" src="https://github.com/ubc-cpsc455-2024S/project-24_/assets/106799810/d7bbd4e8-08df-48d5-ace6-5c4c09ab6470">



<!---
## Images

{You should use this area to add a screenshot of your app or website }

<img src ="images/test.png" width="100px">

## References

{Add your stuff here}
-->

