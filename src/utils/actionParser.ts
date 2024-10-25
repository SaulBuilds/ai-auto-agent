export const actionParser = {
    parse(text: string) {
      if (text.toLowerCase().startsWith('tweet:')) {
        return { type: 'tweet', content: text.replace('tweet:', '').trim() };
      }
      return null;
    },
  };
  