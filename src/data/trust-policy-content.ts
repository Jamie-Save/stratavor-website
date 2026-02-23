import type { PolicySection } from "@/components/PolicyPageLayout";

function sect(heading: string, content: string): PolicySection {
  return { heading, content };
}

const CYBER_SECURITY: PolicySection[] = [
  sect(
    "Policy Brief and Purpose",
    "Stratavor's Cyber Security Policy outlines our approach to preserving the security of the Company's data and technology infrastructure. As a technology-driven company, we recognize that relying on digital systems comes with vulnerabilities and threats such as human error, cyber-attacks, or system failures could cause financial loss or damage our reputation.\n\nTherefore, Stratavor has implemented a number of security measures and provides guidance to mitigate these risks. This policy serves to inform all personnel of their responsibilities in maintaining cyber security and to establish protocols for protecting our information assets."
  ),
  sect(
    "Scope",
    "This policy applies to all Stratavor staff and partners who have access to our systems or data, including employees, contractors, interns, freelancers, and any third parties with whom we share systems access. It covers all devices (company-issued or personal devices used for work), all IT systems, cloud services, software applications, and data located on or handled through Stratavor's network."
  ),
  sect(
    "Policy Elements",
    "The following key elements form the basis of Stratavor's cyber security measures:\n\nDevice Security: When using any digital devices (laptops, smartphones, tablets) to conduct Stratavor business or access company accounts, staff must follow strict security practices. This includes: Not using personal devices for work unless they meet Stratavor's security standards and are authorized. Avoid accessing company systems from public or untrusted devices. Ensuring devices are not left unattended in unsecured locations; use screen lock and physically secure devices when not in use. Applying all security patches and system/software updates in a timely manner (at least monthly, or as soon as critical updates are available). Installing and regularly updating reputable antivirus/anti-malware software on devices. Keeping all devices password-protected with strong, unique passwords or passphrases.\n\nNetwork Security: Access to Stratavor's internal systems and accounts should only occur over secure networks. Employees and contractors must: Ensure that any Wi-Fi network used for work (e.g., home network) is secured with strong encryption (WPA2/WPA3) and a strong router password. Not create insecure network hotspots or share network access with unauthorized users. Use secure, private networks or a trusted VPN when accessing company resources remotely. Public Wi-Fi networks should be avoided or used only in conjunction with a VPN.\n\nAccount Security: All accounts (email, internal tools, cloud services) must be protected. Credential Management: Never share passwords or authentication tokens. Do not reuse Stratavor passwords on other services. If you suspect any account credentials are compromised, notify IT/security personnel immediately and change the password. Access Controls: Access to systems is granted on a need-to-use basis. Employees should only have access to the data and systems required for their role. Higher-privilege accounts (like admin accounts) are limited to authorized personnel and used sparingly. Strong Authentication: Use strong passwords and enable multi-factor authentication (MFA) on all Stratavor accounts wherever possible.\n\nData Transfer and Storage: When transferring or storing data, precautions must be taken to preserve security. Classify data (public, internal, confidential) and handle it according to its classification. Store data in Stratavor-approved cloud storage or databases that have proper security measures; avoid unapproved personal cloud accounts for company data. Avoid sending sensitive information over email or messaging unless absolutely necessary and encrypted. Use encrypted communication channels for sensitive data."
  ),
  sect(
    "Incident Reporting",
    "All staff must be vigilant and immediately report any suspected cyber security incidents or weaknesses. This includes lost or stolen devices, suspicious emails (possible phishing), unexpected system behavior, or any possibility that confidential data has been compromised. Report incidents as soon as discovered. Quick reporting allows us to take containment measures to minimize damage."
  ),
  sect(
    "Incident Response",
    "Stratavor has procedures in place to respond to security incidents. Upon report of a potential breach or incident, we will investigate promptly, mitigate any security threats, inform affected parties as required, and take steps to prevent recurrence. Where required by law (such as certain data breaches under GDPR or other regulations), we will notify authorities and individuals whose data might be affected."
  ),
  sect(
    "Business Continuity",
    "We perform regular backups of critical data to secure, off-site locations to ensure business continuity in case of a cyber incident or outage. Employees should save work on approved cloud storage that is backed up. In the event of a system failure or attack (like ransomware), we have recovery procedures to restore operations from backups with minimal data loss."
  ),
  sect(
    "Employee Responsibilities",
    "Cyber security is everyone's responsibility. Each Stratavor team member must: When in doubt about a security matter, ask our IT/Security team for guidance. Keep personal use of Stratavor devices or accounts to a minimum and ensure it does not introduce risks. Exercise good judgment online – for example, do not open attachments or click on links from unknown senders (to prevent phishing and malware). Adhere to the guidelines set in this policy and complete any required security awareness training. Software Use: Only use authorized and licensed software for company work. Do not install unapproved software on company systems as it may contain vulnerabilities or malware. All software should be kept updated. Be cautious of downloading attachments or clicking links – verify the source to avoid phishing."
  ),
  sect(
    "Management Responsibilities",
    "Stratavor's management will support strong cyber security by providing necessary tools, training, and enforcement of this policy. We will regularly assess risks and update security measures accordingly. Management will also conduct periodic audits or reviews of compliance with cyber security practices."
  ),
  sect(
    "Disciplinary Action",
    "Violations of this Cyber Security Policy (e.g., deliberate breach of data security, negligence leading to a breach, or ignoring security protocols) may result in disciplinary action. Depending on severity, consequences range from additional training and warnings up to termination of contract or legal action if laws were broken. Our aim is not to punish accidental mistakes but to prevent incidents; however, reckless or intentional disregard for security is taken very seriously."
  ),
  sect(
    "Review and Updates",
    "This policy will be reviewed at least biannually and updated as needed to address emerging threats, new technologies, or changes in Stratavor's IT environment. We stay informed about the latest cyber security trends and adapt our policies to ensure ongoing protection.\n\nBy following this Cyber Security Policy, Stratavor and its personnel work together to create a secure digital environment, protecting our data assets and maintaining the trust of our clients and stakeholders."
  ),
];

const COOKIE_POLICY: PolicySection[] = [
  sect(
    "1. Scope",
    "This policy explains how Stratavor uses cookies and similar technologies on our website and any Stratavor-branded web applications that link to it. It is written to align with UK PECR / ePrivacy and UK/EU GDPR requirements."
  ),
  sect(
    "2. Why We Use Cookies",
    "We use cookies to: (with consent) support marketing attribution and campaign effectiveness; understand site usage and improve performance; remember your settings (including cookie preferences); provide core site functionality and security.\n\nOur site runs on HubSpot with HubSpot's standard cookie settings. HubSpot acts as a sub-processor for the cookies it sets; see our Sub-processor Register for details."
  ),
  sect(
    "3. Legal Basis",
    "Strictly necessary cookies: set without consent based on legitimate interests and/or performance of a contract. All other cookies: set only after consent via our banner or settings panel. Consent may be withdrawn at any time (see Section 7)."
  ),
  sect(
    "4. Consent Management (Banner)",
    "On first visit, we present a HubSpot consent banner with options to Accept all, Reject non-essential, or manage Cookie settings (granular). We store a consent record containing your choices, banner version, timestamp, hashed IP, and user agent. Consent records are retained for 24 months unless you request deletion sooner."
  ),
  sect(
    "5. Cookies We Set",
    "The list below reflects HubSpot's standard setup. Cookie names and durations may change as HubSpot evolves. We run a quarterly scan and update this page and our consent management configuration accordingly.\n\nA. Strictly Necessary (Always Active): Site session cookie (e.g., JSESSIONID) – Core session/security (session); hs_ab_test – A/B testing routing (session); __hs_opt_out – Records opt-out of non-essential cookies (6 months); __hs_cookie_cat_pref – Stores cookie category choices (6 months); __hssrc – Session continuity (session); __hssc – HubSpot session management (30 minutes).\n\nB. Preferences / Functionality (Consent): hs-messages-is-open – Chat open/closed state (30 minutes); hs-messages-hide-welcome-message – Chat welcome suppression (1 day); hs_langswitcher_choice – Stores language selection (2 years); __hs_do_not_track – Prevents tracking when enabled (6 months).\n\nC. Analytics / Performance (Consent): hubspotutk – Visitor identifier for analytics and forms (6 months); __hstc – Main HubSpot visitor tracking (6 months).\n\nD. Marketing / Attribution (Consent, If Enabled): We do not store payment card numbers or sensitive authentication data in cookies. Where third-party pixels or ad tools are enabled, those providers may set their own cookies and control their own retention."
  ),
  sect(
    "6. Third-Party Cookies and Embedded Content",
    "Embedded third-party content (such as video or maps) or ad integrations may place cookies on your device. These are blocked by default and will only run after opt-in via Cookie settings."
  ),
  sect(
    "7. How to Change or Withdraw Consent",
    "Use the Cookie settings link in our footer at any time to review or change your choices, or select Reject non-essential to withdraw consent. Clearing cookies in your browser will also remove stored preferences, including opt-outs. To make a data request related to cookies (access or deletion), email privacy@stratavor.com."
  ),
  sect(
    "8. Data Retention (Cookie-Related)",
    "Diagnostic or error logs: 180 days (with PII redaction thereafter). Aggregated analytics reports: up to 13 months. Consent records: 24 months."
  ),
  sect(
    "9. Review Cadence",
    "We perform a cookie and third-party script scan quarterly and after material front-end changes. Any new cookie requires product and privacy approval before deployment."
  ),
  sect(
    "10. Changes to This Policy",
    "This policy will be updated if our cookie usage or providers change. Material updates may trigger a renewed consent prompt where required."
  ),
  sect(
    "11. Questions and Escalation",
    "Questions may be sent to privacy@stratavor.com. If unresolved, you may contact your local supervisory authority such as the UK ICO or the Data Protection Commission (Ireland)."
  ),
];

const TERMS_OF_USE: PolicySection[] = [
  sect(
    "Introduction",
    "These Terms of Use (“Terms”) govern your access to and use of the Stratavor platform and related services (the “Service”) provided by Stratavor Limited, an Irish company (“Stratavor”, “we”, “our”, or “us”). By creating an account, connecting an integration, or otherwise using the Service, you agree to be bound by these Terms on your own behalf or on behalf of your organisation. If you accept these Terms on behalf of an organisation, you represent that you have authority to bind that organisation."
  ),
  sect(
    "1. Definitions",
    "Subscription: your paid plan as specified during ordering or in an order form. Intellectual property rights: all intellectual property rights worldwide. Confidential information: non-public information designated or reasonably understood as confidential. Customer data: any data you or invited users connect, upload, import, or provide to the Service. Service / software: Stratavor's web applications, APIs, integrations, reporting engines, and documentation. Invited user: any person you authorise to access your tenant or data. Customer, you, your: the organisation or individual accepting these Terms. Agreement: these Terms and any incorporated policies, addenda, order forms, or statements of work."
  ),
  sect(
    "2. Scope and Changes",
    "2.1 Scope. These Terms apply to all use of the Service, including beta features, AI-assisted features, and integrations.\n\n2.2 Updates. We may update these Terms or the Service from time to time. Material changes will be notified by email or in-product notice."
  ),
  sect(
    "3. Accounts, Invited Users, and Access",
    "3.1 Tenant ownership. You control access within your tenant and remain responsible for invited users.\n\n3.2 Credentials. Login credentials must be kept confidential; suspected compromise must be reported promptly.\n\n3.3 Acceptable use. You agree not to copy, reverse-engineer, resell, misuse, or interfere with the Service.\n\n3.4 Fair use. Reasonable technical limits may apply and will be communicated when material."
  ),
  sect(
    "4. Subscriptions, Billing, and Taxes",
    "4.1 Fees. Fees are billed in advance and subscriptions auto-renew unless cancelled.\n\n4.2 Payment. Invoices are due upon receipt; you are responsible for applicable taxes.\n\n4.3 Price changes. Pricing adjustments will be notified in advance.\n\n4.4 Discounts. Discounts may be withdrawn if payment obligations are not met."
  ),
  sect(
    "5. Third-Party Integrations and Customer Data",
    "5.1 Authorised access. You authorise access to third-party systems solely to provide the Service.\n\n5.2 Ownership. You retain ownership of customer data; Stratavor receives a limited licence to process it.\n\n5.3 Third-party terms. Use of third-party services is governed by their terms.\n\n5.4 Backups. You are responsible for maintaining your own data backups."
  ),
  sect(
    "6. AI-Assisted Features",
    "6.1 Nature of outputs. AI outputs are informational only and not professional advice.\n\n6.2 Verification. You are responsible for reviewing AI-generated content.\n\n6.3 Data handling. Customer data is not used to train third-party foundation models."
  ),
  sect(
    "7. Security, Privacy, and Data Protection",
    "7.1 Security. We implement measures appropriate to risk; no system is 100% secure.\n\n7.2 Privacy Policy. Our Privacy Policy explains data collection and processing.\n\n7.3 DPA. Our Data Processing Agreement applies where we process personal data on your behalf.\n\n7.4 Confidentiality. Each party will protect the other's confidential information."
  ),
  sect(
    "8. Service Availability and Support",
    "8.1 Availability. We aim for high availability but may perform maintenance.\n\n8.2 Support. Contact support@stratavor.com for unresolved issues."
  ),
  sect(
    "9. Intellectual Property",
    "9.1 Stratavor IP. Stratavor owns all IP in the Service.\n\n9.2 Customer data. You warrant rights to supply and authorise processing.\n\n9.3 Feedback. Feedback may be used without obligation."
  ),
  sect(
    "10. Warranties and Disclaimers",
    "The Service is provided “as is” and “as available” without warranties."
  ),
  sect(
    "11. Indemnity",
    "You agree to indemnify Stratavor for claims arising from misuse or breach of these Terms."
  ),
  sect(
    "12. Termination",
    "Either party may terminate for convenience with 30 days' notice. We may suspend or terminate for breach or non-payment."
  ),
  sect(
    "13. Limitation of Liability",
    "Liability is capped at fees paid in the prior 12 months, to the maximum extent permitted by law."
  ),
  sect(
    "14. Governing Law",
    "These Terms are governed by the laws of Ireland and subject to Irish courts."
  ),
  sect(
    "15. Beta Features",
    "Beta or preview features are provided without warranty and may be withdrawn."
  ),
  sect(
    "16. Notices and Assignment",
    "Notices are delivered by email. Assignment requires consent, except to affiliates or acquirers."
  ),
  sect(
    "17. Entire Agreement",
    "These Terms, together with incorporated policies and order forms, constitute the entire agreement between you and Stratavor."
  ),
];

const CUSTOMER_PRIVACY: PolicySection[] = [
  sect(
    "Who We Are",
    "Stratavor (the “Company”) is committed to protecting the privacy and security of our customers' personal information. Stratavor is a registered business entity in Ireland. You may contact us at info@stratavor.com for any questions regarding this notice or your personal data. For the purposes of data protection law (including the EU General Data Protection Regulation (GDPR), where applicable), Stratavor acts as the data controller of your personal information, determining how and why it is processed."
  ),
  sect(
    "Purpose of This Notice",
    "This Customer Privacy Notice explains how Stratavor collects, uses, and safeguards personal data when you interact with our websites, products, and services, or otherwise communicate with us. This notice supplements any other privacy or fair processing notices we may provide on specific occasions and is not intended to override them."
  ),
  sect(
    "Data We Collect",
    "Stratavor may collect various types of personal data, including contact details (such as name, email address, phone number, billing or shipping address), account login credentials, and payment information (processed via secure payment providers). We also collect technical data such as IP address, browser type, and usage analytics via cookies, in accordance with our Cookie Policy. Where specific data collection applies, we will inform you at the point of collection."
  ),
  sect(
    "How We Use Your Data",
    "Providing Services: To create and manage accounts, deliver services, process transactions, and send service-related communications. Customer Support: To respond to inquiries, support requests, or feedback. Personalization and Improvements: To improve functionality, fix issues, and inform product development. Marketing Communications: To send updates or promotions where permitted by law or with consent. You may opt out at any time. Legal Compliance and Security: To meet legal obligations, enforce terms, and detect or prevent fraud or security incidents. We will only use personal data for the purposes for which it was collected unless a compatible and lawful reason applies, in which case you will be informed."
  ),
  sect(
    "Legal Basis for Processing",
    "Contractual necessity; Legitimate interests; Consent; Legal obligation."
  ),
  sect(
    "Disclosure of Data",
    "Stratavor does not sell personal data. We may share data with: Service Providers operating under contractual safeguards; Business Partners where participation is requested or consented; Regulators or Authorities where legally required; Successor Entities in the event of a corporate transaction."
  ),
  sect(
    "Data Security",
    "We implement appropriate technical and organizational safeguards, including encryption, access controls, secure infrastructure, and staff training. While no system is 100% secure, we continuously improve our protections."
  ),
  sect(
    "Data Retention",
    "Personal data is retained only for as long as necessary to fulfill its purpose or comply with legal requirements. Data is securely deleted or anonymized when no longer required."
  ),
  sect(
    "Your Rights",
    "Depending on applicable law, your rights may include: Access; Rectification; Erasure; Restriction; Data portability; Objection; Withdrawal of consent; Complaint to a supervisory authority. To exercise these rights, contact info@stratavor.com."
  ),
  sect(
    "International Data Transfers",
    "Where personal data is transferred outside the EEA or similar jurisdictions, Stratavor ensures appropriate safeguards such as standard contractual clauses or recognized certification frameworks."
  ),
  sect(
    "Cookies and Tracking",
    "We use cookies and similar technologies to provide and improve services. You may manage cookies through your browser settings, though disabling them may affect functionality."
  ),
  sect(
    "Third-Party Websites",
    "This notice does not apply to third-party websites or services linked from our platforms. Please review their privacy policies separately."
  ),
  sect(
    "Changes to This Notice",
    "We may update this Customer Privacy Notice periodically. Significant changes will be communicated appropriately, and the effective date will reflect the latest revision. By using Stratavor's services, you acknowledge that you have read and understood this notice."
  ),
];

const WHISTLEBLOWING: PolicySection[] = [
  sect(
    "1. Purpose",
    "Stratavor is committed to the highest standards of ethics, compliance, and transparency. This policy enables anyone who works with Stratavor, employees, contractors, interns, advisors, and vendors to report suspected wrongdoing or risks safely and, if desired, anonymously."
  ),
  sect(
    "2. Scope",
    "This policy applies to all Stratavor personnel and third parties working with or on behalf of Stratavor in any country."
  ),
  sect(
    "3. What to Report",
    "Financial misconduct, fraud, bribery, corruption, or kickbacks; Breaches of law or policy (e.g., data protection, cybersecurity, human rights); Harassment, discrimination, bullying, retaliation, or conflicts of interest; Health & safety risks, environmental harm, or unsafe work practices; Manipulation of data, accounting irregularities, or misrepresentation to clients/investors; Any attempt to conceal, destroy, or tamper with evidence of the above."
  ),
  sect(
    "4. How to Report",
    "You may use any of the following channels: Dedicated email: privacy@stratavor.com (access restricted to ESG & Compliance Lead). CEO/Founder escalation (if the issue involves the ESG Lead): jgoodwin@stratavor.com. Anonymous web form: link to be provided on the internal wiki and contractor onboarding pack. Emergency situations: In emergencies or imminent risk of harm, contact local emergency services first."
  ),
  sect(
    "5. Non-Retaliation and Confidentiality",
    "Retaliation against anyone who raises a concern in good faith is strictly prohibited and will result in disciplinary action, up to and including termination of contract. Stratavor will treat reporter identity and report details as confidential, sharing only with those who need to know to investigate and remediate."
  ),
  sect(
    "6. Investigation Process and Timelines",
    "Acknowledgement: We aim to acknowledge receipt within 5 business days. Triage and Assignment: The ESG & Compliance Lead (or designee) assigns an investigator not implicated in the matter. Fact-Finding: Interviews, document review, and evidence gathering (target completion within 30 calendar days where practical). Outcome and Actions: Findings and corrective actions will be documented; a summary (to the extent legally possible) will be provided to the reporter. Escalation: Serious or criminal matters may be escalated to the Board and/or relevant authorities."
  ),
  sect(
    "7. Records and Data Protection",
    "Investigation records will be retained securely for at least seven (7) years, or longer where required by law. Personal data will be handled in accordance with Stratavor's Privacy Notice and applicable data protection laws (e.g., GDPR)."
  ),
  sect(
    "8. External Reporting",
    "Nothing in this policy restricts your right to report concerns directly to competent regulators or law enforcement, or to seek independent legal advice."
  ),
  sect(
    "9. Roles and Responsibilities",
    "All Personnel & Vendors: Raise concerns in good faith and cooperate with investigations. Managers: Foster a speak-up culture, promptly escalate concerns, and support investigations. ESG & Compliance Lead: Owns this policy, receives and triages concerns, ensures fair investigations, and reports annually to the Board."
  ),
  sect(
    "10. Related Policies",
    "Code of Conduct; Anti-Corruption & Anti-Bribery; Human Rights; Health & Safety; Cyber Security; Customer Privacy Notice; Environmental Policy."
  ),
];

const ANTI_CORRUPTION: PolicySection[] = [
  sect(
    "Introduction",
    "This Anti-Corruption and Anti-Bribery policy exists to set out the Company's zero-tolerance position on bribery and corruption."
  ),
  sect(
    "Persons to whom this policy applies",
    "This policy applies to the Company, and all those who work for and on behalf of the Company, including: all individuals working at all levels within the Company; all directors and officers of the Company; all agents and contractors acting on behalf of the Company; all subsidiaries of the Company, and their employees, directors and officers, agents and contractors, in each case wherever located."
  ),
  sect(
    "Purpose of this policy",
    "The Company is committed to conducting business in an ethical and honest manner, to acting professionally, fairly, and with integrity in all business dealings and relationships wherever it operates and to implementing and enforcing systems that ensure all forms of bribery, corruption, and fraud are prevented. The purposes of this policy are: to act as a source of information and guidance for those individuals working in and on behalf of the Company; to establish controls to ensure the Company's compliance with all applicable laws and regulations relating to anti-bribery and corruption (including the Criminal Justice (Corruption Offences) Act 2018); to assist in ensuring that the Company's business is conducted in a socially responsible manner. The Company is committed to upholding all laws relevant to countering bribery and corruption in all jurisdictions in which it operates. However, the Company remains bound by the laws in Ireland in respect of its conduct both at home and abroad."
  ),
  sect(
    "What is bribery and corruption?",
    "Corruption can be broadly defined as the misuse of an office or power for private gain. Irish law corruption offences are predicated on the concept of acting “corruptly” which includes acting with an improper purpose personally or by influencing another person. Bribery is a form of corruption and can be defined as the offering, promising, giving, accepting, requesting, obtaining or soliciting of an advantage for an improper purpose. Bribes may include, but are not limited to: gifts and excessive or inappropriate entertainment, hospitality, travel and accommodation expenses; payments, whether by employees or business partners such as recruiters, labour service providers or consultants; charitable and political contributions; facilitation payments; other 'favours' provided to supervisors. It is not necessary for the individual or organisation to actually receive any benefit as a result of the bribe in order for an offence to have been committed."
  ),
  sect(
    "Gifts and Hospitality",
    "The Company appreciates that the practice of giving business gifts and hospitality varies between countries and regions. The test to be applied is whether, in all the circumstances, the gift or hospitality is reasonable and justifiable. The intention behind the gift should always be considered."
  ),
  sect(
    "Records",
    "The Company will keep detailed and accurate financial records and will have appropriate internal controls in place which will evidence the business reason for making payments to third parties. All individuals must declare and keep a written record of all hospitality, or gifts accepted or offered, which will be subject to managerial review. Gifts and hospitality with a monetary value in excess of €50 must not be accepted without the prior approval of Jonathan Goodwin."
  ),
  sect(
    "Training, Review and Monitoring",
    "Responsibility for the development, implementation, and adherence of this policy within the Company is Jamie Saveall. Management at all levels are responsible for ensuring those reporting to them are made aware of and understand this policy and are given adequate and regular training on it. The Company will provide training on this policy as part of the induction process for all new employees. The board of directors of the Company will maintain, review, and develop this policy and all steps and due diligence exercised by the Company to avoid bribery and corruption as required in response to changing circumstances. The board of directors will continue to monitor the effectiveness and review the implementation of this policy regularly (and not less than once annually). Any improvements identified will be made as soon as possible. Changes to this policy are subject to the approval of the board of directors of the Company."
  ),
  sect(
    "Whistleblowing",
    "All persons subject to this policy have a responsibility to read, be aware of the contents of, and understand this policy and report any cases of suspected or actual bribery and corruption. To make a confidential or anonymous report please use our Confidential Reporting Questionnaire. Reports may also be made to the ESG & Compliance Lead (Jamie Saveall) or to the Chair of the Board. We will acknowledge receipt within 5 business days."
  ),
  sect(
    "Penalties",
    "The Company takes this policy very seriously. Failure to comply puts both the Company and the individual at risk of a criminal offence, which carries severe penalties. Due to the seriousness of these penalties, failure to comply with any requirement under this policy may lead to disciplinary action under the Company's procedures, including dismissal for gross misconduct. The Company reserves the right to terminate contractual relationships with third party representatives if they breach this policy. This policy does not form part of any employee's contract of employment and it may be amended at any time."
  ),
];

const ENVIRONMENTAL: PolicySection[] = [
  sect(
    "Mission Statement",
    "Stratavor recognizes its responsibility to minimize its impact on the environment and to contribute positively to environmental sustainability. We are committed to reducing our environmental footprint and continually improving our environmental performance as an integral part of our business strategy. Even as a growing technology company with primarily remote operations, we endeavor to incorporate sustainability into our decision-making. We will work with our clients, suppliers, and other stakeholders to promote environmental stewardship and encourage environmentally friendly practices across our value chain. Our aim is to deliver high-quality services to our customers in a manner that is compatible with protecting the planet for future generations."
  ),
  sect(
    "Responsibility and Oversight",
    "The Board of Directors is responsible for ensuring this Environmental Policy is implemented effectively. However, environmental responsibility is shared by all Stratavor team members. Every employee, contractor, and partner is expected to be aware of this policy, integrate its practices into their work, and actively look for opportunities to reduce our environmental impact. We will provide guidance and encourage all colleagues to contribute ideas for improvement."
  ),
  sect(
    "Environmental Objectives",
    "Climate Change and Carbon Footprint: Strive to achieve net-zero carbon emissions by 2030, aligning with science-based targets. As a largely remote company, our direct emissions are low; however, we will minimize business travel (favoring virtual meetings) and use carbon offsetting or renewable energy credits to mitigate emissions. We commit to measuring our carbon footprint annually and implementing reduction strategies.\n\nEnergy Efficiency: Promote the use of renewable energy and energy-efficient technology. We choose cloud and hosting providers that utilize renewable energy for their data centers whenever possible. Our team is encouraged to conserve energy.\n\nWaste Reduction: Follow the principles of waste prevention, reduction, re-use, and recycling. In our primarily digital operations, this includes minimizing paper use, properly recycling electronic waste through certified e-waste recyclers, and eliminating single-use items.\n\nWater Conservation: Although Stratavor's direct operations have limited water usage, we commit to decreasing water consumption wherever possible.\n\nSustainable Procurement: Integrate environmental considerations into our procurement decisions. We endeavor to work with suppliers and vendors who demonstrate environmentally responsible practices.\n\nTravel and Commuting: Since Stratavor's workforce is remote, daily commuting is largely eliminated. We will track business travel emissions and set internal policies to avoid unnecessary trips by using video conferencing and other collaboration tools.\n\nAwareness and Engagement: Foster a culture of environmental awareness. We provide information and resources to our employees and contractors on how to work more sustainably.\n\nCompliance and Beyond: Ensure compliance with all relevant environmental legislation and regulations. Our commitment goes beyond compliance to proactively adopting best practices."
  ),
  sect(
    "Monitoring and Reporting",
    "We will monitor our performance against the above objectives on a regular basis. This includes tracking key metrics such as energy consumption, carbon emissions, and waste/recycling amounts. The designated sustainability lead will compile an annual report to the Board summarizing our environmental performance and progress toward targets. Where appropriate, we will communicate our environmental efforts and progress externally to demonstrate our commitment to ESG principles."
  ),
  sect(
    "Continuous Improvement",
    "Environmental sustainability is an ongoing journey. Stratavor is committed to continuously improving its environmental management. This policy, and the objectives within it, will be reviewed at least annually and updated as necessary. We encourage feedback from employees and stakeholders on our environmental practices.\n\nBy following this Environmental Policy, Stratavor seeks to operate in an ecologically responsible way that supports the long-term sustainability of our business and the planet."
  ),
];

const DEI: PolicySection[] = [
  sect(
    "Purpose",
    "Stratavor is committed to building a diverse, equitable, and inclusive company where people of all backgrounds can do their best work and be treated with dignity and respect. We believe diverse teams create better products, decisions, and outcomes for our customers and society."
  ),
  sect(
    "Our Commitments",
    "Equal Opportunity: Employment decisions (hiring, promotion, compensation, termination) are based on merit, qualifications, and business needs, never on protected characteristics.\n\nInclusive Hiring: We use structured interviews and consistent criteria, and we advertise roles broadly to reach diverse talent pools.\n\nPay Equity and Progression: We aim for fair pay for equal work and periodic reviews to address potential gaps. Career progression criteria will be transparent and job-related.\n\nAccessibility and Flexible Work: As a remote-first company, we provide reasonable accommodations and flexible working practices to enable full participation.\n\nHarassment-Free Workplace: Harassment, discrimination, bullying, or microaggressions are not tolerated. Concerns may be reported confidentially via the Speak-Up channels in our Whistleblowing Policy.\n\nLearning and Culture: We will provide periodic awareness and inclusion training appropriate to our size and stage, and we encourage open feedback to continuously improve."
  ),
  sect(
    "Data, Privacy and Measurement",
    "Where lawful and with consent, Stratavor may invite voluntary self-identification to understand representation and inclusion. Any demographic data will be kept confidential and used only in aggregated form to inform improvements. We intend to publish an annual DEI snapshot (representation, hiring slates, and pay-equity checks) when sample sizes allow meaningful privacy-preserving reporting."
  ),
  sect(
    "Responsibilities and Governance",
    "Board/Founder: Set tone and hold leadership accountable for DEI progress. ESG & Compliance Lead: Coordinates DEI initiatives and reporting, and ensures alignment with local laws. Managers & Team Members: Model inclusive behaviors, challenge bias, and participate in training and feedback."
  ),
  sect(
    "Related Policies",
    "Code of Conduct; Human Rights Policy; Whistleblowing (Speak-Up) Policy; Health & Safety; Anti-Harassment & Anti-Discrimination (within Code)."
  ),
];

// Placeholder content for policies not fetched (same structure, summary text)
const PLACEHOLDER_SECTIONS = (title: string): PolicySection[] => [
  sect(
    "Overview",
    `This document outlines Stratavor's commitments and approach regarding ${title}. Full policy content is maintained internally and may be provided on request for due diligence. Contact privacy@stratavor.com or your Stratavor account contact for the complete policy.`
  ),
];

const POLICY_CONTENT: Record<string, { title: string; sections: PolicySection[] }> = {
  "cyber-security": { title: "Cyber Security Policy", sections: CYBER_SECURITY },
  "cookie-policy": { title: "Cookie Policy", sections: COOKIE_POLICY },
  "terms-of-use": { title: "Terms of Use", sections: TERMS_OF_USE },
  "customer-privacy": { title: "Customer Privacy Notice", sections: CUSTOMER_PRIVACY },
  "whistleblowing": { title: "Whistleblower Policy", sections: WHISTLEBLOWING },
  "anti-corruption-anti-bribery": {
    title: "Anti-Corruption & Anti-Bribery",
    sections: ANTI_CORRUPTION,
  },
  environmental: { title: "Environmental Policy", sections: ENVIRONMENTAL },
  dei: { title: "DEI Policy", sections: DEI },
  "responsible-ai": {
    title: "Responsible AI Policy",
    sections: PLACEHOLDER_SECTIONS("Responsible AI and human-aligned outcomes"),
  },
  "human-rights": {
    title: "Human Rights Policy",
    sections: PLACEHOLDER_SECTIONS("human rights across our people, suppliers, and operations"),
  },
  "data-protection": {
    title: "Data Protection Policy",
    sections: PLACEHOLDER_SECTIONS("data protection, retention, and governance"),
  },
};

const DPA_SECTIONS: PolicySection[] = [
  sect(
    "1. Definitions",
    '"Data Protection Laws" means the EU General Data Protection Regulation 2016/679 ("GDPR"), any supplementary national legislation, and, where applicable, the UK GDPR. "EU SCCs" means the Standard Contractual Clauses annexed to Commission Implementing Decision (EU) 2021/914, as may be amended or replaced. "Sub-processor" means another processor engaged by Stratavor to process Personal Data on behalf of Customer.'
  ),
  sect(
    "2. Roles and Scope",
    "2.1 Customer acts as Controller and Stratavor acts as Processor with respect to the Personal Data processed under the MSA and this DPA.\n\n2.2 The subject-matter, nature and purpose of processing, the categories of Personal Data and Data Subjects are described in Annex I."
  ),
  sect(
    "3. Processor Obligations",
    "Stratavor shall: (a) process Personal Data only on documented instructions from Customer, including transfers to a third country; (b) ensure persons authorised to process Personal Data are bound by confidentiality; (c) implement the technical and organisational measures set out in Annex II; (d) notify Customer without undue delay of a Personal Data Breach; (e) assist Customer with Data Subject requests, DPIAs and supervisory-authority consultations; (f) delete or return Personal Data at termination, subject to legal retention obligations; (g) make available information necessary to demonstrate compliance and allow for audits in accordance with clause 7."
  ),
  sect(
    "4. Sub-processing",
    "4.1 Customer hereby grants general authorisation for Stratavor to engage Sub-processors listed in Annex III. Stratavor shall impose on each Sub-processor the same data-protection obligations as set out in this DPA.\n\n4.2 Stratavor will notify Customer in advance of any intended changes concerning the addition or replacement of Sub-processors, giving Customer ten (10) days to object on reasonable grounds."
  ),
  sect(
    "5. International Transfers",
    "Where Stratavor or its Sub-processors process Personal Data outside the EEA, Stratavor shall ensure such processing is subject to a lawful transfer mechanism under Chapter V GDPR, including the EU SCCs."
  ),
  sect(
    "6. Liability and Indemnity",
    "Liability under this DPA is subject to the limitations set forth in the MSA."
  ),
  sect(
    "7. Audit",
    "Upon written request no more than once per year, Stratavor shall provide audit summaries. On-site audits may be conducted at Customer's cost with 30 days' notice and subject to confidentiality."
  ),
  sect(
    "8. Term",
    "This DPA remains in force for the term of the MSA and so long as Stratavor processes Personal Data for Customer."
  ),
  sect(
    "ANNEX I – Data Processing Details",
    "Controller: Customer entity identified in Order Form. Processor: Stratavor Limited.\n\nSubject-matter: Ingestion, transformation, aggregation and visualisation of financial and operational data to generate Board-Pack slides/dashboards hosted on the Stratavor SaaS platform.\n\nNature & Purpose: Cloud storage, computation, analytics, AI-assisted insight generation, and web-based presentation to authorised users.\n\nCategories of Personal Data: Employee identifiers (name, email), customer/vendor contact details, transaction-level meta-data, usage logs, optional HR metrics.\n\nData Subjects: Customer employees, contractors, customers and suppliers.\n\nSpecial Categories: None intentionally processed.\n\nDuration: Subscription Term plus 60 days secure retention for export, then deletion."
  ),
  sect(
    "ANNEX II – Technical & Organisational Measures",
    "Access Control: Role-based access, MFA for all admin interfaces. Encryption: AES-256 at rest, TLS 1.2+ in transit. Network Security: Segmented VPC, WAF, continuous vulnerability scanning. Monitoring: 24×7 log aggregation, SIEM alerts, automated anomaly detection. Business Continuity: Daily backups with geo-redundancy; board-pack files replicated across zones. Secure Development: OWASP-aligned SDLC, peer code reviews, dependency scanning. Vendor Management: Sub-processor security due-diligence and annual review. Physical Security: Cloud provider data-centre certified ISO 27001, SOC 2 Type II."
  ),
  sect(
    "ANNEX III – Authorised Sub-processors",
    "Stratavor's authoritative Sub-processor Register is maintained and published. Material updates are version-controlled and notified in accordance with this DPA. View the current Sub-processor Register on the Trust centre (Sub-processor Register page)."
  ),
];

export function getPolicyContent(slug: string): { title: string; sections: PolicySection[] } | null {
  if (slug === "dpa") {
    return { title: "Data Processing Agreement (DPA)", sections: DPA_SECTIONS };
  }
  return POLICY_CONTENT[slug] ?? null;
}
