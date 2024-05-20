"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {CurvedlineChart} from "@/components/chart"
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"


export const Compute = () => {
  const [flops, setFlops] = useState(0)
  const [gpus, setGpus] = useState(0)
  const [time, setTime] = useState(0)
  const [total, setTotal] = useState(0)

  const getTotal = (flops = flops, gpus = gpus, time = time) => {
     setTotal(`${(flops * gpus * time).toExponential().split('e')[0]}e${(flops * gpus * time).toExponential().split('e')[1]}`)
  }
  
  return (
    <div className="flex flex-col gap-3 my-10">
        <h2 className="font-serif text-[23px]">Compute</h2>
        <p className="font-sans text-[14px] mt-4">This section will deal with the first question. How do you calcuate a compute (C)? Here is a simple formula that detemines the total compute used:</p>
        
        <p className="[&::-webkit-scrollbar]:hidden  text-[16px] font-serif text-gray-600 bg-gray-200 rounded-md overflow-auto p-2 my-3 whitespace-nowrap">Total compute = <span className="tracking-widest"> *peak FLOPs x number of GPUs x training time (s)</span></p>
        <RadioGroup onValueChange={(e) => {
          if (e == "option-two") {
            setGpus(16000);setTime(5184000);setFlops(400e12)
            getTotal(400e12, 16000, 5184000)
          }
          else if (e == "option-three") {
            setGpus(16000);setTime(1440000);setFlops(400e12)
            getTotal(400e12, 16000, 1440000)
          }
          else{
            setGpus(0);setTime(0);setFlops(0)
            getTotal(0, 0, 0)
          }
        }} defaultValue="option-one" className="flex mb-5 font-sans text-[14px] gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <div>Custom</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <div>GPT-4</div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three" />
            <div>Llama-3-70b</div>
          </div>
        </RadioGroup>

        <div className="flex-grow md:flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger className="w-full md:w-fit"><Input value={flops} onChange={(e) => {setFlops(e.target.value);getTotal(e.target.value, gpus, time)}} className="md:w-[100px] outline-none bg-gray-200" defaultValue={0}  type="number" /></HoverCardTrigger>
            <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">peak FLOPs</HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="w-full flex items-center gap-2 md:w-fit">
              <p className="text-[14px] text-center font-serif text-gray-600">x</p> 
              <Input value={gpus} onChange={(e) => {setGpus(e.target.value);getTotal(flops, e.target.value, time)}} className="md:w-[100px] outline-none bg-gray-200" defaultValue={0} type="number" />
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]"># of GPUs</HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger className="w-full flex items-center gap-2 md:w-fit">
              <p className="text-[14px]  text-center font-serif text-gray-600">x</p> 
              <Input value={time} onChange={(e) => {setTime(e.target.value);getTotal(flops, gpus, e.target.value)}} className="md:w-[100px] outline-none bg-gray-200" defaultValue={0} type="number" />
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-fit p-2 font-sans text-[14px]">training time (s)</HoverCardContent>
          </HoverCard>

          <p className="text-[14px] text-center font-serif text-gray-600">=</p> 
          <Button className="md:w-fit md:self-end">{total} FLOPs</Button>
        </div>

        <Collapsible className="my-5 mb-6">
          <CollapsibleTrigger className="text-[14px] font-sans font-semibold w-full text-left my-3">Note &#8594;</CollapsibleTrigger>
          <CollapsibleContent className="text-[14px] font-sans mt-1">
            * Example: 600-900 TFLOPs for an H100. You get this number from your chip provider like NVIDIA. Although, assume a generous utilization rate of 40%
          </CollapsibleContent>
        </Collapsible>

        {/* <CurvedlineChart className="w-full aspect-[2/1]" /> */}
    </div>
  );
}