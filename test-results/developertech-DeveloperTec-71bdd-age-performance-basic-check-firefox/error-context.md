# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: developertech.spec.ts >> DeveloperTech Website Tests >> Page performance basic check
- Location: tests\developertech.spec.ts:70:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   7793
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - navigation [ref=e5]:
        - generic [ref=e6]:
          - button "Developer Tech Web Studio" [ref=e8] [cursor=pointer]:
            - img [ref=e10]
            - generic [ref=e15]:
              - generic [ref=e16]: Developer Tech
              - generic [ref=e17]: Web Studio
          - generic [ref=e18]:
            - button "Home" [ref=e19] [cursor=pointer]
            - button "Services" [ref=e20] [cursor=pointer]
            - button "About Us" [ref=e21] [cursor=pointer]
            - button "Team" [ref=e22] [cursor=pointer]
            - button "Packages" [ref=e23] [cursor=pointer]
            - link "Blog" [ref=e24] [cursor=pointer]:
              - /url: /blog
            - button "Contact" [ref=e25] [cursor=pointer]
          - generic [ref=e26]:
            - link "Login" [ref=e27] [cursor=pointer]:
              - /url: /login
              - img [ref=e28]
              - generic [ref=e32]: Login
            - button "Start a Project" [ref=e33] [cursor=pointer]:
              - img [ref=e34]
              - text: Start a Project
    - main [ref=e38]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]: ✨ Professional websites for growing businesses
          - heading "We design websites that look fast and help your brand win trust faster." [level=1] [ref=e49]:
            - text: We design websites that look
            - generic [ref=e50]: fast
            - text: and help your brand win trust faster.
          - paragraph [ref=e51]: Developer Tech builds modern business websites with strong design, responsive layouts, smooth performance, and clear conversion focus.
          - generic [ref=e52]:
            - generic [ref=e53]: React
            - generic [ref=e54]: Node.js
            - generic [ref=e55]: Tailwind
            - generic [ref=e56]: Business Websites
          - generic [ref=e57]:
            - link "Start on WhatsApp (24/7)" [ref=e58] [cursor=pointer]:
              - /url: https://wa.me/919828920866
              - img [ref=e59]
              - text: Start on WhatsApp (24/7)
            - link "📖 Read Success Stories" [ref=e61] [cursor=pointer]:
              - /url: /blog
            - generic [ref=e62]:
              - generic [ref=e63]:
                - paragraph [ref=e64]: 50+
                - paragraph [ref=e65]: projects delivered
              - generic [ref=e67]:
                - paragraph [ref=e68]: 98%
                - paragraph [ref=e69]: client satisfaction
          - generic [ref=e70]: ⏰ Limited slots available • 3 spots left this month
        - generic [ref=e72]:
          - generic [ref=e75]:
            - generic [ref=e76]:
              - generic [ref=e77]:
                - paragraph [ref=e78]: 🚀 Project Snapshot
                - heading "Premium Business Website" [level=2] [ref=e79]
              - generic [ref=e80]:
                - paragraph [ref=e81]: Launch Ready
                - paragraph [ref=e82]: 7-15 days
            - generic [ref=e83]:
              - generic [ref=e84]:
                - paragraph [ref=e85]: 🎨 Design Quality
                - paragraph [ref=e86]: Clean, modern, trust-first
              - generic [ref=e87]:
                - paragraph [ref=e88]: ⚡ Performance Focus
                - paragraph [ref=e89]: Fast, responsive, mobile ready
              - generic [ref=e90]:
                - paragraph [ref=e91]: 📦 Included
                - generic [ref=e92]:
                  - generic [ref=e93]: Custom UI
                  - generic [ref=e94]: SEO Basics
                  - generic [ref=e95]: WhatsApp CTA
                  - generic [ref=e96]: Lead Form
          - generic [ref=e102]:
            - img "Technical dashboard illustration" [ref=e108]:
              - text: Traffic+128%
              - text: 74%Speed score
            - generic [ref=e124]:
              - generic [ref=e125]:
                - paragraph [ref=e126]: Tech Stack
                - generic [ref=e127]:
                  - generic [ref=e128]: React
                  - generic [ref=e129]: Node.js
                  - generic [ref=e130]: API
                  - generic [ref=e131]: SEO
                  - generic [ref=e132]: Cloud
              - generic [ref=e133]:
                - paragraph [ref=e134]: Live System
                - generic [ref=e135]:
                  - generic [ref=e136]:
                    - generic [ref=e137]: Frontend
                    - generic [ref=e138]: Healthy
                  - generic [ref=e139]:
                    - generic [ref=e140]: Backend API
                    - generic [ref=e141]: Optimized
                  - generic [ref=e142]:
                    - generic [ref=e143]: UX Layer
                    - generic [ref=e144]: Polished
      - generic [ref=e150]:
        - generic [ref=e151]:
          - paragraph [ref=e152]: 📊 Why We Win Trust
          - heading "Results That Speak Louder" [level=2] [ref=e153]
          - paragraph [ref=e154]: Real metrics from real projects. We're not just building websites – we're building business impact.
        - generic [ref=e155]:
          - generic [ref=e156]:
            - img [ref=e158]
            - paragraph [ref=e162]:
              - generic [ref=e163]: "0"
              - text: +
            - paragraph [ref=e164]: Projects Delivered
            - paragraph [ref=e165]: Proven across diverse industries
          - generic [ref=e166]:
            - img [ref=e168]
            - paragraph [ref=e171]:
              - generic [ref=e172]: "0"
              - text: "%"
            - paragraph [ref=e173]: Client Satisfaction
            - paragraph [ref=e174]: Proven across diverse industries
          - generic [ref=e175]:
            - img [ref=e177]
            - paragraph [ref=e183]:
              - generic [ref=e184]: "0"
              - text: +
            - paragraph [ref=e185]: Happy Clients
            - paragraph [ref=e186]: Proven across diverse industries
          - generic [ref=e187]:
            - img [ref=e189]
            - paragraph [ref=e193]:
              - generic [ref=e194]: "0"
              - text: x
            - paragraph [ref=e195]: Avg Conversion Increase
            - paragraph [ref=e196]: Proven across diverse industries
      - generic [ref=e199]:
        - generic [ref=e200]:
          - paragraph [ref=e201]: 🚀
          - paragraph [ref=e202]: 50+
          - paragraph [ref=e203]: Projects Shipped
        - generic [ref=e204]:
          - paragraph [ref=e205]: ✅
          - paragraph [ref=e206]: 98%
          - paragraph [ref=e207]: On-time Delivery
        - generic [ref=e208]:
          - paragraph [ref=e209]: ⭐
          - paragraph [ref=e210]: 4.9★
          - paragraph [ref=e211]: Average Rating
        - generic [ref=e212]:
          - paragraph [ref=e213]: 🛟
          - paragraph [ref=e214]: 24/7
          - paragraph [ref=e215]: Support Available
      - generic [ref=e217]:
        - generic [ref=e218]:
          - paragraph [ref=e219]: What We Do
          - heading "Our Services" [level=2] [ref=e220]
          - paragraph [ref=e221]: We offer comprehensive web development services tailored to your business needs
        - generic [ref=e222]:
          - generic [ref=e225]:
            - img [ref=e227]
            - heading "Web Development" [level=3] [ref=e231]
            - paragraph [ref=e232]: Custom web applications built with modern technologies
            - paragraph [ref=e234]: We create responsive, high-performance websites tailored to your business needs. From concept to deployment, we handle everything with industry best practices.
            - generic [ref=e235]:
              - generic [ref=e236]:
                - generic [ref=e237]: Learn more
                - img [ref=e238]
              - link "Discuss Now" [ref=e240] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Discuss Now
                - img [ref=e241]
          - generic [ref=e245]:
            - img [ref=e247]
            - heading "React Frontend" [level=3] [ref=e249]
            - paragraph [ref=e250]: Beautiful and interactive user interfaces with React
            - paragraph [ref=e252]: Build engaging user experiences with React.js. We specialize in component-based architecture, state management, and creating smooth, interactive interfaces.
            - generic [ref=e253]:
              - generic [ref=e254]:
                - generic [ref=e255]: Learn more
                - img [ref=e256]
              - link "Discuss Now" [ref=e258] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Discuss Now
                - img [ref=e259]
          - generic [ref=e263]:
            - img [ref=e265]
            - heading "Backend Development" [level=3] [ref=e270]
            - paragraph [ref=e271]: Robust server-side applications using Node.js & Express
            - paragraph [ref=e273]: Develop scalable server solutions with Node.js and Express. Our backend solutions ensure fast APIs, secure data handling, and optimal performance.
            - generic [ref=e274]:
              - generic [ref=e275]:
                - generic [ref=e276]: Learn more
                - img [ref=e277]
              - link "Discuss Now" [ref=e279] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Discuss Now
                - img [ref=e280]
          - generic [ref=e284]:
            - img [ref=e286]
            - heading "Database Management" [level=3] [ref=e290]
            - paragraph [ref=e291]: Efficient data storage and management with MongoDB
            - paragraph [ref=e293]: Design and manage NoSQL databases with MongoDB. We optimize queries, ensure data integrity, and create efficient database schemas for your applications.
            - generic [ref=e294]:
              - generic [ref=e295]:
                - generic [ref=e296]: Learn more
                - img [ref=e297]
              - link "Discuss Now" [ref=e299] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Discuss Now
                - img [ref=e300]
          - generic [ref=e304]:
            - img [ref=e306]
            - heading "Full Stack Solutions" [level=3] [ref=e311]
            - paragraph [ref=e312]: Complete end-to-end web application development
            - paragraph [ref=e314]: Get everything you need from a single team. Frontend, backend, database, and deployment - we deliver complete, production-ready web applications.
            - generic [ref=e315]:
              - generic [ref=e316]:
                - generic [ref=e317]: Learn more
                - img [ref=e318]
              - link "Discuss Now" [ref=e320] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Discuss Now
                - img [ref=e321]
        - generic [ref=e323]:
          - heading "Ready to transform your business?" [level=3] [ref=e324]
          - paragraph [ref=e325]: Get a free consultation on which service fits your business best. Limited availability – book your call now.
          - generic [ref=e326]:
            - link "🚀 Get Free Consultation" [ref=e327] [cursor=pointer]:
              - /url: https://wa.me/919828920866
            - link "💬 Chat with us" [ref=e328] [cursor=pointer]:
              - /url: https://wa.me/919828920866?text=I want to know about your web development services
      - generic [ref=e334]:
        - generic [ref=e335]:
          - generic [ref=e336]:
            - paragraph [ref=e337]: Our Team
            - heading "A focused digital team building reliable products for real business growth." [level=2] [ref=e338]
            - paragraph [ref=e339]: We combine product thinking, clean design, and modern engineering to deliver websites that feel premium and perform with confidence.
          - generic [ref=e340]:
            - generic [ref=e341]:
              - img [ref=e342]
              - paragraph [ref=e345]: Business-first project planning
            - generic [ref=e346]:
              - img [ref=e347]
              - paragraph [ref=e350]: Modern UI with production-grade performance
            - generic [ref=e351]:
              - img [ref=e352]
              - paragraph [ref=e355]: Clear communication from start to launch
        - generic [ref=e356]:
          - generic [ref=e357]:
            - generic [ref=e358]:
              - img "Strategy & Delivery" [ref=e360]
              - generic [ref=e361]:
                - generic [ref=e362]: Core Function
                - heading "Strategy & Delivery" [level=3] [ref=e363]
            - generic [ref=e364]:
              - paragraph [ref=e365]: Planning, execution, and client communication
              - generic [ref=e366]:
                - generic [ref=e367]: Professional execution
                - generic [ref=e368]:
                  - text: View capability
                  - img [ref=e369]
          - generic [ref=e372]:
            - generic [ref=e373]:
              - img "Design & Frontend" [ref=e375]
              - generic [ref=e376]:
                - generic [ref=e377]: Core Function
                - heading "Design & Frontend" [level=3] [ref=e378]
            - generic [ref=e379]:
              - paragraph [ref=e380]: Responsive UI, interactions, and polished user journeys
              - generic [ref=e381]:
                - generic [ref=e382]: Professional execution
                - generic [ref=e383]:
                  - text: View capability
                  - img [ref=e384]
          - generic [ref=e387]:
            - generic [ref=e388]:
              - img "Backend & Performance" [ref=e390]
              - generic [ref=e391]:
                - generic [ref=e392]: Core Function
                - heading "Backend & Performance" [level=3] [ref=e393]
            - generic [ref=e394]:
              - paragraph [ref=e395]: Scalable architecture, APIs, and optimization
              - generic [ref=e396]:
                - generic [ref=e397]: Professional execution
                - generic [ref=e398]:
                  - text: View capability
                  - img [ref=e399]
        - generic [ref=e402]:
          - generic [ref=e403]:
            - paragraph [ref=e404]: Why teams choose us
            - heading "Structured process. Premium output. Dependable support." [level=3] [ref=e405]
            - paragraph [ref=e406]: Every project is handled with a clear roadmap, design attention, and production-ready development standards so your website looks sharp and works smoothly across devices.
          - generic [ref=e407]:
            - generic [ref=e408]:
              - generic [ref=e409]: 10+
              - paragraph [ref=e410]: Years of combined execution experience
            - generic [ref=e411]:
              - generic [ref=e412]: 50+
              - paragraph [ref=e413]: Delivery milestones completed with care
            - generic [ref=e414]:
              - generic [ref=e415]: 24/7
              - paragraph [ref=e416]: Responsive support and project communication
      - generic [ref=e419]:
        - generic [ref=e420]:
          - paragraph [ref=e421]: About Us
          - heading "About Developer Tech" [level=2] [ref=e422]
          - paragraph [ref=e423]: Developer Tech is a modern web development company dedicated to building fast, secure, and scalable web applications. We help businesses transform their digital presence with responsive, user-friendly, and performance-driven websites.
          - paragraph [ref=e424]: With expertise in React, Node.js, and MongoDB, we deliver comprehensive full-stack solutions that combine cutting-edge technology with exceptional user experience. Our commitment to clean code, scalability, and client satisfaction sets us apart.
          - generic [ref=e425]:
            - generic [ref=e426]:
              - img [ref=e427]
              - generic [ref=e430]: Clean, maintainable code following industry best practices
            - generic [ref=e431]:
              - img [ref=e432]
              - generic [ref=e435]: Scalable solutions that grow with your business
            - generic [ref=e436]:
              - img [ref=e437]
              - generic [ref=e440]: Fast-loading, performance-optimized applications
            - generic [ref=e441]:
              - img [ref=e442]
              - generic [ref=e445]: Responsive design for all devices and screen sizes
            - generic [ref=e446]:
              - img [ref=e447]
              - generic [ref=e450]: Secure applications with modern security practices
            - generic [ref=e451]:
              - img [ref=e452]
              - generic [ref=e455]: Complete client satisfaction and support
        - generic [ref=e458]:
          - generic [ref=e460]:
            - paragraph [ref=e461]: Studio Strength
            - heading "Built to deliver with clarity" [level=3] [ref=e462]
          - generic [ref=e463]:
            - generic [ref=e464]:
              - generic [ref=e465]:
                - generic [ref=e466]: "0"
                - generic [ref=e467]: +
              - generic [ref=e468]: Years Experience
            - generic [ref=e469]:
              - generic [ref=e470]:
                - generic [ref=e471]: "0"
                - generic [ref=e472]: +
              - generic [ref=e473]: Projects Completed
            - generic [ref=e474]:
              - generic [ref=e475]:
                - generic [ref=e476]: "0"
                - generic [ref=e477]: +
              - generic [ref=e478]: Team Members
      - generic [ref=e480]:
        - generic [ref=e481]:
          - paragraph [ref=e482]: Why We're Different
          - heading "Trusted by 50+ businesses across India" [level=2] [ref=e483]
          - paragraph [ref=e484]: Real businesses, real results. We focus on creating websites that convert visitors into loyal customers.
        - generic [ref=e485]:
          - generic [ref=e486]:
            - generic [ref=e487]:
              - generic [ref=e488]:
                - generic [ref=e489]: ⭐
                - generic [ref=e490]: ⭐
                - generic [ref=e491]: ⭐
                - generic [ref=e492]: ⭐
                - generic [ref=e493]: ⭐
              - paragraph [ref=e494]: "\"Our website now looks much more professional and clients trust the brand faster. Communication was clear from day one.\""
              - generic [ref=e495]:
                - paragraph [ref=e496]: Local Business Owner
                - paragraph [ref=e497]: Verified Client
            - generic [ref=e498]:
              - generic [ref=e499]:
                - generic [ref=e500]: ⭐
                - generic [ref=e501]: ⭐
                - generic [ref=e502]: ⭐
                - generic [ref=e503]: ⭐
                - generic [ref=e504]: ⭐
              - paragraph [ref=e505]: "\"The team understood the business goal, not just the design. The final website felt clean, fast, and ready to convert visitors.\""
              - generic [ref=e506]:
                - paragraph [ref=e507]: Startup Founder
                - paragraph [ref=e508]: Verified Client
          - generic [ref=e509]:
            - generic [ref=e510]:
              - paragraph [ref=e511]: Our Process
              - heading "Clear steps, transparent communication" [level=3] [ref=e512]
              - generic [ref=e513]:
                - generic [ref=e514]:
                  - generic [ref=e515]: "1"
                  - paragraph [ref=e516]: Discovery call and requirement understanding
                - generic [ref=e517]:
                  - generic [ref=e518]: "2"
                  - paragraph [ref=e519]: Clean design direction with business-focused layout
                - generic [ref=e520]:
                  - generic [ref=e521]: "3"
                  - paragraph [ref=e522]: Development, testing, and mobile optimization
                - generic [ref=e523]:
                  - generic [ref=e524]: "4"
                  - paragraph [ref=e525]: Launch support and post-delivery guidance
              - link "Start Your Journey" [ref=e526] [cursor=pointer]:
                - /url: https://wa.me/919828920866
                - text: Start Your Journey
                - img [ref=e527]
            - generic [ref=e529]:
              - generic [ref=e531]:
                - img [ref=e533]
                - generic [ref=e536]:
                  - heading "Fast Response" [level=4] [ref=e537]
                  - paragraph [ref=e538]: Clear communication and quick follow-up on active projects.
              - generic [ref=e540]:
                - img [ref=e542]
                - generic [ref=e546]:
                  - heading "Structured Process" [level=4] [ref=e547]
                  - paragraph [ref=e548]: Each website is built with a defined workflow from planning to launch.
              - generic [ref=e550]:
                - img [ref=e552]
                - generic [ref=e555]:
                  - heading "Reliable Delivery" [level=4] [ref=e556]
                  - paragraph [ref=e557]: Modern code, responsive design, and practical business execution.
      - generic [ref=e559]:
        - generic [ref=e560]:
          - paragraph [ref=e561]: From the blog
          - heading "Read our latest short stories" [level=2] [ref=e562]
          - paragraph [ref=e563]: Discover quick design and development tips from the Developer Tech team.
        - article [ref=e565]:
          - 'img "Professional Websites: The Foundation of Modern Business Growth" [ref=e567]'
          - generic [ref=e568]:
            - 'heading "Professional Websites: The Foundation of Modern Business Growth" [level=3] [ref=e569]'
            - paragraph [ref=e570]: Learn how professional websites help businesses improve credibility, increase customer engagement, strengthen SEO performance, and drive long-term digital growth.
            - generic [ref=e571]:
              - generic [ref=e572]: Blog
              - link "Read story →" [ref=e573] [cursor=pointer]:
                - /url: /blog/professional-websites-the-foundation-of-modern-business-growth
        - link "View all blog posts" [ref=e575] [cursor=pointer]:
          - /url: /blog
      - generic [ref=e580]:
        - generic [ref=e581]:
          - paragraph [ref=e582]: Pricing
          - heading "Website packages designed for different stages of business." [level=2] [ref=e583]
          - paragraph [ref=e584]: Pick the package that fits your current goals, and we will shape it into a website that looks premium and works smoothly.
        - generic [ref=e585]:
          - generic [ref=e586]:
            - generic [ref=e587]:
              - paragraph [ref=e588]: Starter Website
              - heading "Basic Plan" [level=3] [ref=e589]
              - paragraph [ref=e590]: A clean business website for startups and local brands.
              - generic [ref=e591]: Rs. 9,999
            - generic [ref=e592]:
              - generic [ref=e593]:
                - img [ref=e595]
                - generic [ref=e597]: 5 pages with mobile responsive design
              - generic [ref=e598]:
                - img [ref=e600]
                - generic [ref=e602]: Clean and professional layout
              - generic [ref=e603]:
                - img [ref=e605]
                - generic [ref=e607]: Contact form and WhatsApp integration
              - generic [ref=e608]:
                - img [ref=e610]
                - generic [ref=e612]: Basic SEO setup
              - generic [ref=e613]:
                - img [ref=e615]
                - generic [ref=e617]: Delivery in 7 days
              - generic [ref=e618]:
                - img [ref=e620]
                - generic [ref=e622]: 7 days free support
            - link "Choose Plan" [ref=e623] [cursor=pointer]:
              - /url: https://wa.me/919828920866
              - text: Choose Plan
              - img [ref=e624]
          - generic [ref=e627]:
            - generic [ref=e628]:
              - img [ref=e629]
              - text: Most Popular
            - generic [ref=e634]:
              - paragraph [ref=e635]: Business Growth
              - heading "Standard Plan" [level=3] [ref=e636]
              - paragraph [ref=e637]: Ideal for businesses that want stronger presence and reach.
              - generic [ref=e638]: Rs. 19,999
            - generic [ref=e639]:
              - generic [ref=e640]:
                - img [ref=e642]
                - generic [ref=e644]: 8-10 pages with custom modern design
              - generic [ref=e645]:
                - img [ref=e647]
                - generic [ref=e649]: Responsive across mobile and tablet
              - generic [ref=e650]:
                - img [ref=e652]
                - generic [ref=e654]: WhatsApp, call, and map integration
              - generic [ref=e655]:
                - img [ref=e657]
                - generic [ref=e659]: On-page SEO and speed optimization
              - generic [ref=e660]:
                - img [ref=e662]
                - generic [ref=e664]: Social media integration
              - generic [ref=e665]:
                - img [ref=e667]
                - generic [ref=e669]: 1 month free support
            - link "Get Started" [ref=e670] [cursor=pointer]:
              - /url: https://wa.me/919828920866
              - text: Get Started
              - img [ref=e671]
          - generic [ref=e674]:
            - generic [ref=e675]:
              - paragraph [ref=e676]: Advanced Business Website
              - heading "Premium Plan" [level=3] [ref=e677]
              - paragraph [ref=e678]: For serious brands that need a strong custom digital presence.
              - generic [ref=e679]: Rs. 39,999 - Rs. 49,999
            - generic [ref=e680]:
              - generic [ref=e681]:
                - img [ref=e683]
                - generic [ref=e685]: Fully custom design and advanced UI/UX
              - generic [ref=e686]:
                - img [ref=e688]
                - generic [ref=e690]: Unlimited pages and blog setup
              - generic [ref=e691]:
                - img [ref=e693]
                - generic [ref=e695]: SEO-optimized structure
              - generic [ref=e696]:
                - img [ref=e698]
                - generic [ref=e700]: Lead capture system and payment integration
              - generic [ref=e701]:
                - img [ref=e703]
                - generic [ref=e705]: Admin panel if required
              - generic [ref=e706]:
                - img [ref=e708]
                - generic [ref=e710]: 3 months free maintenance
            - link "Choose Plan" [ref=e711] [cursor=pointer]:
              - /url: https://wa.me/919828920866
              - text: Choose Plan
              - img [ref=e712]
        - generic [ref=e715]:
          - generic [ref=e716]:
            - generic [ref=e717]:
              - paragraph [ref=e718]: Add-ons
              - heading "Extra services to support your website after launch" [level=3] [ref=e719]
            - paragraph [ref=e720]: Add what you need based on your business stage and growth plans.
          - generic [ref=e721]:
            - generic [ref=e722]:
              - heading "Hosting Setup" [level=4] [ref=e723]
              - paragraph [ref=e724]: Rs. 3,000 / year
            - generic [ref=e725]:
              - heading "Website Maintenance" [level=4] [ref=e726]
              - paragraph [ref=e727]: Rs. 2,000 / month
            - generic [ref=e728]:
              - heading "SEO Services" [level=4] [ref=e729]
              - paragraph [ref=e730]: Rs. 5,000 / month
            - generic [ref=e731]:
              - heading "Landing Page" [level=4] [ref=e732]
              - paragraph [ref=e733]: Rs. 4,999
            - generic [ref=e734]:
              - heading "E-commerce Website" [level=4] [ref=e735]
              - paragraph [ref=e736]: Starting Rs. 30,000
      - generic [ref=e738]:
        - generic [ref=e739]:
          - paragraph [ref=e740]: Contact
          - heading "Send Your Query" [level=2] [ref=e741]
          - paragraph [ref=e742]: Fill the form and we will send confirmation to your email.
        - generic [ref=e743]:
          - generic [ref=e744]:
            - generic [ref=e745]:
              - paragraph [ref=e746]: Project Form
              - heading "Tell us what you want to build" [level=3] [ref=e747]
            - generic [ref=e748]:
              - textbox "Your name" [ref=e749]
              - textbox "Your email" [ref=e750]
            - textbox "Phone (optional)" [ref=e751]
            - textbox "Subject" [ref=e752]
            - textbox "Write your query..." [ref=e753]
            - button "Submit Query" [ref=e754] [cursor=pointer]:
              - img
              - text: Submit Query
          - generic [ref=e755]:
            - generic [ref=e756]:
              - img [ref=e758]
              - heading "WhatsApp" [level=3] [ref=e760]
              - paragraph [ref=e761]: Need quick support? Chat with us directly.
              - button "Click to Chat" [ref=e762] [cursor=pointer]:
                - img
                - text: Click to Chat
            - generic [ref=e763]:
              - img [ref=e765]
              - heading "Email" [level=3] [ref=e768]
              - paragraph [ref=e769]: "Prefer email? Reach us directly at:"
              - button "kumawatbajaranglal736@gmail.com" [ref=e770] [cursor=pointer]
        - paragraph [ref=e772]:
          - img [ref=e773]
          - text: Available for freelance and full-time projects
    - contentinfo [ref=e776]:
      - generic [ref=e777]:
        - generic [ref=e778]:
          - generic [ref=e779]:
            - generic [ref=e780]:
              - img "Developer Tech Logo" [ref=e781]
              - heading "Developer Tech" [level=3] [ref=e782]
            - paragraph [ref=e783]: Building modern, scalable web applications for your success
            - paragraph [ref=e784]: "Location: Jaipur, India"
          - generic [ref=e785]:
            - heading "Quick Links" [level=4] [ref=e786]
            - list [ref=e787]:
              - listitem [ref=e788]:
                - button "Home" [ref=e789] [cursor=pointer]
              - listitem [ref=e790]:
                - button "Services" [ref=e791] [cursor=pointer]
              - listitem [ref=e792]:
                - button "About Us" [ref=e793] [cursor=pointer]
              - listitem [ref=e794]:
                - button "Team" [ref=e795] [cursor=pointer]
              - listitem [ref=e796]:
                - button "Packages" [ref=e797] [cursor=pointer]
              - listitem [ref=e798]:
                - link "Blog" [ref=e799] [cursor=pointer]:
                  - /url: /blog
              - listitem [ref=e800]:
                - button "Contact" [ref=e801] [cursor=pointer]
              - listitem [ref=e802]:
                - link "Privacy Policy" [ref=e803] [cursor=pointer]:
                  - /url: /privacy-policy
              - listitem [ref=e804]:
                - link "Terms & Conditions" [ref=e805] [cursor=pointer]:
                  - /url: /terms-and-conditions
          - generic [ref=e806]:
            - heading "Tech Stack" [level=4] [ref=e807]
            - list [ref=e808]:
              - listitem [ref=e809]: React.js
              - listitem [ref=e810]: Node.js & Express
              - listitem [ref=e811]: MongoDB
              - listitem [ref=e812]: Tailwind CSS
              - listitem [ref=e813]: Cloud Computing
        - generic [ref=e814]: Copyright 2024 Developer Tech. All rights reserved.
    - button "Chat Now" [ref=e815] [cursor=pointer]:
      - img [ref=e816]
      - generic [ref=e818]: Chat Now
  - link "Login" [ref=e819] [cursor=pointer]:
    - /url: /login
    - img [ref=e820]
    - text: Login
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = 'https://developertech.in';
  4  | 
  5  | test.describe('DeveloperTech Website Tests', () => {
  6  |   test('Homepage loads', async ({ page }) => {
  7  |     await page.goto(BASE_URL);
  8  |     await expect(page).toHaveTitle(/Developer/i);
  9  |   });
  10 | 
  11 |   test('No console errors', async ({ page }) => {
  12 |     const errors: string[] = [];
  13 | 
  14 |     page.on('console', (msg) => {
  15 |       if (msg.type() === 'error') {
  16 |         errors.push(msg.text());
  17 |       }
  18 |     });
  19 | 
  20 |     await page.goto(BASE_URL);
  21 |     await page.waitForTimeout(3000);
  22 | 
  23 |     expect(errors).toEqual([]);
  24 |   });
  25 | 
  26 |   test('Main navigation visible', async ({ page }) => {
  27 |     await page.goto(BASE_URL);
  28 |     await expect(page.locator('header')).toBeVisible();
  29 |   });
  30 | 
  31 |   test('Homepage screenshot', async ({ page }) => {
  32 |     await page.goto(BASE_URL);
  33 | 
  34 |     await page.screenshot({
  35 |       path: 'screenshots/homepage.png',
  36 |       fullPage: true,
  37 |     });
  38 |   });
  39 | 
  40 |   test('Mobile menu works', async ({ page }) => {
  41 |     await page.setViewportSize({
  42 |       width: 390,
  43 |       height: 844,
  44 |     });
  45 | 
  46 |     await page.goto(BASE_URL);
  47 | 
  48 |     const menuButton = page.locator('button').first();
  49 | 
  50 |     if (await menuButton.isVisible()) {
  51 |       await menuButton.click();
  52 |     }
  53 |   });
  54 | 
  55 |   test('All images loaded', async ({ page }) => {
  56 |     await page.goto(BASE_URL);
  57 | 
  58 |     const images = page.locator('img');
  59 |     const count = await images.count();
  60 | 
  61 |     for (let i = 0; i < count; i++) {
  62 |       const loaded = await images.nth(i).evaluate((image) => {
  63 |         return image.complete && image.naturalWidth > 0;
  64 |       });
  65 | 
  66 |       expect(loaded).toBeTruthy();
  67 |     }
  68 |   });
  69 | 
  70 |   test('Page performance basic check', async ({ page }) => {
  71 |     await page.goto(BASE_URL);
  72 | 
  73 |     const loadTime = await page.evaluate(() => {
  74 |       const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  75 |       return nav.loadEventEnd;
  76 |     });
  77 | 
> 78 |     expect(loadTime).toBeLessThan(5000);
     |                      ^ Error: expect(received).toBeLessThan(expected)
  79 |   });
  80 | });
  81 | 
```