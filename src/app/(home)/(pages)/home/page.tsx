import { Metadata } from 'next';
import HomePage from './components/HomePage';

export const metadata: Metadata = {
  title: 'HRConnect - Simplify Your HR Management',
  description: 'Streamline your HR processes, boost employee productivity, and make data-driven decisions with our comprehensive HR management platform.',
  keywords: 'HR management, HR software, employee management, payroll, attendance tracking',
};

export default function Page() {
  return <HomePage />;
}