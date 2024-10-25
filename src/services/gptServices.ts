import { aiService } from './aiService';

export const gptService = {
  async parseAction(text: string) {
    const response = await aiService.generateAction(text);
    if (response.startsWith('tweet:')) {
      return { type: 'tweet', content: response.replace('tweet:', '').trim() };
    }
    return null;
  }
};
