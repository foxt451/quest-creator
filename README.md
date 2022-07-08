## About

A small monorepo fullstack app for a quest room, where one can create/update/delete descriptions of available quests.
Might be easily expanded for actually completing those quests.

### Stack

This app is written in typescript.

Frontend uses React/Redux with libraries such as react-hook-forms, Material UI, axios, redux-persist.

Backend uses Express with GraphQL, Objection/Knex, express-jwt, graphql-middleware

Also, yup is used for validation.
The communication is done with GraphQL (no additonal specialized libraries, such as Apollo)
