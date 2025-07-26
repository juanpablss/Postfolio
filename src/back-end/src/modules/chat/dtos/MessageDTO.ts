interface SendMessageDTO {
  type: string;
  to: string;
  from: string;
  text: string;
}
interface UpdateMessageDTO {}

export { SendMessageDTO, UpdateMessageDTO };
