"use client";
import React, { useState } from "react";
import type { Dispatch } from "react";
import axios from "axios";

const send = async (Date: string, Hour: string, Amount: string) => {
  const respuesta = await axios.post("http://localhost:4000/purchases", {
    date: Date,
    hour: Hour,
    amountSpent: Amount,
  });
  return respuesta.data;
};

const obtainPurchase = async () => {
  const respuesta = await axios.get("http://localhost:4000/purchases");
  console.log(respuesta.data[0]);
  return respuesta.data[0];
};
const test = async () => {
  try {
    const respuesta = await axios.get("http://localhost:4000/");
    console.log(respuesta.data[0]);
    return respuesta.data[0];
  } catch (error) {
    console.log(error);
    return "error";
  }
};

interface InputProps {
  placeholder?: string;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const Input = ({ placeholder, value, setValue }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-3/4 p-4 rounded-2xl m-4 text-center text-[#09051a] "
    />
  );
};

const Page = () => {
  const [date, setDate] = useState<string>("17:00:00");
  const [hour, setHour] = useState<string>("24:04:2023");
  const [amount, setAmount] = useState<string>("$15000");
  const [response, setResponse] = useState<any>([]);
  const [waiting, setWaiting] = useState<boolean>(false);

  const Button = ({ fnc, children }) => {
    return (
      <button
        className=""
        onClick={async (e) => {
          e.preventDefault();
          const res = Object.values(await fnc());
          console.log(res);
          setResponse(res);
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex-wrap w-2/5 h-5/6 flex justify-center rounded-2xl shadow-white shadow-[0px_0px_5px_1px_#ffffff] ">
        <div className="h-1/6 w-full flex justify-center items-center">
          Tests
        </div>
        <form className="h-5/6 w-full display flex flex-col justify-around items-center">
          <Input setValue={setDate} value={date} placeholder="Date" />
          <Input setValue={setHour} value={hour} placeholder="Hour" />
          <Input setValue={setAmount} value={amount} placeholder="Amount" />
          <button
            onClick={async () => {
              const answer = await send(date, hour, amount);
              console.log(answer);
            }}
          >
            Send
          </button>
          <Button fnc={test}>Test</Button>
          <Button fnc={obtainPurchase}>Get</Button>
        </form>
      </div>
      <div className="flex-wrap w-2/5 h-5/6 flex justify-center flex-col rounded-2xl shadow-white shadow-[0px_0px_5px_1px_#ffffff] ">
        {response.map((item, i) => {
          return (
            <div key={i} className="">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
