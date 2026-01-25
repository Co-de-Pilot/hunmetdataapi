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
import {
  estimateQNH,
  estimateDewPoint,
  estimateCloudBase,
} from "./helperfunctions.mjs";

/* ----------------------------- */
/* CHART global variables        */
/* ----------------------------- */
let chart;
let actualChartDataSet = "qfeqnh";

/* ----------------------------- */
/* CHART FUNCTIONS               */
/* ----------------------------- */
const createDataSet = (key, metDataArray) => {
  let keyDataArray = metDataArray.map((metData) => metData[key]);
  return keyDataArray.reverse();
};
const createQNHDataSet = (dataArray, aerodromeElevation) => {
  const qnhDataArray = dataArray.map((data) =>
    estimateQNH(data, aerodromeElevation),
  );
  return qnhDataArray;
};
const createDewPointDataSet = (dataArray, relativehumidityArray) => {
  const dewPointDataArray = dataArray.map((data, index) =>
    estimateDewPoint(data, relativehumidityArray[index]),
  );
  return dewPointDataArray;
};
const createCloudBaseDataSet = (dataArray, relativehumidityArray) => {
  const cloudBaseDataArray = dataArray.map((data, index) =>
    estimateCloudBase(data, relativehumidityArray[index]),
  );
  return cloudBaseDataArray;
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
  if (dataSet) actualChartDataSet = dataSet;
  if (dataSet === "qfeqnh") {
    chart.data.datasets = [
      {
        label: `QFE (${
          metSample.find(
            (data) => data.key === chartDataSets[actualChartDataSet][0],
          ).unit
        })`,
        data: createDataSet(
          chartDataSets[actualChartDataSet][0],
          actualMetData,
        ),
        borderWidth: 1,
      },
      {
        label: `estimated QNH (${
          metSample.find(
            (data) => data.key === chartDataSets[actualChartDataSet][0],
          ).unit
        })`,
        data: createQNHDataSet(
          createDataSet(chartDataSets[actualChartDataSet][0], actualMetData),
          aerodrome.elevation,
        ),
        borderWidth: 1,
      },
    ];
  } else if (dataSet === "cloudbase") {
    chart.data.datasets = [
      {
        label: `estimated CB (${
          metSample.find((data) => data.key === "horizontalvisibility").unit
        })`,
        data: createCloudBaseDataSet(
          createDataSet("average10mintemperature", actualMetData),
          createDataSet("relativehumidity", actualMetData),
        ),
        borderWidth: 1,
      },
    ];
  } else if (dataSet === "wind") {
    chart.data.datasets = [
      {
        label: `${metSample.find((data) => data.key === chartDataSets[actualChartDataSet][1]).label} (${
          metSample.find(
            (data) => data.key === chartDataSets[actualChartDataSet][1],
          ).unit
        })`,
        data: createDataSet(
          chartDataSets[actualChartDataSet][1],
          actualMetData,
        ),
        pointRotation: createDataSet(
          chartDataSets[actualChartDataSet][0],
          actualMetData,
        ),
        pointStyle: arrowImage,
        pointRadius: 30,
        showLine: true,
        borderWidth: 1,
      },
      {
        label: `${metSample.find((data) => data.key === chartDataSets[actualChartDataSet][3]).label} (${
          metSample.find(
            (data) => data.key === chartDataSets[actualChartDataSet][3],
          ).unit
        })`,
        data: createDataSet(
          chartDataSets[actualChartDataSet][3],
          actualMetData,
        ),
        pointRotation: createDataSet(
          chartDataSets[actualChartDataSet][0],
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
    chartDataSets[actualChartDataSet].map((datasetKey) => {
      let chartDataSet;
      if (datasetKey === "dewpoint") {
        chartDataSet = {
          label: `est.DP (${metSample.find((data) => data.key === "temperature").unit})`,
          data: createDewPointDataSet(
            createDataSet("average10mintemperature", actualMetData),
            createDataSet("relativehumidity", actualMetData),
          ),
          borderWidth: 1,
        };
      } else {
        chartDataSet = {
          label: `${metSample.find((data) => data.key === datasetKey).label} (${
            metSample.find((data) => data.key === datasetKey).unit
          })`,
          data: createDataSet(datasetKey, actualMetData),
          borderWidth: 1,
        };
      }
      chart.data.datasets.push(chartDataSet);
    });
  }
  chart.update("active");
};

/*-------------------------------*/
/*MODUL EXPORT                   */
/*-------------------------------*/
export { initiateChart, changeChartData };
