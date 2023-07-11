// Your code here
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  

  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;
  
    const wagesEarned = hoursWorked * payPerHour;
  
    return wagesEarned;
  }
  
  
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  
    return totalWages;
  }
  

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      const employeeWages = allWagesFor(employeeRecord);
      return total + employeeWages;
    }, 0);
  
    return totalPayroll;
  }
  