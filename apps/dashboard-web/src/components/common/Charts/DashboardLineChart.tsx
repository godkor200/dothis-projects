import dayjs from 'dayjs';
import ReactApexChart from 'react-apexcharts';

import { useStartDate } from '@/store/dateStore';
import { getDateObjTime } from '@/utils/contents/dateObject';

interface Props {
  series: ApexAxisChartSeries;
}

const DashboardLineChart = ({ series }: Props) => {
  const startDate = useStartDate();
  return (
    <ReactApexChart
      type="line"
      height={230}
      width={570}
      key={'number'}
      series={series}
      // 데이터의 숫자가 정확히 일치해야 tooltipe이 같이뜬다.,
      options={{
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: { show: false },
          height: '100px',
          width: '200px',

          type: 'line',
          stacked: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '10px',
            //   endingShape: 'rounded',
          },
        },

        grid: {
          strokeDashArray: 4,
          // show:false
          padding: {
            // right: -10,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'monotoneCubic',
          width: [4, 4, 1],
        },
        title: {
          // text: 'XYZ - Stock Analysis (2009 - 2016)',
          align: 'left',
          // offsetX: 110,
        },

        yaxis: [
          {
            seriesName: series[0].name,
            opposite: false,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,

              color: '#F0516D',
            },
            floating: true,

            labels: {
              show: true,

              formatter(val, opts) {
                const compactNumber = new Intl.NumberFormat('ko', {
                  notation: 'compact',
                });
                return compactNumber.format(val);
              },
              style: {
                colors: '#71717A',
                fontSize: '12px',
              },
            },
            title: {
              // text: '일일 조회 수',
              // style: {
              //   color: '#71717A',
              // },
            },
            tooltip: {
              enabled: true,
            },
          },

          {
            seriesName: series[1].name,
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: '#818CF8',
            },
            floating: true,
            labels: {
              show: true,

              formatter(val, opts) {
                return val.toLocaleString('ko-kr');
              },
              style: {
                colors: '#71717A',
                fontSize: '12px',
              },
            },
            title: {
              // text: '검색량',
              style: {
                color: '#818CF8',
              },
            },
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
              color: '#818CF8',
            },

            labels: {
              show: false,

              style: {
                colors: '#333',
                fontSize: '14px',
                fontWeight: 'bold',
              },
            },
            title: {
              // text: '검색량',
              style: {
                color: '#818CF8',
              },
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            show: false,

            axisTicks: {
              // show: true,
            },
            axisBorder: {
              show: false,
              color: '#34D399',
            },
            labels: {
              style: {
                colors: '#34D399',
              },
            },
            title: {
              text: '영상 수',
              style: {
                color: '#34D399',
              },
            },
          },
          {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,

              color: '#F0516D',
            },

            labels: {
              show: false,

              style: {
                colors: '#F0516D',
              },
            },
          },
        ],
        xaxis: {
          type: 'datetime',
          min: getDateObjTime(startDate), // 시작 날짜 설정
          // max: getDateObjTime(endDate),
          tooltip: {
            enabled: false,
          },
          labels: {
            format: 'MM.dd',
            // offsetX:
          },
          tickPlacement: 'on',
        },

        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: 'center',
          offsetY: 5,
          itemMargin: {
            horizontal: 10,
          },
          markers: {
            radius: 4,
          },
          // floating: true,
        },
      }}
    />
  );
};

export default DashboardLineChart;
