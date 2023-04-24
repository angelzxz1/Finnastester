"use client";
import React, { useState } from "react";
import axios from "axios";

const send = async (Date: string, Hour: string, Amount: string) => {
  const respuesta = await axios.post("https://6ns3c6-3000.csb.app/purchases", {
    Date: Date,
    Hour: Hour,
    Amount: Amount,
  });
  return respuesta.data;
};

const obtainPurchase = async () => {
  const respuesta = await axios.get("https://6ns3c6-3000.csb.app/purchases");
  return respuesta.data;
};
const test = async () => {
  const respuesta = await axios.get("https://6ns3c6-3000.csb.app/");
  console.log(respuesta.data);
};

interface InputProps {
  placeholder?: string;
}
const Input = ({ placeholder }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-3/4 p-4 rounded-2xl m-4 text-center"
    />
  );
};

interface ButtonProps {
  fnc: any;
  children: string;
}

const Button = ({ fnc, children }: ButtonProps) => {
  return (
    <button
      className=""
      onClick={(e) => {
        e.preventDefault();
        fnc();
      }}
    >
      {children}
    </button>
  );
};

const Page = () => {
  const Date = useState<string>("");
  const Hour = useState<string>("");
  const Amount = useState<string>("");
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex-wrap w-2/5 h-5/6 flex justify-center rounded-2xl shadow-white shadow-[0px_0px_5px_1px_#ffffff] ">
        <div className="h-1/6 w-full flex justify-center items-center">
          Tests
        </div>
        <form className="h-5/6 w-full display flex flex-col justify-around items-center">
          <Input placeholder="Date" />
          <Input placeholder="Hour" />
          <Input placeholder="Amount" />
          <Button fnc={send}>Send</Button>
          <Button fnc={test}>Test</Button>
          <Button fnc={obtainPurchase}>Get</Button>
        </form>
      </div>
    </div>
  );
};
export default Page;
