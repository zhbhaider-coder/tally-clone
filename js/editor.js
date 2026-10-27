/* Tally clone — block editor. */
(function(){
  var form=null, mode='edit', dragId=null;

  function $(s){return document.querySelector(s);}
  function init(){
    if(!document.getElementById('title')) return; // not the editor page (form.html reuses renderField)
    var params=new URLSearchParams(location.search);
    var id=params.get('id');
    if(params.get('template')){
      form=templateToForm(params.get('template'));
      if(!form){ location.href='templates.html'; return; }
      TC.upsertForm(form);
      history.replaceState(null,'','editor.html?id='+form.id);
    } else if(id){
      form=TC.getForm(id);
      if(!form){ location.href='editor.html'; return; }
    } else {
      form=TC.newForm();
      TC.upsertForm(form);
      history.replaceState(null,'','editor.html?id='+form.id);
    }
    $('#title').value=form.title;
    $('#desc').value=form.description||'';
    bindTop();
    render();
  }

  function save(){ form.title=$('#title').value||'Untitled form'; form.description=$('#desc').value||''; TC.upsertForm(form); updateCounts(); }

  function updateCounts(){
    var n=TC.listSubs(form.id).length;
    $('#subCount').textContent=n+(n===1?' response':' responses');
    var share=$('#shareBox');
    if(form.published){ share.style.display='flex'; $('#shareLink').textContent=TC.formUrl(form.id); }
    else share.style.display='none';
    $('#publishBtn').textContent=form.published?'Published ✓':'Publish';
  }

  function bindTop(){
    $('#title').addEventListener('input',save);
    $('#desc').addEventListener('input',save);
    $('#publishBtn').addEventListener('click',function(){
      form.published=true; save();
      var link=TC.formUrl(form.id);
      if(navigator.clipboard) navigator.clipboard.writeText(link).catch(function(){});
      $('#publishBtn').textContent='Link copied ✓';
      setTimeout(function(){$('#publishBtn').textContent='Published ✓';},2000);
    });
    $('#copyLinkBtn').addEventListener('click',function(){
      var link=TC.formUrl(form.id);
      if(navigator.clipboard) navigator.clipboard.writeText(link).then(function(){$('#copyLinkBtn').textContent='Copied ✓';setTimeout(function(){$('#copyLinkBtn').textContent='Copy link';},1500);});
      else { var t=document.createElement('textarea'); t.value=link; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    });
    $('#viewBtn').addEventListener('click',function(){ window.open(TC.formUrl(form.id),'_blank'); });
    $('#tabEdit').addEventListener('click',function(){ mode='edit'; syncTabs(); render(); });
    $('#tabPrev').addEventListener('click',function(){ mode='preview'; syncTabs(); render(); });
    $('#quickInput').addEventListener('input',onQuickInput);
    $('#quickInput').addEventListener('keydown',onQuickKey);
    document.addEventListener('click',function(e){ if(!e.target.closest('.quick-add')) hideMenu(); });
  }
  function syncTabs(){ $('#tabEdit').classList.toggle('on',mode==='edit'); $('#tabPrev').classList.toggle('on',mode==='preview'); }

  /* ---- slash menu ---- */
  var menuItems=[], menuSel=0;
  function onQuickInput(e){
    var v=e.target.value;
    if(!v.startsWith('/')){ hideMenu(); return; }
    var q=v.slice(1).toLowerCase();
    menuItems=TC.BLOCK_TYPES.filter(function(t){return t.name.toLowerCase().indexOf(q)>=0||t.desc.toLowerCase().indexOf(q)>=0;});
    menuSel=0; showMenu();
  }
  function onQuickKey(e){
    if(e.key==='ArrowDown'&&menuItems.length){e.preventDefault();menuSel=Math.min(menuSel+1,menuItems.length-1);showMenu();}
    else if(e.key==='ArrowUp'&&menuItems.length){e.preventDefault();menuSel=Math.max(menuSel-1,0);showMenu();}
    else if(e.key==='Enter'){
      e.preventDefault();
      if(menuItems.length){ addBlock(menuItems[menuSel].type); }
      else if(e.target.value.trim()){ addBlock('short', e.target.value.trim()); }
    } else if(e.key==='Escape'){ hideMenu(); }
  }
  function showMenu(){
    var m=$('#slashMenu'); if(!menuItems.length){ m.innerHTML='<button type="button" disabled>No matching block — press Enter for a short text question</button>'; m.style.display='block'; return; }
    m.innerHTML=menuItems.map(function(t,i){
      return '<button type="button" data-i="'+i+'" class="'+(i===menuSel?'sel':'')+'"><span class="k">'+t.icon+'</span><span>'+t.name+'<small>'+t.desc+'</small></span></button>';
    }).join('');
    m.style.display='block';
    m.querySelectorAll('button[data-i]').forEach(function(b){ b.addEventListener('click',function(){ addBlock(menuItems[+b.dataset.i].type); }); });
  }
  function hideMenu(){ $('#slashMenu').style.display='none'; menuItems=[]; }

  function addBlock(type, label){
    var b=TC.defaultBlock(type);
    if(label) b.label=label;
    form.blocks.push(b); save(); render();
    $('#quickInput').value=''; hideMenu();
    var el=document.querySelector('[data-bid="'+b.id+'"]');
    if(el){ el.scrollIntoView({behavior:'smooth',block:'center'}); var inp=el.querySelector('.blabel-input'); if(inp){inp.focus(); inp.select();} }
  }

  /* ---- render ---- */
  function render(){
    var list=$('#blockList');
    if(mode==='preview'){ renderPreview(list); return; }
    list.innerHTML='';
    form.blocks.forEach(function(b,idx){
      var d=document.createElement('div');
      d.className='block'; d.dataset.bid=b.id; d.draggable=true;
      d.innerHTML=blockEditorHTML(b);
      d.addEventListener('dragstart',function(e){ dragId=b.id; d.classList.add('dragging'); e.dataTransfer.effectAllowed='move'; });
      d.addEventListener('dragend',function(){ dragId=null; d.classList.remove('dragging'); });
      d.addEventListener('dragover',function(e){ e.preventDefault(); });
      d.addEventListener('drop',function(e){
        e.preventDefault();
        if(!dragId||dragId===b.id) return;
        var from=form.blocks.findIndex(function(x){return x.id===dragId;});
        var to=form.blocks.findIndex(function(x){return x.id===b.id;});
        var mv=form.blocks.splice(from,1)[0]; form.blocks.splice(to,0,mv); save(); render();
      });
      list.appendChild(d);
      wireBlock(d,b,idx);
    });
    var qa=document.createElement('div');
    qa.className='quick-add';
    qa.innerHTML='<input id="quickInput" type="text" placeholder="Type / for blocks, or click a block below…" autocomplete="off"><div class="slash-menu" id="slashMenu" style="display:none"></div>';
    list.appendChild(qa);
    // rebind quick-add (it was recreated)
    $('#quickInput').addEventListener('input',onQuickInput);
    $('#quickInput').addEventListener('keydown',onQuickKey);
    var pal=document.createElement('div');
    pal.className='chiprow';
    pal.innerHTML=TC.BLOCK_TYPES.map(function(t){return '<button class="chip" data-t="'+t.type+'">'+t.icon+' '+t.name+'</button>';}).join('');
    list.appendChild(pal);
    pal.querySelectorAll('button').forEach(function(btn){ btn.addEventListener('click',function(){ addBlock(btn.dataset.t); }); });
    updateCounts();
  }

  function blockEditorHTML(b){
    var tools='<div class="tools">'
      +'<button class="tool-btn" data-act="up" title="Move up">↑</button>'
      +'<button class="tool-btn" data-act="down" title="Move down">↓</button>'
      +'<button class="tool-btn" data-act="dup" title="Duplicate">⧉</button>'
      +'<button class="tool-btn" data-act="del" title="Delete">✕</button></div>';
    if(b.type==='heading') return tools+'<span class="grip">⋮⋮</span><input type="text" class="blabel-input title-input" style="font-size:22px" value="'+TC.esc(b.label)+'" placeholder="Heading">';
    if(b.type==='text') return tools+'<span class="grip">⋮⋮</span><textarea class="blabel-input desc-input" rows="2" placeholder="Write some text…">'+TC.esc(b.label)+'</textarea>';
    if(b.type==='divider') return tools+'<span class="grip">⋮⋮</span><hr style="border:0;border-top:1px solid var(--line);margin:8px 0">';
    var h=tools+'<span class="grip">⋮⋮</span>'
      +'<input type="text" class="blabel-input" style="border:0;outline:0;font-weight:600;font-size:16px;font-family:inherit;width:100%;padding:2px 0" value="'+TC.esc(b.label)+'" placeholder="Question">'
      +(b.desc?'<div class="bdesc">'+TC.esc(b.desc)+'</div>':'');
    h+=fieldPreviewHTML(b);
    if(b.type==='choice'||b.type==='checks'||b.type==='dropdown'){
      h+='<div class="opts">'+b.options.map(function(o,i){
        return '<div class="opt-row"><span class="muted">'+(b.type==='dropdown'?'▾':b.type==='choice'?'◉':'☑')+'</span><input type="text" data-opt="'+i+'" value="'+TC.esc(o)+'"><button class="tool-btn" data-optdel="'+i+'" title="Remove option">✕</button></div>';
      }).join('')+'</div><button class="btn add-opt" data-act="addopt">+ Add option</button>';
    }
    h+='<label class="req-toggle"><input type="checkbox" class="req-check" '+(b.required?'checked':'')+'> Required</label>';
    return h;
  }

  function fieldPreviewHTML(b){
    switch(b.type){
      case 'short': return '<input type="text" placeholder="Short answer" disabled>';
      case 'long': return '<textarea placeholder="Long answer" disabled></textarea>';
      case 'email': return '<input type="email" placeholder="name@example.com" disabled>';
      case 'number': return '<input type="number" placeholder="0" disabled>';
      case 'date': return '<input type="date" disabled>';
      case 'rating': return '<div class="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>';
      case 'file': return '<input type="text" placeholder="Choose a file…" disabled>';
      case 'choice': case 'checks': case 'dropdown': return '';
      default: return '';
    }
  }

  function wireBlock(d,b,idx){
    var labelInput=d.querySelector('.blabel-input');
    if(labelInput) labelInput.addEventListener('input',function(){ b.label=labelInput.value; save(); });
    var req=d.querySelector('.req-check');
    if(req) req.addEventListener('change',function(){ b.required=req.checked; save(); });
    d.querySelectorAll('[data-opt]').forEach(function(inp){
      inp.addEventListener('input',function(){ b.options[+inp.dataset.opt]=inp.value; save(); });
    });
    d.querySelectorAll('[data-optdel]').forEach(function(btn){
      btn.addEventListener('click',function(){ if(b.options.length>1){ b.options.splice(+btn.dataset.optdel,1); save(); render(); } });
    });
    d.querySelectorAll('[data-act]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var act=btn.dataset.act;
        if(act==='del'){ if(confirm('Delete this block?')){ form.blocks.splice(idx,1); save(); render(); } }
        else if(act==='dup'){ var c=JSON.parse(JSON.stringify(b)); c.id=TC.bid(); form.blocks.splice(idx+1,0,c); save(); render(); }
        else if(act==='up'&&idx>0){ var t=form.blocks[idx-1]; form.blocks[idx-1]=b; form.blocks[idx]=t; save(); render(); }
        else if(act==='down'&&idx<form.blocks.length-1){ var t2=form.blocks[idx+1]; form.blocks[idx+1]=b; form.blocks[idx]=t2; save(); render(); }
        else if(act==='addopt'){ b.options.push('Option '+(b.options.length+1)); save(); render(); }
      });
    });
  }

  function renderPreview(list){
    list.innerHTML='<div class="card" style="margin-top:8px"><p class="muted small" style="margin-bottom:12px">PREVIEW — this is how respondents will see your form. Submitting here does nothing.</p>'
      +'<h2 style="font-size:26px">'+TC.esc(form.title)+'</h2>'
      +(form.description?'<p class="muted" style="margin:6px 0 20px">'+TC.esc(form.description)+'</p>':'')
      +'<div id="prevForm"></div></div>';
    var host=$('#prevForm');
    form.blocks.forEach(function(b){ host.appendChild(renderField(b,false)); });
    var btn=document.createElement('button');
    btn.className='btn primary big'; btn.style.marginTop='8px'; btn.textContent='Submit';
    btn.addEventListener('click',function(){ host.innerHTML='<div class="thanks"><div class="big">🎉</div><h3>Thanks for submitting!</h3><p class="muted">This was a preview — no response was saved.</p></div>'; });
    host.appendChild(btn);
    updateCounts();
  }

  /* shared public-field renderer (also used by form.html) */
  function renderField(b, live){
    var wrap=document.createElement('div');
    wrap.className='fblock'; wrap.dataset.bid=b.id;
    if(b.type==='heading'){ wrap.innerHTML='<h2 style="font-size:22px">'+TC.esc(b.label)+'</h2>'; return wrap; }
    if(b.type==='text'){ wrap.innerHTML='<p>'+TC.esc(b.label)+'</p>'; return wrap; }
    if(b.type==='divider'){ wrap.innerHTML='<hr style="border:0;border-top:1px solid var(--line)">'; return wrap; }
    var req=b.required?' <span class="req">*</span>':'';
    var h='<label>'+TC.esc(b.label)+req+'</label>';
    if(b.desc) h+='<div class="fdesc2">'+TC.esc(b.desc)+'</div>';
    var name='name="'+b.id+'"';
    if(b.type==='short') h+='<input type="text" '+name+' placeholder="Type your answer">';
    else if(b.type==='long') h+='<textarea '+name+' placeholder="Type your answer"></textarea>';
    else if(b.type==='email') h+='<input type="email" '+name+' placeholder="name@example.com">';
    else if(b.type==='number') h+='<input type="number" '+name+' placeholder="0">';
    else if(b.type==='date') h+='<input type="date" '+name+'>';
    else if(b.type==='file') h+='<input type="file" '+name+'><div class="fdesc2">In this demo build, only the file name is recorded.</div>';
    else if(b.type==='rating'){
      h+='<div class="stars" data-rating="'+b.id+'">'+[1,2,3,4,5].map(function(n){return '<span data-v="'+n+'">★</span>';}).join('')+'</div><input type="hidden" '+name+' value="">';
    }
    else if(b.type==='choice') h+=b.options.map(function(o){return '<label class="radio-row"><input type="radio" name="'+b.id+'" value="'+TC.esc(o)+'"> '+TC.esc(o)+'</label>';}).join('');
    else if(b.type==='checks') h+=b.options.map(function(o){return '<label class="check-row"><input type="checkbox" name="'+b.id+'" value="'+TC.esc(o)+'"> '+TC.esc(o)+'</label>';}).join('');
    else if(b.type==='dropdown') h+='<select '+name+'><option value="">Select an option…</option>'+b.options.map(function(o){return '<option>'+TC.esc(o)+'</option>';}).join('')+'</select>';
    h+='<div class="err">This field is required.</div>';
    wrap.innerHTML=h;
    if(b.type==='rating'){
      var stars=wrap.querySelectorAll('[data-v]');
      var hidden=wrap.querySelector('input[type=hidden]');
      stars.forEach(function(s){
        s.addEventListener('click',function(){
          var v=+s.dataset.v; hidden.value=v;
          stars.forEach(function(x){ x.classList.toggle('on',+x.dataset.v<=v); });
        });
      });
    }
    return wrap;
  }
  window.TC_renderField=renderField;

  document.addEventListener('DOMContentLoaded',init);
})();
