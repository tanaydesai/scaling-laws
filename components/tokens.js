"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"
import { LuDatabase  } from "react-icons/lu";


export const Tokens = () => {
  const [params, setParams] = useState(0)
  const [tokens,setTokens] = useState(0)

  const get = (params) => {
    const raw = [
      [400e6, 7.7e9],
      [1e9, 20.0e9],
      [10e9, 219.5e9],
      [67e9, 1.7e12],
      [175e9, 4.3e12],
      [280e9, 7.1e12],
      [520e9, 13.4e12],
      [1e12, 26.5e12],
      [10e12, 292.0e12],
      ];

      const x = raw.map(data => Math.log10(data[0]));
      const y = raw.map(data => Math.log10(data[1]));

      const sumX = x.reduce((acc, curr) => acc + curr, 0);
      const sumY = y.reduce((acc, curr) => acc + curr, 0);
      const sumXX = x.reduce((acc, curr) => acc + curr * curr, 0);
      const sumXY = raw.reduce((acc, curr, index) => acc + x[index] * y[index], 0);

      const n = raw.length;

      const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const c = (sumY - m * sumX) / n;

      console.log(`y = ${m}x + ${c}`);

      const xquery = Number(params);
      console.log(xquery)
      const yquery = (Math.pow(10, m * Math.log10(xquery) + c) / 1e12).toFixed(2);
      setTokens(yquery)
  }

  return (
    <div className="flex flex-col gap-3 my-10">
        <h2 className="font-serif text-[23px]  flex gap-2 items-center">Tokens <LuDatabase /></h2>
        <p className="font-sans text-[14px] mt-4">This section will deal with the second question and is pretty <span className="font-semibold">straightforward</span>, all you need is the number of model parameters (N) which can be any desired number.</p>

        <div className="flex items-center gap-2 my-2">
          <p className="text-[14px]  font-serif text-gray-600">For Model size (N): </p> 
        
          <HoverCard>
            <HoverCardTrigger><Input value={params} className="bg-gray-200 outline-none" onChange={(e) => {get(e.target.value); setParams(e.target.value)}} type="number" defaultValue={0} /></HoverCardTrigger>
            <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">params</HoverCardContent>
          </HoverCard>
          
          <p className="text-[14px]  font-serif text-gray-600">Train on</p> 
          <Button className="w-fit">{tokens}T</Button>
          <p className="text-[14px]  font-serif text-gray-600">Tokens</p> 
        </div>
        
        <p className="font-sans text-[14px] mt-4">This calculator follows scaling laws spelled out by <span className="font-semibold underline"><a href="https://arxiv.org/pdf/2203.15556">Chinchilla</a></span>.</p>

    </div>
  );
}