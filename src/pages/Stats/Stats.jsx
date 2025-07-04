import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { 
  BiListUl, 
  BiDollarCircle, 
  BiUser, 
  BiUserPlus, 
  BiEnvelope, 
  BiPhone,
  BiTrendingUp,
  BiBarChart,
  BiLineChart,
  BiCalendar,
  BiChevronRight
} from 'react-icons/bi';
import { paymentsData } from '../../data/paymentsData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Stats.css';

const Stats = () => {
  const [salesChartType, setSalesChartType] = useState('area');
  const [earningsChartType, setEarningsChartType] = useState('area');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrSmaller(window.innerWidth <= 1024);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const finalValues = {
    orders: 120,
    earnings: 200000,
    customers: 100,
    newCustomers: 50
  };

  const customers = [
    {
      name: 'Raju Kumar',
      id: '7',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      value: '₹1,25,000'
    },
    {
      name: 'Priya Sharma',
      id: '12',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'new',
      value: '₹2,10,000'
    },
    {
      name: 'Arjun Patel',
      id: '21',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'premium',
      value: '₹3,45,000'
    },
    {
      name: 'Maya Singh',
      id: '35',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'active',
      value: '₹95,000'
    }
  ];

  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const monthPayments = paymentsData.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() === index;
      });
      const totalValue = monthPayments.reduce((sum, payment) => {
        const amount = parseFloat(payment.amount.replace('₹', '').replace(',', '')) || 0;
        return sum + (payment.status === 'Completed' ? amount : 0);
      }, 0);
      const prevMonthValue = index > 0 ? 
        paymentsData.filter(p => {
          const pDate = new Date(p.date);
          return pDate.getMonth() === index - 1;
        }).reduce((sum, p) => sum + (p.status === 'Completed' ? parseFloat(p.amount.replace('₹', '').replace(',', '')) : 0), 0) : totalValue;
      const growth = prevMonthValue ? ((totalValue - prevMonthValue) / prevMonthValue * 100).toFixed(1) : 0;
      return { name: month, value: totalValue / 1000, growth: parseFloat(growth) };
    });
  }, []);

  const sparklineData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    return months.map((month, index) => ({
      name: month,
      value: 20 + Math.random() * 50
    }));
  }, []);

  const StatCard = ({ title, value, growth, icon: Icon, color, suffix = '' }) => {
    const valueString = `${suffix}${value.toLocaleString('en-IN')}`;
    const getFontSize = () => {
      if (valueString.length > 8) return '1.8rem';
      if (valueString.length > 6) return '2.2rem';
      return '2.5rem';
    };

    return (
      <div className="stats__card">
        <div className="stats__card-header">
          <div className="stats__card-info">
            <p className="stats__card-title">{title}</p>
            <div className="stats__card-value-container">
              <span className="stats__card-value" style={{ fontSize: getFontSize() }}>
                {suffix}{value.toLocaleString('en-IN')}
              </span>
              <div className={`stats__growth-indicator ${growth >= 0 ? 'stats__growth-indicator--positive' : 'stats__growth-indicator--negative'}`}>
                <BiTrendingUp className="stats__growth-icon" />
                <span>{growth >= 0 ? '+' : ''}{growth}%</span>
              </div>
            </div>
          </div>
          <div className={`stats__card-icon stats__card-icon--${color}`}>
            <Icon />
          </div>
        </div>
        <div className="stats__card-footer">
          <span className="text-muted">vs last period</span>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="stats__tooltip">
          <p className="stats__tooltip-label">{`${label}`}</p>
          <p className="stats__tooltip-value">
            {`Value: ₹${(payload[0].value * 1000).toLocaleString('en-IN')}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartToggleBadges = ({ activeType, onTypeChange, chartId }) => (
    <div className="stats__chart-toggle">
      <button 
        className={`stats__chart-toggle-badge ${activeType === 'area' ? 'stats__chart-toggle-badge--active' : ''}`}
        onClick={() => onTypeChange('area')}
        title="Area Chart"
      >
        <BiLineChart />
        <span>Area</span>
      </button>
      <button 
        className={`stats__chart-toggle-badge ${activeType === 'bar' ? 'stats__chart-toggle-badge--active' : ''}`}
        onClick={() => onTypeChange('bar')}
        title="Bar Chart"
      >
        <BiBarChart />
        <span>Bar</span>
      </button>
    </div>
  );

  const DynamicChart = ({ data, chartType, color, gradientId }) => {
    // Conditionally slice data for small screens (≤1024px) to show only first 6 months
    const displayData = isMediumOrSmaller ? data.slice(0, 6) : data;

    return (
      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'bar' ? (
          <BarChart data={displayData} margin={{ top: 20, right: isMediumOrSmaller ? 10 : 20, bottom: 25, left: isMediumOrSmaller ? 10 : 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#bec4cf" />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#6b7280' }}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'Month', position: 'bottom', offset: 10, fill: '#6b7280' }}
              padding={{ left: 0, right: 0 }}
              interval={0}
            />
            <YAxis
              axisLine={{ stroke: '#6b7280' }}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `₹${value}k`}
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              label={{ value: isMediumOrSmaller ? null : 'Revenue', angle: -90, position: 'insideLeft', offset: -10, fill: '#6b7280' }}
            />
            <ReferenceLine y={21} stroke="#bec4cf" strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill={color === 'primary-color' ? '#3b82f6' : '#10b981'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        ) : (
          <AreaChart data={displayData} margin={{ top: 20, right: isMediumOrSmaller ? 10 : 20, bottom: 25, left: isMediumOrSmaller ? 10 : 20 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color === 'primary-color' ? '#3b82f6' : '#10b981'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color === 'primary-color' ? '#3b82f6' : '#10b981'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#bec4cf" />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#6b7280' }}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'Month', position: 'bottom', offset: 10, fill: '#6b7280' }}
              padding={{ left: 0, right: 0 }}
              interval={0}
            />
            <YAxis
              axisLine={{ stroke: '#6b7280' }}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `₹${value}k`}
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              label={{ value: isMediumOrSmaller ? null : 'Revenue', angle: -90, position: 'insideLeft', offset: -10, fill: '#6b7280' }}
            />
            <ReferenceLine y={21} stroke="#bec4cf" strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color === 'primary-color' ? '#3b82f6' : '#10b981'}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              connectNulls={true}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <div className="stats__header-content">
            <div className="stats__header-icon">
              <BiCalendar />
            </div>
            <div className="stats__header-text">
              <h1 className="stats__title">Analytics Overview</h1>
              <p className="stats__subtitle">Comprehensive insights and performance metrics</p>
            </div>
            <div className="stats__date-selector">
              <div className="stats__date-range">
                <div className="stats__date-picker-group">
                  <label className="stats__date-picker-label">From</label>
                  <div className="stats__date-picker-wrapper">
                    <BiCalendar className="stats__date-picker-icon" />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="d MMM yyyy"
                      className="stats__date-picker-input"
                      placeholderText="Select start date"
                      popperClassName="stats__date-picker-popper"
                      wrapperClassName="stats__date-picker-wrapper"
                    />
                  </div>
                </div>
                <div className="stats__date-picker-group">
                  <label className="stats__date-picker-label">To</label>
                  <div className="stats__date-picker-wrapper">
                    <BiCalendar className="stats__date-picker-icon" />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="d MMM yyyy"
                      className="stats__date-picker-input"
                      placeholderText="Select end date"
                      popperClassName="stats__date-picker-popper"
                      wrapperClassName="stats__date-picker-wrapper"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats__grid">
          <StatCard 
            title="Total Orders" 
            value={finalValues.orders} 
            growth={10} 
            icon={BiListUl} 
            color="blue"
          />
          <StatCard 
            title="Revenue" 
            value={finalValues.earnings} 
            growth={8} 
            icon={BiDollarCircle} 
            color="green"
            suffix="₹"
          />
          <StatCard 
            title="Active Customers" 
            value={finalValues.customers} 
            growth={3} 
            icon={BiUser} 
            color="purple"
          />
          <StatCard 
            title="New Signups" 
            value={finalValues.newCustomers} 
            growth={12} 
            icon={BiUserPlus} 
            color="orange"
          />
        </div>

        <div className="stats__charts">
          <div className="stats__chart-card stats__chart-card--primary">
            <div className="stats__chart-header">
              <div className="stats__chart-title-section">
                <h3 className="stats__chart-title">Sales Performance</h3>
                <p className="stats__chart-subtitle">Monthly revenue trends</p>
              </div>
              <div className="stats__chart-header-right">
                <ChartToggleBadges 
                  activeType={salesChartType}
                  onTypeChange={setSalesChartType}
                  chartId="sales"
                />
              </div>
            </div>
            <div className="stats__sales-stats">
              <div className="stats__sales-amount">₹2,50,000</div>
              <div className="stats__sales-growth">
                <BiTrendingUp />
                +5.2% this month
              </div>
            </div>
            <div className="stats__chart-container">
              <DynamicChart 
                data={chartData} 
                chartType={salesChartType} 
                color="primary-color" 
                gradientId="salesGradient" 
              />
            </div>
          </div>

          <div className="stats__chart-card stats__chart-card--secondary">
            <div className="stats__chart-header">
              <div className="stats__chart-title-section">
                <h3 className="stats__chart-title">Visitor Growth</h3>
                <p className="stats__chart-subtitle">Annual overview</p>
              </div>
            </div>
            <div className="stats__visitor-stats">
              <div className="stats__visitor-number">500</div>
              <div className="stats__visitor-growth stats__visitor-growth--positive">
                <BiTrendingUp />
                +7% vs last year
              </div>
            </div>
            <div className="stats__sparkline-container">
              <ResponsiveContainer width="100%" height={80} minWidth={200}>
                <LineChart data={sparklineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bec4cf" />
                  <XAxis
                    dataKey="name"
                    axisLine={{ stroke: '#6b7280' }}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    label={{ value: 'Month', position: 'bottom', offset: 10, fill: '#6b7280' }}
                    padding={{ left: 0, right: 0 }}
                    interval={0}
                  />
                  <YAxis
                    axisLine={{ stroke: '#6b7280' }}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                    domain={[0, 'auto']}
                    label={{ value: isMediumOrSmaller ? null : 'Visitors', angle: -90, position: 'insideLeft', offset: -10, fill: '#6b7280', fontSize: 10 }}
                  />
                  <Tooltip
                    formatter={(value) => `${value.toFixed(0)} Visitors`}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="stats__bottom">
          <div className="stats__customers-card">
            <div className="stats__card-header">
              <h3 className="stats__card-title">Top Customers</h3>
            </div>
            <div className="stats__customers-list">
              {customers.map((customer, index) => (
                <div key={index} className="stats__customer-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="stats__customer-avatar">
                    <img src={customer.image} alt={customer.name} loading="lazy" />
                    <div className={`stats__status-indicator stats__status-indicator--${customer.status}`}></div>
                  </div>
                  <div className="stats__customer-info">
                    <h4 className="stats__customer-name">{customer.name}</h4>
                    <p className="stats__customer-id">ID: #{customer.id}</p>
                  </div>
                  <div className="stats__customer-value">
                    <span className="stats__value-amount">{customer.value}</span>
                    <span className="stats__value-label">Total Value</span>
                  </div>
                  <div className="stats__customer-actions">
                    <button className="stats__action-btn stats__action-btn--email">
                      <BiEnvelope />
                    </button>
                    <button className="stats__action-btn stats__action-btn--phone">
                      <BiPhone />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="stats__load-more-btn">
              <span>View All Customers</span>
              <BiChevronRight />
            </button>
          </div>

          <div className="stats__chart-card stats__chart-card--secondary">
            <div className="stats__chart-header">
              <div className="stats__chart-title-section">
                <h3 className="stats__chart-title">Earnings History</h3>
                <p className="stats__chart-subtitle">Revenue breakdown</p>
              </div>
              <div className="stats__chart-header-right">
                <ChartToggleBadges 
                  activeType={earningsChartType}
                  onTypeChange={setEarningsChartType}
                  chartId="earnings"
                />
              </div>
            </div>
            <div className="stats__sales-stats">
              <div className="stats__sales-amount">₹2,00,000</div>
              <div className="stats__sales-growth">
                <BiTrendingUp />
                +8% this month
              </div>
            </div>
            <div className="stats__chart-container">
              <DynamicChart 
                data={chartData} 
                chartType={earningsChartType} 
                color="success-color" 
                gradientId="earningsGradient" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;