import React, { useMemo, useState } from 'react';

type ScreenKey =
  | 'digest'
  | 'history'
  | 'deepDive'
  | 'summary'
  | 'demo'
  | 'performance'
  | 'outreachLog'
  | 'settings';

const screenMeta: Array<{ key: ScreenKey; label: string; subtitle: string }> = [
  { key: 'digest', label: 'Digest', subtitle: 'Good Morning, Alex' },
  { key: 'history', label: 'Lead History', subtitle: 'Search, score, and sort by potential' },
  { key: 'deepDive', label: 'Lead Deep Dive', subtitle: 'Business profile and outreach timeline' },
  { key: 'summary', label: 'Lead Summary', subtitle: 'AI report with recommended action' },
  { key: 'demo', label: 'Prepare Demo', subtitle: 'Checklist and rep notes before handoff' },
  { key: 'performance', label: 'Outreach Performance', subtitle: 'Team throughput and outcomes' },
  { key: 'outreachLog', label: 'Outreach Log', subtitle: 'Live channel updates and activity history' },
  { key: 'settings', label: 'Settings', subtitle: 'Organization profile and team management' },
];

const stats = [
  { label: 'Outreach (7D)', value: '1,240', trend: '+5%' },
  { label: 'Response Rate', value: '12.4%', trend: '+1.2%' },
  { label: 'Demos Booked', value: '18', trend: '+3' },
];

const leads = [
  { name: 'Acme Corp', score: 92, trust: 'High', gap: '-15%', age: '2h ago' },
  { name: 'Beta Industries', score: 45, trust: 'Low', gap: '-38%', age: '5h ago' },
  { name: 'Gamma Dynamics', score: 68, trust: 'Medium', gap: '+12%', age: '1d ago' },
];

const timeline = [
  { channel: 'WhatsApp Message', ago: '2h ago', status: 'Replied', text: 'Thanks for the info, let\'s talk tomorrow at 10 AM.' },
  { channel: 'Phone Call', ago: '1d ago', status: 'No Answer', text: 'Outgoing call attempt to primary business line.' },
  { channel: 'Email Campaign', ago: '2d ago', status: 'Sent', text: 'BIE Automated Audit Report sent to owner.' },
];

function Section({ title, right, children }: { title: string; right?: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="section-title-row">
        <h3>{title}</h3>
        {right ? <span>{right}</span> : null}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value, tone = 'blue' }: { label: string; value: string; tone?: 'blue' | 'green' | 'amber' }) {
  return (
    <div className={`metric metric-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<ScreenKey>('digest');
  const current = useMemo(() => screenMeta.find((meta) => meta.key === screen)!, [screen]);

  return (
    <main className="app-shell">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #040a16; color: #fff; }
        .app-shell { min-height: 100vh; padding: 20px 12px; background: radial-gradient(circle at 50% 0%, #10224b 0%, #050c1a 48%, #040912 100%); }
        .phone { max-width: 430px; margin: 0 auto; border: 1px solid #223250; border-radius: 28px; overflow: hidden; background: #081226; box-shadow: 0 20px 60px rgba(0,0,0,.55); }
        .header { padding: 20px; border-bottom: 1px solid #1a2a45; }
        .brand { color: #6d89bb; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
        .header h1 { margin: 8px 0 4px; font-size: 32px; line-height: 1.05; }
        .header p { margin: 0; color: #8ca4cb; }
        .tabs { display: flex; overflow: auto; gap: 8px; padding: 14px 12px; border-bottom: 1px solid #1a2a45; background: #071020; }
        .tabs button { border: 1px solid #203358; background: #111f38; color: #9cb2d6; border-radius: 999px; font-size: 12px; padding: 8px 12px; white-space: nowrap; }
        .tabs button.active { color: #e9f1ff; background: #1f5fe0; border-color: #2c6ef1; }
        .content { padding: 16px; display: grid; gap: 14px; }
        .section { background: #121f37; border: 1px solid #20314f; border-radius: 18px; padding: 14px; }
        .section-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .section h3 { margin: 0; font-size: 15px; text-transform: uppercase; color: #9eb2d2; letter-spacing: .07em; }
        .section-title-row span { color: #2d77ff; font-size: 13px; }
        .hero { background: linear-gradient(135deg,#2563eb,#1e40af); padding: 16px; border-radius: 16px; }
        .hero h2 { margin: 8px 0; font-size: 32px; }
        .hero p { margin: 0; color: #d8e5ff; }
        .metric-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
        .metric { border-radius: 14px; padding: 14px; border: 1px solid transparent; }
        .metric p { margin: 0 0 8px; color: #93a8c8; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
        .metric strong { font-size: 36px; }
        .metric-blue { background: #1b2843; border-color: #2e4b79; }
        .metric-green { background: #182d2d; border-color: #1d645f; }
        .metric-amber { background: #2f2718; border-color: #6e5424; }
        .list { display: grid; gap: 10px; }
        .item { background: #172743; border: 1px solid #243a60; border-radius: 14px; padding: 12px; }
        .item-head { display: flex; justify-content: space-between; gap: 12px; }
        .item h4 { margin: 0 0 4px; font-size: 21px; }
        .muted { color: #8da4cb; }
        .pill { border-radius: 999px; padding: 4px 10px; font-size: 12px; border: 1px solid #3b5f9a; color: #cddcff; display: inline-block; }
        .pill.green { border-color: #1e7a5f; background: #0f3a32; color: #4ce0ac; }
        .pill.red { border-color: #8a3843; background: #3f1e28; color: #ff8895; }
        .timeline { display: grid; gap: 8px; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 6px; top: 4px; bottom: 4px; width: 2px; background: #244370; }
        .timeline-entry { margin-left: 20px; background: #0f1d34; border: 1px solid #213a5f; border-radius: 12px; padding: 10px; position: relative; }
        .timeline-entry::before { content: ''; width: 10px; height: 10px; border-radius: 50%; background: #2f75ff; position: absolute; left: -20px; top: 16px; }
        .input { width: 100%; border-radius: 12px; border: 1px solid #2a3e63; background: #0c162b; color: #dbe8ff; padding: 12px 14px; font-size: 16px; }
        .textarea { min-height: 94px; resize: vertical; }
        .cta { width: 100%; border: none; border-radius: 14px; background: #2563eb; color: #fff; font-size: 24px; font-weight: 700; padding: 14px; }
        .bottom { display: grid; grid-template-columns: repeat(4,1fr); background: #101b30; border-top: 1px solid #1e2f4d; text-align: center; padding: 10px 8px; gap: 8px; }
        .bottom span { color: #8ba3ca; font-size: 12px; }
      `}</style>

      <div className="phone">
        <header className="header">
          <div className="brand">KohoLabs Intelligence Engine</div>
          <h1>{current.label}</h1>
          <p>{current.subtitle}</p>
        </header>

        <nav className="tabs" aria-label="screens">
          {screenMeta.map((tab) => (
            <button key={tab.key} className={tab.key === screen ? 'active' : ''} onClick={() => setScreen(tab.key)}>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="content">
          {screen === 'digest' && (
            <>
              <div className="hero">
                <span className="pill">System Intelligence • New</span>
                <h2>Regional Alert: Ikeja</h2>
                <p>Businesses in Ikeja currently show <strong>20% lower trust scores</strong> vs last month.</p>
              </div>
              <Section title="Recent Team Wins" right="View all">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>Lekki Spa Deal Closed</strong><strong>$5,000</strong></div><span className="muted">John marked as <span style={{ color: '#22d3a7' }}>Won</span></span></div>
                  <div className="item"><div className="item-head"><strong>Burger Point Contract</strong><strong>$2,200</strong></div><span className="muted">Sarah finalized terms</span></div>
                </div>
              </Section>
            </>
          )}

          {screen === 'history' && (
            <>
              <input className="input" defaultValue="Search by name, domain, or ID..." />
              <Section title="142 Leads Found" right="Sort: Score (High to Low)">
                <div className="list">
                  {leads.map((lead) => (
                    <article key={lead.name} className="item">
                      <div className="item-head">
                        <div>
                          <h4>{lead.name}</h4>
                          <span className="muted">Trust: {lead.trust} • Gap: {lead.gap}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className={`pill ${lead.score > 80 ? 'green' : lead.score < 60 ? 'red' : ''}`}>Score: {lead.score}</span>
                          <div className="muted" style={{ marginTop: 8 }}>{lead.age}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Section>
            </>
          )}

          {screen === 'deepDive' && (
            <>
              <Section title="Mama Put Delight" right="ID: KH-90210">
                <div className="metric-grid">
                  <MetricCard label="Visibility Score" value="72" tone="blue" />
                  <MetricCard label="Trust Score" value="45" tone="amber" />
                </div>
              </Section>
              <Section title="Gap Analysis">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>No Google My Business Profile</strong><span className="pill red">Critical</span></div><p className="muted">Limits local search visibility significantly.</p></div>
                  <div className="item"><div className="item-head"><strong>Low Instagram Engagement</strong><span className="pill">Medium</span></div><p className="muted">0.2% avg engagement over last 10 posts.</p></div>
                </div>
              </Section>
              <Section title="Outreach Timeline">
                <div className="timeline">
                  {timeline.map((entry) => (
                    <article key={entry.channel} className="timeline-entry">
                      <div className="item-head"><strong>{entry.channel}</strong><span className="muted">{entry.ago}</span></div>
                      <p className="muted" style={{ margin: '8px 0' }}>{entry.text}</p>
                      <span className="pill">{entry.status}</span>
                    </article>
                  ))}
                </div>
              </Section>
            </>
          )}

          {screen === 'summary' && (
            <>
              <Section title="Northside Plumbing Co." right="Active Opportunity">
                <div className="metric-grid">
                  <MetricCard label="Visibility" value="45/100" tone="blue" />
                  <MetricCard label="Trust" value="82/100" tone="green" />
                </div>
              </Section>
              <Section title="Key Intelligence" right="3 Gaps Detected">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>Missing Google Reviews</strong><span className="pill red">High</span></div><p className="muted">No new reviews in 6 months. Competitors avg 4/mo.</p></div>
                  <div className="item"><div className="item-head"><strong>Broken Website Links</strong><span className="pill">Medium</span></div><p className="muted">3 internal links on homepage return 404 errors.</p></div>
                </div>
              </Section>
              <button className="cta">Recommended Action →</button>
            </>
          )}

          {screen === 'demo' && (
            <>
              <Section title="Acme Corp" right="High Intent">
                <div className="metric-grid">
                  <MetricCard label="Lead Score" value="85/100" tone="green" />
                  <MetricCard label="Potential" value="$12k MRR" tone="blue" />
                </div>
              </Section>
              <Section title="Gap Analysis Checklist">
                <div className="list">
                  <div className="item">☐ Highlight lack of website SSL<br /><span className="muted">Critical security gap identified.</span></div>
                  <div className="item">☐ Address low Trust Pilot score<br /><span className="muted">Score: 2.4/5</span></div>
                  <div className="item">☐ Discuss competitor overlap<br /><span className="muted">Mention differentiation from Competitor X.</span></div>
                </div>
              </Section>
              <Section title="Rep Notes">
                <textarea className="input textarea" defaultValue="Add specific strategy notes, blockers, or key stakeholders for this demo..." />
              </Section>
              <button className="cta">Finalize & Update Status</button>
            </>
          )}

          {screen === 'performance' && (
            <>
              <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
                {stats.map((s) => (
                  <div key={s.label} className="metric metric-blue" style={{ padding: 12 }}>
                    <p style={{ marginBottom: 4 }}>{s.label}</p>
                    <strong style={{ fontSize: 28 }}>{s.value}</strong>
                    <div style={{ color: '#1deba5', marginTop: 6 }}>{s.trend}</div>
                  </div>
                ))}
              </div>
              <input className="input" defaultValue="Search by business name" />
              <Section title="Recent Activity Logs">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>Acme Corp</strong><span className="muted">12m ago</span></div><span className="pill green">Connected</span><p className="muted">BIE: Send "Enterprise Deck" and schedule follow-up.</p></div>
                  <div className="item"><div className="item-head"><strong>TechFlow Inc</strong><span className="muted">45m ago</span></div><span className="pill">Left Voicemail</span><p className="muted">BIE: Pause sequence for 2 days.</p></div>
                </div>
              </Section>
            </>
          )}

          {screen === 'outreachLog' && (
            <>
              <Section title="Today" right="Filters: Channel + Outcome">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>Sarah Jenkins</strong><span className="muted">2m ago</span></div><span className="muted">Target: Acme Corp • WhatsApp</span><p style={{ marginBottom: 0 }}>“Positive reply regarding the Q3 proposal...”</p></div>
                  <div className="item"><div className="item-head"><strong>Mike Ross</strong><span className="muted">1h ago</span></div><span className="muted">Target: Stark Industries • Voice Call</span><p style={{ marginBottom: 0 }}>“Left voicemail following previous email...”</p></div>
                </div>
              </Section>
              <button className="cta">+ Log Activity</button>
            </>
          )}

          {screen === 'settings' && (
            <>
              <Section title="Organization Profile" right="Save">
                <div className="list">
                  <label className="muted">Company Name<input className="input" defaultValue="KohoLabs Inc." /></label>
                  <label className="muted">Website<input className="input" defaultValue="https://koholabs.io" /></label>
                </div>
              </Section>
              <Section title="Team Management" right="5 Users">
                <div className="list">
                  <div className="item"><div className="item-head"><strong>Sarah Jenkins</strong><span className="pill">Admin</span></div><span className="muted">sarah@koholabs.io • Active</span></div>
                  <div className="item"><div className="item-head"><strong>Michael Chen</strong><span className="pill">Member</span></div><span className="muted">mike@koholabs.io • Active</span></div>
                </div>
              </Section>
              <Section title="Danger Zone">
                <button className="cta" style={{ background: '#7f1d1d' }}>Delete this Organization</button>
              </Section>
            </>
          )}
        </div>

        <footer className="bottom">
          <span>Home</span>
          <span>Leads</span>
          <span>Logs</span>
          <span>Settings</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
