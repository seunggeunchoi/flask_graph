Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var clickedXLabel = "none";
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
console.log(document.getElementById("temperature").value);
var cntList = JSON.parse(document.getElementById("lala").value.replaceAll("'", '"'));
console.log(cntList);
var cntList_labeling = cntList['labeling']
var cntList_exam = cntList['exam']
var cntList_classCnt = cntList['class_cnt']
// Bar Chart of Labeling
var ctx = document.getElementById("myBarChartLabel");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["할당량", "라벨링 대기", "라벨링 진행중", "라벨링 완료", "승인", "반려"],
    datasets: [{
      label: "건 수",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [cntList_labeling['total'], cntList_labeling['01'], cntList_labeling['02'], cntList_labeling['03'], cntList_labeling['04'], cntList_labeling['05']],
    }],
  },
  options: {
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'workStep'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 6000,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          clickedXLabel = tooltipItem.xLabel;
          return datasetLabel + " : " + number_format(tooltipItem.yLabel);
        }
      },
    },
    onClick: (e) => {
        window.location.href = "/attList?work=라벨링&WorkState="+clickedXLabel;
    },
  }
});

var ctx2 = document.getElementById("myBarChartExam");
var myBarChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ["할당량", "라벨링 미완료", "검수 대기", "검수 완료(Pass)", "검수 완료(Fail)"],
    datasets: [{
      label: "건 수",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [cntList_exam['total'], cntList_exam['06'], cntList_exam['07'], cntList_exam['08'], cntList_exam['09']],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'workStep'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          clickedXLabel = tooltipItem.xLabel;
          return datasetLabel + " : " + number_format(tooltipItem.yLabel);
        }
      }
    },
    onClick: (e) => {
        window.location.href = "/attList?work=검수&WorkState="+clickedXLabel;
    },
  }
});

var ctx3 = document.getElementById("myBarChartClassCnt");
var myBarChart2 = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ["VAR", "ACC", "DEC_early", "DEC_late", "DEC_variable", "DEC_prolonged", "SIN", "UTC"],
    datasets: [{
      label: "합계",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [cntList_classCnt['VAR'], cntList_classCnt['ACC'], cntList_classCnt['DEC_early'], cntList_classCnt['DEC_late'], cntList_classCnt['DEC_variable'], cntList_classCnt['DEC_prolonged'], cntList_classCnt['SIN'], cntList_classCnt['UTC']],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'workStep'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6,
          autoSkip: false,
          maxRotation: 30,
          minRotation: 30
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          clickedXLabel = tooltipItem.xLabel;
          return datasetLabel + " : " + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
});