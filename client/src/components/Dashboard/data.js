// Data Sales //
const dataSales = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
  datasets: [
    {
      label: 'SALES ($)',
      data: [2500, 5000, 3056, 8500, 6070, 4569, 6789, 7884],
      borderWidth: 1,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};


// Data Sales Products //
const dataProducts = {
  labels: ['Airpods', 'MacBoock Air Pro', 'Apple Watch', 'Silla Gamer'],
  datasets: [
    {
      label: 'SALES ($)',
      data: [55, 28, 48, 80],
      borderWidth: 1,
      backgroundColor: [
        'blue',
        'red',
        'green',
        'yellow'
      ],
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

export {
  dataSales,
  dataProducts
}