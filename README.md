<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<h1 align="center">🌿 Suicide Help Line Web App</h1>

<p align="center">
  <strong>A compassionate digital companion providing emotional support and crisis intervention resources</strong>
</p>

<p align="center">
  <em>"You Are Not Alone" — A gentle space to breathe, feel heard, and find comfort in moments when you need it most.</em>
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Use Cases](#-use-cases)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#-architecture)
- [Difficulties Faced](#-difficulties-faced)
- [Real-World Impact](#-real-world-impact)
- [AI Ethics & Safety Considerations](#-ai-ethics--safety-considerations)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [Resources](#-resources)
- [License](#-license)

---

## 🌟 Overview

The **Suicide Help Line Web App** is a mental health support platform designed to provide immediate emotional assistance to individuals experiencing suicidal thoughts, depression, anxiety, or emotional distress. Built with empathy at its core, this application serves as a bridge between crisis moments and professional help.

This is **NOT** a replacement for professional mental health services but rather a supplementary tool that offers:
- 24/7 accessible emotional support chat
- Immediate access to crisis helplines
- Calming UI/UX designed to reduce anxiety
- Voice input for accessibility
- Inspirational content for emotional upliftment

---

## 💡 Use Cases

### Primary Use Cases

| Use Case | Description | Target User |
|----------|-------------|-------------|
| **Crisis Intervention** | Immediate emotional support during mental health crises | Individuals in distress |
| **Helpline Discovery** | Quick access to emergency mental health helplines (India, USA, UK, International) | Anyone seeking professional help |
| **Emotional Venting** | Safe, non-judgmental space to express feelings | People needing to talk |
| **Breathing & Calming** | Guided breathing exercises with calming visuals | Anxiety/panic sufferers |
| **Accessibility Support** | Voice-to-text input for those unable to type | Users with disabilities or in distress |

### Secondary Use Cases

- **Mental Health Awareness**: Educating users about available resources
- **Daily Inspiration**: Rotating inspirational quotes to encourage hope
- **Emergency Contact Management**: Storing trusted emergency contacts for crisis situations
- **Session Continuity**: Maintaining chat sessions for ongoing conversations

---

## 🛠 Tech Stack

### Frontend Framework & Language
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI component library for building interactive interfaces |
| **TypeScript** | 5.8.3 | Type-safe JavaScript for robust development |
| **Vite** | 5.4.19 | Next-generation frontend build tool |

### Styling & UI Components
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework for rapid styling |
| **shadcn/ui** | Beautifully designed, accessible component library |
| **Radix UI** | Unstyled, accessible UI primitives |
| **Lucide React** | Beautiful, consistent icon library |

### State Management & Data Fetching
| Technology | Purpose |
|------------|---------|
| **TanStack Query (React Query)** | Powerful data fetching and caching |
| **React Hook Form** | Performant form handling with validation |
| **Zod** | TypeScript-first schema validation |

### Additional Libraries
| Library | Purpose |
|---------|---------|
| **React Router DOM** | Client-side routing |
| **Sonner** | Beautiful toast notifications |
| **date-fns** | Modern date utility library |
| **Recharts** | Chart library for data visualization |
| **next-themes** | Theme management (dark/light mode support) |

### Development & Testing
| Tool | Purpose |
|------|---------|
| **Vitest** | Fast unit testing framework |
| **Testing Library** | Testing utilities for React components |
| **ESLint** | Code quality and style enforcement |

### Backend Integration
- **Webhook API**: n8n workflow integration for AI-powered chat responses
- **Session Management**: UUID-based session tracking for conversation continuity

---

## ✨ Features

### 🎯 Core Features

#### 1. AI-Powered Chat Support
- Real-time conversational interface
- Empathetic, non-judgmental responses
- Session-based conversation continuity
- Typing indicators for natural interaction

#### 2. Voice Input Accessibility
- Web Speech API integration
- Speech-to-text conversion
- Support for users unable to type during distress

#### 3. Emergency Helpline Directory
- **India**: iCall (9152987821), Vandrevala Foundation (1860-2662-345)
- **USA**: 988 Suicide & Crisis Lifeline, Crisis Text Line (741741)
- **UK**: Samaritans (116 123)
- **International**: IASP Crisis Centre Directory

#### 4. Calming Visual Experience
- **Breathing Circle Animation**: Guided breathing exercise visual
- **Gradient Backgrounds**: Soft, calming color palette
- **Inspirational Quotes**: Rotating messages of hope and encouragement

#### 5. Secure Registration Flow
- Multi-step registration (Info → Password → OTP)
- Emergency contact collection
- Privacy-first design (no conversation storage)

### 🎨 UI/UX Features
- Warm, calming color palette (sage, peach, cream)
- Glassmorphism design elements
- Smooth animations and micro-interactions
- Fully responsive design
- Accessibility-compliant components

---

## 🏗 Architecture

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (49 components)
│   ├── ChatInterface.tsx      # Main chat functionality
│   ├── ChatMessage.tsx        # Individual message display
│   ├── BreathingCircle.tsx    # Calming animation component
│   ├── EmergencyBanner.tsx    # Helpline display
│   ├── QuoteDisplay.tsx       # Inspirational quotes
│   ├── RegistrationForm.tsx   # Multi-step user registration
│   ├── VoiceInput.tsx         # Speech-to-text functionality
│   └── TypingIndicator.tsx    # Bot typing animation
├── data/
│   ├── helplines.ts           # Emergency contact database
│   └── quotes.ts              # Inspirational quotes collection
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
├── pages/
│   ├── Index.tsx              # Main landing/chat page
│   └── NotFound.tsx           # 404 error page
└── App.tsx                    # Root application component
```

---

## 😰 Difficulties Faced

### 1. **Balancing AI Responses with Human Sensitivity**
> **Challenge**: Ensuring AI responses are empathetic without being clinically cold or inappropriately cheerful.
> 
> **Solution**: Implemented carefully crafted response templates and integrated with specialized mental health AI models. Added fallback messages that prioritize human connection over automated responses.

### 2. **Handling Network Failures Gracefully**
> **Challenge**: Network issues during crisis moments could leave users feeling abandoned.
> 
> **Solution**: Implemented robust error handling with compassionate fallback messages: *"I'm having trouble connecting right now, but I'm still here for you."*

### 3. **Voice Input Cross-Browser Compatibility**
> **Challenge**: Web Speech API has inconsistent support across browsers.
> 
> **Solution**: Added feature detection and graceful degradation—hiding the voice button on unsupported browsers rather than showing an error.

### 4. **Privacy vs. Emergency Response Tension**
> **Challenge**: Balancing user privacy (no chat storage) with the need to escalate genuine emergencies.
> 
> **Solution**: Designed the system to collect emergency contacts upfront for crisis escalation while not storing conversation content.

### 5. **Creating a Calming UX During Anxiety**
> **Challenge**: Typical web interfaces can feel overwhelming during mental health crises.
> 
> **Solution**: Implemented gradual animations, soft color transitions, and the breathing circle feature that mimics therapeutic breathing exercises.

### 6. **Session Management Without User Accounts**
> **Challenge**: Maintaining conversation context without traditional authentication.
> 
> **Solution**: UUID-based session management that persists conversations within a session without storing personal identifiable information.

---

## 🌍 Real-World Impact

### Mental Health Statistics
- **Globally**: Over 700,000 people die by suicide every year (WHO)
- **India**: 164,033 suicides were reported in 2021 (NCRB)
- **USA**: Suicide is the 11th leading cause of death (CDC)

### How This App Helps

#### ✅ Immediate Accessibility
- Available 24/7, unlike traditional helplines that may have wait times
- No phone call anxiety—many prefer text-based communication
- Voice input for those struggling to type during distress

#### ✅ Bridging the Gap
- Serves as a first point of contact before professional intervention
- Reduces stigma by providing anonymous support
- Connects users directly to verified helplines

#### ✅ Therapeutic Design
- Breathing exercises scientifically proven to reduce anxiety
- Inspirational content that reinforces positive messaging
- Warm, human-centric interface that feels welcoming

#### ✅ Accessibility First
- Works on any device with internet access
- Low bandwidth friendly design
- Voice input for accessibility needs

### Potential Deployment Scenarios
- **Educational Institutions**: Student mental health support
- **Corporate Wellness**: Employee assistance programs
- **Healthcare Integration**: Hospital and clinic waiting rooms
- **NGO Deployment**: Non-profit mental health organizations

---

## ⚖️ AI Ethics & Safety Considerations

### 🔒 Privacy & Data Protection

| Principle | Implementation |
|-----------|----------------|
| **No Conversation Storage** | Chats are not stored or logged on servers |
| **Session-Based Identity** | UUID sessions, no personal accounts required |
| **Minimal Data Collection** | Only essential info (name, emergency contact) |
| **Transparent Communication** | Users are informed about data handling |

### 🛡️ Safety Measures

#### Critical Disclaimers
- **NOT a replacement for professional help**: Prominently displayed warnings
- **Not clinically trained**: Clear communication that this is emotional support, not therapy
- **Emergency escalation**: Direct links to certified helplines

#### AI Response Guidelines
```
✅ DO:
- Express empathy and validation
- Encourage professional help-seeking
- Provide crisis helpline information
- Maintain non-judgmental tone

❌ DON'T:
- Provide medical/clinical advice
- Make promises about outcomes
- Judge or dismiss feelings
- Encourage harmful behaviors
```

### 🤖 AI Transparency

1. **Human Oversight**: AI responses are templated and reviewed
2. **Fallback Mechanisms**: Human crisis intervention is always recommended
3. **No Autonomous Decisions**: AI doesn't make health decisions for users
4. **Bias Mitigation**: Responses are designed to be culturally sensitive

### ⚠️ Ethical Concerns & Mitigation

| Concern | Risk | Mitigation |
|---------|------|------------|
| **Over-reliance on AI** | Users may avoid professional help | Constant reminders to seek professional care |
| **Misinterpretation** | AI may misread crisis severity | Emergency helplines always visible |
| **Data Breach** | Sensitive conversations exposed | No conversation storage policy |
| **False Comfort** | AI may mask severity of issues | Clear disclaimers about AI limitations |
| **Accessibility Bias** | Excluding non-tech users | Voice input, simple interface |

### 📋 Compliance Considerations
- Should align with **HIPAA** (USA) for health data
- Consider **GDPR** (EU) for data protection
- Follow **Mental Healthcare Act** (India) guidelines
- Adhere to **WHO** recommendations for digital mental health tools

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to project directory
cd Suicide-Help-Line-Web-App

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! This is a sensitive project, so please:

1. **Be Mindful**: Consider the mental health implications of changes
2. **Test Thoroughly**: Ensure no regressions in critical features
3. **Follow Guidelines**: Adhere to established AI ethics principles
4. **Document Changes**: Clearly explain the purpose of modifications

### Contribution Areas
- [ ] Multi-language support
- [ ] Additional regional helplines
- [ ] Improved AI response templates
- [ ] Accessibility enhancements
- [ ] Performance optimizations

---

## 📚 Resources

### For Users in Crisis
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)
- **WHO Mental Health**: [https://www.who.int/health-topics/mental-health](https://www.who.int/health-topics/mental-health)

### For Developers
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>💚 Remember: It's okay to not be okay. Reaching out is a sign of strength.</strong>
</p>

<p align="center">
  <em>Built with ❤️ for those who need it most</em>
</p>

<p align="center">
  <sub>If you or someone you know is struggling, please reach out to a crisis helpline. You matter.</sub>
</p>
