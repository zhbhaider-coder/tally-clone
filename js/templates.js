/* Tally clone — starter templates. */
window.TEMPLATES=[
 {slug:'contact', icon:'✉️', cat:'Personal', name:'Contact Form',
  desc:'A simple way for visitors to reach you — name, email and message.',
  form:{title:'Contact us', description:'We usually reply within one business day.',
   blocks:[
    {type:'short', label:'What is your name?', required:true},
    {type:'email', label:'What is your email address?', required:true},
    {type:'long',  label:'How can we help?', required:true},
    {type:'dropdown', label:'Topic', options:['General question','Support','Feedback','Something else']}
   ]}},
 {slug:'job', icon:'💼', cat:'HR', name:'Job Application',
  desc:'Collect applications with role, experience and a short pitch.',
  form:{title:'Job Application', description:'Tell us about yourself — we read every application.',
   blocks:[
    {type:'short', label:'Full name', required:true},
    {type:'email', label:'Email address', required:true},
    {type:'dropdown', label:'Which role are you applying for?', required:true, options:['Content Creator','Developer','Designer','Marketing','Other']},
    {type:'number', label:'Years of experience'},
    {type:'long',  label:'Why are you a great fit for this role?', required:true},
    {type:'file',  label:'Upload your CV', desc:'Attach your CV as a PDF. In this demo build the file name is recorded with your submission.'}
   ]}},
 {slug:'feedback', icon:'💬', cat:'Product', name:'Feedback Survey',
  desc:'Find out what people really think — rating, likes and improvements.',
  form:{title:'We value your feedback', description:'Three quick questions — it takes under a minute.',
   blocks:[
    {type:'rating', label:'How would you rate your experience?', required:true},
    {type:'choice', label:'What did you like most?', options:['Ease of use','Design','Speed','Support','Price']},
    {type:'long',  label:'What could we do better?'},
    {type:'email', label:'Email (optional — only if you want a reply)'}
   ]}},
 {slug:'event', icon:'🎉', cat:'Office', name:'Event Registration',
  desc:'RSVPs, headcounts and dietary needs for your next event.',
  form:{title:'Event Registration', description:'Save your spot — registration closes the day before the event.',
   blocks:[
    {type:'short', label:'Full name', required:true},
    {type:'email', label:'Email address', required:true},
    {type:'number', label:'How many guests are you bringing?', required:true},
    {type:'choice', label:'Will you attend?', required:true, options:['Yes, I will be there','Maybe','No, I cannot make it']},
    {type:'checks', label:'Dietary requirements', options:['Vegetarian','Vegan','Gluten-free','Halal','None']},
    {type:'date',  label:'Preferred date'}
   ]}},
 {slug:'lead', icon:'🧲', cat:'Marketing', name:'Lead Generation',
  desc:'Capture interested visitors and qualify them in a few questions.',
  form:{title:'Get started', description:'Answer a few questions and we will be in touch.',
   blocks:[
    {type:'short', label:'What is your name?', required:true},
    {type:'email', label:'Work email', required:true},
    {type:'dropdown', label:'Company size', options:['Just me','1–10','11–50','51–200','200+']},
    {type:'choice', label:'What are you looking for?', options:['A demo','Pricing','Support','Just exploring']}
   ]}},
 {slug:'newsletter', icon:'📰', cat:'Creators', name:'Newsletter Signup',
  desc:'Grow your list with a one-field signup and an optional interest pick.',
  form:{title:'Join the newsletter', description:'One useful email a week. No spam, unsubscribe anytime.',
   blocks:[
    {type:'email', label:'Email address', required:true},
    {type:'checks', label:'What do you want to read about?', options:['Product updates','How-to guides','Case studies','Behind the scenes']}
   ]}},
 {slug:'rsvp', icon:'💍', cat:'Personal', name:'RSVP Form',
  desc:'Wedding, party or gathering RSVPs with plus-ones and meal choices.',
  form:{title:'You are invited!', description:'Please reply by the date on your invitation.',
   blocks:[
    {type:'short', label:'Your name', required:true},
    {type:'choice', label:'Can you make it?', required:true, options:['Joyfully accepts','Regretfully declines']},
    {type:'number', label:'Number of guests (including you)'},
    {type:'dropdown', label:'Meal preference', options:['Chicken','Beef','Vegetarian','Vegan']},
    {type:'long',  label:'Anything else we should know? (allergies, song requests…)'}
   ]}},
 {slug:'quiz', icon:'🧠', cat:'Personal', name:'Quick Quiz',
  desc:'A fun 3-question quiz with a score-friendly multiple choice format.',
  form:{title:'Quick Quiz', description:'Three questions. No wrong answers — just for fun.',
   blocks:[
    {type:'short', label:'Your name', required:true},
    {type:'choice', label:'What is the best way to start the day?', required:true, options:['Coffee','A run','A slow breakfast','Straight to work']},
    {type:'choice', label:'Pick a superpower', required:true, options:['Flying','Time travel','Reading minds','Invisibility']},
    {type:'rating', label:'How fun was this quiz?'}
   ]}}
];
function templateToForm(slug){
  var t=window.TEMPLATES.find(function(x){return x.slug===slug;});
  if(!t) return null;
  var f=TC.newForm(t.form.title);
  f.description=t.form.description||'';
  f.blocks=t.form.blocks.map(function(b){
    var nb=TC.defaultBlock(b.type);
    nb.label=b.label||nb.label; nb.desc=b.desc||nb.desc;
    if(b.options) nb.options=b.options.slice();
    if(b.required) nb.required=true;
    return nb;
  });
  return f;
}
window.templateToForm=templateToForm;
