export type LearnSection={heading:string;points:string[]};
export type LearnGuide={domain:string;weight:number;color:string;intro:string;sections:LearnSection[]};

/* Concept walkthroughs for the Salesforce Certified Platform Administrator II exam.
   Every fact below reflects documented Salesforce behavior — no invented limits. */
export const learnGuides:LearnGuide[]=[
{domain:"Security and Access",weight:20,color:"#f4a55e",
 intro:"The biggest domain on the exam. The core skill is designing least-privilege access: a restrictive baseline, then opening exactly what's needed — and knowing which tool does which job.",
 sections:[
  {heading:"Core principles",points:[
   "Organization-wide defaults are the baseline. Start Private, then open selectively — OWD can never be bypassed by sharing rules, roles, or teams, which only ADD access.",
   "The role hierarchy grants access downward (managers see subordinates' records). It never restricts access. 'Grant Access Using Hierarchies' can be switched off on custom objects.",
   "Sharing rules extend access: criteria-based (field values — survives ownership changes) and ownership-based. They can never take access away.",
   "Manual sharing is for one-off exceptions via the Sharing button — never a scalable design answer.",
   "Account, opportunity, and case teams grant deal- or case-scoped access without widening the whole sharing model.",
   "Profiles: exactly one per user, the baseline of permissions. Permission sets: additive bundles layered on top. Need one extra permission for a few users? Permission set — never clone a profile.",
   "Permission set groups bundle sets by job function. A muting permission set silences selected permissions inside the group without affecting direct assignments.",
   "Field-level security is the true field boundary. Page layouts only control presentation — a field hidden on a layout is still visible in reports and the API.",
   "Profile Login IP Ranges ENFORCE: logins outside the ranges are denied. Org-wide trusted IPs (Network Access) do the opposite: they mark networks as trusted so users skip identity verification challenges.",
   "MFA is required for all UI logins (since February 2022). It cannot be exempted per profile.",
   "External organization-wide defaults must be as restrictive as, or more restrictive than, internal OWD.",
   "Guest users get no manual sharing — use guest sharing rules and sharing sets deliberately, and audit them."
  ]},
  {heading:"Numbers & settings to memorize",points:[
   "OWD options: Private, Public Read Only, Public Read/Write, Controlled by Parent.",
   "MFA mandatory for all users since February 2022."
  ]},
  {heading:"Classic exam traps",points:[
   "Restriction rules filter visibility AFTER sharing grants it — but they only support custom objects and a few standard ones. They do NOT support Opportunity. A scenario hiding Opportunities must use another tool.",
   "Trusted IP ranges never block logins; login IP ranges never skip verification challenges. The exam loves swapping them.",
   "Sharing rules, role hierarchy, and teams can only open access, never restrict it.",
   "A field secured by FLS is hidden everywhere. A field removed from a page layout is still in reports.",
   "Permission sets are strictly additive — they cannot remove anything a profile grants."
  ]}
 ]},
{domain:"Process Automation",weight:20,color:"#ed725f",
 intro:"The other 20%. Flow is the automation tool — workflow rules and Process Builder are legacy and never the recommended answer. The exam tests which flow type fits and what happens in which order.",
 sections:[
  {heading:"Core principles",points:[
   "Before-save record-triggered flows update the triggering record in memory with NO extra DML — the fastest option for same-record field updates, ideal for bulk imports.",
   "After-save flows handle related records, callouts, and anything needing the committed record ID.",
   "Scheduled-triggered flows run on a timetable independent of record changes. Scheduled paths (inside a record-triggered flow) only exist on after-save flows, need a valid time source, and re-check entry conditions at execution time.",
   "Screen flows are interactive (user input and branching). Autolaunched flows are headless, reusable logic. Subflows keep shared logic in one place instead of copying it across flows.",
   "Save order: system validation → before-save flows → before triggers → validation rules → duplicate rules → after triggers → assignment rules → auto-response rules → after-save flows. Two exam-critical consequences: before-save flow values are visible to validation rules, and assignment rules run before auto-response rules (that's why owner merge fields work in auto-response emails).",
   "Bulkification: never put Get Records, Update Records, or any DML/SOQL inside a loop. Collect records in a collection variable and act once, outside the loop.",
   "Fault paths: connect them and log $Flow.FaultMessage. An unhandled fault rolls the transaction back.",
   "Entry conditions with prior-value checks ($Record__Prior) stop flows re-running when nothing meaningful changed.",
   "Approval processes: entry criteria, assigned approvers (often the submitter's Manager field), approval/rejection actions, and the record locks while in flight.",
   "Invocable Apex contract: @InvocableMethod must be static and take a single List parameter — that's what Flow needs to call it."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Per transaction: 100 SOQL queries, 150 DML statements, 50,000 query rows. A DML inside a loop over 200 records blows the 150-statement limit immediately.",
   "A workflow field update re-fires before and after triggers exactly one additional time — the classic recursion trap."
  ]},
  {heading:"Classic exam traps",points:[
   "Updating the triggering record in an after-save flow costs an extra DML — before-save is the right call.",
   "Assignment rules cannot do round-robin distribution. It's a known limitation; don't pick it for even workload sharing.",
   "A scheduled path with a blank date field never fires — always check the time source first when troubleshooting.",
   "Pause elements suspend an interview; they don't belong in before-save flows.",
   "Migrating legacy automation: the Migrate to Flow tool moves workflow rules and Process Builder into Flow — the exam expects Flow as the answer."
  ]}
 ]},
{domain:"Objects and Applications",weight:19,color:"#72b9df",
 intro:"Data modeling decisions with permanent consequences. The exam rewards knowing exactly how each relationship type behaves — sharing, deletion, ownership — and which UI tool fits.",
 sections:[
  {heading:"Core principles",points:[
   "Master-detail: the detail inherits owner and sharing from the master, deleting the master cascade-deletes details, the master is required on the detail, roll-up summaries are allowed, max two master-details per object, reparenting is optional.",
   "Lookup: independent ownership and sharing, optional by default, delete behaviors are clear-the-value or restrict-delete, no native roll-ups (use DLRS or Flow).",
   "Converting lookup → master-detail requires every child record to already have a parent value. Converting master-detail → lookup requires deleting roll-up summary fields first.",
   "A junction object (two master-detail relationships) builds many-to-many.",
   "Roll-up summaries: COUNT, SUM, MIN, MAX only — no averages. They live on the master, support filters, and recalculate when children are created, edited, deleted, or undeleted.",
   "Formula fields calculate at read time — always current, no storage, and they don't fire automation on their own.",
   "Validation rules enforce at the database level: they fire on API and data loads too, not just the UI. Pair them with precise error messages.",
   "Record types control business processes, picklist values, and page layout assignment — all on one object.",
   "Dynamic Forms replaces juggling multiple page layouts for field visibility: field sections with visibility filters on Lightning pages.",
   "Lightning App Builder: activate pages per app, profile, and form factor; component visibility filters personalize without new pages.",
   "Global value sets: one governed picklist shared across objects. External objects (Salesforce Connect): virtualize external data; indirect lookup joins on an external ID."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Maximum two master-detail relationships per object.",
   "Roll-up aggregate functions: COUNT, SUM, MIN, MAX — there is no average."
  ]},
  {heading:"Classic exam traps",points:[
   "Need a roll-up on a lookup relationship? Native roll-ups are master-detail only — DLRS or Flow is the answer.",
   "Cross-object formulas go child → parent (show parent data on the child). Parent → child aggregation needs a roll-up or DLRS.",
   "Deleting a master deletes its details. Deleting a lookup parent with restricted delete is blocked; with clear-value, children survive.",
   "Page layouts don't secure fields — field-level security does."
  ]}
 ]},
{domain:"Data and Analytics",weight:13,color:"#63be9b",
 intro:"Getting data in clean, keeping it clean, and reporting on it. The exam tests tool selection (wizard vs loader), duplicate strategy, and report/dashboard mechanics.",
 sections:[
  {heading:"Core principles",points:[
   "Data Import Wizard: guided, up to 50,000 records, standard objects, friendly for non-technical admins. Data Loader: millions of records, all objects, CLI and API automation.",
   "Upsert matches on an external ID (or Salesforce ID) — insert-or-update in a single pass, the reliable choice for recurring integrations.",
   "Duplicate management has two halves: matching rules DEFINE what counts as a duplicate; duplicate rules decide allow, block, or report. Duplicate Jobs clean up existing records — they don't prevent new ones.",
   "Reports: tabular (simple lists, no groupings), summary (groupings), matrix (row + column groupings), joined (multiple blocks from different report types sharing a grouping).",
   "Bucket fields categorize values without creating fields. Custom report types control 'with or without' related records. Cross filters show records WITH or WITHOUT related records.",
   "Row-level formulas calculate per record; summary formulas calculate per grouping and grand total.",
   "Dynamic dashboards run as the logged-in user — one dashboard, each viewer sees their own data (5 per org by default).",
   "Report folders and dashboard folders are separate containers: viewers need access to the dashboard folder AND the source report folder.",
   "Reporting snapshots store summarized results on a schedule for historical trending."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Data Import Wizard: 50,000 records per import.",
   "Field history tracking: 20 fields per object. Dynamic dashboards: 5 per org by default."
  ]},
  {heading:"Classic exam traps",points:[
   "'Accounts with or without Opportunities' = custom report type relationship, not a cross filter.",
   "Validation rules guard new saves; they don't fix bad data already in the org.",
   "A dashboard in a shared folder still breaks if the source report folder isn't shared with the viewer.",
   "Duplicate Jobs find existing duplicates; duplicate rules prevent new ones. The exam swaps these constantly."
  ]}
 ]
},

{domain:"Cloud Applications",weight:11,color:"#e7859f",
 intro:"Sales Cloud and Service Cloud day-to-day: leads to cash, cases to resolution. The exam tests what each feature actually does — and what it can't do.",
 sections:[
  {heading:"Core principles",points:[
   "Lead conversion creates (or links) an Account, Contact, and Opportunity — then the lead becomes read-only. 'Do not create an opportunity upon conversion' suppresses the opp; lead field mapping carries custom fields over.",
   "Campaigns track marketing efforts. Campaign Influence attributes revenue across multiple campaigns with customizable models; Primary Campaign Source credits exactly one.",
   "Products need price books and price book entries to be sold; product schedules spread revenue or quantity across dates; quote syncing ties the synced quote's line items to its opportunity.",
   "Collaborative Forecasts: forecast types (e.g., by product family), manager adjustments that never change opportunity amounts, and quotas.",
   "Enterprise Territory Management assigns accounts by rules (geography, industry) independent of the role hierarchy; forecasts can follow territories.",
   "Cases: assignment rules route on creation to queues or users; escalation rules reassign or notify based on case age; auto-response rules send the first reply. Save order reminder: assignment runs before auto-response.",
   "Entitlements define support terms; milestones track time-based warning and violation actions per severity.",
   "Knowledge: data categories classify articles; channel visibility controls which audiences see them.",
   "Omni-Channel routes work by agent capacity and skills across service channels. The Service Console is the tabbed multi-record agent workspace; Case Feed shows the chronological interaction stream.",
   "Experience Cloud: authenticated self-service sites for customers and partners (sharing sets extend access to external users).",
   "Path guides users through stage-specific key fields, guidance, and coaching."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Opportunity revenue splits must total 100%."
  ]},
  {heading:"Classic exam traps",points:[
   "Forecast adjustments never change opportunity field values — they live only in the forecast.",
   "Converted leads are read-only. Conversion choices (existing account, suppress opportunity) are permanent.",
   "Case assignment rules only fire on case creation — and only when the org is configured to use them.",
   "Opportunity splits, forecast adjustments, and territory assignment solve different problems — read what the scenario actually needs."
  ]}
 ]},
{domain:"Auditing and Monitoring",weight:10,color:"#9d8ce0",
 intro:"Proving what happened and catching what's wrong. Two different histories: setup changes vs record data changes — the exam constantly tests whether you know which is which.",
 sections:[
  {heading:"Core principles",points:[
   "Setup Audit Trail: who changed setup configuration and when. Six months of history in the UI — export regularly if auditors need more.",
   "Field history tracking: old and new values for up to 20 fields per object, roughly 18 months of retention via reports.",
   "Field Audit Trail (Shield): 60 fields per object, up to 10 years of retention, queried via Async SOQL or the API — the regulated-industry answer.",
   "Debug logs: 20 MB per log; trace flags expire after 24 hours. To reproduce a user's issue, run the log as that user to capture their permissions and execution path.",
   "Login History: successful and failed attempts with IP and location — the credential-sharing investigation tool.",
   "Health Check: scores org security settings against Salesforce's baseline or an imported custom baseline.",
   "Event Monitoring: event log files for logins, report exports, API calls, and URI events — the 'who exported that report' answer.",
   "Salesforce Optimizer: high-level analysis of configuration with improvement recommendations."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Setup Audit Trail: 6 months in the UI. Field history: 20 fields per object, ~18 months. Field Audit Trail: 60 fields, up to 10 years. Debug logs: 20 MB cap, 24-hour trace flags."
  ]},
  {heading:"Classic exam traps",points:[
   "Setup Audit Trail tracks CONFIG changes; field history tracks RECORD data changes. An auditor asking about permission changes 9 months ago gets bad news if nothing was exported.",
   "Need field history beyond 20 fields or ~18 months? That's Shield (Field Audit Trail), not a setting you toggle.",
   "Debug logs don't persist — the 20 MB cap and 24-hour trace flags surprise people on exam day.",
   "Event Monitoring (not debug logs) is the answer for 'who exported that report'."
  ]}
 ]},
{domain:"Environment and Deployment",weight:7,color:"#d9a35f",
 intro:"The smallest domain, but every question is free points if you know sandbox types and change set limits. Deployment failures follow patterns — learn the patterns.",
 sections:[
  {heading:"Core principles",points:[
   "Developer sandbox: metadata only, for coding and configuration. Developer Pro: more storage. Partial Copy: template-selected sample of production data. Full: complete copy for UAT and performance testing.",
   "Refresh intervals: Developer and Developer Pro every 1 day, Partial Copy every 5 days, Full every 29 days. Refreshing wipes the sandbox — retrieve valuable changes first.",
   "Change sets: declarative org-to-org metadata moves. Always validate before deploying, and always check View/Add Dependencies — missing dependencies are the #1 failure.",
   "Change sets CANNOT deploy deletions or renames. Destructive changes go through the Metadata API with a destructiveChanges manifest, carefully sequenced after dependents are handled.",
   "Unlocked packages: versioned, installable metadata — better than change sets for repeated or multi-org distribution.",
   "Managed packages: protected components with versioned upgrades — subscribers generally cannot edit managed components.",
   "Sandbox templates control which objects and records Partial Copy and Full sandboxes include. Mask or minimize sensitive data before broad developer access."
  ]},
  {heading:"Numbers & limits to memorize",points:[
   "Refresh: Developer/Developer Pro 1 day · Partial Copy 5 days · Full 29 days."
  ]},
  {heading:"Classic exam traps",points:[
   "A validation rule referencing a new field means the change set needs BOTH components.",
   "Destructive changes need the Metadata API — never pick change sets for deletions.",
   "Refreshing a sandbox destroys what's in it. 'Refresh immediately' is never the right answer when work is unsaved.",
   "Full sandbox for UAT with production-like data; Developer sandbox for isolated config work."
  ]}
 ]}
];
