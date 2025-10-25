# 📸 Testimonial Image Mapping Guide

## 🎯 **Save Your PNG Images With These Exact Names:**

Save your 8 converted PNG images to: `/public/images/testimonials/`

### **Image 1: Blonde Woman (Professional Look)**
- **Filename**: `parent-woman-1.png`
- **For**: Lorene Stevenson (Parent from Bluff QLD)
- **Description**: "Clear, Concise Video Tutorials"

### **Image 2: Blonde Woman (Different Angle)**  
- **Filename**: `parent-woman-2.png`
- **For**: Rebekah Haack (Parent from Albion Park NSW)
- **Description**: "No More Pressure"

### **Image 3: Asian Girl (Student)**
- **Filename**: `student-asian-girl.png`
- **For**: Claire Cheong (Year 9 Student from Balwyn VIC)
- **Description**: "Extra Revision to Help me for Exams"

### **Image 4: Older Man with Glasses**
- **Filename**: `parent-man-1.png`
- **For**: John Sargeant (Parent from Bonny Hills, NSW)
- **Description**: "Improved Confidence and Grades"

### **Image 5: Middle-aged Man**
- **Filename**: `parent-man-2.png`
- **For**: Anthony English (Parent of 7 Children from Ryde NSW)
- **Description**: "Short, Systematic Lessons"

### **Image 6: Young Blonde Girl (Student)**
- **Filename**: `student-girl-1.png`
- **For**: Britney Lorenz (Year 9 Student from Campbelltown NSW)
- **Description**: "I Used to Struggle with Maths"

### **Image 7: Woman with Curly Hair**
- **Filename**: `parent-woman-3.png`
- **For**: Kerrin Simpson (Parent from Old Bar NSW)
- **Description**: "The Kids are Really Engaged Now"

### **Image 8: Professional Woman (Teacher)**
- **Filename**: `teacher-woman.png`
- **For**: Sherri Mcnichol (Qualified Primary School Teacher from Bucasia QLD)
- **Description**: "The Detailed Reporting Keeps Track of the Student's Progress"

## 📁 **Directory Structure:**
```
/public/images/testimonials/
├── parent-woman-1.png
├── parent-woman-2.png
├── student-asian-girl.png
├── parent-man-1.png
├── parent-man-2.png
├── student-girl-1.png
├── parent-woman-3.png
└── teacher-woman.png
```

## ✅ **After Saving Images:**
1. Restart your website: `pkill -f "next dev" && PORT=3001 npm run dev`
2. Visit: `http://localhost:3001/testimonial`
3. You should see all 8 real photos in circular format!

## 🎨 **Image Specifications:**
- **Format**: PNG
- **Recommended Size**: 200x200px or larger (will be resized to 80x80px)
- **Shape**: Will be automatically cropped to circular
- **Border**: 3px solid border will be added automatically
- **Hover Effect**: Images will scale up 5% on hover

The 9th testimonial (Nike Ajao) will show a placeholder avatar since no image is provided.
