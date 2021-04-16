import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getChartData } from 'reducers/trade';
import moment from 'moment';
import * as echarts from 'echarts';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { breakUp } from 'styles/_mixin';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  width: 95%;
  height: calc(100vh - 90px);
  
  ${breakUp.lg`
      max-width: 1550px;
      width: 80%;
  `}
`;


const TradeChartWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.5rem;
  margin: 0 auto;
  height: 500px;
  position: relative;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0 20px 0;
  position: relative;
  font-weight: bold;

  &::before {
    position: absolute;
    content: '';
    width: 5px;
    height: 80%;
    background-color: #accff7;
  }
`;

const ExchangeTitle = styled.p`
  margin: 0 0 0.5rem 0;
  padding-left: 10px;
  opacity: 0.6;

`;

const CoinTitle = styled.p`
  margin: 0 0 0.5rem 0;
  padding-left: 10px;
  font-size: 1.5rem;
`


const TradeChart = styled.div` 
  width: 95%;
  height: 100%;
  padding: 10px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
`;


const Chart = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const chartRef = useRef(null);
  const echart = useRef(null);
  const series = useRef(null);
  const xAxis = useRef(null);
  const timeId = useRef(null);
  const isLoaded = useRef(false);

  const {chartData, loading} = useSelector(({trade})=>({
      chartData: trade.chartData
  }));

  const {name} = match.params;
  

  const updateChart = useCallback(() =>{
    if(!echart.current || !series.current) return;

    if(!chartData.length) return;

    const dates = chartData.map((info)=>new moment(info["timestamp"]).format('YYYY-MM-DD HH:mm'));
    const candleStickData = chartData.map((info)=> ([
        info["opening_price"],
        info["trade_price"],
        info["low_price"],
        info["high_price"],
    ]));
    const volumes = chartData.map((info)=>info['candle_acc_trade_volume'].toFixed(3));
    
    xAxis.current[0].data = dates;
    xAxis.current[1].data = dates;
    series.current[0].data = candleStickData;
    series.current[1].data = volumes;

    echart.current.setOption({
      series: series.current,
      xAxis: xAxis.current
    });
  },[chartData])

  const drawChart = useCallback(() => {
    if(loading) return;

    if(echart.current) {
      echart.current.dispose();
      echart.current = null;
    }

    const chart = echarts.init(chartRef.current);
    echart.current = chart;

    if(!chartData.length) return;

    const dates = chartData.map((info)=>new moment(info["timestamp"]).format('YYYY-MM-DD HH:mm'));
    const candleStickData = chartData.map((info)=> ([
        info["opening_price"],
        info["trade_price"],
        info["low_price"],
        info["high_price"],
    ]));
    const volumes = chartData.map((info)=>info['candle_acc_trade_volume'].toFixed(3));
    const option = {
      backgroundColor: '#ffff',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          label: {
            formatter: (object) => isNaN(object.value)
                ? moment(object.value).format('YYYY MMM DD HH:mm')
                : object.value
          },
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function(pos,params,dom,rect,size) {
          const obj = {
            top: 10          
          };

          obj[
            ['left', 'right'][+ (pos[0] < size.viewSize[0] / 2)]
          ] = 100;
          return obj;
        },
        extraCssText: 'width: 140px'
      },
      axisPointer: {
        label: {
          backgroundColor: '#777',
        },
        link: {xAxisIndex: 'all'},
      },
      grid: [
        {
          top: '10%',
          left: '0%',
          right: '10%',
          height: '60%'
        }, {
          left: '0%',
          right: '10%',
          bottom: '10%',
          height: '15%'
        }   
      ],
      xAxis: [
        {
          type: 'category',
          data: dates,
          scale: true,
          boundaryGap: false,
          axisLabel: {
            formatter: (date) => moment(date).format('MMM DD HH:mm')
          },
          axisLine: {
            onZero: false
          },
          splitLine: {
            show: true,
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: dates,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          },
          position: 'right'
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},

        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0,1],
          start: 60,
          end: 100
        }, {
          show: true,
          xAxisIndex: [0,1],
          type: 'slider',
          bottom: '0%',
          height: '10%',
          start: 60,
          end: 100,
          showDetail: false,
        }
      ],
      animation: false,
      series: [
        {
          type: 'candlestick',
          name: '가격변화',
          data: candleStickData,
          itemStyle: {
            normal: {
              color: '#FA0000',
              color0: '#1161C4',
              borderColor: null,
              borderColor0: null  
            }
          },
        },
        {
          name: '거래량',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes
        }
      ]
    }

    series.current = option.series;
    xAxis.current = option.xAxis;
    chart.setOption(option);
  },[chartData,loading])

  const regularUpdate = useCallback(({candleType = "minutes", market}) => {
    dispatch(getChartData({candleType, market:`KRW-${market}`}));
    timeId.current = setTimeout(()=>{
        regularUpdate({candleType,market});
    },1200);
  },[dispatch]);

  const loadChartData = useCallback(({candleType = "minutes", market}) => {
    dispatch(getChartData({candleType, market:`KRW-${market}`}));
    clearTimeout(timeId.current);
    timeId.current = setTimeout(()=>{
      regularUpdate({candleType,market});
    },1000);
  },[dispatch,regularUpdate])

  const handleResize = debounce(() => {
    if(echart.current) {
      echart.current.resize();
    }
  },100);

  useEffect(() => {
    if(!isLoaded.current&&!loading){
        drawChart();
        isLoaded.current = true;
        return;
    } else {
       updateChart(); 
       return;
    }
  },[drawChart,loading,chartData,updateChart,handleResize])

  useEffect(()=>{
    if(!name) return;

    loadChartData({market:name});
    return () => {
      clearTimeout(timeId.current);
    }
  },[dispatch,name,loadChartData]);

  useEffect(() => {
    window.addEventListener('resize',handleResize);
    return () => {
      window.removeEventListener('resize',handleResize);
    }
  },[handleResize])

  return ( 
    <Container>
      <TitleWrapper>
        <CoinTitle>{name}/KRW 거래</CoinTitle>
        <ExchangeTitle>Upbit(업비트)</ExchangeTitle>
      </TitleWrapper>
      <TradeChartWrapper>
        <TradeChart ref={chartRef}/>
      </TradeChartWrapper>
    </Container>
  )
}

export default Chart;
