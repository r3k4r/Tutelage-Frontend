'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { API_URL } from '@/common/utils/config'
import { clearAttempt, loadAttempt, saveAttempt, secondsLeft } from '@/common/utils/quizAttempt'
import { Loader2 } from 'lucide-react'
import QuizStage from '@/components/pages/tutelage-tests/quiz/QuizStage'
import TestIntro from '@/components/pages/tutelage-tests/quiz/TestIntro'


// Comprehensive list of world countries
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
  'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

// The API returns questions grouped by section in display order; a section that is short of
// questions just gets a shorter range.
function buildSections(questions) {
  const sectionArray = []
  questions.forEach((q, i) => {
    const last = sectionArray[sectionArray.length - 1]
    if (last && last.id === q.sectionId) {
      last.endIndex = i
      last.questionCount++
    } else {
      sectionArray.push({ id: q.sectionId, number: sectionArray.length + 1, name: q.sectionName, questionCount: 1, startIndex: i, endIndex: i, isCompleted: false })
    }
  })
  return sectionArray
}

export default function FreePracticeTestPage() {
  const router = useRouter()
  
  // Quiz flow state
  const [stage, setStage] = useState('instructions') // 'instructions' | 'quiz' | 'form' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionIndex: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    yearOfBirth: ''
  })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('')

  // Fetch quiz config and questions from API
  const [quizConfig, setQuizConfig] = useState(null)
  const [quizQuestions, setQuizQuestions] = useState([])  
  const [loading, setLoading] = useState(true)

  // Section tracking state
  const [sections, setSections] = useState([])
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [sectionProgress, setSectionProgress] = useState({})

  // ✅ Use ref to track if data has been fetched (prevent infinite loop)
  const hasFetchedData = useRef(false)

  // deadline of the running test (ms); the timer counts down to it, so a reload keeps the real time left
  const [endsAt, setEndsAt] = useState(null)

  const applyQuestions = (questions) => {
    setQuizQuestions(questions)
    const sectionArray = buildSections(questions)
    setSections(sectionArray)
    setSectionProgress(Object.fromEntries(sectionArray.map((_, idx) => [idx, { completed: false }])))
  }

  // ✅ Fetch quiz data ONCE on mount
  useEffect(() => {
    if (hasFetchedData.current) return // ✅ Prevent refetching

    // A reload mid-test continues the same test instead of starting a new one.
    const saved = loadAttempt()
    if (saved) {
      applyQuestions(saved.questions)
      setAnswers(saved.answers)
      setCurrentQuestionIndex(saved.index)
      setEndsAt(saved.endsAt)
      setTimeLeft(secondsLeft(saved.endsAt))
      setStage(saved.stage === 'quiz' && secondsLeft(saved.endsAt) === 0 ? 'form' : saved.stage)
      hasFetchedData.current = true
      setLoading(false)
      return
    }

    const fetchQuizData = async () => {
      try {
        setLoading(true)
        
        const configRes = await fetch(`${API_URL}/api/quiz/config`)
        const configData = await configRes.json()
        if (configData.success) {
          const config = configData.data
          setQuizConfig(config)
          setTimeLeft(config.timeLimitMinutes * 60)
        } else {
          toast.error('Quiz is currently unavailable. Please try again later.')
          return
        }

        const questionsRes = await fetch(`${API_URL}/api/quiz/questions`)
        const questionsData = await questionsRes.json()

        if (questionsData.success) {
          applyQuestions(questionsData.data)
        } else {
          toast.error('Failed to load quiz questions.')
        }
        
        hasFetchedData.current = true // ✅ Mark as fetched
      } catch (error) {
        console.error('Error fetching quiz data:', error)
        toast.error('Failed to load quiz. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuizData()
  }, []) // ✅ Empty dependency array - only run once on mount

  // Timer: counts down to the saved deadline; at zero the test ends and the details form opens
  useEffect(() => {
    if (stage !== 'quiz' || !endsAt) return
    const tick = () => {
      const left = secondsLeft(endsAt)
      setTimeLeft(left)
      if (left === 0) setStage('form')
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [stage, endsAt])

  // Keep the test in progress across reloads; forget it once the results are shown
  useEffect(() => {
    if (stage === 'quiz' || stage === 'form') {
      saveAttempt({ questions: quizQuestions, answers, index: currentQuestionIndex, stage, endsAt })
    } else if (stage === 'results') {
      clearAttempt()
    }
  }, [stage, answers, currentQuestionIndex, endsAt, quizQuestions])

  // ✅ FIX: Check section completion WITHOUT circular dependencies
  useEffect(() => {
    if (sections.length === 0) return
    
    const currentSection = sections[currentSectionIndex]
    if (!currentSection) return
    
    // Check if all questions in current section are answered
    let allAnswered = true
    for (let i = currentSection.startIndex; i <= currentSection.endIndex; i++) {
      if (answers[i] === undefined) {
        allAnswered = false
        break
      }
    }
    
    // ✅ Only update if status actually changed (prevents infinite loop)
    const isAlreadyCompleted = sectionProgress[currentSectionIndex]?.completed
    if (allAnswered && !isAlreadyCompleted) {
      setSectionProgress(prev => ({
        ...prev,
        [currentSectionIndex]: { completed: true }
      }))
    }
  }, [answers, currentSectionIndex]) // ✅ Removed sections and sectionProgress from deps

  // ✅ FIX: Update current section index WITHOUT circular dependencies
  useEffect(() => {
    if (sections.length === 0) return
    
    const nextSectionIndex = sections.findIndex(s => 
      currentQuestionIndex >= s.startIndex && currentQuestionIndex <= s.endIndex
    )
    
    // ✅ Only update if index actually changed (prevents infinite loop)
    if (nextSectionIndex !== -1 && nextSectionIndex !== currentSectionIndex) {
      setCurrentSectionIndex(nextSectionIndex)
    }
  }, [currentQuestionIndex]) // ✅ Removed sections and currentSectionIndex from deps

  const handleStartQuiz = () => {
    const minutes = quizConfig?.timeLimitMinutes || 30
    setEndsAt(Date.now() + minutes * 60_000)
    setTimeLeft(minutes * 60)
    setStage('quiz')
  }

  const handleSelectAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const handleFinishQuiz = () => {
    setStage('form')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    
    // ✅ Use ACTUAL number of questions fetched, not config limit
    const totalQuestions = quizQuestions.length
    const percentage = Math.round((correct / totalQuestions) * 100)
    
    // ✅ Dynamic level calculation based on percentage of fetched questions
    let calculatedLevel = ''
    const ranges = [
      { min: 0, max: Math.floor(totalQuestions * 0.10), level: 'A1 Beginner' },
      { min: Math.floor(totalQuestions * 0.10) + 1, max: Math.floor(totalQuestions * 0.30), level: 'A2 Pre-intermediate' },
      { min: Math.floor(totalQuestions * 0.30) + 1, max: Math.floor(totalQuestions * 0.53), level: 'B1 Intermediate' },
      { min: Math.floor(totalQuestions * 0.53) + 1, max: Math.floor(totalQuestions * 0.77), level: 'B2 Upper-Intermediate' },
      { min: Math.floor(totalQuestions * 0.77) + 1, max: Math.floor(totalQuestions * 0.90), level: 'C1 Advanced' },
      { min: Math.floor(totalQuestions * 0.90) + 1, max: totalQuestions, level: 'C2 Proficient' }
    ]
    
    for (const range of ranges) {
      if (correct >= range.min && correct <= range.max) {
        calculatedLevel = range.level
        break
      }
    }
    
    if (!calculatedLevel) calculatedLevel = 'A1 Beginner'
    
    setScore(percentage)
    setLevel(calculatedLevel)
    
    try {
      const response = await fetch(`${API_URL}/api/enrollment/testresult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          yearOfBirth: formData.yearOfBirth,
          score: percentage,
          level: calculatedLevel,
          totalQuestions: totalQuestions,
          correctAnswers: correct
        })
      })

      if (response.ok) {
        toast.success('Results sent to your email!')
      } else {
        toast.error('Could not send email, but you can still view your results.')
      }
    } catch (error) {
      console.error('Error sending test result email:', error)
      toast.error('Could not send email, but you can still view your results.')
    }

    setStage('results')
  }

  const handleSkipForm = async () => {
    let correct = 0
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    
    // ✅ Use ACTUAL number of questions fetched
    const totalQuestions = quizQuestions.length
    const percentage = Math.round((correct / totalQuestions) * 100)
    
    let calculatedLevel = ''
    const ranges = [
      { min: 0, max: Math.floor(totalQuestions * 0.10), level: 'A1 Beginner' },
      { min: Math.floor(totalQuestions * 0.10) + 1, max: Math.floor(totalQuestions * 0.30), level: 'A2 Pre-intermediate' },
      { min: Math.floor(totalQuestions * 0.30) + 1, max: Math.floor(totalQuestions * 0.53), level: 'B1 Intermediate' },
      { min: Math.floor(totalQuestions * 0.53) + 1, max: Math.floor(totalQuestions * 0.77), level: 'B2 Upper-Intermediate' },
      { min: Math.floor(totalQuestions * 0.77) + 1, max: Math.floor(totalQuestions * 0.90), level: 'C1 Advanced' },
      { min: Math.floor(totalQuestions * 0.90) + 1, max: totalQuestions, level: 'C2 Proficient' }
    ]
    
    for (const range of ranges) {
      if (correct >= range.min && correct <= range.max) {
        calculatedLevel = range.level
        break
      }
    }
    
    if (!calculatedLevel) calculatedLevel = 'A1 Beginner'
    
    setScore(percentage)
    setLevel(calculatedLevel)

    setStage('results')
  }

  // Show loading state while fetching quiz data
  if (loading) {
    return (
      <div className="min-h-screen md:min-h-[80vh] bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  // INSTRUCTIONS STAGE
  if (stage === 'instructions') {
    return (
      <TestIntro
        minutes={quizConfig?.timeLimitMinutes || 30}
        questionCount={quizQuestions.length}
        hasReading={quizQuestions.some((q) => q.passage)}
        onStart={handleStartQuiz}
      />
    )
  }

  // QUIZ STAGE
  if (stage === 'quiz') {
    return (
      <QuizStage
        questions={quizQuestions}
        index={currentQuestionIndex}
        answer={answers[currentQuestionIndex]}
        onAnswer={handleSelectAnswer}
        onNext={handleNext}
        timeLeft={timeLeft}
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        sectionProgress={sectionProgress}
      />
    )
  }

  // FORM STAGE
  if (stage === 'form') {
    return (
      <div className="p-10 bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-6">Your Information</h1>
          
          {/* Explanatory message */}
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground">
              📧 <strong>Optional:</strong> Fill out this form to receive your detailed test results via email. 
              You can also skip this step and view your results immediately.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="yearOfBirth">Year of Birth</Label>
                <Input
                  id="yearOfBirth"
                  type="number"
                  min="1900"
                  max="2024"
                  value={formData.yearOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearOfBirth: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Two buttons: Submit form OR Skip */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1 cursor-pointer"
                disabled={!formData.firstName || !formData.lastName || !formData.email}
              >
                📧 Send Results & View
              </Button>
              <Button 
                type="button"
                onClick={handleSkipForm}
                variant="outline" 
                size="lg" 
                className="flex-1 cursor-pointer"
              >
                Skip & View Results
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // RESULTS STAGE
  if (stage === 'results') {
    return (
      <div className="min-h-screen md:min-h-[80vh] bg-background p-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Results</h1>
          </div>

          {/* Two-column layout: Score (left 1/4) + Explanation (right 3/4) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Score circle (1 column on desktop, full-width on mobile) */}
            <div className="lg:col-span-1 bg-background border border-border rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Your Score</h2>
              <div
                className="relative w-40 h-40 rounded-full flex items-center justify-center "
                style={{
                  background: `conic-gradient(rgb(234, 179, 8) ${score * 3.6}deg, rgb(229, 231, 235) ${score * 3.6}deg)`
                }}
              >
                <div className="absolute inset-3 bg-background rounded-full flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-foreground">{score}%</div>
                  <div className="text-xs text-muted-foreground mt-1">{level}</div>
                </div>
              </div>
            </div>

            {/* Right: Score explanation (3 columns on desktop, full-width on mobile) */}
            <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Score Explained</h2>
              <p className="text-muted-foreground leading-relaxed">
                Based on your performance, you have been assessed at the <strong className="text-foreground">{level}</strong> level. 
                This means you have {score < 40 ? 'basic' : score < 60 ? 'intermediate' : 'advanced'} proficiency in English. 
                Continue practicing to improve your skills and reach the next level!
              </p>
            </div>
          </div>

          {/* Comparison table (full-width below) */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Score Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-foreground font-semibold">Level</th>
                    <th className="py-3 px-4 text-foreground font-semibold">Score Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">A1 Beginner</td>
                    <td className="py-3 px-4 text-muted-foreground">0-13%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">A2 Pre-intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">14-29%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B1 Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">30-46%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">B2 Upper-Intermediate</td>
                    <td className="py-3 px-4 text-muted-foreground">47-63%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">C1 Advanced</td>
                    <td className="py-3 px-4 text-muted-foreground">64-80%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">C2 Proficient</td>
                    <td className="py-3 px-4 text-muted-foreground">81-100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className={"cursor-pointer"} onClick={() => router.push('/tutelage-tests/free-practice-test')} variant="outline" size="lg">
              Back to Test Page
            </Button>
            <Button className={"cursor-pointer"} onClick={() => window.location.reload()} size="lg">
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

