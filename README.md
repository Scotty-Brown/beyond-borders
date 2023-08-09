# Beyond Borders

## Abstract:
Introducing Beyond Borders: The application that simplifies your travel. With our platform, you can easily log in, plan your next vacation, access details about past trips and upcoming adventures, and keep track of your total travel expenses. Each trip is presented with specifics such as the number of nights booked, guest count, duration of the trip, and the total cost, offering you a comprehensive overview for efficient travel management.


## Installation Instructions
1. Fork and clone [this repo](https://github.com/Scotty-Brown/beyond-borders)
2. CD into cloned directory
3. Run `npm install` in your terminal
4. Run `npm start` in your terminal
5. Clone down the [back end](https://github.com/turingschool-examples/travel-tracker-api) server and follow installation instructions in the `ReadMe`
6. Navigate to `http://localhost:8080/` in your web browser

## Preview of App:
![Beyond Borders](https://media.giphy.com/media/OVV2FFV7QIr6OaR7Ie/giphy.gif)

## Context:
This solo project took approximately 20 hours to complete. I am currently in my final week of Mod 2 at Turing School of Software and Design

## Learning Goals:
- Use object and array prototype methods to perform data manipulation.
- Create a user interface that is easy to use and clearly displays information.
- Write modular, reusable code that follows SRP (Single Responsibility Principle).
- Implement a robust testing suite using TDD.
- Carry out UX workshopping and implement feedback from outside usability test.
- Work with a local server and make network requests to API endpoints to retrieve and manipulate data.
- Ensure our app follows best practices for accessibility.
- Solidify the code review process.

## Technologies Used:
- Fetch API
- Webpack
- Mocha & Chai
- LightHouse
- Wave Evaluation
- GitHub Issues & Project Board
- JavaScript
- CSS
- HTML
- NPM packages

## Wins + Challenges:
#### Wins:
- I successfully fetched, parsed and displayed data from 3 separate URL sources. I also posted to the API.
- Implemented a login page for the first time with up to 50 different usernames.
- Test all functions that manipulate the data
  
#### Challenges:
- Using dayjs to compare dates was difficult at first, I spent some time studing dayjs functionality and was able to successfully compare two dats to prevent users from selecting a date in the past when booking a new trip
