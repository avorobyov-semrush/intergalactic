export const colors = {
  'blue-01': '#50aef4',
  'blue-02': '#91c7ef',
  'blue-03': '#0e75c2',
  'blue-04': '#d1e8f8',
  'blue-05': '#084c80',
  'green-01': '#3ab011',
  'green-02': '#91d27b',
  'green-03': '#278707',
  'green-04': '#d1edc8',
  'green-05': '#1a6700',
  'orange-01': '#ff8e29',
  'orange-02': '#fec089',
  'orange-03': '#da6905',
  'orange-04': '#ffe5cd',
  'orange-05': '#a14e03',
  'violet-01': '#890c85',
  'violet-02': '#c783c5',
  'violet-03': '#6e026b',
  'violet-04': '#e7cbe6',
  'violet-05': '#4d024b',
  'red-01': '#e91e25',
  'red-02': '#f69498',
  'red-03': '#bd0000',
  'red-04': '#fbd2d3',
  'red-05': '#830005',
  'yellow-01': '#ffc83f',
  'yellow-02': '#ffdb82',
  'yellow-03': '#e4aa18',
  'yellow-04': '#ffebb9',
  'yellow-05': '#b3840c',
};

let componentRenderIndex = 0;
const cache = {};
const colorValues = Object.keys(colors).sort((a, b) => {
  return parseInt(a.match(/[0-9]/g).join(''), 10) - parseInt(b.match(/[0-9]/g).join(''), 10);
});

export default function getColor(key) {
  if (cache[key]) {
    return cache[key];
  }
  const color = colors[colorValues[componentRenderIndex++]];
  cache[key] = color;
  return color;
}
