/* Tally clone — data layer (localStorage, no server). */
(function(){
  var FORMS_KEY='tallyclone.forms.v1';
  function load(){ try{ return JSON.parse(localStorage.getItem(FORMS_KEY)||'[]'); }catch(e){ return []; } }
  function save(forms){ localStorage.setItem(FORMS_KEY, JSON.stringify(forms)); }
  function uid(){ return 'f'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
  function bid(){ return 'b'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

  var BLOCK_TYPES=[
    {type:'heading', icon:'H',  name:'Heading',      desc:'A section title'},
    {type:'text',    icon:'¶',  name:'Text',         desc:'A paragraph of text'},
    {type:'short',   icon:'Aa', name:'Short text',   desc:'One-line answer'},
    {type:'long',    icon:'✎',  name:'Long text',    desc:'Multi-line answer'},
    {type:'choice',  icon:'◉',  name:'Multiple choice', desc:'Pick one option'},
    {type:'checks',  icon:'☑',  name:'Checkboxes',   desc:'Pick several options'},
    {type:'dropdown',icon:'▾',  name:'Dropdown',     desc:'Pick from a list'},
    {type:'email',   icon:'@',  name:'Email',        desc:'An email address'},
    {type:'number',  icon:'#',  name:'Number',       desc:'A numeric answer'},
    {type:'date',    icon:'📅', name:'Date',         desc:'Pick a date'},
    {type:'rating',  icon:'★',  name:'Rating',       desc:'1–5 star rating'},
    {type:'file',    icon:'📎', name:'File upload',  desc:'Attach a file (note)'},
    {type:'divider', icon:'—',  name:'Divider',      desc:'A visual separator'}
  ];
  function defaultBlock(type){
    var b={id:bid(),type:type,label:'',desc:'',required:false};
    if(type==='heading'){b.label='Untitled section';}
    else if(type==='text'){b.label='Add some text here to introduce your form.';}
    else if(type==='short'){b.label='What is your name?';}
    else if(type==='long'){b.label='Tell us more';}
    else if(type==='choice'){b.label='Choose one';b.options=['Option 1','Option 2','Option 3'];}
    else if(type==='checks'){b.label='Select all that apply';b.options=['Option 1','Option 2','Option 3'];}
    else if(type==='dropdown'){b.label='Pick an option';b.options=['Option 1','Option 2','Option 3'];}
    else if(type==='email'){b.label='What is your email address?';}
    else if(type==='number'){b.label='How many?';}
    else if(type==='date'){b.label='Pick a date';}
    else if(type==='rating'){b.label='How would you rate this?';}
    else if(type==='file'){b.label='Upload a file';b.desc='File uploads are recorded as a note in this demo build.';}
    else if(type==='divider'){b.label='';}
    return b;
  }
  function newForm(title){
    return {id:uid(), title:title||'Untitled form', description:'', blocks:[defaultBlock('short')], created:Date.now(), updated:Date.now(), published:false};
  }
  function getForm(id){ return load().find(function(f){return f.id===id;})||null; }
  function upsertForm(form){ var fs=load(); var i=fs.findIndex(function(f){return f.id===form.id;}); form.updated=Date.now(); if(i>=0) fs[i]=form; else fs.unshift(form); save(fs); return form; }
  function deleteForm(id){ save(load().filter(function(f){return f.id!==id;})); localStorage.removeItem('tallyclone.subs.'+id); }
  function duplicateForm(id){ var f=getForm(id); if(!f) return null; var c=JSON.parse(JSON.stringify(f)); c.id=uid(); c.title=f.title+' (copy)'; c.published=false; c.created=Date.now(); upsertForm(c); return c; }
  function listForms(){ return load().sort(function(a,b){return b.updated-a.updated;}); }
  function subsKey(id){ return 'tallyclone.subs.'+id; }
  function listSubs(id){ try{ return JSON.parse(localStorage.getItem(subsKey(id))||'[]'); }catch(e){ return []; } }
  function addSub(id, answers){ var s=listSubs(id); s.unshift({at:Date.now(), answers:answers}); localStorage.setItem(subsKey(id), JSON.stringify(s)); return s.length; }
  function clearSubs(id){ localStorage.removeItem(subsKey(id)); }
  function formUrl(id){ return location.origin+location.pathname.replace(/[^\/]*$/,'')+'form.html?id='+encodeURIComponent(id); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

  window.TC={load:load,save:save,uid:uid,bid:bid,BLOCK_TYPES:BLOCK_TYPES,defaultBlock:defaultBlock,
    newForm:newForm,getForm:getForm,upsertForm:upsertForm,deleteForm:deleteForm,duplicateForm:duplicateForm,
    listForms:listForms,listSubs:listSubs,addSub:addSub,clearSubs:clearSubs,formUrl:formUrl,esc:esc};
})();
