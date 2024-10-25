// src/types/global.d.ts
declare global {
    interface User {
      id: string;
      twitterId: string;
      accessToken: string;
      refreshToken?: string | null;
      tasks?: Task[];
    }
  
    interface Task {
      id: string;
      userId: string;
      type: string;
      content: string;
      status: string;
      createdAt: Date;
      User?: User;
    }
  
    // Add any other global interfaces here
    interface TwitterActionResponse {
      type: 'tweet';
      content: string;
    }
  
    // You can also add type aliases
    type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed';
  }
  
  // This export is necessary to make the file a module
  export {};