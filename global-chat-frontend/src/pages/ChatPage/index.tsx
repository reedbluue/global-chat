import {IMessageDto} from "../../dtos/response/IMessageDto";
import {useContext, useEffect, useRef, useState} from "react";
import {socket} from "../../configurations/SocketConfig";
import {ChatMessage} from "../../components/ChatMessage";
import {SubmitHandler, useForm} from "react-hook-form";
import {Send} from "react-feather";
import {IMessageRequestDto} from "../../dtos/request/IMessageRequestDto";
import {UserContext} from "../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

export const ChatPage = () => {
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const {register, handleSubmit, formState: {errors}, reset, setFocus} = useForm<IMessageDto>();
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();
  const chatArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("global-message", (messageDto: IMessageDto) => {
      setMessages(messages => [...messages, messageDto]);
      chatArea.current?.scrollTo({top: chatArea.current.scrollHeight, behavior: "smooth"});
    });

    return () => {
      socket.off("global-message");
    }
  }, []);

  useEffect(() => {
    if (!userContextData.username) navigate("/");
  }, []);

  const sendMessageHandle: SubmitHandler<IMessageRequestDto> = (data) => {
    socket.emit("send", {...data, username: userContextData.username});
    reset();
    setFocus("message");
  }

  return (
      <div className={"flex-grow flex flex-col justify-center gap-5"}>
        <h1 className={"text-3xl font-bold text-center text-wrap"}>Global Chat</h1>
        <div className={"rounded-3xl bg-base-200 flex-grow flex flex-col p-5 gap-5"}>
          <div className={"flex-grow justify-self-end h-0 overflow-y-auto"} ref={chatArea}>
            {messages.map((messageDto, index) => (
                <ChatMessage key={index} messageDto={messageDto}/>
            ))}
          </div>
          <form onSubmit={handleSubmit(sendMessageHandle)}>
            <div className={"flex flex-row gap-5"}>
              <label
                  className={"input input-bordered flex items-center gap-2 flex-grow " + classNames(
                      {"input-error": errors.message})}>
                <Send size={18}/>
                <input {...register("message", {required: "Message is required!"})} type="text"
                       className="grow w-full"
                       placeholder="Message"/>
              </label>
              <button type={"submit"} className={"btn btn-primary"}>Send</button>
            </div>
          </form>
        </div>
      </div>
  );
}