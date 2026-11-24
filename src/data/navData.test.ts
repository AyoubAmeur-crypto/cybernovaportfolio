import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_VIDEO_URL,
  PORTFOLIO_OWNER,
  getNextDropdownState,
  hasDropdown,
} from './navData';
import {
  CERTIFICATIONS,
  COLLABORATORS,
  CONTACT_DELIVERY_EMAIL,
  CORE_EXPERTISE_DOMAINS,
  PROJECT_CASE_STUDIES,
  SALMA_PROFILE,
  SECURITY_METHODOLOGY_STEPS,
  TECHNICAL_ECOSYSTEM,
  TESTIMONIALS,
  getPublishedCertifications,
  getPublishedCollaborators,
  getPublishedProjects,
  getPublishedTestimonials,
  getVisibleNavLinks,
} from './portfolioData';
import contactHandler from '../../api/contact';
import robotsHandler from '../../api/robots';
import sitemapHandler from '../../api/sitemap';

test('SALMA_PROFILE reflects verified identity and links', () => {
  assert.equal(SALMA_PROFILE.name, 'Salma Atou');
  assert.equal(SALMA_PROFILE.title, 'Cybersecurity Engineer');
  assert.equal(PORTFOLIO_OWNER.name, 'Salma Atou');
  assert.equal(SALMA_PROFILE.links.email, 'Salmaatouofficiel@gmail.com');
  assert.ok(SALMA_PROFILE.links.linkedin.includes('salma-atou-532846332'));
  assert.ok(SALMA_PROFILE.links.tryhackme.includes('SalmaAtouCyberNova'));
  assert.ok(HERO_VIDEO_URL.endsWith('.mp4'));
});

test('Core expertise, technical ecosystem, and methodology cover all required domains', () => {
  assert.equal(CORE_EXPERTISE_DOMAINS.length, 4);
  assert.deepEqual(
    CORE_EXPERTISE_DOMAINS.map((d) => d.title),
    [
      'Security Operations',
      'API Security',
      'Web Application Security',
      'Active Directory Security',
    ]
  );
  assert.equal(TECHNICAL_ECOSYSTEM.length, 7);
  assert.equal(SECURITY_METHODOLOGY_STEPS.length, 4);
  assert.deepEqual(
    SECURITY_METHODOLOGY_STEPS.map((s) => s.number),
    ['01', '02', '03', '04']
  );
});

test('Non-fabrication guards hide unverified projects, collaborators, testimonials, and certifications by default', () => {
  assert.equal(getPublishedProjects(PROJECT_CASE_STUDIES).length, 0);
  assert.equal(getPublishedCollaborators(COLLABORATORS).length, 0);
  assert.equal(getPublishedTestimonials(TESTIMONIALS).length, 0);
  assert.equal(getPublishedCertifications(CERTIFICATIONS).length, 0);

  // Projects nav link points to the dedicated GitHub showcase section while gating any requiresVerifiedProjects link
  const defaultNavLabels = getVisibleNavLinks().map((l) => l.label);
  assert.ok(defaultNavLabels.includes('Projects'));
  const gatedLinks = [{ id: 'case-studies', label: 'Case Studies', href: '#cases', requiresVerifiedProjects: true }];
  assert.equal(getVisibleNavLinks(gatedLinks, 0).length, 0);
  assert.equal(getVisibleNavLinks(gatedLinks, 1).length, 1);
});

test('Certification status selector publishes only verified and confirmed in_progress entries', () => {
  const sample = [
    ...CERTIFICATIONS,
    {
      id: 'confirmed-oscp',
      title: 'OSCP',
      issuer: 'OffSec',
      domain: 'Offensive Security',
      notes: 'Confirmed active track',
      status: 'in_progress' as const,
    },
  ];
  const published = getPublishedCertifications(sample);
  assert.equal(published.length, 1);
  assert.equal(published[0].id, 'confirmed-oscp');
});

test('Navigation dropdown helper state machine remains deterministic', () => {
  assert.equal(hasDropdown({ label: 'About' }), false);
  assert.equal(hasDropdown({ label: 'Expertise', dropdown: ['SOC'] }), true);
  assert.equal(getNextDropdownState(null, 'Expertise', 'enter'), 'Expertise');
  assert.equal(getNextDropdownState('Expertise', 'Expertise', 'leave'), null);
  assert.equal(getNextDropdownState('About', 'Expertise', 'leave'), 'About');
  assert.equal(getNextDropdownState(null, 'About', 'toggle'), 'About');
  assert.equal(getNextDropdownState('About', 'About', 'toggle'), null);
});

test('Vercel /api/contact handler and contact recipient configuration work cleanly', async () => {
  assert.equal(CONTACT_DELIVERY_EMAIL, 'Salmaatouofficiel@gmail.com');

  const getRes = await contactHandler.fetch(new Request('http://localhost/api/contact', { method: 'GET' }));
  assert.equal(getRes.status, 405);

  const postRes = await contactHandler.fetch(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'visitor@example.com', message: 'Hello!' }),
    })
  );
  // Without RESEND_API_KEY in test env, returns 501 signaling client FormSubmit AJAX fallback
  assert.equal(postRes.status, 501);
  const body = (await postRes.json()) as { fallback?: string };
  assert.equal(body.fallback, 'formsubmit');
});

test('Automatic domain-aware /robots.txt and /sitemap.xml endpoints resolve live origin cleanly', async () => {
  const robotsRes = await robotsHandler.fetch(
    new Request('https://salmaatou.vercel.app/robots.txt', {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'salmaatou.vercel.app',
      },
    })
  );
  assert.equal(robotsRes.status, 200);
  const robotsText = await robotsRes.text();
  assert.ok(robotsText.includes('Allow: /'));
  assert.ok(robotsText.includes('Sitemap: https://salmaatou.vercel.app/sitemap.xml'));

  const sitemapRes = await sitemapHandler.fetch(
    new Request('https://salmaatou.vercel.app/sitemap.xml', {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'salmaatou.vercel.app',
      },
    })
  );
  assert.equal(sitemapRes.status, 200);
  const sitemapXml = await sitemapRes.text();
  assert.ok(sitemapXml.includes('<loc>https://salmaatou.vercel.app/</loc>'));
});
