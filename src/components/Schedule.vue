<script setup>
import Chart from 'chart.js/auto';
import {onMounted, ref, watch} from "vue";
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    labels: {
        type: Array,
        default: () => []
    }
});
const refChart = ref();
let chart;

onMounted(() => {
    const ctx = refChart.value;
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props?.labels || [],
            datasets: [{
                data: props?.data || [],
                borderWidth: 1,
                backgroundColor: '#2d394b',
                borderColor: '#353589',
                color: '#000'
            }]
        },
        options: {
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'red'
                },
                legend: {
                    display: false,
                },
                element: {
                    rotation: 50
                }
            },
            scales: {
                y: {
                    suggestedMin: Math.min(...props?.data) - 5,
                    suggestedMax: Math.max(...props?.data) + 5,
                    border: {
                        color: '#2d394b'
                    },
                    grid: {
                        color: '#fff',
                        borderColor: '#fff',
                        tickColor: '#fff'
                    }
                },
                x: {
                    border: {
                        color: '#2d394b'
                    },
                    grid: {
                        color: '#fff',
                        borderColor: '#fff',
                        tickColor: '#fff'
                    }
                }
            }
        }
    });
});

watch(() => [props.labels, props.data], (newValue) => {
    if (!chart) return;
    const labels = newValue?.[0] || [];
    const data = newValue?.[1] || [];
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.options.scales.y.suggestedMin = Math.min(...data) - 5;
    chart.options.scales.y.suggestedMax = Math.max(...data) + 5;
    chart.update();
});
</script>

<template>
        <canvas ref="refChart"></canvas>
</template>

<style scoped lang="scss">

</style>
