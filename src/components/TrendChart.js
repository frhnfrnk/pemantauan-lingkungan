import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AirQualityChart = ({ data, title, pollutant, color }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.id))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[pollutant])])
      .nice()
      .range([height, 0]);

    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    chart.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.id))
      .attr('y', d => y(d[pollutant]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[pollutant]))
      .attr('fill', color);

    chart.append('text')
      .attr('x', width / 2)
      .attr('y', 0 - (margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'underline')
      .text(title);

  }, [data, pollutant, color]);

  return (
    <svg ref={chartRef} width={850} height={600} className="mx-auto my-8" />
  );
};

export default AirQualityChart;
