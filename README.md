# Group 24 - Therapy Connections
![example workflow](https://github.com/ubc-cpsc455-2024S/project-24_OkTherapy/actions/workflows/ci.yml/badge.svg)

## App description

OKTherapy is a personalized therapy-matching platform designed to connect users with the ideal therapist for their unique needs. By completing a detailed questionnaire, users receive a customized list of therapists from a selection of hundreds in their area who align with their preferences and requirements. OKTherapy exclusively features verified counselors from the BC Counseling database, providing users with trusted and reliable therapists. We also provide a welcoming way for first-time therapy-goers to connect with their preferred therapist, making the journey to mental wellness easy and accessible.

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
- Create a user database schema ✅ <br>

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

As a team, we brainstormed ideas about the project and decided on the technologies/APIs/libraries we wanted to use in our project. After coming up with the idea of a therapist-matching website, we sketched out some initial designs and flows of the web application. We came up with user stories for OkTherapy as well as some color palettes. 

#### Unit 2: React/Redux

We used React to create a basic frontend and flows for switching between different pages. We added custom styling on top of the Chakra UI component library to build out a landing page, a questionnaire, a profile page and a therapist matches page. Redux was used to manage user state, handling asynchronous actions for fetching, creating, and updating user profiles, as well as storing the authenticated Auth0 user object. 

#### Unit 3: Node & Express

We implemented a node backend for our server to communicate with our frontend using API calls. We created endpoints for creating, updating, and retrieving user profiles, as well as fetching specific therapists by their ID. Additionally, the backend includes an endpoint to generate a custom template using the Gemini API and features our matching algorithm with relevant helper functions.

#### Unit 4: MongoDB Database

We used MongoDB to store our collections database for persistent storage our data. Specifically we made two collections, one used for the therapists data that we scraped from the web and other used for user's data where we stored their therapy preferences that we collect from our questionaire.

#### Unit 5: Release Engineering

We deployed our application using Render. We also implemented GitHub actions and tests for a continuous integration/continuous deployment pipeline. We also did some code cleanup and code quality checks before final release.

### Above and Beyond

- **Matching algorithm**: We created a custom matching algorithm that aims to select the most compatible therapists based on the user’s profile data. The algorithm consists of several steps:
1. Selects a subset of therapists that follow a matching criteria consisting of therapist gender, budget range, therapy format and matching certifications and methods.
2. If there are no therapists that fit these exact criteria, it selects therapists that match at least one of the criteria mentioned above to ensure that the user has at least one therapist match.
3. Ranks the therapists by assigning them a score from 0 to 1. The score was based on factors such as the number of the user’s preferred certifications a therapist has and the number of the user’s preferred therapy methods they offer.
4. If the user has in-person therapy mode preferences, the algorithm ranks the top 50 scored therapists by location. We use the OpenCage API to get coordinates from a city name or location and calculate the distance between each therapist's location and the user's location. Therapists with lower distances were attributed higher scores.
5. Finally, the algorithm selects the top 5 scored therapists and returns them. 
- **Email Template Generation**: We also added a feature that helps users draft their first email to therapists by populating a template with their profile information. Users can choose from two predefined templates or opt for a custom template generated by the Gemini API based on the data they provided in the form. They then have the option to edit any of the templates and copy the email body to their clipboard. 


### Next Steps

To further improve our app, we would like to address our stretch requirements:
- Expanding our service to more provinces in Canada. Other provinces such as Ontario or Quebec have similar websites to CounsellingBC that could be scraped to offer out-of-province options.
- Add a way for therapists to create their own verified accounts to update their profile and ensure their information is current. We could use Auth0 verification with the therapists' listed phone numbers or email addresses to confirm their identity and build a therapist-only interface for profile management and updates

### List of contributions

- Julia: I played a key role in creating the therapist profile functionality in Redux and testing with dummy data. I developed a web scraper to automate the creation of therapist profiles from the BC Counseling website then saved those in the database. I set up the server and established the connection to the database, created therapist API endpoints, and was responsible for the matches page.

- Isabella: I designed the website UI and implemented the matches page frontend. I also set up the redux and the database connection, as well as worked on the email generation page and added geolocation to the matching algorithm. 

- Selina: I'm responsible for the implementation of Profile page, which includes frontend ui design, redux for state management,API design and data storage by MongoDB. I also write tests for users and therapists api and deploy our website on Render.

- Aviral: At the start of the project, I did the initial design and implementation of the user questionnaire/form. I was also responsible for setting up the Auth0 login feature. Towards the peak to end of the project, I worked on coming up with the matching algorithm and improving it for our “above and beyond” target.


### Initial sketches: user flows and prototypes

<img width="1351" alt="Screenshot 2024-05-23 at 11 40 55 PM" src="https://github.com/ubc-cpsc455-2024S/project-24_/assets/106799810/a54652d7-8c46-4bbb-90e4-e96997d13fb2">
<img width="1343" alt="Screenshot 2024-05-23 at 11 41 22 PM" src="https://github.com/ubc-cpsc455-2024S/project-24_/assets/106799810/d7bbd4e8-08df-48d5-ace6-5c4c09ab6470">



<!---
## Images

{You should use this area to add a screenshot of your app or website }

<img src ="images/test.png" width="100px">

## References

{Add your stuff here}
-->

