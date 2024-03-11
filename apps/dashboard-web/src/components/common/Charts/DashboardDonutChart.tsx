import { colors } from '@dothis/theme/dashboard/colors';
import ReactApexChart from 'react-apexcharts';

interface Props {
  labels: string[];
  series: number[];
}

const DashboardDonutChart = ({ labels, series }: Props) => {
  return (
    <ReactApexChart
      options={{
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            donut: {
              // donut chart bar 사이즈
              size: '75',

              /**
               * label => 가운데(dont안에) 레이블의 여부
               * label -> total =>  label을 합계 데이터로 보여질지 여부
               * total 옵션을 사용하는데 style 커스텀이 어려워서 직접 css로 조정
               */
            },
          },
        },
        labels: labels.length
          ? labels
          : ['1만이상', '2만이상', '3만이상', '4만이상', '5만이상'],
        colors: [
          colors.primary600,
          colors.primary400,
          colors.primary300,
          colors.primary200,
          colors.primary100,
        ],
        // donut chart bar와의 gap 설정 프로퍼티
        stroke: { width: 3 },

        // only hover시에만 legend가 보여지도록
        legend: {
          show: false,
        },

        // donut bar에 data 퍼센테이지 표시여부
        dataLabels: {
          enabled: false,
        },
      }}
      series={series.length ? series : [44, 55, 41, 17, 15]}
      type="donut"
      width={'100%'}
    />
  );
};

export default DashboardDonutChart;
