import { PostgresPubSub } from "graphql-postgres-subscriptions";
 
const pubsub = new PostgresPubSub(/* {
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
  } */);
export default pubsub;
