export enum DiscordEvent {
  NEW_MESSAGE = "NEW_MESSAGE",
}

export type DiscordNewMessageBody = {
  message: string;
  token: string;
};
