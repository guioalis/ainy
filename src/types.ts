export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ApiResponse {
  choices: {
    message: Message;
  }[];
}
