# toy-robot

## Installation:

- Install `Node.js` via https://nodejs.org/ and `Yarn` via https://classic.yarnpkg.com/en/docs/install/#mac-stable

- Install `node_modules`:

   `$ yarn`

## Running the app:

- Run application:

   `$ yarn start `

## Running the tests

- Run tests:

   `$ yarn test`


## Implementation:
- Four classes are used to address this code challenge `App`, `CommandHandler`, `Robot` and `Table`

- `Table` is used to record the size of the board and has a function check if a position is valid or not (on or off the board)

- `Robot` is used to record the robot's coordination and facing direction

- `CommandHandler` is the orchestration class to handle the commands and checking the invalid command input. The command input validation can also be used by schema validation libraries e.g. Zod https://zod.dev/?id=introduction

- Some advanced design patterns can be used for this code challenge. E.g. `Command Pattern`. Which can simplifies the `CommandHandler` and make the code cleaner. But it's going to require more effort and it's a smell of over engineering
