/* --------------------------------- */
/* IMPORT functions                  */
/* --------------------------------- */
import { chartContainer } from "./elements.mjs";
import {
  metSample,
  initialMetData,
  initialAerodrome,
  arrowImage,
  chartDataSets,
} from "./constants.mjs";

/* ----------------------------- */
/* CHART global variables        */
/* ----------------------------- */
let chart;
let actuaChartDataSet = "qfeqnh";

/* ----------------------------- */
/* CHART FUNCTIONS               */
/* ----------------------------- */
const createDataSet = (key, metDataArray) => {
  let keyDataArray = metDataArray.map((metData) => metData[key]);
  return keyDataArray.reverse();
};
const createQNHDataSet = (dataArray, aerodromeElevation) => {
  const qnhDataArray = dataArray.map(
    (data) => Math.round((data + aerodromeElevation / 8) * 10) / 10,
  );
  return qnhDataArray;
};
const createTimeLabels = () => {
  let timeLabels = initialMetData.map((metData) => {
    const localTime = new Date(metData.utcDataTime).toLocaleString("hu-HU", {
      timeZone: "Europe/Budapest",
    });
    return localTime.split(" ")[3].slice(0, -3);
  });
  return timeLabels.reverse();
};

const initiateChart = () => {
  chart = new Chart(chartContainer, {
    type: "line",
    data: { labels: createTimeLabels() },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  changeChartData(initialAerodrome, initialMetData, "qfeqnh");
};

const changeChartData = (aerodrome, actualMetData, dataSet) => {
  if (dataSet) actuaChartDataSet = dataSet;
  if (dataSet === "qfeqnh") {
    chart.data.datasets = [
      {
        label: `QFE (${
          metSample.find(
            (data) => data.key === chartDataSets[actuaChartDataSet][0],
          ).unit
        })`,
        data: createDataSet(chartDataSets[actuaChartDataSet][0], actualMetData),
        borderWidth: 1,
      },
      {
        label: `estimated QNH (${
          metSample.find(
            (data) => data.key === chartDataSets[actuaChartDataSet][0],
          ).unit
        })`,
        data: createQNHDataSet(
          createDataSet(chartDataSets[actuaChartDataSet][0], actualMetData),
          aerodrome.elevation,
        ),
        borderWidth: 1,
      },
    ];
  } else if (dataSet === "wind") {
    chart.data.datasets = [
      {
        label: `${metSample.find((data) => data.key === chartDataSets[actuaChartDataSet][1]).label} (${
          metSample.find(
            (data) => data.key === chartDataSets[actuaChartDataSet][1],
          ).unit
        })`,
        data: createDataSet(chartDataSets[actuaChartDataSet][1], actualMetData),
        pointRotation: createDataSet(
          chartDataSets[actuaChartDataSet][0],
          actualMetData,
        ),
        pointStyle: arrowImage,
        pointRadius: 30,
        showLine: true,
        borderWidth: 1,
      },
      {
        label: `${metSample.find((data) => data.key === chartDataSets[actuaChartDataSet][3]).label} (${
          metSample.find(
            (data) => data.key === chartDataSets[actuaChartDataSet][3],
          ).unit
        })`,
        data: createDataSet(chartDataSets[actuaChartDataSet][3], actualMetData),
        pointRotation: createDataSet(
          chartDataSets[actuaChartDataSet][0],
          actualMetData,
        ),
        pointStyle: arrowImage,
        pointRadius: 30,
        showLine: true,
        borderWidth: 1,
      },
    ];
  } else {
    chart.data.datasets.length = 0;
    chartDataSets[actuaChartDataSet].map((datasetKey) => {
      const chartDataSet = {
        label: `${metSample.find((data) => data.key === datasetKey).label} (${
          metSample.find((data) => data.key === datasetKey).unit
        })`,
        data: createDataSet(datasetKey, actualMetData),
        borderWidth: 1,
      };
      chart.data.datasets.push(chartDataSet);
    });
  }
  chart.update("active");
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export { initiateChart, changeChartData };
