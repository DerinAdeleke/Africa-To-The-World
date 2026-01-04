// ===================================
// MAIN JAVASCRIPT FILE
// ===================================

// Data Visualizations for Data Section
function createInvestmentChart() {
    const container = d3.select('#investment-chart');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = [
        { year: '2022', value: 3.5 },
        { year: '2023', value: 4.8 },
        { year: '2024', value: 6.2 },
        { year: '2025', value: 8.1 },
        { year: '2026', value: 10.5 }
    ];

    const x = d3.scaleBand()
        .range([0, chartWidth])
        .domain(data.map(d => d.year))
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([chartHeight, 0]);

    // Add gradient
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'bar-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#3498db')
        .attr('stop-opacity', 1);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#2ecc71')
        .attr('stop-opacity', 1);

    // Add bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', 'url(#bar-gradient)')
        .attr('rx', 4)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 150)
        .attr('y', d => y(d.value))
        .attr('height', d => chartHeight - y(d.value));

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .style('color', 'rgba(255,255,255,0.5)');

    svg.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}B`))
        .style('color', 'rgba(255,255,255,0.5)');
}

function createCreativeEconomyChart() {
    const container = d3.select('#creative-economy-chart');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = 250;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

    const data = [
        { sector: 'Music', value: 4.2, color: '#e74c3c' },
        { sector: 'Film & TV', value: 3.1, color: '#3498db' },
        { sector: 'Fashion', value: 2.8, color: '#f39c12' },
        { sector: 'Art & Design', value: 2.1, color: '#9b59b6' }
    ];

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);

    const arcs = svg.append('g')
        .attr('transform', `translate(${centerX},${centerY})`)
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('fill', d => d.data.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .duration(1500)
        .attrTween('d', function(d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    // Add center text
    svg.append('text')
        .attr('x', centerX)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', '32px')
        .style('font-weight', '900')
        .style('fill', 'white')
        .style('opacity', 0)
        .text('$12.2B')
        .transition()
        .duration(1000)
        .delay(1000)
        .style('opacity', 1);

    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(20, ${height - 80})`);

    data.forEach((d, i) => {
        const legendRow = legend.append('g')
            .attr('transform', `translate(0, ${i * 20})`);

        legendRow.append('circle')
            .attr('r', 6)
            .attr('fill', d.color);

        legendRow.append('text')
            .attr('x', 15)
            .attr('y', 4)
            .style('font-size', '12px')
            .style('fill', 'rgba(255,255,255,0.8)')
            .text(`${d.sector}: $${d.value}B`);
    });
}

function createConnectivityChart() {
    const container = d3.select('#connectivity-chart');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = [
        { region: 'North', value: 68 },
        { region: 'West', value: 42 },
        { region: 'East', value: 39 },
        { region: 'Central', value: 28 },
        { region: 'Southern', value: 58 }
    ];

    const x = d3.scaleBand()
        .range([0, chartWidth])
        .domain(data.map(d => d.region))
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight, 0]);

    // Add bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.region))
        .attr('width', x.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', '#2ecc71')
        .attr('rx', 4)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 150)
        .attr('y', d => y(d.value))
        .attr('height', d => chartHeight - y(d.value));

    // Add value labels
    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => x(d.region) + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 8)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'white')
        .style('font-weight', '600')
        .style('opacity', 0)
        .text(d => `${d.value}%`)
        .transition()
        .duration(500)
        .delay((d, i) => i * 150 + 1000)
        .style('opacity', 1);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .style('color', 'rgba(255,255,255,0.5)')
        .selectAll('text')
        .style('font-size', '11px');

    svg.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
        .style('color', 'rgba(255,255,255,0.5)');
}

function createDemographicsChart() {
    const container = d3.select('#demographics-chart');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = [
        { year: 2010, value: 380 },
        { year: 2015, value: 450 },
        { year: 2020, value: 520 },
        { year: 2025, value: 580 },
        { year: 2030, value: 650 }
    ];

    const x = d3.scaleLinear()
        .domain([2010, 2030])
        .range([0, chartWidth]);

    const y = d3.scaleLinear()
        .domain([0, 700])
        .range([chartHeight, 0]);

    // Create area
    const area = d3.area()
        .x(d => x(d.year))
        .y0(chartHeight)
        .y1(d => y(d.value))
        .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#f39c12')
        .attr('stop-opacity', 0.8);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#f39c12')
        .attr('stop-opacity', 0.1);

    // Add area
    const path = svg.append('path')
        .datum(data)
        .attr('fill', 'url(#area-gradient)')
        .attr('d', area)
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .style('opacity', 1);

    // Add line
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

    const linePath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#f39c12')
        .attr('stroke-width', 3)
        .attr('d', line);

    const pathLength = linePath.node().getTotalLength();
    linePath
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(2000)
        .attr('stroke-dashoffset', 0);

    // Add dots
    svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.year))
        .attr('cy', d => y(d.value))
        .attr('r', 0)
        .attr('fill', '#f39c12')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .transition()
        .duration(500)
        .delay((d, i) => i * 400)
        .attr('r', 5);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')))
        .style('color', 'rgba(255,255,255,0.5)');

    svg.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}M`))
        .style('color', 'rgba(255,255,255,0.5)');
}

// Newsletter Form Handler
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('first-name').value;
        const email = document.getElementById('email').value;
        const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
            .map(cb => cb.value);
        
        const button = this.querySelector('.submit-btn');
        const buttonText = button.querySelector('.btn-text');
        const originalText = buttonText.textContent;
        
        // Simulate submission
        buttonText.textContent = 'Subscribing...';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            buttonText.textContent = '✓ Successfully Subscribed!';
            button.style.background = '#2ecc71';
            button.style.opacity = '1';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                margin-top: 24px;
                padding: 20px;
                background: rgba(46, 204, 113, 0.2);
                border: 2px solid rgba(46, 204, 113, 0.5);
                border-radius: 8px;
                color: white;
                text-align: center;
                animation: fadeInUp 0.5s ease;
            `;
            successMsg.innerHTML = `
                <strong>Welcome aboard, ${firstName}!</strong><br>
                Check your inbox at ${email} for your confirmation email.
            `;
            form.appendChild(successMsg);
            
            setTimeout(() => {
                form.reset();
                buttonText.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
                successMsg.remove();
            }, 4000);
        }, 1500);
    });
}

// Initialize all data charts
function initDataCharts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createInvestmentChart();
                createCreativeEconomyChart();
                createConnectivityChart();
                createDemographicsChart();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const dataSection = document.querySelector('.data-story-section');
    if (dataSection) {
        observer.observe(dataSection);
    }
}

// Initialize visualizations when sections come into view
function initVisualizations() {
    // Hero network
    if (window.visualizations) {
        window.visualizations.createHeroNetwork();
        
        // Story card visualizations with intersection observer
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    if (card.classList.contains('card-politics')) {
                        window.visualizations.createPoliticsViz();
                    } else if (card.classList.contains('card-innovation')) {
                        window.visualizations.createInnovationViz();
                    } else if (card.classList.contains('card-culture')) {
                        window.visualizations.createCultureViz();
                    } else if (card.classList.contains('card-fashion')) {
                        window.visualizations.createFashionViz();
                    } else if (card.classList.contains('card-education')) {
                        window.visualizations.createEducationViz();
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.story-card').forEach(card => {
            cardObserver.observe(card);
        });
        
        // Map visualization
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.visualizations.createAdvancedMap();
                    mapObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const mapSection = document.querySelector('.map-reveal-section');
        if (mapSection) {
            mapObserver.observe(mapSection);
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initVisualizations();
    initDataCharts();
    setupNewsletterForm();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Refresh ScrollTrigger on resize
        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }, 250);
});
