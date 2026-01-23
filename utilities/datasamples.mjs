//Ez a mintaobjektuma az adatbázisban tárolt adatszerkezetnek
const staticDataSample = [
  { key: "stationId", stationdataindex: 1 },
  { key: "stationname", stationdataindex: 2 },
  { key: "latitude", unit: "°", stationdataindex: 3 },
  { key: "longitude", unit: "°", stationdataindex: 4 },
  { key: "elevation", unit: "m", stationdataindex: 5 },
  { key: "datasAvailable", stationdataindex: 0 },
];

const metDataSample = [
  { key: "stationId", stationdataindex: 1 },
  { key: "utcDataTime", stationdataindex: 0 },
  { key: "precipitation", unit: "mm", label: "PCPN", stationdataindex: 6 },
  { key: "temperature", unit: "°C", label: "TEMP", stationdataindex: 8 },
  {
    key: "average10mintemperature",
    unit: "°C",
    label: "AVTEMP",
    stationdataindex: 10,
  },
  {
    key: "minimum10mintemperature",
    unit: "°C",
    label: "MINTEMP",
    stationdataindex: 12,
  },
  {
    key: "maximum10mintemperature",
    unit: "°C",
    label: "MAXTEMP",
    stationdataindex: 14,
  },
  {
    key: "horizontalvisibility",
    unit: "m",
    label: "HZ VIS",
    stationdataindex: 16,
  },
  { key: "airpressure", unit: "hPa", label: "QFE", stationdataindex: 18 },
  { key: "relativehumidity", unit: "%", label: "RH", stationdataindex: 20 },
  {
    key: "average10mingammaradiation",
    unit: "nSv/h",
    label: "GAMMA RAD",
    stationdataindex: 22,
  },
  {
    key: "average10minglobalradiation",
    unit: "W/m2",
    label: "GLOBAL RAD",
    stationdataindex: 24,
  },
  {
    key: "average10minuvradiation",
    unit: "MED/h",
    label: "UV RAD",
    stationdataindex: 26,
  },
  {
    key: "average10minwindspeed",
    unit: "m/s",
    label: "AWS",
    stationdataindex: 28,
  },
  { key: "winddirection", unit: "°", label: "WDI", stationdataindex: 30 },
  {
    key: "maximum10minwindgustspeed",
    unit: "m/s",
    label: "MWGS",
    stationdataindex: 32,
  },
  {
    key: "maximum10minwindgustdirection",
    unit: "°",
    label: "MWGDI",
    stationdataindex: 34,
  },
  { key: "maximum10minwindgustminute", unit: "min", stationdataindex: 36 },
  { key: "maximum10minwindgustsecond", unit: "sec", stationdataindex: 38 },
  {
    key: "average10min5cmsoiltemperature",
    unit: "°C",
    label: "5STEMP",
    stationdataindex: 40,
  },
  {
    key: "average10min10cmsoiltemperature",
    unit: "°C",
    label: "10STEMP",
    stationdataindex: 42,
  },
  {
    key: "average10min20cmsoiltemperature",
    unit: "°C",
    label: "20STEMP",
    stationdataindex: 44,
  },
  {
    key: "average10min50cmsoiltemperature",
    unit: "°C",
    label: "50STEMP",
    stationdataindex: 46,
  },
  {
    key: "average10min100cmsoiltemperature",
    unit: "°C",
    label: "100STEMP",
    stationdataindex: 48,
  },
  {
    key: "average10mingroundtemperature",
    unit: "°C",
    label: "GSTEMP",
    stationdataindex: 50,
  },
];

export { staticDataSample, metDataSample };
