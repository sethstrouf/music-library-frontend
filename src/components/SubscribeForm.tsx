import React, { ChangeEvent } from 'react'

interface ISubscribeFormProps {
  name: string;
  email: string;
  changeName: (e: ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  subscribe: () => void;
  isSendingRequest: boolean;
}

const SubscribeForm = ({ name, email, changeName, changeEmail, subscribe, isSendingRequest }: ISubscribeFormProps) => {

  return (
    <div>
      <div>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Please input your name"
              value={name}
              onChange={changeName} />
          </div>
          <div>
            <label>Email </label>
            <input
              type="text"
              placeholder="Please input your email"
              value={email}
              onChange={changeEmail} />
          </div>
          <hr />
          <div>
            {isSendingRequest ? (
              <button type="button" disabled>Sending Request...</button>
            ) : (
              <button type="button" onClick={subscribe}>Subscribe</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscribeForm
