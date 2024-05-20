"use client"
import React, { useState } from 'react';
import { Compute } from '@/components/compute'
import { Tokens } from '@/components/tokens';
import { Flops } from '@/components/flops';
import {CurvedlineChart} from "@/components/chart"
import { MdScience } from "react-icons/md";
import {Collapsible,CollapsibleContent,CollapsibleTrigger,} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="p-6 max-w-[600px] mx-auto my-10">

        <div className="flex flex-col gap-6">
          <p className="font-serif text-[27px] flex gap-2 items-center">Scaling Laws  <MdScience/></p>
          <p className="font-sans text-[14px]">The point to which Scaling laws <span className='font-semibold underline'><a href='https://arxiv.org/pdf/2001.08361'>Kaplan et al. (2020)</a></span> govern the current artificial intelligence revolution is vastly unknown and underappretiate given the predictability and clear future trends spelled out by them.</p>
          <p className="font-sans text-[14px]">This site aspires to demystify scailing laws and make them accessible and eaiser to comphrehend via a few mini-calcuators.</p>
          <p className="font-sans text-[14px]">These tools mainly aim to <span className='font-semibold'>answer and visualize</span> three simple questions:</p>
          <ul className="font-sans text-[14px] list-disc list-inside">
            <li>How do you calcuate total compute used in model training?</li>
            <li>For a given model size what is the compute-optimal number of tokens to train for?</li>
            <li>For a given model size, data tokens or training time, what are the costs concurred, FLOPs consumed and tons of CO2 emitted by a given number of GPUs for training?</li>
          </ul>
          <Collapsible>
            <CollapsibleTrigger className="text-[14px] font-sans font-semibold w-full text-left my-3">Credits &#8594;</CollapsibleTrigger>
            <CollapsibleContent className="text-[14px] font-sans mt-1">
              <p className="font-sans text-[14px] mb-4">This project is by <span className='font-semibold underline'><a href='https://tanaydesai.com'>@tanaydesai</a></span> and is available on <span className='inline-flex items-center px-0.5'><FaGithub size={13}/></span> <span className='font-semibold underline'><a href='https://github.com/tanaydesai/scaling-laws'>GitHub</a></span>.</p>
              You can find all the <span className='font-semibold'>sources</span> and references used for these calcuations at the end. Let's begin!             
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
            <p className="font-sans text-[14px] mt-4">Here is a graph of major models trained by frontier artificial intelligence labs. <span className='font-semibold underline'><a href='https://www.whitehouse.gov/briefing-room/statements-releases/2023/10/30/fact-sheet-president-biden-issues-executive-order-on-safe-secure-and-trustworthy-artificial-intelligence/'>The Biden Executive Order</a></span> had the reporting requirement set at <span className='font-semibold'>1e26</span>, as you can see, we are approaching that threshold very quickly with the largest model trained in terms of compute being <span className='font-semibold'>Google DeepMind's Gemini 1.0 Ultra</span> as per April 2024.</p>
            <CurvedlineChart />
            <p className="font-sans text-[14px] mt-4">This dataset and several other detailed articles covering the ongoing artificial intelligence revolution can be found at <span className='font-semibold underline'><a href='https://epochai.org/blog/tracking-compute-intensive-ai-models'>Epochai.org</a></span>!</p>
        </div>

        <div className="flex flex-col gap-3 my-10">
            <h2 className="font-serif text-[23px]">Sources</h2>
            <p className="font-sans text-[14px]">This project is available on <span className='inline-flex items-center px-0.5'><FaGithub size={13}/></span> <span className='font-semibold underline'><a href='https://github.com/tanaydesai/scaling-laws'>GitHub</a></span>.</p>

            <p className="font-sans text-[14px] my-4">All the numbers, metrics, formulas and fact-checking used and done for in this project have been sourced from various articles, tweets and research papers mentioned below.</p>
            <ul className="font-sans text-[14px] list-disc list-inside font-semibold underline">
              <li><a href='https://arxiv.org/pdf/2001.08361'>Kaplan et al. (2020)</a></li>
              <li><a href='https://arxiv.org/pdf/2203.15556'>Hoffmann et al. (2022) </a></li>
              <li><a href='https://epochai.org/blog/tracking-compute-intensive-ai-models6'>Epochai: Tracking Compute-Intensive AI Models.</a></li>
              <li><a href='https://www.lesswrong.com/posts/pckLdSgYWJ38NBFf8/gpt-4#2mKqGJnf2aTfQMZDq'>GPT-4 Estimates.</a></li>
              <li><a href='https://twitter.com/karpathy/status/1781028605709234613'>Andrej karpathy's write up which covers extensive details about llama 3 models.</a></li>
              <li><a href='https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md'>Llama 3 Model Card: All numbers used for llama 3 are taken from here.</a></li>
              <li><a href='https://colab.research.google.com/drive/1O99z9b1I5O66bT78r9ScslE_nOj5irN9?usp=sharing#scrollTo=tRnfGB3bPhQ9'>Colab notebook: Cost estimates for GPT-4.</a></li>
            </ul>
            <p className="font-sans text-[14px] mt-4">I hope this project is helpful in any way and would love to hear any feedback on project improvements/suggestions as well as any corrections needed in the calcuations!</p>
        </div>

        <div className='h-[1.5px] border-none bg-gray-200 w-[50px] mx-auto mt-[80px]' />
        <div className='mx-auto mt-10 text-center w-fit'>
          <p className="font-serif text-[17px] flex gap-2 items-center">Scaling Laws</p>
          <p className="font-sans text-[12px] my-2"><a href='https:///tanaydesai.com/'>Tanay Desai &#8594;</a></p>
        </div>
  </div>
  )
}
