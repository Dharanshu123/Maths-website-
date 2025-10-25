const fs = require('fs');
const path = require('path');

// Create simple SVG avatars as placeholders
const testimonialsDir = path.join(__dirname, 'public', 'images', 'testimonials');

const avatars = [
  { name: 'L', color: '#FF6B6B', filename: 'parent-woman-1.jpg' },
  { name: 'R', color: '#4ECDC4', filename: 'parent-woman-2.jpg' },
  { name: 'C', color: '#45B7D1', filename: 'student-asian-girl.jpg' },
  { name: 'J', color: '#96CEB4', filename: 'parent-man-1.jpg' },
  { name: 'A', color: '#FFEAA7', filename: 'parent-man-2.jpg' },
  { name: 'B', color: '#DDA0DD', filename: 'student-girl-1.jpg' },
  { name: 'K', color: '#98D8C8', filename: 'parent-woman-3.jpg' },
  { name: 'M', color: '#F7DC6F', filename: 'student-girl-2.jpg' },
  { name: 'S', color: '#BB8FCE', filename: 'teacher-woman.jpg' }
];

avatars.forEach(avatar => {
  const svgContent = `
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="75" fill="${avatar.color}"/>
      <text x="80" y="80" font-family="Arial, sans-serif" font-size="60" font-weight="bold" 
            fill="white" text-anchor="middle" dominant-baseline="central">${avatar.name}</text>
    </svg>
  `.trim();
  
  const filePath = path.join(testimonialsDir, avatar.filename.replace('.jpg', '.svg'));
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created: ${filePath}`);
});

console.log('Simple SVG avatars created successfully!');
