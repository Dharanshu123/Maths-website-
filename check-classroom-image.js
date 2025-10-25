const fs = require('fs');
const path = require('path');

// Check if the classroom image exists
const imagePath = path.join(__dirname, 'public', 'images', 'About', 'classroom-teacher.png');

console.log('🔍 Checking for classroom image...');
console.log('📁 Looking for:', imagePath);

if (fs.existsSync(imagePath)) {
  const stats = fs.statSync(imagePath);
  console.log('✅ SUCCESS! Classroom image found!');
  console.log('📊 File size:', Math.round(stats.size / 1024), 'KB');
  console.log('📅 Created:', stats.birthtime.toLocaleString());
  console.log('🚀 Your image is ready to display on the website!');
} else {
  console.log('❌ Image not found yet.');
  console.log('📋 Please save your classroom PNG image to:');
  console.log('   /Users/dharanshu/Desktop/Website /public/images/About/classroom-teacher.png');
  console.log('');
  console.log('💡 Make sure:');
  console.log('   - Filename is exactly: classroom-teacher.png');
  console.log('   - It\'s in PNG format');
  console.log('   - It\'s in the correct directory');
}
