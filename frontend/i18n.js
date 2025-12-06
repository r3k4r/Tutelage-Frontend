import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      courses: {
        CoursesHero: {
          title: "Comprehensive English Courses with Tutelage",
          description: "Discover our expertly designed English courses tailored for every learning goal. From general communication to specialized business English, we offer structured programs that guide you from beginner to advanced proficiency with confidence."
        },
        CoursesShowcase: {
          title: "Choose Your Perfect English Course",
          description: "Explore our comprehensive range of English courses designed to meet your specific learning goals and career aspirations",
          courses: [
            {
              title: "English for Kids and Teens",
              description: "Engaging and interactive English learning program designed specifically for young learners aged 6-17. Fun activities, games, and age-appropriate content help children develop strong language skills naturally.",
              features: ["Interactive Games", "Age-Appropriate Content", "Fun Learning Activities"],
              buttonText: "Explore English for Kids and Teens"
            },
            {
              title: "English for Adults",
              description: "Comprehensive English language program tailored for adult learners with busy schedules. Focus on practical skills for work, travel, and daily communication with flexible learning options.",
              features: ["Flexible Scheduling", "Practical Communication", "Career-Focused Skills"],
              buttonText: "Explore English for Adults"
            },
            {
              title: "Academic English",
              description: "Master the English skills needed for academic success, including essay writing, research techniques, presentation skills, and critical thinking in English.",
              features: ["Academic Writing", "Research Skills", "Presentation Techniques"],
              buttonText: "Explore Academic English"
            },
            {
              title: "English Proficiency Tests",
              description: "Prepare for international English proficiency exams like IELTS, TOEFL, and Cambridge with targeted practice and test-taking strategies.",
              features: ["IELTS Preparation", "TOEFL Training", "Cambridge Exams"],
              buttonText: "Explore English Proficiency Tests"
            },
            {
              title: "Business English",
              description: "Develop professional English communication skills for the workplace, including business writing, presentations, negotiations, and meeting facilitation.",
              features: ["Business Communication", "Professional Writing", "Meeting Skills"],
              buttonText: "Explore Business English"
            }
          ],
          keyFeatures: "Key Features:"
        },
        CoursesCTA: {
          title: "Not Sure Which Course is Right for You?",
          description: "Take our comprehensive assessment quiz to discover the perfect English course tailored to your current level, learning goals, and career aspirations. Get personalized recommendations in just a few minutes.",
          features: [
            "5-Minute Assessment",
            "Personalized Results",
            "Expert Recommendations"
          ],
          buttonText: "Take the Course Quiz",
          info: "Free assessment • No registration required • Instant results"
        }
      },
      inglishForKids: {
        first: {
          title: "English for Kids and Teens",
          description: "Engaging and interactive English learning program designed specifically for young learners aged 5-17. Our innovative approach combines fun games, creative activities, and age-appropriate content to make learning English an enjoyable and effective experience.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English Language be their superpower",
          subtitle: "Start your Language journey with Tutelage",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "Small groups (3-5 learners only)",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Age-specific for top results",
              "Certificate of completion",
              "32 lessons per course"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "One-on-one lessons (1 learner only)",
              "Designed course for each learner",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Certificate of completion",
              "Flexibility in time and schedule",
              "16 lessons"
            ],
            buttonText: "Request Price"
          }
        },
        funWay: {
          title: "Learn a New Language the Fun Way",
          description: "Tutelage classes for kids and teens use research-proven methods to deliver age-specific, interactive lessons that make learning engaging and effective. Small groups of 3–5 students allow personalized attention from experienced teachers. Fun games, creative activities, and continuous feedback help every student reach their full potential. In a safe online environment with certificates of completion."
        },
        whyBest: {
          title: "Why we are the best choice",
          items: [
            {
              title: "Expert Instructors",
              description: "Learn from qualified native English speakers with years of teaching experience and proven track records."
            },
            {
              title: "Flexible Scheduling",
              description: "Choose from multiple time slots that fit your busy lifestyle with options for weekend and evening classes."
            },
            {
              title: "Proven Results",
              description: "Join thousands of successful students who have achieved their English learning goals with our effective methods."
            },
            {
              title: "Interactive Learning",
              description: "Experience engaging lessons with modern teaching techniques, games, and real-world conversation practice."
            }
          ]
        },
        similarCourses: {
          title: "Similar Courses",
          description: "Explore other English courses that might interest you and complement your learning journey.",
          viewButton: "View Course",
          viewAllButton: "View All Courses",
          duration: "Duration"
        },
        howToEnroll: {
          title: "How to Enroll?",
          description: "Join thousands of learners worldwide and learn the English language with ease in the most fun and interactive ways.",
          steps: [
            {
              title: "Request Payment",
              description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
            },
            {
              title: "Enroll",
              description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
            },
            {
              title: "Placement Test",
              description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
            },
            {
              title: "Start Learning",
              description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
            }
          ]
        },
        requestPricing: {
          title: "Request Pricing and Course Information",
          description: "Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our language programs.",
          form: {
            country: "Country of Residence",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            zipCode: "Zip Code",
            interestedIn: "I'm Interested In",
            classType: "Class Type",
            testType: "Test Type",
            message: "Message (Optional)",
            messagePlaceholder: "Tell us more about your learning goals or any questions you have...",
            selectCourse: "Select a course",
            selectClassType: "Select class type",
            selectTestType: "Select test type",
            submitButton: "Request Pricing",
            submittingButton: "Submitting Request...",
            required: "*",
            info1: "Our enrollment team will respond to your inquiry via email or phone as soon as possible",
            info2: "Please check your email and phone for our response within 24 hours"
          }
        }
      },
      inglishForAdults: {
        first: {
          title: "English for Adults",
          description: "Comprehensive English language program tailored specifically for adult learners with busy schedules. Our flexible approach combines professional instruction, real-world conversation practice, and modern teaching methods to help you achieve fluency and confidence in English communication.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English be your superpower",
          subtitle: "Reach fluency in no time",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live online classes",
              "Practice your language in small groups (3-5) students only",
              "Thorough language placement test",
              "Detailed curriculum backed by Tutelage Method designed to deliver a real-life language exposure to you",
              "Continuous feedback on your fluency and accuracy progress",
              "Course duration is 5 consecutive weeks, 15 classes, more than 22 hours of real conversation with our experienced instructors",
              "Tutelage's certificate of participation"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live online class",
              "A Dedicated experienced instructor with full studying support throughout your course",
              "Extra daily materials delivered via a private group with the instructor",
              "The flexibility of creating your own studying package",
              "Tutelage AI: Your personalized 24/7 practice partner, providing instant feedback and customized conversation exercises outside of class time"
            ],
            buttonText: "Request Price"
          }
        },
        inPerson: {
          title: "In-Person Classes",
          description: "Join our in-person classes available at specific locations, offering the same quality and personalized experience as our online programs, with the added benefit of face-to-face interaction and a collaborative learning atmosphere.",
          contactTitle: "Contact us for more information"
        },
        interactiveWay: {
          title: "Learn a new language in an interactive way",
          description: "Join our live online Adult ESL classes and start speaking with confidence! Our courses—available for both small groups (3-5 students) and private study—are designed and taught interactively to maximize your real-life conversation time. We provide a thorough language placement test and use the Tutelage Method for a detailed, effective curriculum with continuous feedback on your progress. Private students get a dedicated instructor, flexible packages, and Tutelage AI, a personalized 24/7 practice partner outside of class. All participants receive a certificate of participation. Don't miss this chance to become one of our success stories!"
        },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's English for Adults courses",
          questions: [
            {
              question: "What level of English do I need to enroll in the course?",
              answer: "The courses are organized based on the student's level. It is required from you to go through a language placement test before starting. This ensures we place you in the group that matches your level or helps the private tutor to tailor the curriculum based on your needs."
            },
            {
              question: "How is the class structure designed to be interactive and engaging?",
              answer: "Tutelage classes are both designed and taught in interactive and creative ways. Our experienced instructors encourage and guide the students to incorporate their first language skills into their second language learning. Then implement many lively activities such as: guiding discussions through group and pair work alongside many dynamic activities that maximize your speaking time inside the classroom."
            },
            {
              question: "What is the Tutelage Method, and how does it ensure real-life language exposure?",
              answer: "The Tutelage Method is backed by intensive research written by Tutelage's academic staff in 2022 it includes a detailed curriculum and a full educational framework backing our courses. It is specifically designed to move beyond textbook exercises and provide you with language skills and scenarios relevant to real-life situations, making sure you can confidently use what you learn immediately outside of the classroom."
            },
            {
              question: "What kind of feedback will I receive on my progress?",
              answer: "You will receive continuous feedback from your experienced instructors on both your fluency (how smoothly you speak) and your accuracy (grammar and vocabulary use), helping you clearly understand and track your improvements throughout the entire course. It doesn't matter whether you have enrolled in a group or private course, you are going to receive necessary feedback in both classes."
            },
            {
              question: "Will I receive a certificate after completing the course?",
              answer: "Yes, all participants who successfully complete the course will receive a Tutelage's certificate of participation to officially recognize your progress and achievement."
            }
          ]
        },
        howToEnroll: {
          title: "How to Enroll?",
          description: "Join thousands of learners worldwide and learn the English language with ease in the most fun and interactive ways.",
          steps: [
            {
              title: "Request Payment",
              description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
            },
            {
              title: "Enroll",
              description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
            },
            {
              title: "Placement Test",
              description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
            },
            {
              title: "Start Learning",
              description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
            }
          ]
        },
        requestPricing: {
          title: "Request Pricing and Course Information",
          description: "Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our language programs.",
          form: {
            country: "Country of Residence",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            zipCode: "Zip Code",
            interestedIn: "I'm Interested In",
            classType: "Class Type",
            testType: "Test Type",
            message: "Message (Optional)",
            messagePlaceholder: "Tell us more about your learning goals or any questions you have...",
            selectCourse: "Select a course",
            selectClassType: "Select class type",
            selectTestType: "Select test type",
            submitButton: "Request Pricing",
            submittingButton: "Submitting Request...",
            required: "*",
            info1: "Our enrollment team will respond to your inquiry via email or phone as soon as possible",
            info2: "Please check your email and phone for our response within 24 hours"
          }
        }
      },
      enroll: {
        title: "Enroll",
        titleWithCourse: "Enroll in",
        subtitle: "Take the first step towards mastering English. Fill out the form below and we'll get in touch with you soon.",
        form: {
          fullName: "Full Name",
          fullNamePlaceholder: "Enter your full name",
          email: "Email Address",
          emailPlaceholder: "Enter your email address",
          phone: "Phone Number",
          phonePlaceholder: "Enter your phone number",
          age: "Age",
          agePlaceholder: "Enter your age",
          profession: "Profession",
          professionPlaceholder: "Select your profession",
          professionTooltip: "Choose the option that best describes your current education or work status.",
          course: "Course",
          coursePlaceholder: "Select a course",
          submitButton: "Submit Enrollment",
          submittingButton: "Submitting...",
          required: "*"
        },
        infoMessage: "Please fill out this form to enroll in your chosen course. Our team will contact you as soon as possible via email or phone to discuss your learning goals and schedule.",
        sidebar: {
          exploreOtherCourses: "Explore Other Courses",
          exploreDescription: "Discover more ways to improve your English",
          viewAllCourses: "View All Courses",
          tryTutelageAI: "Try Tutelage AI",
          aiDescription: "Powerful tutoring AI designed for English learning",
          aiContent: "Experience our AI-powered English tutor that helps you learn and speak more confidently. Practice conversations, get instant feedback, and improve faster.",
          launchAI: "Launch Tutelage AI",
          findYourLevel: "Find Your Level",
          levelDescription: "Discover your English proficiency level",
          levelContent: "Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development.",
          takePlacementTest: "Take Free Test",
          practiceTests: "Practice Tests",
          practiceDescription: "Test your skills with our practice exams",
          freePracticeTests: "Free Practice Tests",
          mockTests: "International Mock Tests"
        },
        successDialog: {
          title: "Enrollment Successful! 🎉",
          description: "Thank you for enrolling with Tutelage! We have successfully received your application.",
          message: "Our team will be in touch with you via email or phone number within 24 hours to discuss your learning goals and help you get started on your English learning journey.",
          button: "Continue Exploring"
        }
      },
      ArabicCourse: {
        title: "Arabic Language Classes",
        description: "Why enroll in Tutelage Arabic classes? Experience interactive and engaging Arabic classes that fully immerse you in the language. With a skilled teacher and a well-designed curriculum, you’ll quickly boost your confidence and improve your everyday Arabic skills. This course is ideal for anyone who wants to learn or enhance their Arabic proficiency.",
        secondTitle: "Discover your ideal class!",
        classTypes: {
          online: {
            title: "Online Private Classes",
            features: [
              "Online Private Classes",
              "One-on-one Arabic language instruction",
              " Personalized study plan based on your goals",
              "Daily materials, homework, and feedback",
              "Flexible scheduling for online lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy lessons at any time and from any place."
            ],
            buttonText: "Ask for Price"
          },
          inPerson: {
            title: "In-Person Private Classes",
            features: [
              "In-Person Private Classes",
              "One-on-one Arabic language instruction",
              "Personalized study plan based on your goals",
              "Printed and in-class materials with guided practice",
              "Suited schedule for face-to-face lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy learning in a supportive classroom environment",
              "Note: this course only available at select locations."
            ],
            buttonText: "Ask for Price"
          },
        },
        thirdTitle: "Arabic Classes for All Ages!",
        thirdCard: {
          kids:{
            title: "For Kids",
            desc: "Enjoy interactive Arabic lessons full of games, fun activities and shortstories that make learning simple and exciting."
          },
          teens:{
            title: "For Teens",
            desc: "Dynamic Arabic classes designed to boost language skills, confidence, and communication abilities for teenagers."
          },
          adults:{
            title: "For Adults",
            desc: "Practical Arabic courses that help adults enhance everyday communication and achieve greater fluency efficiently."
        }
                  },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's Arabic courses",
          questions: [
            {
              question: "Who can join the classes?",
              answer: "Our classes are open to kids, teens, and adults at all levels."
            },
            {
              question: "Are classes online, in-person?",
              answer: "We offer private online classes and face-to-face classes available at select locations."
            },
            {
              question: "How long is each class?",
              answer: "Class duration is flexible and can be adjusted to your schedule and learning goals."
            },
            {
              question: "Do you provide study materials?",
              answer: "Yes, all students receive daily materials, homework, and feedback."
            },
            {
              question: "Can I choose my schedule?",
              answer: "Absolutely! We offer flexible scheduling for both online and in-person lessons."
            },
            {
              question: "Will I get a certificate?",
              answer: "Yes, a Tutelage certificate is awarded upon completion of the course."
            }
          ]
        },
        enrollForm: {
          title: "Enroll now!",
          subtitle: "Register your Arabic class",
          firstName: "First name",
          lastName: "Last name",
          age: "Age",
          country: "Country",
          classType: "Type of class",
          online: "Online",
          inPerson: "In-Person",
          phone: "Phone",
          email: "Email",
          interestedIn: "Interested in",
          kurdish: "Kurdish",
          arabic: "Arabic",
          selectClassType: "Select class type",
          selectLanguage: "Select language",
          submitButton: "Submit",
          submittingButton: "Submitting...",
          required: "*"
        }
      },
      KurdishCourse: {
        title: "Kurdish Language Classes",
        description: "Why enroll in Tutelage Kurdish classes? Our Kurdish classes are interactive and engaging, designed to fully immerse students in the language. With a qualified teacher and a well-structured curriculum, you’ll build confidence and improve your everyday Kurdish skills quickly and effectively. Whether you are a member of the Kurdish diaspora or a passionate individual seeking to learn or improve the Kurdish language, this course is specifically designed for you.",
        secondTitle: "Find your perfect class",
        classTypes: {
          online: {
            title: "Online Private Classes",
            features: [
              "Online Private Classes",
              "One-on-one Kurdish language instruction",
              "Personalized study plan based on your goals",
              "Daily materials, homework, and feedback",
              "Flexible scheduling for online lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy lessons at any time and from any place."
            ],
            buttonText: "Ask for Price"
          },
          inPerson: {
            title: "In-Person Private Classes",
            features: [
              "In-Person Private Classes",
              "One-on-one Kurdish language instruction",
              "Personalized study plan based on your goals",
              "Printed and in-class materials with guided practice",
              "Suited schedule for face-to-face lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy learning in a supportive classroom environment",
              "Note: this course only available at select locations."
            ],
            buttonText: "Ask for Price"
          },
        },
        thirdTitle: "Available classes for everyone!",
        thirdCard: {
          kids:{
            title: "For Kids",
            desc: "Fun and interactive Kurdish classes with games and activities to make learning enjoyable and easy."
          },
          teens:{
            title: "For Teens",
            desc: "Engaging Kurdish lessons that boost language skills, confidence, and communication for teens."
          },
          adults:{
            title: "For Adults",
            desc: "Practical Kurdish classes for adults to improve everyday communication and fluency efficiently."
        }
                  },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's Kurdish courses",
          questions: [
            {
              question: "Who can join the classes?",
              answer: "Our classes are open to kids, teens, and adults at all levels."
            },
            {
              question: "Are classes online, in-person?",
              answer: "We offer private online classes and face-to-face classes available at select locations."
            },
            {
              question: "How long is each class?",
              answer: "Class duration is flexible and can be adjusted to your schedule and learning goals."
            },
            {
              question: "Do you provide study materials?",
              answer: "Yes, all students receive daily materials, homework, and feedback."
            },
            {
              question: "Can I choose my schedule?",
              answer: "Absolutely! We offer flexible scheduling for both online and in-person lessons."
            },
            {
              question: "Will I get a certificate?",
              answer: "Yes, a Tutelage certificate is awarded upon completion of the course."
            }
          ]
        },
        enrollForm: {
          title: "Enroll now!",
          subtitle: "Register your Kurdish class",
          firstName: "First name",
          lastName: "Last name",
          age: "Age",
          country: "Country",
          classType: "Type of class",
          online: "Online",
          inPerson: "In-Person",
          phone: "Phone",
          email: "Email",
          interestedIn: "Interested in",
          kurdish: "Kurdish",
          arabic: "Arabic",
          selectClassType: "Select class type",
          selectLanguage: "Select language",
          submitButton: "Submit",
          submittingButton: "Submitting...",
          required: "*"
        }
      }
    }
  },
  ku: {
    translation: {
      courses: {
        CoursesHero: {
          title: "Comprehensive English Courses with Tutelage",
          description: "Discover our expertly designed English courses tailored for every learning goal. From general communication to specialized business English, we offer structured programs that guide you from beginner to advanced proficiency with confidence."
        },
        CoursesShowcase: {
          title: "Choose Your Perfect English Course",
          description: "Explore our comprehensive range of English courses designed to meet your specific learning goals and career aspirations",
          courses: [
            {
              title: "English for Kids and Teens",
              description: "Engaging and interactive English learning program designed specifically for young learners aged 6-17. Fun activities, games, and age-appropriate content help children develop strong language skills naturally.",
              features: ["Interactive Games", "Age-Appropriate Content", "Fun Learning Activities"],
              buttonText: "Explore English for Kids and Teens"
            },
            {
              title: "English for Adults",
              description: "Comprehensive English language program tailored for adult learners with busy schedules. Focus on practical skills for work, travel, and daily communication with flexible learning options.",
              features: ["Flexible Scheduling", "Practical Communication", "Career-Focused Skills"],
              buttonText: "Explore English for Adults"
            },
            {
              title: "Academic English",
              description: "Master the English skills needed for academic success, including essay writing, research techniques, presentation skills, and critical thinking in English.",
              features: ["Academic Writing", "Research Skills", "Presentation Techniques"],
              buttonText: "Explore Academic English"
            },
            {
              title: "English Proficiency Tests",
              description: "Prepare for international English proficiency exams like IELTS, TOEFL, and Cambridge with targeted practice and test-taking strategies.",
              features: ["IELTS Preparation", "TOEFL Training", "Cambridge Exams"],
              buttonText: "Explore English Proficiency Tests"
            },
            {
              title: "Business English",
              description: "Develop professional English communication skills for the workplace, including business writing, presentations, negotiations, and meeting facilitation.",
              features: ["Business Communication", "Professional Writing", "Meeting Skills"],
              buttonText: "Explore Business English"
            }
          ],
          keyFeatures: "Key Features:"
        },
        CoursesCTA: {
          title: "Not Sure Which Course is Right for You?",
          description: "Take our comprehensive assessment quiz to discover the perfect English course tailored to your current level, learning goals, and career aspirations. Get personalized recommendations in just a few minutes.",
          features: [
            "5-Minute Assessment",
            "Personalized Results",
            "Expert Recommendations"
          ],
          buttonText: "Take the Course Quiz",
          info: "Free assessment • No registration required • Instant results"
        }
      },
      inglishForKids: {
        first: {
          title: "English for Kids and Teens",
          description: "Engaging and interactive English learning program designed specifically for young learners aged 5-17. Our innovative approach combines fun games, creative activities, and age-appropriate content to make learning English an enjoyable and effective experience.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English Language be their superpower",
          subtitle: "Start your Language journey with Tutelage",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "Small groups (3-5 learners only)",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Age-specific for top results",
              "Certificate of completion",
              "32 lessons per course"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "One-on-one lessons (1 learner only)",
              "Designed course for each learner",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Certificate of completion",
              "Flexibility in time and schedule",
              "16 lessons"
            ],
            buttonText: "Request Price"
          }
        },
        funWay: {
          title: "Learn a New Language the Fun Way",
          description: "Tutelage classes for kids and teens use research-proven methods to deliver age-specific, interactive lessons that make learning engaging and effective. Small groups of 3–5 students allow personalized attention from experienced teachers. Fun games, creative activities, and continuous feedback help every student reach their full potential. In a safe online environment with certificates of completion."
        },
        whyBest: {
          title: "Why we are the best choice",
          items: [
            {
              title: "Expert Instructors",
              description: "Learn from qualified native English speakers with years of teaching experience and proven track records."
            },
            {
              title: "Flexible Scheduling",
              description: "Choose from multiple time slots that fit your busy lifestyle with options for weekend and evening classes."
            },
            {
              title: "Proven Results",
              description: "Join thousands of successful students who have achieved their English learning goals with our effective methods."
            },
            {
              title: "Interactive Learning",
              description: "Experience engaging lessons with modern teaching techniques, games, and real-world conversation practice."
            }
          ]
        },
        similarCourses: {
          title: "Similar Courses",
          description: "Explore other English courses that might interest you and complement your learning journey.",
          viewButton: "View Course",
          viewAllButton: "View All Courses",
          duration: "Duration"
        },
        howToEnroll: {
          title: "How to Enroll?",
          description: "Join thousands of learners worldwide and learn the English language with ease in the most fun and interactive ways.",
          steps: [
            {
              title: "Request Payment",
              description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
            },
            {
              title: "Enroll",
              description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
            },
            {
              title: "Placement Test",
              description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
            },
            {
              title: "Start Learning",
              description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
            }
          ]
        },
        requestPricing: {
          title: "Request Pricing and Course Information",
          description: "Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our language programs.",
          form: {
            country: "Country of Residence",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            zipCode: "Zip Code",
            interestedIn: "I'm Interested In",
            classType: "Class Type",
            testType: "Test Type",
            message: "Message (Optional)",
            messagePlaceholder: "Tell us more about your learning goals or any questions you have...",
            selectCourse: "Select a course",
            selectClassType: "Select class type",
            selectTestType: "Select test type",
            submitButton: "Request Pricing",
            submittingButton: "Submitting Request...",
            required: "*",
            info1: "Our enrollment team will respond to your inquiry via email or phone as soon as possible",
            info2: "Please check your email and phone for our response within 24 hours"
          }
        }
      },
      inglishForAdults: {
        first: {
          title: "English for Adults",
          description: "Comprehensive English language program tailored specifically for adult learners with busy schedules. Our flexible approach combines professional instruction, real-world conversation practice, and modern teaching methods to help you achieve fluency and confidence in English communication.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English be your superpower",
          subtitle: "Reach fluency in no time",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live online classes",
              "Practice your language in small groups (3-5) students only",
              "Thorough language placement test",
              "Detailed curriculum backed by Tutelage Method designed to deliver a real-life language exposure to you",
              "Continuous feedback on your fluency and accuracy progress",
              "Course duration is 5 consecutive weeks, 15 classes, more than 22 hours of real conversation with our experienced instructors",
              "Tutelage's certificate of participation"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live online class",
              "A Dedicated experienced instructor with full studying support throughout your course",
              "Extra daily materials delivered via a private group with the instructor",
              "The flexibility of creating your own studying package",
              "Tutelage AI: Your personalized 24/7 practice partner, providing instant feedback and customized conversation exercises outside of class time"
            ],
            buttonText: "Request Price"
          }
        },
        inPerson: {
          title: "In-Person Classes",
          description: "Join our in-person classes available at specific locations, offering the same quality and personalized experience as our online programs, with the added benefit of face-to-face interaction and a collaborative learning atmosphere.",
          contactTitle: "Contact us for more information"
        },
        interactiveWay: {
          title: "Learn a new language in an interactive way",
          description: "Join our live online Adult ESL classes and start speaking with confidence! Our courses—available for both small groups (3-5 students) and private study—are designed and taught interactively to maximize your real-life conversation time. We provide a thorough language placement test and use the Tutelage Method for a detailed, effective curriculum with continuous feedback on your progress. Private students get a dedicated instructor, flexible packages, and Tutelage AI, a personalized 24/7 practice partner outside of class. All participants receive a certificate of participation. Don't miss this chance to become one of our success stories!"
        },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's English for Adults courses",
          questions: [
            {
              question: "What level of English do I need to enroll in the course?",
              answer: "The courses are organized based on the student's level. It is required from you to go through a language placement test before starting. This ensures we place you in the group that matches your level or helps the private tutor to tailor the curriculum based on your needs."
            },
            {
              question: "How is the class structure designed to be interactive and engaging?",
              answer: "Tutelage classes are both designed and taught in interactive and creative ways. Our experienced instructors encourage and guide the students to incorporate their first language skills into their second language learning. Then implement many lively activities such as: guiding discussions through group and pair work alongside many dynamic activities that maximize your speaking time inside the classroom."
            },
            {
              question: "What is the Tutelage Method, and how does it ensure real-life language exposure?",
              answer: "The Tutelage Method is backed by intensive research written by Tutelage's academic staff in 2022 it includes a detailed curriculum and a full educational framework backing our courses. It is specifically designed to move beyond textbook exercises and provide you with language skills and scenarios relevant to real-life situations, making sure you can confidently use what you learn immediately outside of the classroom."
            },
            {
              question: "What kind of feedback will I receive on my progress?",
              answer: "You will receive continuous feedback from your experienced instructors on both your fluency (how smoothly you speak) and your accuracy (grammar and vocabulary use), helping you clearly understand and track your improvements throughout the entire course. It doesn't matter whether you have enrolled in a group or private course, you are going to receive necessary feedback in both classes."
            },
            {
              question: "Will I receive a certificate after completing the course?",
              answer: "Yes, all participants who successfully complete the course will receive a Tutelage's certificate of participation to officially recognize your progress and achievement."
            }
          ]
        },
        howToEnroll: {
          title: "How to Enroll?",
          description: "Join thousands of learners worldwide and learn the English language with ease in the most fun and interactive ways.",
          steps: [
            {
              title: "Request Payment",
              description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
            },
            {
              title: "Enroll",
              description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
            },
            {
              title: "Placement Test",
              description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
            },
            {
              title: "Start Learning",
              description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
            }
          ]
        },
        requestPricing: {
          title: "Request Pricing and Course Information",
          description: "Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our language programs.",
          form: {
            country: "Country of Residence",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            zipCode: "Zip Code",
            interestedIn: "I'm Interested In",
            classType: "Class Type",
            testType: "Test Type",
            message: "Message (Optional)",
            messagePlaceholder: "Tell us more about your learning goals or any questions you have...",
            selectCourse: "Select a course",
            selectClassType: "Select class type",
            selectTestType: "Select test type",
            submitButton: "Request Pricing",
            submittingButton: "Submitting Request...",
            required: "*",
            info1: "Our enrollment team will respond to your inquiry via email or phone as soon as possible",
            info2: "Please check your email and phone for our response within 24 hours"
          }
        }
      },
      enroll: {
        title: "Enroll",
        titleWithCourse: "Enroll in",
        subtitle: "Take the first step towards mastering English. Fill out the form below and we'll get in touch with you soon.",
        form: {
          fullName: "Full Name",
          fullNamePlaceholder: "Enter your full name",
          email: "Email Address",
          emailPlaceholder: "Enter your email address",
          phone: "Phone Number",
          phonePlaceholder: "Enter your phone number",
          age: "Age",
          agePlaceholder: "Enter your age",
          profession: "Profession",
          professionPlaceholder: "Select your profession",
          professionTooltip: "Choose the option that best describes your current education or work status.",
          course: "Course",
          coursePlaceholder: "Select a course",
          submitButton: "Submit Enrollment",
          submittingButton: "Submitting...",
          required: "*"
        },
        infoMessage: "Please fill out this form to enroll in your chosen course. Our team will contact you as soon as possible via email or phone to discuss your learning goals and schedule.",
        sidebar: {
          exploreOtherCourses: "Explore Other Courses",
          exploreDescription: "Discover more ways to improve your English",
          viewAllCourses: "View All Courses",
          tryTutelageAI: "Try Tutelage AI",
          aiDescription: "Powerful tutoring AI designed for English learning",
          aiContent: "Experience our AI-powered English tutor that helps you learn and speak more confidently. Practice conversations, get instant feedback, and improve faster.",
          launchAI: "Launch Tutelage AI",
          findYourLevel: "Find Your Level",
          levelDescription: "Discover your English proficiency level",
          levelContent: "Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development.",
          takePlacementTest: "Take Free Test",
          practiceTests: "Practice Tests",
          practiceDescription: "Test your skills with our practice exams",
          freePracticeTests: "Free Practice Tests",
          mockTests: "International Mock Tests"
        },
        successDialog: {
          title: "Enrollment Successful! 🎉",
          description: "Thank you for enrolling with Tutelage! We have successfully received your application.",
          message: "Our team will be in touch with you via email or phone number within 24 hours to discuss your learning goals and help you get started on your English learning journey.",
          button: "Continue Exploring"
        }
      },
       ArabicCourse: {
        title: "کۆرسی زمانی عەرەبی",
        description: "بۆچی بەشداری لە کۆرسی زمانی عەرەبی توتڵج بکەم ؟ئەزموونی باشترین و بەچێژترین کۆرسی زمانی عەرەبی بکەن کە بە تەواوی دەتکاتە کەشی فێربوونی زمانەکەوە. بە کەمترین ماوە متمانە بەخۆبوون و کارامەییە پێویستەکانی زمانەکەت بەرەوپێش ببە. ئەم کۆرسە بۆهەر کەسێک گونجاوە کە بیەوێت توانای زمان پاراویی بەرەو پێش ببات لە زمانی عەرەبیدا",
        secondTitle: "دەربارەی کۆرسە نمونەییەکەت بزانە",
        classTypes: {
          online: {
            title: "کۆرسی تایبەتی ئۆناڵین",
            features: [
              "کۆرسی تایبەتی ئۆناڵین",
              "کۆرسی تایبەتی یەک فێرخوازی زمانی عەرەبی",
              "دانانی مەنهەجی تایبەت بە خۆت بەپێی ئامانجەکانت",
              "ناردنی فیدباک و ئەرکی ڕۆژانە بۆ فێرخواز لەگەڵ سەرچاوەی زیادە",
              "دانانی کاتەکانی کۆرسی ئۆناڵین بە پێی فێرخواز",
              "هاریکاری و پشتگیری بەردەوامی ڕاهێنەر بۆ فێرخواز",
              "پێدانای بڕوانامەی دانپێدانراوی توتڵج لەگەڵ تەواوبوونی کۆرس",
              "چێژ لە وانەکانت وەربگرە لە هەمووکات و شێوێنێکدا"
            ],
            buttonText: "داواکاری نرخ"
          },
          inPerson: {
            title: "کۆرسی تایبەتی ڕووبەڕووی",
            features: [
              "کۆرسی تایبەتی ڕووبەڕووی",
              "وانەی تایبەتی ڕووبەڕوو لەگەڵ مامۆستا",
              "پالنی وانەخوێندنی تایبەت بە فیرخواز بەپێی ئامانجەکانت",
              "بابەتی ڕۆژانە و ڕاهێنانی جۆراو جۆر و ئامادەکراو",
              "کاتی وانەخوێندن بە تایبەت لەگەڵ کاتی فیرخواز دەگونجێندرێت",
              "هاریکاری بەردەوامی مامۆستای وانە و هەڵسەنگاندن لە کاتی کۆرسدا",
              "وەرگرتنی بڕوانامەی فەرمی توتلج لە تەواوبوونی کۆرسەکەدا",
              "جێژ لە وانەکانت ببینە لە ژینگەیەکی تایبەت بە فێربوون",
              "تێبینی: ئەم وانەیە تەنها لە کوردستان – شاری سلێمانی بەردەستە"
            ],
            buttonText: "داواکاری نرخ"
          },
        },
        thirdTitle: "کۆرسی زمانی عەرەبی تایبەت بە هەموو تەمەنەکەن",
        thirdCard: {
          kids:{
            title: "تایبەت بە مندااڵن",
            desc: "چێژ وەربگرە لە وانەی زمانی عەرەبی تایبەت بە مندااڵن کە چەندین چاالکی جیاواز و یاری جۆراوجۆر و کورتە چیرۆک لەخۆ دەگریت. ئامانجی ئەم کۆرسە فێرکردنی زمانەکەیە بەشێوەیەکی سادە و ئاسان بۆ مندااڵن"
          },
          teens:{
            title: "تایبەت بە تازەپێگەیشتووان",
            desc: "کۆرسی تایبەت بە تەمەنی تازەپێگەیشتووان بە جۆرێک دیزاین کراون کە هاریکاری فێرخوازان بکەن بە بەهێزکردنی توانا زمانەوانییەکانیان و دروست کردنی بڕوابەخۆبوون بۆ گفتووگۆکردن بە زمانەکە وە هاریکارییەکی باشیان بکات تایبەت بە وانەکانی قوتابخانە"
          },
          adults:{
            title: "تایبەت بە تەمەنی گەورە",
            desc: "وانەی زمانی عەرەبی تایبەت بە گەوران جیاواز لە تەمەنەکانی تر، هاریکاری فیرخواز دەکات بۆ فێربوونی زۆرترین دەستەواژە و تەکنیکەکانی گفتووگۆکردنی ژیانی ڕۆژانە بە شێوازی عەرەبی جڵفی"
        }
                  },
        faq: {
          title: "پرسیارە باوەکان",
          subtitle: "دەربارەی کۆرسی زمانی عەرەبی توتڵج",
          questions: [
            {
              question: "کێ دەتوانێت بەشداری لەم کۆرسانەدا بکات ؟",
              answer: "کۆرسەکانمان بەردەستن بۆ سەرجەم ئاست و تەمەنە جیاوازەکان لە منداڵ و تازە پێگەشتووان و تەمەنی گەورە"
            },
            {
              question: "ئایا کۆرسەکان ڕووبەڕوون یاخود ئۆناڵین؟",
              answer: "کۆرسەکان بە هەردوو شێوازەکە بەردەستن ، بەاڵم کۆرسە ڕووبەڕووەکان تەنها لە شوێنی دیاریکراو بەردەستن"
            },
            {
              question: "هەر وانەیەک چەند کاتژمێرە ؟",
              answer: "کاتی وانەکان جێگیر نین و بەپێی پێویستی فێرخواز دادەنرێت"
            },
            {
              question: "ئایا سەرچاوە بۆ فیرخواز دابین دەکەن؟",
              answer: "بەڵێ، هەموو فێرخوازێک ڕۆژانە سەرچاوە و بابەتی تایبەت بە خۆی بۆ دابین دەکرێت لەگەڵ هەڵسەنگاندنی ئاستەکەی"
            },
            {
              question: "ئایا دەتوانم خۆم خشتەی وانەکانم ڕێکبخەم؟",
              answer: "ەڵێ، لە هەردوو کاڵسی ئۆنالین و ڕووبەڕوو فیرخواز سەرپشک دەکرێت لە هەڵبژاردنی کاتی وانەخویندنی تایبەت بە خۆی"
            },
            {
              question: "ئایا بڕوانامە وەردەگرم؟",
              answer: "بڕوانامەی فەرمی و تایبەت بە توتڵج دەدریت بە فێرخوازان بە تەواوبوونی کۆرسەکانمان"
            }
          ]
        },
        enrollForm: {
          title: "هەرئێستا خۆت تۆمار بکە",
          subtitle: "بەشداری بکە لە کۆرسی زمانی عەرەبی توتڵج و دەستپێبکە بە گەیشتن بە ئامانجەکانی فێربوونت",
          firstName: "ناوی یەکەم",
          lastName: "ناوی دووەم",
          age: "تەمەن",
          country: "وڵات",
          classType: "جۆری کڵاس",
          online: "ئۆنڵاین",
          inPerson: "ڕووبەڕوو",
          phone: "ژمارەتەلەفون",
          email: "ئیمەیڵ",
          interestedIn: "دەتەوێت فێری چ زمانێک بیت",
          kurdish: "کوردی",
          arabic: "عەرەبی",
          submitButton: "ناردن",
          submittingButton: "ناردن...",
          required: "*"
        }
      },
       KurdishCourse: {
        title: "دروس اللغة الكردية — تعليم احترافي لجميع المستويات",
        description: "تعل اللغة الكردية بثقة... أينما كنت!  نقّدم درو ًسا خصوصية في اللغة الكردية حضورًيا وعبر اإلنترنت، بإشراف معلم مؤهل ومنهج متكامل مص ّمم ف ّعا وممت ًعا منذ الدرس األول. اًل بعناية ليالئم احتياجاتك، ويضمن لك تعل ًما،لماذا تختار دراسة اللغة الكردية مع Tutelage؟ تتميز دوراتنا بأنها: تفاعلية ابة وجذّ تعتمد على الممارسة والشرح الواضح تساعدك على اكتساب الطالقة والثقة بالنفس بسرعة مناسبة لجميع األعمار والمستويات سواء كنت من أبناء الجالية الكردية أو مهت ًما بتعلم اللغة ألسباب شخصية أو مهنية، فهذه الدورة مصممة خصي ًصا لك",
        secondTitle: "اختر نوع الصف المناسب لك",
        classTypes: {
          online: {
            title: "الدروس الخاصة عبر اإلنترنت",
            features: [
             " تعليم فردي مباشر مع معلم مختص",
              "خطة دراسية مصممة حسب أهدافك",
              "مواد تعليمية يومية + واجبات منزلية + مالحظات متابعة",
              "جدول دراسي مرن ومريح",
              "متابعة لتطّور مستوى الطالب",
              "شهادة معتمدة عند إتمام الدورة",
            ],
            buttonText: "اسأل عن األسعار"
          },
          inPerson: {
            title: "الدروس الخاصة الحضورية",
            features: [
            " دروس فردية داخل الصف مع تدريب عملي",
           " خطة تعليمية شخصية",
            " مواد مطبوعة وأنشطة داخل الصف",
            " جدول مناسب للطالب الحضوريين",
            " متابعة مباشرة وتقييم مستمر",
            " شهادة توجيهية عند إتمام الدورة",
            " مالحظة: متوفرة في مواقع محددة فقط"
            ],
            buttonText: "اسأل عن األسعار"
          },
        },
        thirdTitle: "برامج مناسبة لكل الفئات",
        thirdCard: {
          kids:{
            title: "لألطفال",
            desc: ". دروس ممتعة وتفاعلية مع ألعاب وأنشطة تجعل تعلم الكردية سهالً ومشوقًا"
          },
          teens:{
            title: "للمراهقين",
            desc: "صفوف مشوقة تعزز مهارات التواصل والثقة بالنفس والطالقة"
          },
          adults:{
            title: "للبالغين",
            desc: "دروس عملية تساعدك على تحسين التواصل اليومي وتطوير طالقتك في اللغة بسرعة"
        }
                  },
        faq: {
          title: "األسئلة الشائعة",
          subtitle: "تعرف على المزيد حول دورة اللغة الكردية مع Tutelage",
          questions: [
            {
              question: "من يمكنه االنضمام إلى الدروس؟",
              answer: "يمكن لألطفال والمراهقين والبالغين التسجيل في أي مستوى"
            },
            {
              question: "هل الصفوف متاحة حضورًيا أو عبر اإلنترنت؟",
              answer: "نعم، نوفر كال الخيارين"
            },
            {
              question: "ما مدة كل درس؟",
              answer: "مدة الدرس مرنة ويتم ترتيبها حسب وقت الطالب"
            },
            {
              question: "ل توفرون مواد تعليمية؟",
              answer: "نعم، جميع الطالب يحصلون على مواد، واجبات، مالحظات يومية"
            },
            {
              question: "هل أستطيع اختيار الجدول؟",
              answer: "بالتأكيد، نوفر جداول مرنة تناسب الجميع"
            },
            {
              question: "هل أحصل على شهادة؟",
              answer: "نعم، يحصل الطالب على شهادة عند إتمام الدورة"
            }
          ]
        },
        enrollForm: {
          title: "س ّجل اآلن!",
          subtitle: "امأل المعلومات التالية للبدء:",
          firstName: "االسم األول",
          lastName: "سم العائلة",
          age: "العمر",
          country: "البلد",
          classType: "نوع الصف",
          online: "عبر اإلنترنت",
          inPerson: "حضوري",
          phone: "رقم الهاتف",
          email: "البريد اإللكتروني",
          interestedIn: "مهتم بـ",
          kurdish: "الكردية",
          arabic: "العربية",
          submitButton: "إرسال",
          submittingButton: "إرسال...",
          required: "*"
        }
      }
    }
  }
};

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tutelage-language') || 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(), // Use saved language instead of hardcoded 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tutelage-language', lng);
    
    // Update RTL class on body
    if (lng === 'ku') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }
});

export default i18n;
