let nCols = 4;
let nRows = 4;
let xUnit = "$";
let yUnit = "lb";
let gUnit = "ballerz";

function updateTableHeader(minX, maxX) {
  let res = "<td></td>";
  let step = (maxX - minX) / (nCols - 1);
  for (let i = 0; i < nCols; i++) {
    res += "<td>$" + (minX + step * i).toFixed(0) + "</td>";
  }
  return res;
}

function arrayToHtmlRow(arr, prefix = "", suffix = "") {
  let res = arr.map(function (val) {
    if (val) {
      return prefix + val + suffix;
    }
  });
  let htmlStr = "<tr><td>" + res.join("</td><td>") + "</td></tr>";
  return htmlStr;
}

function generateRow(colVals, rowVal, func) {
  let res = colVals.map(function (val) {
    return func(val, rowVal).toString();
  });
  res.unshift(rowVal.toString());
  return res;
}

function multiply(a, b) {
  return a * b;
}

function generateColVals(minX, maxX, nCols) {
  let step = (maxX - minX) / (nCols - 1);
  let res = [];
  for (let i = 0; i < nCols; i++) {
    let val = minX + step * i;
    res.push(val.toFixed(0));
  }
  return res;
}

function updateTable(minX, maxX, minY, maxY) {
  // Calculate column heading values
  let colVals = generateColVals(minX, maxX, nCols);
  let res = arrayToHtmlRow(generateRow(colVals, minY, multiply));

  let tableHeader = $("#table-header");
  let headerStrArray = [""].concat(colVals.map(String));
  let headerHtml = arrayToHtmlRow(headerStrArray, xUnit);

  let tableBody = $("#table-body");

  // Update table html
  tableHeader.html(headerHtml);
  tableBody.empty();
  tableBody.append(res);
}

$(document).ready(function () {
  // Initialize the table
  let minX = 75;
  let maxX = 325;
  let minY = 15;
  let maxY = 25;

  updateTable(minX, maxX, minY, maxY);
  $(function () {
    $("#x-slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      step: 25,
      values: [minX, maxX],

      slide: function (event, ui) {
        xLow = ui.values[0];
        xHigh = ui.values[1];
        $("#x-value").val("$" + xLow + " - $" + xHigh);
        updateTable(xLow, xHigh, minY, maxY);
      },
    });
    $("#x-value").val(
      "$" +
        $("#x-slider-range").slider("values", 0) +
        " - $" +
        $("#x-slider-range").slider("values", 1)
    );
  });

  $(function () {
    $("#y-slider-range").slider({
      range: true,
      min: 10,
      max: 30,
      step: 5,
      values: [minY, maxY],

      slide: function (event, ui) {
        yLow = ui.values[0];
        yHigh = ui.values[1];
        $("#y-value").val("$" + yLow + " - $" + yHigh);
        updateTable(xLow, xHigh, yLow, yHigh);
      },
    });
    $("#y-value").val(
      "$" +
        $("#y-slider-range").slider("values", 0) +
        " - $" +
        $("#y-slider-range").slider("values", 1)
    );
  });
});
