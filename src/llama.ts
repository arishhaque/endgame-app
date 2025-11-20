export async function getWordFromLlama() {

  const Ollama_API_BASE_URL = "http://127.0.0.1:11434/v1/chat/completions";
  const Ollama_API_KEY = "sk-llama";
  const system_prompt = `You are a helpful english language teaching assistant. Do not return wrong response, take your time. Return the letters as string and Do not add any additional text
                        Rules:
                        Length of word = 8.
                        No repeating character.`;

  const user_prompt = `Generate a new random combination of characters of length 8 with distinct letters in capital without repeating letters.
                        Examples:
                        "HARMONIC" : RIGHT
                        "HANSZIM": WRONG length is less than 8
                        "JAGGLESL" : WRONG G & L are repeating
                        "FYOUTHFI" : WRONG F is repeating`;

  const requestBody = {
    model: "llama3.2",
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: user_prompt }
    ]
  };

  try {
    console.log("Requesting OLlama..");
    const response = await fetch(Ollama_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Ollama_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log("Response received from Ollama");
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recipe from Ollama:", error);
    return "Sorry, there was an error generating the recipe.";
  }
}
