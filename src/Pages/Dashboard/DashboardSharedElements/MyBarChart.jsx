import { monthNamesInFrench } from '@/Functions/formatingData';
import { personalColors } from '@/Functions/colorHelpers/colorTWHelper';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarController,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarController,
);

function MyBarChart({
    height,
    dataSetOne,
    firstDataSetName,
    secondDataSetName,
    thirdDataSetName
}) {

    if (!dataSetOne) return

    const chartData = {
        labels: dataSetOne.map(item => monthNamesInFrench(item.date)),
        datasets: [
            {
                label: 'En cours',
                data: dataSetOne.map(item => item[firstDataSetName]),
                backgroundColor: personalColors['blue-1'][400],
                borderColor: personalColors['blue-1'][800],
                yAxisID: 'y', // Changed from 'y1' to 'y'
                order: 2,
            },
            {
                label: 'Nouvelle(s) Offre(s)',
                data: dataSetOne.map(item => item[secondDataSetName]),
                backgroundColor: personalColors['blue-2'][400],
                borderColor: personalColors['blue-2'][800],
                yAxisID: 'y', // Changed from 'y1' to 'y'
                order: 2,
            },
            {
                label: 'Offre(s) cloturée(s)',
                data: dataSetOne.map(item => item[thirdDataSetName]),
                backgroundColor: personalColors['blue-3'][400],
                borderColor: personalColors['blue-3'][800],
                yAxisID: 'y', // Changed from 'y1' to 'y'
                order: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                // Left Y-axis (default axis ID is 'y')
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    display: true,
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Montant Total',
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                align: "start",
                labels: {
                    boxWidth: 10, // Adjust width for smaller cubes
                    boxHeight: 10, // Adjust height for smaller cubes
                    maxWidth: 5,
                    font: {
                        size: 10,
                    },
                },
            },
            title: {
                display: false,
            },
        },
    };

    ////////////////
    // JSX
    return (

        <div className={`w-full place-content-center ${height}`}>

            <Chart type="bar" options={options} data={chartData} />

        </div>
    );
}

export default MyBarChart;