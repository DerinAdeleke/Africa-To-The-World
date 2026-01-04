// ===================================
// ADVANCED D3.JS VISUALIZATIONS
// ===================================

// Hero Network Visualization
function createHeroNetwork() {
    const container = d3.select('#hero-network');
    const width = container.node().getBoundingClientRect().width;
    const height = 500;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Create network nodes representing African countries
    const nodes = [
        { id: 'Nigeria', x: width * 0.3, y: height * 0.4, size: 40, connections: 15 },
        { id: 'Kenya', x: width * 0.7, y: height * 0.5, size: 35, connections: 12 },
        { id: 'South Africa', x: width * 0.5, y: height * 0.7, size: 38, connections: 14 },
        { id: 'Ghana', x: width * 0.2, y: height * 0.6, size: 28, connections: 9 },
        { id: 'Egypt', x: width * 0.6, y: height * 0.2, size: 32, connections: 11 },
        { id: 'Ethiopia', x: width * 0.8, y: height * 0.4, size: 25, connections: 8 },
        { id: 'Senegal', x: width * 0.15, y: height * 0.3, size: 22, connections: 7 },
        { id: 'Morocco', x: width * 0.4, y: height * 0.15, size: 26, connections: 8 },
    ];

    // Create links between nodes
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.6) {
                links.push({ source: nodes[i], target: nodes[j] });
            }
        }
    }

    // Draw connection lines
    const linkGroup = svg.append('g').attr('class', 'links');
    const link = linkGroup.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', 'rgba(255,255,255,0.1)')
        .attr('stroke-width', 1)
        .style('opacity', 0);

    // Animate links
    link.transition()
        .duration(1500)
        .delay((d, i) => i * 50)
        .style('opacity', 1);

    // Draw nodes
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    const node = nodeGroup.selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    // Outer pulse circle
    node.append('circle')
        .attr('r', 0)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(231, 76, 60, 0.5)')
        .attr('stroke-width', 2)
        .transition()
        .duration(2000)
        .attr('r', d => d.size + 10)
        .style('opacity', 0);

    // Main circle
    node.append('circle')
        .attr('r', 0)
        .attr('fill', 'rgba(231, 76, 60, 0.8)')
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('r', d => d.size);

    // Inner circle
    node.append('circle')
        .attr('r', 0)
        .attr('fill', 'rgba(255, 255, 255, 0.3)')
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100 + 200)
        .attr('r', d => d.size * 0.5);

    // Continuous pulse animation
    function pulse() {
        node.selectAll('circle:first-child')
            .transition()
            .duration(2000)
            .attr('r', d => d.size + 15)
            .style('opacity', 0)
            .transition()
            .duration(0)
            .attr('r', d => d.size)
            .style('opacity', 0.5)
            .on('end', pulse);
    }
    pulse();

    // Floating particles
    const particles = svg.append('g').attr('class', 'particles');
    for (let i = 0; i < 30; i++) {
        particles.append('circle')
            .attr('cx', Math.random() * width)
            .attr('cy', Math.random() * height)
            .attr('r', Math.random() * 2 + 1)
            .attr('fill', 'rgba(255,255,255,0.3)')
            .style('opacity', 0)
            .transition()
            .duration(2000)
            .delay(Math.random() * 1000)
            .style('opacity', Math.random() * 0.5);
    }
}

// Story Card Visualizations
function createPoliticsViz() {
    const container = d3.select('#politics-viz');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Create parliament seats visualization
    const seats = [];
    const rows = 8;
    const seatsPerRow = 12;
    const seatRadius = Math.min(width, height) / (rows * 3);

    for (let row = 0; row < rows; row++) {
        for (let seat = 0; seat < seatsPerRow; seat++) {
            const angle = (seat / seatsPerRow) * Math.PI - Math.PI / 2;
            const radius = (row + 1) * (height / (rows + 2));
            seats.push({
                x: width / 2 + Math.cos(angle) * radius,
                y: height * 0.8 - Math.sin(angle) * radius,
                party: Math.random() > 0.5 ? 'youth' : 'traditional'
            });
        }
    }

    svg.selectAll('circle')
        .data(seats)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 0)
        .attr('fill', d => d.party === 'youth' ? '#e74c3c' : '#95a5a6')
        .attr('opacity', 0.8)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 10)
        .attr('r', seatRadius);
}

function createInnovationViz() {
    const container = d3.select('#innovation-viz');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Create startup growth bars
    const data = [2.1, 3.5, 4.8, 6.5, 8.9, 11.2];
    const barWidth = width / (data.length * 2);
    const maxHeight = height * 0.7;

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (barWidth * 2) + barWidth / 2)
        .attr('y', height)
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('fill', '#3498db')
        .attr('rx', 4)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 150)
        .attr('y', d => height - (d / Math.max(...data)) * maxHeight)
        .attr('height', d => (d / Math.max(...data)) * maxHeight);

    // Add ascending line
    const line = d3.line()
        .x((d, i) => i * (barWidth * 2) + barWidth)
        .y(d => height - (d / Math.max(...data)) * maxHeight)
        .curve(d3.curveMonotoneX);

    const path = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#2ecc71')
        .attr('stroke-width', 3)
        .attr('d', line);

    const pathLength = path.node().getTotalLength();
    path
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(2000)
        .delay(500)
        .attr('stroke-dashoffset', 0);
}

function createCultureViz() {
    const container = d3.select('#culture-viz');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Sound wave visualization
    const numWaves = 50;
    const waves = d3.range(numWaves).map(i => ({
        x: (i / numWaves) * width,
        amplitude: Math.random() * height * 0.3 + height * 0.1
    }));

    svg.selectAll('line')
        .data(waves)
        .enter()
        .append('line')
        .attr('x1', d => d.x)
        .attr('x2', d => d.x)
        .attr('y1', height / 2)
        .attr('y2', height / 2)
        .attr('stroke', '#9b59b6')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .transition()
        .duration(1000)
        .delay((d, i) => i * 20)
        .attr('y1', d => height / 2 - d.amplitude)
        .attr('y2', d => height / 2 + d.amplitude);

    // Animate waves
    function animateWaves() {
        svg.selectAll('line')
            .transition()
            .duration(1500)
            .attr('y1', () => height / 2 - (Math.random() * height * 0.3 + height * 0.1))
            .attr('y2', () => height / 2 + (Math.random() * height * 0.3 + height * 0.1))
            .on('end', animateWaves);
    }
    setTimeout(animateWaves, 1500);
}

function createFashionViz() {
    const container = d3.select('#fashion-viz');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Fabric pattern simulation
    const patterns = 8;
    const colors = ['#f093fb', '#f5576c', '#fa709a', '#fee140'];

    for (let i = 0; i < patterns; i++) {
        const g = svg.append('g')
            .attr('transform', `translate(${Math.random() * width}, ${Math.random() * height})`);

        g.append('circle')
            .attr('r', 0)
            .attr('fill', colors[i % colors.length])
            .attr('opacity', 0.3)
            .transition()
            .duration(1500)
            .delay(i * 100)
            .attr('r', Math.random() * 60 + 40);
    }
}

function createEducationViz() {
    const container = d3.select('#education-viz');
    if (container.empty()) return;
    
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Book/learning icons represented as stacked bars
    const students = [45, 58, 67, 75, 82];
    const barHeight = 20;
    const spacing = 30;

    svg.selectAll('rect')
        .data(students)
        .enter()
        .append('rect')
        .attr('x', 50)
        .attr('y', (d, i) => i * spacing + 50)
        .attr('width', 0)
        .attr('height', barHeight)
        .attr('fill', '#2ecc71')
        .attr('rx', 4)
        .transition()
        .duration(1500)
        .delay((d, i) => i * 200)
        .attr('width', d => (d / 100) * (width - 100));

    // Add percentage labels
    svg.selectAll('text')
        .data(students)
        .enter()
        .append('text')
        .attr('x', 10)
        .attr('y', (d, i) => i * spacing + 50 + barHeight / 2)
        .attr('dy', '0.35em')
        .attr('fill', '#666')
        .style('font-size', '12px')
        .style('opacity', 0)
        .text(d => `${d}%`)
        .transition()
        .duration(500)
        .delay((d, i) => i * 200 + 1000)
        .style('opacity', 1);
}

// Advanced Africa Map
function createAdvancedMap() {
    const container = d3.select('#africa-map-advanced');
    const width = container.node().getBoundingClientRect().width;
    const height = 600;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

    // Sample data for countries
    const countries = [
        { name: 'Nigeria', x: 420, y: 280, stories: 45, category: 'politics' },
        { name: 'Kenya', x: 530, y: 320, stories: 38, category: 'innovation' },
        { name: 'South Africa', x: 480, y: 480, stories: 52, category: 'culture' },
        { name: 'Ghana', x: 380, y: 290, stories: 28, category: 'politics' },
        { name: 'Egypt', x: 480, y: 180, stories: 33, category: 'politics' },
        { name: 'Ethiopia', x: 540, y: 270, stories: 25, category: 'innovation' },
        { name: 'Senegal', x: 340, y: 260, stories: 22, category: 'culture' },
        { name: 'Morocco', x: 380, y: 140, stories: 30, category: 'culture' },
        { name: 'Tanzania', x: 540, y: 350, stories: 18, category: 'innovation' },
        { name: 'Rwanda', x: 510, y: 330, stories: 20, category: 'innovation' },
        { name: 'Algeria', x: 410, y: 160, stories: 16, category: 'politics' },
        { name: 'Uganda', x: 520, y: 310, stories: 14, category: 'culture' },
    ];

    // Create continent outline (simplified artistic representation)
    const africaOutline = svg.append('g').attr('class', 'continent-outline');
    
    const outlinePath = `
        M 360 120
        Q 400 100, 450 110
        L 520 130
        Q 560 150, 580 190
        L 590 240
        Q 600 290, 590 340
        L 580 400
        Q 565 450, 530 485
        L 490 510
        Q 450 525, 410 515
        L 370 495
        Q 330 465, 315 425
        L 300 370
        Q 285 310, 295 260
        L 310 210
        Q 330 150, 360 120
        Z
    `;

    africaOutline.append('path')
        .attr('d', outlinePath)
        .attr('fill', '#f8f8f8')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('opacity', 1);

    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'map-tooltip-advanced')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'white')
        .style('padding', '16px')
        .style('border-radius', '8px')
        .style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)')
        .style('font-size', '14px')
        .style('pointer-events', 'none')
        .style('z-index', '10000');

    // Create country groups
    const countryGroups = svg.selectAll('.country-group')
        .data(countries)
        .enter()
        .append('g')
        .attr('class', 'country-group')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', 'pointer');

    // Add glow effect
    countryGroups.append('circle')
        .attr('r', d => Math.sqrt(d.stories) * 4)
        .attr('fill', d => {
            if (d.stories > 30) return '#e74c3c';
            if (d.stories > 20) return '#3498db';
            return '#2ecc71';
        })
        .style('opacity', 0.2)
        .style('filter', 'blur(8px)');

    // Add main circles
    countryGroups.append('circle')
        .attr('r', 0)
        .attr('fill', d => {
            if (d.stories > 30) return '#e74c3c';
            if (d.stories > 20) return '#3498db';
            return '#2ecc71';
        })
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('r', d => Math.sqrt(d.stories) * 3);

    // Add labels
    countryGroups.append('text')
        .attr('dy', d => Math.sqrt(d.stories) * 3 + 18)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(d => d.name)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 500)
        .style('opacity', 1);

    // Add interaction
    countryGroups
        .on('mouseover', function(event, d) {
            d3.select(this).select('circle:last-of-type')
                .transition()
                .duration(200)
                .attr('r', Math.sqrt(d.stories) * 4);
            
            tooltip
                .style('visibility', 'visible')
                .html(`
                    <strong>${d.name}</strong><br/>
                    ${d.stories} stories published<br/>
                    <span style="color: #999; font-size: 12px;">Primary: ${d.category}</span>
                `);
        })
        .on('mousemove', function(event) {
            tooltip
                .style('top', (event.pageY - 10) + 'px')
                .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('circle:last-of-type')
                .transition()
                .duration(200)
                .attr('r', Math.sqrt(d.stories) * 3);
            
            tooltip.style('visibility', 'hidden');
        });

    // Connection lines between countries
    const connections = [
        { source: countries[0], target: countries[1] },
        { source: countries[1], target: countries[2] },
        { source: countries[0], target: countries[3] },
        { source: countries[1], target: countries[5] },
    ];

    svg.append('g')
        .attr('class', 'connections')
        .selectAll('line')
        .data(connections)
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', 'rgba(0,0,0,0.1)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .delay(1000)
        .style('opacity', 0.3);
}

// Export functions
window.visualizations = {
    createHeroNetwork,
    createPoliticsViz,
    createInnovationViz,
    createCultureViz,
    createFashionViz,
    createEducationViz,
    createAdvancedMap
};
