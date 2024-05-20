"use client"
import React, {useState, useEffect} from 'react'
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveScatterPlot } from "@nivo/scatterplot"
import { data } from '@/lib/data'


  export const CurvedlineChart = (props) => {
    return (
      <div {...props} className='w-full h-[400px] mt-5'>
        <ResponsiveScatterPlot
          data={data}
          margin={{ top: 10, right: 10, bottom: 40, left: 55 }}
          xScale={{
            type: 'time',
            format: '%d-%m-%Y',
            precision: 'day',
            min: '01-06-2021',
          }}
          xFormat="time:%d-%m-%Y" 
          yScale={{ type: 'symlog',min: 1e23, max: 1e26,base: 10 }}
          yFormat=">-.2e"
          gridYValues={[1e23,2e23, 5e23, 1e24,2e24, 5e24, 1e25,2e25, 3e25, 5e25, 1e26]}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: 'Year',
            legendPosition: 'middle',
            tickSize: 5,
            legendOffset: 35,
            format: '%Y',
            tickValues: 'every 1 year',
          }} 
          axisLeft={{tickSize: 0,tickPadding: 5, orient: 'left',legend: 'Compute (FLOP)',legendPosition: 'middle',legendOffset: -50,tickValues: [1e23,2e23, 5e23, 1e24,2e24, 5e24, 1e25,2e25, 3e25, 5e25, 1e26],format: '.2f'}}
          colors={["red", "#e11d48"]}
          useMesh={true}
          tooltip={({node}) => <ToolTip {...node.data} />}
          />
      </div>
    );
  }
  
const ToolTip = (props) => {

  return(
    <div className='min-w-[200px] max-w-[260px] h-auto bg-gray-200 rounded-[6px] text-left text-[14px] shadow-md text-black'>
        <div className='w-full border-b-2 p-2 border-gray-300 flex '><div className='w-[90px] font-semibold'>Model:</div> <div>{props.System}</div></div>
        <div className='w-full border-b-2 p-2 border-gray-300 flex'><div className='w-[90px] font-semibold flex-shrink-0'>Parameters:</div><div>{props.Size ? `${props.Size/1e9}B` : "N/A"}</div></div>
        <div className='w-full border-b-2 p-2 border-gray-300 flex'><div className='w-[90px] font-semibold flex-shrink-0 '>Compute:</div><div>{props.y}</div></div>
        <div className='w-full border-b-2 p-2 border-gray-300 flex'><div className='w-[90px] font-semibold flex-shrink-0'>Data:</div><div>{props.Dataset ? `${props.Dataset/1e12}T` : "N/A"}</div></div>
        <div className='w-full border-b-2 p-2 border-gray-300 flex'><div className='w-[90px] font-semibold flex-shrink-0'>Company:</div><div>{props.Organization}</div></div>
        {props.GPUs && props.GPU && <div className='w-full border-b-2 p-2 border-gray-300 flex'><div className='w-[90px] font-semibold flex-shrink-0'>Hardware:</div><div className='h-auto '>{props.GPUs / 1e3}K {props.GPU ? props.GPU : "GPUs"}</div></div>}
    </div>
  )
}