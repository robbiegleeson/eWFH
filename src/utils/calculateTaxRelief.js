import moment from 'moment';

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const getPercentageRate = (settings, month) => {
  const totalHoursInMonth = moment().month(month).daysInMonth() * 24;
  const daysWorkedInMonth = settings?.daysPerMonthList[month] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const totalHoursWorkedInMonth = Number(settings?.hoursPerDay) * daysWorkedInMonth;

  const percentageRate = totalHoursWorkedInMonth/totalHoursInMonth * 100;
  return percentageRate.toFixed(2);
}

const calculateDailyRate = (month, settings) => {
  const totalHoursInMonth = moment().month(month).daysInMonth() * 24;
  const daysWorkedInMonth = settings?.daysPerMonthList[month] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const totalHoursWorkedInMonth = 3.20 * daysWorkedInMonth;
  console.log(totalHoursWorkedInMonth)

  return totalHoursWorkedInMonth.toFixed(2);
} 

const calculateTaxRelief = (month, settings, amount) => {
  const totalHoursInMonth = moment().month(month).daysInMonth() * 24;
  const daysWorkedInMonth = settings?.daysPerMonthList[month] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const totalHoursWorkedInMonth = Number(settings?.hoursPerDay) * daysWorkedInMonth;

  const percentageRate = totalHoursWorkedInMonth/totalHoursInMonth * 100;
  let savings = percentageRate * Number(amount) / 100;
  savings = 40 * savings / 100
  return round(savings, 2) || 0.00;
}

export { calculateTaxRelief, getPercentageRate, calculateDailyRate }