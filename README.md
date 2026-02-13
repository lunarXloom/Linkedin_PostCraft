# PostCraft

> Voice-to-LinkedIn content engine. Speak your ideas, get formatted LinkedIn posts with AI-generated images in seconds.

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

**[🚀 Try Live Demo](https://postcraft.bolt.host)** | **[For Recruiters](#portfolio-analysis)** | **[Tech Stack](#tech-stack)** | **[Quick Start](#quick-start)**

**A [FutureCrafters](https://www.futurecrafters.ai) Project** • Built by [Irvin Cruz](https://irvincruz.com)

---

## TL;DR (30-Second Scan)

**What:** Voice-to-LinkedIn content engine. Speak or type your topic → get a formatted LinkedIn post with AI-generated image, brand voice applied, and publish-ready formatting.

**Why Different:** Voice transcription as primary input (fastest content creation method), brand voice personalization (company name, website, LinkedIn profile baked in), and webhook architecture (extensible, integrates with any backend).

**For Recruiters:** Demonstrates voice interface integration, webhook architecture, user settings management, localStorage persistence, and content workflow (generate → edit → publish → history).

**For Businesses:** Solo entrepreneurs and content creators can generate branded LinkedIn posts in seconds via voice—no typing, no design work, just speak and publish.

**Tech:** React 18 + TypeScript + Vite + Voice API + Webhook integration + LocalStorage + Content personalization.

---

## The Problem

**Content Creators:** Post consistently on LinkedIn = growth. But typing posts = friction. Voice is 3x faster than typing.

**Solo Entrepreneurs:** Need branded content (company name, website, voice) but no design team. Generic AI tools ignore branding.

**Busy Professionals:** Have ideas while driving, walking, working out. Can't type. Voice memos become wasted ideas.

**Current "Solutions" Fail:**
- ❌ **ChatGPT** = Type everything, no voice input, no branding, manual image creation
- ❌ **LinkedIn native** = No AI assist, manual formatting, no brand voice presets
- ❌ **Voice notes apps** = Capture ideas but don't format for LinkedIn or generate images

**The gap:** No tool that takes voice input, applies brand voice, formats for LinkedIn, and generates matching images—all in one workflow.

---

## The Solution

### Voice-First Content Creation

**Input Methods:**
1. **Voice transcription** (primary) — Speak your topic naturally
2. **Text input** (fallback) — Type if needed

**Why voice matters:**
- 3x faster than typing
- Capture ideas anywhere (driving, walking, gym)
- More natural expression (speak how you think)

### Brand Voice Personalization

**Settings Configuration:**
- Company name
- Website URL
- LinkedIn profile
- Brand voice description
- Content tone (professional/casual/technical)
- Target audience
- Industry

**Applied to every post:**
- Company mentions automatically formatted
- Brand voice consistent across posts
- Hashtags relevant to industry
- Call-to-action includes website/profile

### Complete Content Workflow

```
Voice/Text Input
  ↓
Webhook (Your Backend)
  ↓
AI Generation:
  - Post content (formatted for LinkedIn)
  - Image generation (matching topic)
  - Brand voice applied
  ↓
PostCraft UI:
  - Preview post + image
  - Edit if needed
  - Publish or save
  ↓
Post History (LocalStorage)
```

### Webhook Architecture

**Why webhook:**
- Flexible backend (use any AI provider)
- Your API keys, your control
- Extensible (add analytics, CRM, scheduling)
- Not locked into one AI service

**Request Format:**
```json
{
  "topic": "AI in marketing",
  "user_name": "Irvin Cruz",
  "content_preferences": {
    "tone": "professional",
    "length": "medium",
    "include_hashtags": true,
    "industry": "AI + Marketing"
  },
  "branding_settings": {
    "company_name": "FutureCrafters",
    "website": "futurecrafters.ai",
    "brand_voice": "Direct, technical, no fluff"
  }
}
```

**Response Format:**
```json
{
  "post_content": "Formatted LinkedIn post...",
  "image_url": "https://..."
}
```

---

## Portfolio Analysis

> **For Recruiters & Hiring Managers**

### What This Project Demonstrates

#### 1. Voice Interface Integration

**Not just text input:**
- Voice API integration (browser native or custom)
- Transcription handling
- Fallback to text (progressive enhancement)
- User experience optimization (voice = primary, text = backup)

**Why this matters:** Voice interfaces are the future. Shows ability to design for multiple input modalities, not just keyboard/mouse.

#### 2. Webhook Architecture

**Extensible System Design:**
- Frontend doesn't call AI directly (decoupled)
- Webhook backend can be anything (Node.js, Python, serverless)
- Easy to swap AI providers (backend change, frontend unchanged)
- Integration-ready (add CRM, analytics, scheduling)

**Why this matters:** Production systems need flexibility. This shows architectural thinking beyond monolithic apps.

#### 3. User Settings Management

**Complex State Management:**
- Brand settings (company, website, LinkedIn)
- Content preferences (tone, length, hashtags)
- Webhook configuration
- LocalStorage persistence (settings survive refresh)

**Why this matters:** Real apps have complex user settings. This shows ability to manage state, validate inputs, and persist data.

#### 4. Content Workflow Design

**Complete User Journey:**
- Generate (voice → AI → formatted post + image)
- Edit (post editor with preview)
- Publish (webhook to LinkedIn or manual copy)
- History (past posts with re-use capability)

**Why this matters:** Product thinking. Not just "build a form"—designed complete workflow for real use case.

#### 5. Progressive Enhancement

**Graceful Degradation:**
- Voice works? Great (primary path)
- Voice unavailable? Text input works (fallback)
- Webhook down? Clear error message (not silent failure)
- Settings missing? Prompts user to configure (onboarding)

**Why this matters:** Production apps must handle edge cases. This shows maturity beyond happy-path coding.

### For AI Strategy Manager / Product Roles

**Most candidates show ONE:**
- Frontend work (but no backend thinking)
- AI integration (but no voice interface)
- Feature building (but no workflow design)

**This project shows ALL:**
- ✅ Voice interface integration (forward-thinking input modality)
- ✅ Webhook architecture (extensible, decoupled design)
- ✅ User settings management (complex state + persistence)
- ✅ Content workflow (generate → edit → publish → history)
- ✅ Brand personalization (company voice baked into content)

**That's the product thinking + technical execution AI Strategy Manager roles require.**

### Interview Talking Points

**2-Minute Story:**

> "I built PostCraft to solve a content creation friction point: typing LinkedIn posts is slow. Voice is 3x faster. But existing tools don't support voice input for LinkedIn content creation.
>
> PostCraft is voice-first. Speak your topic, the app transcribes it, sends to a webhook backend (your choice—could be OpenAI, Claude, custom AI), generates a formatted LinkedIn post with matching image, and applies your brand voice.
>
> Brand voice is key—most AI tools ignore branding. This one takes your company name, website, LinkedIn profile, and brand voice description, then bakes it into every post. Consistent branding without manual editing.
>
> Architecturally, it's webhook-based. The frontend doesn't call AI directly—sends to your backend webhook. That makes it extensible: swap AI providers, add analytics, integrate CRM, schedule posts—all without changing the frontend.
>
> For AI Strategy Manager roles, this shows product thinking: voice interface, webhook architecture, brand personalization, complete content workflow. Not just 'build a form'—designed for real use case."

**Key Stats:**
- Voice-first input (3x faster than typing)
- Webhook architecture (backend-agnostic)
- Brand voice personalization (company + voice baked in)
- Complete workflow (generate → edit → publish → history)
- TypeScript + React 18

**Technical Highlights:**
- **Voice API integration** — Browser native or custom transcription
- **Webhook decoupling** — Frontend agnostic to backend AI provider
- **LocalStorage persistence** — Settings + history survive refresh
- **Content workflow** — Full journey from idea to published post

---

## Features

### Core Capabilities
- ✅ **Voice input** — Speak your topic naturally (primary method)
- ✅ **AI post generation** — Formatted LinkedIn content + image
- ✅ **Brand personalization** — Company, website, LinkedIn, voice applied
- ✅ **Post history** — Save all generated posts, re-use anytime
- ✅ **Edit before publish** — Preview and tweak AI output

### Content Preferences
- ✅ **Tone control** — Professional, casual, technical
- ✅ **Length control** — Short, medium, long
- ✅ **Hashtag inclusion** — Auto-generate relevant hashtags
- ✅ **Call-to-action** — Website/profile link insertion
- ✅ **Industry targeting** — Content relevant to your field

### Technical Features
- ✅ **Webhook architecture** — Your backend, your AI provider
- ✅ **LocalStorage persistence** — Settings + history saved locally
- ✅ **TypeScript** — 100% type coverage
- ✅ **Responsive UI** — Mobile-friendly, dark theme
- ✅ **Error handling** — Clear error messages, graceful degradation

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** — Type-safe component architecture
- **Vite** — Lightning-fast dev/build pipeline
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icon library

### Voice & Transcription
- **Browser Voice API** — Native speech recognition
- **Fallback to text** — Works without voice support

### Data Layer
- **LocalStorage** — Settings + post history persistence
- **Custom hooks** — `useLocalStorage` for reactive persistence
- **Type-safe state** — Zod-like validation (TypeScript types)

### Integration
- **Webhook architecture** — POST to your backend
- **JSON API** — Standard request/response format
- **Extensible** — Add any backend (Node.js, Python, serverless)

### Code Quality
- **TypeScript strict mode** — 100% type coverage
- **ESLint** — Code style enforcement
- **Component architecture** — Modular, reusable
- **Custom hooks** — Logic reuse (`useLocalStorage`)

---

## How It Works

### Architecture Flow

```
User speaks topic (Voice API)
  ↓
Transcribe to text
  ↓
Load user settings (LocalStorage)
  ↓
Build request JSON:
  - Topic
  - Content preferences (tone, length, hashtags)
  - Branding settings (company, website, voice)
  ↓
POST to webhook (Your Backend)
  ↓
Backend generates:
  - LinkedIn-formatted post (with brand voice)
  - AI-generated image (matching topic)
  ↓
Return JSON:
  - post_content (string)
  - image_url (string)
  ↓
PostCraft displays:
  - Preview post + image
  - Edit controls
  - Publish button
  ↓
Save to Post History (LocalStorage)
```

### Webhook Integration

**Your backend receives:**
```typescript
interface WebhookRequest {
  topic: string;
  user_name: string;
  content_preferences: {
    tone: 'professional' | 'casual' | 'technical';
    length: 'short' | 'medium' | 'long';
    include_hashtags: boolean;
    industry: string;
    target_audience: string;
  };
  branding_settings: {
    company_name: string;
    website: string;
    linkedin_profile: string;
    brand_voice: string;
  };
}
```

**Your backend returns:**
```typescript
interface WebhookResponse {
  post_content: string;  // Formatted LinkedIn post
  image_url: string;     // URL to AI-generated image
}
```

**Example backend (pseudo-code):**
```javascript
app.post('/generate-post', async (req) => {
  const { topic, branding_settings, content_preferences } = req.body;
  
  // Call your AI provider (OpenAI, Claude, etc.)
  const post = await openai.chat.completions.create({
    messages: [{
      role: 'system',
      content: `You write LinkedIn posts for ${branding_settings.company_name}. Brand voice: ${branding_settings.brand_voice}. Tone: ${content_preferences.tone}.`
    }, {
      role: 'user',
      content: `Write a LinkedIn post about: ${topic}`
    }]
  });
  
  // Generate matching image
  const image = await openai.images.generate({
    prompt: `Professional LinkedIn post image: ${topic}`,
    size: '1024x1024'
  });
  
  return {
    post_content: post.choices[0].message.content,
    image_url: image.data[0].url
  };
});
```

---

## Why This Architecture?

### Voice-First Over Text-Only

**Decision:** Voice as primary input, text as fallback

**Why:**
- ✅ 3x faster content creation (voice vs typing)
- ✅ Capture ideas anywhere (driving, walking, gym)
- ✅ More natural expression (speak how you think)
- ✅ Accessibility (typing can be barrier for some users)

**Tradeoff:** Not all browsers support voice API. That's why text input is still available (progressive enhancement).

### Webhook Over Direct AI Integration

**Decision:** Webhook to backend, not direct OpenAI calls from frontend

**Why:**
- ✅ API keys not exposed in frontend (security)
- ✅ Backend-agnostic (swap AI providers without frontend changes)
- ✅ Extensible (add analytics, CRM, scheduling in backend)
- ✅ Cost control (backend can implement rate limiting, caching)

**Tradeoff:** Requires backend setup. Worth it for flexibility + security.

### LocalStorage Over Database

**Decision:** LocalStorage for settings + history (no server-side DB)

**Why:**
- ✅ Fast (instant reads/writes)
- ✅ Private (data stays on user's device)
- ✅ Simple deployment (no database server needed)
- ✅ Offline-capable (works without internet)

**Tradeoff:** Data not synced across devices. For MVP, acceptable. Can add cloud sync later.

---

## Quick Start

### Prerequisites
- Node.js 18+
- Backend webhook that returns `{ post_content, image_url }`

### Installation

```bash
# Clone repository
git clone https://github.com/IrvinCruzAI/Linkedin_PostCraft.git
cd Linkedin_PostCraft

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### First-Time Setup

1. **Configure your name** (appears in generated posts)
2. **Add webhook URL** (your backend endpoint)
   - Example: `https://your-backend.com/generate-post`
3. **Set branding** (optional but recommended)
   - Company name
   - Website
   - LinkedIn profile
   - Brand voice description
4. **Speak or type topic** → Generate post

**[Try Live Demo →](https://postcraft.bolt.host)**

---

## Use Cases

### Solo Entrepreneurs
- **Problem:** Need consistent LinkedIn presence but typing posts = slow
- **Solution:** Speak ideas during commute/gym, instant formatted posts
- **Result:** 3x faster content creation, consistent brand voice

### Content Creators
- **Problem:** Ideas come anytime, typing on phone = friction
- **Solution:** Voice capture anywhere, posts generated when ready
- **Result:** Never lose ideas, publish more consistently

### Busy Professionals
- **Problem:** Know LinkedIn helps growth, but finding time to write = hard
- **Solution:** 30 seconds to speak topic = post ready
- **Result:** Maintain presence without time commitment

---

## About FutureCrafters

PostCraft is part of FutureCrafters' portfolio of AI productivity tools.

**More Projects:**
- [NewsGen AI](https://github.com/IrvinCruzAI/AI_News_Generator) — 10-second article generation from headlines
- [Marketing Dashboard](https://github.com/IrvinCruzAI/Marketing_Dashboard) — 6 AI marketing generators with business context engine
- [WebinarStudio](https://github.com/IrvinCruzAI/WebinarStudio) — Enterprise webinar content pipeline (115 TypeScript files)
- Mission Control — Real-time business intelligence dashboard
- Rory — AI content engine with custom voice modeling

**Services:**
- AI Exploration Session ($500)
- Paid Diagnostic ($1,500)
- Control Layer Sprint ($5,000)
- FutureCrafters Labs ($2K-6K/mo)

### Get In Touch

**Portfolio/Hiring:**
- LinkedIn: [linkedin.com/in/irvincruzrodriguez](https://linkedin.com/in/irvincruzrodriguez)
- Website: [irvincruz.com](https://irvincruz.com)
- Email: irvin@futurecrafters.ai

**Product/Business:**
- 📞 [Book consultation](https://calendar.app.google/5of8AAhCW2FVV2Eg7)
- 📧 hello@futurecrafters.ai
- 🌐 [futurecrafters.ai](https://futurecrafters.ai)

---

## Project Stats

| Metric | Value |
|--------|-------|
| Input methods | Voice + Text |
| Architecture | Webhook (backend-agnostic) |
| Workflow steps | 4 (generate → edit → publish → history) |
| TypeScript files | 10 |
| Type coverage | 100% |

---

**For recruiters:** Demonstrates voice interface integration, webhook architecture, and complete content workflow design—forward-thinking product execution.

---

*A FutureCrafters Project • Built by [Irvin Cruz](https://irvincruz.com) ☀️*  
*Last Updated: February 2026*
