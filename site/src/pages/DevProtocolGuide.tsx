import { useState, useEffect } from 'react'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import styles from './DevProtocolGuide.module.css'

// ─── Helpers ──────────────────────────────────────────────────────────────────

type CalloutType = 'problem' | 'insight' | 'savings' | 'source' | 'rule'

function Callout({ type, label, children }: { type: CalloutType; label: string; children: React.ReactNode }) {
  return (
    <div className={`${styles.callout} ${styles['callout_' + type]}`}>
      <div className={styles.calloutLabel}>{label}</div>
      {children}
    </div>
  )
}

function CodeBlock({ filename, children }: { filename?: string; children: React.ReactNode }) {
  return (
    <div className={styles.codeBlock}>
      {filename && <span className={styles.filename}>{filename}</span>}
      <pre>{children}</pre>
    </div>
  )
}

type TreeIcon = 'folder' | 'root' | 'routing' | 'living' | 'research' | 'template'
type TreeBadge = 'always' | 'routing' | 'living' | 'research' | 'template'

function TreeRow({
  indent,
  icon,
  name,
  badge,
  badgeLabel,
  desc,
  isFolder,
}: {
  indent: string
  icon: TreeIcon
  name: string
  badge?: TreeBadge
  badgeLabel?: string
  desc?: string
  isFolder?: boolean
}) {
  const iconChar = icon === 'folder' ? '\u{1F4C1}' : '●'
  return (
    <div className={styles.treeRow}>
      <div className={styles.treeIndent}>{indent}</div>
      <div className={styles.treeNode}>
        <div className={`${styles.treeIcon} ${styles['treeIcon_' + icon]}`}>{iconChar}</div>
        <span className={`${styles.treeName} ${isFolder ? styles.treeNameFolder : ''}`}>{name}</span>
        {badge && <span className={`${styles.treeBadge} ${styles['treeBadge_' + badge]}`}>{badgeLabel}</span>}
        {desc && <span className={styles.treeDesc}>{desc}</span>}
      </div>
    </div>
  )
}

// ─── Side nav ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'glossary', label: 'Terms' },
  { id: 'the-problem', label: 'The Problem' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'overview', label: 'Overview' },
  { id: 'claude-md', label: 'CLAUDE.md' },
  { id: 'readme', label: 'README' },
  { id: 'living-docs', label: 'Living Docs' },
  { id: 'research-pipeline', label: 'Research' },
  { id: 'update-checklist', label: 'The Ritual' },
  { id: 'getting-started', label: 'Get Started' },
]

function SideNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className={styles.sideNav}>
      {NAV_SECTIONS.map(s => (
        <button
          key={s.id}
          className={`${styles.navLink} ${active === s.id ? styles.navLinkActive : ''}`}
          onClick={() => scrollTo(s.id)}
        >
          <span className={styles.navDot} />
          <span className={styles.navLabel}>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function DevProtocolGuide() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map(s => document.getElementById(s.id))
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35
      let activeId = NAV_SECTIONS[0].id
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i]
        if (el && el.offsetTop <= scrollY) {
          activeId = NAV_SECTIONS[i].id
          break
        }
      }
      setActive(activeId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      <SideNav active={active} />
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header} id="top">
          <span className={styles.tag}>Developer Guide</span>
          <h1 className={styles.title}>The Lynch Protocol</h1>
          <p className={styles.subtitle}>
            A documentation-first development framework for building software with Claude Code. Because sessions end, context gets compressed, and the only thing that survives is what you wrote down.
          </p>
        </header>

        {/* Author note */}
        <div className={styles.authorNote}>
          <div className={styles.authorLabel}>A note from the author</div>
          <p>
            This guide builds on top of the contents of "
            <a href="https://buenalynch.com/cowork-guide" className={styles.authorLink}>Give Claude a Memory</a>
            ", so if you haven't read that I suggest you do so first.
          </p>
          <p>If you are a developer struggling to keep a codebase clean and consistent, if your AI keeps going back to the same mistakes every couple hours, if random packages get installed to address problems already solved, if the project folders are inconsistent, if the design system is often overlooked, this guide is for you.</p>
          <p>I've been developing with AI heavily over the past year, and I've faced all of the problems above. This guide explains the way I've set up my projects structure and documentation approach, in such a way that it prevents those problems pretty much always.</p>
          <p>It's simple enough that you can understand it through this 10 minute read. Not rocket science of course. I'm no AI Expert, I just like frameworks and efficiency, and specially I HATE FIGHTING the AI agents.</p>
          <p className={styles.authorDisclaimer}>Disclaimer: AI wrote this guide. Still, the content, data, research, narrative direction, writing style, charts and recommendations have been curated and written by me.</p>
          <p>So in a nutshell: Giving Claude a Memory helps with persistent memory and token usage. This guide builds on that to ensure consistency and remembrance of stack and architecture.</p>
          <p className={styles.authorMuted}>PS: Yes I know about skills. I have created a skill that interviews you, sets this documentation and scaffolds all the codebase, giving you a ready to dev project folder. I'll upload that skill in a future post.</p>
          <p className={styles.authorSig}>— Ricardo Vidal Lynch</p>
        </div>

        {/* Glossary */}
        <div className={styles.glossary} id="glossary">
          <h2>Terminology</h2>
          <dl>
            <dt>Protocol</dt>
            <dd>The full set of template files and conventions that structure how a project is documented, built, and maintained with Claude Code. Not a single file; it's a system.</dd>

            <dt>Scaffold</dt>
            <dd>The starter code and filled-in docs produced when you begin a new project. Includes a working code setup, backend, frontend, and all doc templates with your project details already filled in.</dd>

            <dt>Pipeline</dt>
            <dd>The 3-stage process for integrating new packages: Research the options, write an Analysis doc with your recommendation, then create a Deployment doc when you integrate it. Every third-party library must go through this.</dd>

            <dt>Analysis doc</dt>
            <dd>A 15-section document evaluating a package for integration. Covers compatibility, pros/cons, alternatives, effort estimate, and a clear YES/NO/CONDITIONAL recommendation. Named <code>{'{package}-analysis.md'}</code>.</dd>

            <dt>Deployment doc</dt>
            <dd>Setup instructions, configuration notes, and troubleshooting for an integrated feature. Written during or after integration. Named <code>{'{feature}-deployment.md'}</code>.</dd>
          </dl>
        </div>

        {/* SECTION 1: The Problem */}
        <section id="the-problem">
          <h2>Why Documentation Dies</h2>
          <p>You're four hours into a session. You've explained the architecture, walked Claude through the database schema, described the auth flow, pointed out three edge cases. Then the context window fills up. Claude compacts the conversation into a summary, and half the nuance disappears.</p>
          <p>Next session? Blank slate. Claude doesn't know your project exists. You re-explain everything. Again.</p>
          <p>Most developers deal with this by relying on conversational context. They treat each session like a continuation of the last one, even though it isn't. When things go wrong, they blame Claude for "forgetting." But Claude didn't forget. It never knew in the first place. That information lived in a compressed summary or a closed session, not in a file.</p>
          <Callout type="problem" label="The root cause">
            <p>Claude Code sessions are stateless. Context gets compressed. Sessions end. The <strong>only thing that persists between sessions is your file system.</strong> If critical knowledge isn't written down in a file, it's gone.</p>
          </Callout>
          <p>There's a second problem that compounds the first. When you do write things down, they rot. A TODO file from two weeks ago that nobody updated. A README that describes the project as it was three features ago. Architecture notes that reference endpoints that no longer exist. Documentation that isn't maintained is worse than no documentation, because it's actively misleading.</p>
          <p>The protocol exists to solve both problems. It gives you a place to write things down (templates with defined structure), and a ritual for keeping them current (the doc update checklist after every feature).</p>
        </section>

        {/* SECTION 9: Philosophy */}
        <section id="philosophy">
          <h2>The Philosophy</h2>
          <p>One principle underneath all of this: <strong>write it down or it doesn't exist.</strong></p>
          <p>Every dev team says they value documentation. The difference here is that Claude can't function without the files. It's not a best practice you aspire to follow. The docs are the actual interface between you and Claude. No docs, no context, no useful output.</p>
          <p>The README template puts it directly:</p>
          <Callout type="source" label="From the README">
            <p><em>"All documentation starts on this README and lives in .md files for robustness. Your memory WILL fail, and AI WILL compress and forget certain stuff. That is why every step from research, architecture, structure, installation, development and deployment must absolutely live in the DOCS."</em></p>
          </Callout>
          <p>And:</p>
          <Callout type="source" label="The mantra">
            <p><em>"Every piece of code created must conform to the documentation and libraries we are using. Creating code without first looking at the libraries doc pages on their repos is super risky, and leads to spaghettification of code. Unacceptable and totally avoidable. Always read the docs!"</em></p>
          </Callout>
          <p>Something the protocol doesn't say outright, but you notice after a couple projects: the docs aren't just for Claude. They're for you. Six months of checkboxes in PROGRESS.md is a complete build history. Twelve analysis docs in RESEARCH.md is a record of every technical decision and why you made it. TODO.md is a backlog that doesn't need Jira.</p>
          <p>When you return to a project after a month away, you don't need Claude to tell you what happened. You can read the docs yourself. That's the real payoff.</p>
        </section>

        {/* SECTION 2: Overview */}
        <section id="overview">
          <h2>The Protocol at a Glance</h2>
          <p>The Lynch Protocol is a set of markdown file templates arranged in a specific folder structure. When you start a new project, you fill in the templates with your project's details. Claude reads them at the start of every session and knows what's going on.</p>
          <p>It's not a framework you install or a tool you configure. It's a documentation system. The templates define what information should exist, where it lives, and how it stays current. Claude enforces the system because the system is written in files that Claude reads.</p>
          <p>The core idea: <strong>if Claude can't read it from a file, it doesn't know it.</strong> Every piece of project knowledge has a defined home in a markdown file. Every session starts by reading those files.</p>
          <p>Here's the full file structure. Every file has a defined role. Nothing is optional filler.</p>

          <div className={styles.fileTree}>
            <div className={styles.treeTitle}>The Protocol — Project Structure</div>
            <div className={styles.treeLegend}>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendDot_always}`} /> Auto-loaded (CLAUDE.md)</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendDot_routing}`} /> Project map</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendDot_living}`} /> Living docs (updated per feature)</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendDot_research}`} /> Research pipeline</div>
              <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendDot_template}`} /> Templates (don't edit directly)</div>
            </div>

            <TreeRow indent="" icon="folder" name="your-project/" isFolder />
            <TreeRow indent="├─ " icon="root" name="CLAUDE.md" badge="always" badgeLabel="Entry point" desc="Reading order, rules, post-feature checklist" />
            <TreeRow indent="├─ " icon="routing" name="README.md" badge="routing" badgeLabel="Project map" desc="Tech stack, structure, architecture, doc links" />
            <TreeRow indent="├─ " icon="folder" name="docs/" isFolder />
            <TreeRow indent="│  ├─ " icon="living" name="PROGRESS.md" badge="living" badgeLabel="Living doc" desc="Phased build plan with checkboxes" />
            <TreeRow indent="│  ├─ " icon="living" name="TODO.md" badge="living" badgeLabel="Living doc" desc="All open tasks and known issues" />
            <TreeRow indent="│  ├─ " icon="living" name="STYLEGUIDE.md" badge="living" badgeLabel="Living doc" desc="Colors, typography, component patterns" />
            <TreeRow indent="│  ├─ " icon="living" name="API.md" badge="living" badgeLabel="Living doc" desc="Complete endpoint reference" />
            <TreeRow indent="│  └─ " icon="folder" name="research/" isFolder />
            <TreeRow indent="│     ├─ " icon="research" name="RESEARCH.md" badge="research" badgeLabel="Index" desc="Pipeline overview + links to all docs" />
            <TreeRow indent="│     ├─ " icon="template" name="HOW_TO_RESEARCH_PACKAGES.md" badge="template" badgeLabel="Guide" desc="Step-by-step research process" />
            <TreeRow indent="│     ├─ " icon="template" name="RESEARCH_TEMPLATE.md" badge="template" badgeLabel="Template" desc="15-section analysis doc template" />
            <TreeRow indent="│     ├─ " icon="research" name="{package}-analysis.md" badge="research" badgeLabel="Output" desc="Completed analysis docs (one per package)" />
            <TreeRow indent="│     └─ " icon="research" name="{feature}-deployment.md" badge="research" badgeLabel="Output" desc="Deployment docs (one per integrated feature)" />
            <TreeRow indent="├─ " icon="folder" name="backend/" isFolder desc="Your application code" />
            <TreeRow indent="└─ " icon="folder" name="frontend/" isFolder desc="Your application code" />
          </div>
        </section>

        {/* SECTION 3: CLAUDE.md */}
        <section id="claude-md">
          <h2>CLAUDE.md: The Entry Point</h2>
          <p>First file Claude reads. Three jobs: tell Claude what to read (and in what order), set the rules for the session, and define what happens after work is done.</p>

          <CodeBlock filename="CLAUDE.md">
            <span className={styles.codeComment}># ProjectName -- Claude Code Instructions{'\n\n'}</span>
            <span className={styles.codeComment}>## Before ANY Task{'\n\n'}</span>
            <span className={styles.codeString}>Read these docs in order before writing code:{'\n\n'}</span>
            <span className={styles.codePunct}>1. </span><span className={styles.codeKeyword}>README.md</span><span className={styles.codeString}> -- Tech stack, project structure, architecture{'\n'}</span>
            <span className={styles.codePunct}>2. </span><span className={styles.codeKeyword}>docs/TODO.md</span><span className={styles.codeString}> -- Known issues & technical notes{'\n'}</span>
            <span className={styles.codePunct}>3. </span><span className={styles.codeKeyword}>docs/PROGRESS.md</span><span className={styles.codeString}> -- What's built, what's in progress{'\n'}</span>
            <span className={styles.codePunct}>4. </span><span className={styles.codeKeyword}>docs/research/RESEARCH.md</span><span className={styles.codeString}> -- Index of all research docs{'\n\n'}</span>
            <span className={styles.codeComment}>## Rules{'\n\n'}</span>
            <span className={styles.codeString}>- Read official docs first. Before using any package,{'\n'}</span>
            <span className={styles.codeString}>{'  '}read its official documentation. Not training data.{'\n'}</span>
            <span className={styles.codeString}>- Follow STYLEGUIDE.md for all UI changes.{'\n'}</span>
            <span className={styles.codeString}>- Follow API.md conventions for all endpoint changes.{'\n'}</span>
            <span className={styles.codeString}>- New package? Follow the 3-stage pipeline in RESEARCH.md.{'\n'}</span>
            <span className={styles.codeString}>- Do NOT run git commands unless explicitly asked.{'\n\n'}</span>
            <span className={styles.codeComment}>## After Completing a Feature{'\n\n'}</span>
            <span className={styles.codeString}>Follow the 6-step doc update checklist in README.md.{'\n'}</span>
            <span className={styles.codeString}>This is not optional.</span>
          </CodeBlock>

          <p>The reading order matters. README first gives Claude the big picture: what tech you're using, how the project is structured, what the architecture looks like. TODO second so it knows what's broken or pending. PROGRESS third for current status. RESEARCH last as a reference index.</p>

          <Callout type="rule" label='The "read official docs" rule'>
            <p>This is the most important rule in the protocol. Claude's training data about libraries is often outdated or partially wrong. The rule forces Claude to look up the actual documentation for a package before writing code that uses it. From the README: <em>"Every piece of code created must conform to the documentation and libraries we are using. Creating code without first looking at the libraries doc pages is super risky, and leads to spaghettification of code."</em></p>
          </Callout>
        </section>

        {/* SECTION 4: README */}
        <section id="readme">
          <h2>README.md: The Project Map</h2>
          <p>The README is the densest file in the protocol. It's the first thing Claude reads after CLAUDE.md routes it here, and it's where the full picture of the project lives.</p>
          <p>Five sections in the template:</p>

          <h3>Tech Stack table</h3>
          <p>A table listing every technology layer: backend framework, frontend framework, state management, auth approach, deployment method. As the stack grows, you add rows. Claude reads this before touching any code, so it knows what tools are in play.</p>

          <h3>Project Structure tree</h3>
          <p>An ASCII folder tree showing the actual layout of the project. Every major directory and file, with a comment explaining what it contains. This is the map Claude uses to navigate instead of brute-forcing through <code>ls</code> commands.</p>

          <h3>Architecture Notes</h3>
          <p>The patterns and decisions that shape the codebase. Backend routing pattern (Routers → Services → Models), frontend module structure, auth flow, database conventions, API versioning. Things a new developer (or a new Claude session) needs to understand before writing code.</p>

          <h3>Development Progress snapshot</h3>
          <p>A quick current-status summary that links to the full PROGRESS.md. Which phases are complete, which are in progress. Claude gets the high-level view here and drills into PROGRESS.md for specifics.</p>

          <h3>Documentation section</h3>
          <p>Links to every doc in the project, with a description of what each one contains. And the doc update checklist: the 6-step ritual that runs after every feature. This section also contains the protocol's central philosophy:</p>

          <Callout type="insight" label="From the README template">
            <p><em>"Context gets compressed, memory gets lost, sessions end. The docs are the only thing that survives. Update them before you consider a feature 'done'."</em></p>
          </Callout>
        </section>

        {/* SECTION 5: Living Docs */}
        <section id="living-docs">
          <h2>The Living Docs</h2>
          <p>These are the files that change every time work gets done. Each one has a specific job.</p>

          <div className={styles.docGrid}>
            <div className={`${styles.docCard} ${styles.card_progress}`}>
              <div className={styles.docCardName}>PROGRESS.md</div>
              <p className={styles.docCardDesc}>Multi-phase build plan with checkboxes. Broken into Backend/Frontend per phase. Each checkbox is a concrete deliverable. When a phase is done, it stays in the file as project history. This is how Claude knows what's built and what's next.</p>
            </div>

            <div className={`${styles.docCard} ${styles.card_todo}`}>
              <div className={styles.docCardName}>TODO.md</div>
              <p className={styles.docCardDesc}>Every open task, known issue, and "fix later" note lives here. The protocol is strict: all TODOs go here immediately, no exceptions. The reasoning is explicit in the template: <em>"We do not trust AI context. It gets shrunk at weird intervals."</em></p>
            </div>

            <div className={`${styles.docCard} ${styles.card_style}`}>
              <div className={styles.docCardName}>STYLEGUIDE.md</div>
              <p className={styles.docCardDesc}>Color palette with hex values, typography scale, spacing tokens, component patterns with code examples, responsive breakpoints, accessibility checklist. Everything Claude needs to match your visual language without guessing.</p>
            </div>

            <div className={`${styles.docCard} ${styles.card_api}`}>
              <div className={styles.docCardName}>API.md</div>
              <p className={styles.docCardDesc}>Complete endpoint reference. Every route with its method, path, description, request/response format, and auth requirements. Updated every time an endpoint is added, changed, or removed.</p>
            </div>
          </div>

          <p>What makes these files useful is that they're <strong>always current</strong>. The doc update checklist (covered later) forces updates to the relevant docs after every feature. If a doc is stale, that's a bug.</p>

          <Callout type="savings" label="Why this matters for token efficiency">
            <p>When Claude can read PROGRESS.md and know exactly what's built, it doesn't waste tokens exploring the codebase to figure out what exists. When it can read API.md and see every endpoint, it doesn't need to grep through router files. The living docs front-load the context that Claude would otherwise spend tokens discovering.</p>
          </Callout>
        </section>

        {/* SECTION 7: Research Pipeline */}
        <section id="research-pipeline">
          <h2>The Research Pipeline</h2>
          <p>Every new third-party package goes through an evaluation before it touches your codebase. Three stages, each with its own template file.</p>

          <div className={styles.pipeline}>
            <div className={`${styles.pipelineStage} ${styles.stage_research}`}>
              <div className={styles.stageNum}>1</div>
              <div className={styles.stageName}>Research</div>
              <div className={styles.stageFile}>HOW_TO_RESEARCH_PACKAGES.md</div>
              <div className={styles.stageDesc}>Evaluate the package systematically</div>
            </div>
            <span className={styles.pipelineArrow}>→</span>
            <div className={`${styles.pipelineStage} ${styles.stage_analysis}`}>
              <div className={styles.stageNum}>2</div>
              <div className={styles.stageName}>Analysis</div>
              <div className={styles.stageFile}>{'RESEARCH_TEMPLATE.md → {pkg}-analysis.md'}</div>
              <div className={styles.stageDesc}>Document the decision with a recommendation</div>
            </div>
            <span className={styles.pipelineArrow}>→</span>
            <div className={`${styles.pipelineStage} ${styles.stage_deployment}`}>
              <div className={styles.stageNum}>3</div>
              <div className={styles.stageName}>Deployment</div>
              <div className={styles.stageFile}>{'{feature}-deployment.md'}</div>
              <div className={styles.stageDesc}>Track integration, config, troubleshooting</div>
            </div>
          </div>

          <h3>Stage 1: Research</h3>
          <p><code>HOW_TO_RESEARCH_PACKAGES.md</code> is a step-by-step process guide. It walks through five phases: Preparation (read your project's current state), Package Discovery (check registry, GitHub, comparison articles), Deep Dive (compatibility, features, installation, integration approach, alternatives), Documentation (write the analysis doc), and Review.</p>
          <p>It also includes a master prompt you can hand to Claude. Paste it in, replace the placeholders, and Claude runs the research process against the actual project files. Time estimates are built in: 5 minutes for prep, 10-15 for discovery, 30-45 for deep dive, 30-60 for documentation.</p>

          <h3>Stage 2: Analysis Doc</h3>
          <p><code>RESEARCH_TEMPLATE.md</code> is the 15-section template you fill out for each analysis. The evaluation lives here.</p>
          <p>The sections cover:</p>

          <div className={styles.docGrid}>
            <div className={styles.docCard} style={{ borderColor: 'rgba(96,165,250,0.15)' }}>
              <div className={styles.docCardName} style={{ color: '#60a5fa' }}>Decision sections</div>
              <p className={styles.docCardDesc}>Executive Summary, Recommendation (YES/NO/CONDITIONAL), "Will It Make Our Lives Easier?" with quantified time savings, Pros &amp; Cons with mitigations.</p>
            </div>
            <div className={styles.docCard} style={{ borderColor: 'rgba(192,132,252,0.15)' }}>
              <div className={styles.docCardName} style={{ color: '#c084fc' }}>Technical sections</div>
              <p className={styles.docCardDesc}>Stack Alignment table, Data Structure requirements, Integration Approach (phased steps), Installation &amp; Setup with code examples, Packages to Install.</p>
            </div>
            <div className={styles.docCard} style={{ borderColor: 'rgba(74,222,128,0.15)' }}>
              <div className={styles.docCardName} style={{ color: '#4ade80' }}>Comparison sections</div>
              <p className={styles.docCardDesc}>Alternative Libraries table (always 3+ alternatives), Requirements Coverage mapped to PROGRESS.md, Development Effort Estimate in days/weeks.</p>
            </div>
            <div className={styles.docCard} style={{ borderColor: 'rgba(251,191,36,0.15)' }}>
              <div className={styles.docCardName} style={{ color: '#fbbf24' }}>Reference sections</div>
              <p className={styles.docCardDesc}>Library Overview (open source vs. commercial features), Additional Resources with docs/GitHub/npm links, Conclusion with actionable next steps.</p>
            </div>
          </div>

          <p>The point is you can't just say "let's use this library" and move on. You have to document why, what it costs, what you looked at instead, and how long it'll take to integrate. Every analysis doc gets indexed in <code>RESEARCH.md</code> with its recommendation status.</p>

          <h3>Stage 3: Deployment Doc</h3>
          <p>Once a package passes analysis and gets integrated, the deployment doc tracks the practical details: setup steps, configuration, known issues, and troubleshooting. Not every feature needs all three stages, but any new third-party library <strong>must</strong> have at least an analysis doc.</p>

          <Callout type="insight" label="Why the pipeline matters">
            <p>Without the pipeline, Claude will install the first library that seems to work. Sometimes that library has a commercial license your project can't use. Sometimes it hasn't been updated in two years. Sometimes there's a better alternative that covers twice as many requirements. The pipeline catches these things before they become technical debt.</p>
          </Callout>
        </section>

        {/* SECTION 8: Doc Update Checklist */}
        <section id="update-checklist">
          <h2>The Ritual: Doc Update Checklist</h2>
          <p>After completing any feature, Claude runs through this checklist. It lives in both CLAUDE.md and README.md, and the protocol doesn't leave room for interpretation: <em>"This is not optional. Do it before considering a feature 'done'."</em></p>

          <div className={styles.checklist}>
            {[
              { name: 'README.md', action: 'Update Tech Stack table, Project Structure tree, Architecture Notes, Development Progress snapshot.' },
              { name: 'PROGRESS.md', action: 'Check off completed items. Add new sub-items if the feature revealed more work.' },
              { name: 'TODO.md', action: 'Remove TODOs that are now done. Add any new ones discovered during implementation.' },
              { name: 'API.md', action: 'If endpoints were added, changed, or removed, update the reference.' },
              { name: 'docs/research/RESEARCH.md', action: 'If new analysis or deployment docs were created, update the index tables.' },
              { name: 'Relevant deployment doc', action: 'Update status, add known issues, troubleshooting notes.' },
            ].map((item, i) => (
              <div key={i} className={styles.checklistItem}>
                <div className={styles.checklistNum}>{i + 1}</div>
                <div className={styles.checklistContent}>
                  <div className={styles.fileName}>{item.name}</div>
                  <div className={styles.fileAction}>{item.action}</div>
                </div>
              </div>
            ))}
          </div>

          <p>It's mechanical on purpose. Claude doesn't need to decide whether docs should be updated. The checklist says exactly which files to check and what to put in each one. No judgment calls, no "I'll do it later."</p>

          <Callout type="rule" label="Why it's in two places">
            <p>The checklist appears in both CLAUDE.md (as a reminder at the end of the rules) and README.md (as the detailed reference with links). CLAUDE.md survives compaction and is re-read every session, so the reminder is always present. The README has the full details with links to each file. Belt and suspenders.</p>
          </Callout>
        </section>

        {/* SECTION 10: Getting Started */}
        <section id="getting-started">
          <h2>Getting Started</h2>

          <h3>Starting a new project</h3>
          <p>If you're using Claude, you can <a href="https://github.com/rividall/lynchDev" className={styles.authorLink}>download the repo</a>, add the files to your project, and ask it to read the docs and update itself.</p>
          <p>If you're using some other AI tool, you need to make sure the naming convention applies to that tool. For example, Lovable uses <code>AGENTS.md</code> instead of <code>CLAUDE.md</code> (although there are reports that it also reads a CLAUDE file. Use AGENTS to be on the safe side).</p>

          <Callout type="insight" label="Already have docs?">
            <p>If you want to implement this philosophy into a repo or project that already contains a README and documentation, your first action would be to ask the AI to review the protocol and rename all mentions of README within the protocol to something else, like <code>PROTOCOL.md</code> or similar, so the protocol can perform its actions without interfering with your existing docs.</p>
          </Callout>
        </section>

        <footer className={styles.guideFooter}>
          <p>A guide for Claude Code developers by Lynch.</p>
        </footer>

      </div>
    </PageTransition>
  )
}
