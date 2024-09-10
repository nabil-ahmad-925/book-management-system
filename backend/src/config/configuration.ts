export default () => ({
  databaseUri: process.env.MONGODB_URI,
  port: parseInt(process.env.PORT, 10) || 3001,
});
