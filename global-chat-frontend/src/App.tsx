import {useEffect, useState} from "react";
import {socket} from "./socket.ts";
import {useForm} from "react-hook-form";

interface IMessage {
  id: string
  message: string
  username: string
}

export const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {handleSubmit, register, resetField, setFocus, formState} = useForm<{
    message: string,
    username: string
  }>();

  const onConnect = (data: string) => {
    console.log(data);
  }

  const onGlobal = (data: IMessage) => {
    setMessages(old => [...old, data]);
  }

  const onSendMessage = (data: { message: string, username: string }) => {
    socket.emit("message", {message: data.message, username: data.username});
    setFocus("message");
    resetField("message");
  }

  useEffect(() => {
    socket.once("private", onConnect);
    socket.on("global", onGlobal);

    return () => {
      socket.off("private", onConnect);
      socket.off("global", onGlobal);
    }
  }, []);

  return (
      <div className={"h-screen w-screen p-10 flex flex-col gap-5"}>
        <div className={"rounded-3xl bg-neutral shadow p-10 overflow-y-scroll flex-grow"}>
          {messages.map((message, index) => {
            if (socket.id && socket.id === message.id) {
              return <div className="chat chat-end" key={index}>
                <div className="chat-header">
                  {message.username}
                </div>
                <div className="chat-bubble chat-bubble-primary">{message.message}</div>
              </div>
            }
            return <div className="chat chat-start" key={index}>
              <div className="chat-header">
                {message.username}
              </div>
              <div className="chat-bubble chat-bubble-primary">{message.message}</div>
            </div>
          })}
        </div>
        <form onSubmit={handleSubmit(onSendMessage)} className={"flex gap-5 items-center justify-between"}>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input {...register("username", {required: "Please enter a username"})} type="text"
                   placeholder="Type here"
                   className="input input-bordered w-full"/>
            {formState.errors.username && <p
                className="text-error">{formState.errors.username.message}</p>}
          </label>
          <label className="form-control flex-grow">
            <div className="label">
              <span className="label-text">Your message</span>
            </div>
            <input {...register("message", {required: "Please enter a message"})} type="text"
                   placeholder="Type here"
                   className="input input-bordered w-full"/>
            {formState.errors.message && <p
                className="text-error">{formState.errors.message.message}</p>}
          </label>
          <button type="submit" className="btn btn-success self-end">Send</button>
        </form>
      </div>
  )
}