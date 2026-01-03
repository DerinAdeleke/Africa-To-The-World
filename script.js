// Hero Stats Animation with D3.js
function createHeroStats() {
    const statsData = [
        { label: 'Stories Published', value: 1847, suffix: '+' },
        { label: 'Contributors', value: 250, suffix: '+' },
        { label: 'Countries Covered', value: 54, suffix: '' }
    ];

    const statsContainer = d3.select('#stats-container');
    
    const statItems = statsContainer
        .selectAll('.stat-item')
        .data(statsData)
        .enter()
        .append('div')
        .attr('class', 'stat-item')
        .style('opacity', 0);

    statItems.append('div')
        .attr('class', 'stat-number')
        .text(d => '0')
        .transition()
        .duration(2000)
        .tween('text', function(d) {
            const i = d3.interpolateNumber(0, d.value);
            return function(t) {
                this.textContent = Math.round(i(t)) + d.suffix;
            };
        });

    statItems.append('div')
        .attr('class', 'stat-label')
        .text(d => d.label);

    statItems
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .style('opacity', 1);
}

// Interactive Africa Map with D3.js
function createAfricaMap() {
    const width = 900;
    const height = 500;
    
    const svg = d3.select('#africa-map')
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Sample data for African countries with story counts
    const storiesData = [
        { country: 'Nigeria', x: 420, y: 280, stories: 45, color: '#e74c3c' },
        { country: 'Kenya', x: 530, y: 320, stories: 38, color: '#3498db' },
        { country: 'South Africa', x: 480, y: 450, stories: 52, color: '#2ecc71' },
        { country: 'Ghana', x: 380, y: 290, stories: 28, color: '#f39c12' },
        { country: 'Egypt', x: 480, y: 180, stories: 33, color: '#9b59b6' },
        { country: 'Ethiopia', x: 540, y: 270, stories: 25, color: '#1abc9c' },
        { country: 'Senegal', x: 340, y: 260, stories: 22, color: '#e67e22' },
        { country: 'Morocco', x: 380, y: 160, stories: 30, color: '#34495e' },
        { country: 'Tanzania', x: 540, y: 350, stories: 18, color: '#16a085' },
        { country: 'Rwanda', x: 510, y: 330, stories: 20, color: '#c0392b' }
    ];

    // Create Africa outline (simplified)
    const africaPath = `
        M 380 150
        Q 420 140, 460 150
        L 500 160
        Q 520 170, 530 190
        L 540 220
        Q 550 250, 545 280
        L 550 320
        Q 555 360, 540 390
        L 520 430
        Q 500 460, 470 470
        L 430 460
        Q 400 450, 380 430
        L 350 400
        Q 330 370, 320 340
        L 310 300
        Q 300 260, 320 230
        L 340 200
        Q 360 170, 380 150
        Z
    `;

    // Draw Africa outline
    svg.append('path')
        .attr('d', africaPath)
        .attr('fill', '#f8f8f8')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 2);

    // Add decorative circles for visual interest
    svg.append('circle')
        .attr('cx', 450)
        .attr('cy', 300)
        .attr('r', 200)
        .attr('fill', 'none')
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .style('opacity', 0.3);

    // Create tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'map-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'white')
        .style('padding', '12px 16px')
        .style('border-radius', '6px')
        .style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)')
        .style('font-size', '14px')
        .style('pointer-events', 'none')
        .style('z-index', '1000');

    // Create story points
    const points = svg.selectAll('.story-point')
        .data(storiesData)
        .enter()
        .append('g')
        .attr('class', 'story-point')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', 'pointer');

    // Add pulsing circles
    points.append('circle')
        .attr('r', 0)
        .attr('fill', d => d.color)
        .style('opacity', 0.3)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('r', d => Math.sqrt(d.stories) * 3);

    // Add main circles
    points.append('circle')
        .attr('r', 0)
        .attr('fill', d => d.color)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr('r', d => Math.sqrt(d.stories) * 2);

    // Add interaction
    points
        .on('mouseover', function(event, d) {
            d3.select(this).select('circle:last-child')
                .transition()
                .duration(200)
                .attr('r', Math.sqrt(d.stories) * 2.5);
            
            tooltip
                .style('visibility', 'visible')
                .html(`<strong>${d.country}</strong><br/>${d.stories} stories`);
        })
        .on('mousemove', function(event) {
            tooltip
                .style('top', (event.pageY - 10) + 'px')
                .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('circle:last-child')
                .transition()
                .duration(200)
                .attr('r', Math.sqrt(d.stories) * 2);
            
            tooltip.style('visibility', 'hidden');
        });

    // Add labels for major hubs
    points.append('text')
        .attr('dy', d => Math.sqrt(d.stories) * 2 + 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(d => d.country)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 400)
        .style('opacity', 1);
}

// Startup Funding Chart
function createStartupChart() {
    const data = [
        { year: '2022', value: 3.5 },
        { year: '2023', value: 4.8 },
        { year: '2024', value: 6.2 },
        { year: '2025', value: 8.1 },
        { year: '2026', value: 10.5 }
    ];

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 350 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select('#startup-chart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom)
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.year))
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    // Add bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .attr('fill', '#4facfe')
        .attr('rx', 4)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value));

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style('color', 'rgba(255,255,255,0.5)');

    svg.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}B`))
        .style('color', 'rgba(255,255,255,0.5)');
}

// Creative Industry Chart (Donut)
function createCreativeChart() {
    const data = [
        { sector: 'Music', value: 35 },
        { sector: 'Film', value: 25 },
        { sector: 'Fashion', value: 20 },
        { sector: 'Art & Design', value: 20 }
    ];

    const width = 250;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#creative-chart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.sector))
        .range(['#f093fb', '#f5576c', '#4facfe', '#43e97b']);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.9);

    const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('fill', d => color(d.data.sector))
        .transition()
        .duration(1000)
        .attrTween('d', function(d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    // Add center text
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', '28px')
        .style('font-weight', '700')
        .style('fill', 'white')
        .text('$12B');
}

// Education Progress Chart (Line)
function createEducationChart() {
    const data = [
        { month: 'Jan', value: 45 },
        { month: 'Apr', value: 52 },
        { month: 'Jul', value: 61 },
        { month: 'Oct', value: 68 },
        { month: 'Dec', value: 75 }
    ];

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 350 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select('#education-chart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom)
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
        .range([0, width])
        .domain(data.map(d => d.month));

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Create line
    const line = d3.line()
        .x(d => x(d.month))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

    // Add line path
    const path = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#43e97b')
        .attr('stroke-width', 3)
        .attr('d', line);

    const pathLength = path.node().getTotalLength();

    path
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
        .attr('class', 'dot')
        .attr('cx', d => x(d.month))
        .attr('cy', d => y(d.value))
        .attr('r', 0)
        .attr('fill', '#43e97b')
        .transition()
        .duration(500)
        .delay((d, i) => i * 400)
        .attr('r', 5);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style('color', 'rgba(255,255,255,0.5)');

    svg.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
        .style('color', 'rgba(255,255,255,0.5)');
}

// Newsletter Form Handler
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('.subscribe-btn');
        const originalText = button.textContent;
        
        // Simulate submission
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Subscribed!';
            button.style.background = '#2ecc71';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                margin-top: 20px;
                padding: 16px;
                background: rgba(255,255,255,0.2);
                border-radius: 6px;
                animation: fadeInUp 0.5s ease;
            `;
            successMsg.textContent = `Welcome! Check ${email} for your confirmation.`;
            form.appendChild(successMsg);
            
            setTimeout(() => {
                this.querySelector('input[type="email"]').value = '';
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                successMsg.remove();
            }, 3000);
        }, 1500);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize all visualizations on page load
document.addEventListener('DOMContentLoaded', function() {
    createHeroStats();
    createAfricaMap();
    createStartupChart();
    createCreativeChart();
    createEducationChart();
    setupNewsletterForm();
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.article-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS for stat items dynamically
const style = document.createElement('style');
style.textContent = `
    .stat-item {
        text-align: center;
    }
    .stat-number {
        font-size: 48px;
        font-weight: 900;
        margin-bottom: 8px;
        font-family: 'Playfair Display', serif;
    }
    .stat-label {
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.8;
        font-weight: 500;
    }
`;
document.head.appendChild(style);
