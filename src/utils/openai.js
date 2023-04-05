import { Configuration, OpenAIApi } from "openai";
import environmentVariables from "./config";

const configuration = new Configuration({
  apiKey: environmentVariables.openAIApiKey,
});

const openai = new OpenAIApi(configuration);

export default openai;