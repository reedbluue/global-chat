import {IMessageDto} from "../../dtos/response/IMessageDto";
import classNames from "classnames";
import {socket} from "../../configurations/SocketConfig";

interface IChatMessageProps {
  messageDto: IMessageDto
}

export const ChatMessage = ({messageDto}: IChatMessageProps) => {
  const hourFormat = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
      <div className={"chat " + classNames({
        "chat-start": socket.id !== messageDto.userId,
        "chat-end": socket.id === messageDto.userId,
      })}>
        <div className="chat-header">
          {messageDto.userId == socket.id ? "You" : messageDto.username}
        </div>
        <div className="chat-bubble">{messageDto.message}</div>
        <div className="chat-footer opacity-50">{hourFormat(messageDto.timestamp)}</div>
      </div>
  );
}