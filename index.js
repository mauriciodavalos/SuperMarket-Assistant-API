import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import detectText from './ocrVision.js'; // path to the ocrVision.js file

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//GETTING THE PROMPT
const app = async function () {
  try {
    //detect & Digitalization TEXT of IMAGES
    const preItemList = await detectText('input_Images/listaSuper2.jpeg');
    let grocerieList = preItemList[0].split('\n');
    return grocerieList;

    //
  } catch (error) {
    console.log('Error Digitalizing the Image ⛔', error);
  }
};

async function listCreation(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a helpful supermarket assistant and you check that this list contains only items that you can buy in a supermarket, organized them and list them into the next structure:  {'Category 1': ['item 1','item 2','item 3'],'Category 2': ['item 1'],'Category 3': ['item 1', 'item 2','item 3','item 4','item 5']} --- check the spelling, give only the list, nothing else",
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1,
    });

    const answer = response.data.choices[0].message.content;
    console.log(answer);
    return answer;
  } catch (error) {
    console.log('Error CHATGPT Categorizing and reveiwing the list ⛔');
  }
}

let prompt;

app().then((grocerieList) => {
  prompt = grocerieList.join(', '); // moved inside the callback
  console.log(prompt);
  listCreation(prompt);
});
