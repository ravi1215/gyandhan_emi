const environmentVariables = {
  sessionSecret: process.env.SESSION_SECRET || 'temperory_development_secret',
  databaseUrl: process.env.DATABASE_URL,
  openAIApiKey: process.env.OPENAI_API_KEY,
};

export default environmentVariables;