import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import { formatINR } from '../../utils/currency';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ExpenseOverview() {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [120000, 190000, 80000, 210000, 150000, 280000],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563EB',
        borderWidth: 2,
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 14, weight: 'bold' },
        displayColors: false,
        callbacks: {
          label: (context) => formatINR(context.parsed.y)
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter' } } },
      y: { 
        grid: { color: 'rgba(226, 232, 240, 0.5)' },
        border: { display: false },
        ticks: { 
          font: { family: 'Inter' },
          callback: (value) => formatINR(value)
        } 
      }
    }
  };

  const doughnutData = {
    labels: ['Flights', 'Accommodation', 'Food', 'Activities'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ['#2563EB', '#38BDF8', '#F97316', '#10B981'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const doughnutOptions = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed}%`
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-text">Expense Overview</h3>
          <p className="text-sm text-text-secondary">Your spending across all trips</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-heading font-bold text-text">₹10,30,000</p>
          <p className="text-xs text-emerald-500 font-semibold flex items-center justify-end gap-1">
            <TrendingDown size={14} /> 12% vs last year
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[300px]">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="h-[300px] flex flex-col justify-center relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-text-secondary">Top Expense</span>
            <span className="text-lg font-bold text-primary">Flights</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        {['Flights', 'Accommodation', 'Food', 'Activities'].map((category, i) => (
          <div key={category} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
            <div className={`w-2 h-2 rounded-full ${['bg-[#2563EB]', 'bg-[#38BDF8]', 'bg-[#F97316]', 'bg-[#10B981]'][i]}`}></div>
            {category}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
