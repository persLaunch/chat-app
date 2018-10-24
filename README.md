# chat-webapp
Chat web application with the following stack: Node.js, Sequelize, PostgreSQL, GraphQL, React, Apollo and Next.js, Jest.

  - Type some Markdown on the left
  - See HTML in the right
  - Magic

# Done

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)


# Version 1: Single chat room
There is only 1 chat room where users can discuss
- [v1.0.0] User can read the last 10 messages of the room when entering. DONE
- [v1.0.0] User can read new messages from other users. DONE
- [v1.0.0] User can write and send new messages. DONE

# Version 2: multiple chat rooms
We now want to have multiple chat rooms. In addition to version 1:
- [v2.0.0] User can see a list of available chat rooms.
- [v2.0.0] User can join and leave a chatroom.
- [v2.0.0] User can see the list of users in a chat room.
- [v2.0.0] User can create a chat room by entering a name.

# Bonus: Auth & Test
- [v1.0.0] Implement signup and login to authenticate users. (they shouldn't have access to any data if not logged in).
- [v2.0.1] Add tests on the backend using Jest (you can also try to test React components).
 
# Getting started
----------
I/ Download the project
```sh
$ git clone https://github.com/persLaunch/chat-app.git
```
II/ Start the project

OPTION 1: http://217.182.68.59:3000

OPTION 2: Docker Compose
TODO

OPTION 3: Manually
1. Init Database

Install postgres:
```sh
$ sudo apt-get install postgresql postgresql-client
$ cd chat-app
$ sudo -u postgres bash
$ sh setup_database.sh
$ exit
```
2. Start Backend

```sh
$ cd chat-app/backend_app
$ npm i
```
--
[Might be optional] If babel not found, some babel might be missing for dependencies reasons
```sh
$ npm i @babel/cli @babel/core @babel/node @babel/polyfill @babel/preset-env @babel/register babel-plugin-transform-runtime
```
--
```sh
$ cp .env-example .env
$ npm start
```
Le backend est maintenant lancé sur le port 3001.
3. Start frontend

```sh
$ cd chat-app/frontend_app
$ npm i
$ cp .env-example .env
$ npm start
```

Le frontend est maintenant lancé sur le port 3000.

-----
# Test instruction
[Instruction for testing functionalities](http://breakdance.io)

# License

ISC
