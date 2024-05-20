"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { GoCpu } from "react-icons/go";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"
import { GiReceiveMoney  } from "react-icons/gi";

export const Flops = () => {
  const [params, setParams] = useState(0)
  const [tokens, setTokens] = useState(0)
  const [pflops, setPflops] = useState(0)
  const [gpus, setGpus] = useState(0)
  const [time, setTime] = useState(0)

  const [data, setData] = useState(false)
  const [mode, setMode] = useState("size")

  const get = () => {

    const model_size = params
    const tokens_num = tokens
    const flops = pflops
    const assumed_mfu = 0.4
    const flops_throughput = flops * gpus * assumed_mfu
    const flops_needed = 6 * model_size * tokens_num
    const time_needed_s = flops_needed / flops_throughput

    setData({
      days: (time_needed_s / 3600 / 24).toFixed(2),
      hours: Math.floor(time_needed_s / 3600),
      gpuhours: Math.floor((time_needed_s / 3600) * gpus),
      needed: Math.floor(flops_needed),
      used: Math.floor(flops * time_needed_s * gpus),
      price:time_needed_s / 3600 * 4 * gpus,
    })

  }

  const get2 = () => {
    const time_needed_s = time * 3600
    const flops = pflops

    setData({
      days: (time_needed_s / 3600 / 24).toFixed(2),
      hours: Math.floor(time_needed_s / 3600),
      gpuhours: Math.floor((time_needed_s / 3600) * gpus),
      needed: 0,
      used: Math.floor(flops * time_needed_s * gpus),
      price:time_needed_s / 3600 * 4 * gpus,
    })

  }



  return (
    <div className="flex flex-col gap-3 my-10">
        <h2 className="font-serif text-[23px] flex gap-2 items-center">Time, Money and FLOPs <GiReceiveMoney  /></h2>
        <p className="font-sans text-[14px] mt-4">Perhaps the most interesting, this section will deal with the third and final question. You can either input the time taken for a model training run or the model size and data used. This info is often provided my frontier labs or is leaked to the public overtime.</p>
        
        <RadioGroup onValueChange={(e) =>{ 
          if (e == "size" || e == "time") {
            setMode(e); setParams(0); setTokens(0); setPflops(0); setGpus(0); setTime(0); setData(false)
          }
          else if(e == "llama"){
            setMode("time"); setPflops(400e12); setGpus(16000); setTime(400); setData(false)
          }

        }} defaultValue="size" className="flex mt-2 mb-5 font-sans text-[14px] gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="size" id="size" />
            <div>By Model Size & Data</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="time" id="time" />
            <div>By Time</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="llama" id="llama" />
            <div>Llama-3-70b</div>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-flow md:grid-cols-2 grid-flow-row whitespace-nowrap gap-2">
         {mode =="size" && 
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Model Size (N): </p> 
            <HoverCard>
              <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={params} onChange={(e) => setParams(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">params</HoverCardContent>
            </HoverCard>
          </div>}
          {mode =="size" && 
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Tokens (D): </p> 
            <HoverCard>
              <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={tokens} onChange={(e) => setTokens(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">tokens</HoverCardContent>
            </HoverCard>
          </div>
          }
          {mode =="time" && 
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Time (Hours): </p> 
            <HoverCard>
              <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={time} onChange={(e) => setTime(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">hours</HoverCardContent>
            </HoverCard>
          </div>
          }
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Peak FLOPs: </p> 
            <div className="flex items-center gap-1">
              <HoverCard>
                <HoverCardTrigger asChild><Input className="bg-gray-200 outline-none" value={pflops} onChange={(e) => setPflops(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
                <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">peak FLOPs</HoverCardContent>
              </HoverCard>
              <Select>
                <SelectTrigger className="w-fit bg-gray-200">
                      <GoCpu />
                </SelectTrigger>
                <SelectContent className="w-fit bg-gray-200">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">No. of GPUs: </p> 
            <HoverCard>
                <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={gpus} onChange={(e) => setGpus(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
                <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">number</HoverCardContent>
              </HoverCard>
          </div>
        </div>
        <Button className="w-fit self-end" onClick={mode == "size" ? get : get2}>Calcuate</Button>

        {data && mode == "size" &&
          <div className="flex items-center flex-wrap gap-2 my-2 mt-5">
          <p className="text-[14px]  font-serif text-gray-600">Your </p> 
          <Button className="w-fit">{Number(params)/1e12}T</Button>
          <p className="text-[14px]  font-serif text-gray-600">parameter model trained for </p> 
          <Button className="w-fit">{data.gpuhours/1e6}M</Button>
          <p className="text-[14px]  font-serif text-gray-600">GPU hours or</p> 
          <Button className="w-fit">{data.days}</Button>
          <p className="text-[14px]  font-serif text-gray-600">days on a total of</p> 
          <Button className="w-fit">{tokens/1e12}T</Button>
          <p className="text-[14px]  font-serif text-gray-600">tokens. It consumed a total of</p> 
          <Button className="w-fit">{data.used}</Button>
          <p className="text-[14px]  font-serif text-gray-600">FLOPs on</p> 
          <Button className="w-fit">{gpus}</Button>
          <p className="text-[14px]  font-serif text-gray-600">H100 GPUs at a total cost of</p> 
          <Button className="w-fit">${data.price/1e6}M</Button>
          <p className="text-[14px]  font-serif text-gray-600"> at a rate of</p> 
          <Button className="w-fit">$4.0</Button>
          <p className="text-[14px]  font-serif text-gray-600">per GPU/per hour.</p> 
        </div>}

        {data && mode == "time" &&
          <div className="flex items-center flex-wrap gap-2 my-2 mt-5">
          <p className="text-[14px]  font-serif text-gray-600">Your model trained for </p> 
          <Button className="w-fit">{data.gpuhours/1e6}M</Button>
          <p className="text-[14px]  font-serif text-gray-600">GPU hours or</p> 
          <Button className="w-fit">{data.days}</Button>
          <p className="text-[14px]  font-serif text-gray-600">days. It consumed </p> 
          <Button className="w-fit">{data.used}</Button>
          <p className="text-[14px]  font-serif text-gray-600">FLOPs on</p> 
          <Button className="w-fit">{gpus}</Button>
          <p className="text-[14px]  font-serif text-gray-600">H100 GPUs at a total cost of</p> 
          <Button className="w-fit">${data.price/1e6}M</Button>
          <p className="text-[14px]  font-serif text-gray-600"> at a rate of</p> 
          <Button className="w-fit">$4.0</Button>
          <p className="text-[14px]  font-serif text-gray-600">per GPU/per hour.</p> 
        </div>}

        <p className="font-sans text-[14px] mt-4">The formuals that go behind this calcuator are:</p>
        <div className="[&::-webkit-scrollbar]:hidden  text-[16px] font-serif text-gray-600 bg-gray-200/[0.5] rounded-md overflow-auto p-2 my-3 whitespace-nowrap">
          <p>FLOPs needed = <span className="tracking-widest"> 6 x N x D</span></p>
          <p>FLOPs throughput = <span className="tracking-widest"> peak FLOPs x no of GPUs x 0.4 (assumed flops utilization rate)</span></p>
          <p>Training Time (s) = <span className="tracking-widest"> flops needed / flops throughput</span></p>
          <p>FLOPs used = <span className="tracking-widest"> peak FLOPs x no. of GPUs x training time (s)</span></p>
        </div>
        <Collapsible>
          <CollapsibleTrigger className="text-[14px] font-sans font-semibold w-full text-left my-3">Note &#8594;</CollapsibleTrigger>
          <CollapsibleContent className="text-[14px] font-sans mt-1">
             As per Meta AI, Llama-3-70B was trained for 6.4M GPU hours on 16k H100s with a peak FLOPs of 400e12, this translates to 400 hours of training time. Thus llama-3-70b is a ~9e24 model.
          </CollapsibleContent>
        </Collapsible>
        <p className="font-sans text-[14px] mt-4">Hourly rates to calcuate cost of training are taken from <span className="font-semibold underline">lambdalabs</span>. These metrics are mere estiamtions based on a few assumptions and paper math scaling laws. Things like gpu cluster performance, costs and mfu can vary significantly due to multiple factors and are a great engineering challenge!.</p>
        <p className="font-sans text-[14px] mt-4">This tool is only to give you a glimpse of the maths and numbers that go behind model training.</p>

    </div>
  );
}