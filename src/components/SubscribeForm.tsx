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
    <div className="row mt-5 justify-content-center">
      <div className="col-12 col-lg-6 border border-1 p-4">
        <form className="">
          <div className="form-group">
            <label className="col-form-label">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Please input your name"
              value={name}
              onChange={changeName} />
          </div>
          <div className="form-group">
            <label className="col-form-label">Email</label>
            <input
              className="form-control"
              type="text"
              placeholder="Please input your email"
              value={email}
              onChange={changeEmail} />
          </div>
          <hr className="my-4"/>
          <div className="form-group text-right">
            {isSendingRequest ? (
              <button type="button" className="btn btn-primary" disabled>Sending Request...</button>
            ) : (
              <button type="button" onClick={subscribe}
                      className="btn btn-primary">Subscribe</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscribeForm
