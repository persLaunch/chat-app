import { PubSub } from 'graphql-subscriptions';
/*
  #TODO To be tested
const pubsub = new PostgresPubSub({
   user: 'postgres',
    host: 'localhost',
    database: 'app_db_dev',
    password: 'postgres',
    port: '5432',
});
*/
const pubsub = new PubSub();
export default pubsub;
