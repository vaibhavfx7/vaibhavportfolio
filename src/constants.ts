import type { PersonalInfo, SkillCategory, Experience, Education, Certification } from './types';

export const PERSONAL_INFO: PersonalInfo = {
    name: "Vaibhav Kumar",
    title: "Innovative Data Scientist Specializing in Generative AI",
    contacts: [
        { type: 'phone', value: '+91 9971802027', href: 'tel:+919971802027' },
        { type: 'email', value: 'kumarvaibhav077@gmail.com', href: 'mailto:kumarvaibhav077@gmail.com' },
        { type: 'linkedin', value: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/vaibhav-kumar-034738149/' }
    ],
    summary: "A dynamic and solution-oriented Data Scientist with strong expertise in Generative AI and a broad range of data science techniques. Proven ability to design and implement data-driven solutions that enhance efficiency and support strategic decision-making."
};

export const SKILLS_DATA: SkillCategory[] = [
    {
        title: "Languages",
        skills: [
            { name: "Python", level: 95 },
            { name: "SQL", level: 90 },
            { name: "Spark", level: 85 },
            { name: "JavaScript", level: 80 },
            { name: "NodeJS", level: 75 },
            { name: "C++", level: 70 },
            { name: "Angular", level: 60 },
        ]
    },
    {
        title: "Technologies",
        skills: [
            { name: "Pandas", level: 95 },
            { name: "TensorFlow", level: 90 },
            { name: "PyTorch", level: 90 },
            { name: "MS Azure", level: 85 },
            { name: "Power BI", level: 85 },
            { name: "Tableau", level: 80 },
            { name: "Flask", level: 75 },
            { name: "Django", level: 70 },
        ]
    },
    {
        title: "Concepts",
        skills: [
            { name: "AI/ML", level: 95 },
            { name: "Neural Networks", level: 90 },
            { name: "Git", level: 90 },
            { name: "Cloud Computing", level: 85 },
            { name: "APIs", level: 85 },
            { name: "Agile", level: 80 },
        ]
    }
];

export const WORK_EXPERIENCE: Experience[] = [
    {
        company: "Infosys Limited",
        roles: [
            {
                title: "Senior Associate Consultant",
                subTitle: "Senior Responsible AI Engineer",
                startDate: "June 2025",
                endDate: "Present",
                description: [
                    "Architected and developed an MCP (Model-Compute-Platform) server featuring PII masking, moderation, chain-of-thought visualization, and a proprietary 'CodeShield' algorithm for automated code correction.",
                    "Created a VS Code extension to integrate the MCP server's capabilities directly into the IDE, significantly enhancing developer workflow and productivity."
                ]
            }
        ]
    },
    {
        company: "Tata Consultancy Services",
        roles: [
            {
                title: "Systems Engineer",
                subTitle: "Generative AI Engineer",
                startDate: "March 2023",
                endDate: "June 2025",
                description: [
                    "Engineered a COPILOT chatbot using LangChain and Azure OpenAI, significantly reducing search and retrieval times.",
                    "Optimized LLMs for specific client needs using innovative chunking and retrieval strategies.",
                    "Created evaluation frameworks with Deepeval and RAGAS, improving model correctness by 12%.",
                    "Replaced in-memory index loading with Azure AI Search, boosting retrieval speed by 60% and scaling to 10k+ documents.",
                    "Developed a multi-agent workflow using LangGraph, improving task delegation efficiency by 40% and supporting 6+ autonomous agents for specialized Gen AI subtasks.",
                    "Scheduled nightly jobs to trigger 8+ critical API workflows using the CronJob scheduler, ensuring CDC process."
                ]
            },
            {
                title: "Assistant Systems Engineer",
                subTitle: "Data Scientist, Data Analyst and Engineer",
                startDate: "November 2020",
                endDate: "February 2023",
                description: [
                    "As a Data Scientist, developed diverse machine learning models for text feedback analysis and unsupervised clustering.",
                    "Constructed a comprehensive suite of forecasting models using advanced statistical methods to enhance revenue projections across 6+ product lines.",
                    "As a Data Analyst and Engineer, produced over 30 Power BI reports and implemented ETL workflows in Azure Databricks."
                ]
            }
        ]
    }
];

export const EDUCATION: Education[] = [
    {
        degree: "M.Tech - Data Science and Engineering",
        institution: "BITS Pilani",
        period: "April 2024 - Present"
    },
    {
        degree: "B.Tech - Computer Science and Engineering",
        institution: "Guru Gobind Singh Indraprastha University",
        period: "2016 - 2020"
    }
];

export const CERTIFICATIONS: Certification[] = [
    { name: "Google Professional Machine Learning Engineer" },
    { name: "Contextual Masters, TCS (2022)" },
    { name: "Star of the Month, TCS (2022)" }
];