"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { GoCpu } from "react-icons/go";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"


export const Flops = () => {
  const [params, setParams] = useState(0)
  const [tokens, setTokens] = useState(0)
  const [pflops, setPflops] = useState(0)
  const [gpus, setGpus] = useState(0)

  const [data, setData] = useState({days: 0, hours: 0, gpuhours: 0,needed:0, used:0, price:0})

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



  return (
    <div className="flex flex-col gap-3 my-10">
        <h2 className="font-serif text-[23px]">Time, Money and FLOPs</h2>
        <p className="font-sans text-[14px] mt-4">Perhaps the most interesting, this section will deal with the third and final question. You can either input the time taken for a model training run or the model size and data used. This info is often provided my frontier labs or is leaked to the public overtime.</p>
        
        <RadioGroup defaultValue="option-one" className="flex mt-2 mb-5 font-sans text-[14px] gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <div>By Time</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <div>By Model Size & Data</div>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-flow md:grid-cols-2 grid-flow-row whitespace-nowrap gap-2">
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Model Size (N): </p> 
            <HoverCard>
              <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={params} onChange={(e) => setParams(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">params</HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center gap-2 my-2">
            <p className="text-[14px] text-center font-serif text-gray-600">Tokens (D): </p> 
            <HoverCard>
              <HoverCardTrigger asChild className="w-full"><Input className="bg-gray-200 outline-none" value={tokens} onChange={(e) => setTokens(e.target.value)} placeholder="0" type="number" /></HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">tokens</HoverCardContent>
            </HoverCard>
          </div>
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

        {params !== 0 && tokens !== 0 && pflops !== 0 && gpus !== 0 && 
          <div className="flex items-center flex-wrap gap-2 my-2" onClick={get}>
          <p className="text-[14px]  font-serif text-gray-600">You're all done! Your </p> 
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
          <p className="text-[14px]  font-serif text-gray-600">dollars at a rate of</p> 
          <Button className="w-fit">$1.3</Button>
          <p className="text-[14px]  font-serif text-gray-600">per GPU/per hour. Congratulations!</p> 
        </div>}

        <p className="font-sans text-[14px] mt-4">Hourly rates to calcuate cost of training are taken from <span className="font-semibold underline">lambdalabs</span>. Some basic formuals that drive these calcuations are:</p>
        <div className="[&::-webkit-scrollbar]:hidden  text-[16px] font-serif text-gray-600 bg-gray-200/[0.5] rounded-md overflow-auto p-2 my-3 whitespace-nowrap">
          <p>FLOPs used = <span className="tracking-widest"> peak FLOPs x no. of GPUs x training time (s)</span></p>
          <p>FLOPs needed = <span className="tracking-widest"> 6 x N x D</span></p>
          <p>FLOPs throughput = <span className="tracking-widest"> peak FLOPs x no of GPUs x 0.4 (assumed flops utilization rate)</span></p>
          <p>Training Time (s) = <span className="tracking-widest"> flops needed / flops throughput</span></p>
        </div>
        <Collapsible>
          <CollapsibleTrigger className="text-[14px] font-sans font-semibold w-full text-left my-3">Keep in mind &#8594;</CollapsibleTrigger>
          <CollapsibleContent className="text-[14px] font-sans mt-1">
             These metrics, taken a few assumptions, are mere estiamtions based on some paper math and scailing laws. Actual gpu cluster performance and cost can vary significantly due to multiple factors. Achieving 40% mfu across a cluster is a great engineering challenge!. This tool is only to give you a glimpse of the maths and numbers that go behind model training.
          </CollapsibleContent>
        </Collapsible>
    </div>
  );
}