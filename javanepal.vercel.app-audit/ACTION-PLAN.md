# SEO Action Plan for javanepal.vercel.app

## Phase 1: Critical & High Impact Fixes (Weeks 1-2)
- [ ] Create robots.txt allowing crawling of /units, /topic, /search, /bookmarks, /about
- [ ] Disallow admin/internal paths in robots.txt
- [ ] Generate XML sitemap of all unit, topic, and question pages
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Add canonical tag (<link rel="canonical" href="https://javanepal.vercel.app[current_page]/">) to all pages
- [ ] Add lang="en" attribute to <html> tag
- [ ] Implement Schema.org JSON-LD:
    * Organization (site-wide)
    * Website (sitelinks searchbox potential)
    * BreadcrumbList (navigation trail)
    * Article (for unit and topic pages)
    * FAQPage (for question-answer sections on topic pages)
    * Course (overall curriculum structure)

## Phase 2: Content & Authority Enhancements (Weeks 3-4)
- [ ] Add author bios with credentials (consider Person schema)
- [ ] Add content update/publish dates to pages (visible and structured)
- [ ] Improve internal linking: link related concepts within topic descriptions
- [ ] Create and upload llms.txt file (e.g., User-agent: *\nAllow: /)
- [ ] Consider adding reviewer credentials for educational content

## Phase 3: Performance & UX Refinements (Month 2)
- [ ] Set up Google Search Console and PageSpeed Insights monitoring
- [ ] Measure and improve Core Web Vitals (LCP, INP, CLS)
- [ ] Audit with Lighthouse to eliminate render-blocking resources
- [ ] Implement lazy loading for offscreen images (loading="lazy")
- [ ] Ensure images are served in modern formats (WebP/AVIF) via Next.js Image
- [ ] Add image sitemap or ensure images included in XML sitemap

## Phase 4: Ongoing Monitoring & Improvement (Ongoing)
- [ ] Monitor Google Search Console for indexing issues, crawl errors, manual actions
- [ ] Track keyword rankings and organic traffic trends (via GSC, third-party tools)
- [ ] Regularly update content and add new topics/questions
- [ ] Build backlinks through educational outreach, guest posts, resource links
- [ ] Encourage scholarships or citations from educational institutions
- [ ] Continuously test and improve page performance (aim for LCP <2.5s, INP <200ms, CLS <0.1)
- [ ] Refresh outdated content annually
- [ ] Monitor competitors and adapt strategy

## Tools & Resources
- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev/
- Screaming Frog SEO Spider (for crawling)
- Schema.org: https://schema.org/
- JSON-LD Generator: https://technicalseo.com/tools/schema-markup-generator/
- Robots.txt Generator: https://www.robotstxt.org/robotstxt.html
- XML Sitemap Generator: https://www.xml-sitemaps.com/

## Success Metrics
- Increase in organic traffic (+30% in 3 months)
- Improvement in Core Web Vitals (LCP <2.5s, INP <200ms, CLS <0.1)
- Increase in keyword rankings for target Java OOP terms
- Appearance of rich results in SERPs (FAQ, breadcrumbs)
- Growth in referring domains (backlinks)
- Reduction in crawl errors and indexing issues

---
*This action plan should be reviewed and adjusted based on monitoring results and algorithm updates.*
