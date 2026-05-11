const certificates = {
    'child-nest': {
        title: 'Child Nest Rehab Internship Certificate',
        issuer: 'Child Nest Rehab Centre Pvt Ltd',
        date: 'June 2025',
        desc: 'Successfully completed a Data Analysis internship focused on patient data insights, doctor performance evaluation, and market competitive analysis.',
        skills: ['Data Analysis', 'Excel', 'Healthcare Analytics', 'Statistical Reporting'],
        image: 'certificates/images/child-nest.png',
        file: 'certificates/images/child-nest.png'
    },
    'ibm-tools': {
        title: 'IBM Tools for Data Science',
        issuer: 'IBM | Coursera',
        date: '2024',
        desc: 'Comprehensive training on essential data science tools including Jupyter Notebooks, Zeppelin Notebooks, RStudio, and GitHub.',
        skills: ['Jupyter', 'GitHub', 'RStudio', 'Cloud IDEs'],
        image: 'certificates/images/child-nest.png',
        file: 'certificates/images/ibm-tools.png'
    },
    'ibm-analysis': {
        title: 'IBM Data Analysis with Python',
        issuer: 'IBM | Coursera',
        date: '2024',
        desc: 'Technical specialization in using Python for data analysis, focusing on libraries like Pandas, NumPy, and Scipy for real-world datasets.',
        skills: ['Pandas', 'NumPy', 'Matplotlib', 'Exploratory Data Analysis'],
        image: 'certificates/images/ibm-analysis.png',
        file: 'certificates/images/ibm-analysis.png'
    },
    'ibm-whatis': {
        title: 'IBM What is Data Science',
        issuer: 'IBM | Coursera',
        date: '2024',
        desc: 'Foundational certification exploring the definition, applications, and impact of data science in the modern tech landscape.',
        skills: ['Data Literacy', 'Research Methods', 'Industry Insights'],
        image: 'certificates/images/ibm-whatis.png',
        file: 'certificates/images/ibm-whatis.png'
    },
    'geekster': {
        title: 'Geekster Google Sheets Certificate',
        issuer: 'Geekster',
        date: '2024',
        desc: 'Mastery of Google Sheets for data manipulation, visualization, and advanced formula implementations for business intelligence.',
        skills: ['Advanced Formulas', 'Pivot Tables', 'Data Visualization', 'Automation'],
        image: 'certificates/images/geekster.png',
        file: 'certificates/images/geekster.png'
    },
    'internpe': {
        title: 'InternPe Python Programming Internship',
        issuer: 'InternPe',
        date: '2024',
        desc: 'Successfully completed a Python programming internship, delivering high-quality code for multiple real-world application projects.',
        skills: ['Python 3', 'Algorithm Design', 'Software Development', 'Debugging'],
        image: 'certificates/pdfs/internpe.pdf', // Keeping PDF as an example if it's there, but user said images for others
        file: 'certificates/pdfs/internpe.pdf'
    },
    'tantrafiesta': {
        title: 'TantraFiesta’25 Participation Certificate',
        issuer: 'TantraFiesta Symposium',
        date: '2025',
        desc: 'Recognized for active participation and technical contribution to the national-level technical symposium TantraFiesta’25.',
        skills: ['Technical Innovation', 'Collaboration', 'Problem Solving'],
        image: 'certificates/images/tantrafiesta.png',
        file: 'certificates/images/tantrafiesta.png'
    }
};

// Export if using modules, but for simple scripts we'll just include it in HTML
if (typeof module !== 'undefined') {
    module.exports = certificates;
}
