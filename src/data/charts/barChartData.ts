import { TBarChartData } from '../types'

export const barChartData: TBarChartData = {
  labels: ['一班', '二班', '三班', '四班', '五班'],
  datasets: [
    {
      label: '总人数',
      backgroundColor: 'primary',
      data: [50, 45, 66, 60, 57],
    },
    {
      label: '合格人数',
      backgroundColor: 'info',
      data: [45, 40, 55, 48, 56],
    },
  ],
}
