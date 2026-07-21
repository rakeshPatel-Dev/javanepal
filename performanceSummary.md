Top Issues
These audits are identified as the top issues impacting your performance.






Low
Avoid long main-thread tasks TBT
8 long tasks found
Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay.

Learn how to improve this
URL	Start Time	Duration
https://javanepal.vercel.app/
519ms	181ms
https://javanepal.vercel.app/_next/static/chunks/429-3521e1ab7f5766bb.js
1.0s	143ms
https://javanepal.vercel.app/_next/static/chunks/838-1b972b14b2089702.js
733ms	105ms
https://javanepal.vercel.app/
840ms	59ms
https://javanepal.vercel.app/_next/static/chunks/838-1b972b14b2089702.js
1.3s	58ms
https://javanepal.vercel.app/_next/static/chunks/4bd1b696-deb4a0a1da1923b0.js
944ms	57ms
https://javanepal.vercel.app/_next/static/chunks/838-1b972b14b2089702.js
1.5s	55ms
https://javanepal.vercel.app/_next/static/chunks/838-1b972b14b2089702.js
1.2s	52ms
Low
Reduce JavaScript execution time TBT
603ms spent executing JavaScript
Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this.

Learn how to improve this
URL	Total CPU Time	Script Evaluation	Script Parse
https://javanepal.vercel.app/
561ms	5ms	2ms
https://javanepal.vercel.app/_next/static/chunks/315-c3a1531241f13302.js
502ms	101ms	3ms
https://javanepal.vercel.app/_next/static/chunks/838-1b972b14b2089702.js
371ms	295ms	10ms
Unattributable
302ms	12ms	0ms
https://javanepal.vercel.app/_next/static/chunks/4bd1b696-deb4a0a1da1923b0.js
218ms	22ms	6ms
https://javanepal.vercel.app/_next/static/chunks/429-3521e1ab7f5766bb.js
143ms	122ms	20ms
Low
Avoid chaining critical requests FCP LCP
1 chain found
The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.

Learn how to improve this
Maximum critical path latency: 825ms

Initial Navigation

http://javanepal.vercel.app/ 0B, 2ms

https://javanepal.vercel.app/ 17.9KB, 205ms

https://javanepal.vercel.app/_next/static/css/60a126f50f8e2788.css 20.4KB, 233ms

https://javanepal.vercel.app/_next/static/media/geist-latin-wght-normal.9ff55a8a.woff2 29.0KB, 123ms

Low
Avoid an excessive DOM size TBT
813 elements
A large DOM will increase memory usage, cause longer style calculations, and produce costly layout reflows.

Learn how to improve this
Statistic	Element	Value
Total DOM Elements		813
Maximum DOM Depth	
div.flex > span.flex > svg.lucide > path
<path d="M12 7v14">
13
Maximum Child Elements	
body.min-h-dvh
<body class="min-h-dvh flex flex-col bg-background text-foreground font-sans antialiased">
29
Low
Avoid multiple page redirects FCP LCP
Potential savings of 3ms
Redirects introduce additional delays before the page can be loaded.

Learn how to improve this
URL	Time Spent
http://javanepal.vercel.app/
3ms
https://javanepal.vercel.app/
0ms
Improving these audits seen here can help as a starting point for overall performance gains.