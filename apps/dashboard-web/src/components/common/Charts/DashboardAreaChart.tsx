import ReactApexChart from 'react-apexcharts';

import { useStartDate } from '@/store/dateStore';
import { getDateObjTime } from '@/utils/contents/dateObject';

interface Props {
  series: ApexAxisChartSeries;
}

const DashboardAreaChart = ({ series }: Props) => {
  const startDate = useStartDate();

  return (
    <ReactApexChart
      className="range-area-chart"
      options={{
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          // height: 350,
          type: 'rangeArea',
          // animations: {
          //   speed: 500,
          // },
        },
        colors: ['#d4526e', '#d4526e'],
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: [0.24, 1],
        },
        forecastDataPoints: {
          // count: 2,
        },

        stroke: {
          curve: 'straight',
          width: [1, 2],
        },
        legend: {
          show: true,
          customLegendItems: ['평균성과'],
          inverseOrder: true,
        },
        title: {
          // text: '평균성과',
        },
        markers: {
          hover: {
            sizeOffset: 5,
          },
        },

        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          type: 'datetime',
          min: getDateObjTime(startDate), // 시작 날짜 설정
          // max: getDateObjTime(endDate),

          tickPlacement: 'between',
          tooltip: {
            enabled: false,
          },
          // floating: true,
          labels: {
            // formatter(value, timestamp, opts) {

            //   return dayjs(value).format('YYYY-MM-DD');
            // },

            style: {
              cssClass: 'test',
            },
            format: 'MM.dd',
          },
        },
        /**
         * https://github.com/apexcharts/apexcharts.js/issues/1053
         * datetime 타입으로 지정시 last label이 보이지않는 버그가 존재
         */
        // xaxis: {
        //   type: 'datetime',
        //   // offsetX: 40,
        // },

        /**
         * https://github.com/apexcharts/apexcharts.js/issues/1053
         * xAxis last label이 보이지않는 이슈로 인해 가상의 yAxis 추가로 주입
         */
        yaxis: [
          {
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
                return val.toLocaleString('ko-kr');
              },
              style: {
                colors: '#71717A',
                fontSize: '12px',
              },
            },
            title: {
              // text: '일일 조회 수',
              style: {
                color: '#F0516D',
              },
            },
            tooltip: {
              enabled: true,
            },
          },

          {
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
                colors: '#818CF8',
              },

              minWidth: 0,
            },
            title: {
              style: {
                color: '#818CF8',
              },
            },
          },
        ],
      }}
      series={series}
      type="rangeArea"
      height={230}
      width={570}
    />
  );
};

export default DashboardAreaChart;
