import { useState } from "react";

const STEPS = [
  "Welcome",
  "Investor Classification",
  "Personal Information",
  "Tax & Compliance",
  "Source of Wealth",
  "Fund Selection",
  "Review & Submit",
];

const FUNDS = [
  {
    id: "apac-macro",
    name: "AbeleAsia-Pacific Macro Fund",
    strategy: "Global Macro",
    aum: "S$480M",
    ytd: "+14.2%",
    minInvestment: "S$250,000",
    risk: "High",
    description:
      "Exploits macro dislocations across Asia-Pacific currency, rates, and equity markets using quantitative and discretionary approaches.",
    tags: ["Macro", "FX", "Rates"],
  },
  {
    id: "sg-equity",
    name: "AbeleSingapore Equity Long/Short",
    strategy: "Long / Short Equity",
    aum: "S$210M",
    ytd: "+9.7%",
    minInvestment: "S$100,000",
    risk: "Medium",
    description:
      "Concentrated long/short book targeting undervalued SGX-listed and regional equities with fundamental bottom-up research.",
    tags: ["Equities", "SGX", "Long/Short"],
  },
  {
    id: "credit-opps",
    name: "AbeleCredit Opportunities Fund",
    strategy: "Credit / Fixed Income",
    aum: "S$330M",
    ytd: "+6.1%",
    minInvestment: "S$200,000",
    risk: "Medium",
    description:
      "Targets mispriced credit instruments across IG, HY, and distressed in APAC, with active duration and spread management.",
    tags: ["Credit", "Bonds", "APAC"],
  },
  {
    id: "quant-alpha",
    name: "AbeleQuantitative Alpha Fund",
    strategy: "Systematic / Quant",
    aum: "S$155M",
    ytd: "+18.4%",
    minInvestment: "S$500,000",
    risk: "High",
    description:
      "Machine-learning driven multi-factor strategies across liquid global futures and equity markets with sub-day rebalancing.",
    tags: ["Quant", "Systematic", "Futures"],
  },
];

const riskColor = (r) =>
  r === "High" ? "#e8a045" : r === "Medium" ? "#4caf8a" : "#7ea9d4";

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    // Investor classification
    investorType: "",
    netAssets: "",
    annualIncome: "",
    acknowledged: false,
    // PII
    salutation: "",
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    idType: "",
    idNumber: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    postalCode: "",
    // Tax
    taxResidency: "",
    tinNumber: "",
    usPerson: "",
    fatcaStatus: "",
    crsStatus: "",
    // Source of wealth
    sourceOfWealth: [],
    employmentStatus: "",
    employer: "",
    annualNetWorth: "",
    wealthNarrative: "",
    pepStatus: "",
    // Fund
    selectedFund: "",
    investmentAmount: "",
    investmentObjective: "",
    riskTolerance: "",
    // Consents
    consentKYC: false,
    consentMarketing: false,
    consentTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return form.investorType && form.acknowledged;
    if (step === 2)
      return (
        form.firstName &&
        form.lastName &&
        form.dob &&
        form.nationality &&
        form.idType &&
        form.idNumber &&
        form.email
      );
    if (step === 3)
      return form.taxResidency && form.usPerson && form.crsStatus;
    if (step === 4)
      return form.sourceOfWealth.length > 0 && form.employmentStatus;
    if (step === 5)
      return form.selectedFund && form.investmentAmount && form.riskTolerance;
    if (step === 6) return form.consentKYC && form.consentTerms;
    return true;
  };

  const Input = ({ label, value, onChange, type = "text", placeholder, required }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#c9a84c" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
        onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
      />
    </div>
  );

  const Select = ({ label, value, onChange, options, required }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#c9a84c" }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...styles.input, cursor: "pointer" }}
        onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value || o} value={o.value || o}>
            {o.label || o}
          </option>
        ))}
      </select>
    </div>
  );

  const RadioGroup = ({ label, value, onChange, options, required }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#c9a84c" }}>*</span>}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
        {options.map((o) => (
          <button
            key={o.value || o}
            onClick={() => onChange(o.value || o)}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: `1.5px solid ${
                value === (o.value || o)
                  ? "#c9a84c"
                  : "rgba(201,168,76,0.2)"
              }`,
              background:
                value === (o.value || o)
                  ? "rgba(201,168,76,0.15)"
                  : "rgba(255,255,255,0.03)",
              color: value === (o.value || o) ? "#c9a84c" : "#c0c8d8",
              fontSize: 17,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {o.label || o}
          </button>
        ))}
      </div>
    </div>
  );

  const CheckboxGroup = ({ label, values, onChange, options }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={styles.label}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              padding: "7px 14px",
              borderRadius: 6,
              border: `1.5px solid ${
                values.includes(o) ? "#4caf8a" : "rgba(255,255,255,0.1)"
              }`,
              background: values.includes(o)
                ? "rgba(76,175,138,0.12)"
                : "rgba(255,255,255,0.03)",
              color: values.includes(o) ? "#4caf8a" : "#c0c8d8",
              fontSize: 17,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {values.includes(o) ? "✓ " : ""}
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  const Checkbox = ({ checked, onChange, label }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
        marginBottom: 14,
        padding: "12px 16px",
        borderRadius: 8,
        border: `1px solid ${checked ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)"}`,
        background: checked ? "rgba(201,168,76,0.06)" : "transparent",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          border: `2px solid ${checked ? "#c9a84c" : "rgba(255,255,255,0.3)"}`,
          background: checked ? "#c9a84c" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          transition: "all 0.2s",
        }}
      >
        {checked && <span style={{ color: "#0d1117", fontSize: 15, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontSize: 17, color: "#c0c8d8", lineHeight: 1.5 }}>{label}</span>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={styles.stepContent}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={styles.monogram}>ABELE</div>
              <h1 style={styles.heroTitle}>Welcome to Abele Asset Management</h1>
              <p style={styles.heroSub}>
                Private investment management for accredited and institutional investors.
                This onboarding process is regulated under the Securities and Futures Act
                and Monetary Authority of Singapore requirements.
              </p>
            </div>
            <div style={styles.infoGrid}>
              {[
                { icon: "🛡️", title: "MAS Regulated", desc: "Licensed Capital Markets Services holder under SFA Cap. 289" },
                { icon: "🔐", title: "Data Protection", desc: "PDPA compliant. All PII encrypted and secured at rest and in transit." },
                { icon: "⏱️", title: "15 Minutes", desc: "Complete your KYC onboarding in a single guided session." },
                { icon: "✅", title: "Compliance Review", desc: "Applications reviewed by our compliance team within 2 business days." },
              ].map((c) => (
                <div key={c.title} style={styles.infoCard}>
                  <div style={{ fontSize: 35, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontSize: 17, color: "#a0aab8", lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <div style={styles.notice}>
              <span style={{ color: "#c9a84c", marginRight: 8 }}>📋</span>
              <span style={{ fontSize: 17, color: "#b0b8c8" }}>
                Please have your NRIC/Passport, tax identification number, and financial
                statements ready before proceeding.
              </span>
            </div>
          </div>
        );

      case 1:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Investor Classification</h2>
            <p style={styles.stepDesc}>
              Under MAS Notice SFA 04-N13 and the Securities and Futures Act, Abele Asset Management
              may only accept Accredited Investors or Institutional Investors. Please confirm
              your classification below.
            </p>
            <RadioGroup
              label="I am applying as a"
              value={form.investorType}
              onChange={(v) => set("investorType", v)}
              required
              options={[
                { value: "individual_ai", label: "Individual Accredited Investor" },
                { value: "joint_ai", label: "Joint Accredited Investor" },
                { value: "institutional", label: "Institutional Investor" },
                { value: "corporate_ai", label: "Corporate Accredited Investor" },
              ]}
            />
            {(form.investorType === "individual_ai" || form.investorType === "joint_ai") && (
              <div style={styles.infoBox}>
                <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 10 }}>
                  MAS Accredited Investor Criteria (Any One of the Following)
                </div>
                {[
                  "Net personal assets exceeding S$2 million (or equivalent in foreign currency), with primary residence value capped at S$1 million",
                  "Net financial assets exceeding S$1 million (or equivalent in foreign currency)",
                  "Annual income in the preceding 12 months not less than S$300,000 (or equivalent)",
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#c9a84c", flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: 17, color: "#c0c8d8", lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
                <RadioGroup
                  label="Qualifying criterion"
                  value={form.netAssets}
                  onChange={(v) => set("netAssets", v)}
                  required
                  options={[
                    { value: "net_assets_2m", label: "Net assets > S$2M" },
                    { value: "fin_assets_1m", label: "Financial assets > S$1M" },
                    { value: "income_300k", label: "Annual income ≥ S$300K" },
                  ]}
                />
              </div>
            )}
            <Checkbox
              checked={form.acknowledged}
              onChange={(v) => set("acknowledged", v)}
              label="I confirm that I meet the above criteria and consent to being treated as an Accredited Investor. I acknowledge that as an AI I will receive reduced regulatory protections under the SFA."
            />
          </div>
        );

      case 2:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Personal Information</h2>
            <p style={styles.stepDesc}>
              Required for Know-Your-Customer (KYC) verification under MAS Notice SFA 04-N12.
              All fields marked * are mandatory.
            </p>
            <div style={styles.twoCol}>
              <Select
                label="Salutation"
                value={form.salutation}
                onChange={(v) => set("salutation", v)}
                options={["Mr", "Mrs", "Ms", "Dr", "Prof"]}
              />
              <div />
            </div>
            <div style={styles.twoCol}>
              <Input label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} required placeholder="As per ID" />
              <Input label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} required placeholder="As per ID" />
            </div>
            <div style={styles.twoCol}>
              <Input label="Date of Birth" value={form.dob} onChange={(v) => set("dob", v)} type="date" required />
              <Select
                label="Nationality"
                required
                value={form.nationality}
                onChange={(v) => set("nationality", v)}
                options={["Singapore", "Malaysia", "Indonesia", "India", "China", "United Kingdom", "United States", "Australia", "Other"]}
              />
            </div>
            <div style={styles.twoCol}>
              <Select
                label="ID Type"
                required
                value={form.idType}
                onChange={(v) => set("idType", v)}
                options={["NRIC", "Singapore PR (FIN)", "Passport", "Employment Pass"]}
              />
              <Input label="ID Number" value={form.idNumber} onChange={(v) => set("idNumber", v)} required placeholder="e.g. S1234567A" />
            </div>
            <div style={styles.divider} />
            <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>
              CONTACT DETAILS
            </div>
            <div style={styles.twoCol}>
              <Input label="Email Address" value={form.email} onChange={(v) => set("email", v)} type="email" required placeholder="primary@email.com" />
              <Input label="Mobile Number" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+65 XXXX XXXX" />
            </div>
            <Input label="Address Line 1" value={form.address1} onChange={(v) => set("address1", v)} placeholder="Street / Building" />
            <Input label="Address Line 2" value={form.address2} onChange={(v) => set("address2", v)} placeholder="Unit / Floor (optional)" />
            <div style={styles.threeCol}>
              <Input label="City" value={form.city} onChange={(v) => set("city", v)} placeholder="Singapore" />
              <Select
                label="Country"
                value={form.country}
                onChange={(v) => set("country", v)}
                options={["Singapore", "Malaysia", "Indonesia", "India", "China", "United Kingdom", "United States", "Australia", "Other"]}
              />
              <Input label="Postal Code" value={form.postalCode} onChange={(v) => set("postalCode", v)} placeholder="6-digit" />
            </div>
          </div>
        );

      case 3:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Tax Residency & Compliance</h2>
            <p style={styles.stepDesc}>
              Singapore participates in the OECD Common Reporting Standard (CRS) and FATCA.
              These declarations are required under the Income Tax Act and our regulatory obligations.
            </p>
            <Select
              label="Country of Tax Residency"
              required
              value={form.taxResidency}
              onChange={(v) => set("taxResidency", v)}
              options={["Singapore", "Malaysia", "Indonesia", "India", "China", "Hong Kong", "United Kingdom", "United States", "Australia", "Other"]}
            />
            <Input
              label="Tax Identification Number (TIN)"
              value={form.tinNumber}
              onChange={(v) => set("tinNumber", v)}
              placeholder="Local tax ID or NRIC for Singapore tax residents"
            />
            <div style={styles.infoBox}>
              <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 8 }}>
                CRS SELF-CERTIFICATION
              </div>
              <Select
                label="CRS Account Holder Classification"
                required
                value={form.crsStatus}
                onChange={(v) => set("crsStatus", v)}
                options={[
                  { value: "individual", label: "Individual (Tax Resident in Singapore only)" },
                  { value: "individual_multi", label: "Individual (Tax Resident in multiple jurisdictions)" },
                  { value: "passive_nfe", label: "Passive Non-Financial Entity" },
                  { value: "active_nfe", label: "Active Non-Financial Entity" },
                ]}
              />
            </div>
            <div style={styles.infoBox}>
              <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 8 }}>
                FATCA DECLARATION
              </div>
              <RadioGroup
                label="Are you a US Person for FATCA purposes?"
                required
                value={form.usPerson}
                onChange={(v) => set("usPerson", v)}
                options={[
                  { value: "no", label: "No — Not a US Person" },
                  { value: "yes_citizen", label: "Yes — US Citizen" },
                  { value: "yes_resident", label: "Yes — US Resident / Green Card Holder" },
                ]}
              />
              {form.usPerson && form.usPerson !== "no" && (
                <div style={{ ...styles.warningBox }}>
                  <span style={{ color: "#e8a045" }}>⚠️</span>
                  <span style={{ fontSize: 17, color: "#e8c06a", marginLeft: 8 }}>
                    US Persons require additional FATCA W-9 documentation. Our compliance team will contact you.
                  </span>
                </div>
              )}
              {form.usPerson === "no" && (
                <Select
                  label="FATCA Status (Non-US Person)"
                  value={form.fatcaStatus}
                  onChange={(v) => set("fatcaStatus", v)}
                  options={[
                    { value: "individual_sg", label: "Individual — Singapore Tax Resident" },
                    { value: "individual_other", label: "Individual — Other Jurisdiction" },
                    { value: "entity_exempt", label: "Entity — Exempt Beneficial Owner" },
                  ]}
                />
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Source of Wealth</h2>
            <p style={styles.stepDesc}>
              Under MAS Notice SFA 04-N12 Anti-Money Laundering requirements, we are required
              to verify the origin of your funds and assess your risk profile.
            </p>
            <CheckboxGroup
              label="Source of Wealth (select all that apply) *"
              values={form.sourceOfWealth}
              onChange={(v) => toggle("sourceOfWealth", v)}
              options={[
                "Employment / Salary",
                "Business Ownership",
                "Investment Returns",
                "Inheritance / Gift",
                "Real Estate Proceeds",
                "Pension / Retirement Funds",
                "Insurance Proceeds",
                "Loan / Credit Facility",
              ]}
            />
            <div style={styles.twoCol}>
              <Select
                label="Employment Status"
                required
                value={form.employmentStatus}
                onChange={(v) => set("employmentStatus", v)}
                options={[
                  "Employed (Private Sector)",
                  "Employed (Public / Government)",
                  "Self-Employed",
                  "Business Owner",
                  "Retired",
                  "Investor / HNW Individual",
                ]}
              />
              <Input label="Employer / Business Name" value={form.employer} onChange={(v) => set("employer", v)} placeholder="Optional" />
            </div>
            <Select
              label="Estimated Annual Net Worth"
              value={form.annualNetWorth}
              onChange={(v) => set("annualNetWorth", v)}
              options={[
                "S$1M — S$2M",
                "S$2M — S$5M",
                "S$5M — S$10M",
                "S$10M — S$25M",
                "Above S$25M",
              ]}
            />
            <div style={{ marginBottom: 18 }}>
              <label style={styles.label}>Brief Description of Wealth Origin</label>
              <textarea
                value={form.wealthNarrative}
                onChange={(e) => set("wealthNarrative", e.target.value)}
                placeholder="Briefly describe how your investable assets were accumulated..."
                rows={3}
                style={{
                  ...styles.input,
                  resize: "vertical",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.25)")}
              />
            </div>
            <div style={styles.infoBox}>
              <RadioGroup
                label="Are you a Politically Exposed Person (PEP) or related to one?"
                value={form.pepStatus}
                onChange={(v) => set("pepStatus", v)}
                options={[
                  { value: "no", label: "No" },
                  { value: "yes_self", label: "Yes — I am a PEP" },
                  { value: "yes_related", label: "Yes — Related to a PEP" },
                ]}
              />
              {form.pepStatus && form.pepStatus !== "no" && (
                <div style={styles.warningBox}>
                  <span style={{ color: "#e8a045" }}>⚠️</span>
                  <span style={{ fontSize: 17, color: "#e8c06a", marginLeft: 8 }}>
                    PEP status requires Enhanced Due Diligence. Our compliance team will contact you for additional documentation.
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Fund Selection</h2>
            <p style={styles.stepDesc}>
              The following funds are available to qualified accredited investors. Past performance
              is not indicative of future results. All figures are for illustrative purposes only.
            </p>
            <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
              {FUNDS.map((fund) => (
                <div
                  key={fund.id}
                  onClick={() => set("selectedFund", fund.id)}
                  style={{
                    padding: "20px 24px",
                    borderRadius: 10,
                    border: `1.5px solid ${
                      form.selectedFund === fund.id
                        ? "#c9a84c"
                        : "rgba(255,255,255,0.07)"
                    }`,
                    background:
                      form.selectedFund === fund.id
                        ? "rgba(201,168,76,0.07)"
                        : "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    position: "relative",
                  }}
                >
                  {form.selectedFund === fund.id && (
                    <div style={{
                      position: "absolute", top: 14, right: 16,
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#c9a84c",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: "#0d1117", fontWeight: 700,
                    }}>✓</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 20, color: "#e8ecf5", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", marginBottom: 2 }}>{fund.name}</div>
                      <div style={{ fontSize: 17, color: "#a0aab8" }}>{fund.strategy}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, color: "#4caf8a", fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>{fund.ytd}</div>
                      <div style={{ fontSize: 17, color: "#a0aab8" }}>YTD Performance</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 17, color: "#b0b8c8", lineHeight: 1.6, marginBottom: 14 }}>{fund.description}</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 17, color: "#a0aab8", marginBottom: 2 }}>AUM</div>
                      <div style={{ fontSize: 19, color: "#c0c8d8" }}>{fund.aum}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 17, color: "#a0aab8", marginBottom: 2 }}>Min. Investment</div>
                      <div style={{ fontSize: 19, color: "#c0c8d8" }}>{fund.minInvestment}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 17, color: "#a0aab8", marginBottom: 2 }}>Risk Level</div>
                      <div style={{ fontSize: 19, color: riskColor(fund.risk), fontWeight: 600 }}>{fund.risk}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                    {fund.tags.map((t) => (
                      <span key={t} style={{ fontSize: 17, padding: "3px 8px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.twoCol}>
              <Input
                label="Intended Investment Amount (S$)"
                value={form.investmentAmount}
                onChange={(v) => set("investmentAmount", v)}
                required
                placeholder="e.g. 500000"
                type="number"
              />
              <Select
                label="Risk Tolerance"
                required
                value={form.riskTolerance}
                onChange={(v) => set("riskTolerance", v)}
                options={[
                  { value: "conservative", label: "Conservative" },
                  { value: "moderate", label: "Moderate" },
                  { value: "aggressive", label: "Aggressive" },
                  { value: "speculative", label: "Speculative" },
                ]}
              />
            </div>
            <Select
              label="Primary Investment Objective"
              value={form.investmentObjective}
              onChange={(v) => set("investmentObjective", v)}
              options={[
                "Capital Preservation",
                "Income Generation",
                "Capital Appreciation",
                "Total Return",
                "Portfolio Diversification",
              ]}
            />
          </div>
        );

      case 6: {
        const selectedFund = FUNDS.find((f) => f.id === form.selectedFund);
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Review & Submit</h2>
            <p style={styles.stepDesc}>
              Please review your application summary before submitting for compliance review.
            </p>
            {[
              {
                title: "Investor Profile",
                fields: [
                  ["Type", form.investorType?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())],
                  ["Qualifying Criterion", form.netAssets?.replace(/_/g, " ")],
                ],
              },
              {
                title: "Personal Information",
                fields: [
                  ["Name", `${form.salutation} ${form.firstName} ${form.lastName}`.trim()],
                  ["Date of Birth", form.dob],
                  ["Nationality", form.nationality],
                  ["ID", `${form.idType}: ${form.idNumber}`],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Address", [form.address1, form.address2, form.city, form.country, form.postalCode].filter(Boolean).join(", ")],
                ],
              },
              {
                title: "Tax & Compliance",
                fields: [
                  ["Tax Residency", form.taxResidency],
                  ["TIN", form.tinNumber || "Not provided"],
                  ["US Person", form.usPerson],
                  ["CRS Status", form.crsStatus],
                ],
              },
              {
                title: "Source of Wealth",
                fields: [
                  ["Sources", form.sourceOfWealth.join(", ")],
                  ["Employment", form.employmentStatus],
                  ["PEP Status", form.pepStatus || "Not declared"],
                ],
              },
              {
                title: "Fund Selection",
                fields: [
                  ["Selected Fund", selectedFund?.name || "None"],
                  ["Investment Amount", form.investmentAmount ? `S$ ${Number(form.investmentAmount).toLocaleString()}` : "—"],
                  ["Risk Tolerance", form.riskTolerance],
                  ["Objective", form.investmentObjective],
                ],
              },
            ].map((section) => (
              <div key={section.title} style={styles.reviewSection}>
                <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 }}>{section.title.toUpperCase()}</div>
                {section.fields.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.04)", gap: 16 }}>
                    <span style={{ fontSize: 17, color: "#a0aab8", flexShrink: 0 }}>{k}</span>
                    <span style={{ fontSize: 17, color: "#c0c8d8", textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 700, letterSpacing: 1.5, marginBottom: 14 }}>CONSENTS & DECLARATIONS</div>
              <Checkbox
                checked={form.consentKYC}
                onChange={(v) => set("consentKYC", v)}
                label="I confirm that all information provided is true, accurate, and complete. I consent to Abele Asset Management performing KYC/AML verification and sharing necessary information with MAS and relevant regulatory authorities as required by law."
              />
              <Checkbox
                checked={form.consentMarketing}
                onChange={(v) => set("consentMarketing", v)}
                label="I consent to receiving fund updates, NAV reports, and investment communications from Abele Asset Management (optional)."
              />
              <Checkbox
                checked={form.consentTerms}
                onChange={(v) => set("consentTerms", v)}
                label="I have read and agree to the Abele Asset Management Terms of Business, Privacy Policy, and Risk Disclosure Statement. I acknowledge the inherent risks of alternative investments."
              />
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div style={{ ...styles.container, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 90, marginBottom: 24 }}>✦</div>
          <div style={styles.monogram}>ABELE</div>
          <h1 style={{ ...styles.heroTitle, marginTop: 24 }}>Application Submitted</h1>
          <p style={{ fontSize: 19, color: "#b0b8c8", lineHeight: 1.7, marginTop: 16 }}>
            Thank you, {form.firstName}. Your onboarding application has been submitted to our
            compliance team for review. You will receive a confirmation at{" "}
            <span style={{ color: "#c9a84c" }}>{form.email}</span> within 2 business days.
          </p>
          <div style={{ ...styles.infoBox, textAlign: "left", marginTop: 32 }}>
            <div style={{ fontSize: 17, color: "#c9a84c", fontWeight: 600, marginBottom: 10 }}>What Happens Next</div>
            {["Identity verification via SingPass or manual document review", "AML/CDD screening and source of wealth verification", "Account approval notification and fund subscription documents", "Initial investment processing and portfolio access"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <span style={{ color: "#c9a84c", fontSize: 17, fontWeight: 700, flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontSize: 17, color: "#c0c8d8" }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, fontSize: 17, color: "#8a94a8" }}>
            Reference: ABELE-{Date.now().toString(36).toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Ambient glow */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>ABELE <span style={{ color: "#c9a84c" }}>ASSET MANAGEMENT</span></div>
          <div style={{ fontSize: 17, color: "#8a94a8", letterSpacing: 1 }}>PRIVATE INVESTMENT MANAGEMENT</div>
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
              {i > 0 && (
                <div style={{
                  position: "absolute", top: 14, right: "50%", left: "-50%",
                  height: 1,
                  background: i <= step ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)",
                }} />
              )}
              <div style={{
                width: 28, height: 28, borderRadius: "50%", zIndex: 1,
                border: `1.5px solid ${i < step ? "#c9a84c" : i === step ? "#c9a84c" : "rgba(255,255,255,0.12)"}`,
                background: i < step ? "#c9a84c" : i === step ? "rgba(201,168,76,0.15)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, color: i < step ? "#0d1117" : i === step ? "#c9a84c" : "#8a94a8",
                fontWeight: 700,
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              <div style={{
                fontSize: 17, marginTop: 5, color: i === step ? "#c9a84c" : "#8a94a8",
                textAlign: "center", letterSpacing: 0.5,
                display: i === step ? "block" : "none",
              }}>
                {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={styles.card}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={styles.nav}>
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            style={{
              ...styles.btnSecondary,
              opacity: step === 0 ? 0.3 : 1,
              cursor: step === 0 ? "not-allowed" : "pointer",
            }}
          >
            ← Back
          </button>
          <div style={{ fontSize: 17, color: "#8a94a8" }}>
            Step {step + 1} of {STEPS.length}
          </div>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              style={{
                ...styles.btnPrimary,
                opacity: canProceed() ? 1 : 0.4,
                cursor: canProceed() ? "pointer" : "not-allowed",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!canProceed()}
              style={{
                ...styles.btnPrimary,
                opacity: canProceed() ? 1 : 0.4,
                cursor: canProceed() ? "pointer" : "not-allowed",
                background: canProceed() ? "linear-gradient(135deg, #c9a84c, #e8c96d)" : "#3a3a3a",
              }}
            >
              Submit Application
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 17, color: "#7a8494", letterSpacing: 0.5 }}>
          Abele Asset Management Pte Ltd · MAS CMS License · DEMO PURPOSES ONLY · Data is not transmitted or stored
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#080d16",
    backgroundImage: "radial-gradient(ellipse at 20% 0%, rgba(10,18,32,1) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(12,10,20,0.8) 0%, transparent 50%)",
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    color: "#e0e6f0",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "fixed", top: "-20%", right: "-10%",
    width: 600, height: 600, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "fixed", bottom: "-20%", left: "-10%",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(76,175,138,0.03) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  wrapper: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "32px 24px 40px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "1px solid rgba(201,168,76,0.12)",
  },
  logo: {
    fontSize: 27,
    fontWeight: 700,
    letterSpacing: 4,
    color: "#c0c8d8",
  },
  progress: {
    display: "flex",
    marginBottom: 32,
    position: "relative",
  },
  card: {
    background: "rgba(255,255,255,0.025)",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "36px 40px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
  },
  stepContent: {},
  stepTitle: {
    fontSize: 35,
    fontWeight: 700,
    color: "#e8ecf5",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  stepDesc: {
    fontSize: 19,
    color: "#a0aab8",
    lineHeight: 1.7,
    marginBottom: 28,
    borderLeft: "2px solid rgba(201,168,76,0.3)",
    paddingLeft: 12,
  },
  label: {
    display: "block",
    fontSize: 17,
    color: "#b0b8c8",
    letterSpacing: 1.2,
    marginBottom: 7,
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 7,
    border: "1.5px solid rgba(201,168,76,0.25)",
    background: "rgba(255,255,255,0.04)",
    color: "#d8e0f0",
    fontSize: 17,
    fontFamily: "'Cormorant Garamond', serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  threeCol: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    gap: 16,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    margin: "24px 0 20px",
  },
  infoBox: {
    background: "rgba(201,168,76,0.04)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: 8,
    padding: "18px 20px",
    marginBottom: 18,
  },
  warningBox: {
    display: "flex",
    alignItems: "flex-start",
    background: "rgba(232,160,69,0.08)",
    border: "1px solid rgba(232,160,69,0.25)",
    borderRadius: 6,
    padding: "10px 14px",
    marginTop: 12,
  },
  notice: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 8,
    padding: "12px 16px",
    marginTop: 24,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 32,
  },
  infoCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "20px",
    textAlign: "center",
  },
  monogram: {
    display: "inline-block",
    fontSize: 17,
    letterSpacing: 5,
    color: "#c9a84c",
    fontWeight: 700,
    border: "1px solid rgba(201,168,76,0.4)",
    padding: "6px 16px",
    borderRadius: 4,
  },
  heroTitle: {
    fontSize: 45,
    fontWeight: 700,
    color: "#e8ecf5",
    marginBottom: 16,
    letterSpacing: 0.5,
    marginTop: 20,
  },
  heroSub: {
    fontSize: 19,
    color: "#a0aab8",
    lineHeight: 1.7,
    maxWidth: 480,
    margin: "0 auto",
  },
  reviewSection: {
    background: "rgba(255,255,255,0.02)",
    borderRadius: 8,
    padding: "18px 20px",
    marginBottom: 12,
    border: "1px solid rgba(255,255,255,0.05)",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    padding: "0 4px",
  },
  btnPrimary: {
    padding: "12px 28px",
    borderRadius: 7,
    border: "none",
    background: "rgba(201,168,76,0.15)",
    color: "#c9a84c",
    fontSize: 17,
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 600,
    letterSpacing: 0.5,
    border: "1px solid rgba(201,168,76,0.4)",
    transition: "all 0.2s",
  },
  btnSecondary: {
    padding: "12px 28px",
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#a0aab8",
    fontSize: 17,
    fontFamily: "'Cormorant Garamond', serif",
    transition: "all 0.2s",
  },
};
