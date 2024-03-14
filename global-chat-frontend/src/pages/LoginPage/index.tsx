import {SubmitHandler, useForm} from "react-hook-form";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import {User} from "react-feather";
import classNames from "classnames";

interface ISetUsernameData {
  username?: string
}

export const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<ISetUsernameData>();
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();

  const setUsernameFormHandle: SubmitHandler<ISetUsernameData> = ({username}) => {
    if (!username) return;
    userContextData.setUsername(username);
    navigate("/chat");
  }

  return (
      <div className={"flex-grow flex flex-col justify-center gap-5"}>
        <h1 className={"text-5xl font-bold text-center text-wrap"}>Global Chat</h1>
        <form onSubmit={handleSubmit(setUsernameFormHandle)}>
          <div className={"flex flex-col gap-5"}>
            <div className={"flex flex-col gap-1"}>
              <label className={"input input-bordered flex items-center gap-2 " + classNames(
                  {"input-error": errors.username})}>
                <User size={18}/>
                <input {...register("username", {required: "Username is required!"})} type="text"
                       className={"grow"} placeholder="Username"/>
              </label>
              {errors.username && <p className={"text-error"}>{errors.username.message}</p>}
            </div>
            <button type={"submit"} className={"btn btn-primary btn-block"}>Choose username
            </button>
          </div>
        </form>
      </div>
  );
}