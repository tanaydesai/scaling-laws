"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Compute } from '@/components/compute'
import { Tokens } from '@/components/tokens';
import { Flops } from '@/components/flops';
import { CiCalculator1 } from "react-icons/ci";
import {CurvedlineChart} from "@/components/chart"
import { MdScience } from "react-icons/md";
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  return (
    <div className="p-6 max-w-[600px] mx-auto my-10">
        <div className="flex flex-col gap-6">
          <p className="font-serif text-[27px] flex gap-2 items-center">Scaling Laws  <MdScience/></p>
          <p className="font-sans text-[14px]">The point to which Scaling laws <span className='font-semibold underline'>Kaplan et al. (2020)</span> govern the current artificial intelligence revolution is vastly unknown and underappretiate given the predictability and clear future trends spelled out by them.</p>
          <p className="font-sans text-[14px]">This site aspires to demystify scailing laws and make them accessible and eaiser to comphrehend via a few mini-calcuators.</p>
          <p className="font-sans text-[14px]">These tools mainly aim to <span className='font-semibold'>answer and visualize</span> three simple questions:</p>
          <ul className="font-sans text-[14px] list-disc list-inside">
            <li>How do you calcuate total compute used in model training?</li>
            <li>For a given model size what is the compute-optimal number of tokens to train for?</li>
            <li>For a given model size and data or training time, what are the costs concurred, FLOPs consumed by a given number of GPUs for training?</li>
          </ul>
          <Collapsible>
            <CollapsibleTrigger className="text-[14px] font-sans font-semibold w-full text-left my-3">At the end &#8594;</CollapsibleTrigger>
            <CollapsibleContent className="text-[14px] font-sans mt-1">
              You can find all the <span className='font-semibold underline'>sources</span>, references, and the <span className='font-semibold underline'>colab notebook</span> used for these calcuations and real world scenarios that fact-check our calcuations. Let's begin! 
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Tabs defaultValue="compute" className='mt-10'>
          <TabsList className="text-gray-600 bg-gray-200">
            <TabsTrigger value="compute">Compute</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="flops">FLOPs</TabsTrigger>
          </TabsList>
          <TabsContent value="compute"><Compute /></TabsContent>
          <TabsContent value="tokens"><Tokens /></TabsContent>
          <TabsContent value="flops"><Flops /></TabsContent>
        </Tabs>

      
        <div className="flex flex-col gap-3 my-10">
            <h2 className="font-serif text-[23px]">Future</h2>
            <p className="font-sans text-[14px] mt-4">This section will deal with the first question. First you require a compute budget (C), but if you don't know how to determine yours, this should also help you out.</p>
            <CurvedlineChart />
        </div>

        <div className="flex flex-col gap-3 my-10">
            <h2 className="font-serif text-[23px]">Sources</h2>
            <p className="font-sans text-[14px] mt-4">This section will deal with the first question. First you require a compute budget (C), but if you don't know how to determine yours, this should also help you out.</p>
        </div>

        <div className='h-[1.5px] border-none bg-gray-200 w-[50px] mx-auto mt-[80px]' />

  </div>
  )
}
