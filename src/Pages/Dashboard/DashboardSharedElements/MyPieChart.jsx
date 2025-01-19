import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend); // Register the plugin

function MyPieChart({ dataValues, legends = true, height }) {

    let options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: legends,
                position: 'bottom',
                align: 'start',
                labels: {
                    boxWidth: 10, // Adjust width for smaller cubes
                    boxHeight: 10, // Adjust height for smaller cubes
                    maxWidth: 5,
                    font: {
                        size: 10,
                    },
                },
            },
            labels: {
                font: {
                    size: 14,
                },
            },
        },
    };

    const chartData = {
        datasets: [
            {
                data: dataValues,
                borderWidth: 1,
            },
        ],
    };

    return (

        <div className={`w-full place-content-center ${height}`}>
            <Pie
                data={chartData}
                options={options} />
        </div>
    );
}

export default MyPieChart;